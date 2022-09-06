<template>
  <div class="itemMusic">
    <ItemMusicTop :playlist='state.playList' :creator='state.creator' :subscribeCount='state.playList.subscribedCount'></ItemMusicTop>
    <ItemMusicList :musiclist='state.musicList' :subscribeCount='state.playList.subscribedCount'></ItemMusicList>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { getMusicItemList ,getMusicList} from "@/request/api/item.js";
import { reactive } from "vue";
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
export default {
  setup() {
    const state=reactive({
      playList:[],
      creator:[],
      musicList:[]
    })
    onMounted(async()=>{
      let id = useRoute().query.id
      let res = await getMusicItemList(id)
      state.playList=res.data.playlist
      state.creator=res.data.playlist.creator
      let result = await getMusicList(id)
      // console.log(result);
      state.musicList=result.data.songs
    })
    return {state}
  },
  component:{ItemMusicTop,ItemMusicList}
}
</script>

<style>
</style>