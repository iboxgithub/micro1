/**
 * Created by ibox on 9/6/14.
 */
Template.header.helpers({
    activeRouteClass: function(/* route names */) {
        var args = Array.prototype.slice.call(arguments, 0);//get the array
        args.pop();//remove hash added by Spacebars

        var active = _.any(args, function(name) {
            return Router.current() && Router.current().route.name === name
        });
/*
 boolean && string JavaScript pattern
 where false && myString returns false,
 but true && myString returns myString
 */
        return active && 'active';
    }
});