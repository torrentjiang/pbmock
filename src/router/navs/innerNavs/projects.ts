import request from '@/lib/request';
import { getDynamicMenu } from '../index.model';

export default async function viewRoutes() {
  const routeList: any = [];
  await getDynamicMenu().then((res: any) => {
    if (res && res.errCode === 0) {
      const resList = res.data.list || [];

      // 找出有多少个team
      const teamList: any = [];
      const teamObjList: any = [];
      resList.forEach((e: any) => {
        if (teamList.indexOf(e.teamId) === -1) {
          teamList.push(e.teamId);
          teamObjList.push({
            teamId: e.teamId,
            teamName: e.teamName
          });
        }
      });

      // 组合团队数据
      const groupList: any = [];
      teamList.forEach((e: any) => {
        const groupResList = resList.filter((p: any) => p.teamId === e);
        const groupRouteList: any = [];
        groupResList.forEach((o: any) => {
          groupRouteList.push({
            id: `${e}-${o.groupId}`,
            text: o.groupName,
            path: `/projects?team=${e}&group=${o.groupId}`,
            component: 'project',
            needLogin: false
          });
          groupRouteList.push({
            id: `${e}-${o.groupId}-${o.groupId}`,
            text: o.groupName,
            path: `/projects/api?team=${e}&group=${o.groupId}`,
            component: 'project',
            needLogin: false,
            isHidden: true
          });
        });
        groupList.push(groupRouteList);
      });

      // 组合群组数据
      teamList.forEach((e: any, index: number) => {
        routeList.push({
          id: e,
          text: teamObjList[index].teamName,
          path: teamObjList[index].teamId,
          icon: 'menu',
          children: groupList[index]
        });
      });
    }
  });

  const routes = {
    parentName: 'projects',
    children: [
      {
        id: '999-998',
        text: '接口',
        path: '/projects/api',
        component: 'api',
        needLogin: false,
        isHidden: true
      },
      {
        id: '999-999',
        text: '项目',
        path: '/projects',
        component: 'project',
        needLogin: false,
        isHidden: true
      },
      ...routeList
      // ...settingList
    ]
  };

  return routes;
}
