// 基础接口
import ajax from "./ajax";

import { BASE_URL } from "./constants";

// 音乐url
export const reqsongurl = (id) => ajax(BASE_URL + '/song/url', { id });

// 单个歌曲详情
export const reqsongDetail = (ids) => ajax(BASE_URL + '/song/detail', { ids });

// 获取单曲歌词
export const reqsonglyric = (id) => ajax(BASE_URL + '/lyric', { id });

// 获取相似歌曲
export const reqsimsong = (id) => ajax(BASE_URL + '/simi/song', { id });

// 音乐是否可用
export const reqsongcheck = (id) => ajax(BASE_URL + '/check/music', { id });