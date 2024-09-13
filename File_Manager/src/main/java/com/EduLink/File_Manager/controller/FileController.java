package com.EduLink.File_Manager.controller;

import com.EduLink.File_Manager.data.FileData;
import com.EduLink.File_Manager.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file,
                                        @RequestParam("subjectName") String subjectName,
                                        @RequestParam("lessonName") String lessonName) {
        try {
            FileData fileData = fileService.uploadFile(file, subjectName, lessonName);
            return new ResponseEntity<>(fileData, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("File upload failed", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/lessons/{subjectName}")
    public List<String> getLessonNamesBySubjectName(@PathVariable String subjectName) {
        return fileService.getLessonNamesBySubjectName(subjectName);
    }
    @GetMapping("/view/{subjectName}/{lessonName}")
    public ResponseEntity<?> viewFileBySubjectAndLesson(@PathVariable("subjectName") String subjectName,
                                                        @PathVariable("lessonName") String lessonName) {
        Optional<FileData> fileDataOptional = fileService.getFileBySubjectAndLesson(subjectName, lessonName);

        if (fileDataOptional.isPresent()) {
            FileData fileData = fileDataOptional.get();
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(fileData.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileData.getFileName() + "\"")
                    .body(fileData.getData());
        } else {
            return new ResponseEntity<>("File not found", HttpStatus.NOT_FOUND);
        }
    }
}
