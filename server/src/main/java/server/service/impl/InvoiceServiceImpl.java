package server.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import server.config.UserDetailsImpl;
import server.entity.Invoice;
import server.exception.InvoiceNotFoundException;
import server.repository.InvoiceRepository;
import server.service.InvoiceService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    private final InvoiceRepository invoiceRepository;

    public InvoiceServiceImpl(InvoiceRepository invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    private String getCurrentUserEmail() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl user =
                (UserDetailsImpl) authentication.getPrincipal();

        return user.getUsername();
    }

    @Override
    public Invoice saveInvoice(Invoice invoice) {

        invoice.setUserEmail(getCurrentUserEmail());

        return invoiceRepository.save(invoice);
    }

    @Override
    public List<Invoice> getAllInvoices() {

        List<Invoice> invoices =
                invoiceRepository.findByUserEmail(getCurrentUserEmail());

        boolean updated = false;

        for (Invoice invoice : invoices) {

            if (invoice.getDueDate() != null
                    && invoice.getStatus() != null
                    && invoice.getStatus().equalsIgnoreCase("Pending")
                    && invoice.getDueDate().isBefore(LocalDate.now())) {

                invoice.setStatus("Overdue");
                invoiceRepository.save(invoice);
                updated = true;
            }
        }

        if (updated) {
            invoices =
                    invoiceRepository.findByUserEmail(getCurrentUserEmail());
        }

        return invoices;
    }

    @Override
    public Optional<Invoice> getInvoiceById(String id) {

        Optional<Invoice> optionalInvoice =
                invoiceRepository.findByIdAndUserEmail(
                        id,
                        getCurrentUserEmail()
                );

        optionalInvoice.ifPresent(invoice -> {

            if (invoice.getDueDate() != null
                    && invoice.getStatus() != null
                    && invoice.getStatus().equalsIgnoreCase("Pending")
                    && invoice.getDueDate().isBefore(LocalDate.now())) {

                invoice.setStatus("Overdue");
                invoiceRepository.save(invoice);
            }

        });

        return invoiceRepository.findByIdAndUserEmail(
                id,
                getCurrentUserEmail()
        );
    }

    @Override
    public void deleteInvoice(String id) {

        Invoice invoice = invoiceRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new InvoiceNotFoundException("Invoice not found"));

        invoiceRepository.delete(invoice);
    }

    @Override
    public Invoice updateInvoice(String id, Invoice invoice) {

        Invoice existingInvoice = invoiceRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new InvoiceNotFoundException(
                                "Invoice not found with id: " + id));

        invoice.setId(existingInvoice.getId());

        // Owner same rahega
        invoice.setUserEmail(existingInvoice.getUserEmail());

        return invoiceRepository.save(invoice);
    }

    @Override
    public List<Invoice> searchInvoices(String invoiceNumber) {
        return invoiceRepository
                .findByUserEmailAndInvoiceNumberContainingIgnoreCase(
                        getCurrentUserEmail(),
                        invoiceNumber
                );
    }

    @Override
    public Page<Invoice> getInvoices(int page,
                                     int size,
                                     String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).descending()
        );

        return invoiceRepository.findByUserEmail(
                getCurrentUserEmail(),
                pageable
        );
    }

    @Override
    public Invoice markAsPaid(String id) {

        Invoice invoice = invoiceRepository
                .findByIdAndUserEmail(id, getCurrentUserEmail())
                .orElseThrow(() ->
                        new InvoiceNotFoundException(
                                "Invoice not found with id: " + id));
        invoice.setStatus("Paid");

        return invoiceRepository.save(invoice);
    }

}