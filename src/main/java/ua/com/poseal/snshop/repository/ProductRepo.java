package ua.com.poseal.snshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.com.poseal.snshop.model.ProductEntity;

public interface ProductRepo extends JpaRepository<ProductEntity, Long> {

}
