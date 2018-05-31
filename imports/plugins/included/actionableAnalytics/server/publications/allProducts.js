import { Meteor } from "meteor/meteor";
import Collections from ""

Meteor.publish("getProductInventoryOnMount", function () {
    return Collections.Products.find({}).fetch();
});
