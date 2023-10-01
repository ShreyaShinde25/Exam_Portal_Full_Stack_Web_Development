import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionsOfQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`);
  }
  
  //add question
  public addQuestion(question:any){
    return this._http.post(`${baseUrl}/question/`,question);
    //this returns observable which will be subscribed when the function is called
  }

  //delete question
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }

  //update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //get question by ques Id 
  public getQuestion(quesId:any){
    console.log(this._http.get(`${baseUrl}/question/${quesId}`));
    
    return this._http.get(`${baseUrl}/question/${quesId}`);
    
  }
}
