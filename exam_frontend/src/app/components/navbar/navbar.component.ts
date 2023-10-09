import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(public login: LoginService, private router: Router){
  }

  ngOnInit(): void {
  
  }
  
 public logout(){

    this.login.logout();
    window.location.reload();
    
 }

 usernameClick(){
  
  if(this.login.getUserRole()=="ADMIN"){
    console.log("admin clicked");
    
    this.router.navigate(['/admin/profile/']); 
  }
  else if(this.login.getUserRole()=="NORMAL")
  {  console.log("normal clicked");
  
      this.router.navigate(['/user-dashboard/0']);
  }

  }
 }

