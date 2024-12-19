// package com.example.Backend.service;

// import com.example.Backend.entity.User;
// import com.example.Backend.repository.UserRepository;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;

// @Service
// public class AuthService {
//     @Autowired
//     private UserRepository userRepository;

//     public User signup(String email, String password) {
//         if (userRepository.findByEmail(email).isPresent()) {
//             throw new RuntimeException("User already exists with this email.");
//         }
//         User user = User.builder().email(email).password(password).build();
//         return userRepository.save(user);
//     }

//     public User login(String email, String password) {
//         return userRepository.findByEmail(email)
//                 .filter(user -> user.getPassword().equals(password))
//                 .orElseThrow(() -> new RuntimeException("Invalid email or password"));
//     }
// }

