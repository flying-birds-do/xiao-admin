<template>
  <div>
    <div class="copy-content" >
      <p v-for="item in textList" :key="item.id" title="点击复制">
      {{ item.text }}
       <el-button  @click="copyInfo(item.text)" type="primary">点击复制</el-button>
    </p>
     
    </div>
  </div>
</template>
<script lang="ts">
import { ElMessage, ElMessageBox, FormInstance, FormRules, Action } from 'element-plus'
import { reactive } from 'vue'
import useClipboard from 'vue-clipboard3'
export default {
  
  setup() {
    const { toClipboard } = useClipboard()
    const copyInfo = async (info:any) => {
      try {
        await toClipboard(info)
        ElMessage.success('复制成功')
      } catch (e) {
        ElMessage.warning('您的浏览器不支持复制：', e)
      }
    }
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
    return { copyInfo,textList }
  }
}
</script>