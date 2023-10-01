import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';



@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor;

  quesId=0;
  qId=0;
  qTitle="";
  question:any;
  constructor(private _route:ActivatedRoute, private _question:QuestionService, private _router:Router,private location: Location){}

  ngOnInit(): void {

    // this.qId= this._route.snapshot.params["qid"];
    this.qTitle=this._route.snapshot.params["title"];
    this.quesId=this._route.snapshot.params["quesid"];
    
    const self=this;
    this._question.getQuestion(this.quesId).subscribe({
      next(data:any){
        self.question=data;
        console.log(self.question);
      },
      error(err){
        console.log(err);
        
      }
    })
  }
  updateQue(){
    const self=this;
    this._question.updateQuestion(this.question).subscribe({
      next(data:any){
        self.qId=self.question.quiz.qId;
        Swal.fire("Success!"," Updated Successfully!",'success').then((e)=>{
          // self._router.navigate(['/admin/view-questions/'[self.qId],'/',[self.qTitle]])
          self.location.back();
        });
      },
      error(err){
        Swal.fire("Error!","Error in updating question!", 'error');
        console.log(err);
      }
    })

  }
}
