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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `join_date` datetime(6) NOT NULL,
  `user_name` varchar(10) NOT NULL,
  `sex` varchar(20) NOT NULL,
  `birth` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fcm_token` varchar(255) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2024-02-13 14:45:43.788809','박서현','female','19980601','mentos0601@naver.com','fRcx0LbYmNYoHMmD6ktoNv:APA91bG8_u2xLD7fG7UQOCmJoA-CsXz-FD5f-7DBYOmxpiC3VdE2oZb07OplyuDIBA6h89S3Tr_kyFSq8JfQN8-ME2YS9xApuuUxIKiXG0FdusOo9aA_2T4KOuyXS1yKeAU2aOXe19FB'),(2,'2024-02-13 14:45:47.227110','최명성','male','19970929','qazqaz456@nate.com','fFgXMJ0-N0L1ikouvz_pSJ:APA91bE0jZpKBoK7AC3wY7Ag5eWIO35xBWy08kh6uqw4WHHcEPonNRtvQoYMZ_F8YVESnQJGq2N03kwFHtMmHcoWRkq8i7szCFfAs4WT2CbQA8ErL58thFCZ2TaR9slfyBNWpJHCuhik'),(3,'2024-02-13 14:48:04.402593','김다희','female','19990525','2663333@hanmail.co.kr','cOKw1e0a_TeU9jMIN3Yxqa:APA91bEMmFuDEo7iknswI6Fm4JGVKT3lbsSNyfiI3y6b0psJKybpp-tlA_GYkSyPXa8d6VmZytVXIKPrQM0mrqr2pTUaDaGmdp14OF2ys09h9a_4SlYSK5HWgqidMde_EnqH-9h9olD6'),(4,'2024-02-13 15:57:41.896467','김영후','male','19970401','eagle7449@naver.com','cPayRuZVKG9nnddE21zSon:APA91bF5KQJPtBckB97_8eJJtXv1e3_667gtvZhPffk7MyNBO4eA1Ll3JW__MLiX5MAwDYXJxuVu28mURzL7whBbZMKlaaPdwiG8r-NmrBAy9muzPWzhu8ElhNUGNlzRmEAxwH84XO0H'),(5,'2024-02-13 17:17:52.650586','손종민','male','19940916','sjmeda@nate.com','ddtpXUVQKSKyf6cf0X2eiK:APA91bFeeo1UgUZOSW9ZZN7fDgAx9R6z0wrmXbGdYhhEZrV5lF_v5w4WDL56tLK5FwI7dx4MPrd0nNWH3X8Roq7s-PBDnkjnk-Nuq6pycDQmAjdAbg7hUMPPMkh_kTcLLZAZBkVWRr-l'),(6,'2024-02-13 17:27:19.279959','문지호','male','19971231','moonwlgh@naver.com','fZb4PTOe7IrnK4zUVJmtBd:APA91bFXgzn2rB_CLRidzoF0AdtKmSCzirNnnIa4dqv0KyVXyaarsyVen_YB2UYfaGggVRS_SClzc3IM_Wl5BIKNbPTPCVVVmsTt8Q_fMHbcVu-Bgj7nlCC29hiaH_fESf7qz7msAwXB'),(7,'2024-02-14 14:05:54.784003','정경훈','male','19970819','rudgns8285@jr.naver.com',''),(8,'2024-02-14 16:26:48.982969','윤태호','male','19980508','ice_98@naver.com',''),(9,'2024-02-14 17:55:32.548735','네아로','male','20240111','nv_tkwjsrjatn6@naver.com',''),(10,'2024-02-15 14:01:04.122460','최영은','female','20000930','duddms0190@naver.com',''),(11,'2024-02-15 23:42:46.601932','정소정','female','20240101','thwjd0205@naver.com',''),(12,'2024-02-16 09:07:17.027867','진성민','male','20000101','dosi2030@yahoo.co.kr',''),(13,'2024-02-16 16:42:07.682754','박창준','male','19960221','qmak01@naver.com',''),(14,'2024-02-17 23:08:34.382219','조자영','female','19980808','mkwhwkdud@naver.com','egptymwvVVgVTGNMlRGiKr:APA91bGDPf7sGdF1dmY1tRpC8w1JGhU-aQoO5vDhitkuJhumf9lLa0f73BQc6ATE1OwXzryPbXBopaVG91lE7GEkx-xsLitEioVJ5y6LkQezuDs4muxEZGINyomIGmNQa07-atcbcBAi'),(15,'2024-02-19 13:30:41.253326','박나린','female','19991211','snow.ss.326@gmail.com',''),(16,'2024-02-20 09:44:53.712005','서지수','female','19970305','sth2211@jr.naver.com','');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-20 14:29:27
