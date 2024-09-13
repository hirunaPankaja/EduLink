package com.EduLink.OnlineQuiz.service;

import com.EduLink.OnlineQuiz.data.Quiz;
import com.EduLink.OnlineQuiz.data.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;


@Service
public class QuizService
{
    @Autowired
    private QuizRepository quizRepository;

    public List<Quiz> getAllQuiz()
    {
        return quizRepository.findAll();
    }

    // Method to find quizzes by subject and lesson
    public List<Quiz> getQuizzesBySubjectAndLesson(String subject, String lesson) {
        return quizRepository.findBySubjectAndLesson(subject, lesson);
    }

    public Quiz saveQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<String> getQuizSetsBySubjectAndLesson(String subject, String lesson) {
        return quizRepository.findQuizSetsBySubjectAndLesson(subject, lesson);
    }
    public List<Quiz> getQuizzesByQuizSet(String quiz_set) {

        return quizRepository.findByQuiz(quiz_set);
    }
    public List<Quiz> getQuizzesBySubject(String subject) {
        return quizRepository.findQuizBySubject(subject);
    }
}