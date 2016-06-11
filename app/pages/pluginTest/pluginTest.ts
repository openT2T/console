import {Page, Platform} from "ionic-angular";
import {doAlert} from "../../model/utils";

// declare opent2t cordova plugin for typescript.
declare var opent2t: any;

@Page({
    templateUrl: "build/pages/pluginTest/pluginTest.html"
})
export class PluginTestPage {

    // form data
    deviceprops = "{ \"id\": \"1559737\", \"type\": \"light_bulbs\", \"access_token\": \"0454125b447bfa278bac3c68d3d1d6ae\" }";
    devicename = "My test device";
    devicevendor = "Test vendor";

    constructor(private platform: Platform) {
    }

    echo() {
        this.platform.ready().then(() => {

            if (typeof (opent2t) !== "undefined") {

                opent2t.echo("hello!", this.success, this.failure);
            } else {
                doAlert("opent2t cordova plugin not found.");
            }
        });
    }

    submit(form) {
        this.platform.ready().then(() => {
            let xml = "" +
                "<?xml version= \"1.0\" encoding= \"utf-8\" ?>" +
                "<!DOCTYPE node PUBLIC \"-//freedesktop//DTD D-BUS Object Introspection 1.0//EN\" \"http://standards.freedesktop.org/dbus/introspect-1.0.dtd\"[] >" +
                "<node>" +
                " <interface name=\"org.OpenT2T.Sample.SuperPopular.Lamp\" >" +
                "  <!--Turn on the light -->" +
                "  <method name=\"turnOn\" />" +
                "  <!--Turn off the light -->" +
                "  <method name=\"turnOff\" />" +
                "  <!--Set the brightness of the light -->" +
                "  <method name=\"setBrightness\" >" +
                "   <!--Valid values range from 0 (off) to 100 (full brightness)-->" +
                "   <arg name=\"brightness\" type= \"u\" direction= \"in\" />" +
                "  </method>" +
                "  <signal name= \"error\" >" +
                "   <arg name=\"type\" type=\"s\" direction=\"out\"/>" +
                "   <arg name=\"message\" type=\"s\" direction=\"out\"/>" +
                "  </signal>" +
                " </interface>" +
                "</node>" +
                "";

            let func = function(module, require, global) {
                'use strict';

                var https = require('https');

                // logs device state
                function logDeviceState(device) {
                    if (typeof (device) !== 'undefined') {
                        console.log('  device.name          : ' + device.name);
                        console.log('  device.props         : ' + device.props);
                    } else {
                        console.log('device is undefined');
                    }
                };

                // Helper method to send power state commands to WINK
                function sendPowerStateCommandToDevice(powerState) {

                    var postData = JSON.stringify({
                        'desired_state': {
                            'powered': powerState
                        }
                    });
                    var options = {
                        protocol: 'https:',
                        host: 'api.wink.com',
                        path: '/' + deviceType + '/' + deviceId,
                        headers: {
                            'Authorization': 'Bearer ' + accessToken,
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Content-Length': postData.length
                        },
                        method: 'PUT'
                    };

                    var req = https.request(options, (res) => {

                        console.log('STATUS:' + res.statusCode);
                        res.setEncoding('utf8');
                        res.on('data', (chunk) => {
                        });
                        res.on('end', () => {
                        })
                    });

                    req.on('error', (e) => {
                        console.log('problem with request:' + e.message);
                    });


                    req.write(postData);
                    req.end();
                }

                var deviceType, deviceId, accessToken;

                // module exports, implementing the schema
                module.exports = {

                    device: null,

                    initDevice: function(dev) {
                        this.device = dev;

                        if (typeof this.device != 'undefined') {
                            if (typeof (this.device.props) !== 'undefined') {
                                var props = JSON.parse(this.device.props);

                                if (typeof (props.access_token) !== 'undefined') {
                                    accessToken = props.access_token;
                                } else {
                                    console.log('props.access_token is undefined');
                                }

                                if (typeof (props.type) !== 'undefined') {
                                    deviceType = props.type;
                                } else {
                                    console.log('props.access_token is undefined');
                                }

                                if (typeof (props.id) !== 'undefined') {
                                    deviceId = props.id;
                                } else {
                                    console.log('props.access_token is undefined');
                                }
                            } else {
                                console.log('props is undefined');
                            }
                        } else {
                            console.log('device is undefined');
                        }

                        console.log('Javascript initialized.');
                        logDeviceState(this.device);
                    },

                    turnOn: function() {
                        console.log('turnOn called.');
                        sendPowerStateCommandToDevice(true);
                    },

                    turnOff: function() {
                        console.log('turnOff called.');
                        sendPowerStateCommandToDevice(false);
                    },

                    setBrightness: function(brightness) {
                        console.log('setBrightness called with value: ' + brightness);
                        console.log(' *** NOT IMPLEMENTED');
                    },

                    disconnect: function() {
                        console.log('disconnect called.');
                        logDeviceState(this.device);
                    }
                };

                // globals for JxCore host
                global.initDevice = module.exports.initDevice;
                global.turnOn = module.exports.turnOn;
                global.turnOff = module.exports.turnOff;
                global.setBrightness = module.exports.setBrightness;
                global.disconnect = module.exports.disconnect;
            };

            let js = "(" + func.toString() + ")(module, require, global);"

            if (typeof (opent2t) !== "undefined") {
                let device = {
                    name: this.devicename,
                    vendor: this.devicevendor,
                    model: "light",
                    props: this.deviceprops
                };
                // pass 3 parameters to addDevice - device properties, javascript, xml
                opent2t.addDevice([device, js, xml], this.success, this.failure);
            } else {
                doAlert("opent2t cordova plugin not found.");
            }
        });
    }

    success(result) {
        if (typeof (result) !== "undefined") {
            doAlert("Success: " + result);
        } else {
            doAlert("Success");
        }
    }

    failure(result) {
        if (typeof (result) !== "undefined") {
            doAlert("Error: " + result);
        } else {
            doAlert("Error");
        }
    }
}
