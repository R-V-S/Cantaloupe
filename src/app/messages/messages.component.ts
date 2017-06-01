import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { SessionService } from './../session.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  activeRoom: any;
  messages: FirebaseListObservable<any[]>;
  messageCount: Number;
  messageText: String;
  user: firebase.User;
  date: Date;
  
  @ViewChild('messageList') messageList: ElementRef;

  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth, public session: SessionService) { 
    this.user = null;
    this.activeRoom = null;
  }
  
  ngOnInit() {
    this.afAuth.authState.subscribe((user: firebase.User) => {
      this.user = user;
    });
    
    this.session.getActiveRoom().subscribe(activeRoom => {
      this.activeRoom = activeRoom;
      this.messages = this.db.list('/messages', {
        query: {
          orderByChild: 'roomId',
          equalTo: activeRoom.$key
        }
      });
      this.scrollToBottom();
    })
    
    // Update timeago every 20 seconds
    setTimeout( () => this.date=new Date(), 20 * 1000);
  }
  
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  
  createMessage(messageText) {
    if (!this.activeRoom || !this.messageText) { return; }
    this.messages.push({
        content: this.messageText,
        sentAt: Date.now(),
        roomId: this.activeRoom.$key,
        creator: this.user ? {email: this.user.email, displayName: this.user.displayName, photoURL: this.user.photoURL} : {email: null, displayName: 'Curious Cantaloupe', photoURL: null }
      });
    this.messageText = '';
  }
  
  removeMessage(message) {
    this.messages.remove(message);
  }
  
  scrollToBottom() {
    let messageList = this.messageList.nativeElement;
    if (messageList.children.length !== this.messageCount) { 
      messageList.scrollTop = messageList.scrollHeight - messageList.offsetHeight;
      this.messageCount = messageList.children.length;
    }
  }
}
