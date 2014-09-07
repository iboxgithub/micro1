/**
 * Created by ibox on 9/6/14.
 */
/*
 by using UI.registerHelper,
 we've created a global helper that can be used within any template
 */
UI.registerHelper('pluralize', function(n, thing) {
    // fairly stupid pluralizer
    if (n === 1 || n === 0) {
        return n + ' ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});