<template>
  <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang2"></use>
        </svg>
        <span
          >播放全部<span>(共{{ musiclist.length }}首)</span></span
        >
      </div>
      <div class="listRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-show_duoxuan"></use>
        </svg>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in musiclist" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="index">{{
              getAuthor(item1.name, item.ar)
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-shipinbofang"></use>
          </svg>
          <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-danlieliebiao"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  setup(props) {
    console.log(props);
  },
  props: ["musiclist", "subscribeCount"],
  methods: {
    playMusic(i) {
      this.updatePlayList(this.musiclist);
      this.updatePlayListIndex(i);
    },
    getAuthor(name, item) {
      if (item.length > 1) {
        return name + "/";
      } else {
        return name;
      }
    },
    ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
  },
};
</script>
<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.529);
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: .5rem;
    .listLeft {
      width: 40%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        stroke: #333333;
        stroke-width: 20;
      }
      span {
        font-weight: 700;
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .listRight {
      display: flex;
      align-items: center;
      padding: 0.2rem;
      color: rgb(0, 0, 0);
      justify-content: space-between;
      width: 22%;
      .icon {
        width: 0.45rem;
        height: 0.45rem;
        fill: rgb(130, 130, 130);
      }
    }
  }
  .itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1.4rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.02rem solid rgb(241, 241, 241);
      .itemLeft {
        width: 85%;
        height: 100%;
        display: flex;
        align-items: center;
        .leftSpan {
          display: inline-block;
          width: 0.2rem;
          text-align: center;
        }
        div {
          p {
            width: 4.54rem;
            height: 0.4rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
          }
          span {
            font-weight: 400;
            font-size: 0.24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight {
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon {
          fill: #999;
        }
        .bofang {
          position: absolute;
          left: 0;
        }
        .liebiao {
          position: absolute;
          right: 0;
        }
      }
    }
  }
  .itemList:nth-last-child(1) {
    padding-bottom: 1.2rem;
  }
}
</style>
