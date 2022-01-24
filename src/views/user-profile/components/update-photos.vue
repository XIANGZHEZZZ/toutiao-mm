<template>
	<div class="update-photo">
		<img class="img" :src="img" ref="img">
		<div class="toolbar">
			<div class="cancel" @click="$emit('close')">取消</div>
			<div class="confirm" @click="onConfirm">确定</div>
		</div>
	</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import {updateUserPhoto} from '@/api/user'
export default {
	name: 'UpdatePhoto',
	components: {},
	props: {
		img: {
			type: [String, Object],
			required: true
		}
	},
	data () {
			return {
				cropper: null
			}
	},
	computed: {},
	watch: {},
	created () {},
	mounted () {
		const image = this.$refs.img // 获取img标签
		console.log(image);
    this.cropper = new Cropper(image, {
      viewMode: 1, // 查看模式 默认是 0 
      dragMode: 'move', // 拖动模式  默认 crop move none 
      aspectRatio: 1, // 截图比例 默认16/9 
      autoCropArea: 1, // 自动截取比例 
      cropBoxMovable: false, // 截图区域是否可以移动
      cropBoxResizable: false, // 截图缩放
      background: false, // 背景颜色
			movable: true // 画布是否可以移动 默认是 true 
    })
		// console.log(cropper);
	},
	methods: {
		onConfirm () {
      // 纯客户端的裁切使用 getCroppedCanvas 获取裁切的文件对象 PC 端不要用
      this.cropper.getCroppedCanvas().toBlob(blob => {
        this.updateUserPhoto(blob)
      })
    },
		async updateUserPhoto (blob) {
			this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
			try {
				// 如果接口要求 Content-Type 是 multipart/form-data
        // 则你必须传递 FormData 对象
        const formData = new FormData()
        formData.append('photo', blob)
				const { data } = await updateUserPhoto(formData)
				
				console.log(data);
				// 提示成功
        this.$toast.success('更新成功')

				// 关闭弹出层
        this.$emit('close')

				// 更新视图
        this.$emit('update-photo', data.data.photo)
			} catch (err) {
				this.$toast.fail('更新失败')
			}
		}
	}
}
</script>

<style lang="less" scoped>
.update-photo{
	background-color: #000;
  height: 100%;
	.img{
		display: block;
		max-width: 100%;
	}
	.toolbar{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
    justify-content: space-between;
		.cancel, .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
	}
}
</style>