// 告警编号规则
export default [
  {
    key: '001',
    value: '连consul异常',
    level: 0
  },
  {
    key: '002',
    value: '连krpc server异常',
    level: 2
  },
  {
    key: '003',
    value: '磁盘IO异常',
    level: 3
  },
  {
    key: '004',
    value: 'db异常',
    level: 3
  },
  {
    key: '005',
    value: 'redis异常',
    level: 3
  },
  {
    key: '006',
    value: 'mq异常',
    level: 1
  },
  {
    key: '007',
    value: 'http调用异常',
    level: 2
  },
  {
    key: '008',
    value: 'kafka异常',
    level: 1
  },
  {
    key: '009',
    value: 'emq异常',
    level: 1
  },
  {
    key: '010',
    value: '配置服务异常',
    level: 1
  },
  {
    key: '011',
    value: '连cat异常',
    level: 0
  },
  {
    key: '012',
    value: '队列满',
    level: 3
  },
  {
    key: '013',
    value: '连monitor异常',
    level: 0
  },
  {
    key: '014',
    value: '进程不存在',
    level: 0
  },
  {
    key: '015',
    value: 'hbase异常',
    level: 1
  },
  {
    key: '016',
    value: '单曲线告警',
    level: 1
  },
  {
    key: '017',
    value: '双曲线告警',
    level: 1
  },
  {
    key: '018',
    value: 'mongodb异常',
    level: 1
  },
  {
    key: '020',
    value: '以上-业务层报警',
    level: 1
  },
  {
    key: '061',
    value: '告警邮件发送失败',
    level: 1
  }
]