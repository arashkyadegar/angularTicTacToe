import { Component } from '@angular/core';
import { TicTacGameServiceService } from '../service/tic-tac-game-service.service';
import { Router } from '@angular/router';
import { Move } from '../models/game-entity';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  socketId: string = '';
  token :string ="";
  socketObject: any;
  socketStatus = false;
  gameStatus = false;
  yourTurn = true;
  GameMatris: Move[][] =[
    [new Move(),new Move(),new Move()],
    [new Move(),new Move(),new Move()]
    ,[new Move(),new Move(),new Move()]]

  constructor(private localStorageService: LocalStorageService,private service :TicTacGameServiceService, private router: Router){

  };


ngOnInit() {
  const user = this.localStorageService.getData('user');
  const token = this.localStorageService.getData('token');

    this.service.getConnect()
      .subscribe((data:any) => {
          this.socketId = data.id;
          this.socketStatus = true;
        });

    this.service.joinGame()
    .subscribe((data:any) => {
      if(data.status) {
        this.token = data.token;
        console.log(data.message);
      }
      else
        console.error(data.message);
    });

    this.service.getOnline()
      .subscribe((data:any) => {
      console.log(data);
      this.socketId = data.id;
      this.socketStatus = true;
    });

    this.service.RecievePlayerMoveReply()
      .subscribe((socket:any) => {
        let move = socket.message;
        this.yourTurn = true;
        this.moveRe(move.userId,move.x,move.y,move.value);
      }
    );

    // this.service.getPlayerToken()
    //   .subscribe((socket:any) => {
    //     this.token = socket.token;
    //   }
    // );
}

caller(){
  this.service.sendOnline().subscribe();
}

checkGameStatus() {
    //part one
    let result = false;
    let v = this.GameMatris[0][0].value
    if(v !=""){
      if(this.GameMatris[0][1].value == this.GameMatris[0][2].value) {
        if(this.GameMatris[0][1].value == v){
          this.GameMatris[0][0].bgColor = 'red';
          this.GameMatris[0][1].bgColor = 'red';
          this.GameMatris[0][2].bgColor = 'red';
        }
      }
    }

     v = this.GameMatris[1][0].value
     if(v !=""){
      if(this.GameMatris[1][1].value == this.GameMatris[1][2].value) {
        if(this.GameMatris[1][1].value == v){
        this.GameMatris[1][0].bgColor = 'red';
        this.GameMatris[1][1].bgColor = 'red';
        this.GameMatris[1][2].bgColor = 'red';
      }
    }
  }

    v = this.GameMatris[2][0].value
    if(v !=""){
      if(this.GameMatris[2][1].value == this.GameMatris[2][2].value) {
        if(this.GameMatris[2][1].value == v){
        this.GameMatris[2][0].bgColor = 'red';
        this.GameMatris[2][1].bgColor = 'red';
        this.GameMatris[2][2].bgColor = 'red';
      }
    }
  }
    v = this.GameMatris[0][0].value
    if(v !=""){
      if(this.GameMatris[1][0].value == this.GameMatris[2][0].value) {
        if(this.GameMatris[1][0].value == v){
        this.GameMatris[0][0].bgColor = 'red';
        this.GameMatris[1][0].bgColor = 'red';
        this.GameMatris[2][0].bgColor = 'red';
      }
    }
  }
    v = this.GameMatris[0][1].value
    if(v !=""){
      if(this.GameMatris[1][1].value == this.GameMatris[2][1].value) {
        if(this.GameMatris[1][1].value == v){
        this.GameMatris[0][1].bgColor = 'red';
        this.GameMatris[1][1].bgColor = 'red';
        this.GameMatris[2][1].bgColor = 'red';
      }
    }
  }
    v = this.GameMatris[0][2].value
    if(v !=""){
      if(this.GameMatris[1][2].value == this.GameMatris[2][2].value) {
        if(this.GameMatris[1][2].value == v){
        this.GameMatris[0][2].bgColor = 'red';
        this.GameMatris[1][2].bgColor = 'red';
        this.GameMatris[2][2].bgColor = 'red';
      }
    }
  }


    v = this.GameMatris[0][0].value
    if(v !=""){
      if(this.GameMatris[1][1].value == this.GameMatris[2][2].value) {
        if(this.GameMatris[1][1].value == v){
        this.GameMatris[0][0].bgColor = 'red';
        this.GameMatris[1][1].bgColor = 'red';
        this.GameMatris[2][2].bgColor = 'red';
      }
    }
  }

    v = this.GameMatris[0][2].value
    if(v !=""){
      if(this.GameMatris[1][1].value == this.GameMatris[2][0].value) {
        if(this.GameMatris[1][1].value == v){
        this.GameMatris[0][2].bgColor = 'red';
        this.GameMatris[1][1].bgColor = 'red';
        this.GameMatris[2][0].bgColor = 'red';
      }
    }
  }
}
getBackgroundColor(){

}
moveRe(socketId: string,x: number,y: number,value: string){
  const move = new Move();

  move.userId = socketId
  move.x = x;
  move.y = y;
  move.value = value;
  this.GameMatris[x][y] = move;
  this.checkGameStatus();

}
move(socketId: string,x: number,y: number){

  if(this.yourTurn){
    const move = new Move();
    move.userId = socketId
    move.x = x;
    move.y = y;
    move.value = this.token;
    let point = this.GameMatris[x][y];

    if(point.value ==""){
      this.GameMatris[x][y] = move;

      this.service.SendPlayerMove(move).
        subscribe((data:any) => {
          this.socketId = data.id;
          this.socketStatus = true;
          this.checkGameStatus();
          this.yourTurn = false;
        });

    }
  }
}
}


  