import {Injectable} from "angular2/core";

// declare cordova to call the ZWave cordova plugin for typescript.
declare var cordova: any;

@Injectable()
export class ZWaveDeviceWatcherService {

    /**
     * Initializes a new instance of the BleDeviceWatcherService class.
     */
    constructor() {

    }

    // starts scanning for ZWave devices.
    public start(scanCallback, handleCordovaError) {

        if (typeof cordova === "undefined") {
            handleCordovaError("cordova not found");
        }
        else {
            if (typeof cordova.plugins.OpenZWave === "undefined") {
                handleCordovaError("cordova-open-zwave is not installed.");
            };

            cordova.plugins.OpenZWave.connectFake("COM1", scanCallback, handleCordovaError);
            // cordova.plugins.OpenZWave.connect("COM1", scanCallback, handleCordovaError);
        }
    }
}