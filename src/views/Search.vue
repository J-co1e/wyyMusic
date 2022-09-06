<template>
	<div class="search">
		<div class="searchTop">
			<svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
				<use xlink:href="#icon-zuojiantou"></use>
			</svg>
			<div class="searchbox">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-31sousuo"></use>
				</svg>
				<input
					type="text"
					placeholder="陈奕迅"
					v-model="searchKey"
					@keydown.enter="enterKeyword"
				/>
			</div>
			<button @click="enterKeyword">搜索</button>
		</div>
		<div class="searchHistory">
			<div class="historyTop">
				<span><strong>历史</strong> </span>
				<svg class="icon" aria-hidden="true" @click="delHistory">
					<use xlink:href="#icon-shanchu"></use>
				</svg>
			</div>
			<div class="historyBottom">
				<span v-for="item in keyWordList" @click="searchHistory(item)">
					{{ item }}
				</span>
			</div>
		</div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in searchList" :key="i">
        <div class="itemLeft" @click="updateIndx(item)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.artists" :key="index">{{
              getAuthor(item1.name, item.artists)
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
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
import { getSearchList } from "@/request/api/home.js";
export default {
	data() {
		return {
			keyWordList: [],
			searchKey: "",
			searchList: [],
		};
	},
	mounted() {
		this.keyWordList = JSON.parse(localStorage.getItem("keyWordList"))
			? JSON.parse(localStorage.getItem("keyWordList"))
			: [];
	},
	methods: {
		async enterKeyword() {
			if (this.searchKey.trim() != "") {
				this.keyWordList.unshift(this.searchKey.trim());
				this.keyWordList = [...new Set(this.keyWordList)];
				if (this.keyWordList.length > 8) {
					this.keyWordList.pop();
				}
				localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList));
				let res = await getSearchList(this.searchKey);
				console.log(res);
				this.searchList = res.data.result.songs;
				this.searchKey = "";
			}
		},
		delHistory() {
			localStorage.removeItem("keyWordList");
			this.keyWordList = [];
		},
		async searchHistory(item) {
			let res = await getSearchList(item);
			this.searchList = res.data.result.songs;
		},
    getAuthor(name, item) {
      if (item.length > 1) {
        return name + "/";
      } else {
        return name;
      }
    },
    updateIndx(item){
      item.al=item.album
      item.al.picUrl=item.album.artist.img1v1Url
      this.$store.commit("pushPlayList",item)
      this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1)
    }
	},
};
</script>
<style lang="less" scoped>
.searchTop {
	width: 100%;
	height: 1rem;
	padding: 0 0.2rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.searchbox {
		display: flex;
		border-radius: 0.5rem;
		border: 0.02rem solid #ccc;
		align-items: center;
		width: 75%;
		padding: 0 0.06rem;
		height: 70%;
		margin-top: 0.1rem;
		input {
			border: none;
			padding: 0.1rem;
		}
		.icon {
			width: 20px;
			height: 20px;
			margin-left: 0.2rem;
			fill: #ccc;
		}
	}
	.icon {
		width: 0.6rem;
		height: 0.6rem;
	}
	button {
		border: none;
		background: none;
	}
}
.searchHistory {
	.historyTop {
		width: 90%;
		font-size: 0.35rem;
		margin: 0.2rem auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icon {
			width: 0.4rem;
			height: 0.4rem;
		}
	}
	.historyBottom {
		width: 95%;
		margin: 0.3rem auto;
		span {
			border-radius: 0.4rem;
			border: 0.02rem solid #ccc;
			padding: 0.15rem 0.2rem;
			font-size: 0.26rem;
			margin: 0.1rem 0.1rem;
			background-color: rgba(243, 243, 243, 0.753);
			display: inline-block;
		}
	}
}
.itemList {
    width: 100%;
    .item {
      width: 100%;
      height: 1.2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 0.02rem solid rgb(241, 241, 241);
      border-top:0.02rem solid rgb(241, 241, 241) ;
      padding: .2rem;
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
</style>