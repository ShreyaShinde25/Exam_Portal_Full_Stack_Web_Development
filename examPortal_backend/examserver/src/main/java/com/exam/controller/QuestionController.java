package com.exam.controller;


import com.exam.model.exam.Question;
import com.exam.model.exam.Quiz;
import com.exam.service.QuestionService;
import com.exam.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/question")
public class QuestionController {

    @Autowired  //QuestionServiceImpl obj will be created
    private QuestionService questionService;

    @Autowired
    private QuizService quizService;

    //add question
    @PostMapping("/")
    public ResponseEntity<Question> add(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.addQuestion(question));
    }

    //update the question
    @PutMapping("/")
    public ResponseEntity<Question> update(@RequestBody Question question){
        return ResponseEntity.ok(this.questionService.updateQuestion(question));
    }

    //get question of quiz
    @GetMapping("/quiz/{qid}")
    public ResponseEntity<?> getQuestionsOfQuiz(@PathVariable("qid") Long qid){
//        Quiz quiz = new Quiz();
//        quiz.setqId(qid);
//        Set<Question> questionsOfQuiz= this.questionService.getQuestionsOfQuiz(quiz);
//        return ResponseEntity.ok(questionsOfQuiz);

       Quiz quiz= this.quizService.getQuiz(qid);
       Set<Question> questions= quiz.getQuestions();
        List<Question> list= new ArrayList(questions);
        if(list.size()>Integer.parseInt(quiz.getNumberOfQuestions())){
            list=list.subList(0,Integer.parseInt(quiz.getNumberOfQuestions()+1));
        }
        list.forEach((q)->{
            q.setAnswer("");
        });
        Collections.shuffle(list); //order of elements is shuffled
        return ResponseEntity.ok(list);
    }


    @GetMapping("/quiz/all/{qid}")
    public ResponseEntity<?> getQuestionsOfQuizAdmin(@PathVariable("qid") Long qid){
        Quiz quiz = new Quiz();
        quiz.setqId(qid);
        Set<Question> questionsOfQuiz= this.questionService.getQuestionsOfQuiz(quiz);
        return ResponseEntity.ok(questionsOfQuiz);
    }

    //get single question
    @GetMapping("/{quesId}")
    public Question get(@PathVariable("quesId") Long quesId){
        return this.questionService.getQuestion(quesId);
    }

    //delete question
    @DeleteMapping("/{quesId}")
    public void delete(@PathVariable("quesId") Long quesId){
       this.questionService.deleteQuestion(quesId);
    }


    //eval quiz
    @PostMapping("/eval-quiz")
    public ResponseEntity<?> evalQuiz(@RequestBody List<Question> questions){
        System.out.println(questions);
        double marksGot =0;
        int correctAnswers=0;
        int attempted=0;
        int notattempted=0;
        int percent=0;
        for(Question q:questions ){
            //System.out.println(q.getGivenAnswers());
            //single question
            Question question=this.questionService.get(q.getQuesId());
            System.out.println("Heyy"+q.getQuesId());

            System.out.println("HARSHHH: "+question.getAnswer()+"-----"+q.getGivenAnswers());


            if(q.getGivenAnswers()==null){
                q.setGivenAnswers("");
            }
            if (q.getGivenAnswers() == null || q.getGivenAnswers().equals("")) {
                notattempted++;
            }
                if (question.getAnswer().trim().equals(q.getGivenAnswers().trim())) {
                    //correct answer
                    System.out.println("Heyy correct answer");
                    correctAnswers++;
                    double marksSingle= Double.parseDouble(questions.get(0).getQuiz().getMaxMarks())/questions.size();
                    marksGot +=marksSingle;
                }


        }
        attempted=questions.size()-notattempted;
        percent= (correctAnswers*100)/questions.size();
        Map<String, Object> map= Map.of("marksGot",marksGot,"correctAnswers",correctAnswers,"attempted",attempted, "percent", percent);
        return ResponseEntity.ok(map);
    }



}
