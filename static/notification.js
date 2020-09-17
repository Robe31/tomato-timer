let askForNotification = () => {
    //This will ask permisson to display notifications
    let getPermission = (permission) => {
        if(!('permisson' in Notification)) {
            //This is a read-only property can't assign value
            // Notification.permission = permission;
            console.log(permission)
        }
    }

    //Check to see if user browser supports notifications
    if(!('Notification' in window)) {
        console.log("This browser does not support notifications.")
    } else {
        if(checkNotificationPromise()) {
            // Returns a promise use .then()
            Notification.requestPermission()
            .then((permission) => {
                getPermission(permission);
            })
        } else {
            Notification.requestPermission((permission) => {
                getPermission(permission)
            })
        }
    }
}
const checkNotificationPromise = () => {
    try {
        Notification.requestPermission().then();
    } catch(e) {
        return false;
    }

    return true;
}
export { askForNotification };

//import * notify from './notification.js'