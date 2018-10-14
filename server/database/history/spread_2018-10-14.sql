# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.23)
# Database: spread
# Generation Time: 2018-10-14 10:26:13 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table movie_search
# ------------------------------------------------------------

DROP TABLE IF EXISTS `movie_search`;

CREATE TABLE `movie_search` (
  `id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) NOT NULL COMMENT '电影名称',
  `link` varchar(255) NOT NULL COMMENT '电影介绍的路径',
  `dl` varchar(255) NOT NULL COMMENT '电影的magnet下载路径',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `size` varchar(255) DEFAULT NULL COMMENT '大小',
  `count` int(4) DEFAULT NULL COMMENT '资源内文件个数',
  `record_date` datetime DEFAULT NULL COMMENT '收录日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='电影查询表';

LOCK TABLES `movie_search` WRITE;
/*!40000 ALTER TABLE `movie_search` DISABLE KEYS */;

INSERT INTO `movie_search` (`id`, `name`, `link`, `dl`, `createdAt`, `updatedAt`, `size`, `count`, `record_date`)
VALUES
	(5,'碟中谍5-碟中谍5下载-Mission Impossible 5.rmvb','https://cnbtspread.xyz/38b798f4dc109a37288d363bcc513148e6206849/','magnet:?xt=urn:btih:38b798f4dc109a37288d363bcc513148e6206849&dn=%E7%A2%9F%E4%B8%AD%E8%B0%8D5-%E7%A2%9F%E4%B8%AD%E8%B0%8D5%E4%B8%8B%E8%BD%BD-Mission%20Impossible%205.rmvb','2018-10-14 09:34:20','2018-10-14 09:34:20','1.16 GB',1,'2015-08-20 05:49:42'),
	(6,'速度与激情7部曲','https://cnbtspread.xyz/eee4e8f850ae8175b73d7d9fd74acc5bb3ca0549/','magnet:?xt=urn:btih:eee4e8f850ae8175b73d7d9fd74acc5bb3ca0549&dn=%E9%80%9F%E5%BA%A6%E4%B8%8E%E6%BF%80%E6%83%857%E9%83%A8%E6%9B%B2','2018-10-14 09:34:20','2018-10-14 09:34:20','10.48 GB',7,'2015-12-14 03:52:07'),
	(9,'【性吧论坛.com】PPPD697New ','//cnbtspread.xyz/b5cb2221dd314e6042e958b5a4905087c89b5910/','magnet:?xt=urn:btih:b5cb2221dd314e6042e958b5a4905087c89b5910&dn=%E3%80%90%E6%80%A7%E5%90%A7%E8%AE%BA%E5%9D%9B.com%E3%80%91PPPD697','2018-10-14 09:47:23','2018-10-14 09:47:23','5.28 GB',23,NULL);

/*!40000 ALTER TABLE `movie_search` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
