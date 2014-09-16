/*
window.intercomSettings = {
    name: "Ben test1",
    // TODO: The current logged in user's email address.
    email: "tete3.doe@example.com",
    // TODO: The current logged in user's sign-up date as a Unix timestamp.
    created_at: 1234561890,
    app_id: "xle3a0lq"
};*/

Deps.autorun(function(){
    if (Meteor.user() && !Meteor.loggingIn()) {
        var intercomSettings = {
            email: Meteor.user().emails[0].address,
            created_at: Math.round(Meteor.user().createdAt/1000),
            name: Meteor.user().username,
            app_id: "xle3a0lq"
        };
        Intercom('boot', intercomSettings);
    }
});