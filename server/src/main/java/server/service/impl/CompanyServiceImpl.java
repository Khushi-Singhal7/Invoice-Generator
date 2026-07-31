package server.service.impl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import server.config.UserDetailsImpl;
import server.entity.Company;
import server.repository.CompanyRepository;
import server.service.CompanyService;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyServiceImpl(CompanyRepository companyRepository) {
        this.companyRepository = companyRepository;
    }

    private String getCurrentUserEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl user =
                (UserDetailsImpl) authentication.getPrincipal();

        return user.getUsername();
    }

    @Override
    public Company saveCompany(Company company) {

        company.setUserEmail(getCurrentUserEmail());

        return companyRepository.save(company);
    }

    @Override
    public List<Company> getAllCompanies() {

        return companyRepository.findByUserEmail(
                getCurrentUserEmail()
        );
    }

    @Override
    public Optional<Company> getCompanyById(String id) {

        return companyRepository.findByIdAndUserEmail(
                id,
                getCurrentUserEmail()
        );
    }

    @Override
    public Company updateCompany(String id, Company company) {

        Company existingCompany = companyRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company not found with id: " + id));

        company.setId(existingCompany.getId());

        // Owner same rahega
        company.setUserEmail(existingCompany.getUserEmail());

        return companyRepository.save(company);
    }

    @Override
    public void deleteCompany(String id) {

        Company company = companyRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Company not found with id: " + id));

        companyRepository.delete(company);
    }
}