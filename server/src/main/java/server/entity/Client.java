package server.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "clients")
public class Client {

    @Id
    private String id;

    // Logged-in user owner
    private String userEmail;

    private String clientName;
    private String email;
    private String phone;
    private String gstNumber;
    private String address;
}