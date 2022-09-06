<template>
	<img :src="playlist.al.picUrl" alt="" class="bgImg" />
	<div class="musicDetail">
		<div class="musicDetailTop">
			<div class="topLeft">
				<svg class="icon" aria-hidden="true" @click="updateDetailShow">
					<use xlink:href="#icon-xiangxiajiantou1"></use>
				</svg>
				<div class="musicDetail">
					<Vue3Marquee style="--duration: 8s">
						{{ playlist.name }}
					</Vue3Marquee>
					<div class="cc">
						<span v-for="item in playlist.ar">{{
							getAuthor(item.name, playlist.ar)
						}}</span>
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-xiangyoujiantou"></use>
						</svg>
					</div>
				</div>
			</div>
			<div class="topRight">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-fenxiang"></use>
				</svg>
			</div>
		</div>
		<div class="musicDetailMiddle" v-show="!isLyricShow">
			<img
				src="../../assets/needle-ab.png"
				alt="needle"
				class="needle"
				:class="{ needle_active: !isBtnShow }"
			/>
			<img src="../../assets/cd.png" alt="cd" class="cd" />
			<img
				:src="playlist.al.picUrl"
				class="al"
				:class="isBtnShow ? 'al_pause' : 'al_active'"
				@click="isLyricShow = true"
			/>
		</div>
		<div
			class="lyric"
			ref="musicLyric"
			v-show="isLyricShow"
			@click="isLyricShow = false"
		>
			<p
				v-for="(item, index) in getLyric"
				:key="index"
				:class="{
					active:
						currentTime * 1000 >= item.time && currentTime * 1000 < item.pre,
				}"
			>
				{{ item.lrc }}
			</p>
		</div>
		<div class="musicDetailFooter">
			<div
				class="footerTop"
				:style="{ visibility: isLyricShow ? 'hidden' : 'visible' }"
			>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-aixin"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-xiazai1"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-shipin1"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-31xiaoxi"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-androidgengduo"></use>
				</svg>
			</div>
			<div class="footerMiddle">
				<span>00:00</span>
				<input
					type="range"
					class="range"
					min="0"
					:max="duration"
					v-model="currentTime"
					step="0.01"
				/>
				<span>00:00</span>
			</div>
			<div class="footerBottom">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-xunhuan"></use>
				</svg>
				<svg class="icon" aria-hidden="true" @click="goPlay(-1)">
					<use xlink:href="#icon-shangyishoushangyige"></use>
				</svg>
				<svg
					class="icon bofang"
					aria-hidden="true"
					@click="play"
					v-if="isBtnShow"
				>
					<use xlink:href="#icon-bofang2"></use>
				</svg>
				<svg class="icon bofang" aria-hidden="true" @click="play" v-else>
					<use xlink:href="#icon-zanting"></use>
				</svg>
				<svg class="icon" aria-hidden="true" @click="goPlay(1)">
					<use xlink:href="#icon-xiayigexiayishou"></use>
				</svg>
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-play-list-2-fill "></use>
				</svg>
			</div>
		</div>
	</div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
	data() {
		return {
			isLyricShow: false,
		};
	},
	mounted() {
		this.addDuration();
		console.log(this.duration);
	},
	props: ["playlist", "isBtnShow", "play", "addDuration"],
	methods: {
		getAuthor(name, item) {
			if (item.length > 1) {
				return name + "/";
			} else {
				return name;
			}
		},
		goPlay: function (num) {
			let index = this.playListIndex + num;
			if (index < 0) {
				index = this.playList.length - 1;
			} else if (index == this.playList.length) {
				index = 0;
			}
			this.updatePlayListIndex(index);
		},
		...mapMutations([
			"updateDetailShow",
			"updateCurrentTime",
			"updatePlayListIndex",
		]),
	},
	watch: {
		currentTime: function (newValue) {
			let p = document.querySelector("p.active");
			if (p) {
				if (p.offsetTop > 300) {
					this.$refs.musicLyric.scrollTop = p.offsetTop - 300;
				}
			}
			if (newValue === this.duration) {
				if (this.playListIndex === this.playList.length - 1) {
					this.updatePlayListIndex(0);
          this.play()
				} else {
					this.updatePlayListIndex(this, playListIndex + 1);
				}
			}
		},
	},
	components: {
		Vue3Marquee,
	},
	computed: {
		...mapState([
			"lyricList",
			"currentTime",
			"duration",
			"playList",
			"playListIndex",
		]),
		getLyric: function () {
			let arr = [];
			if (this.lyricList.lyric) {
				arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
					let min = item.slice(1, 3);
					let second = item.slice(4, 6);
					let mill = item.slice(7, 10);
					let lrc = item.slice(11, item.length);
					let time =
						parseInt(min) * 60 * 1000 +
						parseInt(second) * 1000 +
						parseInt(mill);
					if (isNaN(Number(mill))) {
						mill = item.slice(7, 9);
						lrc = item.slice(10, item.length);
					}
					return { min, second, mill, lrc, time };
				});
				arr.forEach((item, i) => {
					if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
						item.pre = 1000000;
					} else {
						item.pre = arr[i + 1].time;
					}
				});
			}
			return arr;
		},
	},
};
</script>
<style lang="less" scoped>
.musicDetail {
	.musicDetailTop {
		display: flex;
		width: 100%;
		justify-content: space-between;
		.topLeft {
			display: flex;
			padding: 0.2rem;
			.icon {
				width: 15%;
				height: 15%;
				margin-right: 0.1rem;
				margin-top: 0.1rem;
				fill: #fff;
			}
			.musicDetail {
				font-size: 0.28rem;
				text-align: center;
				color: #fff;
				.vue3-marquee {
					width: 5rem;
					position: relative;
					left: 2.5%;
				}
				.cc {
					height: 0.4rem;
					position: relative;
					left: 5%;
					width: 5rem;
					.icon {
						width: 10%;
						height: 50%;
					}
				}
				span {
					color: rgb(215, 215, 215);
				}
				.icon {
					width: 7%;
					height: 7%;
					fill: #fff;
				}
			}
		}
		.topRight {
			padding: 0.2rem;
			.icon {
				fill: #fff;
			}
		}
	}
	.musicDetailMiddle {
		width: 100%;
		height: 9rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
		top: -1rem;
		.al {
			position: absolute;
			border-radius: 75%;
			width: 42%;
			height: 35%;
			bottom: 3.75rem;
			animation: rotate_al 15s linear infinite;
		}
		.needle {
			width: 2rem;
			height: 3rem;
			position: absolute;
			left: 46%;
			top: -0.6rem;
			transform-origin: 0 0;
			transform: rotate(-20deg);
			transition: all 1s ease-in-out;
		}
		.needle_active {
			width: 2rem;
			height: 3rem;
			position: absolute;
			left: 46%;
			top: -0.6rem;
			transform-origin: 0 0;
			transform: rotate(0deg);
			transition: all 1s ease-in-out;
		}
		.cd {
			width: 5rem;
			height: 5rem;
			position: absolute;
			bottom: 2.8rem;
			z-index: -1;
		}
		.al_active {
			animation-play-state: running;
		}
		.al_pause {
			animation-play-state: paused;
		}
		@keyframes rotate_al {
			0% {
				transform: rotateZ(0deg);
			}
			100% {
				transform: rotateZ(360deg);
			}
		}
	}
	.musicDetailFooter {
		width: 100%;
		height: 3rem;
		position: absolute;
		bottom: 0.2rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		.footerTop {
			width: 80%;
			height: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.icon {
				width: 0.3rem;
				height: 0.3rem;
				fill: rgb(245, 234, 234);
			}
			.icon {
				width: 0.55rem;
				height: 0.55rem;
			}
		}
		.footerMiddle {
			width: 100%;
			height: 0.06rem;
			display: flex;
			font-size: 0.24rem;
			align-items: center;
			padding: 0 0.1rem;
			margin-bottom: 0.1rem;
			justify-content: space-around;
			color: rgb(89, 89, 89);
			.range {
				width: 80%;
				height: 0.06rem;
				background-color: #ccc;
				border-radius: 0.2rem;
			}
			.range:root {
				--van-swipe-indicator-active-background-color: var(--van-active-color);
				--van-swipe-indicator-inactive-background-color: var(
					--van-border-color
				);
			}
		}
		.footerBottom {
			width: 93%;
			height: 1rem;
			display: flex;
			justify-content: space-around;
			align-items: center;
			.icon {
				fill: rgb(245, 234, 234);
			}
			.bofang {
				width: 1rem;
				height: 1rem;
			}
		}
	}
	.lyric {
		width: 100%;
		height: 9rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: scroll;
		margin-top: -1.8rem;
		transition: all 1s;
		P {
			color: #ccc;
			margin-bottom: 0.4rem;
			font-size: 0.28rem;
			transition: all .5s;
		}
		.active {
			color: #fff;
			font-size: 0.35rem;
		}
	}
	.lyric::-webkit-scrollbar {
		display: none;
	}
}
.bgImg {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: -1;
	filter: blur(0.9rem) grayscale(50%);
}
</style>
