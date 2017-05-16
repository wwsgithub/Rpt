/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 60005
Source Host           : localhost:3306
Source Database       : financerpt

Target Server Type    : MYSQL
Target Server Version : 60005
File Encoding         : 65001

Date: 2017-05-16 16:23:11
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for advert
-- ----------------------------
DROP TABLE IF EXISTS `advert`;
CREATE TABLE `advert` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '公告标题',
  `content` varchar(4000) DEFAULT NULL COMMENT '公告内容',
  `starttime` datetime DEFAULT NULL COMMENT '发布时间',
  `istop` varchar(1) DEFAULT '0' COMMENT '是否置顶：0否，1是',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of advert
-- ----------------------------
INSERT INTO `advert` VALUES ('1', '一季度财务通知', '各个部门的对比预算值已经给出，还需努力', '2016-05-14 10:26:53', '1');
INSERT INTO `advert` VALUES ('2', '研发-系统部门报告', '部门财务凭证、人工凭证统计结果已经出具，请对照', '2016-05-10 12:11:21', '0');
INSERT INTO `advert` VALUES ('5', '研发嵌入式本月报告', '总体不错', '2016-05-29 10:09:24', '1');
INSERT INTO `advert` VALUES ('6', '季度检查', '测试数据测试数据测试数据测试数据测试数据测试数据', '2016-05-30 10:25:40', '1');
INSERT INTO `advert` VALUES ('7', '一嗨技术组八月', '还可以', '2016-08-31 14:30:39', '0');
INSERT INTO `advert` VALUES ('8', '测试', '<span style=\"color:red;\">span</span>', '2016-09-02 10:04:19', '1');

-- ----------------------------
-- Table structure for datadetail
-- ----------------------------
DROP TABLE IF EXISTS `datadetail`;
CREATE TABLE `datadetail` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `itemno` int(100) DEFAULT NULL,
  `deptno` int(100) DEFAULT NULL COMMENT '预算',
  `budget` double(255,0) DEFAULT NULL,
  `finance_refer` double(255,0) DEFAULT NULL COMMENT '财务凭证',
  `personal_refer` double(255,0) DEFAULT NULL COMMENT '人工凭证',
  `recordtime` timestamp NULL DEFAULT NULL COMMENT '记录日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=177 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of datadetail
