/**
 * Created by ibox on 9/15/14.
 */
/*
 onCreateUser function is a built-in Meteor function
 that allows you to run custom code to create users
 */
Accounts.onCreateUser(function(options, user) {
    user.intercomHash = IntercomHash(user, 'aiTfqp-ZDMstROn-Zj_wBuKof3L69rNrn_kbwAVB');

    if (options.profile)
        user.profile = options.profile;

    return user;
});