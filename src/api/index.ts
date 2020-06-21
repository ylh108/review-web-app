import request from '@/http/index.ts'

// 部门
export function getExpertDept() {
    return request({
        url: "api/System/Mobile/WebUI/PageView/ReviewExportDBHandler.ashx?action=getdeptparams",
        method: 'get'
    })
}
// 岗位类别
export function getExpertPostType(data?: any) {
    return request({
        url: "",
        method: 'get',
        data
    })
}
// 查询
export function getExpert(data: any = {}) {
    return request({
        url: `api/System/Mobile/WebUI/PageView/ReviewExportDBHandler.ashx?action=searchexpertbyperson&post=${data.post || ''}&dept=${data.dept || ''}`,
        method: 'get'
    })
}