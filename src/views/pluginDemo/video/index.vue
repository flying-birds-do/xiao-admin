<template>
    <div class="videoPlay">
        <video ref="m3u8_video" class="video-js vjs-default-skin vjs-big-play-centered" controls>
            <source :src="path" />
        </video>
    </div>
</template>
<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import videojs, { VideoJsPlayer } from 'video.js'
import 'video.js/dist/video-js.css'
import zh from "video.js/dist/lang/zh-CN.json"
const props = withDefaults(defineProps<{
    path: string;
    autoPlay?: boolean;
}>(), { autoPlay: false })
const m3u8_video = ref()
let player: VideoJsPlayer
const initPlay = async () => {

    videojs.addLanguage('zh-CN',zh)
    await nextTick()
    const options = {
        muted: true,
        controls: true,
        autoplay: props.autoPlay && props.path,
        loop: true,
        language: 'zh-CN',
        techOrder: ["html5"],
    };
    player = videojs(m3u8_video.value, options, () => {
        videojs.log('播放器已经准备好了!');
        if (props.autoPlay && props.path) {
            player.play()
        }
        player.on('ended', () => {
            videojs.log('播放结束了!');
        });
        player.on('error', () => {
            videojs.log('播放器解析出错!');
        })
    });
}
onMounted(() => {
    initPlay()
})
//直接改变路径测试
watch(() => props.path, () => {
    player.pause()
    player.src(props.path)
    player.load()
    if (props.path) {
        player.play()
    }
})
onBeforeUnmount(() => {
    player?.dispose()
})

</script>
<style lang="scss" scoped>
.videoPlay {
    flex: 1;
    height: 1px;

    .video-js {
        height: 100%;
        width: 100%;
    }
}
</style>
