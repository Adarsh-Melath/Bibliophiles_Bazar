package com.backend.infrastructure.security;

import java.util.List;



import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.backend.infrastructure.oauth.OAuth2SuccessHandler;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JWTAuthFilter jwtAuthFilter;
    private final OAuth2SuccessHandler oAuth2SuccessHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(
                        corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(
                        auth -> auth.requestMatchers("/api/auth/**", "/oauth2/**",
                                "/login/oauth2/**", "/api/vendor/apply", "/api/vendor/application",
                                "/actuator/prometheus", "/api/categories/**", "/api/products/**").permitAll()
                                .anyRequest().authenticated())
                .httpBasic(basic -> basic.disable())
                .formLogin(form -> form.disable())
                .oauth2Login(oauth2 -> oauth2.successHandler(oAuth2SuccessHandler))
                // .exceptionHandling(ex -> ex.authenticationEntryPoint(apiAuthenticationEntryPoint()))
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:5173",
                "http://localhost:5174",
                "https://bibliophilesbazar.vercel.app",
                "https://*.vercel.app"));

        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // /**
    //  * Custom entry point that returns 401 JSON for API requests instead of
    //  * redirecting to OAuth2 login (which is the default behavior when oauth2Login() is configured).
    //  */
    // @Bean
    // public AuthenticationEntryPoint apiAuthenticationEntryPoint() {
    //     return (request, response, authException) -> {
    //         response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    //         response.setContentType(MediaType.APPLICATION_JSON_VALUE);
    //         response.getWriter().write("{\"error\": \"Unauthorized\", \"message\": \"Authentication required\"}");
    //     };
    // }
}
