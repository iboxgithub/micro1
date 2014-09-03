/**
 * Created by ibox on 9/3/14.
 */
Notifications = new Meteor.Collection('notifications');

Notifications.allow({
    update: ownsDocumentTest //cf permissions.js
});

createCommentNotification = function(comment) {
    var post = Posts.findOne(comment.postId);
    if (comment.userId !== post.userId) {
        Notifications.insert({
            userId: post.userId,
            postId: post._id,
            commentId: comment._id,
            commenterName: comment.author,
            read: false
        });
    }
};