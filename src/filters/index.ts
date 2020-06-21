import Vue from 'vue'
import parseTime from './parseTime'

const postType = (type: string) => {
    switch(type) {
        case '1':  {
            return '规划'
        }
        case '2':  {
            return '建筑方案'
        }
        case '3':  {
            return '建筑施工图'
        }
        case '4':  {
            return '结构施工图'
        }
        case '5':  {
            return '给排水施工图'
        }
        case '6':  {
            return '电气施工图'
        }
        case '7':  {
            return '暖通施工图'
        }
        case '8':  {
            return '岩土'
        }
        case '9':  {
            return '产业化'
        }
        case '10':  {
            return '绿色建筑'
        }
        case '11':  {
            return '市政'
        }
        case '12':  {
            return '幕墙'
        }
        case '13':  {
            return '装修'
        }
        case '14':  {
            return '装修方案'
        }
        case '15':  {
            return '装修施工图'
        }
        case '16':  {
            return '装修软装'
        }
        default: {
            return ''
        }
    }
}

Vue.filter('parseTime', parseTime)
Vue.filter('postType', postType)
