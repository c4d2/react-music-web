// 基础接口
import ajax from "./ajax";

import { BASE_URL } from "./constants";

// 歌手专辑
export const reqsingeralbum = (id, limit) => ajax(BASE_URL + '/artist/album', { id, limit });

// 歌手歌曲
export const reqsingersong = (id) => ajax(BASE_URL + '/artists', { id });

// 歌手描述
export const reqsingerinfo = (id) => ajax(BASE_URL + '/artist/desc', { id });

// 歌手详情
export const reqsingerdetail = (id) => ajax(BASE_URL + '/artist/detail', { id });