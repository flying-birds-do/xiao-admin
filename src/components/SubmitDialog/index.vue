<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :width="width"
    :before-close="handleClose"
  >
    <div class="dialog-warp">
      <el-form ref="form" :modelValue="formKeys" :label-width="labelWidth">
        <el-form-item
          v-for="(item, index) in formList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <el-input
            v-if="item.type === 'commonInput' && !isNoneLimit"
            v-model="formKeys[item.prop]"
            :disabled="item.isDisabled"
            :placeholder="item.placeholder"
            :maxlength="item.maxlength"
            show-word-limit
          />
          <el-input
            v-if="item.type === 'commonInput' && isNoneLimit"
            v-model="formKeys[item.prop]"
            :maxlength="maxlen"
            :disabled="item.isDisabled"
          />
          <el-select
            v-if="item.type === 'commonSelect'"
            v-model="formKeys[item.prop]"
            :disabled="item.isDisabled"
            clearable
            value-key="code"
            :filterable="isReceptObj ? false:true"
            @change="changeFormkeys"
          >
            <template v-if="isReceptObj">
              <el-option
                v-for="optionItem in item.options"
                :key="optionItem.code"
                :label="optionItem.label"
                :value="optionItem.value"
              />
            </template>
            <template v-else>
              <el-option
                v-for="optionItem in item.options"
                :key="optionItem.code"
                :label="optionItem.label"
                :value="optionItem"
              />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <span v-if="isShowFooterBtn" slot="footer" class="dialog-footer">
      <el-button
        v-for="(item, index) in footerBtnList"
        :key="index"
        :type="item.buttonType"
        @click="handelClick(item)"
      >{{ item.name }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  /**
   * @param { Boolean } dialogVisible   弹框是否显示
   * @param { String }  title           提示头部信息
   * @param { String }  width           弹框宽度
   * @param { Object }  formKeys        表单数据
   * @param { String }  labelWidth      label宽度
   * @param { Array }   formList        表单项
   * @param { Array }   footerBtnList   底部按钮列表
   * @param { Boolean } isShowFooterBtn 是否显示底部按钮
   * @param { Boolean } isReceptObj  是否需要返回对象
   * @param { Boolean } isNoneLimit  input是否有字数限制
   */
  props: {
    dialogVisible: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    width: {
      default: '800px',
      type: String
    },
    formKeys: {
      default: null,
      type: Object
    },
    labelWidth: {
      default: '120px',
      type: String
    },
    formList: {
      default: () => {
        return []
      },
      type: Array
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
    isReceptObj: {
      default: true,
      type: Boolean
    },
    isNoneLimit: {
      default: false,
      type: Boolean
    },
    maxlen: {
      default: '',
      type: String
    }
  },
  mounted() {},
  methods: {
    handelClick(item) {
      // console.log(this.formKeys)
      // console.log('9999')
      this.$emit('handelClick', { item: item, formObj: this.formKeys })
    },
    handleClose() {
      this.$emit('handleClose', { formObj: this.formKeys })
    },
    changeFormkeys() {
      this.$forceUpdate()
      this.$emit('changeFormkeys', this.formKeys)
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
  .el-dialog__body {
    flex: 1;
  }
  min-height: 320px;
}
:deep.el-input {
  width: 432px;
}
:deep.el-form-item__content {
    width: 432px;
}
.dialog-warp {
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
</style>
