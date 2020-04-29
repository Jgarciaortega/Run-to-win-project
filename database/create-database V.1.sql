-- Utilities
-- select user from mysql.user;

-- Creamos la BBDD
DROP DATABASE IF EXISTS db_rtw;
FLUSH PRIVILEGES;
CREATE DATABASE db_rtw;

CREATE USER IF NOT EXISTS admin@localhost IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON db_rtw.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;

-- Creacion tablas
USE db_rtw;

CREATE TABLE rutinas_ejercicios(
	id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	dia1 VARCHAR(255),
	dia2 VARCHAR(255),
	dia3 VARCHAR(255),
	dia4 VARCHAR(255),
	dia5 VARCHAR(255),
	dia6 VARCHAR(255),
	dia7 VARCHAR(255)
);


CREATE TABLE usuario ( 
	id INT(11)NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	apellidos VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	status VARCHAR(255),
	nickname VARCHAR(255),
	imagen VARCHAR(255),
	logros INT(11),
	id_strava INT(255),
	peso FLOAT(11),
	altura FLOAT(11),
	pulsaciones_reposo INT(5),
	tension_alta INT(5),
	tension_baja INT(5),
	puntuacion INT(11),
	edad INT(3),
	sexo VARCHAR(7),
	fecha_registro timestamp NOT NULL DEFAULT NOW() ON UPDATE NOW(),
	id_rutina INT(11),
	FOREIGN KEY (id_rutina) REFERENCES rutinas_ejercicios (id) ON UPDATE  NO ACTION  ON DELETE  CASCADE

);

CREATE TABLE registros_entrenamiento(
	id INT(100) NOT NULL PRIMARY KEY,
	distancia FLOAT(22),
	tiempo_empleado FLOAT(22),
	fecha timestamp NOT NULL DEFAULT current_timestamp,
	velocidad_media FLOAT(11),
	velocidad_max FLOAT(11),
	id_usuario INT(11),
	FOREIGN KEY (id_usuario) REFERENCES usuario (id) ON UPDATE  NO ACTION  ON DELETE  CASCADE
	
);

CREATE TABLE conversacion(
	id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_usuario1 INT(11),
	id_usuario2 INT(11)
);

CREATE TABLE mensaje(
	id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	contenido VARCHAR(255),
	id_destinatario INT(100),
	fecha_envio DateTime NOT NULL DEFAULT NOW() ON UPDATE NOW(), 
	id_conversacion INT(11),
	id_usuario INT(11),
	FOREIGN KEY (id_conversacion) REFERENCES conversacion (id) ON UPDATE  NO ACTION  ON DELETE  CASCADE,
	FOREIGN KEY (id_usuario) REFERENCES usuario (id) ON UPDATE  NO ACTION  ON DELETE  CASCADE
);



CREATE TABLE notificaciones(
	id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	contenido VARCHAR(255),
	id_destinatario INT(100),
	fecha_envio timestamp NOT NULL DEFAULT NOW() ON UPDATE NOW(), 
	leido BOOLEAN,
	id_usuario INT(11),
	FOREIGN KEY (id_usuario) REFERENCES usuario (id) ON UPDATE  NO ACTION  ON DELETE  CASCADE
);








