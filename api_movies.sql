-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: api_movies
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Action'),(2,'Adventure'),(3,'Animation'),(4,'Biography'),(5,'Crime'),(6,'Drama'),(7,'Fantasy'),(8,'Film-Noir'),(9,'Horror'),(10,'Mystery'),(11,'Romance'),(12,'Sci-Fi'),(13,'Thriller');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_genres`
--

DROP TABLE IF EXISTS `movie_genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_genres` (
  `movie_id` binary(16) NOT NULL,
  `genre_id` int NOT NULL,
  PRIMARY KEY (`movie_id`,`genre_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_genres`
--

LOCK TABLES `movie_genres` WRITE;
/*!40000 ALTER TABLE `movie_genres` DISABLE KEYS */;
INSERT INTO `movie_genres` VALUES (_binary 'K곾��M���',1),(_binary 'K곾��M���',5),(_binary 'K곾��M���',6),(_binary 'K\�\���M���',1),(_binary 'K\�\���M���',2),(_binary 'K\�\���M���',12),(_binary 'K\�e��M���',5),(_binary 'K\�e��M���',6),(_binary 'K\����M���',6),(_binary 'K\����M���',11),(_binary 'K궿��M���',1),(_binary 'K궿��M���',2),(_binary 'K궿��M���',6),(_binary 'K\�G��M���',1),(_binary 'K\�G��M���',12),(_binary 'K\�\���M���',2),(_binary 'K\�\���M���',6),(_binary 'K\�\���M���',12),(_binary 'K\�T��M���',1),(_binary 'K\�T��M���',2),(_binary 'K\�T��M���',6),(_binary 'K\���M���',2),(_binary 'K\���M���',3),(_binary 'K\���M���',6),(_binary 'K깍��M���',1),(_binary 'K깍��M���',2),(_binary 'K깍��M���',12),(_binary 'K\���M���',2),(_binary 'K\���M���',12),(_binary 'K꺖��M���',6),(_binary 'K꺖��M���',11),(_binary 'K\�\Z��M���',4),(_binary 'K\�\Z��M���',6),(_binary 'K껪��M���',1),(_binary 'K껪��M���',2),(_binary 'K껪��M���',7),(_binary 'K\�+��M���',1),(_binary 'K\�+��M���',13),(_binary 'K꼾��M���',10),(_binary 'K꼾��M���',13);
/*!40000 ALTER TABLE `movie_genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `id` binary(16) NOT NULL,
  `title` varchar(255) NOT NULL,
  `director` varchar(255) DEFAULT NULL,
  `year` year NOT NULL,
  `duration` int NOT NULL,
  `poster` text,
  `rate` decimal(2,1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `movies_chk_1` CHECK (((`rate` >= 0) and (`rate` <= 10)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (_binary 'K\�e��M���','The Shawshank Redemption','Frank Darabont',1994,142,'https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp',9.3),(_binary 'K곾��M���','The Dark Knight','Christopher Nolan',2008,152,'https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg',9.0),(_binary 'K\�\���M���','Inception','Christopher Nolan',2010,148,'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg',8.8),(_binary 'K\�e��M���','Pulp Fiction','Quentin Tarantino',1994,154,'https://www.themoviedb.org/t/p/original/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg',8.9),(_binary 'K\����M���','Forrest Gump','Robert Zemeckis',1994,142,'https://i.ebayimg.com/images/g/qR8AAOSwkvRZzuMD/s-l1600.jpg',8.8),(_binary 'K궿��M���','Gladiator','Ridley Scott',2000,155,'https://img.fruugo.com/product/0/60/14417600_max.jpg',8.5),(_binary 'K\�G��M���','The Matrix','Lana Wachowski',1999,136,'https://i.ebayimg.com/images/g/QFQAAOSwAQpfjaA6/s-l1200.jpg',8.7),(_binary 'K\�\���M���','Interstellar','Christopher Nolan',2014,169,'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg',8.6),(_binary 'K\�T��M���','The Lord of the Rings: The Return of the King','Peter Jackson',2003,201,'https://i.ebayimg.com/images/g/0hoAAOSwe7peaMLW/s-l1600.jpg',8.9),(_binary 'K\���M���','The Lion King','Roger Allers, Rob Minkoff',1994,88,'https://m.media-amazon.com/images/I/81BMmrwSFOL._AC_UF1000,1000_QL80_.jpg',8.5),(_binary 'K깍��M���','The Avengers','Joss Whedon',2012,143,'https://img.fruugo.com/product/7/41/14532417_max.jpg',8.0),(_binary 'K\���M���','Jurassic Park','Steven Spielberg',1993,127,'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024',8.1),(_binary 'K꺖��M���','Titanic','James Cameron',1997,195,'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png',7.8),(_binary 'K\�\Z��M���','The Social Network','David Fincher',2010,120,'https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg',7.7),(_binary 'K껪��M���','Avatar','James Cameron',2009,162,'https://i.etsystatic.com/35681979/r/il/dfe3ba/3957859451/il_fullxfull.3957859451_h27r.jpg',7.8),(_binary 'K\�+��M���','Die Hard','John McTiernan',1988,132,'https://m.media-amazon.com/images/I/51+Eu24eFQL._AC_.jpg',8.2),(_binary 'K꼾��M���','The Rear Window','Alfred Hitchcock',1954,112,'https://m.media-amazon.com/images/I/81FA-25ugSL._AC_SL1500_.jpg',8.4),(_binary 'K\�@��M���','Alien','Ridley Scott',1979,117,'https://filmartgallery.com/cdn/shop/files/Alien-Vintage-Movie-Poster-Original-1-Sheet-27x41.jpg?v=1684645235',8.4);
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-16 12:09:25
