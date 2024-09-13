package com.EduLink.File_Manager.service;

import com.EduLink.File_Manager.data.FileData;
import com.EduLink.File_Manager.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class FileService {

    @Autowired
    private FileRepository fileRepository;

    public FileData uploadFile(MultipartFile file, String subjectName, String lessonName) throws IOException {
        FileData fileData = new FileData();
        fileData.setFileName(file.getOriginalFilename());
        fileData.setFileType(file.getContentType());
        fileData.setData(file.getBytes());
        fileData.setSubjectName(subjectName);
        fileData.setLessonName(lessonName);

        return fileRepository.save(fileData);
    }

    public Optional<FileData> getFile(Long fileId) {

        return fileRepository.findById(fileId);
    }

   public List<String> getLessonNamesBySubjectName(String subjectName) {
        return fileRepository.getLessonNamesBySubjectName(subjectName);
    }

    public Optional<FileData> getFileBySubjectAndLesson(String subjectName, String lessonName) {
        return fileRepository.findBySubjectNameAndLessonName(subjectName, lessonName);
    }
}
