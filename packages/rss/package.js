/**
 * Created by ibox on 9/13/14.
 */
Package.describe({
    summary: "RSS feed generator"
});
Npm.depends({rss: '0.0.4'}); //include RSS npm Package

Package.on_use(function (api) {
    api.add_files('rss.js', 'server');
    if(api.export)
        api.export('RSS');
});