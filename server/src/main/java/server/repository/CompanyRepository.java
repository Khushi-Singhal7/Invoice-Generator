package server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import server.entity.Company;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends MongoRepository<Company, String> {

    List<Company> findByUserEmail(String userEmail);

    Optional<Company> findByIdAndUserEmail(String id, String userEmail);
}