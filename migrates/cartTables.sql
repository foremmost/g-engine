
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


CREATE TABLE IF NOT EXISTS `cart` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `u_id` int(255) NOT NULL,
  `status` tinyint(5) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `u_id` (`u_id`),
    CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`u_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `cart_id` int(255) NOT NULL,
  `goods_id` int(255) NOT NULL,
  `cnt` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_id` (`cart_id`),
  KEY `goods_id` (`goods_id`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
