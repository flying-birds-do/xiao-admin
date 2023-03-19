<template>
    <div class="video-style">
        <vue3VideoPlay class="vue-video" v-bind="options" :poster='poster' />
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
//视频封面，为空时，会自动获取第一帧作为视频封皮
const poster = ref("");
// 视频配置参数大多都支持props传入
const options = reactive({
    width: '1000px', //播放器高度
    height: '600px', //播放器高度
    color: "#409eff", //主题色
    title: '', //视频名称
    src: '/1.mp4', //视频源，地址可通过传参传入
    muted: false, //静音
    webFullScreen: false,
    speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
    autoPlay: false, //自动播放
    loop: false, //循环播放
    mirror: false, //镜像画面
    ligthOff: false,  //关灯模式
    volume: 0.3, //默认音量大小
    control: false,  //是否显示控制器
})

</script>