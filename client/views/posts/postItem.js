/**
 * Created by ibox on 8/30/14.
 */
Template.postItem.helpers({
    ownPost: function() {
        return this.userId == Meteor.userId(); //use of session id
    },
    domain: function() {
        var b = document.createElement('a');
        b.href = this.url;
        return b.hostname;
    }/*,
    commentsCount: function() {
        return Comments.find({postId: this._id}).count();
    }*/
});