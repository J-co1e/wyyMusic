<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgImg" />
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="itemRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-androidgengduo"></use>
      </svg>
    </div>
  </div>
  <div class="itemMusicMiddle">
    <div class="playListImg">
      <img :src="playlist.coverImgUrl" alt="" />
      <div class="aa">
        <svg class="icon" aria-hidden="true" stroke="white">
          <use xlink:href="#icon-play"></use>
        </svg>
        <span>{{ getCount(playlist.playCount) }}</span>
      </div>
    </div>
    <div class="itemMusicMiddleInfo">
      <span>{{ playlist.name }}</span>
      <span class="avatar">
        <img :src="creator.avatarUrl" alt="" srcset="" />
        {{ creator.nickname }}
      </span>
      <div class="text">
        {{ playlist.description }}
      </div>
    </div>
  </div>
  <div class="itemMusicBottom">
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-wenjianjia"></use>
      </svg>
      <span>{{ subscribeCount }}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31xiaoxi"></use>
      </svg>
      <span>{{ playlist.commentCount }}</span>
    </div>
    <div class="item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{ playlist.shareCount }}</span>
    </div>
  </div>
</template>

<script>
export default {
  setup(props) {
    function getCount(num) {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    }
    return { getCount };
  },
  props: ["playlist", "creator", "subscribeCount"],
};
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .itemLeft,
  .itemRight {
    width: 18%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: white;
    }
    .icon {
      fill: white;
    }
  }
  .itemRight:nth-last-child(1) {
    transform: scale(1.2, 1.2);
  }
  .bgImg {
    width: 100%;
    height: 10rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
}
.itemMusicMiddle {
  padding: 0.2rem;
  margin-top: 0.2rem;
  display: flex;
  .playListImg {
    position: relative;
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 0.2rem;
    }
    .aa {
      position: absolute;
      display: flex;
      align-items: center;
      top: 0.05rem;
      right: -0.1rem;
      color: white;
      transform: scale(0.8, 0.8);
      background-color: rgba(204, 204, 204, 0.514);
      border-radius: 0.2rem;
      padding: 0 0.1rem;
      .icon {
        fill: white;
        transform: scale(0.8, 0.8);
      }
    }
  }
  .itemMusicMiddleInfo {
    padding: 0.1rem 0.2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    span {
      color: white;
    }
    img {
      border-radius: 75%;
      width: 0.5rem;
      height: 0.5rem;
      transform: translateY(0.2rem);
    }
    .avatar {
      height: 50px;
      color: #ccc;
      padding: 0 0.1rem;
      margin-bottom: 0.2rem;
      font-size: .2rem;
    }
    .text {
      width: 100%;
      color: #ccc;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      position: relative;
      font-size: 0.2rem;
    }
  }
}
.itemMusicBottom {
  display: flex;
  justify-content: space-around;
  position: relative;
  border-radius: 0.5rem;
  background-color: rgb(213, 213, 213);
  width: 70%;
  position: relative;
  top: 0.5rem;
  left: 15%;
  padding: 0.15rem;
  font-size: 0.3rem;
  .item {
    display: flex;
    align-items: center;
    transform: scale(0.9, 0.9);
    .icon {
      fill: white;
      margin-right: 0.1rem;
    }
    span {
      margin-top: 0.1rem;
      color: white;
    }
  }
  div:nth-of-type(2){
    border-left: .02rem solid rgb(163, 163, 163);
    border-right: .02rem solid rgb(163, 163, 163);
    padding: 0 .3rem;
  }
}
</style>
