<template>
    <div class="auto-extract">
        <extract @tableData="getTableData" :isOpen="isOpen" :homeTableData="homeTableData" :peopleCount="data.peopleCount" isRandom="true">
            <div slot="peopleCount">
                <van-field clearable v-model="data.peopleCount" type="digit" name="抽取人数" label="抽取人数" placeholder="请填写抽取人数" />
            </div>
        </extract>
    </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Extract from './../extract/index.vue'
@Component({
    components: {
        Extract
    }
})
export default class AutoExtract extends Vue {
    @Prop() private isOpen!: Boolean
    @Prop() private homeTableData!: any
    @Watch('isOpen')
    getIsOpen(isOpen: any) {
        if (isOpen) {
            this.onResetData()
        }
    }
    private data: any = {
        peopleCount: null
    }
    getTableData(val: any) {
        this.$emit('tableData', val)
    }
    onResetData() {
        this.data.peopleCount = null
    }
}
</script>

<style lang="stylus" >
.auto-extract {
    .header {
        height: 2.2rem;
    }

    .container {
        top: 2.2rem;
    }
}
</style>