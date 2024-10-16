import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {

  public email:string = "";

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }


  sendLinkReset(){
    if(this.email != ""){
      this.authService.resetPassword(this.email).then(()=>{
        alert("El correo ha sido enviado");
        
      }).catch(()=>{
        console.log("error");
        
      })
    }else{
      alert("Las intrucciones han sido claras")
    }

    
  }

}
