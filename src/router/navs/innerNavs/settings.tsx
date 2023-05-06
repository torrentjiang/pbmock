export default {
  parentName: 'settings',
  children: [
    {
      id: '103-01',
      text: '团队管理',
      path: '/settings/team',
      icon: 'team',
      component: 'team',
      needLogin: false
    },
    {
      id: '103-02',
      text: '群组管理',
      path: '/settings/group',
      icon: 'user',
      component: 'group',
      needLogin: false
    }
  ]
};
