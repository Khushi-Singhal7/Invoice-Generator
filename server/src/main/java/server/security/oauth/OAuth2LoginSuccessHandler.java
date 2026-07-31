package server.security.oauth;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2RefreshToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import server.repository.UserRepository;
import server.util.JwtUtil;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final OAuth2AuthorizedClientService authorizedClientService;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication)
            throws IOException, ServletException {

        OAuth2AuthenticationToken oauth =
                (OAuth2AuthenticationToken) authentication;

        OAuth2User oAuth2User = oauth.getPrincipal();

        String email = oAuth2User.getAttribute("email");

        OAuth2AuthorizedClient client =
                authorizedClientService.loadAuthorizedClient(
                        oauth.getAuthorizedClientRegistrationId(),
                        oauth.getName()
                );

        if (client != null) {

            OAuth2AccessToken accessToken = client.getAccessToken();
            OAuth2RefreshToken refreshToken = client.getRefreshToken();

            userRepository.findByEmail(email).ifPresent(user -> {

                user.setGoogleAccessToken(accessToken.getTokenValue());
                user.setGoogleTokenExpiry(accessToken.getExpiresAt());

                if (refreshToken != null) {
                    user.setGoogleRefreshToken(refreshToken.getTokenValue());
                    System.out.println("Refresh Token Saved");
                } else {
                    System.out.println("Refresh Token Not Received");
                }

                user.setGmailConnected(true);

                userRepository.save(user);
            });
        }

        String jwt = jwtUtil.generateToken(email);

        response.sendRedirect(
                frontendUrl + "/oauth-success?token=" + jwt
        
        );
    }
}