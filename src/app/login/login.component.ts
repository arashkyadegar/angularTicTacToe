import { Component } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private localStorageService: LocalStorageService, private service :LoginServiceService, private router: Router){};
  submitLoginForm(){
    this.service.login('arashk','12345',true)
    .subscribe((rslt:any) => {
      this.localStorageService.saveData('user',rslt.user);
      this.localStorageService.saveData('token',rslt.token);
      
      let redirectDelay =  setInterval(()=> {
         clearInterval(redirectDelay);
         this.router.navigate(['/game']);
       },1000)
       }
    )
  }


}
