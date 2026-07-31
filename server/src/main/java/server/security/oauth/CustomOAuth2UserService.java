package server.security.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import server.entity.User;
import server.repository.UserRepository;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        OAuth2AccessToken accessToken = userRequest.getAccessToken();

        User user = userRepository.findByEmail(email).orElseGet(() -> {

            User newUser = User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .role("USER")
                    .provider("GOOGLE")
                    .gmailConnected(true)
                    .build();

            return userRepository.save(newUser);
        });

        // Update Google token details every login
        user.setGoogleAccessToken(accessToken.getTokenValue());
        user.setGoogleTokenExpiry(accessToken.getExpiresAt());
        user.setGmailConnected(true);

        userRepository.save(user);

        return oAuth2User;
    }
}