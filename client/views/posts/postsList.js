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
            //ajout de l'attribut _rank à Posts en local
            post._rank = index;
            return post;
        });
    }
});