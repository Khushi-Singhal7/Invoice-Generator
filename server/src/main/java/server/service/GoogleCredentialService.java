package server.service;

import com.google.api.client.auth.oauth2.Credential;

public interface GoogleCredentialService {

    Credential getCredential(String email) throws Exception;

}