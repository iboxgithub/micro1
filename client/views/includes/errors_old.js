/**
 * Created by ibox on 9/2/14.
 */
/*Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});*/

/*
 telling Meteor to set seen to true
  1 millisecond after the errors template has been rendered
 */
/*Template.error.rendered = function() {
    var error = this.data;
    Meteor.defer(function() {
        Errors.update(error._id, {$set: {seen: true}});
    });
};*/