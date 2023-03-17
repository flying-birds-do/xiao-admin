<template>
  <div>
    <!-- 打印区域容器 -->
    <div id="printBox">
      <span>我就是被打印的内容</span>
      <span>在#printBox 容器里的内容都会被打印噢</span>
      <p v-for="(item,index) in textList" :key="index">{{ item.text }}</p>
    </div>
    <!-- 按钮绑定打印 -->
    <button v-print="print">点击打开打印预览</button>
  </div>
</template>
 
<script lang="ts" setup>

import { reactive, ref } from "vue";
 const textList = reactive([
      {
        text: '没有了光，就没有雨后的彩虹；假如我是彩蓝天，那么，你就是阳光；是的，有了你，我的生活才会五彩缤纷！',
        id:'1'
      },
       {
        text: '不必慌张，活好当下，来日方长；不必失望，人间值得，未来可期。',
        id:'2'
      },
       {
        text: ' 我不好，但只有一个。珍惜也好，不珍惜也罢。如果哪天你把我弄丢了，我不再让你找到我。友情也好，爱情也罢。我若离去，后会无期。',
        id:'3'
      },
       {
        text: ' 没有什么是永远，也没有什么会很久，找个借口，谁都可以先走。那些被你所遗忘的时光，逐渐长成了一根刺，深深地扎进我的心里。',
        id:'4'
      },
         {
        text: '我爱你，没有带着什么目的，只是爱你。一辈子，我想做一次真正的自己。这一次，我想给你全世界。',
        id:'5'
      },
      {
        text: '耕耘需要付出，勤劳就是美德。努力拼搏时时刻刻，自强不息年年月月。五一节快乐!亲爱的各族同胞!用智慧开创我们完美的新生活!用奋斗实现我们伟大的中国梦!',
        id:'6'
      },
       {
        text: '兜兜转转终会相遇，念念不忘必有回响，对的人一定会重逢，我会到有你的未来。',
        id:'7'
      },
       {
        text: '几天了，听不到你银铃般的笑声和令人着迷的低诉，我很担心，一种失落感在心中弥漫，不知你怎么了？',
        id:'8'
      },
       {
        text: '允许到达目的地的路途有一些坎坷 允许自己偶尔不开心不聪明 也允许偶尔做得不够好 但不会轻易放弃 时间在走 很多事都会过去都会慢慢变好',
        id:'9'
      },
       {
        text: '我不好，但只有一个。珍惜也好，不珍惜也罢。如果哪天你把我弄丢了，我不再让你找到我。友情也好，爱情也罢。我若离去，后会无期。',
        id:'10'
      },
    ])
//这里是打印的配置项
const print = ref({
  id: 'printBox',//这里的id就是上面我们的打印区域id，实现指哪打哪
  popTitle: '我的小作文', // 打印配置页上方的标题
  extraHead: '', // 最上方的头部文字，附加在head标签上的额外标签，使用逗号分割
  preview: false, // 是否启动预览模式，默认是false
  previewTitle: '预览的标题', // 打印预览的标题
  previewPrintBtnLabel: '预览结束，开始打印', // 打印预览的标题下方的按钮文本，点击可进入打印
  zIndex: 20002, // 预览窗口的z-index，默认是20002，最好比默认值更高
  previewBeforeOpenCallback() { console.log('正在加载预览窗口！'); }, // 预览窗口打开之前的callback
  previewOpenCallback() { console.log('已经加载完预览窗口，预览打开了！') }, // 预览窗口打开时的callback
  beforeOpenCallback() { console.log('开始打印之前！') }, // 开始打印之前的callback
  openCallback() { console.log('执行打印了！') }, // 调用打印时的callback
  closeCallback() { console.log('关闭了打印工具！') }, // 关闭打印的callback(无法区分确认or取消)
  clickMounted() { console.log('点击v-print绑定的按钮了！') },

})
</script>
// 去除打印的页眉页脚
<style media="print">
  @page {
    size: auto;
    margin: 5mm;
  }
 
  /*分页打印 */
  body,
  html {
    height: auto !important;
    font-size: 20px;
  }
  /*设置字体和颜色避免出现字体中空问题 */
  #nbprint {
    font-family: Microsoft YaHei !important;
    color: #000 !important;
  }
</style>