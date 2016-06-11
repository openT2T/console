package org.opent2t.plugin;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

public class OpenT2T extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray data, CallbackContext callbackContext) throws JSONException {

        if (action.equals("echo")) {

            String option = data.getString(0);
            
            // NOTE: place to call into native code; for now we are just getting the device family to test native code access.
            String deviceFamily = "Android Simulator";
            callbackContext.success("Echo from Android java code. Device family is " + deviceFamily + " and it says '" + option + "'");
        
            return true;

        } else {
            return false;
        }
    }
}
