import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SessionService {
  activeRoom: Subject<any>;
  
  constructor() { 
    this.activeRoom = new Subject<any>();
  }
  
  getActiveRoom(): Observable<any> {
    return this.activeRoom.asObservable();
  }
  
  setActiveRoom(room: any) {
    this.activeRoom.next(room);
    return room;
  }
  

}
