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
-- Table structure for table `notification_message_template`
--

DROP TABLE IF EXISTS `notification_message_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_message_template` (
  `common_code_id` int NOT NULL,
  `notification_message_content` text NOT NULL,
  `notification_message_title` varchar(100) NOT NULL,
  PRIMARY KEY (`common_code_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_message_template`
--

LOCK TABLES `notification_message_template` WRITE;
/*!40000 ALTER TABLE `notification_message_template` DISABLE KEYS */;
INSERT INTO `notification_message_template` VALUES (101,'새로운 모험을 함께 할 {groupName} 으로 초대했어요!','? 새로운 그룹 초대 ?'),(201,'{groupName} 에서 {damjjokName} 님이 새로운 도전을 시작했어요. 담쪽이를 응원해주세요!','? 담쪽이의 챌린지 생성 ?'),(301,'{groupName} 의 {damjjokName} 님의 챌린지가 3일 뒤에 종료됩니다. 마지막 까지 함께해요 !','챌린지 3일 뒤 종료 예정'),(302,'{groupName} 이 3일 뒤에 삭제됩니다.','그룹 3일 뒤 종료 예정'),(303,'{groupName}의 {damjjokName} 님의 챌린지가 종료되었습니다.','챌린지 종료'),(304,'{groupName} 이 종료되었습니다.','그룹 종료'),(401,'{groupName} 에서의 {damjjokName} 챌린지가 무려 {day} 일이 되었어요!','? 대단해요 !'),(501,'{groupName}에서 {damjjokName} 챌린지의 깜짝 제보가 등록됐어요!','?️ 깜짝 제보 등록 ?️‍♂️'),(601,'{damjjokName} 님 {groupName} 의 진실의 방 일정을 잡아주세요!','진실의 방 일정 잡아주세요.'),(602,'{groupName} 의 {damjjokName} 담쪽이가 진실의 방 일정을 생성하였습니다.','진실의 방 일정 생성되었습니다.'),(603,'{groupName} 에서 {damjjokName} 님이 주최하는 진실의 방이 열리는 날!','? 오늘은 진실의 방 열리는 날 ?');
/*!40000 ALTER TABLE `notification_message_template` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 14:29:25
