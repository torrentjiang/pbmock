import OutsideNavs from './outsideNavs';
import InnerNavs from './innerNavs';

export interface INavs {
  id: string;
  name: string;
  text: string;
  parentName?: string;
  path: string;
  component: string;
  needLogin?: boolean;
  permissionCode?: string | boolean;
  children?: INavs[];
  isHidden?: boolean;
}

export default {
  OutsideNavs,
  InnerNavs
};
