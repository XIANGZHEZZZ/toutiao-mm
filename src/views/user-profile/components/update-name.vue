<template>
  <div class="update-name">
      <van-nav-bar
        left-text="取消"
        right-text="完成"
        title="设置呢称"
        @click-left="$emit('close')"
        @click-right="onProfile"
      />
      <div class="field-warp">
        <van-field
            v-model="locaName"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入呢称"
            show-word-limit
        />
      </div>
      
  </div>
</template>

<script>
import {updateUserProfile} from '@/api/user'
export default {
    name: 'UpdateName',
    components: {},
    props: {
        value: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            locaName: this.value
        }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
			async	onProfile () {
				const locaName = this.locaName
				try {
					if (!locaName.length) {
						this.$toast('呢称不能为空')
						return 
					}
					await updateUserProfile({
						name: locaName
					})
					// 提示成功
					this.$toast('更新成功')
					// 关闭弹窗
					this.$emit('close')
					// 更新视图
					this.$emit('input', locaName)
				} catch (err) {
					this.$toast('更新失败')
					console.log(err);
				}
			  
			}
			
    }
}
</script>

<style lang="less" scoped>
.update-name{
    .field-warp{
        padding: 20px;
    }
}
</style>>