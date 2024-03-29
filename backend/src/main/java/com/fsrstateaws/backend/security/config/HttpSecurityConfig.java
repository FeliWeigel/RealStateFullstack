package com.fsrstateaws.backend.security.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class HttpSecurityConfig{

    private final AuthenticationProvider authenticationProvider;
    private final SecurityAuthFilter securityAuthFilter;
    private final CorsConfigurationSource corsConfigurationSource;
    private final LogoutService logoutService;

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.cors().configurationSource(corsConfigurationSource)
                .and()
                .csrf().disable()
                .authorizeHttpRequests()
                .requestMatchers("/api/v1/properties/all/**", "/api/v1/properties/details/**")
                .permitAll()
                .requestMatchers("/api/v1/user/update/recover_pass", "/api/v1/user/update/request")
                .permitAll()
                .requestMatchers("/api/v1/properties/upload/**", "/api/v1/properties/delete/**")
                .hasAnyAuthority("ADMIN")
                .requestMatchers("/api/v1/operations/**")
                .hasAnyAuthority("ADMIN")
                .requestMatchers("/api/v1/properties/favorites/all/delete")
                .hasAnyAuthority("ADMIN")
                .requestMatchers("/api/v1/auth/**")
                .permitAll()
                .requestMatchers("/swagger-ui/**")
                .permitAll()
                .requestMatchers("/v3/api-docs/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(securityAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .logout()
                .logoutUrl("/api/v1/auth/logout")
                .addLogoutHandler(logoutService)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                .logoutSuccessUrl("/api/v1/auth/login")
                .and()
                .build();
    }
}
