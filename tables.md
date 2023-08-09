# 数据库表设计

t_team（团队表）
id	编号	int	主键，自增长
name	团队名	varchar(20)	非空


t_group（群组表）
id	编号	int	主键，自增长
name	群组名	varchar(20)	非空


t_team_group（团队-群组关系表）
id	编号	int	主键，自增长
team_id	团队id	int	非空，外键（对应t_team的id）
group_id 群组id	int	非空，外键（对应t_group的id）


t_project（项目表）
id	项目id	int	主键，自增长
name	项目名	varchar(20)	非空
module	模块描述	varchar(20)	可为空


t_group_project（群组-项目关系表）
id	编号	int	主键，自增长
group_id	群组id	int	非空，外键（对应t_group的id）
project_id  项目id	int	非空，外键（对应t_project的id）


t_project_api（项目-接口关系表）
id	编号	int	主键，自增长
project_id  项目编号	int	非空，外键（对应t_project的id）
api_id	api编号	int	非空，外键（对应t_api的id）


t_api（api表）
id	api编号	int	主键，自增长
path	接口路径	varchar(100)	非空
desc	接口描述	varchar(100)	非空
mock_link	接口mock链接	varchar(100)	可为空
gateway	使用网关	varchar(20)	非空
pb_link	pb文件地址	varchar(100)	非空
json	pb2json字符串	LONGTEXT	可为空
ts	pb2ts字符串	LONGTEXT	可为空


t_project_gateway（项目-网关关系表）
id	编号	int	主键，自增长
project_id	项目id	int	非空，外键（对应t_project的id）
gateway_name	网关名称	varchar(20)	非空
