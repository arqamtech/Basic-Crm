import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { TabsPage } from '../pages/Supp/tabs/tabs';
import { ClientsPage } from '../pages/MainPages/clients/clients';
import { DashboardPage } from '../pages/MainPages/dashboard/dashboard';
import { ProfilePage } from '../pages/MainPages/profile/profile';
import { TimelinePage } from '../pages/MainPages/timeline/timeline';
import { AddClientPage } from '../pages/Clients/add-client/add-client';
import { ClientDetailsPage } from '../pages/Clients/client-details/client-details';
import { LoaderPage } from '../pages/Supp/loader/loader';
import { LoginPage } from '../pages/Auth/login/login';
import { ChangePassPage } from '../pages/Auth/change-pass/change-pass';
import { ArchivedClientsPage } from '../pages/Clients/archived-clients/archived-clients';
import { ClientTimelinePage } from '../pages/Clients/client-timeline/client-timeline';
import { AddEventPage } from '../pages/Timeline/add-event/add-event';
import { EventDetailsPage } from '../pages/Timeline/event-details/event-details';

export const firebaseCred = {
    apiKey: "AIzaSyDHUozntNt51l-8V3bUPAX9cQvTvm7sv0Y",
    authDomain: "p-crm-5faa9.firebaseapp.com",
    databaseURL: "https://p-crm-5faa9.firebaseio.com",
    projectId: "p-crm-5faa9",
    storageBucket: "p-crm-5faa9.appspot.com",
    messagingSenderId: "277176606563"
};
firebase.initializeApp(firebaseCred);


@NgModule({
    declarations: [
        MyApp,
        TabsPage,
        ClientsPage,
        DashboardPage,
        ProfilePage,
        TimelinePage,
        LoginPage,
        AddClientPage,
        ClientDetailsPage,
        LoaderPage,
        ChangePassPage,
        ArchivedClientsPage,
        ClientTimelinePage,
        AddEventPage,
        EventDetailsPage,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp, {
            scrollAssist: false
        }),
        AngularFireModule.initializeApp(firebaseCred),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        TabsPage,
        ClientsPage,
        DashboardPage,
        ProfilePage,
        TimelinePage,
        LoginPage,
        AddClientPage,
        ClientDetailsPage,
        LoaderPage,
        ChangePassPage,
        ArchivedClientsPage,
        ClientTimelinePage,
        AddEventPage,
        EventDetailsPage,

    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler }
    ]
})
export class AppModule { }
