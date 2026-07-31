package server.service.impl;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.services.gmail.Gmail;
import com.google.api.services.gmail.model.Message;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import server.service.GmailService;
import server.service.GoogleCredentialService;

import java.io.ByteArrayOutputStream;
import java.util.Properties;

@Service
@RequiredArgsConstructor
public class GmailServiceImpl implements GmailService {

    private final GoogleCredentialService credentialService;

    @Override
    public void sendInvoice(
            String senderEmail,
            String receiverEmail,
            String subject,
            String body,
            MultipartFile pdfFile
    ) throws Exception {

        try {

            Credential credential = credentialService.getCredential(senderEmail);

            System.out.println("=================================");
            System.out.println("Sender: " + senderEmail);
            System.out.println("Receiver: " + receiverEmail);
            System.out.println("Access Token: " + credential.getAccessToken());
            System.out.println("Refresh Token: " + credential.getRefreshToken());
            System.out.println("=================================");

            Gmail gmail = new Gmail.Builder(
                    com.google.api.client.googleapis.javanet.GoogleNetHttpTransport.newTrustedTransport(),
                    com.google.api.client.json.gson.GsonFactory.getDefaultInstance(),
                    credential
            ).setApplicationName("InvoiceFlow").build();

            MimeMessage email = createEmail(
                    senderEmail,
                    receiverEmail,
                    subject,
                    body,
                    pdfFile
            );

            ByteArrayOutputStream buffer = new ByteArrayOutputStream();
            email.writeTo(buffer);

            Message message = new Message();
            message.setRaw(
                    Base64.encodeBase64URLSafeString(buffer.toByteArray())
            );

            Message sentMessage =
                    gmail.users().messages().send("me", message).execute();

            System.out.println("✅ Email Sent Successfully");
            System.out.println("Message ID: " + sentMessage.getId());

        } catch (Exception e) {

            System.out.println("❌ Gmail API Error");
            e.printStackTrace();

            throw e;
        }
    }

    private MimeMessage createEmail(
            String from,
            String to,
            String subject,
            String body,
            MultipartFile pdf
    ) throws Exception {

        Session session = Session.getDefaultInstance(new Properties());

        MimeMessage email = new MimeMessage(session);

        email.setFrom(new InternetAddress(from));
        email.addRecipient(
                jakarta.mail.Message.RecipientType.TO,
                new InternetAddress(to)
        );

        email.setSubject(subject);

        MimeBodyPart text = new MimeBodyPart();
        text.setText(body);

        MimeBodyPart attachment = new MimeBodyPart();
        attachment.setFileName("Invoice.pdf");
        attachment.setContent(pdf.getBytes(), "application/pdf");

        MimeMultipart multipart = new MimeMultipart();
        multipart.addBodyPart(text);
        multipart.addBodyPart(attachment);

        email.setContent(multipart);

        return email;
    }
}