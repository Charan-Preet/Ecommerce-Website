import React, { useContext } from 'react'
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default function test() {
    function createNotification() {
        NotificationManager.success('Success message', 'Title here',false);
    }
    return (
        <div>hi
            <button onClick={() => NotificationManager.success('Success message', 'Title here',false)}>Tets</button>
            <NotificationContainer />
        </div>
    )
}

