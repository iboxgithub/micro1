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
    ,
    upvotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    }
});
Template.postItem.events({
    'click .upvotable': function(e) {
        e.preventDefault();
        Meteor.call('upvote', this._id);
    }
});