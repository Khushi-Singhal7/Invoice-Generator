package server.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import server.config.UserDetailsImpl;
import server.entity.Client;
import server.repository.ClientRepository;
import server.service.ClientService;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;

    private String getCurrentUserEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl user =
                (UserDetailsImpl) authentication.getPrincipal();

        return user.getUsername();
    }

    @Override
    public Client saveClient(Client client) {

        client.setUserEmail(getCurrentUserEmail());

        return clientRepository.save(client);
    }

    @Override
    public List<Client> getAllClients() {

        return clientRepository.findByUserEmail(
                getCurrentUserEmail()
        );
    }

    @Override
    public Client getClientById(String id) {

        return clientRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new RuntimeException("Client Not Found"));
    }

    @Override
    public Client updateClient(String id, Client client) {

        Client existing = clientRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new RuntimeException("Client Not Found"));

        existing.setClientName(client.getClientName());
        existing.setEmail(client.getEmail());
        existing.setPhone(client.getPhone());
        existing.setGstNumber(client.getGstNumber());
        existing.setAddress(client.getAddress());

        return clientRepository.save(existing);
    }

    @Override
    public void deleteClient(String id) {

        Client client = clientRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new RuntimeException("Client Not Found"));

        clientRepository.delete(client);
    }
}