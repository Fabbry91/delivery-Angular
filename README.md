# delivery-Angular

Aplicacion de pagina web Delivery.

Basada en el uso de Angular y TipeScript para la generacion del dashboard. 
Consume los datos de la API la cual fue desarrollada con Node.js, y modulos con los modulos de Express, morgan, mongoose.
La cual salva los datos de productos, realiza el descuento del stock, etc. Los mismos son asignados una base de datos de MongoDB.

Para la arquitectura, validacion y logueo de los usuarios, se utiliza Firebase. La aplicacion cuenta con tres vistas, la vista del Cliente, Cocinero 
y Administrador. Para acceder, a la version DEMO de la aplicacion, como usuario en la base se encuentran cargados tres correos: 
cliente@gmail.com, cocinero@gmail.com, admin@gmail.com. Las contraseñas usada para los tres es 123456.

----DESCARGA DEL REPOSITORIO----
Una vez descargado el mismo. se debe ejecutar el comando "npm nodemon". 
Para correr el servidor se debe contar con MongoDB como base de datos y ejecutar el comando:

npm run dev.

----FRONTEND---
Sebe crear la app en "Firebase" para conectarse a la misma, asi poder loguearse. Una vez obtenida la configuracion de conección a "Firebase"
se pegue en los archivos ENVIROMENT de nuestro proyecto.

Una vez logrado eso debemos crear los usuarios "administrador" y "cocinero" en nuestra base de datos para poder acceder a la seccion de ellos.
