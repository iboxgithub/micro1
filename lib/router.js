/**
 * Created by ibox on 8/31/14.
 */
//layoutTemplate = default template for all routes
//loadingTemplate = template displaying while loading data
//the .subscribe runs just one time because after the data
// will be in miniMongo on client side
// --> the router takes care about the subscription
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return [
            Meteor.subscribe('notifications')
            //comments, posts subscribed at "route" level,
            // not at "router" level
        ];}
});

/*
 group routing features together in a
 reusable package that any route can inherit from
 */
PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 5,
    limit: function() {
        //this.params = les params dans l'url
        //dans la route, postsLimit est défini en tant que params
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {submitted: -1}, limit: this.limit()};
    },
    waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var count = this.posts().count();
        var v_limit = this.limit();
        var hasMore = count === v_limit;
        var v_nextPath = this.route.path({postsLimit: v_limit + this.increment});
        /*var v_nextPath = this.route.path({postsLimit: 10});
        var v_nextPath2 = this.route.path({postsLimit: 30});*/
        return {
            posts: this.posts(),
            /*
             Si hasMore est true ->  nextPath = nextPath
             Si hasMore est false ->  nextPath = 'test'
             ceci dans la variable nextPath
             */
            nextPath: hasMore ? v_nextPath : null
            //,toto: "count "+count+" limit "+v_limit+" hasMore "+hasMore
        };

    }
});

//the route '/' is mapped to 'postsList'
//if we don't specify path it would map /postsList by default
//yield get the map by default (no connection needed)
Router.map(function() {
    //this.route('postsList', {path: '/'});
    this.route('postPage', {
        path: '/posts/:_id',
        waitOn: function() {
            return Meteor.subscribe('comments', this.params._id);
        },
        data: function() { return Posts.findOne(this.params._id); }

    });
    this.route('postSubmit', {
        path: '/submit'
    });
    this.route('postEdit', {
        path: '/posts/:_id/edit',
        data: function() { return Posts.findOne(this.params._id); }
    });
    /*Adding a ? after the parameter name means that it's optional*/
    this.route('postsList', {
        path: '/:postsLimit?',
        controller: PostsListController
        /*
        //replaced by controller
        waitOn: function() {
            var postsLimit = parseInt(this.params.postsLimit) || 5;
            return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: postsLimit});
        },
        //instead of being implicitely available as "this"
        //inside the template, our data context will be available at posts
        data: function() {
            var limit = parseInt(this.params.postsLimit) || 5;
            return {
                posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
            };
        }*/
    });
});

var requireLogin = function(pause) {
    if (! Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else
            this.render('accessDenied');
        pause();
    }
}


