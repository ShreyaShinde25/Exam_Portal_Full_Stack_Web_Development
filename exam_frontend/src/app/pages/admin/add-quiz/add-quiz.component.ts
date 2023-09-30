import { Component,OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

 categories=[
  {
    cid:23,
    title:''
 },
];

quizData={
 title:'',
 description:'',
 maxMarks:'',
 numberOfQuestions:'',
 active:true,
 category:{
  cid:'',
 }
};

  constructor(private _cat:CategoryService, private _snack:MatSnackBar, private _quiz:QuizService ){}

  ngOnInit(): void {
   //as soon as the component is loaded, ngOnIntit() is called
  const self=this;
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

  addQuiz(){
    console.log("Inside Function");
    
    if (this.quizData.title.trim()=='' || this.quizData.title==null){
     this._snack.open("Title Required!",'',{duration:3000,});
     return;
    }
    //validation for other attributes
    const self=this;
    //call server
    this._quiz.addQuiz(this.quizData).subscribe({
      next(data:any){
          Swal.fire("Success!","Quiz is added Successfully.", "success");
          self.quizData={
            title:'',
            description:'',
            maxMarks:'',
            numberOfQuestions:'',
            active:true,
            category:{
             cid:'',
            }
      }},
      error(err){
         Swal.fire('Error!',"Error while adding quiz",'error');
         console.log(err);
         
      }
    })
  }
}
