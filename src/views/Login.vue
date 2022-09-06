<template>
	<div class="login">
		<div class="inp">
			<van-cell-group inset>
				<van-field v-model="phone" placeholder="请输入手机号码" />
			</van-cell-group>
			<van-cell-group inset>
				<van-field v-model="password" placeholder="请输入密码" />
			</van-cell-group>
		</div>

		<van-button round type="success" @click="Login">登录</van-button>
	</div>
</template>

<script>
export default {
  data() {
    return {
      phone:"",
      password:""
    }
  },
  methods: {
    Login(){
      this.$store.dispatch("getLogin",{phone:this.phone,password:this.password})  
      if (res.data.code===200||res.data.code===400) {
        this.$store.commit("updateIsLogin",true)
        this.$router.push('/userInfo')
      }else{
        alert("手机号或密码有误,请重新输入");
        this.password=""
      }
    }
  },
};
</script>
<style lang="less" scoped>
.login {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height: 8rem;
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
	.inp {
    width: 80%;
		.van-cell-group--inset {
			border: 1px solid black;
      border-radius: .2rem;
      margin: .5rem;
		}
	}
	button {
		width: 50%;
    margin-top: -0.8rem;
	}
}
</style>