# Restaurant - El Buen Sabor - FullStack Aplication

Aplicacion FullStack MEAN (MongoDB, Express, Angular, NodeJs) Delivery - 

La aplicacion permite llevar un control de stock de producto, facturación, manejo de pedidos, carga, actualización, edición de articulos. Cuenta con tres pantallas de manejos diferentes. La vista del Cliente donde el mismo una vez logueado puede realizar los pedidos de comidas y revisar el historial de pedidos anteriores. La pantalla de Cocina en donde se muestran las comandas que ingresan a esta sección y el cocinero notifica la finalización del proceso de elavoración. Por ultimo la vista del Administrador, el mismo tiene acceso a control de stock, facturación productos mas vendidos, lista de usuarios, creacion de productos manofacturado, carga de productos, clientes etc.

Para acceder, a la version DEMO de la aplicacion, como usuario en la base se encuentran cargados tres correos: 
cliente@gmail.com, cocinero@gmail.com, admin@gmail.com. Las contraseñas usada para los tres es 123456.

Pre-requisitos 📋

Debes contar con las siguientes herramientas instaladas en el ordenador.
-Node
-npm
-Angular CLI
-Un editor de codigo.

Comenzando 🚀

Este proyecto fue generado con Angular CLI version 10 y TipeScript, correr comando npm install en la carpeta Frontend. Para el Backend se utilizo NodeJs utilizando y modulos con los modulos de Express, morgan, mongoose. Se debe correr el comando npm install en la carpeta Backend.
Para la arquitectura, validacion y Autenticación de los usuarios se utilizó Firebase. Por favor, cambie las credenciales de acceso en su archivo de Enviroment.
Una vez todo configurado, correr comando npm run dev en la carpeta Backend y el comando ng serve -o en la carpeta Frontend.

Development server 🛠️

Ejecutar npm run dev para un servidor dev de NodeJS dentro del servidor de carpetas. Ejecute ng serve para un servidor dev. Navega a http://localhost:4200/. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

Despliegue 📦

Ejecute ng build para construir el proyecto. Los artefactos de construcción se almacenarán en el directorio dist/. Utilice la bandera --prod para una construcción de producción.
