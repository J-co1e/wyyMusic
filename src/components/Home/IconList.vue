<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="false">
        <use xlink:href="#icon-weinituijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinji1"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-gedan1"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconList",
};
</script>

<style lang="less" scoped>
.iconList {
  margin: .2rem auto;
  width: 90%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .iconItem{
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon{
      width: .7rem;
      height: .7rem;
    }
  }
} 
</style>
