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
            Meteor.subscribe('currentUser'),
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
        return {sort: this.sort, limit: this.limit()};
    },
    /*waitOn: function() {
        return Meteor.subscribe('posts', this.findOptions());
    },*/
    onBeforeAction: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.limit();
        //var v_nextPath = this.route.path({postsLimit: v_limit + this.increment});
        return {
            posts: this.posts(),
            /*
             Si hasMore est true ->  nextPath = nextPath
             Si hasMore est false ->  nextPath = 'test'
             ceci dans la variable nextPath
             */
            nextPath: hasMore ? this.nextPath() : null
            //,toto: "count "+count+" limit "+v_limit+" hasMore "+hasMore
        };

    }
});

NewPostsListController = PostsListController.extend({
    sort: {submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.newPosts.path({postsLimit: this.limit() + this.increment})
    }
});

BestPostsListController = PostsListController.extend({
    sort: {votes: -1, submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.bestPosts.path({postsLimit: this.limit() + this.increment})
    }
});

ClickedPostsListController = PostsListController.extend({
    sort: {clicks: -1, submitted: -1, _id: -1},
    nextPath: function() {
        return Router.routes.clickedPosts.path({postsLimit: this.limit() + this.increment})
    }
});

//the route '/' is mapped to 'postsList'
//if we don't specify path it would map /postsList by default
//yield get the map by default (no connection needed)
Router.map(function() {
    this.route('home', {
        path: '/',
        controller: NewPostsListController
    });
    this.route('newPosts', {
        path: '/new/:postsLimit?',
        controller: NewPostsListController
    });
    this.route('bestPosts', {
        path: '/best/:postsLimit?',
        controller: BestPostsListController
    });
    this.route('clickedPosts', {
        path: '/clicked/:postsLimit?',
        controller: ClickedPostsListController
    });
    this.route('postPage', {
        path: '/posts/:_id',
        waitOn: function() {
            return [
                Meteor.subscribe('singlePost', this.params._id),
                Meteor.subscribe('comments', this.params._id)
            ];
        },
        data: function() { return Posts.findOne(this.params._id); }

    });
    this.route('postSubmit', {
        path: '/submit',
        disableProgress: true
    });
    this.route('postEdit', {
        path: '/posts/:_id/edit',
        waitOn: function() {
            return Meteor.subscribe('singlePost', this.params._id);
        },
        data: function() { return Posts.findOne(this.params._id); }
    });
    this.route('rss', {
        where: 'server',
        path: '/feed.xml',
        action: function() {
            var feed = new RSS({
                title: "New ibox app Posts",
                description: "The latest posts from Microscope, the smallest news aggregator."
            });
            Posts.find({}, {sort: {submitted: -1}, limit: 20}).forEach(function(post) {
                feed.item({
                    title: post.title,
                    description: post.body,//TODO à ajouter
                    author: post.author,
                    date: post.submitted,
                    url: '/posts/' + post._id
                })
            });
            this.response.write(feed.xml());
            this.response.end();
        }
    });
    this.route('apiPosts', {
        where: 'server',
        path: '/api/posts',
        action: function() {
            var parameters = this.request.query, //recup request params
                limit = !!parameters.limit ? parseInt(parameters.limit) : 3, //attention à NE JAMAIS PASSER DE string (d'où le parseInt)
                data = Posts.find({}, {limit: limit, fields: {title: 1, author: 1, url: 1, submitted: 1}}).fetch();
            this.response.write(JSON.stringify(data));
            this.response.end();
        }
    });
    this.route('apiPost', {
        where: 'server',
        path: '/api/posts/:_id',
        action: function() {
            var post = Posts.findOne(this.params._id);
            if(post){
                this.response.write(JSON.stringify(post));
            } else {
                this.response.writeHead(404, {'Content-Type': 'text/html'});
                this.response.write("Post not found.");
            }
            this.response.end();
        }
    });
    /*Adding a ? after the parameter name means that it's optional*/
    //replaced by 'home'
    // this.route('postsList', {
      //  path: '/:postsLimit?',
        //controller: PostsListController
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
    //});
});

/* TODO cf pourquoi pas useless */
var requireLogin = function(pause) {
    if (! Meteor.user()) {
        if (Meteor.loggingIn())
            this.render(this.loadingTemplate);
        else
            this.render('accessDenied');
        pause();
    }
}

//for package ibox:errors
if (Meteor.isClient)
    Router.onBeforeAction(function() { Errors.clearSeen(); });

