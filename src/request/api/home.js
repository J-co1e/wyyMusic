import server from "..";
export function getBanner(){
  return server({
    method:'GET',
    url:"/banner?type=2",
  })
}
export function getMusicList(){
  return server({
    method:'GET',
    url:"/personalized?limit=10"
  })
}
export function getSearchList(data){
  return server({
    method:'GET',
    url:`/search?keywords= ${data}`
  })
}
export function getPhoneLogin(data){
  return server({
    method:'GET',
    url:`/login/cellphone?phone=${data.phone}&password=${data.password}`
  })
}