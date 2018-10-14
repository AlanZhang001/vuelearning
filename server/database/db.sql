CREATE TABLE `movie_search` (
  `id` int(4) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(255) NOT NULL COMMENT '电影名称',
  `link` varchar(255) NOT NULL COMMENT '电影介绍的路径',
  `dl` varchar(255) NOT NULL COMMENT '电影的magnet下载路径',
  `createdAt` datetime NOT NULL COMMENT '创建时间',
  `updatedAt` datetime NOT NULL COMMENT '更新时间',
  `size` varchar(255) DEFAULT NULL COMMENT '大小',
  `count` int(4) DEFAULT NULL COMMENT '资源内文件个数',
  `record_date` datetime DEFAULT NULL COMMENT '收录日期',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='电影查询表';