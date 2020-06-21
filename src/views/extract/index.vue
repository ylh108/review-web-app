<template>
    <div class="extract">
        <div class="title align-center">评审专家选择</div>
        <div class="header">
            <div class="add-clearable">
                <van-field readonly @click="typeClick" v-model="data.typesSelected.M_ExpertPostTypeName" name="岗位类别" label="岗位类别" placeholder="请填写岗位类别" />
                <van-icon name="clear" size="40" v-if="data.typesSelected.M_ExpertPostTypeName" @click="onTypesSelectedClear" />
            </div>
            <div class="add-clearable">
                <van-field readonly @click="deptClick" v-model="data.deptSelected.M_ExpertDeptName" name="部门" label="部门" placeholder="请填写部门" />
                <van-icon name="clear" size="40" v-if="data.deptSelected.M_ExpertDeptName" @click="onDeptSelectedClear" />
            </div>
            <slot name="peopleCount" />
            <div class="btn">
                <van-row type="flex" justify="center" gutter="20">
                    <van-col span="8" class="align-center">
                        <van-button hairline type="info" size="small" @click="query">查询</van-button>
                    </van-col>
                    <van-col span="8" class="align-center">
                        <van-button hairline type="info" size="small" @click="submit">确定</van-button>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="container">
            <van-row type="flex" gutter="20" class="row head">
                <van-col span="3">
                    <van-checkbox @change="onToggleChange" v-model="data.toggle" :disabled="!data.tableList.length" class="flex-center" name="toggleAll" shape="square" icon-size="17"></van-checkbox>
                </van-col>
                <van-col span="6">姓名</van-col>
                <van-col span="8">部门</van-col>
                <van-col span="7">岗位类别</van-col>
            </van-row>
            <div class="rows">
                <van-checkbox-group class="table-loading" v-model="data.checkedRows" ref="checkboxGroup" @change="onCheckboxChange">
                    <van-cell-group>
                        <van-row type="flex" gutter="20" class="row" v-for="(item,index) in data.tableList" :key="index">
                            <template>
                                <van-col span="3">
                                    <van-checkbox ref="checkboxes" class="flex-center" :name="item" shape="square" icon-size="17"></van-checkbox>
                                </van-col>
                                <van-col span="6">{{item.M_ExpertName}}</van-col>
                                <van-col span="8">{{item.M_ExpertDeptName}}</van-col>
                                <van-col span="7">{{item.M_ExpertPostType | postType}}</van-col>
                            </template>
                        </van-row>
                    </van-cell-group>
                </van-checkbox-group>
                <loading-absolute v-if="data.absLoading" />
                <no-data v-if="data.noData" />
            </div>
        </div>
        <van-popup v-model="data.show" position="bottom" :style="{ width: '100%' }">
            <van-picker v-if="data.state === 1" show-toolbar value-key="M_ExpertPostTypeName" :columns="data.types" title="岗位类别" @confirm="onTypeConfirm" @cancel="onCancel" />
            <van-picker v-if="data.state === 2" show-toolbar value-key="M_ExpertDeptName" :columns="data.dept" title="部门" @confirm="onDeptConfirm" @cancel="onCancel" />
        </van-popup>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getExpert, getExpertDept, getExpertPostType } from '@/api/index.ts'
