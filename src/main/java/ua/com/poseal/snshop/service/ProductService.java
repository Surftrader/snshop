package ua.com.poseal.snshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.com.poseal.snshop.dto.ProductDto;
import ua.com.poseal.snshop.mapper.ProductMapper;
import ua.com.poseal.snshop.model.ProductEntity;
import ua.com.poseal.snshop.repository.ProductRepo;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductMapper productMapper;
    private ProductRepo productRepo;

    @Autowired
    public ProductService(ProductMapper productMapper, ProductRepo productRepo) {
        this.productMapper = productMapper;
        this.productRepo = productRepo;
    }

    public List<ProductDto> findAll() {
        List<ProductEntity> productEntities = productRepo.findAll();
        return productMapper.toDtoList(productEntities);
    }

    public Optional<ProductEntity> findById(Long id) {
        return productRepo.findById(id);
    }

    public ProductEntity saveProduct(ProductDto productDto) {
        ProductEntity entity = productMapper.toEntity(productDto);
        return productRepo.save(entity);
    }
}
