import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  public Editor:any = ClassicEditor;
  qId=0;
  qTitle="";
  question:any={
    quiz:{},
    content: '',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  };

  constructor(private _route:ActivatedRoute, private _question:QuestionService){}

  ngOnInit():void{
    this.qId= this._route.snapshot.params["qid"];
    this.qTitle=this._route.snapshot.params["title"];
    this.question.quiz['qId'] =this.qId;
  }

  formSubmit(){
     if(this.question.content.trim=='' || this.question.content==null){
      return; 
     }
     if(this.question.option1.trim=='' || this.question.option1==null){
      return; 
     }
     if(this.question.option2.trim=='' || this.question.option2==null){
      return; 
     }

     if(this.question.answer.trim=='' || this.question.answer==null){
      return; 
     }
     //form submit 
     const self=this;
     this._question.addQuestion(this.question).subscribe({
      next(data:any){
       Swal.fire('Success!','Question added Successfully!','success');
       self.question.content='';
       self.question.option1='';
       self.question.option2='';
       self.question.option3='';
       self.question.option4='';
       self.question.answer='';

      },
      error(err){
        Swal.fire('Error!','Oops!Something went wrong');
        console.log(err);
        
      }
     })

  }

}
