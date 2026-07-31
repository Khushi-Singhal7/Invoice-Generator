package server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.service.GmailService;
import server.service.MailService;

@Service
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final GmailService gmailService;

    @Override
    public void sendInvoiceEmail(
            String to,
            String invoiceNumber,
            MultipartFile pdfFile
    ) {

        try {

            Authentication authentication =
                    SecurityContextHolder.getContext().getAuthentication();

            String senderEmail = authentication.getName();

            gmailService.sendInvoice(
                    senderEmail,
                    to,
                    "Invoice " + invoiceNumber,
                    """
                    Dear Customer,

                    Please find your invoice attached.

                    Thank you for your business.

                    Regards,
                    InvoiceFlow
                    """,
                    pdfFile
            );

        } catch (Exception e) {

            throw new RuntimeException(
                    "Unable to send email",
                    e
            );

        }

    }
}