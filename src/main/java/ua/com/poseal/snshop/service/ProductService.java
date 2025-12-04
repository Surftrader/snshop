package ua.com.poseal.snshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.poseal.snshop.model.ProductEntity;
import ua.com.poseal.snshop.repository.ProductRepo;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private ProductRepo productRepo;

    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public List<ProductEntity> findAll() {
        return productRepo.findAll();
    }

    public Optional<ProductEntity> findById(Long id) {
        return productRepo.findById(id);
    }
}
