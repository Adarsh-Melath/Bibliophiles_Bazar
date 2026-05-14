package com.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.micrometer.metrics.autoconfigure.MeterRegistryCustomizer;
import org.springframework.context.annotation.Bean;

import io.github.cdimascio.dotenv.Dotenv;
import io.micrometer.core.instrument.MeterRegistry;

@SpringBootApplication
public class BackendApplication {

	@Value("${spring.application.name}")
	private String appName;

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load();
		dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
		SpringApplication.run(BackendApplication.class, args);
	}

	@Bean
	MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
		return registry -> registry.config().commonTags("application", appName);
	}

}
