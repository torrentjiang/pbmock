export const getImgPath = (imgPath:string) => {
  imgPath = imgPath.replace('https://cdn.cheyihui.vip', '');
  imgPath = imgPath.replace('https://cheyihui-public.oss-cn-hangzhou.aliyuncs.com', '');
  imgPath = imgPath.split('?')[0];
  return imgPath;
}