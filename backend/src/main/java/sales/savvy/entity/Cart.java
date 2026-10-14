package sales.savvy.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
@Entity
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@OneToOne
	private User user;
	@OneToMany
	private List<CartItems> itemList;
	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Cart(Long id, User user, List<CartItems> itemList) {
		super();
		this.id = id;
		this.user = user;
		this.itemList = itemList;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public List<CartItems> getItemList() {
		return itemList;
	}
	public void setItemList(List<CartItems> itemList) {
		this.itemList = itemList;
	}
	@Override
	public String toString() {
		return "Cart [id=" + id + ", user=" + user + ", itemList=" + itemList + "]";
	}
	

}
