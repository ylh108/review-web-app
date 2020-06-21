<template>
    <div class="home">
        <div class="title align-center">评审专家选择</div>
        <div class="header">
            <van-field clearable v-model="data.meetName" name="会议名称" label="会议名称" placeholder="请填写会议名称" />
            <div class="add-clearable">
                <van-field readonly @click-input="startDateClick" v-model="data.startDate.date" name="会议开始时间" label="会议开始时间" placeholder="请填写会议开始时间" />
                <van-icon name="clear" size="40" v-if="data.startDate.date" @click="onStartDateClear" />
            </div>
            <div class="add-clearable">
                <van-field readonly @click-input="endDateClick" v-model="data.endDate.date" name="会议结束时间" label="会议结束时间" placeholder="请填写会议结束时间" />
                <van-icon name="clear" size="40" v-if="data.endDate.date" @click="onEndDateClear" />
            </div>
            <div class="btn">
                <van-row type="flex" justify="center" gutter="20">
                    <van-col span="8" class="align-center">
                        <van-button hairline type="info" size="small" @click="extractClick">手工选择</van-button>
                    </van-col>
                    <van-col span="8" class="align-center">
                        <van-button hairline type="info" size="small" @click="autoExtractClick">自动抽取</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="container">
            <van-row type="flex" gutter="20" class="row head">
                <van-col span="5">姓名</van-col>
                <van-col span="8">部门</van-col>
                <van-col span="7">岗位类别</van-col>
                <van-col span="4" class="operation">操作</van-col>
            </van-row>
            <div class="rows">
                <van-row type="flex" gutter="20" class="row" v-for="(item,index) in data.tableList" :key="index">
                    <van-col span="5">{{item.M_ExpertName}}</van-col>
                    <van-col span="8">{{item.M_ExpertDeptName}}</van-col>
                    <van-col span="7">{{item.M_ExpertPostType | postType}}</van-col>
                    <van-col span="4" class="operation">
                        <van-button hairline type="info" size="mini" @click="onDelete(index)">删除</van-button>
                    </van-col>
                </van-row>
                <no-data v-if="data.noData" />
            </div>
        </div>
        <div class="footer">
            <div class="btn">
                <van-row type="flex" justify="center" gutter="20">
                    <van-col span="8" class="align-center">
                        <van-button hairline type="info" size="small" @click="save">保存</van-button>
                    </van-col>
                    <van-col span="8" class="align-center">
                        <van-button hairline type="info" size="small" @click="close">关闭</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
        <van-popup v-model="data.popup.show" closeable close-icon-position="top-right" position="right" :style="{ width: '100%', height: '100%' }">
            <extract v-if="data.popup.selectType === 0" :isOpen="data.popup.show" :homeTableData="data.tableList" @tableData="getTableData" />
            <auto-extract v-if="data.popup.selectType === 1" :isOpen="data.popup.show" :homeTableData="data.tableList" @tableData="getTableData" />
        </van-popup>
        <van-popup v-if="!data.endDate.isEndDateClear" v-model="data.startDate.show" position="bottom" :style="{ width: '100%' }">
            <van-datetime-picker v-model="data.startDate.currentDate" type="datetime" title="会议开始时间" :min-date="data.startDate.minDate" :max-date="data.startDate.maxDate" @confirm="onConfirm" @cancel="onCancel" />
        </van-popup>
        <van-popup v-if="!data.startDate.isStartDateClear" v-model="data.endDate.show" position="bottom" :style="{ width: '100%' }">
            <van-datetime-picker v-model="data.endDate.currentDate" type="datetime" title="会议结束时间" :min-date="data.endDate.minDate" :max-date="data.endDate.maxDate" @confirm="onConfirm" @cancel="onCancel" />
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import extract from './../extract/index.vue'
import AutoExtract from './../autoExtract/index.vue'
import parseTime from '@/filters/parseTime.ts'
import NoData from '@/common/noData/index.vue'
@Component({
    components: {
        extract,
        AutoExtract,
        NoData
    }
})
export default class Home extends Vue {
    private data: any = {
        tableList: [],
        noData: true,
        popup: {
            show: false,
            selectType: null // 手动：0，自动：1
        },
        startDate: {
            show: false,
            date: null,
            isStartDateClear: false,
            defaultMinDate: new Date(2000, 0, 1),
            defaultMaxDate: new Date(2030, 0, 1),
            minDate: new Date(2000, 0, 1),
            maxDate: new Date(2030, 10, 1),
            currentDate: new Date()
        },
        endDate: {
            show: false,
            date: null,
            isEndDateClear: false,
            defaultMinDate: new Date(2000, 0, 1),
            defaultMaxDate: new Date(2030, 0, 1),
            minDate: new Date(2000, 0, 1),
            maxDate: new Date(2030, 10, 1),
            currentDate: new Date()
        }
    }
    startDateClick() {
        this.data.startDate.show = true
    }
    endDateClick() {
        this.data.endDate.show = true
    }
    onConfirm(value: any) {
        if (this.data.startDate.show) {
            this.data.startDate.show = false
            this.data.startDate.date = parseTime(value, '{y}-{m}-{d} {h}:{i}')
            this.data.endDate.minDate = value
        }
        if (this.data.endDate.show) {
            this.data.endDate.show = false
            this.data.endDate.date = parseTime(value, '{y}-{m}-{d} {h}:{i}')
            this.data.startDate.maxDate = value
        }
    }
    onCancel() {
        if (this.data.startDate.show) {
            this.data.startDate.show = false
        }
        if (this.data.endDate.show) {
            this.data.endDate.show = false
        }
    }
    onStartDateClear() {
        this.data.startDate.date = null
        // 重新初始化结束时间的配置
        this.data.endDate.minDate = this.data.endDate.defaultMinDate
        this.data.startDate.isStartDateClear = true
        this.$nextTick(() => {
            this.data.startDate.isStartDateClear = false
        })
    }
    onEndDateClear() {
        this.data.endDate.date = null
        // 重新初始化开始时间的配置
        this.data.startDate.maxDate = this.data.startDate.maxDate
        this.data.startDate.isStartDateClear = true
        this.$nextTick(() => {
            this.data.startDate.isStartDateClear = false
        })
    }
    extractClick() {
        this.data.popup.selectType = 0
        this.data.popup.show = true
    }
    autoExtractClick() {
        this.data.popup.selectType = 1
        this.data.popup.show = true
    }
    getTableData(data: any) {
        this.data.noData = false
        this.data.popup.show = false
        this.data.tableList = this.data.tableList.concat(data)
        if (!this.data.tableList.length) {
            this.data.noData = true
        }
    }
    onDelete(index: number) {
        this.$dialog
            .confirm({
                title: '',
                message: '确定删除'
            })
            .then((res: any) => {
                this.data.tableList.splice(index, 1)
            })
            .catch(() => {})
    }
    save() {
        if (!this.data.meetName || !this.data.meetName.trim()) {
            this.$notify({ type: 'warning', message: '请填写会议名称' })
            return
        }
        if (!this.data.startDate.date) {
            this.$notify({ type: 'warning', message: '请填写会议开始时间' })
            return
        }
        if (!this.data.endDate.date) {
            this.$notify({ type: 'warning', message: '请填写会议结束时间' })
            return
        }
        if (!this.data.tableList.length) {
            this.$notify({ type: 'warning', message: '请添加评审专家' })
            return
        }
    }
    close() {
        this.$dialog
            .confirm({
                title: '',
                message: '确定关闭'
            })
            .then((res: any) => {
                window.history.back()
            })
            .catch(() => {})
    }
}
</script>

<style lang="stylus" scoped>
.home {
    .container {
        top: 2.2rem;
        bottom: 0.44rem;
    }
}
</style>
