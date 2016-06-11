import {Device} from '../model/device';
import {Injectable} from 'angular2/core';
import {TranslatorsPage} from '../pages/translatorsPage/translatorsPage';
import 'rxjs/Rx';
import {doAlert} from '../model/utils';

declare var opent2t: any;

@Injectable()
export class OpenT2TBridgeService {

    public devices: Device[];

    // ctor
    constructor() {
        this.devices = new Array<Device>();
    }

    // adds a device to the bridge, with provided schema and device handler script.
    public addDevice(schemaXml: string, deviceHandlerJs: string, device: Device): void {

        console.log('    schemaXml: ' + schemaXml);
        console.log('    deviceHandlerJs: ' + deviceHandlerJs);
        console.log('    device: ' + JSON.stringify(device));

        if (typeof (schemaXml) !== 'undefined' && typeof (deviceHandlerJs) !== 'undefined' && typeof (device) !== 'undefined') {

            if (typeof (opent2t) !== 'undefined') {
                opent2t.addDevice([device, deviceHandlerJs, schemaXml], this.success, this.failure);
            } else {
                doAlert('opent2t cordova plugin not found.');
            }

            // add the device for tracking in the UX
            // TODO: should do this on the success callback
            // (need to pass the device context back on the success callback)
            this.devices.push(device);
        }
        else {
            doAlert('Error: Cannot start the bridge because a required parameter is missing.');
        }
    }

    // bridge success callback
    success(result) {
        if (typeof (result) !== 'undefined') {
            doAlert('Success: ' + result);
        } else {
            doAlert('Success');
        }
    }

    // bridge failure callback
    failure(result) {
        if (typeof (result) !== 'undefined') {
            doAlert('Error: ' + result);
        } else {
            doAlert('Error');
        }
    }
}