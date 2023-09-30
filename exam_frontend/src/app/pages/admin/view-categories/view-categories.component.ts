import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  color= "skyblue";
  
  categories=[
    {
      cid:"",
      title:"",
      description:""
    }
    // {
    //   cid:24,
    //   title:'gk',
    //   description:'this is testing Category',
    // },
    // {
    //   cid:25,
    //   title:'Practice',
    //   description:'this is testing Category',
    // },
  ]

  constructor(private _category:CategoryService ){}

  ngOnInit(): void {
    const self=this;
    this._category.categories().subscribe({
      next(data:any){
        //css
        self.categories=data;
        console.log(self.categories);

      },
      error(err){
      console.log(err);
      Swal.fire("Error","Error in loading data!",'error')
      }
    })
    
  }
}
