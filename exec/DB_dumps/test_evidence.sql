-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: i10E105.p.ssafy.io    Database: test
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

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
-- Table structure for table `evidence`
--

DROP TABLE IF EXISTS `evidence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evidence` (
  `challenge_id` int DEFAULT NULL,
  `created_by` int NOT NULL,
  `evidence_id` int NOT NULL AUTO_INCREMENT,
  `updated_by` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `image_date` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `evidence_title` varchar(100) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  PRIMARY KEY (`evidence_id`),
  KEY `FKsvebnf6guigvpru3nasg0vf26` (`challenge_id`),
  CONSTRAINT `FKsvebnf6guigvpru3nasg0vf26` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evidence`
--

LOCK TABLES `evidence` WRITE;
/*!40000 ALTER TABLE `evidence` DISABLE KEYS */;
INSERT INTO `evidence` VALUES (139,5,11,5,'2024-02-20 10:23:02.794546','2024-02-12 15:28:10.000000','2024-02-20 10:23:02.794555','목격했습니다 !','/images/1708392182791_영후담배3.jpg'),(139,4,12,4,'2024-02-20 11:19:11.137750','2024-02-20 02:19:05.081000','2024-02-20 11:19:11.137758','얘 폈어요!','/images/1708395551135_문지호_증거.png'),(137,1,13,1,'2024-02-20 11:31:02.808450','2024-02-20 02:30:54.284000','2024-02-20 11:31:02.808459','딱 걸려버렸습니다 !!!','/images/1708396262804_영후담배핌3.png');
/*!40000 ALTER TABLE `evidence` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 14:29:30
