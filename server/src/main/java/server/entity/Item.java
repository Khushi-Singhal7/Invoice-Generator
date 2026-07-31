package server.entity;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {

    @NotBlank(message = "Item name is required")
    private String name;

    @Positive(message = "Quantity must be greater than 0")
    private int quantity;

    @Positive(message = "Price must be greater than 0")
    private BigDecimal price;

    @Positive(message = "Total must be greater than 0")
    private BigDecimal total;
}