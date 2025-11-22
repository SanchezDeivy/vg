# Build stage: usa Maven con JDK 17 (Eclipse Temurin)
FROM maven:3.9.5-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar pom y código
COPY pom.xml .
COPY src ./src

# Compilar la aplicación (sin tests)
RUN mvn -B clean package -DskipTests

# Runtime: JRE Java 17 (Eclipse Temurin)
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copiar el JAR generado desde la etapa de build
COPY --from=build /app/target/*.jar app.jar

# Puerto por defecto (ajusta si tu app usa otro)
EXPOSE 8080

# Ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]