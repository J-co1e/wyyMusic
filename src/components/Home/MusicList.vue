<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title"><label for="">发现好歌单</label></div>
      <div class="more"><label for="">查看更多</label></div>
    </div>
    <div class="musicSwipe">
      <van-swipe :loop="false" :width="150" :show-indicators="false">
        <van-swipe-item v-for="item in musicList" :key="item.id">
          <router-link :to="{
            path:'/itemMusic',
            query:{id:item.id}
          }">
            <img :src="item.picUrl" />
            <span class="playCount">
              <svg class="icon" aria-hidden="true" stroke="white">
                <use xlink:href="#icon-bofang1"></use>
              </svg>
              {{ getCount(item.playCount) }}
            </span>
            <span class="name">
              {{ item.name }}
            </span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/request/api/home.js";
export default {
  name: "MusicList",
  data() {
    return {
      musicList: [],
    };
  },
  methods: {
    async getGeDan() {
      let res = await getMusicList();
      this.musicList = res.data.result;
    },
    getCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    },
  },
  mounted() {
    this.getGeDan();
  },
};
</script>

<style lang="less" scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  margin-top: -0.4rem;
  .musicTop {
    width: 95%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin: .2rem auto;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 0.02rem solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicSwipe {
    width: 100%;
    height: 3.5rem;
    .van-swipe {
      height: 4rem;
      .van-swipe-item {
        border-radius: 0.1rem;
        padding: 0 5px;
        img {
          position: relative;
          width: 100%;
          height: 2.8rem;
        }
        .playCount {
          display: flex;
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          color: white;
          transform: scale(0.8, 0.8);
          font-weight: 500;
        }
      }
    }
  }
}
</style>
