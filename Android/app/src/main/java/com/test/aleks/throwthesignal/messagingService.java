package com.test.aleks.throwthesignal;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

public class messagingService extends FirebaseMessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);
        if(remoteMessage.getNotification() != null){
            String messageTitle = remoteMessage.getNotification().getTitle();
            String messageContent = remoteMessage.getNotification().getBody();
            notificationGenerator.displayNotification(getApplicationContext(), messageTitle, messageContent);
        }
    }
}
