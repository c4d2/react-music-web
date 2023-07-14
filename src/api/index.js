// 基础接口
import ajax from "./ajax";

import { BASE_URL } from "./constants";

//排行榜详情
export const reqtoplist = () => ajax(BASE_URL + '/toplist/detail', {});
