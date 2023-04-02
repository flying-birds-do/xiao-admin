<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :width="dialogWidth"
    :before-close="handleClose"
    :destroy-on-close="isDestroy"
  >
    <div v-if="titleMessage.length>0" class="title-list">
      <div v-for="(item, index) in titleMessage" :key="index" class="item">
        <span class="label">{{ item.label }}</span>
        <span class="value">{{ item.value }}</span>
      </div>
    </div>
    <slot />
    <span v-if="isShowFooterBtn" slot="footer" class="dialog-footer">
      <el-button
        v-for="(item, index) in footerBtnList"
        :key="index"
        :type="item.buttonType"
        @click="btnHandelClick(item)"
      >{{ item.name }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  /**
   * @param { Boolean } dialogVisible   弹框是否显示
   * @param { String }  dialogTitle     弹框头部信息
   * @param { String }  dialogWidth     弹框头部宽度
   * @param { Array }   titleMessage    顶部信息
   * @param { Array }   footerBtnList   底部按钮列表
   * @param { Boolean } isShowFooterBtn 是否显示底部按钮
   */
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogWidth: {
      type: String,
      default: '1000px'
    },
    titleMessage: {
      type: Array,
      default: () => {
        return []
      }
    },
    footerBtnList: {
      default: () => {
        return [
          { name: '取 消', type: 'cancel', buttonType: '' },
          { name: '确 定', type: 'confirm', buttonType: 'primary' }
        ]
      },
      type: Array
    },
    isShowFooterBtn: {
      default: true,
      type: Boolean
    },
    isDestroy: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      pageSize: [20, 50, 100, 200]
    }
  },
  mounted() {
    console.log(this.title)
    console.log(this.title)
    console.log('9999')
  },
  methods: {
    btnHandelClick(item) {
      this.$emit('btnHandelClick', { item: item })
    },
    handleClose() {
      this.$emit('handleClose')
    }
  }
}
</script>

<style lang='scss' scoped>
:deep.el-dialog__footer {
  text-align: center;
}
:deep.el-dialog {
  display: flex;
  flex-direction: column;
  height: 630px;
  .el-dialog__body {
    flex: 1;
    padding: 24px 40px 0 40px !important;
  }
}

.title-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  .item {
    margin-right: 32px;
    color: #6f7185;
    font-size: 14px;
  }
}
</style>
