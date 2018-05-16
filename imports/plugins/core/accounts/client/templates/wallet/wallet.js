import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Reaction } from "/client/api";
import * as Collections from "/lib/collections";
import { Paystack } from "../../../../../custom/payments-paystack/lib/api";

/**
 * @method getTargetAccount
 * @summary gets the account of the userId in the route, or the current user.
 * @return {Object} - the account of the identified user.
 */
const getTargetAccount = () => {
  const targetUserId = Reaction.Router.getQueryParam("userId") || Meteor.userId();
  const account = Collections.Accounts.findOne(targetUserId);
  return account;
};

Template.walletPanel.helpers({
  walletBalance() {
    let balance;
    if (Reaction.Subscriptions && Reaction.Subscriptions.Account && Reaction.Subscriptions.Account.ready()) {
      const account = getTargetAccount();
      if (account) {
        balance = account.walletBalance;
      }
      return balance;
    }
  }
});

/**
 * @method fundWalletThroughPaystack
 * @summary triggers paystack payment user-interface to help user fund account.
 */
const fundWalletThroughPaystack = (amount) => {
  return new Promise((resolve, reject) => {
    Meteor.subscribe("Packages", Reaction.getShopId());

    const email = Collections.Accounts.findOne({ _id: Meteor.userId() }).emails[0].address;

    Meteor.call("paystack/loadApiKeys", (getPublicKeyError, keys) => {
      if (!getPublicKeyError) {
        const { publicKey, secretKey } = keys;
        const payload = {
          key: publicKey,
          email,
          amount: (amount * 100),
          currency: "NGN",
          callback: (response) => {
            const { reference } = response;
            Paystack.verify(reference, secretKey, (paystackVerifyError, res) => {
              if (!paystackVerifyError) {
                resolve(res.data);
              } else {
                reject(paystackVerifyError);
              }
            });
          },
          onClose: () => {
            reject(new Error("paystack-popup-close"));
          }
        };
        PaystackPop.setup(payload).openIframe();
      } else {
        reject(getPublicKeyError);
      }
    });
  });
};

/**
 * @method addToWallet
 * @summary Add more fund to the wallet.
 * @param {Number} amount The amount to add to the wallet.
 */
const addToWallet = (amount) => {
  // Perform some check here to ensure that amount is of the wright type
  Meteor.call("accounts/addToWallet", amount);
};

const addToFriendWallet = (amount, email) => {
  const template = Template.instance();
  const amountInput = template.$("#transfer-amount");
  const recipientEmail = template.$("#transfer-email");
  Alerts.alert({
    title: `Transfer ₦${amount} from your account?`,
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Continue"
  }, (isConfirm) => {
    if (isConfirm) {
      Meteor.call("accounts/addToFriendWallet", amount, email, function (err, data) {
        if (!err) {
          if (!data) {
            Alerts.toast("Email is invalid. Please try again", "error");
          } else {
            Alerts.toast(`Successful transfer of ${amount} to ${email}`);
            amountInput.val("");
            recipientEmail.val("");
          }
        }
      });
    }
  });
};

Template.walletPanel.events({
  "click #fundButton"() {
    const template = Template.instance();
    const amountInput = template.$("#top-up-amount");
    const amount = parseInt(amountInput.val(), 10);
    if (!amount || isNaN(amount)) {
      Alerts.toast("Top-up amount has to be a valid number", "error");
    } else {
      fundWalletThroughPaystack(amount).then((data) => {
        addToWallet(data.amount / 100);
        amountInput.val("");
        Alerts.toast(`Successful Wallet Top-up of ${data.currency} ${data.amount / 100}`);
      }).catch((error) => {
        Alerts.toast(error.message, "error");
      });
    }
  },
  "click #addToFriendWalletButton"() {
    const template = Template.instance();
    const amountInput = template.$("#transfer-amount");
    const recipientEmail = template.$("#transfer-email");
    const amount = amountInput.val();
    const email = recipientEmail.val();
    if (!amount || isNaN(amount) || parseInt(amount, 10) < 0) {
      Alerts.toast("Top-up amount has to be a valid number", "error");
    } else if (Reaction.Subscriptions && Reaction.Subscriptions.Account && Reaction.Subscriptions.Account.ready()) {
      const account = getTargetAccount();
      let balance = 0;
      if (account) {
        balance = account.walletBalance;
      }
      if (balance < amount) {
        Alerts.toast("You have insufficient funds", "error");
      } else {
        addToFriendWallet(parseInt(amount, 10), email);
      }
    }
  }
});
