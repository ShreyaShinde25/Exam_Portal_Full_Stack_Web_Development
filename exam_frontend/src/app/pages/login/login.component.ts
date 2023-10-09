import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
   loginData={
    username:'',
    password:''
   }

  constructor(private snack:MatSnackBar, private login:LoginService, private router:Router){}
  ngOnInit(): void {
  }


  formSubmit(){
    console.log('login button clicked');
    if(this.loginData.username.trim()=='' || this.loginData.username==null){
      this.snack.open('Username is required!','',{duration:3000,});
      return;
    }

    if(this.loginData.password.trim()=='' || this.loginData.password==null){
      this.snack.open('Password is required!','',{duration:3000,});
      return;
    } 
    const self = this;


    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe({
      next(data:any){
        //success
        console.log("success");
        console.log(data);   
        self.login.loginUser(data.token);     

        self.login.getCurrentUser().subscribe({
          next(user:any){
            self.login.setUser(user);
            console.log(user);
            //redirect .. ADMIN: admin dashboard
            //redirect.. NORMAL:normal-dashboard
            if(self.login.getUserRole()=="ADMIN"){
              //admin dashboard
              // window.location.href='/admin'
              self.router.navigate(['admin/quizzes']);
            }
            else if(self.login.getUserRole()=="NORMAL"){
              //Normal user dashboard
              // window.location.href='/user-dashboard'
              self.router.navigate(['user-dashboard/0'])
            }
            else{
             self.login.logout();

            }
          }
        });
     
      },
      
      //error
      error(err){
        console.log('Error!');
        console.log(err); 
        self.snack.open("Invalid details! Please Try again",'',{duration:3000,})
      }

    }
    
    );
    

        


    

}

}
