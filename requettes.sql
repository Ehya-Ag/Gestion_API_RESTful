DROP DATABASE IF EXISTS recette_gestion;

CREATE DATABASE recette_gestion;

USE recette_gestion;

CREATE TABLE recettes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(100) NOT NULL,
    ingredients VARCHAR(100) NOT NULL,
    type TEXT NOT NULL
);
