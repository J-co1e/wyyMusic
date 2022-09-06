<template>
  <div class="FooterMusic">
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="" />
      <div class="footerInfo">
        <p>{{ playList[playListIndex].name }}</p>
        <span>横划切换上下首</span>
      </div>
    </div>
    <div class="footerRight">
      <svg class="icon" aria-hidden="true" v-if="isBtnShow" @click="play">
        <use xlink:href="#icon-bofang2"></use>
      </svg>
      <svg class="icon" aria-hidden="true" v-else @click="play">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan1-copy"></use>
      </svg>
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%',width:'100%' }">
      <MusicDetail :playlist='playList[playListIndex]' :play='play' :isBtnShow='isBtnShow' :addDuration='addDuration'></MusicDetail>
    </van-popup>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import MusicDetail from './MusicDetail.vue'
export default {  
  data() {
    return {
      timeout:0
    }
  },
  computed: {
    ...mapState(["playList", "playListIndex", "isBtnShow","detailShow"]),
  },
  mounted() {
    this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
    this.updateTime()
  },
  updated() {
    this.$store.dispatch("getLyric",this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
    play: function () {
      if (this.$refs.audio.paused) {
        this.$refs.audio.play();
        this.updateBtnShow(false);
        this.updateTime()
      } else {
        this.$refs.audio.pause();
        this.updateBtnShow(true);
        clearInterval(this.timeout)
      }
    },
    addDuration:function(){
      this.updateDuration(this.$refs.audio.duration)
      console.log(this.$refs);
    },
    updateTime:function(){
      this.timeout=setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 50);
    },
    ...mapMutations(["updateBtnShow","updateDetailShow",'updateCurrentTime',"updateDuration"]),
  },
  watch: {
    playListIndex: function () {
      this.$refs.audio.autoplay = true;
      if (this.$refs.audio.paused) {
        this.updateBtnShow(false);
      }
    },
    playList:function(){
      if (this.isBtnShow) {
        this.$refs.audio.autoplay=true
        this.updateBtnShow(false)
      }
    }
  },
  component:{MusicDetail}
};
</script>
<style lang="less" scoped>
.FooterMusic {
  width: 100%;
  height: 1.3rem;
  background-color: white;
  position: fixed;
  bottom: 0;
  border-top: 0.02rem solid #ccc;
  display: flex;
  padding: 0.2rem;
  align-items: center;
  justify-content: space-between;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    img {
      width: 0.9rem;
      height: 0.9rem;
      border-radius: 75%;
    }
    .footerInfo {
      margin-left: .30rem;
      overflow: hidden;
      white-space: nowrap;
      span {
        color: #ccc;
        font-size: 0.25rem;
      }
    }
  }
  .footerRight {
    width: 25%;
    align-items: center;
    height: 100%;
    display: flex;
    justify-content: space-around;
    .icon {
      transform: scale(1.3, 1.3);
    }
  }
}
</style>
