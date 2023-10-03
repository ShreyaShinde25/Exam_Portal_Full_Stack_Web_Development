import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css']
})
export class LoadQuizComponent implements OnInit {
  
  catId:any;
  quizzes:any;
  constructor(private _route:ActivatedRoute, private _quiz:QuizService){}

  ngOnInit(): void {
    const self=this;
    
    this._route.params.subscribe((params)=>{
      this.catId=params['catId'];

      if(this.catId==0){
        console.log("Load all quizzes");
        this._quiz.getActiveQuizzes().subscribe({
          next(data:any){
             self.quizzes=data;
             console.log(self.quizzes);
             
          },
          error(err){
            console.log(err);
            alert("Error in loading all quizzes")
            
          }
        })
  
      }
      else{
        const self=this;
        console.log("load specific quiz")
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe({
          next(data){
            self.quizzes=data;
          },
          error(err){
            console.log(err);
            
            alert("Error in loading quiz data");
            
          }
        })

      }
    })
    
    
  }

}
