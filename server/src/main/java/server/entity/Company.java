package server.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "companies")
public class Company {

    @Id
    private String id;

    // Logged-in user owner
    private String userEmail;

    private String companyName;
    private String gstNumber;
    private String email;
    private String phone;
    private String address;
    private String logoUrl;
}