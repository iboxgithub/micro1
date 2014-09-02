/**
 * Created by ibox on 8/30/14.
 */
Meteor.publish('posts', function() {
    return Posts.find();
});