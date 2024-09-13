package com.EduLink.OnlineQuiz.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz,Integer> {

        List<Quiz> findBySubjectAndLesson(String subject, String lesson);
        @Query("SELECT q.quiz_set FROM Quiz q WHERE q.subject = :subject AND q.lesson = :lesson")
        List<String> findQuizSetsBySubjectAndLesson(@Param("subject") String subject, @Param("lesson") String lesson);
}
