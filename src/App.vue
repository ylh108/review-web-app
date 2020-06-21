<template>
    <div id="app">
        <transition name="fade">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
        </transition>
        <transition name="fade">
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
    </div>
</template>

<style lang="stylus">
@import './stylus/index'
@import './stylus/vant'
.clearfix {
    content: '';
    display: block;
    clear: both;
}

.align-left {
    text-align: left;
}

.align-center {
    text-align: center;
}

.align-right {
    text-align: right;
}

html {
    font-size: 625%;
}

body {
    margin: 0;
    font-size: 0.14rem;
}

#app {
    font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin: 0;
    padding: 0;
}

.slide-top-enter-active, .slide-top-leave-active, .slide-bottom-enter-active, .slide-bottom-leave-active, .slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
    will-change: transform;
    transition: all 0s ease-in-out 0s;
    position: absolute;
    background-color: #ffffff;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}

.slide-top-enter {
    transform: translateY(100%);
}

.slide-top-leave-active {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-bottom-enter {
    transform: translateY(100%);
}

.slide-bottom-leave-active {
    transform: translateY(-100%);
    opacity: 0;
}

.slide-left-enter {
    transform: translateX(100%);
}

.slide-left-leave-active {
    transform: translateX(-100%);
    opacity: 0;
}

.slide-right-enter {
    transform: translateX(-100%);
}

.slide-right-leave-active {
    transform: translateX(100%);
    opacity: 0;
}
</style>
