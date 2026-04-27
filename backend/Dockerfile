# Build the Spring Boot app with a maintained Java 17 image.
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app
COPY pom.xml .
COPY src src

# Copy Maven wrapper
COPY mvnw .
COPY .mvn .mvn

# Set execution permission for the Maven wrapper
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests

# Run the packaged app with a smaller Java 17 runtime image.
FROM eclipse-temurin:17-jre
VOLUME /tmp

# Copy the JAR from the build stage
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["sh","-c","java -Dserver.port=${PORT:-2007} -jar /app.jar"]
EXPOSE 2007
