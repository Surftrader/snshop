package ua.com.poseal.snshop.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import ua.com.poseal.snshop.dto.ProductDto;
import ua.com.poseal.snshop.model.ProductEntity;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    ProductDto toDto(ProductEntity entity);

    @Mapping(target = "id", ignore = true)
    ProductEntity toEntity(ProductDto dto);

    List<ProductDto> toDtoList(List<ProductEntity> entities);
}
