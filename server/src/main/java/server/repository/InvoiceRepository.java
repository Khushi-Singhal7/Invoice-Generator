package server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import server.entity.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceRepository extends MongoRepository<Invoice, String> {

    // Get all invoices of logged-in user
    List<Invoice> findByUserEmail(String userEmail);

    // Get invoice by id of logged-in user
    Optional<Invoice> findByIdAndUserEmail(String id, String userEmail);

    // Search invoice number for logged-in user
    List<Invoice> findByUserEmailAndInvoiceNumberContainingIgnoreCase(
            String userEmail,
            String invoiceNumber
    );

    // Pagination for logged-in user
    Page<Invoice> findByUserEmail(String userEmail, Pageable pageable);
}