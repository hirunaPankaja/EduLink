package com.EduLink.OnlineQuiz.controller;

import com.EduLink.OnlineQuiz.data.Quiz;
import com.EduLink.OnlineQuiz.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    // Endpoint to get all quizzes
    @GetMapping("/view")
    public List<Quiz> getAllQuizzes() {
        return quizService.getAllQuiz();
    }


    @PostMapping("/create")
    public ResponseEntity<?> createQuiz(@RequestBody Quiz quiz) {

            Quiz createdQuiz = quizService.saveQuiz(quiz);
            return new ResponseEntity<>(createdQuiz, HttpStatus.CREATED);

    }

    @GetMapping("/Quizets/{subject}/{lesson}")
    public List<String> getQuizsetBySubjectAndLesson(
            @PathVariable String subject,
            @PathVariable String lesson){
        return quizService.getQuizSetsBySubjectAndLesson(subject, lesson);
    }

}
