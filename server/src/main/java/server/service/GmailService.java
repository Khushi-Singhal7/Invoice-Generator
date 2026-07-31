package server.service;

import org.springframework.web.multipart.MultipartFile;

public interface GmailService {

    void sendInvoice(
            String senderEmail,
            String receiverEmail,
            String subject,
            String body,
            MultipartFile pdfFile
    ) throws Exception;
}