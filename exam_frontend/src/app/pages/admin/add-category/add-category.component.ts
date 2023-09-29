import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
   
  category={
    title:"",
    description:"",
  }

  constructor(private _category:CategoryService, private _snack:MatSnackBar){
  }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title.trim()==''|| this.category.title==null){
     this._snack.open('Title Required!','',{duration:3000})
      return ;
    }
    const self=this;
    //all done
    this._category.addCategory(this.category).subscribe({
      next(data:any){
        self.category.title='';
        self.category.description='';
        Swal.fire("Success!","Category is added Successfully","success");
      },
      error(err){
        console.log(err);
        Swal.fire("Error!","Server error!",'error');
      }
    })



}}
