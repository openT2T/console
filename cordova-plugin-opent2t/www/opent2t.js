/*global cordova, module*/

module.exports = {
    echo: function (options, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "OpenT2T", "echo", [options]);
    },

    addDevice: function (options, successCallback, errorCallback) {
        cordova.exec(successCallback, errorCallback, "OpenT2T", "addDevice", [options]);
    }
};
