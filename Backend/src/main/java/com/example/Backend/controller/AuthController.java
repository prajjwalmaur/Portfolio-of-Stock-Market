// package com.example.Backend.controller;


// import com.example.Backend.entity.User;
// import com.example.Backend.service.AuthService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// @RestController
// @RequestMapping("/api/auth")
// public class AuthController {
//     @Autowired
//     private AuthService authService;

//     @PostMapping("/signup")
//     public ResponseEntity<User> signup(@RequestParam String email, @RequestParam String password) {
//         return ResponseEntity.ok(authService.signup(email, password));
//     }

//     @PostMapping("/login")
//     public ResponseEntity<User> login(@RequestParam String email, @RequestParam String password) {
//         return ResponseEntity.ok(authService.login(email, password));
//     }
// }

