import { introJs } from "intro.js";
import userOnboarding from "./userOnboarding";

const userIntro = introJs();

const onboarding = () => {
  const steps = userOnboarding;
  userIntro.setOptions({
    showBullets: false,
    showProgress: true,
    scrollToElement: true,
    steps
  });

  userIntro.start();
};

export default onboarding;
