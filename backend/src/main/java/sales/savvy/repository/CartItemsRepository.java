package sales.savvy.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import sales.savvy.entity.CartItems;

public interface CartItemsRepository extends JpaRepository<CartItems, Long> {
    CartItems findByCart_IdAndProd_Id(Long cartId, Long productId);
    List<CartItems> findByCart_Id(Long cartId);
}