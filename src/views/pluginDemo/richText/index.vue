// 封装组件
<template>
  <div className="tinymce-boxz">
    <Editor v-model="content" :api-key="apiKey" :init="init"/>
  </div>
</template>

<script lang="ts">
import Editor from "@tinymce/tinymce-vue";
import {reactive, ref, toRefs, watchEffect} from "vue";

export default {
  name: "Tinymce",
  components: {
    Editor,
  },
  props: {
    //默认值
    value: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {

    const content = ref(props.value);
    const tiny = reactive({
      apiKey: "qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc", //https://github.com/tinymce/tinymce-vue/blob/main/src/demo/views/Iframe.vue
      init: {
        language: "zh_CN", //语言类型
        placeholder: "在这里输入文字", //textarea中的提示信息
        min_width: 320,
        min_height: 220,
        height: 500, //注：引入autoresize插件时，此属性失效
        resize: "both", //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
        branding: false, //tiny技术支持信息是否显示
        // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
        // elementpath: false, //元素路径是否显示

        font_formats:
            "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;", //字体样式
        plugins:
            "print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons", //插件配置 axupimgs indent2em
        toolbar: [
          "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ",
          "styleselect formatselect fontselect fontsizeselect |  table image axupimgs media emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print preview | indent2em lineheight formatpainter",
        ], //工具栏配置，设为false则隐藏
        // menubar: "file edit my1", //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

        // images_upload_url: '/apib/api-upload/uploadimg',  //后端处理程序的url，建议直接自定义上传函数image_upload_handler，这个就可以不用了
        // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
        paste_data_images: true, //图片是否可粘贴
        //此处为图片上传处理函数
     
        file_picker_types: "file image media", //file image media分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
      },
    });

    //内容有变化，就更新内容，将值返回给父组件
    watchEffect(() => {
      context.emit("update:value", content.value);
    });

    return {
      content,
      ...toRefs(tiny),
    };
  },
};
</script>

<style scoped>
.tinymce-boxz > textarea {
  display: none;
}
</style>
<style>
/* 隐藏apikey没有绑定这个域名的提示 */
.tox-notifications-container .tox-notification--warning {
  display: none !important;
}

.tox.tox-tinymce {
  max-width: 100%;
}
</style>



