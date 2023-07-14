// 基础接口
import ajax from "./ajax";

import { BASE_URL } from "./constants";

// 搜索歌曲
export const reqsearchresult = (keywords) => ajax(BASE_URL + '/cloudsearch', { keywords });

// 热门搜索
export const reqhotsearch = () => ajax(BASE_URL + '/search/hot/detail', {});

// 热门歌单
export const reqhotalbum = (limit = 5) => ajax(BASE_URL + '/personalized', { limit });

// 热门歌曲
export const reqhotsong = (limit = 5) => ajax(BASE_URL + '/personalized/newsong', { limit });