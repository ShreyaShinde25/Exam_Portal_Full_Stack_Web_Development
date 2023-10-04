import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{

  qid:any;
  quiz:any;

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private router:Router){}

  ngOnInit(): void {

    this.qid= this._route.snapshot.params['qid'];
    const self=this;
    this._quiz.getQuiz(this.qid).subscribe({
      next(data:any){
        console.log(data);
        self.quiz=data;

        
      },
      error(err){
        console.log(err);
        
      }
    })
    
  }

  startQuiz(){
    const self=this;
    Swal.fire({
      title: 'Do you want to start the quiz?',
      // showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Start',
      // denyButtonText: `Cancel`,
      icon:'info',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        self.router.navigate(['/start/'+this.qid]);
      } else if (result.isDenied) {
      }
    })

  }

}