import LoadingAbsolute from '@/common/loadingAbsolute/index.vue'
import NoData from '@/common/noData/index.vue'
@Component({
    components: {
        LoadingAbsolute,
        NoData
    }
})
export default class Extract extends Vue {
    @Prop() private isOpen!: Boolean
    @Prop() private homeTableData!: any
    @Prop() private isRandom!: Boolean
    @Prop() private peopleCount!: any
    @Watch('isOpen')
    getIsOpen(isOpen: any) {
        if (isOpen) {
            this.onResetData()
            this.getExpertPostType()
            this.getExpertDept()
            this.onCheckboxChange(this.data.checkedRows)
        }
    }
    private data: any = {
        absLoading: false,
        show: false,
        state: 0,
        typesSelected: {},
        deptSelected: {},
        types: [],
        dept: [],
        tableList: [],
        noData: true,
        toggle: false,
        checkedRows: []
    }
    typeClick() {
        this.data.state = 1
        this.data.show = true
    }
    deptClick() {
        this.data.state = 2
        this.data.show = true
    }
    onTypeConfirm(item: any) {
        this.data.typesSelected = item
        this.data.show = false
    }
    onDeptConfirm(item: any) {
        this.data.deptSelected = item
        this.data.show = false
    }
    onCancel() {
        this.data.show = false
    }
    onCheckboxChange(rows: any) {
        if (rows.length && rows.length === this.data.tableList.length) {
            this.data.toggle = true
        } else if (!rows.length) {
            this.data.toggle = false
        }
        this.setToggle()
    }
    setToggle() {
        let checkIndexs = []
        let tableList = this.data.tableList
        let checkedRows = JSON.parse(JSON.stringify(this.data.checkedRows))
        if(checkedRows.length < this.data.tableList.length) {
            this.data.toggle = false
            for(let item of checkedRows) {
                for(let index in tableList) {
                    if(item.M_ID === tableList[index].M_ID) {
                        checkIndexs.push(index)
                    }
                }
            }
            for(let index of checkIndexs){
                (this.$refs.checkboxes as any)[index].toggle(true)
            }
        }
    }
    onToggleChange(val: any) {
        ;(this.$refs.checkboxGroup as any).toggleAll(val)
    }
    getRandomData(tableList: any) {
        let index = (Math.random() * tableList.length) | 0
        this.data.randomObj.push(index)
        this.data.randomObj = [...new Set(this.data.randomObj)]
        if(this.data.randomObj.length < parseInt(this.peopleCount)) {
            this.getRandomData(tableList)
        }
    }
    query() {
        if(this.data.absLoading) {
            return
        }
        let data: any = {}
        if(this.isRandom) { // 如果是随机抽取
            this.data.randomObj = []
            if(!this.peopleCount || this.peopleCount === '0') {
                this.$notify({
                    type: 'warning',
                    message: '请填写要抽取人数'
                })
                return
            }
        }
        this.data.checkedRows = []
        this.data.tableList = []
        this.data.toggle = false
        this.data.noData = false
        this.data.absLoading = true
        data.post = this.data.typesSelected.M_ExpertPostType
        data.dept = this.data.deptSelected.M_ExpertDept
        ;(this as any).$axios.post('/getExpert').then((res: any) => {
        // getExpert(data).then((res: any) => {
            let that = this
            this.data.absLoading = false
            if (res.status === 200) {
                // let dataList = res.data.data || []
                let dataList = res.data || []
                let homeTableData = this.homeTableData
                let tableList = dataList.filter((item: any) => !homeTableData.some((data:any) => data.M_ID === item.M_ID))
                if(this.isRandom) {
                    if(this.peopleCount > tableList.length) {
                        this.$notify({
                            type: 'warning',
                            message: `抽取人数大于总数,请填写不大于${tableList.length} 的抽取人数`
                        })
                        return
                    }
                    this.getRandomData(tableList)
                    for(let index of this.data.randomObj) {
                        this.data.tableList.push(tableList[index])
                    }
                } else {
                    this.data.tableList = tableList
                }
                if(!this.data.tableList.length) {
                    this.data.noData = true
                }
            }
        })
    }
    submit() {
        if (!this.data.checkedRows.length) {
            this.$notify({ type: 'warning', message: '至少选择一个评审专家' })
            return
        }
        let checkedRows = JSON.parse(JSON.stringify(this.data.checkedRows))
        this.$emit('tableData', checkedRows)
    }
    getExpertPostType() {
        ;(this as any).$axios.post('/getExpertPostType').then((res: any) => {
            if (res.status === 200) {
                this.data.types = res.data
            }
        })
    }
    getExpertDept() {
        ;(this as any).$axios.post('/getExpertDept').then((res: any) => {
        // getExpertDept().then((res: any) => {
            if (res.status === 200) {
                // this.data.dept = res.data.data || []
                this.data.dept = res.data || []
            }
        })
    }
    onTypesSelectedClear() {
        this.data.typesSelected = {}
    }
    onDeptSelectedClear() {
        this.data.deptSelected = {}
    }
    onResetData() {
        if(this.isRandom) {
            this.peopleCount = null
        }
        this.data = {
            absLoading: false,
            show: false,
            state: 0,
            typesSelected: {},
            deptSelected: {},
            types: [],
            dept: [],
            tableList: [],
            toggle: false,
            checkedRows: []
        }
    }
    mounted() {
        this.getExpertPostType()
        this.getExpertDept()
    }
}
</script>

<style lang="stylus" scoped></style>
