# Multi-stage build for Spring Boot backend
FROM openjdk:11-jre-slim

# Set working directory
WORKDIR /app

# Install curl for health checks
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the JAR file
COPY target/user-management-app-v2-2.0.0.jar app.jar

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8080/api/health/simple || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
