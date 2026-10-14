
package sales.savvy.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import sales.savvy.dto.CartData;
import sales.savvy.entity.CartItems;
import sales.savvy.service.CartService;

@CrossOrigin("*")
@RestController
public class CartController {

    @Autowired
    CartService service;

    @PostMapping("/addToCart")
    public String addToCart(@RequestBody CartData data) {
        return service.addToCart(data);
    }

    @GetMapping("/getCart")
    public List<CartItems> getCart(@RequestParam String username) {
        return service.getCart(username);
    }

    @PostMapping("/decreaseQuantity")
    public String decreaseQuantity(
            @RequestParam String username,
            @RequestParam Long productId) {
        return service.decreaseQuantity(username, productId);
    }

    @DeleteMapping("/clearCart")
    public String clearCart(@RequestParam String username) {
        return service.clearCart(username);
    }
}
