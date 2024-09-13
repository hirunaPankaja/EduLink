package com.EduLink.File_Manager.repository;

import com.EduLink.File_Manager.data.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FileRepository extends JpaRepository<FileData, Long> {
    @Query("SELECT DISTINCT f.lessonName FROM FileData f WHERE f.subjectName = :subjectName")
    List<String> getLessonNamesBySubjectName(String subjectName);
    @Query("SELECT f FROM FileData f WHERE f.subjectName = :subjectName AND f.lessonName = :lessonName")
    Optional<FileData> findBySubjectNameAndLessonName(String subjectName, String lessonName);
}
