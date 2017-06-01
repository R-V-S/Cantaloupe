import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { SessionService } from './../session.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: FirebaseListObservable<any[]>;
  user: firebase.User;
  newRoomName: String;
  activeRoom: any;
  
  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, public session: SessionService) { 
    this.rooms = db.list('/rooms');
    this.user = null;
  }
  
  ngOnInit() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      this.user = user;
    });
    this.rooms.subscribe( rooms => { this.setRoom(rooms[0]) });
  }
  
  createRoom(roomName) {
    if (!this.user || !this.newRoomName) { return }
    this.rooms.push({
      name: roomName,
      createdAt: Date.now(),
      creator: {email: this.user.email, displayName: this.user.displayName, photoURL: this.user.photoURL}
    });
    this.newRoomName = '';
  }
  
  removeRoom(room) {
    this.rooms.remove(room);
  }
  
  setRoom(room) {
    this.session.setActiveRoom(room);
  }


}
