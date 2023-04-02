<template>
  <div class="img-upload">
    <!-- :http-request="handleRequest" -->
    <el-upload
      v-if="showUpload"
      :action="uploadUrl"
      list-type="picture-card"
      :before-upload="handleBeforeUpload"
      :on-preview="handlePreview"
      :on-success="handleSuccess"
      multiple
      :file-list="fileList"
      :limit="limit"
      :on-exceed="handleExceed"
      :on-remove="handleRemove"
      :data="uploadData"
      name="files"
      :headers="{ secret }"
      v-bind="{ ...$attrs, ...$props }"
      v-on="$listeners"
    >
      <i slot="default" class="el-icon-plus" />
      <div slot="tip" class="el-upload__tip">{{ tipMsg }}</div>
    </el-upload>
    <ul v-else class="pic-list">
      <li v-for="(i, index) in fileList" :key="index">
        <div class="masker">
          <i class="el-icon-zoom-in preview-btn" @click="handlePreview(i)" />
          <i
            v-if="showDelete"
            class="el-icon-delete delete-icon"
            @click="deleteImg(i, index)"
          />
        </div>
        <img :src="i.url">
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * fileList: 上传的文件列表，例如： [{name: 'food.jpg', url: 'https://xxx.cdn.com/xxx.jpg'}]
 * 回显图片列表 只需要传回fileList列表
 */
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import Vue from 'vue'
import { getSecreteInfo } from '@/api/upload.js'
import Secret from '@/utils/secret.js'
import * as imageConversion from 'image-conversion'
Vue.use(VueViewer)
export default {
  props: {
    limit: {
      type: Number,
      default: 3
    },
    // 单位为 M  默认3M
    limitSize: {
      type: Number,
      default: 3
    },
    fileList: {
      type: Array,
      default: function() {
        return []
      }
    },
    tipMsg: {
      type: String,
      default: function() {
        return '只能上传jpg/png文件，且不超过500kb'
      }
    },
    // 零售的key 默认为 retail
    appKey: {
      type: String,
      default: function() {
        return 'retail'
      }
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    // 详情 是否可以删除
    showDelete: {
      type: Boolean,
      default: false
    },
    permission: {
      // 1公有 2私有
      type: Number,
      default: 1
    },
    // newName 重命名文件名
    newName: {
      type: String,
      default: ''
    },
    // 否保持原始文件名，true:是，false:否
    keepName: {
      type: Boolean,
      default: false
    },
    // 水印文字
    watermarkText: {
      type: String,
      default: ''
    }
    // getSecret: {
    //   // 获取秘钥的api方法
    //   type: Function,
    //   default: function() {}
    // }
  },
  data() {
    return {
      previewList: [],
      secret: '' // 秘钥
    }
  },
  computed: {
    uploadData() {
      return {
        permission: this.permission,
        newName: this.newName,
        keepName: this.keepName,
        watermarkText: this.watermarkText
      }
    },
    uploadUrl() {
      const env = process.env.VUE_APP_BASE_API
      return `${env}/lepu-resource/api/resource/upload/v1/imgUpload`
    }
  },
  watch: {
    fileList: {
      handler(value) {
        this.previewList = value
      },
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.previewList = this.fileList
    }, 500)
  },
  methods: {
    // 上传之前钩子
    handleBeforeUpload(file) {
      const type =
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg' ||
        file.type === 'image/png'
      const isLtLimitSize = file.size / 1024 / 1024 < this.limitSize
      if (!type) {
        this.$message.error('上传图片仅支持.jpg .jpeg .png格式')
        return Promise.reject()
      }
      if (!isLtLimitSize) {
        this.$message.error(`上传图片大小不超过${this.limitSize}M的图片`)
        return Promise.reject()
      }
      return new Promise((resolve) => {
        // 压缩到100KB,这里的100就是要压缩的大小,可自定义
        imageConversion.compress(file, 0.6).then(async(res) => {
          await this.getSecret()
          resolve(res)
        })
      })
    },
    // 上传成功钩子
    handleSuccess(response, file, fileList) {
      if (response.code === 10000) {
        const image = {
          ...response.data.items[0],
          uid: file.uid,
          url: file.url,
          imageUrl: file.url
        }
        this.$emit('uploadSuccess', image)
        this.fileList.push(image)
        this.$emit('update:fileList', this.fileList)
      } else {
        this.$message.error('上传失败')
      }
      this.previewList = fileList
    },
    // 预览
    handlePreview(file) {
      let urlIndex = this.previewList.findIndex((item) =>
        item.uid ? item.uid === file.uid : item.id === file.id
      )
      this.$viewerApi({
        options: {
          initialViewIndex: urlIndex > -1 ? urlIndex : 0
        },
        images: this.previewList.map((item) => item.url)
      })
    },
    // 获取密钥
    async getSecret() {
      // 先从缓存里取
      const secretInstance = new Secret(this.appKey)
      // this.secret = secretInstance.get()
      if (this.secret) return
      const { data, msg, code } = await getSecreteInfo(this.appKey)
      if (code === 10000) {
        this.secret = data.secret
        // expireDate
        secretInstance.set(this.secret)
      } else {
        this.$message.error(msg)
      }
    },
    // 文件超出个数限制时的钩子函数
    handleExceed() {
      this.$message.error(`最多上传${this.limit}张`)
    },
    handleRemove(file, fileList) {
      this.$emit('update:fileList', fileList)
      this.$emit('uploadRemove', file, fileList)
    },
    // 纯展示删除
    deleteImg(file, index) {
      // successCallback
      this.$emit('deleteImg', file, () => {
        this.fileList.splice(index, 1)
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.img-upload {
  margin-top: 8px;
}
.el-upload-list__item-status-label {
  display: none !important;
}
.el-upload--picture-card {
  width: 104px;
  height: 104px;
  line-height: 104px;
}
.el-upload {
  &:hover {
    border-color: #409eff;
  }
}
.el-upload-list--picture-card {
  .el-progress {
    width: 94px;
    .el-progress-circle {
      width: 94px !important;
      height: 94px !important;
    }
  }
  .el-upload-list__item {
    width: 104px;
    height: 104px;
  }
}
.pic-list {
  li {
    width: 104px;
    height: 104px;
    line-height: 104px;
    border-radius: 6px;
    position: relative;
    float: left;
    margin: 0 8px 8px 0;
    border: 1px solid #c0ccda;
    &:hover {
      .masker {
        display: block;
      }
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    .masker {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      color: #fff;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      .delete-icon {
        margin-left: 10px;
      }
    }
  }
}
.viewer-container {
  top: $topBarHeight !important;
  // 解决dialog z-index自增的bug
  z-index: 10015 !important;
}
</style>
