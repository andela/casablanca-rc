/* eslint camelcase: 0 */
import { Meteor } from "meteor/meteor";
import { Template } from "meteor/templating";
import { Tags } from "/lib/collections";
import "./carousel.html";


Template.carousel.helpers({
  tags() {
    const tagsSubcription = Meteor.subscribe("Tags");
    if (tagsSubcription.ready()) {
      const result = Tags.find({
        isTopLevel: true,
        name: { $ne: "Shop" }
      }, { sort: { createdAt: 1 }, limit: 3 }).fetch();
      return result;
    }
  }
});

