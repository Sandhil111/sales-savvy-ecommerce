package sales.savvy.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import sales.savvy.dto.LoginData;
import sales.savvy.entity.User;
import sales.savvy.repository.UserRepository;

@Service
public class UserServiceImplementation implements UserService{
	@Autowired
	UserRepository repo;

	public String addUser(User user) {
		String username=user.getUsername();
		User u=getUser(username);
		if(u!=null) {
			return "fail";
		}
		else {
			repo.save(user);
			return "success";	
		}
	}

	public User getUser(String username) {
		return repo.findByUsername(username);
	}
	
	public String validateUser(LoginData data) {
		String webUsername=data.getUsername();
		String webPassword=data.getPassword();
		User u=getUser(webUsername);
		if(u==null) {
			return "invalid";
		}
		else {
			String dbPassword=u.getPassword();
			if(webPassword.equals(dbPassword)) {
				String role=u.getRole();
				if(role.equalsIgnoreCase("Admin")) {
					return "Admin";
				}
				else {
					return "Customer";
				}
			}
			else
				return "invalid";
		}
	}

}
