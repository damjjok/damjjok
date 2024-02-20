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
-- Table structure for table `challenge_member`
--

DROP TABLE IF EXISTS `challenge_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge_member` (
  `challenge_id` int NOT NULL,
  `user_id` int NOT NULL,
  `challenge_join_date` datetime(6) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`challenge_id`,`user_id`),
  KEY `FKgk0yle57lsq85e33ac5ihqjo` (`user_id`),
  CONSTRAINT `FKgk0yle57lsq85e33ac5ihqjo` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FKhvom68yt2aavdlxxxr84v7hrn` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`challenge_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge_member`
--

LOCK TABLES `challenge_member` WRITE;
/*!40000 ALTER TABLE `challenge_member` DISABLE KEYS */;
INSERT INTO `challenge_member` VALUES (123,1,'2024-02-19 21:47:38.620091','Damjjok'),(123,3,'2024-02-19 21:47:38.621566','Doctor'),(123,4,'2024-02-19 21:47:38.789843','Doctor'),(123,5,'2024-02-19 21:47:38.965642','Doctor'),(123,6,'2024-02-19 21:47:39.144341','Doctor'),(125,1,'2024-02-19 23:02:08.985183','Doctor'),(125,3,'2024-02-19 23:02:09.157088','Damjjok'),(125,4,'2024-02-19 23:02:09.158419','Doctor'),(125,5,'2024-02-19 23:02:09.347959','Doctor'),(125,6,'2024-02-19 23:02:09.520659','Doctor'),(126,1,'2024-02-19 23:07:40.104586','Doctor'),(126,3,'2024-02-19 23:07:40.319830','Damjjok'),(126,4,'2024-02-19 23:07:40.321278','Doctor'),(126,5,'2024-02-19 23:07:40.489142','Doctor'),(126,6,'2024-02-19 23:07:40.702259','Doctor'),(133,16,'2024-02-20 09:45:29.225299','Damjjok'),(134,10,'2024-02-20 09:50:10.616242','Damjjok'),(135,3,'2024-02-20 10:14:35.229738','Damjjok'),(137,1,'2024-02-20 10:27:54.308634','Damjjok'),(137,3,'2024-02-20 10:27:54.309977','Doctor'),(137,4,'2024-02-20 10:27:54.484102','Doctor'),(137,5,'2024-02-20 10:27:54.668281','Doctor'),(137,6,'2024-02-20 10:27:54.833251','Doctor'),(138,1,'2024-02-20 10:30:19.361679','Damjjok'),(138,3,'2024-02-20 10:30:19.363178','Doctor'),(138,4,'2024-02-20 10:30:19.699884','Doctor'),(138,5,'2024-02-20 10:30:20.283142','Doctor'),(138,6,'2024-02-20 10:30:20.445448','Doctor'),(139,1,'2024-02-20 11:31:52.769888','Damjjok'),(139,3,'2024-02-20 11:31:52.771368','Doctor'),(139,4,'2024-02-20 11:31:52.939168','Doctor'),(139,5,'2024-02-20 11:31:53.169576','Doctor'),(139,6,'2024-02-20 11:31:53.362906','Doctor'),(140,3,'2024-02-20 12:15:07.151721','Damjjok');
/*!40000 ALTER TABLE `challenge_member` ENABLE KEYS */;
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
