import {WinkDesiredState} from "./winkDesiredState";
import {WinkUnits} from "./winkUnits";
import {WinkLastReading} from "./winkLastReading";
import {WinkCapabilities} from "./winkCapabilities";
import {WinkConfiguration} from "./winkConfiguration";

export interface WinkDevice {
    uuid: string;
    desired_state: WinkDesiredState;
    last_reading: WinkLastReading;
    name: string;
    locale: string;
    units: WinkUnits;
    created_at: number;
    hidden_at?: any;
    capabilities: WinkCapabilities;
    triggers: any[];
    manufacturer_device_model: string;
    manufacturer_device_id?: any;
    device_manufacturer: string;
    model_name: string;
    upc_id: string;
    upc_code: string;
    lat_lng: number[];
    location: string;
    update_needed: boolean;
    configuration: WinkConfiguration;
    radio_type: string;
    linked_service_id?: any;
    order?: number;

    unknown_device_id: string;
    hub_id: string;
    light_bulb_id: string;
    gang_id?: any;
    local_id: string;
    shade_id: string;
}