package server.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import server.entity.Client;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends MongoRepository<Client, String> {

    List<Client> findByUserEmail(String userEmail);

    Optional<Client> findByIdAndUserEmail(String id, String userEmail);

    List<Client> findByUserEmailAndClientNameContainingIgnoreCase(
            String userEmail,
            String clientName
    );
}