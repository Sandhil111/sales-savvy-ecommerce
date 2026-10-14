package sales.savvy.dto;

import sales.savvy.entity.Product;

public class CartData {
	String username;
	Product prod;
	int quantity;
	public CartData() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CartData(String username, Product prod, int quantity) {
		super();
		this.username = username;
		this.prod = prod;
		this.quantity = quantity;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public Product getProd() {
		return prod;
	}
	public void setProd(Product prod) {
		this.prod = prod;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	@Override
	public String toString() {
		return "CartData [username=" + username + ", prod=" + prod + ", quantity=" + quantity + "]";
	}
	
	

}