-- ----------------------------
INSERT INTO `datadetail` VALUES ('1', '101', '1', '10000', '11111', '1000', '2016-04-01 00:00:00');
INSERT INTO `datadetail` VALUES ('2', '102', '1', '178', '7', '27', '2016-04-01 00:00:00');
INSERT INTO `datadetail` VALUES ('3', '103', '1', '1000', '78', '0', '2016-04-01 22:20:04');
INSERT INTO `datadetail` VALUES ('4', '104', '1', '137', '373', '72', '2016-04-01 00:00:00');
INSERT INTO `datadetail` VALUES ('5', '105', '1', '41234', '423', '5434', '2016-05-01 10:27:53');
INSERT INTO `datadetail` VALUES ('9', '101', '1', '415234', '5342', '5234', '2016-03-01 18:58:03');
INSERT INTO `datadetail` VALUES ('15', '201', '2', '4123', '4124', '10', '2016-04-01 00:00:00');
INSERT INTO `datadetail` VALUES ('17', '102', '1', '241', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('46', '106', '1', '5435', '52', '32', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('66', '101', '1', '41', '1430', '5234', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('70', '103', '1', '124', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('122', '201', '2', '44214', '4123', '543', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('123', '222', '2', '999', '4123', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('128', '222', '2', '5324', '523', '0', '2016-04-01 00:00:00');
INSERT INTO `datadetail` VALUES ('129', '104', '1', '4123', '5432', '25', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('130', '107', '1', '5234', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('131', '108', '1', '0', '5234', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('132', '109', '1', '0', '523', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('133', '110', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('134', '111', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('135', '112', '1', '52345', '5324', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('136', '113', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('137', '114', '1', '0', '4560', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('138', '115', '1', '345', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('139', '116', '1', '5234', '52340', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('140', '117', '1', '53450', '5234', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('141', '118', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('142', '119', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('143', '120', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('144', '121', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('145', '122', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('146', '123', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('147', '124', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('148', '301', '3', '10000', '4132', '4321', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('149', '302', '3', '421', '423', '214', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('150', '303', '3', '42134', '255', '79', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('151', '14235', '1', '0', '0', '0', '2016-05-01 00:00:00');
INSERT INTO `datadetail` VALUES ('152', '101', '1', '4123', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('153', '102', '1', '25', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('154', '103', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('155', '104', '1', '23455', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('156', '105', '1', '235', '23455', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('157', '106', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('158', '107', '1', '0', '25', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('159', '108', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('160', '109', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('161', '110', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('162', '111', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('163', '112', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('164', '113', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('165', '114', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('166', '115', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('167', '116', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('168', '117', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('169', '118', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('170', '119', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('171', '120', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('172', '121', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('173', '122', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('174', '123', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('175', '124', '1', '0', '0', '0', '2016-02-01 00:00:00');
INSERT INTO `datadetail` VALUES ('176', '41234', '1', '552552', '5234', '52', '2016-05-01 00:00:00');

-- ----------------------------
-- Table structure for dept
-- ----------------------------
DROP TABLE IF EXISTS `dept`;
CREATE TABLE `dept` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `deptno` varchar(100) NOT NULL,
  `deptname` varchar(255) NOT NULL,
  `empname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dept
-- ----------------------------
INSERT INTO `dept` VALUES ('1', '1', '研发-嵌入式', '陈列新');
INSERT INTO `dept` VALUES ('2', '2', '研发-系统', '娜姐');
INSERT INTO `dept` VALUES ('3', '3', '工程', '袁瀚超');
INSERT INTO `dept` VALUES ('4', '4', '市场', '陈晨');
INSERT INTO `dept` VALUES ('5', '5', '生产', '周汝良');
INSERT INTO `dept` VALUES ('6', '6', '采购', '闫乐意');
INSERT INTO `dept` VALUES ('7', '7', '计划', '李粉');
INSERT INTO `dept` VALUES ('8', '8', '质量', '于春青');
INSERT INTO `dept` VALUES ('9', '9', '人力资源', '张成龙');
INSERT INTO `dept` VALUES ('10', '10', '财务', '黄吉林');
INSERT INTO `dept` VALUES ('11', '11', '后勤', '王阳');
INSERT INTO `dept` VALUES ('12', '12', '综合', '曹敏');
INSERT INTO `dept` VALUES ('15', '41234', 'tt', 'tt');

-- ----------------------------
-- Table structure for emp
-- ----------------------------
DROP TABLE IF EXISTS `emp`;
CREATE TABLE `emp` (
  `id` varchar(100) NOT NULL,
  `empno` varchar(100) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `departmentno` varchar(11) DEFAULT NULL,
  `role` varchar(10) DEFAULT '0' COMMENT '部门责任人0，管理员1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of emp
-- ----------------------------
INSERT INTO `emp` VALUES ('1', '0', 'admin', 'admin', '管理员', '0', '1');
INSERT INTO `emp` VALUES ('10', '9', 'zhangcl', 'zhangcl', '张成龙', '9', '0');
INSERT INTO `emp` VALUES ('11', '10', 'huangjl', 'huangjl', '黄吉林', '10', '0');
INSERT INTO `emp` VALUES ('12', '11', 'wangy', 'wangy', '王阳', '11', '0');
INSERT INTO `emp` VALUES ('13', '12', 'caom', 'caom', '曹敏', '12', '0');
INSERT INTO `emp` VALUES ('2', '1', 'chenlx', 'chenlx', '陈列新', '1', '0');
INSERT INTO `emp` VALUES ('3', '2', 'zhangn', 'zhangn', '张娜', '2', '0');
INSERT INTO `emp` VALUES ('4', '3', 'yuanhc', 'yuanhc', '袁瀚超', '3', '0');
INSERT INTO `emp` VALUES ('5', '4', 'chenc', 'chenc', '陈晨', '4', '0');
INSERT INTO `emp` VALUES ('6', '5', 'zhourl', 'zhourl', '周汝良', '5', '0');
INSERT INTO `emp` VALUES ('7', '6', 'yanly', 'yanly', '闫乐意', '6', '0');
INSERT INTO `emp` VALUES ('8', '7', 'lif', 'lif', '李粉', '7', '0');
INSERT INTO `emp` VALUES ('9', '8', 'yucq', 'yucq', '于春青', '8', '0');

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `itemno` varchar(100) NOT NULL,
  `itemname` varchar(255) NOT NULL,
  `deptno` int(100) NOT NULL,
  `costtype` varchar(1) DEFAULT '0' COMMENT '费用类型：0 变动费用；1 固定费用',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of item
-- ----------------------------
INSERT INTO `item` VALUES ('1', '101', '研发原材料', '1', '0');
INSERT INTO `item` VALUES ('2', '102', '差旅--开发、测试调试、检测、验收、维护', '1', '0');
INSERT INTO `item` VALUES ('3', '103', '差旅-需求调研、参展、会务等', '1', '0');
INSERT INTO `item` VALUES ('4', '104', '差旅-培训、学习等', '1', '0');
INSERT INTO `item` VALUES ('5', '105', '检测费', '1', '0');
INSERT INTO `item` VALUES ('6', '106', '技术引进-技术费', '1', '0');
INSERT INTO `item` VALUES ('7', '107', '技术引进-咨询费', '1', '0');
INSERT INTO `item` VALUES ('8', '108', '技术引进-产品鉴定、评审、评估费', '1', '0');
INSERT INTO `item` VALUES ('9', '109', '外包-开发费', '1', '0');
INSERT INTO `item` VALUES ('10', '110', '外包-设计费', '1', '0');
INSERT INTO `item` VALUES ('11', '111', '外包-服务费', '1', '0');
INSERT INTO `item` VALUES ('12', '112', '模具、工艺装备开发制造费', '1', '0');
INSERT INTO `item` VALUES ('13', '113', '加班费等', '1', '0');
INSERT INTO `item` VALUES ('14', '114', '研发工具购置费-软件', '1', '0');
INSERT INTO `item` VALUES ('15', '115', '研发工具购置费--硬件', '1', '0');
INSERT INTO `item` VALUES ('16', '116', '设备租赁费', '1', '0');
INSERT INTO `item` VALUES ('17', '117', '培训费（技术+管理）', '1', '0');
INSERT INTO `item` VALUES ('18', '118', '资料信息费', '1', '0');
INSERT INTO `item` VALUES ('19', '119', '人工成本', '1', '0');
INSERT INTO `item` VALUES ('20', '120', '工资（实发）', '1', '1');
INSERT INTO `item` VALUES ('21', '121', '社保公积金', '1', '1');
INSERT INTO `item` VALUES ('22', '122', '人才引进', '1', '1');
INSERT INTO `item` VALUES ('23', '123', '工伤', '1', '1');
INSERT INTO `item` VALUES ('24', '124', '意外险', '1', '1');
INSERT INTO `item` VALUES ('25', '201', 'test', '2', '0');
INSERT INTO `item` VALUES ('27', '222', 'qwer', '2', '0');
INSERT INTO `item` VALUES ('28', '301', '差旅（附明细）', '3', '0');
INSERT INTO `item` VALUES ('29', '302', '发货运费', '3', '0');
INSERT INTO `item` VALUES ('30', '303', '快递费（顺丰、申通、EMS）', '3', '0');
INSERT INTO `item` VALUES ('32', '41234', 'test', '1', '0');
