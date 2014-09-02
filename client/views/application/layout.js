/**
 * Created by ibox on 8/31/14.
 */
Template.layout.helpers({
    pageTitle: function() { return Session.get('pageTitle'); }
});
/*
Deps.autorun(function() {
    alert(Session.get('message'));
});*/