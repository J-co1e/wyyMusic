import server from "..";
export function getMusicItemList(id){
  return server({
    method:"GET",
    url:`/playlist/detail?id=${id}`
  })
}
export function getMusicList(data){
  return server({
    method:"GET",
    url:`/playlist/track/all?id=${data}&limit=20&offset=0`
  })
}
export function getMusicLyric(data){
  return server({
    method:"GET",
    url:`/lyric?id=${data}`
  })
}
export function getMusicComment(data){
  return server({
    method:"GET",
    url:`/comment/music?id=${data}&limit=5`
  })
}