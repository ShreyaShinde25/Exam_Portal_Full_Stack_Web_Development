import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit{

  quizzes=[{
    qId:23,
    title:'Basic Java Quiz',
    description:' It is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
    maxMarks:'50',
    numberOfQuestions: '20',
    active:'',
    category:{
      title:'Programming'
    }
  },
  {
    qId:24,
    title:'Basic Python Quiz',
    description:' It is a part of the Java programming language that one can use for developing or creating a general-purpose app.',
    maxMarks:'50',
    numberOfQuestions: '20',
    active:'',
    category:{
      title:'Programming'
    }
  }
  ];

  constructor(private _quiz:QuizService){

  }
  
  ngOnInit(): void {
    const self=this;
    this._quiz.quizzes().subscribe({
      next(data:any){
        self.quizzes=data;
        console.log(self.quizzes);
      },
      error(err){
        console.log(err);
        Swal.fire('Error!',"Error in loading data",'error')
        
      }
    })
    
  }

  //delete Quiz
  deleteQuiz(qId:any){
    // alert(qId);

    Swal.fire({
      icon: 'info',
      title:"Are you sure?",
      confirmButtonText:'Delete', 
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        const self=this;
        this._quiz.deleteQuiz(qId).subscribe({
          next(data:any){
            self.quizzes=self.quizzes.filter((quiz:any)=>quiz.qId !=qId);
            Swal.fire('Success!',"Quiz deleted Successfully",'success');
          },
            error(err){
             Swal.fire('Error!','Error in deleting the quiz', 'error');
            } 
        })

      }
    });
  
  }

 


}



   