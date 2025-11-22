# AIOME API

## Como usar
1. Ejecutar: `./mvnw spring-boot:run`
2. Ir a: `http://localhost:8086/swagger-ui.html`

## Endpoints principales
- `POST /api/aiome` - Crear pregunta (guarda en BD)
- `POST /api/aiome/test-ai` - Solo probar AI
- `GET /api/aiome` - Ver todas las preguntas

## Tipos de AI
- GEMINI
- COPILOT

## Base de datos
Ya configurada en Neon PostgreSQL