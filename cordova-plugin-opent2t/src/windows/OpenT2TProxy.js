module.exports = {
    echo: function (successCallback, errorCallback, options) {
        var option = options[0];

        // NOTE: place to call into native code; for now we are just getting the device family to test native code access.
        var AnalyticsInfo = Windows.System.Profile.AnalyticsInfo;
        var deviceFamily = AnalyticsInfo.DeviceFamily || (AnalyticsInfo.versionInfo && AnalyticsInfo.versionInfo.deviceFamily);

        successCallback("Echo from WinJS code. Device family is " + deviceFamily + " and it says '" + option + "'");
    },

    addDevice: function (successCallback, errorCallback, options) {
        try {
            if (typeof (options) === 'undefined') {
                errorCallback('Invalid options');
                return;
            }
            var option = options[0];
            var deviceProps = option[0];
            var script = option[1];
            var xml = option[2];
            if (typeof (script) === 'undefined') {
                errorCallback('Missing script arguement');
                return;
            }
            if (typeof (xml) === 'undefined') {
                errorCallback('Missing xml arguement');
                return;
            }

            var bridge = new BridgeRT.BridgeJs();
            bridge.initialize();
            var device = new BridgeRT.DeviceInfo();

            if (typeof (device) !== 'undefined') {
                if (typeof (deviceProps.name) !== 'undefined') {
                    device.name = deviceProps.name;
                }
                if (typeof (deviceProps.vendor) !== 'undefined') {
                    device.vendor = deviceProps.vendor;
                }
                if (typeof (deviceProps.model) !== 'undefined') {
                    device.model = deviceProps.model;
                }
                if (typeof (deviceProps.version) !== 'undefined') {
                    device.version = deviceProps.version;
                }
                if (typeof (deviceProps.serialNumber) !== 'undefined') {
                    device.serialNumber = deviceProps.serialNumber;
                }
                if (typeof (deviceProps.description) !== 'undefined') {
                    device.description = deviceProps.description;
                }
                if (typeof (deviceProps.props) !== 'undefined') {
                    device.props = deviceProps.props;
                }

                bridge.addDevice(device, xml, script, ".");

                successCallback("device added");
            } else {
                errorCallback('failed to create device');
                return;
            }

        } catch (err) {
            errorCallback('Exception: ' + err);
        }
    }
};

require("cordova/exec/proxy").add("OpenT2T", module.exports);
