/* Replace with your SQL commands */

CREATE TABLE IF NOT EXISTS users(
  `id` INT NOT NULL AUTO_INCREMENT,
  `nickName` VARCHAR(80) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `hashedPassword` VARCHAR(150) NOT NULL,
  `role` TINYINT NOT NULL,
  `firstName` VARCHAR(64),
  `lastName` VARCHAR(64),
  `date` BIGINT NOT NULL,
  `bio` TEXT NOT NULL,
  `image` TEXT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS categories(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS news(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) DEFAULT '' NOT NULL,
  `idCategory` INT DEFAULT 1 NOT NULL,
  `idUser` INT DEFAULT 1 NOT NULL,
  `date` BIGINT DEFAULT 0 NOT NULL,
  `content` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS images(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `link` TEXT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS imageInNews(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idNews` INT DEFAULT 1 NOT NULL,
  `idImage` INT DEFAULT 1 NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS comments(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idNews` INT DEFAULT 1 NOT NULL,
  `idUser` INT DEFAULT 1 NOT NULL,
  `date` BIGINT DEFAULT 0 NOT NULL,
  `content` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`)
);

