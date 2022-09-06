<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-danlieliebiao"></use>
      </svg>
    </div>

    <div class="topContent">
      <span @click="$router.push('/UserInfo')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>

    <div class="topRight">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-31sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style lang="less" scoped>
*{
  font-family:Arial, Helvetica, sans-serif;
}
.topNav {
  width: 100%;
  padding: 0.3rem;
  display: flex;
  height: 1rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: .1rem;
  transition: all 1s ease;
  .icon{
    width: .6rem;
    height: 0.6rem;
    transform: translateY(.1rem);
  }
  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: .36rem;
    .active{
      font-weight: 900;
    }
  }
}
</style>
