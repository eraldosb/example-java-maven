# Use OpenJDK 11 as base image
FROM openjdk:11-jre-slim

# Set working directory
WORKDIR /app

# Copy the JAR file from target directory
COPY target/user-management-app-1.0.0.jar app.jar

# Expose port 8080
EXPOSE 8080

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/users || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

