/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";
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

/**
 * @method getWalletBalance
 * @summary Get the balane in the wallet of a user.
 * @returns {Number} The balance in the wallet.
 */
const getWalletBalance = () => {
  Meteor.call("accounts/getWalletBalance", (error, result) => {
    return result;
  });
};

Template.walletPaymentForm.helpers({
  totalPrice() {
    return Cart.findOne().getTotal();
  }
});

Template.walletPaymentForm.events({
  "click #submitWalletPayment"() {
    const walletBalane = getWalletBalance();
    const amount = parseFloat(Cart.findOne().getTotal());
    const currency = Shops.findOne().currency;

    Meteor.subscribe("Packages", Reaction.getShopId());
    const packageData = Packages.findOne({
      name: "example-paymentmethod",
      shopId: Reaction.getShopId()
    });

    if (amount > walletBalane) {
      Alerts.alert("You do not have enough money to purchase this product.");
    } else {
      // Make the payment
      const paymentMethod = {
        processor: "Wallet",
        method: "credit",  // ?
        paymentPackageId: packageData._id,
        paymentSettingsKey: packageData.registry[0].settingsKey,
        transactionId: Random.id(),
        currency,
        amount,
        status: "passed", // ?
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
  }
});
