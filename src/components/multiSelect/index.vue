<template>
  <div class="select-container">
    <el-popover
      ref="popver"
      v-model="isPopover"
      placement="bottom-start"
      width="200"
      trigger="click"
      class="myaskk"
      popper-class="my-popper"
    >
      <div>
        <!-- 展示下拉列表 -->
        <ul class="list-box">
          <li
            v-for="(item, index) in checkList"
            :key="index"
          >
            <el-checkbox-group
              v-model="item.state"
            >
              <el-checkbox>
                {{ item[strValue] }}
              </el-checkbox>
            </el-checkbox-group>
          </li>
        </ul>
        <!-- 全选确定按钮 -->
        <div v-if="isBottom" class="all-bottom">
          <el-checkbox
            :value="isCheckAll"
            @change="handleCheckAllChange"
          >
            <span :style="{color: isCheckAll? '#4379F0' : ''}">全选</span>
          </el-checkbox>
          <el-button size="mini" color="#FC1616" @click.stop="handelConfirm">确定</el-button>
        </div>
        <slot v-else />
      </div>
      <el-input
        slot="reference"
        ref="input"
        :placeholder="viewSelectedList.length ? '' : '请选择'"
        @focus="handelFocus"
      >
        <i
          slot="suffix"
          :class="[isPopover ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
        />
        <!-- 选中数据展示 -->
        <div
          v-for="(item, index) in viewSelectedList"
          :key="index"
          slot="prefix"
        >
          <el-tag
            v-show="index < 2"
            :hit="false"
            type="info"
            :closable="index < 1"
            @close="tagDelete(item, index)"
          >
            <span v-show="index === 0">{{ item[strValue] }}</span>
            <span v-show="index === 1">{{ viewSelectedList.length >= 1 ? `+${viewSelectedList.length - 1}` : '' }}</span>
          </el-tag>
        </div>
      </el-input>
    </el-popover>
  </div>
</template>
<script>
import Bus from '@/utils/bus'
export default {
  props: {
    strValue: { // 列表 取字段展示
      type: String,
      default: 'name'
    },
    strKey: { // 当前筛选条件的 Key
      type: String,
      default: ''
    },
    checkList: { // 展示列表
      type: Array,
      default: () => []
    },
    selectedList: { // 已选中的数据
      type: Array,
      default: () => []
    },
    isBottom: { // 是否展示全选 确定操作按钮
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isPopover: false // popover 是否可见
    }
  },
  computed: {
    viewSelectedList() { // 已经选中的数据
      return this.checkList?.filter(item => item.state === true)
    },
    isCheckAll() { // 全选按钮 是否选中
      return this.checkList.every(item => item.state === true)
    }
  },
  methods: {
    handelConfirm() { // 确定
      this.$refs.popver.doClose()
      // if (!this.viewSelectedList.length) return
      Bus.$emit('multiConfirm', {
        key: this.strKey,
        value: this.viewSelectedList
      })
    },
    tagDelete(item, i) { // 删除
      item.state = false
    },
    handleCheckAllChange(val) { // 全选
      this.checkList.forEach(item => {
        item.state = val
      })
    },
    handelFocus() { // 主动取消焦点
      this.$refs.input.blur()
    }
  }
}
</script>

<style lang="scss">
.my-popper{
  padding: 0 !important;
}
</style>
<style lang="scss" scoped>
  // 展示列表
  .list-box{
    cursor: pointer;
    background-color: #fff;
    z-index: 100;
    padding-top: 10px;
    li{
      font-size: 14px;
      color: #6F7185;
      line-height: 22px;
      &:hover{
        background-color: #FAFAFA;
      }
    }
  }
  // 列表底部重置确定样式
  .all-bottom {
    display: flex;
    align-items: center;
    border-top: 1px solid #EBECF2;
    padding: 5px 16px;
    justify-content: space-between;
 :deep.el-button--mini{
      padding: 1px 10px;
      color: #fff;
      font-size: 14px;
      line-height: 22px;
      background-color: #FC1616;
      border-radius: 4px;
      border: none;
    }
  }
  .select-container{
    overflow: hidden;
  }
  // element 样式修改
  :deep.el-checkbox-group {
    display: flex;
    align-items: center;
    .el-checkbox{
      width: 100% !important;
      height: 100% !important;
      padding: 5px 16px !important;
    }
  }
  :deep.el-input--small .el-input__inner{
    cursor: pointer;
    position: relative;
  }
  :deep.el-popover{
    padding: 0 !important;
  }
  :deep.el-checkbox__label{
    .is-active{
      color: #4379F0 !important;
    }
  }
  :deep.el-input__prefix{
    display: flex;
    .el-tag--info{
      margin-right: 4px !important;
    }
  }
</style>
