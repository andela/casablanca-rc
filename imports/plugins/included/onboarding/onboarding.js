import { introJs } from "intro.js";
import { Meteor } from "meteor/meteor";
import userOnboarding from "./userOnboarding";
import * as Collections from "../../../../lib/collections/collections";

const userIntro = introJs();
const steps = userOnboarding;
userIntro.setOptions({
  showBullets: false,
  showProgress: true,
  scrollToElement: true,
  steps
});

const initAutoTour = () => {
  const user = Collections.Accounts.find({ userId: Meteor.userId() }).fetch();
  if (Meteor.user().emails.length === 0) {
    if (localStorage.getItem("takenTour") === false) {
      setTimeout(() => {
        userIntro.start();
      }, 5000);
      localStorage.setItem("takenTour", true);
    }
  }
  if (user.hasTakenTour === false) {
    setTimeout(() => {
      userIntro.start();
    }, 5000);
    Collections.Accounts.update(user._id,
      { $set: { hasTakenTour: true } }
    );
  }
};


const initManualTour = () => {
  userIntro.start();
};

const onboarding = {
  initAutoTour,
  initManualTour
};

export default onboarding;
