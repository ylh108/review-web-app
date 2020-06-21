# review-web-app 数据字典
接口说明：
1.部门：http://10.10.169.200/System/Mobile/WebUI/PageView/ReviewExportDBHandler.ashx?action=getdeptparams
2.岗位和部门筛选查询：http://10.10.169.200/System/Mobile/WebUI/PageView/ReviewExportDBHandler.ashx?action=searchexpertbyperson&post=&dept=
字段说明：
<root>
    <node text="规划" value="1"></node>
    <node text="建筑方案" value="2"></node>
    <node text="建筑施工图" value="3"></node>
    <node text="结构施工图" value="4"></node>
    <node text="给排水施工图" value="5"></node>
    <node text="电气施工图" value="6"></node>
    <node text="暖通施工图" value="7"></node>
    <node text="岩土" value="8"></node>
    <node text="产业化" value="9"></node>
    <node text="绿色建筑" value="10"></node>
    <node text="市政" value="11"></node>
    <node text="幕墙" value="12"></node>
    <node text="装修" value="13"></node>
    <node text="装修方案" value="14"></node>
    <node text="装修施工图" value="15"></node>
    <node text="装修软装" value="16"></node>
</root>
M_ID（专家维护库主键，字符串）
M_Expert（专家ID（人员id），字符串）
M_ExpertName（专家名称，字符串）
M_ExpertBIP（专家BIP，字符串）
M_ExpertDept（部门ID，字符串）
M_ExpertDeptName（部门名称，字符串）
M_ExpertPostType（岗位类别key，字符串）
M_ExpertPostTypeName（岗位类别名称，字符串）

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
