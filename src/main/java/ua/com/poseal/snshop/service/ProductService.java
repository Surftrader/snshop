package ua.com.poseal.snshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.com.poseal.snshop.dto.ProductDto;
import ua.com.poseal.snshop.mapper.ProductMapper;
import ua.com.poseal.snshop.model.ProductEntity;
import ua.com.poseal.snshop.repository.ProductRepo;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final FileService fileService;
    private final ProductMapper productMapper;
    private ProductRepo productRepo;

    @Autowired
    public ProductService(FileService fileService,
                          ProductMapper productMapper,
                          ProductRepo productRepo) {
        this.fileService = fileService;
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

    public ProductEntity saveProduct(ProductDto productDto, MultipartFile file) throws IOException {
        String imageUrl = fileService.saveFile(file);
        ProductEntity entity = productMapper.toEntity(productDto);
        entity.setImageUrl(imageUrl);
        return productRepo.save(entity);
    }
}
