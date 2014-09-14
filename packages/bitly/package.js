/**
 * Created by ibox on 9/15/14.
 */
Package.describe({
    summary: "Bitly package"
});

Package.on_use(function (api) {
    api.add_files('bitly.js', 'server');
    if(api.export)
        api.export('Bitly');//nom pour appeler le package
});