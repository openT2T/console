// declare navigator cordova plugin for typescript
declare var navigator: any;

export function doAlert(message: string) {
    if (navigator.notification && navigator.notification.alert) {
        navigator.notification.alert(message);
    }
    else {
        alert(message);
    }
}