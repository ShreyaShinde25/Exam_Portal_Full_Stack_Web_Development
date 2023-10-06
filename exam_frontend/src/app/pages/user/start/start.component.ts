import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  
  qid:any;
  questions:any;
  
 
  isSubmit:any=false;

  timer:any=0;
  total:any=0;
  marskGot: any;
  attempted: any;
  correctAnswers: any;
  percent:any;

  constructor(private locationSt: LocationStrategy, private _route:ActivatedRoute, private _question:QuestionService){}
  
  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];

    this.loadQuestions();
    
  }

  preventBackButton(){
    history.pushState(null, "", location.href) ;
    this.locationSt.onPopState(()=>{
      history.pushState(null,"", location.href);
    });
  }

  loadQuestions(){
    const self=this;
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe({
      next(data){
     

      // self.timer=self.questions;
      // self.total=self.questions.length;
       console.log(data);
       self.questions= data;

       self.timer=Object.keys(self.questions).length*2*60;
       self.total=Object.keys(self.questions).length*2*60;

      //  self.questions.forEach((q:any)=>{
      //   q['givenAnswer']='';
      // });

      self.startTimer();
    
      //  console.log(self.questions);
     
     
      },
      error(err){
        Swal.fire("Error!", "Error in loading questions of quiz",'error');
       console.log(err);
       
      }
    });
  }

  submitQuiz(){
    this.marskGot=0;
    this.attempted=0;
    this.correctAnswers=0;
    this.percent=0;
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon:'info',
    }).then((e) => {
      /* Read more about isConfirmed, isDenied below */
      if (e.isConfirmed) {
        //calculation
        this.evalQuiz();
        
        
        

      } 
    })

  }
  
  startTimer(){
    let t=window.setInterval(()=>{

    //code
    if(this.timer <=0){
      this.evalQuiz()
      clearInterval(t);
    } else{
      this.timer--;
    }
    },1000)

  }

  getFormattedTime(){
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60;
    return `${mm} min: ${ss} sec`;
  }
 

  evalQuiz(){
    const self= this;
    this._question.evalQuiz(this.questions).subscribe({
      next(data:any){
      console.log(data);
      self.marskGot=data.marksGot;
      self.attempted=data.attempted;
      self.correctAnswers=data.correctAnswers;
      self.percent=data.percent;
      self.isSubmit=true;
      },
      error(err){
       console.log(err);
       
      }
    })
    // this.isSubmit=true;

    // call to server to check questions
    //     this.questions.forEach((q:any)=>{
    //       if(q.givenAnswer==q.answer){
    //         this.correctAnswers++;
    //         let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
    //         this.marskGot+=marksSingle;
    //       }
    //      if(q.givenAnswer!="" ){
    //         this.attempted++;
    //       }
    //     })
    //     this.percent= (this.correctAnswers/this.questions.length)*100;
    //     console.log("Correct Answers: "+this.correctAnswers);
        
    //     console.log("Marks Got: "+ (this.correctAnswers*100)/this.questions.length);
    //     console.log("Attempted:"+ this.attempted);
  }
}
