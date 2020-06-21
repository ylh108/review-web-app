<template>
    <div>
        <div class="no-data">
            暂无评审专家
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
@Component({
    components: {}
})
export default class NoData extends Vue {}
</script>

<style lang="stylus" scoped>
.no-data {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    background: #fff;
    color: #969799;
    padding: 0.1rem;
}
</style>