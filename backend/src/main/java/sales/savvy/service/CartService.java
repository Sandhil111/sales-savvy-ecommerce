
package sales.savvy.service;

import java.util.List;
import sales.savvy.dto.CartData;
import sales.savvy.entity.CartItems;

public interface CartService {

    String addToCart(CartData data);

    List<CartItems> getCart(String username);

    String decreaseQuantity(String username, Long productId);

    String clearCart(String username);
}
