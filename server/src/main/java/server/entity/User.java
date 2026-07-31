package server.entity;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    private String role;

    @Builder.Default
    private String provider = "LOCAL";

    // ==========================
    // Google Gmail Integration
    // ==========================

    private String googleAccessToken;

    private String googleRefreshToken;

    private Instant googleTokenExpiry;

    @Builder.Default
    private Boolean gmailConnected = false;

}