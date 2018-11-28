package com.aleks.throwthesignal.throwthesignal;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import android.util.Log;

public class NotificationService extends FirebaseMessagingService {
    @Override
    public void onNewToken(String s){
        super.onNewToken(s);
        Log.e("NEW_TOKEN",s);
//        sendRegistrationToServer(token);

    }

    @Override
    public void onMessageReceived(RemoteMessage rmtMSG){
        super.onMessageReceived(rmtMSG);
    }
}
