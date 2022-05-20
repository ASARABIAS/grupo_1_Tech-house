CREATE DATABASE IF NOT EXISTS tech_house;
USE tech_house;

CREATE TABLE IF NOT EXISTS roles(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
PRIMARY KEY (id)
);

LOCK TABLES `roles` WRITE;

INSERT INTO `roles` (`name`) VALUES
("Usuario"), ("Administrador");

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS users(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(65) NOT NULL,
country VARCHAR(45),
avatar VARCHAR(100),
id_role INT NOT NULL,
PRIMARY KEY (id),
UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
FOREIGN KEY (id_role) REFERENCES roles (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1,'Jessica Cardeño','cardenojessica07@gmail.com','$2a$12$xxerOxO1rvXO15UK1N0J1uWschDN4Az.vwJXCPyYE8TsdL9Z1dNm.','Colombia','avatar-1653063706301.jpg',1),(2,'Tech House','techouse@gmail.com','$2a$12$jCcGMuGfo/qy6eG6qxtuO.aioRF7D/IkoAKAeLHTzCbIGlwExtKlm','Colombia','avatar-1653064030819.jpg',2);

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS categories(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
PRIMARY KEY (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `categories` WRITE;

INSERT INTO `categories` (`name`) VALUES
("Accesorios"), ("Celulares"), ("Usados"), ("Computadores");

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS products(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(200) NOT NULL,
specifications TEXT,
warranty_text VARCHAR(450),
warranty_time INT NOT NULL,
price DOUBLE NOT NULL,
discount DOUBLE,
quota VARCHAR(100),
shipping DOUBLE NOT NULL,
return_value DOUBLE NOT NULL,
id_category INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_category) REFERENCES categories (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `products` WRITE;

INSERT INTO `products` VALUES (1,'Impresora Multifuncional Ricoh SP3710SF  ','Pensada para la casa o la oficina, esta impresora Ricoh es ideal para todo tipo de trabajos, ya sean grandes tiradas o pocas impresiones. Imprime archivos, escanea documentos y haz todas las fotocopias que necesites con esta impresora multifunción Ricoh, siempre lista para facilitar tu rutina de trabajo o estudio.     ','Recibe el producto que esperabas o te devolvemos tu dinero',6,756000,5,'30x $30.400',4,0,1),(2,'Router Dlink 300MBPS 4 Antenas ',' El Router LTE DWR-M921 4G N300 LTE de D-Link le permite acceder a redes de banda ancha móvil desde cualquier lugar del mundo.   ','Recibe el producto que esperabas o te devolvemos tu dinero',3,431000,0,'30x $30.400',4,0,1),(3,'ZenBook Pro Duo 15 OLED ','Te permite hacer las cosas con estilo: con calma, eficiencia y sin complicaciones. Es su poderoso y elegante compañero de siguiente nivel para la productividad y la creatividad en movimiento  ','Garantia extendida ',6,2000000,5,'30x $30.400',4,0,1),(4,'Apple Macbook Air (13 pulgadas, 2020)  ','La notebook más delgada y ligera de Apple viene con los superpoderes del chip M1. Termina todos tus proyectos mucho más rápido con el CPU de 8 núcleos y disfruta como nunca antes de apps y juegos con gráficos avanzados gracias al GPU de hasta 8 núcleos    ','Recibe el producto que esperabas o te devolvemos tu dinero',12,3500000,0,'30x $30.400',4,0,1),(5,'Audífonos inalámbricos Sennheiser HD 4.40BT','El formato perfecto para ti, el diseño over-ear genera una comodidad insuperable gracias a sus suaves almohadillas. Al mismo tiempo, su sonido envolvente del más alto nivel se convierte en el protagonista de la escena','Recibe el producto que esperabas o te devolvemos tu dinero',3,400000,20,'30x $30.400',4,0,1),(6,'Samsung Galaxy S21+ 5G Dual SIM 256 GB ',' Fotografía profesional en tu bolsillo, descubre infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Pon a prueba tu creatividad y juega con la iluminación, diferentes planos y efectos para obtener grandes resultados  ','Garantia extendida ',10,3829000,0,'30x $30.400',4,0,1),(7,'PC Dell Vostro 3681 Core I5 8 GB 1 TB Led 20 pulgadas','Rendimiento increíblemente rápido, el procesador Intel Core i5 de hasta 10 generación y los hasta 8 GB de memoria DDR4 permiten que el Vostro ofrezca un alto rendimiento rápido y fiable. Diseñado para hacer más, disfrute de una alta calidad visual para las presentaciones de PowerPoint y la edición de vídeo con las tarjetas gráficas independientes opcionales de hasta 2 GB.','Recibe el producto que esperabas o te devolvemos tu dinero',12,3888000,15,'30x $30.400',4,0,4),(8,'Teclado gamer Redragon Kumara K552 QWERTY ','La gran calidad del Redragon Kumara K552, y su precio económico lo vuelven un atractivo ideal para que te diviertas frente a la pantalla. Su ergonomía, su base antidelizante y su rápido tiempo de respuesta permite que tus juegos favoritos se sientan más cerca que nunca, al alcance de tus manos  ','Recibe el producto que esperabas o te devolvemos tu dinero',2,205418,0,'30x $30.400',4,0,1);

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS payment_methods(
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
image VARCHAR(100) NOT NULL,
PRIMARY KEY (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `payment_methods` WRITE;

INSERT INTO `payment_methods` (`name`, `image`) VALUES
("Efecty", "efecty.png"), ("Mastercard", "mastercard.png"), ("Visa", "visa.png");

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS products_payment_methods(
id INT NOT NULL AUTO_INCREMENT,
id_product INT NOT NULL,
id_payment_method INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_product) REFERENCES products (id),
FOREIGN KEY (id_payment_method) REFERENCES categories (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `products_payment_methods` WRITE;

INSERT INTO `products_payment_methods` VALUES (5,2,1),(6,2,2),(9,3,2),(10,3,3),(17,4,1),(18,4,2),(19,4,3),(20,5,1),(21,5,3),(24,7,1),(25,7,2),(26,7,3),(30,1,1),(31,1,2),(32,6,1),(33,6,3),(34,8,1);

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS images(
id INT NOT NULL AUTO_INCREMENT,
image VARCHAR(100),
id_product INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_product) REFERENCES products (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `images` WRITE;

INSERT INTO `images` VALUES (1,'productImage-1653062557753.jpg',1),(3,'productImage-1653064956971.jpg',2),(4,'productImage-1653065534670.jpg',3),(6,'productImage-1653065797453.jpg',4),(7,'productImage-1653066161132.jpg',5),(8,'productImage-1653066338082.jpg',6),(9,'productImage-1653066622134.jpg',7),(10,'productImage-1653066874923.jpg',8);

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS colors(
id INT NOT NULL AUTO_INCREMENT,
color VARCHAR(100) NOT NULL,
id_product INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_product) REFERENCES products (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `colors` WRITE;

INSERT INTO `colors` VALUES (1,'Color',1),(2,'Negro-Blanco',2),(3,'Negro-Blanco',3),(4,'Negro-Blanco',4),(5,'Negro-Blanco',5),(6,'Negro-Blanco',6),(7,'Negro-Blanco',7),(8,'Negro-Blanco',8);

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS characteristics(
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(100) NOT NULL,
id_product INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_product) REFERENCES products (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `characteristics` WRITE;

INSERT INTO `characteristics` VALUES (3,'Caracteristicas generales',2),(5,'Caracteristicas generales',3),(8,'Caracteristicas generales',4),(9,'Caracteristicas generales',5),(11,'Caracteristicas principales',7),(14,'Características generales',1),(15,'Características generales',6),(16,'Caracteristicas principales',8);

UNLOCK TABLES;

CREATE TABLE IF NOT EXISTS characteristics_main(
id INT NOT NULL AUTO_INCREMENT,
subtitle VARCHAR(200) NOT NULL,
description TEXT NOT NULL,
id_characteristic INT NOT NULL,
PRIMARY KEY (id),
FOREIGN KEY (id_characteristic) REFERENCES characteristics (id)
)ENGINE InnoDB DEFAULT CHARSET=utf8mb4;


LOCK TABLES `characteristics_main` WRITE;

INSERT INTO `characteristics_main` VALUES (3,'Beneficios','Inserte una tarjeta SIM local y, una vez conectado, puede consultar el correo electrónico, navegar por la web y transmitir contenido multimedia o compartir su conexión a Internet 3G / 4G a través de una red inalámbrica segura o utilizando cualquiera de los cuatro puertos Ethernet 10/100.',3),(5,'Sistema Operativo','Windows 10 Home - ASUS recomienda Windows 11 Pro para empresas Actualización gratuita a Windows 11¹ ',5),(8,'Batería y energía','Hasta 15 horas de navegación web inalámbrica Hasta 18 horas de reproducción de video en la app Apple TV Batería de polímero de litio integrada de 49,9 Wh Adaptador de corriente USB-C de 30 W',8),(9,'Conectividad ','Inalámbrico, con Bluetooth, alcance de 10 metros',9),(11,'Generales','Small Form Factor, Intel, Core i5, 2.9ghz, 10ma Gen, Socket 10400, Memoria 8 Gb, Disco Duro 1 TB, Pantalla 19″, Windows 10 PRO, Garantía 12 Meses',11),(14,'Marca','Ricoh',14),(15,'Cámara - Pantalla','Camara principal: 64 Mpx - Tamaño pantalla: 6.7 pulgadas',15),(16,'Generales','Gamer, color de la retroiluminacion: RGB, tipo de switch: Outemu Blue, Idioma: Inglés',16);

UNLOCK TABLES;
