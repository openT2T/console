module.exports = function(context) {
    var path = require('path');
    var shell = context.requireCordovaModule('shelljs');

    var SUPPORTED_ARCHS = ['x64', 'x86', 'arm'];

    SUPPORTED_ARCHS.forEach(function (arch) {
        var dest = path.join(context.opts.projectRoot, 'platforms/windows/plugins/cordova-plugin-opent2t/lib', arch, 'BridgeRT.dll');
        shell.rm(dest);
    });
};
