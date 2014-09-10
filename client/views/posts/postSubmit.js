/**
 * Created by ibox on 9/2/14.
 */
Template.postSubmit.events({
    'submit form': function(e) {
        e.preventDefault();

        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val()
        }

        /*//To fit with insert.allow (CLIENT SIDE
        post._id = Posts.insert(post);
        Router.go('postPage', post);*/

        /*The Meteor.call function calls a Method named
        by its first argument. You can provide arguments
        to the call (in this case, the post object we
        constructed from the form), and finally attach
        a callback, which will execute when the server-side
        Method is done.SERVER SIDE*/
        Meteor.call('post', post, function(error, id) {
            // display the error to the user
            throwError(error.reason); //affiche bandeau erreur
            if (error.error === 302){
                Router.go('postPage', {_id: error.details})
            }
            else {
                Router.go('postPage', {_id: id});
            }
        });

    }
});