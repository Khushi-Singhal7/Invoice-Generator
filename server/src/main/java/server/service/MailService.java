package server.service;

import org.springframework.web.multipart.MultipartFile;

public interface MailService {

    void sendInvoiceEmail(
            String to,
            String invoiceNumber,
            MultipartFile pdfFile
    );

}