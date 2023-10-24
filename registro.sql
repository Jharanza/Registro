CREATE DATABASE IF NOT EXISTS usuarios;

USE usuarios;

CREATE TABLE IF NOT EXISTS informacion(
  dni          varchar (8) not null Primary Key,
  full_name    varchar(50) not null,
  address1     varchar (100) null,
  email        varchar (150) unique,
  phone        int  null
);
