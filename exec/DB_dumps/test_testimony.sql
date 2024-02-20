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
-- Table structure for table `testimony`
--

DROP TABLE IF EXISTS `testimony`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimony` (
  `challenge_id` int DEFAULT NULL,
  `created_by` int NOT NULL,
  `testimony_id` int NOT NULL AUTO_INCREMENT,
  `updated_by` int NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `testimony_content` text NOT NULL,
  `testimony_title` varchar(100) NOT NULL,
  PRIMARY KEY (`testimony_id`),
  KEY `FKe5wsm6loom2q3gyx36dket9ss` (`challenge_id`),
  CONSTRAINT `FKe5wsm6loom2q3gyx36dket9ss` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`challenge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimony`
--

LOCK TABLES `testimony` WRITE;
/*!40000 ALTER TABLE `testimony` DISABLE KEYS */;
INSERT INTO `testimony` VALUES (125,3,8,3,'2024-02-19 23:02:20.533307','2024-02-19 23:02:20.533316','ㄱㄱ','ㄱㄱ'),(126,3,9,3,'2024-02-19 23:08:21.887894','2024-02-19 23:08:21.887902','ㄴㄹㄴㅇㄹ','ㅁㄴㅇㄻㄴㅇ'),(135,3,10,3,'2024-02-20 10:16:37.814378','2024-02-20 10:16:37.814387','sfsef','dfsef'),(139,1,11,1,'2024-02-20 10:23:25.315217','2024-02-20 10:23:25.315226','집에서 자꾸 사라졌다가 5분만에 나타납니다. 매우 수상합니다 ..','수상합니다 ..'),(139,2,12,2,'2024-02-20 11:00:50.060683','2024-02-20 11:00:50.060692','점심시간때 담배피는거 발견해버렸습니다 ..','발견!'),(140,3,14,3,'2024-02-20 12:15:37.488676','2024-02-20 12:15:37.488684','알림 생성 ','알림생성');
/*!40000 ALTER TABLE `testimony` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 14:29:28
