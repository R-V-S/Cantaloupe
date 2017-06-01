import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UserComponent } from './user/user.component';
import { MessagesComponent } from './messages/messages.component';

import { SessionService } from './session.service';
import { TimeagoPipe } from './timeago.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    UserComponent,
    MessagesComponent,
    TimeagoPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
