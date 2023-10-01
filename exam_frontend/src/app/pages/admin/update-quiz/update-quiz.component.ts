import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit{

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _cat:CategoryService, private _router:Router){}

  qId=0;

  quiz:any;

  categories=[
    {
      cid:23,
      title:''
   },
  ];

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qid'];
    // alert(this.qId);
    const self=this;
    this._quiz.getQuiz(this.qId).subscribe({
      next(data:any){
        self.quiz=data;
        console.log(self.quiz);
      },
      error(err){
        console.log(err);  
      }
    })


  this._cat.categories().subscribe({
    next(data:any){
         //category load
         self.categories=data;
         console.log(self.categories);
         
    },
    error(err){
      console.log(err);
      Swal.fire('Error!',"Error in loading data from server","error");
      
    }
  })
    
  }

  //update form submit

  public updateData(){

  //validate if the data is blank 
  const self=this;
  this._quiz.updateQuiz(this.quiz).subscribe({
    next(data:any){
      Swal.fire("Success!"," Updated Successfully!",'success').then((e)=>{
        self._router.navigate(['/admin/quizzes'])
      });
    },
    error(err){
      Swal.fire("Error!","Error in updating quiz!", 'error');
      console.log(err);
      
    }
  })
  }

}
