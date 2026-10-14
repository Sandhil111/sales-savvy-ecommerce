package sales.savvy.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sales.savvy.dto.CartData;
import sales.savvy.entity.Cart;
import sales.savvy.entity.CartItems;
import sales.savvy.entity.Product;
import sales.savvy.entity.User;
import sales.savvy.repository.CartRepository;
import sales.savvy.repository.CartItemsRepository;
import sales.savvy.repository.ProductRepository;
import sales.savvy.repository.UserRepository;

@Service
public class CartServiceImplementation implements CartService {

    @Autowired
    CartRepository cartRepo;

    @Autowired
    CartItemsRepository itemRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    ProductRepository productRepo;

    @Override
    public String addToCart(CartData data) {
        User user = userRepo.findByUsername(data.getUsername());

        if (user == null) {
            return "User not found";
        }

        Product product = productRepo.findById(data.getProd().getId())
                .orElse(null);

        if (product == null) {
            return "Product not found";
        }

        Cart cart = cartRepo.findByUser_Id(user.getId());

        if (cart == null) {
            cart = new Cart();
            cart.setUser(user);
            cart.setItemList(new ArrayList<>());
            cart = cartRepo.save(cart);

            user.setCart(cart);
        }

        CartItems item = itemRepo.findByCart_IdAndProd_Id(
                cart.getId(), product.getId());

        if (item == null) {
            item = new CartItems();
            item.setCart(cart);
            item.setProd(product);
            item.setQuantity(1);
        } else {
            item.setQuantity(item.getQuantity() + 1);
        }

        itemRepo.save(item);
        return "success";
    }

    @Override
    public List<CartItems> getCart(String username) {
        User user = userRepo.findByUsername(username);

        if (user == null) {
            return new ArrayList<>();
        }

        Cart cart = cartRepo.findByUser_Id(user.getId());

        if (cart == null) {
            return new ArrayList<>();
        }

        return itemRepo.findByCart_Id(cart.getId());
    }

    @Override
    public String decreaseQuantity(String username, Long productId) {
        User user = userRepo.findByUsername(username);

        if (user == null) {
            return "User not found";
        }

        Cart cart = cartRepo.findByUser_Id(user.getId());

        if (cart == null) {
            return "Cart not found";
        }

        CartItems item = itemRepo.findByCart_IdAndProd_Id(
                cart.getId(), productId);

        if (item == null) {
            return "Item not found";
        }

        if (item.getQuantity() <= 1) {
            itemRepo.delete(item);
        } else {
            item.setQuantity(item.getQuantity() - 1);
            itemRepo.save(item);
        }

        return "success";
    }
    
public String clearCart(String username) {
    User user = userRepo.findByUsername(username);

    if (user == null) {
        return "User not found";
    }

    Cart cart = cartRepo.findByUser_Id(user.getId());

    if (cart == null) {
        return "Cart is already empty";
    }

    List<CartItems> items = itemRepo.findByCart_Id(cart.getId());

    itemRepo.deleteAll(items);

    return "success";
}

}