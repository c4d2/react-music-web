// 基础接口
import ajax from "./ajax";

import { BASE_URL } from "./constants";

// 专辑详情
export const reqalbumDetail = (id) => ajax(BASE_URL + '/album', { id });

//歌单详情
export const reqplaylist = (id) => ajax(BASE_URL + '/playlist/detail', { id });

//热门类别歌单
export const reqhot = () => ajax(BASE_URL + '/playlist/hot', {});

// 推荐歌单详情
export const reqrecommendlist = (cat) => ajax(BASE_URL + '/top/playlist', { cat });

// 获取相似歌单
export const reqsimalbum = (id) => ajax(BASE_URL + '/simi/playlist', { id });