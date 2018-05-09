/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { AutoForm } from "meteor/aldeed:autoform";
import { $ } from "meteor/jquery";
import { Reaction } from "/client/api";
import { Cart, Packages } from "/lib/collections";
import { Paystack } from "../../lib/api";
import { PaystackPayment } from "../../lib/collections/schemas";
import { Random } from "meteor/random";

import "./paystack.html";

let submitting = false;

function uiEnd(template, buttonText) {
  template.$(":input").removeAttr("disabled");
  template.$("#btn-complete-order").text(buttonText);
  return template.$("#btn-processing").addClass("hidden");
}

function paymentAlert(errorMessage) {
  return $(".alert").removeClass("hidden").text(errorMessage);
}

function hidePaymentAlert() {
  return $(".alert").addClass("hidden").text("");
}

function handlePaystackSubmitError(error) {
  const serverError = error !== null ? error.message : void 0;
  if (serverError) {
    return paymentAlert("Oops! " + serverError);
  } else if (error) {
    return paymentAlert("Oops! " + error, null, 4);
  }
}


Template.paystackPaymentForm.helpers({
  PaystackPayment() {
    return PaystackPayment;
  }
});

AutoForm.addHooks("paystack-payment-form", {
  onSubmit: function (doc) {
    const template = this.template;
    hidePaymentAlert();
    const form = {
      name: doc.name,
      email: doc.email
    };

    Meteor.subscribe("Packages", Reaction.getShopId());
    const packageData = Packages.findOne({
      name: "paystack-paymentmethod",
      shopId: Reaction.getShopId()
    });

    const cart = Cart.findOne();
    const { publicKey, secretKey } = packageData.settings["paystack-paymentmethod" ];
    const amount = Math.round(cart.cartTotal() * 100);
    const email = form.email;
    const ref = Random.id();

    const paymentOptions = {
      amount,
      email,
      ref,
      key: publicKey,
      callback: (response) => {
        if (response.reference) {
          Paystack.verify(response.reference, secretKey, (paystack_error, paystack_res) => {
            if (paystack_error) {
              handlePaystackSubmitError(paystack_error);
              uiEnd(template, "Pay with paystack");
            } else {
              submitting = true;
              const transaction = paystack_res.data;
              submitting = false;
              const paymentMethod = {
                processor: "Paystack",
                paymentPackageId: packageData._id,
                paymentSettingsKey: packageData.registry[0].settingsKey,
                storedCard: transaction.authorization.card_type,
                method: "credit",
                transactionId: transaction.reference,
                riskLevel: transaction.riskLevel,
                currency: transaction.currency,
                amount: transaction.amount / 100,
                status: transaction.status,
                mode: "authorize",
                createdAt: new Date(),
                transactions: []
              };
              paymentMethod.transactions.push(transaction.authorization);
              Meteor.call("cart/submitPayment", paymentMethod);
            }
          });
        }
      },
      onClose: () => {
        uiEnd(template, "Pay with paystack");
      }
    };
    try {
      PaystackPop.setup(paymentOptions).openIframe();
    } catch (e) {
      handlePaystackSubmitError(e);
      uiEnd(template, "Pay with paystack");
    }
    return false;
  },
  beginSubmit: function () {
    this.template.$(":input").attr("disabled", true);
    this.template.$("#btn-complete-order").text("Submitting ");
    return this.template.$("#btn-processing").removeClass("hidden");
  },
  endSubmit: function () {
    if (!submitting) {
      return uiEnd(this.template, "Pay with paystack");
    }
  }
});
