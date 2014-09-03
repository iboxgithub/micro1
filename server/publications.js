/**
 * Created by ibox on 8/30/14.
 */
Meteor.publish('posts', function() {
    return Posts.find();
});
Meteor.publish('comments', function(postId) {
    return Comments.find({postId: postId});
});
Meteor.publish('notifications', function() {
    return Notifications.find();
});