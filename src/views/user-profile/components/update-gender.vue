<template>
  <div class="update-gender">
      <van-picker
				title="标题"
				show-toolbar
				:columns="columns"
				:default-index="value"
				@confirm="onConfirm"
				@cancel="onCancel"
				@change="onChange"
			/>
      
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
	name: 'UpdateGender',
	components: {},
	props: {
			value: {
					type: Number,
					required: true
			}
	},
	data () {
			return {
				columns: ['男', '女'],
				locaGender: this.value
			}
	},
	computed: {},
	watch: {},
	created () {},
	mounted () {},
	methods: {
		async onConfirm() {
			const locaGender = this.locaGender
			try {
				await updateUserProfile({
					gender: locaGender
				})
				// 提示成功
				this.$toast('更新成功')
				// 关闭弹窗
				this.$emit('close')
				// 更新视图
				this.$emit('input', locaGender)
			} catch (err) {
				this.$toast('更新失败')
				console.log(err);
			}
    },
    onChange(picker, value, index) {
      this.locaGender = index
    },
    onCancel() {
			this.$emit('close')
    },
	}
}
</script>

<style lang="less" scoped>

</style>>