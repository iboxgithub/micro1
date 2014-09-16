/**
 * Created by ibox on 9/17/14.
 */
Package.describe({
    summary: "Intercom package ibox"
});

Package.on_use(function (api) {
    api.add_files('intercom_loader.js', 'client');
});