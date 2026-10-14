package sales.savvy.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class CartItems {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private int quantity;
	@ManyToOne
	@JsonIgnore
	private Cart cart;
	@ManyToOne
	private Product prod;
	public CartItems() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CartItems(Long id, int quantity, Cart cart, Product prod) {
		super();
		this.id = id;
		this.quantity = quantity;
		this.cart = cart;
		this.prod = prod;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public Cart getCart() {
		return cart;
	}
	public void setCart(Cart cart) {
		this.cart = cart;
	}
	public Product getProd() {
		return prod;
	}
	public void setProd(Product prod) {
		this.prod = prod;
	}
	@Override
	public String toString() {
		return "CartItems [id=" + id + ", quantity=" + quantity + ", cart=" + cart + ", prod=" + prod + "]";
	}
	
	

}
