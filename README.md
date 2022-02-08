#  SMCAR

El Sistema de Modificación de Carga Académica y Retiro (SMCAR) es una plataforma web diseñada para automatizar los procesos de modificación de la carga académica y de retiro en asignatura de un estudiante de la Universidad Iberoamericana del Ecuador (UNIB.E).

[Demo](https://smcar.bayas.dev) (hosteado en una Raspberry Pi 4 🍇)

### Equipo de trabajo

- Victor Bayas
- Luis Fuertes
- Luis Armijos

### Tecnologías usadas

- Lumen 8
- Angular 13
- Docker
- NGINX
- PHP 8.1
- PostgreSQL

## Instrucciones de implementación

### Utilizando Docker

1. Nos dirigimos a la carpeta `backend`
2. Realizamos los cambios que necesitemos al archivo `docker-compose.yaml` y a la configuración de NGINX
3. Levantamos los servicios con `docker-compose up -d`
4. Dentro de la carpeta `html/backend` crearemos un archivo llamado `.env` como el ejemplo (WIP)
5. Entramos al contenedor de PHP con `docker exec -it server_php_1 bash`
6. Nos movemos a `/var/www/html/backend` y ejecutamos `composer install`
7. Creamos una base de datos PGSQL llamada `smcar_v2`
8. Dentro del contenedor ejecutamos `php artisan migrate:fresh` para crear las tablas requeridas
9. El SMCAR debería estar operativo

### Sin Docker

Hoy es un gran día para [aprender Docker](https://docs.docker.com/get-started/) ;)

## Para realizar cambios al frontend

> Necesitamos contar con Node.JS y Angular CLI instalados en nuestra máquina

1. Nos dirigimos a la carpeta `frontend/client`
2. Obtenemos los módulos utilizados en el proyecto con `npm install .`
3. Realizamos los cambios que necesitemos, importante revisar el endpoint de la API en los environments
3. Podemos levantar el frontend en local con `ng serve --open` o hacia NGINX usando el script `deploy.sh` ubicado dentro de la carpeta