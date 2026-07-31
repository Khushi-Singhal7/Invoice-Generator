package server.dto;

import lombok.Data;

@Data
public class CompanyDto {

    private String companyName;
    private String gstNumber;
    private String email;
    private String phone;
    private String address;
    private String logoUrl;
}
