package ua.com.poseal.snshop.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import ua.com.poseal.snshop.dto.ProductDto;
import ua.com.poseal.snshop.model.ProductEntity;
import ua.com.poseal.snshop.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductEntity> getProduct(@PathVariable Long id) {
        return ResponseEntity.of(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<ProductEntity> createProduct(
            @RequestPart("product") @Valid ProductDto dto,
            @RequestPart(value = "file", required = false) MultipartFile file){
        ProductEntity createdProduct = productService.saveProduct(dto, file);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }
}
