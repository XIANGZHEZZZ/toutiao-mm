<template>
  <div class="user-profile">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        title="个人信息"
        left-arrow
        @click-left="$router.back()"
      />
      <!-- 导航栏结束 -->
			<input 
				type="file"
				ref="file" 
				@change="onFileChange"
				hidden
			>
      <!-- 个人信息 -->
      <van-cell
				class="photo-cell"
				title="头像" 
				is-link 
				center
				>
          <van-image
            class="avatar"
            :src="user.photo"
            fit="cover"
            round
						@click="$refs.file.click()"
          />
			</van-cell>

      <van-cell title="呢称" 
				is-link 
				:value="user.name" 
				@click="isUpdateNameShow = true" 
			/>

      <van-cell title="性别" 
			is-link 
			:value="user.gender === 0 ? '男' : '女'"
			@click="isUpdateGenderShow = true" 
			 />

      <van-cell title="生日" 
				is-link 
				:value="user.birthday"
				@click="isUpdateBirthdayShow = true"
			/>
      <!-- 个人信息结束 -->

      <!-- 编辑呢称 -->
      <!-- v-if="isProfileShow" 表示为true的时候 打开刷新 为false 关闭 -->
      <van-popup 
        v-model="isUpdateNameShow" 
        position="bottom" 
        :style="{ height: '100%' }"
      >
        <update-name 
            v-if="isUpdateNameShow"
            @close="isUpdateNameShow = false"
            v-model="user.name"
        ></update-name>
      </van-popup>
      <!-- /编辑呢称 -->

			<!-- 编辑性别-->
      <van-popup 
        v-model="isUpdateGenderShow" 
        position="bottom" 
      >
        <update-gender 
					v-if="isUpdateGenderShow"
					@close="isUpdateGenderShow = false"
          v-model="user.gender"
        ></update-gender>
      </van-popup>
      <!-- 编辑性别结束 -->

			<!-- 编辑生日 -->
      <van-popup 
        v-model="isUpdateBirthdayShow" 
        position="bottom" 
      >
				<update-birthday
					v-model="user.birthday"
					@close="isUpdateBirthdayShow = false"
				></update-birthday>
      </van-popup>
      <!-- /编辑生日 -->

			<!-- 编辑头像 -->
      <van-popup 
        v-model="isUpdatePhotoShow" 
        position="bottom" 
				:style="{ height: '100%' }"
      >
				<update-photo
					:img="img"
					@close="isUpdatePhotoShow = false"
					@update-photo="user.photo = $event"
				></update-photo>
      </van-popup>
      <!-- /编辑头像 -->
  </div>
</template>


<script>
import {getUserProfile} from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
import UpdatePhoto from './components/update-photos.vue'
export default {
    name: 'UserProfile',
    components: {
        UpdateName,
				UpdateGender,
				UpdateBirthday,
				UpdatePhoto
    },
    props: {},
    data () {
        return {
            user: {},
            isUpdateNameShow: false,
						isUpdateGenderShow: false,
						isUpdateBirthdayShow: false,
						isUpdatePhotoShow: false,
						img: null // 预览图片
        }
    },
    computed: {},
    watch: {},
    created () {
        this.loadUserProfile()
    },
    mounted () {},
    methods: {
			async loadUserProfile() {
					try {
							const {data} = await getUserProfile()
							this.user = data.data
							console.log(data);
					} catch (err) {
							this.$toast('获取数据失败')
					}
			},
			onFileChange () {
				// 获取文件对象
				console.log(this.$refs.file.files[0]);
				const file = this.$refs.file.files[0]
				// 基于文章对象获取 blob 数据
				this.img = window.URL.createObjectURL(file)
				
				this.isUpdatePhotoShow = true
				// file-input 如果选了同一个文件不会触发 change 事件
      	// 解决办法就是每次使用完毕，把它的 value 清空
				this.$refs.file.value = ''
			}
    }
}
</script>

<style lang="less" scoped>
.user-profile{
	.avatar{
			width: 60px;
			height: 60px;
	}
	.van-popup{
			background-color: #f5f7f9;
	}
	.photo-cell {
		.van-cell__value {
			display: flex;
			flex-direction: row-reverse;
		}
	}
}
</style>>