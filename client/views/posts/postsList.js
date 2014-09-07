/*Template.postsList.helpers({
    posts: function() {
        return Posts.find({}, {sort: {submitted: -1}});
    }
});
removed because handled in router (pagination)
*/

//pour animations
Template.postsList.helpers({
    postsWithRank: function() {
        this.posts.rewind();
        return this.posts.map(function(post, index, cursor) {
            //ajout de l'attribut rank aux objets postsWithRank dans PostsList
            post._rank = index;
            return post;
        });
    }
});