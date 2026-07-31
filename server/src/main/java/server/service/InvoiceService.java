package server.service;

import org.springframework.data.domain.Page;
import server.entity.Invoice;

import java.util.List;
import java.util.Optional;

public interface InvoiceService {

    Invoice saveInvoice(Invoice invoice);

    List<Invoice> getAllInvoices();

    Optional<Invoice> getInvoiceById(String id);

    void deleteInvoice(String id);

    Invoice updateInvoice(String id, Invoice invoice);

    List<Invoice> searchInvoices(String invoiceNumber);

    Page<Invoice> getInvoices(int page, int size, String sortBy);

    // Mark invoice as Paid
    Invoice markAsPaid(String id);

}