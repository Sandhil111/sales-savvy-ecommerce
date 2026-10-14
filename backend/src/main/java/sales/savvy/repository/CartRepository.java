package sales.savvy.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sales.savvy.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUser_Id(Long userId);
}