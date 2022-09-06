import { createStore } from 'vuex'
import { getMusicLyric ,getMusicComment} from '@/request/api/item.js'
import { getPhoneLogin} from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [{
      al: {
        id: 89948016,
        pic: 109951165016839630,
        picUrl: "https://p1.music.126.net/XxNVjLlT_6mJBHEhPn8dQw==/109951165016839635.jpg",
        pic_str: "109951165016839635"
      },
      id:1450889933,
      name: "Monstercat Uncaged Volcano 9",
      ar:[{name:'fatRat'}]
    }],
    playListIndex:0,
    isBtnShow:true,
    detailShow:false,
    lyricList:{},
    currentTime:0,
    duration:0,
    isLogin:false,
    isFooterShow:true,
    commentList:{}
  },
  getters: {
  },
  mutations: {
    updateBtnShow:function(state,value){
      state.isBtnShow=value
    },
    updatePlayList:function(state,value){
      state.playList=value
    },
    updatePlayListIndex:function(state,value){
      state.playListIndex=value
    },
    updateDetailShow:function(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList:function(state,value){
      state.lyricList=value
    },
    updateCurrentTime:function(state,value){
      state.currentTime=value
    },
    updateDuration:function(state,value){
      state.duration=value
    },
    pushPlayList:function(state,value){
      state.playList.push(value)
    },
    updateIsLogin:function(state,value){
      state.isLogin=true
    },
    updateCommentList:function(state,value){
      state.commentList=value
    }
  },
  actions: {
    async getLyric(context,value){
      let res = await getMusicLyric(value)
      context.commit("updateLyricList",res.data.lrc)
    },
    async getLogin(context,value){
      let res = await getPhoneLogin(value)
      return res
    }
  },
  modules: {
  }
})
