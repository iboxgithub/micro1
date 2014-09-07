/**
 * Created by ibox on 8/30/14.
 */
Posts = new Meteor.Collection('posts');

/*
 this is a set of circumstances under which
 clients are allowed to do things to the Posts collection
 --> "clients are allowed to insert posts as long
 as they have a userId"

Posts.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    }
});*/

/*#TODO A REVOIR chapt Editing posts !!!!!!!!!!!!
supposition : si une tentative d'update/remove sur Posts
se fait, cette fonction est appelée (permissions.js)*/
Posts.allow({
    update: ownsDocumentTest,
    remove: ownsDocumentTest
});

Posts.deny({
    update: function(userId, post, fieldNames) {
        // may only edit the following two fields:
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    post: function(postAttributes) {
        var user = Meteor.user(),
            postWithSameLink = Posts.findOne({url: postAttributes.url});

        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to post new stories");

        // ensure the post has a title
        if (!postAttributes.title)
            throw new Meteor.Error(422, 'Please fill in a headline');

        // check that there are no previous posts with the same link
        if (postAttributes.url && postWithSameLink) {
            throw new Meteor.Error(302,
                'This link has already been posted',
                postWithSameLink._id);
        }

        // pick out the whitelisted keys
        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime(),
            commentsCount: 0,
            upvoters: [],
            votes: 0
        });

        var postId = Posts.insert(post);

        return postId;
    },
    upvote: function(postId) {
        var user = Meteor.user();
        // ensure the user is logged in
        if (!user)
            throw new Meteor.Error(401, "You need to login to upvote");
        /*var post = Posts.findOne(postId);
        if (!post)
            throw new Meteor.Error(422, 'Post not found');
        if (_.include(post.upvoters, user._id))
            throw new Meteor.Error(422, 'Already upvoted this post');*/
        Posts.update({
                //find the post with this id
                //and check if this post has been voted by this user
                //if yes, add it in upvoters
            _id: postId,
            upvoters: {$ne: user._id}
            },
            {
            $addToSet: {upvoters: user._id},
            $inc: {votes: 1}
        });
    }
});