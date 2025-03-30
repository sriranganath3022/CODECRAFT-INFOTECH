package com.task.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class MyConfig { 
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails admin = User.withUsername("HARSHAD") 
                .password(passwordEncoder().encode("harshad2805"))
                .roles("ADMIN").build();
        UserDetails user1 = User.withUsername("USER1") 
                .password(passwordEncoder().encode("user2805"))
                .roles("ADMIN").build();
        UserDetails owner = User.withUsername("OWNER") 
                .password(passwordEncoder().encode("owner2805"))
                .roles("ADMIN").build();
        return new InMemoryUserDetailsManager(admin,user1,owner);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder) throws Exception {
        return builder.getAuthenticationManager();
    }
}
