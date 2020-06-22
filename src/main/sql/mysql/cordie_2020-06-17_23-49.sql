-- MySQL dump 10.13  Distrib 5.5.25a, for Win32 (x86)
--
-- Host: localhost    Database: cordie
-- ------------------------------------------------------
-- Server version	5.5.25a

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collaborator`
--

DROP TABLE IF EXISTS `collaborator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `collaborator` (
  `diagram_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `is_creator` varchar(3) NOT NULL,
  PRIMARY KEY (`user_id`,`diagram_id`),
  KEY `diagram_id` (`diagram_id`),
  CONSTRAINT `collaborator_ibfk_1` FOREIGN KEY (`diagram_id`) REFERENCES `diagram` (`diagram_id`),
  CONSTRAINT `collaborator_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collaborator`
--

LOCK TABLES `collaborator` WRITE;
/*!40000 ALTER TABLE `collaborator` DISABLE KEYS */;
INSERT INTO `collaborator` VALUES (3,3,'NO'),(7,3,'NO'),(9,3,'NO'),(10,3,'NO'),(11,3,'NO'),(2,8,'NO'),(3,8,'NO'),(2,2,'NO'),(3,2,'NO'),(10,2,'NO'),(18,2,'YES'),(2,4,'YES'),(3,4,'YES'),(7,4,'YES'),(9,4,'YES'),(10,4,'YES'),(11,4,'YES'),(18,4,'NO');
/*!40000 ALTER TABLE `collaborator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagram`
--

DROP TABLE IF EXISTS `diagram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diagram` (
  `diagram_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `creator` bigint(20) unsigned NOT NULL,
  `title` varchar(30) DEFAULT NULL,
  `date_last_edited` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_created` datetime DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`diagram_id`),
  KEY `creator` (`creator`),
  CONSTRAINT `diagram_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagram`
--

LOCK TABLES `diagram` WRITE;
/*!40000 ALTER TABLE `diagram` DISABLE KEYS */;
INSERT INTO `diagram` VALUES (2,4,'Another Diagram','2012-03-28 02:17:59','2012-03-29 10:17:59',''),(3,4,'Diagram 3','2012-03-28 02:29:30','2012-03-29 10:29:30','another example diagram'),(7,4,'1','2012-04-23 18:24:53','2012-04-24 02:24:53',''),(9,4,NULL,'2012-05-20 13:05:08','2012-05-20 21:05:08',NULL),(10,4,NULL,'2012-05-20 13:05:08','2012-05-20 21:05:08',NULL),(11,4,NULL,'2012-05-20 13:05:08','2012-05-20 21:05:08','\''),(18,2,'My Own Diagram','2012-10-01 18:09:55','2012-10-02 02:09:55','');
/*!40000 ALTER TABLE `diagram` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER after_insert_diagram
AFTER INSERT ON diagram FOR EACH ROW
BEGIN
    INSERT INTO collaborator (diagram_id, user_id, is_creator) VALUES (NEW.diagram_id, NEW.creator, 'YES');
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_delete_diagram
BEFORE DELETE ON diagram FOR EACH ROW
BEGIN
    DELETE FROM collaborator WHERE diagram_id = OLD.diagram_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `firstname` varchar(25) DEFAULT NULL,
  `lastname` varchar(25) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `displaypic` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (2,'gem.villarico','9855b7f5d316820428a3e475d37ff14e','Gem','Villarico','gmv14_silver@yahoo.com','gem.villarico'),(3,'firefox','d6a5c9544eca9b5ce2266d1c34a93222','Mozilla','Firefox','','firefox.jpg'),(4,'mico','48fe5d050feeb64c37901fb704886638','Mico','Gonzales','mico@mail.com','mico'),(5,'newuser','0354d89c28ec399c00d3cb2d094cf093','Luke','Skywalker','newuser@mail.com','newuser.jpg'),(8,'gaga','811584043b844704c9bb9a6e99dd05d3','Stefani','Germanotta','','gaga.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER before_delete_user
BEFORE DELETE ON user FOR EACH ROW
BEGIN
    DELETE FROM diagram WHERE creator = OLD.username;
    DELETE FROM collaborator WHERE user_id = OLD.username;
END */;;
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

-- Dump completed on 2012-10-02  3:01:58
