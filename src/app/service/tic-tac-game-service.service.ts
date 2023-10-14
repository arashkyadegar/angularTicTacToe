import { Injectable } from '@angular/core';
import { Observable, fromEvent, map, of, switchMap } from 'rxjs';
import { io } from 'socket.io-client';
import { Move } from '../models/game-entity';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TicTacGameServiceService {
  //socket$: any;
  socket$: Observable<object>;
  constructor(){
   const localStorage = new LocalStorageService();
    let token = localStorage.getData('token');
    this.socket$ = of(io('http://localhost:8000/',{
      query: {token}
    }))

  }

  getDisconnect(): Observable<any> {
    const disconnection$ = this.socket$.pipe(
      switchMap((socket: any) => 
        fromEvent(socket,'disconnect').pipe(
          map( () => socket)
        )
      )
    );
    return disconnection$;
  }

  getConnect(): Observable<any> {
   return this.socket$.pipe(
      switchMap((socket:any) => 
        fromEvent(socket,'connect').pipe(
          map( () => socket)
        )
      )
    )
  }

  getOnline() {
    const privateMessage$ = this.socket$.pipe(
      switchMap ((socket: any) => 
        fromEvent(socket,'OnlineClientListRequest').pipe(
          map( (data) => {
            return data;
          })
        )
      )
    );
    return privateMessage$;
  }

  joinGame(): Observable<any>  {
    const joinGame$ = this.socket$.pipe(
      switchMap ((socket: any) => 
        fromEvent(socket,'JoinGame').pipe(
          map( (data) => {
            return data;
          })
        )
      )
    );
    return joinGame$;
  }

  sendOnline(): Observable<any>  {
    const clientList =  this.socket$.pipe(
      switchMap ((socket: any) => 
        of(socket.emit('OnlineClientListRequest', {}))
      )
    );
    return clientList;
  }

  SendPlayerMove(move:Move): Observable<any>  {
    const SendPlayerMoveRequest$ =  this.socket$.pipe(
      switchMap ((socket: any) => 
        of(socket.emit('SendPlayerMoveRequest', move))
      )
    );
    return SendPlayerMoveRequest$;
  }
  

  getPlayerToken() {
    const GetPlayerToken$ = this.socket$.pipe(
      switchMap ((socket: any) => 
        fromEvent(socket,'GetPlayerToken').pipe(
          map( (data) => {
            console.log(data);
            return data;
          })
        )
      )
    );
    return GetPlayerToken$;
  }

  RecievePlayerMoveReply() {
    const SendPlayerMoveReply$ = this.socket$.pipe(
      switchMap ((socket: any) => 
        fromEvent(socket,'SendPlayerMoveReply').pipe(
          map( (data) => {
            //console.log(data);
            return data;
          })
        )
      )
    );
    return SendPlayerMoveReply$;
  }

  getPrivateMessage() {
    const privateMessage$ = this.socket$.pipe(
      switchMap ((socket: any) => 
        fromEvent(socket,'privateMessage').pipe(
          map( (data) => {
            console.log(data);
            return data;
          })
        )
      )
    );
    return privateMessage$;
  }


  sendPrivateMessage(data:any): Observable<any>  {
    const clientList =  this.socket$.pipe(
      switchMap ((socket: any) => 
        of(socket.emit('privateMessage', data))
      )
    );
    return clientList;
  }

  uploadSingleFile(files: any): Observable<any> {
    const uploadSource$ =  this.socket$.pipe(
      switchMap ((socket: any) => 
        of(socket.emit("upload", files[0], (status: any) => {
          console.log(status);
        }))
      )
    );
    return uploadSource$;
  }
}
