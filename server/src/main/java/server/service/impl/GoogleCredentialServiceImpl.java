package server.service.impl;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import server.entity.User;
import server.repository.UserRepository;
import server.service.GoogleCredentialService;

import java.time.Instant;

@Service
public class GoogleCredentialServiceImpl implements GoogleCredentialService {

    @Autowired
    private UserRepository userRepository;

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    @Override
    public Credential getCredential(String email) throws Exception {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        if (user.getGoogleAccessToken() == null) {
            throw new RuntimeException("Google account is not connected.");
        }

        GoogleCredential credential = new GoogleCredential.Builder()
                .setTransport(GoogleNetHttpTransport.newTrustedTransport())
                .setJsonFactory(GsonFactory.getDefaultInstance())
                .setClientSecrets(clientId, clientSecret)
                .setTokenServerEncodedUrl("https://oauth2.googleapis.com/token")
                .build();

        credential.setAccessToken(user.getGoogleAccessToken());

        if (user.getGoogleRefreshToken() != null) {
            credential.setRefreshToken(user.getGoogleRefreshToken());

            boolean refreshed = credential.refreshToken();

            if (refreshed) {

                System.out.println("Access Token Refreshed Successfully");

                user.setGoogleAccessToken(credential.getAccessToken());

                if (credential.getExpirationTimeMilliseconds() != null) {
                    user.setGoogleTokenExpiry(
                            Instant.ofEpochMilli(
                                    credential.getExpirationTimeMilliseconds()
                            )
                    );
                }

                userRepository.save(user);
            }
        }

        return credential;
    }
}