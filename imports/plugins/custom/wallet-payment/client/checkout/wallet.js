/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import { Cart, Shops, Packages } from "/lib/collections";

import "./wallet.html";

/**
 * @method deductFromWallet
 * @summary Deduct fund from the wallet.
 * @param {Number} amount The amount to deduct from the wallet
 */
const deductFromWallet = (amount) => {
  Meteor.call("accounts/deductFromWallet", amount);
};

Template.walletPaymentForm.onCreated(function () {
  this.formVisibility = new ReactiveVar(false);
});

Template.walletPaymentForm.helpers({
  totalPrice() {
    return Cart.findOne().getTotal();
  },

  formVisibility() {
    return Template.instance().formVisibility.get();
  }
});

Template.walletPaymentForm.events({
  "click #submitWalletPayment"() {
    const amount = Math.round(Cart.findOne().getTotal());
    const currency = Shops.findOne().currency;

    Meteor.subscribe("Packages", Reaction.getShopId());
    const packageData = Packages.findOne({
      name: "example-paymentmethod",
      shopId: Reaction.getShopId()
    });
    Meteor.call("accounts/getWalletBalance", (error, result) => {
      if (amount > result) {
        // Display an error alert
        Alerts.alert("You do not have enough money to purchase this product.");
      } else {
        // Display a warning alert
        Alerts.alert({
          title: "Completing this order would deduct from your wallet.",
          type: "warning",
          showCancelButton: true,
          confirmButtonText: "Continue"
        }, (isConfirm) => {
          // Make the payment
          if (isConfirm) {
            const paymentMethod = {
              processor: "Wallet",
              method: "credit",
              paymentPackageId: packageData._id,
              paymentSettingsKey: packageData.registry[0].settingsKey,
              transactionId: Random.id(),
              currency,
              amount,
              status: "passed",
              mode: "authorize",
              createdAt: new Date(),
              transactions: []
            };
            Meteor.call("cart/submitPayment", paymentMethod, (submitPaymentError) => {
              if (submitPaymentError) {
                Alerts.toast(submitPaymentError.message, "error");
              } else {
                deductFromWallet(amount);
              }
            });
          }
        });
      }
    });
  },

  "click #toggleForm": (event, template) => {
    template.formVisibility.set(!template.formVisibility.get());
  }
});
