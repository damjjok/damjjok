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
-- Table structure for table `challenge`
--

DROP TABLE IF EXISTS `challenge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `challenge` (
  `challenge_id` int NOT NULL AUTO_INCREMENT,
  `duration` int NOT NULL,
  `group_id` int DEFAULT NULL,
  `initial_money` int NOT NULL,
  `saved_money` int NOT NULL,
  `saved_period` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `end_date` datetime(6) NOT NULL,
  `final_truth_room_date` datetime(6) NOT NULL,
  `determination` varchar(100) NOT NULL,
  `profile_path` varchar(255) NOT NULL,
  `status` varchar(20) NOT NULL,
  PRIMARY KEY (`challenge_id`),
  KEY `FKi00duy6diiv0xniu9cu5rav65` (`group_id`),
  CONSTRAINT `FKi00duy6diiv0xniu9cu5rav65` FOREIGN KEY (`group_id`) REFERENCES `user_group` (`group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `challenge`
--

LOCK TABLES `challenge` WRITE;
/*!40000 ALTER TABLE `challenge` DISABLE KEYS */;
INSERT INTO `challenge` VALUES (123,30,72,1000,5000,1,4,'2024-01-21 00:47:38.334498','2024-02-20 00:47:38.334498','2024-01-21 00:47:38.334498','열심히 하겠습니다!','avatar1.png','PROGRESS'),(125,30,71,10000,1000,1,3,'2024-02-19 23:02:08.740059','2024-02-19 23:06:32.208541','2024-02-19 23:06:32.208538','열심히 하겠습니다!','avatar1.png','FAIL'),(126,30,71,10000000,1000,11,3,'2024-02-19 23:07:39.615704','2024-02-19 23:08:53.213586','2024-02-19 23:08:53.213583','열심히 하겠습니다!','avatar1.png','SUCCESS'),(133,150,74,100000,2999999,3,16,'2024-02-20 09:45:29.221219','2024-07-19 09:45:29.221021','2024-02-20 09:45:29.221047','열심히 하겠습니다!','avatar1.png','PROGRESS'),(134,30,75,1,1,1,10,'2024-02-20 09:50:10.611503','2024-03-21 09:50:10.611295','2024-02-20 09:50:10.611333','열심히 하겠습니다!','avatar1.png','PROGRESS'),(135,30,76,1111,1,1,3,'2024-01-21 00:47:38.334498','2024-02-20 00:47:38.334498','2024-01-21 00:47:38.334498','열심히 하겠습니다!','avatar1.png','SUCCESS'),(137,60,77,200000,4500,1,4,'2024-01-10 10:21:29.514917','2024-03-10 10:21:29.514917','2024-01-10 10:21:29.514917','열심히 하겠습니다!','avatar1.png','PROGRESS'),(138,30,77,10000,4500,1,1,'2024-01-01 10:21:29.514917','2024-01-31 10:21:29.514917','2024-01-01 10:21:29.514917','열심히 하겠습니다!','avatar1.png','FAIL'),(139,60,77,100000,4000,1,6,'2024-01-10 10:21:29.514917','2024-03-10 10:21:29.514917','2024-01-10 10:21:29.514917','열심히 하겠습니다!','avatar1.png','PROGRESS'),(140,120,76,10000,1000,1,3,'2024-02-20 12:15:07.147437','2024-06-19 12:15:07.147269','2024-02-20 12:15:07.147276','금연 성공 가즈아!','avatar3.png','PROGRESS');
/*!40000 ALTER TABLE `challenge` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 14:29:29
