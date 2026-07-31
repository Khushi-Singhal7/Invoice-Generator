package server.service;

import server.entity.Client;

import java.util.List;

public interface ClientService {

    Client saveClient(Client client);

    List<Client> getAllClients();

    Client getClientById(String id);

    Client updateClient(String id, Client client);

    void deleteClient(String id);
}