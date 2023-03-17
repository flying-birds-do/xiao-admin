<!-- 测试markdown转html -->
<template>
    <div class="a">v-md-editor预览组件测试：</div>
    <v-md-preview :text="text"></v-md-preview>
     <v-md-preview :text="test"></v-md-preview>
      <v-md-preview :text="test1"></v-md-preview>
</template>

<script setup lang="ts">
    import { ref, reactive, onMounted } from "vue";

    const text = ref(`# 序
        开始预览组件的使用
* 看
* 写
* 运行`)
const test = ref(`## 1. 我的威廉斯`)
const test1 = ref(`let和const是JavaScript里相对较新的变量声明方式。 像我们之前提到过的， let在很多方面与var是相似的，但是可以帮助大家避免在JavaScript里常见一些问题。 const是对let的一个增强，它能阻止对一个变量再次赋值。
因为TypeScript是JavaScript的超集，所以它本身就支持let和const。 下面我们会详细说明这些新的声明方式以及为什么推荐使用它们来代替 var。
如果你之前使用JavaScript时没有特别在意，那么这节内容会唤起你的回忆。 如果你已经对 var声明的怪异之处了如指掌，那么你可以轻松地略过这节。`)
</script>
