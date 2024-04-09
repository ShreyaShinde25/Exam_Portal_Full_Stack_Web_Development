import { Component, OnInit} from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(public login: LoginService, private router: Router){
  }

  ngOnInit(): void {
  
  }
  public logout(){
    this.login.logout();
    window.location.reload();
  }
}

  


