import {WinkUserData} from "./winkUserData";
import {WinkPagination} from "./winkPagination";

export class WinkUser {

    // Indicates whether the user is currently signed in.
    isSignedIn: boolean;

    data: WinkUserData;
    errors: any[];
    pagination: WinkPagination;
    access_token: string;
    refresh_token: string;
    token_type: string;
    token_endpoint: string;
    scopes: string;
}