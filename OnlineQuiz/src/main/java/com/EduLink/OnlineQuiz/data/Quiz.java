package com.EduLink.OnlineQuiz.data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name = "ol_english_medium")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int quiz_id;

    @Column(name ="quiz_set")
    private String quiz_set;

    @Column(name = "subject")
    private String subject;

    @Column(name = "lesson")
    private String lesson;

    @Lob  // Add this annotation to handle large text content
    @Column(name = "question", columnDefinition = "TEXT")
    private String question;

    @Column(name = "answer_1")
    private String answer_1;

    @Column(name = "answer_2")
    private String answer_2;

    @Column(name = "answer_3")
    private String answer_3;

    @Column(name = "answer_4")
    private String answer_4;

    @Column(name = "correct_answer")
    private int correct_answer;

}