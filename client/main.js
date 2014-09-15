
Deps.autorun(function(){
    if (Meteor.user() && !Meteor.loggingIn()) {
        var intercomSettings = {
            email: Meteor.user().emails[0].address,
            //on y accede grace à la publication 'currentUser'
            created_at: Math.round(Meteor.user().createdAt/1000),
            name: Meteor.user().username,
            user_id: Meteor.user()._id,
            user_hash: Meteor.user().intercomHash,
            widget: { //connection au bouton du top menu
                activator: '#Intercom',
                use_counter: true
            },
            app_id: "i9a5d32y"
        };
        Intercom('boot', intercomSettings);
    }
});
