/**
 * Created by ibox on 8/30/14.
 */
Template.postItem.helpers({
    ownPost: function() {
        return this.userId == Meteor.userId();
    },
    domain: function() {
        var b = document.createElement('a');
        b.href = this.url;
        return b.hostname;
    }
});