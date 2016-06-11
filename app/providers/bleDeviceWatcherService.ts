import {Injectable} from "angular2/core";
import {BleDeviceItem} from "../model/bleDeviceItem";

// declare bluetoothle cordova plugin for typescript.
declare var bluetoothle: any;

@Injectable()
export class BleDeviceWatcherService {

    public devices: BleDeviceItem[];
    public collectionUpdatedCallback: (collection: BleDeviceItem[]) => void;

    /**
     * Initializes a new instance of the BleDeviceWatcherService class.
     */
    constructor() {
        this.devices = [];
    }

    // Event handler for device info updated.
    public onDeviceInfoUpdate(deviceInfoUpdate) {

        let device = new BleDeviceItem();
        device.address = deviceInfoUpdate.address;
        device.name = deviceInfoUpdate.name;
        device.id = device.address.split(":").join("");

        let alreadyExists = false;
        let isDirty = false;
        this.devices.forEach(function(value, index, array) {
            if (value.id === device.id) {

                alreadyExists = true;

                // Don't send notification if name or address have not been changed
                // This prevents too often callback calls.
                isDirty = value.name !== device.name || value.address !== device.address;

                if (isDirty) {
                    array[index] = device;
                }

            }
        });

        if (alreadyExists && !isDirty) {
            return;
        }

        if (!alreadyExists) {
            this.devices.push(device);
            console.log("found a device: " + device);
        }

        // TODO: How does cordova-plugin-bluetoothle handle deleted/removed event?
        if (this.collectionUpdatedCallback) {
            this.collectionUpdatedCallback(this.devices);
        }
    }

    // starts scanning for bluetooth LE devices.
    public start(): Promise<void> {

        let me = this; // this should be done here rather than inside the new Promise()

        return new Promise<void>(function(resolve, reject) {

            // private callback to reject the promise on cordova errors.
            function handleCordovaError(err) {
                reject(err);
            }

            // private callback to resolve the promise on cordova scan updates.
            function scanCallback(result) {
                if (result.status === "scanResult") {
                    // callback contains scan results

                    if (!result.name || !result.address) {
                        // skip partial updates
                        return;
                    }

                    me.onDeviceInfoUpdate(result);
                }

                resolve();
            }

            if (typeof bluetoothle === "undefined") {
                reject("cordova-plugin-bluetoothle is not installed");
            };

            bluetoothle.initialize(function(result) {

                // ensure BT is enabled
                if (result.status !== "enabled") {
                    reject("Bluetooth is not enabled; status: " + result);
                }

                // Start scan: first callback will contain status info (succesfully?), other will have device information
                bluetoothle.startScan(scanCallback, handleCordovaError, { services: [] });

            }, handleCordovaError, { request: true, statusReceiver: false });

        });
    }

    // stop scanning for bluetooth LE devices.
    public stop(): Promise<void> {

        return new Promise<void>(function(resolve, reject) {

            // private callback to reject the promise on cordova errors.
            function handleCordovaError(err) {
                reject(err);
            }

            // private callback to resolve the promise on cordova success.
            function handleCordovaSuccess(result) {
                resolve();
            }

            bluetoothle.stopScan(handleCordovaSuccess, handleCordovaError);
        });
    }
}