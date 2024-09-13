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
    @GetMapping("/quizSet/{quiz_set}")
    public ResponseEntity<List<Quiz>> getQuizzesByQuizSet(@PathVariable String quiz_set) {
        List<Quiz> quizzes = quizService.getQuizzesByQuizSet(quiz_set);
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }

    @GetMapping("/Quizets/{subject}/{lesson}")
    public ResponseEntity<List<String>> getQuizzesBySubjectAndLesson(@PathVariable String subject, @PathVariable String lesson) {
        List<String> quizzes = quizService.getQuizSetsBySubjectAndLesson(subject, lesson);
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }
    @GetMapping("/quizzes/{subject}")
    public ResponseEntity<List<Quiz>> getQuizzesBySubject(@PathVariable String subject) {
        List<Quiz> quizzes = quizService.getQuizzesBySubject(subject);
        return new ResponseEntity<>(quizzes, HttpStatus.OK);
    }
}
