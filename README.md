# Proyecto Integrador

Sistema de Modificación de Carga Académica y Retiro (SMCAR)

### Integrantes

- Victor Bayas
- Luis Fuertes

## Instrucciones para el despliegue

### Backend

> Necesitamos tener Docker instalado en nuestra máquina

1. Nos dirigimos a la carpeta `BACKEND`
2. Revisamos el archivo `docker-compose.yaml` y las variables de entorno del archivo `variables.env` que le pasaremos a los contenedores de Docker
3. Finalmente, levantamos los servicios con `docker-compose up -d`

### Frontend

> Necesitamos contar con Node.JS y Angular CLI instalados en nuestra máquina

1. Obtenemos los módulos utilizados en el proyecto con `npm install .`
2. Finalmente, podemos abrir nuestra aplicación con `ng serve --open`