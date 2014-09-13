/**
 * Created by ibox on 8/30/14.
 */
//animations
var POST_HEIGHT = 80;
var Positions = new Meteor.Collection(null);//null = local

Template.postItem.helpers({
    ownPost: function() {
        return this.userId == Meteor.userId(); //use of session id
    },
    domain: function() {
        var b = document.createElement('a');
        b.href = this.url;
        return b.hostname;
    }/*,
    commentsCount: function() {
        return Comments.find({postId: this._id}).count();
    }*/
    ,
    upvotedClass: function() {
        var userId = Meteor.userId();
        if (userId && !_.include(this.upvoters, userId)) {
            return 'btn-primary upvotable';
        } else {
            return 'disabled';
        }
    },
    attributes: function() {
        /*
        _.extend(destination, *source)
        dans l'objet Positions (vide) on étend
        this (Posts) avec le post en cours
         */
        var post = _.extend({}, Positions.findOne({postId: this._id}), this);
        var newPosition = post._rank * POST_HEIGHT;
        var attributes = {};
        if (_.isUndefined(post.position)) {
            attributes.class = "post invisible";
        } else {
            var delta = post.position - newPosition;
            attributes.style = "top: " + delta + "px";
            //on remet l'élément où il avait été auto déplacé pour qu'il "glisse"
            if (delta === 0)
                attributes.class = "post animate"
        }
        Meteor.setTimeout(function() {//position is defined here
            /*
             Modify one or more documents in the collection,
             or insert one if no matching documents were found.
             Returns an object with keys numberAffected
             (the number of documents modified) and insertedId
             (the unique _id of the document that was inserted, if any).
             */
            Positions.upsert({postId: post._id}, {$set: {position: newPosition}})
        });
        return attributes;
    }
});
Template.postItem.events({
    'click .upvotable': function(e) {
        e.preventDefault(); //browser ne recharge pas la page
        Meteor.call('upvote', this._id);
    }
});