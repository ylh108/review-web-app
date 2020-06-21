<template>
    <div>
        <div class="loading">
            <van-loading size="0.24rem" vertical>加载中...</van-loading>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class LoadingAbsolute extends Vue {}
</script>

<style lang="stylus" scoped>
.loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background: #fff;
    padding: 0.1rem;
}
</style>