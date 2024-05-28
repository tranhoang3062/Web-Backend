  CREATE DATABASE `db_petshop` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;

  USE `db_petshop`;

  CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL UNIQUE,
    `gender` TINYINT DEFAULT 0 NULL,
    `birthday` DATE NULL,
    `address` TEXT NULL,
    `thumbnail` TEXT NULL,
    `role` TINYINT DEFAULT 1 NULL,
    `refresh_token` TEXT NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY `pk_id_users`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `categories` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` TEXT NOT NULL,
    `status` TINYINT DEFAULT 0 NULL,
    `parent_id` INT NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    `deleted_at` DATE NULL,
    PRIMARY KEY `pk_id_categories`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `pet_lists` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `slug` TEXT NOT NULL,
    `category_id` INT UNSIGNED NOT NULL,
    `status` TINYINT DEFAULT 0 NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    `deleted_at` DATE NULL,
    PRIMARY KEY `pk_id_pet_list`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `pets` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `code` VARCHAR(255) NOT NULL UNIQUE, 
    `slug` TEXT NOT NULL,
    `description` TEXT NULL,
    `resources` TEXT NOT NULL,
    `pet_list_id` INT UNSIGNED NOT NULL,
    `popular` TINYINT DEFAULT 0 NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY `pk_id_pets`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `brands` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `thumbnail` TEXT NOT NULL,
    `status` TINYINT DEFAULT 0 NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY `pk_id_brands`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `products` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `slug` TEXT NOT NULL,
    `description` TEXT NULL,
    `price` FLOAT NOT NULL,
    `sale_price` FLOAT NOT NULL,
    `unit` VARCHAR(200) NOT NULL,
    `resources` TEXT NOT NULL,
    `choose` TEXT NULL,
    `star` TINYINT NULL DEFAULT 0,
    `category_id` INT UNSIGNED NOT NULL,
    `brand_id` INT UNSIGNED NOT NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY `pk_id_products`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `address` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `status` TINYINT DEFAULT 0 NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY `pk_id_orders`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `order_details` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` INT UNSIGNED NOT NULL,
    `product_id` INT UNSIGNED NOT NULL,
    `quantity` INT DEFAULT 1,
    `total_price` INT NOT NULL,
    `choose` VARCHAR(255) NULL,
    PRIMARY KEY `pk_id_order_details`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `wishlists` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `product_id` INT UNSIGNED NOT NULL,
    `user_id` INT UNSIGNED NOT NULL,
    `status` TINYINT DEFAULT 0 NULL,
    PRIMARY KEY `pk_id_wishlists`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `comments` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT UNSIGNED NOT NULL,
    `product_id` INT UNSIGNED NOT NULL,
    `resources` TEXT NULL,
    `content` TEXT NOT NULL,
    `evaluate` INT DEFAULT 5 NOT NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY `pk_id_comments`(`id`)
  ) ENGINE = InnoDB;

  CREATE TABLE IF NOT EXISTS `newspages` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `slug` TEXT NOT NULL,
    `thumbnail` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `create_at` DATE DEFAULT CURRENT_TIMESTAMP NULL,
    PRIMARY KEY `pk_id_newspages`(`id`)
  ) ENGINE = InnoDB;

  ALTER TABLE `pet_lists`
  ADD CONSTRAINT `fk_pet_lists_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `pets`
  ADD CONSTRAINT `fk_pets_pet_lists`
    FOREIGN KEY (`pet_list_id`)
    REFERENCES `pet_lists` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_brands`
    FOREIGN KEY (`brand_id`)
    REFERENCES `brands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details_orders`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_order_details_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `wishlists`
  ADD CONSTRAINT `fk_wishlists_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `wishlists`
  ADD CONSTRAINT `fk_wishlists_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_users`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;

  ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_products`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE CASCADE;
