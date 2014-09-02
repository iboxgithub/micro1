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
        return [Meteor.subscribe('posts')
    //comments subscribed at "route" level, not at "router" level
        ];}
});

//the route '/' is mapped to 'postsList'
//if we don't specify path it would map /postsList by default
//yield get the map by default (no connection needed)
Router.map(function() {
    this.route('postsList', {path: '/'});
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

//Router.onBeforeAction('loading');
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() { clearErrors() });