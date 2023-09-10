import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService, private snack:MatSnackBar ){} //injecting userService 

  public user={
    //same as backend user entity
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };
  ngOnInit(): void {}
  formSubmit(){
   console.log(this.user);
   if (this.user.username=='' || this.user.username==null)
   {
    // alert("User is Required!");
    this.snack.open("Username is Required!","OK",{duration:3000, verticalPosition:'top',horizontalPosition:'right'});
    return;
   }

   //validate
  

   //addUser: userService
   //subscribe - service returns observable. therefore to see if it was a success or error, subscribe is used.
  
  //old version
  //  this.userService.addUser(this.user).subscribe(data=>{
  //     //success
  //     console.log(data);
  //     alert('Success!');
  //   });
  this.userService.addUser(this.user).subscribe({
    next(data:any){ 
      //success
      console.log(data);
      // alert('Success!');
      Swal.fire("Success",data.firstName +" is successfully registered!","success");

    },
    //error
    error(err){
      // alert("Something went wrong!");
      Swal.fire("Error","Oops! Something went wrong.","error");

    }
  });

  }
}
