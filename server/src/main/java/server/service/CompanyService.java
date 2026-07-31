package server.service;

import server.entity.Company;

import java.util.List;
import java.util.Optional;

public interface CompanyService {

    Company saveCompany(Company company);

    List<Company> getAllCompanies();

    Optional<Company> getCompanyById(String id);

    Company updateCompany(String id, Company company);

    void deleteCompany(String id);
}