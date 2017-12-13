CREATE TABLE IF NOT EXISTS `article`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `title` VARCHAR(100) NOT NULL,
   `content` TEXT NOT NULL,
   `category_id` INT UNSIGNED,
   `create_time` DATETIME,
   PRIMARY KEY ( `id` ),
   CONSTRAINT `CATEGORY_ID` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `category`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `parent_id` INT UNSIGNED,
   `title` VARCHAR(100) NOT NULL,
   `create_time` DATETIME,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;