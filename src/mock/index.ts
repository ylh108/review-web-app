import Mock from 'mockjs'
import expertPostType from './expertPostType'
import expertDept from './expertDept'
import expert from './expert'

Mock.mock('/getExpertPostType', 'post', expertPostType)
Mock.mock('/getExpertDept', 'post', expertDept)
Mock.mock('/getExpert', 'post', expert)

export default Mock