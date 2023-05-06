import axios from 'axios';
import Base64 from 'base-64';

interface ReqGitFile extends ReqGit {
  baseUrl: string; // 请求默认路径 域名
  projectUrl: string; // 项目路径
  fileUrl: string; // 文件在项目中的地址
  branch: string; // 分支
}

interface ReqGit {
  gitUrl: string;
  token?: string;
}

declare type ResGitFile = {
  code: number;
  message: string;
  data: any;
};

/**
 * git api默认token
 */
const token: string = 'Rukkys4rHh3_kyDHz-_e';

/**
 * 获取git项目ID
 * @param gitFile
 */
export async function getRepositoryId(gitFile: ReqGitFile): Promise<number> {
  let projectNames = gitFile.projectUrl.split("/");
  let projectName = projectNames[projectNames.length - 1];

  try {
    let res = await axios.get(`${gitFile.baseUrl}/api/v4/search?scope=projects&search=${projectName}`, {
      headers: {
        'PRIVATE-TOKEN': gitFile.token || token,
      },
    }).then(res => res);
    if (res.status === 200) {
      let id = res.data.filter((item: any) => item.name == projectName)[0].id;
      return id;
    } else {
      throw new Error('--------------获取项目id，失败--------------');
    }
  } catch (err) {
    throw new Error('--------------获取项目id，失败--------------');
  }
}

/**
 * 入口js
 * 获取git链接, 需要参数一个是 项目地址, 一个是分支名
 * 获取到的参数如下
 * 需要提取 分支 文件路径
 *
 *
 * @param reqGit{ }
 */
export async function getRepositoryFileList(reqGit: ReqGit): Promise<ResGitFile> {
  // // 解析url
  const gitFile: ReqGitFile = { ...getGitFile(reqGit.gitUrl), ...reqGit };
  const { baseUrl = "https://gitlab.com", branch = "master" } = gitFile;
  const projectId = await getRepositoryId(gitFile);
  try {
    let res = await axios.get(
      `${baseUrl}/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(`${gitFile.fileUrl}`)}?ref=${branch}`,
      {
        headers: {
          'PRIVATE-TOKEN': gitFile.token || token,
        },
      },
    ).then(res => res);
    if (res.status === 200) {
      const content: string = res.data.content;
      return {
        code: 0,
        message: "ok",
        data: Base64.decode(content)
      }
    } else {
      throw new Error("--------------获取文件内容，失败---------------")
    }
  } catch (err) {
    throw new Error("--------------获取文件内容，失败---------------")

  }
}

/**
 * 解析git链接
 * @param gitUrl
 */
function getGitFile(gitUrl: string): ReqGitFile {
  let urlObj = new URL(gitUrl);
  let baseUrl = urlObj.origin;
  let pathArr = urlObj.pathname.split(/\/blob\/\w+\//);
  let projectUrl = pathArr[0].substr(1);
  let fileUrl = pathArr[1];
  let branch = urlObj.pathname.match(/\/blob\/\w+\//)![0].split('/blob/')[1];
  return {
    baseUrl: baseUrl, // 请求默认路径 域名
    projectUrl: projectUrl, // 项目路径
    fileUrl: fileUrl, // 文件在项目中的地址
    branch: branch.substr(0, branch.length - 1), // 分支
    gitUrl: gitUrl
  };
}
