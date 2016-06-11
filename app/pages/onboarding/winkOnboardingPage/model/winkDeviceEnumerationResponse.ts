import {WinkDevice} from "./winkDevice";
import {WinkPagination} from "./winkPagination";

export interface WinkDeviceEnumerationResponse {
    data: WinkDevice[];
    errors: any[];
    pagination: WinkPagination;
}
