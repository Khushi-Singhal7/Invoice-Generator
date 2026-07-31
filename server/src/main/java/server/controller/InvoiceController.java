package server.controller;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import server.entity.Invoice;
import server.service.InvoiceService;
import server.service.MailService;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@CrossOrigin(origins = "http://localhost:5173")
public class InvoiceController {

    private final InvoiceService invoiceService;
    private final MailService mailService;

    public InvoiceController(
            InvoiceService invoiceService,
            MailService mailService
    ) {
        this.invoiceService = invoiceService;
        this.mailService = mailService;
    }

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(
            @Valid @RequestBody Invoice invoice
    ) {
        return ResponseEntity.ok(
                invoiceService.saveInvoice(invoice)
        );
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(
                invoiceService.getAllInvoices()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invoice> getInvoiceById(
            @PathVariable String id
    ) {

        return invoiceService.getInvoiceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvoice(
            @PathVariable String id
    ) {

        invoiceService.deleteInvoice(id);

        return ResponseEntity.ok(
                "Invoice deleted successfully."
        );

    }

    @PutMapping("/{id}")
    public ResponseEntity<Invoice> updateInvoice(
            @PathVariable String id,
            @Valid @RequestBody Invoice invoice
    ) {

        return ResponseEntity.ok(
                invoiceService.updateInvoice(id, invoice)
        );

    }

    // ✅ Mark Invoice as Paid
    @PutMapping("/{id}/paid")
    public ResponseEntity<Invoice> markAsPaid(
            @PathVariable String id
    ) {

        return ResponseEntity.ok(
                invoiceService.markAsPaid(id)
        );

    }

    @GetMapping("/search")
    public ResponseEntity<List<Invoice>> searchInvoices(
            @RequestParam String invoiceNumber
    ) {

        return ResponseEntity.ok(
                invoiceService.searchInvoices(invoiceNumber)
        );

    }

    @GetMapping("/page")
    public ResponseEntity<Page<Invoice>> getInvoices(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "issueDate") String sortBy
    ) {

        return ResponseEntity.ok(
                invoiceService.getInvoices(page, size, sortBy)
        );

    }

    // ==========================
    // Send Invoice Email
    // ==========================

    @PostMapping("/send-email")
    public ResponseEntity<String> sendInvoiceEmail(

            @RequestParam("email") String email,

            @RequestParam("invoiceNumber") String invoiceNumber,

            @RequestParam("pdf") MultipartFile pdf

    ) {

        mailService.sendInvoiceEmail(
                email,
                invoiceNumber,
                pdf
        );

        return ResponseEntity.ok(
                "Invoice sent successfully."
        );

    }

}