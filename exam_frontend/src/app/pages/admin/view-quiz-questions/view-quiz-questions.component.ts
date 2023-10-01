import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrls: ['./view-quiz-questions.component.css']
})
export class ViewQuizQuestionsComponent implements OnInit{
  qId=0;
  qTitle="";
  questions:any=[];

  constructor(private _route:ActivatedRoute, private _question:QuestionService, private _snack: MatSnackBar ){}

  ngOnInit(): void {
    const self=this;

    this.qId=this._route.snapshot.params['qid'];
    this.qTitle=this._route.snapshot.params["title"];
    
    this._question.getQuestionsOfQuiz(this.qId).subscribe({
      next(data){
        console.log(data);
        self.questions=data;
      },
      error(err){
        console.log(err);
        
      }
    })
  }

  deleteQuestion(qid:any){
    const self=this;
    Swal.fire({
      icon:'info',
      showCancelButton:true,
      confirmButtonText: 'Delete',
      title:'Are you Sure?'
    }).then((result)=>{
      if(result.isConfirmed){
        //confirmed delete
        this._question.deleteQuestion(qid).subscribe({
          next(data:any){
            self._snack.open("Question deleted Successfully!","",{duration:3000,});
            self.questions=self.questions.filter((q:any)=> q.quesId != qid)
      },
      error(err){
        self._snack.open('Oops!Something went wrong!','',{duration:3000,});
        console.log(err);
        
      }

        })
      }
    })
  }


}
