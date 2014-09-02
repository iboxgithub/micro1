/**
 * Created by ibox on 9/2/14.
 */
Template.postPage.helpers({
    comments: function() {
        return Comments.find({postId: this._id});
    }
});

Template.comment.helpers({
    submittedText: function() {
        return new Date(this.submitted).toString();
    }
});