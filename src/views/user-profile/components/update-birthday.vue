<template>
  <div class="update-birthday">
    <van-datetime-picker
			v-model="currentDate"
			type="date"
			title="选择年月日"
			:min-date="minDate"
			:max-date="maxDate"
			@cancel="onCancel"
			@confirm="onConfirm"
		/>
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
import dayjs from 'dayjs'
export default {
	name: 'UpdateBirthday',
	components: {},
	props: {
		value: {
			type: String,
			required: true
		}
	},
	data () {
			return {
				minDate: new Date(1970, 0, 1),
				maxDate: new Date(),
				currentDate: new Date(this.value),

			}
	},
	computed: {},
	watch: {},
	created () {},
	mounted () {},
	methods: {
		onCancel() {
			this.$emit('close')
    },
		async onConfirm() {
			try {
				const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
				await updateUserProfile({
					birthday: currentDate
				})
				// 提示成功
				this.$toast('更新成功')
				// 关闭弹窗
				this.$emit('close')
				// 更新视图
				this.$emit('input', currentDate)
			} catch (err) {
				this.$toast('更新失败')
				console.log(err);
			}
    },
		
	}
}
</script>

<style lang="less" scoped>

</style>>