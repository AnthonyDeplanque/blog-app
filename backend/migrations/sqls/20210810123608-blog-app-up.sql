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
  `image` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS categories(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS news(
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `idCategory` INT NOT NULL,
  `idUser` INT NOT NULL,
  `date` BIGINT NOT NULL,
  `content` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (idCategory) REFERENCES categories(id),
  FOREIGN KEY (idUser) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS images(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `link` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS imageInNews(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idNews` INT NOT NULL,
  `idImage` INT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (idNews) REFERENCES news(id) ON DELETE CASCADE,
  FOREIGN KEY (idImage) REFERENCES images(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments(
  `id` INT NOT NULL AUTO_INCREMENT,
  `idNews` INT NOT NULL,
  `idUser` INT NOT NULL,
  `date` BIGINT NOT NULL,
  `content` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (idNews) REFERENCES news(id) ON DELETE CASCADE,
  FOREIGN KEY (idUser) REFERENCES users(id) ON DELETE CASCADE
);
