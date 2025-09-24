CREATE DATABASE  IF NOT EXISTS `csmsdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `csmsdb`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: csmsdb
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `nic` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  PRIMARY KEY (`nic`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('199611556789','admin@gmail.com','Sunil Fernando');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branchId` int NOT NULL AUTO_INCREMENT,
  `district` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `mapLocation` varchar(255) DEFAULT NULL,
  `contactNumber` varchar(15) NOT NULL,
  PRIMARY KEY (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Colombo','1st Cross Street, Pettah, Colombo',NULL,'0112345678'),(2,'Polonnaruwa','41, Pola Handiya Junction, Polonnaruwa',NULL,'0272221112'),(3,'Kurunegala','19/3, Havelock Drive, Kurunegala',NULL,'0724590125'),(4,'Kandy','34/A, Lake Rd, Kandy',NULL,'0813095328'),(5,'Jaffna','107/A/3, Kovil Rd, Jaffna',NULL,'0719028764'),(8,'Gampaha','474/Kandana','shfjdbfhk','0756367843'),(9,'Test','No 114','asdasd','124124214'),(10,'Galle','Sample Address','Test','824243535');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branchmanager`
--

DROP TABLE IF EXISTS `branchmanager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branchmanager` (
  `nic` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `branchId` int DEFAULT NULL,
  PRIMARY KEY (`nic`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `branchmanager_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `branch` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branchmanager`
--

LOCK TABLES `branchmanager` WRITE;
/*!40000 ALTER TABLE `branchmanager` DISABLE KEYS */;
INSERT INTO `branchmanager` VALUES ('199534751452','pabasara765@gmail.com','Pabasara Rajapaksha',4),('199634751452','kavindu654@gmail.com','Kavindu Senaviputha',5),('199754731455','venura987@gmail.com','Venura Kalhara',2),('200134701172','ashanthilochana98@gmail.com','Ashan Thilochana',3),('200334701452','heshani876@gmail.com','Heshani Salwathura',3);
/*!40000 ALTER TABLE `branchmanager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `nic` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contactNumber` varchar(15) NOT NULL,
  `branchId` int DEFAULT NULL,
  PRIMARY KEY (`nic`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `client_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `branch` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES ('199835534623','k35@gmail.com','Kav Pathirana','No.554 Stanly road, Polonnaruwa','0703065642',5),('200134701112','ashan@gmail.com','Ashan Thilochana','No. Hukanawa dala','079234242',3),('200134705172','nimath456@gmail.com','Nimath Vikasha','No.114 Katugasthota, Kandy','0703025542',4);
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientfeedback`
--

DROP TABLE IF EXISTS `clientfeedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientfeedback` (
  `feedbackId` int NOT NULL AUTO_INCREMENT,
  `clientNic` varchar(15) NOT NULL,
  `rating` int NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feedbackId`),
  KEY `clientNic` (`clientNic`),
  CONSTRAINT `clientfeedback_ibfk_1` FOREIGN KEY (`clientNic`) REFERENCES `client` (`nic`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientfeedback`
--

LOCK TABLES `clientfeedback` WRITE;
/*!40000 ALTER TABLE `clientfeedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `clientfeedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courierfee`
--

DROP TABLE IF EXISTS `courierfee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courierfee` (
  `courierFeeId` int NOT NULL AUTO_INCREMENT,
  `maxWeight` int NOT NULL,
  `fee` int NOT NULL,
  PRIMARY KEY (`courierFeeId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courierfee`
--

LOCK TABLES `courierfee` WRITE;
/*!40000 ALTER TABLE `courierfee` DISABLE KEYS */;
INSERT INTO `courierfee` VALUES (1,1000,300),(2,5000,320),(3,7000,350),(4,10000,420),(5,30000,500),(6,100000,700);
/*!40000 ALTER TABLE `courierfee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deliveryperson`
--

DROP TABLE IF EXISTS `deliveryperson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `deliveryperson` (
  `nic` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `address` varchar(255) NOT NULL,
  `contactNumber` varchar(15) NOT NULL,
  `vehicleNumber` varchar(20) NOT NULL,
  `branchId` int DEFAULT NULL,
  PRIMARY KEY (`nic`),
  KEY `branchId` (`branchId`),
  CONSTRAINT `deliveryperson_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `branch` (`branchId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deliveryperson`
--

LOCK TABLES `deliveryperson` WRITE;
/*!40000 ALTER TABLE `deliveryperson` DISABLE KEYS */;
INSERT INTO `deliveryperson` VALUES ('199523345564','sunil789@gmail.com','Sunil Rajapakshaa','No.353/4 Gannoruwa, Kandy','0702456667','NC PK-1235',4),('199554703175','saliya890@gmail.com','Saliya Dewapura','No.344/2 Mihidu Mawatha, Kaduwela','0702446669','WP OP-1454',5),('199654501677','samal456@gmail.com','Samal Rajapaksha','No.123 Aluthwewa, PolonnaruwaNo.143','0705466767','NC MT-1344',2),('200154701172','pawan234@gmail.com','Pawan Sandeepa','No.23 Samanaluyana, Seeduwa','0702456667','NC MC-1234',1),('200354701176','Kevin678@gmail.com','Kevin Piris','No.343 Athar road, Colombo','0702457667','WP CC-6674',3);
/*!40000 ALTER TABLE `deliveryperson` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdelivery`
--

DROP TABLE IF EXISTS `orderdelivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdelivery` (
  `orderDeliveryId` int NOT NULL AUTO_INCREMENT,
  `orderId` int NOT NULL,
  `deliveryPersonNic` varchar(15) NOT NULL,
  PRIMARY KEY (`orderDeliveryId`),
  KEY `orderId` (`orderId`),
  KEY `deliveryPersonNic` (`deliveryPersonNic`),
  CONSTRAINT `orderdelivery_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`),
  CONSTRAINT `orderdelivery_ibfk_2` FOREIGN KEY (`deliveryPersonNic`) REFERENCES `deliveryperson` (`nic`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdelivery`
--

LOCK TABLES `orderdelivery` WRITE;
/*!40000 ALTER TABLE `orderdelivery` DISABLE KEYS */;
INSERT INTO `orderdelivery` VALUES (3,4,'199654501677'),(16,5,'200354701176');
/*!40000 ALTER TABLE `orderdelivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orderId` int NOT NULL AUTO_INCREMENT,
  `weight` decimal(10,2) NOT NULL,
  `registeredDate` date NOT NULL,
  `receivedDate` date DEFAULT NULL,
  `deliveryDate` date DEFAULT NULL,
  `paymentDate` date DEFAULT NULL,
  `receiverName` varchar(50) NOT NULL,
  `receiverAddress` varchar(255) NOT NULL,
  `receiverContactNumber` varchar(15) NOT NULL,
  `specialNote` varchar(255) DEFAULT NULL,
  `packageTypeId` int NOT NULL,
  `senderNic` varchar(15) NOT NULL,
  `statusId` int NOT NULL,
  `sendingBranchId` int NOT NULL,
  `receivingBranchId` int NOT NULL,
  PRIMARY KEY (`orderId`),
  KEY `packageTypeId` (`packageTypeId`),
  KEY `senderNic` (`senderNic`),
  KEY `statusId` (`statusId`),
  KEY `sendingBranchId` (`sendingBranchId`),
  KEY `receivingBranchId` (`receivingBranchId`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`packageTypeId`) REFERENCES `packagetype` (`packageTypeId`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`senderNic`) REFERENCES `client` (`nic`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `orderstatus` (`statusId`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`sendingBranchId`) REFERENCES `branch` (`branchId`),
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`receivingBranchId`) REFERENCES `branch` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,2.02,'2023-05-12','2023-05-15','2023-05-14','2023-05-12','Kamal','Sumaga uyana, Mawathagama, Kurunegala','0767559320',NULL,4,'199835534623',7,3,3),(4,2.40,'2023-12-25','2023-12-28','2023-12-27','2023-12-25','Sihini','Wihara mawatha, Kaduruwela, Polonnaruwa','0778905642',NULL,1,'200134705172',1,3,2),(5,200.00,'2023-02-27','2023-03-02','2023-02-28','2023-02-27','Vipuli','790/A Robert road, Colombo','0782315677',NULL,3,'200134705172',7,2,3),(7,789.00,'2024-04-10',NULL,NULL,'2024-04-09','Ashan ','Sample Address','070302668',NULL,2,'199835534623',3,1,3),(8,4.00,'2023-02-27',NULL,NULL,'2023-02-27','Vipuli','790/A Robert road, Colombo','0782315677',NULL,5,'199835534623',1,4,3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderstatus`
--

DROP TABLE IF EXISTS `orderstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderstatus` (
  `statusId` int NOT NULL AUTO_INCREMENT,
  `status` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`statusId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderstatus`
--

LOCK TABLES `orderstatus` WRITE;
/*!40000 ALTER TABLE `orderstatus` DISABLE KEYS */;
INSERT INTO `orderstatus` VALUES (1,'Registered','Package was dropped at the sending branch'),(2,'On Route','Inter-Branch Transportation'),(3,'Received','Pakcage is received to the delivery branch.'),(4,'Handed to Deliverer','Package was handed over to the delivery driver'),(5,'Delivered','Package was delivered'),(6,'Returned','Package was returned'),(7,'Assigned','Assigned a delviery person to the order');
/*!40000 ALTER TABLE `orderstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packagetype`
--

DROP TABLE IF EXISTS `packagetype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packagetype` (
  `packageTypeId` int NOT NULL AUTO_INCREMENT,
  `packageType` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `extraDeliveryFee` decimal(10,2) NOT NULL,
  PRIMARY KEY (`packageTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packagetype`
--

LOCK TABLES `packagetype` WRITE;
/*!40000 ALTER TABLE `packagetype` DISABLE KEYS */;
INSERT INTO `packagetype` VALUES (1,'General','Standard package type',23.00),(2,'Fragile','Handle with care',27.50),(3,'Furniture','Large and heavy items',40.30),(4,'Plastic','Packages containing plastic items',25.90),(5,'Medicine','Pharmaceutical products',34.50);
/*!40000 ALTER TABLE `packagetype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `returnedorder`
--

DROP TABLE IF EXISTS `returnedorder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `returnedorder` (
  `returnOrderId` int NOT NULL AUTO_INCREMENT,
  `returnedDate` date NOT NULL,
  `orderId` int NOT NULL,
  PRIMARY KEY (`returnOrderId`),
  KEY `orderId` (`orderId`),
  CONSTRAINT `returnedorder_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `returnedorder`
--

LOCK TABLES `returnedorder` WRITE;
/*!40000 ALTER TABLE `returnedorder` DISABLE KEYS */;
INSERT INTO `returnedorder` VALUES (2,'2023-05-20',3),(3,'2023-03-08',5);
/*!40000 ALTER TABLE `returnedorder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `roleId` int NOT NULL AUTO_INCREMENT,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'Branch Manager'),(3,'Accountant'),(4,'Delivery Person'),(5,'Transport Agent'),(6,'Client'),(7,'Business Analyst');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `routeId` int NOT NULL AUTO_INCREMENT,
  `routeName` varchar(50) NOT NULL,
  `firstBranchId` int NOT NULL,
  `secondBranchId` int NOT NULL,
  PRIMARY KEY (`routeId`),
  KEY `firstBranchId` (`firstBranchId`),
  KEY `secondBranchId` (`secondBranchId`),
  CONSTRAINT `route_ibfk_1` FOREIGN KEY (`firstBranchId`) REFERENCES `branch` (`branchId`),
  CONSTRAINT `route_ibfk_2` FOREIGN KEY (`secondBranchId`) REFERENCES `branch` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'Colombo and Polonnaruwa',1,2),(2,'Polonnaruwa and Jaffna',2,5),(3,'Colombo and Jaffna',1,5),(4,'Kurunegala and Kandy',3,4),(5,'Jaffna and Kurunegala',5,3),(6,'Kandy and Polonnaruwa',4,2),(7,'Colombo and Kurunegala',1,3),(8,'Kandy and Jaffna',4,5),(9,'Polonnaruwa and Kurunegala',2,3),(10,'Colombo and Kandy',1,4),(11,'',1,1),(12,'Kandy to Colombo',2,4),(13,'',4,1);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supportresponsestatus`
--

DROP TABLE IF EXISTS `supportresponsestatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supportresponsestatus` (
  `responseStatusId` int NOT NULL AUTO_INCREMENT,
  `responseStatus` varchar(50) NOT NULL,
  PRIMARY KEY (`responseStatusId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supportresponsestatus`
--

LOCK TABLES `supportresponsestatus` WRITE;
/*!40000 ALTER TABLE `supportresponsestatus` DISABLE KEYS */;
INSERT INTO `supportresponsestatus` VALUES (1,'Open'),(2,'Active'),(3,'Closed');
/*!40000 ALTER TABLE `supportresponsestatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supportticket`
--

DROP TABLE IF EXISTS `supportticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supportticket` (
  `ticketId` int NOT NULL AUTO_INCREMENT,
  `clientNic` varchar(15) NOT NULL,
  `branchId` int NOT NULL,
  `reasonId` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `responseStatusId` int NOT NULL,
  `responseMessage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ticketId`),
  KEY `clientNic` (`clientNic`),
  KEY `branchId` (`branchId`),
  KEY `reasonId` (`reasonId`),
  KEY `responseStatusId` (`responseStatusId`),
  CONSTRAINT `supportticket_ibfk_1` FOREIGN KEY (`clientNic`) REFERENCES `client` (`nic`),
  CONSTRAINT `supportticket_ibfk_2` FOREIGN KEY (`branchId`) REFERENCES `branch` (`branchId`),
  CONSTRAINT `supportticket_ibfk_3` FOREIGN KEY (`reasonId`) REFERENCES `supportticketreasons` (`reasonId`),
  CONSTRAINT `supportticket_ibfk_4` FOREIGN KEY (`responseStatusId`) REFERENCES `supportresponsestatus` (`responseStatusId`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supportticket`
--

LOCK TABLES `supportticket` WRITE;
/*!40000 ALTER TABLE `supportticket` DISABLE KEYS */;
/*!40000 ALTER TABLE `supportticket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supportticketreasons`
--

DROP TABLE IF EXISTS `supportticketreasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supportticketreasons` (
  `reasonId` int NOT NULL AUTO_INCREMENT,
  `reason` varchar(50) NOT NULL,
  PRIMARY KEY (`reasonId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supportticketreasons`
--

LOCK TABLES `supportticketreasons` WRITE;
/*!40000 ALTER TABLE `supportticketreasons` DISABLE KEYS */;
INSERT INTO `supportticketreasons` VALUES (1,'Issue about a package'),(2,'Issue about a branch'),(3,'Issue about a service'),(4,'Issue about a delivery person');
/*!40000 ALTER TABLE `supportticketreasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transportagent`
--

DROP TABLE IF EXISTS `transportagent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transportagent` (
  `nic` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `vehicleNumber` varchar(15) NOT NULL,
  `routeId` int NOT NULL,
  PRIMARY KEY (`nic`),
  KEY `routeId` (`routeId`),
  CONSTRAINT `transportagent_ibfk_1` FOREIGN KEY (`routeId`) REFERENCES `route` (`routeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transportagent`
--

LOCK TABLES `transportagent` WRITE;
/*!40000 ALTER TABLE `transportagent` DISABLE KEYS */;
INSERT INTO `transportagent` VALUES ('','','','',1),('1234567','kavindu@gmail.com','kavindu rukmal','2832Mv',1),('199357842367','athula32@gmail.com','Athula Perera','NP CP-2023',5),('199845612375','kumud233@gmail.com','Kumud Rajasinghe','CP OP-8800',4),('199958761234','mithum700@gmail.com','Mithum Shalaka','SP MN-3011',3),('200045879612','saman308@gmail.com','Saman Kumara','NC LM-0128',2),('200110293847','ajith567@gmail.com','Ajith Muthumkumarana','WP LH-1625',1);
/*!40000 ALTER TABLE `transportagent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usercredentials`
--

DROP TABLE IF EXISTS `usercredentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usercredentials` (
  `userNic` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `roleId` int NOT NULL,
  UNIQUE KEY `userNic` (`userNic`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `usercredentials_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usercredentials`
--

LOCK TABLES `usercredentials` WRITE;
/*!40000 ALTER TABLE `usercredentials` DISABLE KEYS */;
INSERT INTO `usercredentials` VALUES ('199953637421','$2b$10$bm/LY8eZ/flHHOLLpLgXvOW8LkbLm3fTImypH2wr99/qJjj7yIozq',4),('200134701112','$2b$10$Oz8AqfJE.8yrp2udHPo3seqIt/iGRseTrlDQAD6HqDjpejpT2Jh6i',6),('200134701172','$2b$10$za3SDQ05iHWYywvb6elk1OKwfFMUwYZQqzcQTRU5tey4ybxSadB3W',2),('200156788849','$2b$10$/N.bdBNO8cM.HvrRSU0SBOOrgTla6V6BDoL8OE5eu6NdxqGk64CdG',4),('200181602356','$2b$10$B4mYpR1ki8Xgjenm.4sL1.67ErSkPIFEeezOsfXXDJFEeuZoCxZtu',6),('20018160243267','$2b$10$6L4/dDor0KxxA8kVGb/GN.yvDuOSPxr.CunCWmmhV4rJdJ7mnHzMa',1),('43772482844','$2b$10$MctV.V4dIP1TfKx6ep4pruZ1Fi6184mwFlSG0BYqp3B4HX/obY/SK',4);
/*!40000 ALTER TABLE `usercredentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'csmsdb'
--

--
-- Dumping routines for database 'csmsdb'
--
/*!50003 DROP PROCEDURE IF EXISTS `getCourierFee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getCourierFee`(
    IN packageWeight DECIMAL(10,2), 
    IN packageTypeId INT
)
BEGIN
    DECLARE baseFee DECIMAL(10,2);
    DECLARE extraFee DECIMAL(10,2);
    DECLARE totalFee DECIMAL(10,2);
    DECLARE maximumWeightCourierFeeId INT;
    DECLARE maximumWeight DECIMAL(10,2);
    
    SELECT courierFeeId 
    INTO maximumWeightCourierFeeId
    FROM courierfee 
    ORDER BY maxWeight DESC 
    LIMIT 1;
    
    SELECT CAST(maxWeight AS DECIMAL(10,2)) 
    INTO maximumWeight 
    FROM courierfee
    WHERE courierFeeId = maximumWeightCourierFeeId;
    
    IF packageWeight > maximumWeight THEN
        SELECT CAST(fee AS DECIMAL(10,2)) 
        INTO baseFee
        FROM courierfee
        WHERE courierFeeId = maximumWeightCourierFeeId;
    ELSE
        SELECT CAST(fee AS DECIMAL(10,2)) 
        INTO baseFee
        FROM courierfee
        WHERE maxWeight >= packageWeight
        ORDER BY maxWeight ASC
        LIMIT 1;
    END IF;
    
    SELECT extraDeliveryFee 
    INTO extraFee
    FROM packagetype p
    WHERE p.packageTypeId = packageTypeId; 
    
    SET totalFee = baseFee + extraFee;
    
    SELECT totalFee;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-05  3:04:33
