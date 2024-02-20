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
-- Table structure for table `cheering_message`
--

DROP TABLE IF EXISTS `cheering_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cheering_message` (
  `challenge_id` int DEFAULT NULL,
  `cheering_message_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`cheering_message_id`),
  KEY `FK63gtslut5vxv1wkh9iwewinev` (`challenge_id`),
  KEY `FKeyknh5hid79yptlu5yk9edex1` (`user_id`),
  CONSTRAINT `FK63gtslut5vxv1wkh9iwewinev` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`challenge_id`),
  CONSTRAINT `FKeyknh5hid79yptlu5yk9edex1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cheering_message`
--

LOCK TABLES `cheering_message` WRITE;
/*!40000 ALTER TABLE `cheering_message` DISABLE KEYS */;
INSERT INTO `cheering_message` VALUES (123,2,3,'2024-02-19 22:23:13.261654','금연 성공한 거 축하해!'),(123,3,1,'2024-02-19 22:23:53.132757','정말 축하해 ~'),(123,4,5,'2024-02-19 22:24:45.083069','금연했으니까 삼겹살 쏜다'),(135,5,1,'2024-02-19 22:24:45.083069','금연 성공한 거 축하해!'),(135,6,2,'2024-02-19 22:24:45.083069','정말 축하해 ~'),(135,7,4,'2024-02-19 22:24:45.083069','금연했으니까 삼겹살 쏜다');
/*!40000 ALTER TABLE `cheering_message` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 14:29:32
