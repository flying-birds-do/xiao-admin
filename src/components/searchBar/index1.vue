<template>
  <blockquote>
    <section class="search-bar-wrap" :style="{ height: defaultHeight }">
      <el-row class style="margin-left: -10px; margin-right: -10px">
        <el-form
          ref="conditions"
          :inline="true"
          :rules="rulesFn"
          :model="conditions"
          size="small"
          label-position="right"
          class="rule-form-schame"
        >
          <!-- <div style="overflow:hidden;" :style="{ height: defaultHeight }"> -->
          <el-col
            v-for="(k, index) in searchList"
            :key="index"
            :span="k.colSpan || colSpan"
            style="padding-left: 10px; padding-right: 10px"
          >
            <el-form-item
              :label="k.label"
              :prop="k.prop"
              style="width: 100%"
              :label-width="k.labelWidth || '100px'"
            >
              <el-input
                v-if="k.type === 'input'"
                v-model="conditions[k.prop]"
                :placeholder="k.props.placeholder"
              />
              <!--type：类型；filterable：是否可搜索； -->
              <el-select
                v-if="k.type === 'select'"
                v-model="conditions[k.prop]"
                clearable
                :placeholder="k.props.placeholder"
                :filterable="false || k.filterable"
                @change="(val) => changeFunc(val, k)"
              >
                <el-option
                  v-for="(i, item) in k.props.list"
                  :key="item"
                  :label="i.label"
                  :value="i.value"
                  :disabled="false || i.disabled"
                />
              </el-select>
              <el-select
                v-if="k.type === 'retrievalSelect'"
                v-model="conditions[k.prop]"
                filterable
                clearable
                remote
                :placeholder="k.props.placeholder"
                :remote-method="k.props.handler"
                :filter-method="
                  (value) => {
                    retrievalSelectFilter(value, k);
                  }
                "
                @clear="handeleClear(k)"
                @blur="handleBlur(k)"
                @change="(val) => changeFunc(val, k)"
              >
                <el-option
                  v-for="(n, item) in k.list"
                  :key="item"
                  :label="n.label"
                  :value="n.value"
                />
              </el-select>
              <el-autocomplete
                v-if="k.type === 'searchAsync'"
                v-model="conditions[k.prop]"
                :fetch-suggestions="k.props.handler"
                :select-when-unmatched="isSelectAsync"
                :placeholder="k.props.placeholder"
                @select="handleSelectAsync"
              />
              <el-date-picker
                v-if="k.type === 'dateChoose'"
                v-model="conditions[k.prop]"
                size="small"
                type="date"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                placeholder="选择日期"
              />
              <el-date-picker
                v-if="k.type === 'datePicker'"
                v-model="conditions[k.prop]"
                type="daterange"
                value-format="yyyy-MM-dd"
                format="yyyy-MM-dd"
                range-separator="-"
                validate-event
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :style="{ width: '500px !important' }"
              />
              <el-date-picker
                v-if="k.type === 'datetimerange'"
                v-model="conditions[k.prop]"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                size="small"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="dateChange"
              />
              <el-cascader
                v-if="k.type === 'cascader'"
                v-model="conditions[k.prop]"
                :options="k.props.list"
                :clearable="k.props.clearable"
                :props="k.props.valueType"
                @change="cascaderChange"
              />
              <!-- <MultiSelect
                v-if="k.type === 'multiSelect'"
                ref="multiRef"
                v-model="conditions[k.prop]"
                :str-key="k.strKey"
                :str-value="k.props.strValue"
                :check-list="k.props.list"
                :selected-list="k.props.selectedList"
                @multiConfirm="multiConfirm"
              /> -->
            </el-form-item>
          </el-col>
          <el-form-item class="el-form-item_search_buttons">
            <el-button
              v-if="isQuery"
              v-permission="permission"
              size="mini"
              type="primary"
              style="width: 88px; margin-right: 16px"
              @click="submitQuery('conditions')"
            >查询</el-button>
            <el-button
              v-if="isReset"
              size="mini"
              type="default"
              style="margin-left: 0px; width: 88px; margin-right: 16px"
              @click="resetHandle('conditions')"
            >重置</el-button>
            <span v-if="isExpand">
              <el-button
                v-if="isCanExpand"
                type="text"
                size="mini"
                style="color: rgb(67, 121, 240)"
                @click="expandAll"
              >
                展开
                <i
                  class="el-icon-arrow-down"
                  style="display: inline-block; margin-left: 0px"
                />
              </el-button>
              <el-button
                v-if="!isCanExpand"
                type="text"
                size="mini"
                style="color: rgb(67, 121, 240)"
                @click="closeAll"
              >
                收起
                <i
                  class="el-icon-arrow-up"
                  style="display: inline-block; margin-left: 0px"
                />
              </el-button>
            </span>

            <slot name="otherBtn" />
          </el-form-item>
        </el-form>
      </el-row>
    </section>
    <div class="grey-line" />
  </blockquote>
</template>
<style scoped>
/deep/ .el-form-item .el-form-item__content {
  flex: 1;
  overflow: hidden;
}
/deep/ .rule-form-schame .el-input--small,
/deep/ .rule-form-schame .el-cascader--small,
/deep/ .rule-form-schame .el-form-item__content,
/deep/ .rule-form-schame .el-select--small {
  width: 100%;
  /* width: 162px; */
}
</style>
<style lang='scss' scoped>
.search-bar-wrap {
  background: #fff;
  padding: 20px 32px 4px 32px;
  overflow: hidden;
  .el-form-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
}
.el-form-item_search_buttons {
  float: right;
  text-align: center;
  margin-top: 0px !important;
  ::v-deep.el-button + .el-button {
    margin-left: 16px;
  }
}
::v-deep.el-date-editor--daterange.el-input__inner {
  width: 225px;
}
::v-deep .el-input__inner{
  width:100%;
}
</style>
<script>
// import Bus from '@/utils/bus'
// import MultiSelect from '../multiSelect'
export default {
  components: {
    // MultiSelect
  },
  props: {
    // 查询按钮权限
    permission: {
      type: Array,
      default: null
    },
    // 传入数据
    searchConditions: {
      type: Array,
      default: null
    },
    // 是否显示查询按钮
    isQuery: {
      type: Boolean,
      default: true
    },
    // 是否显示重置按钮
    isReset: {
      type: Boolean,
      default: true
    },
    isExpand: {
      // 是否需要展开收起——true需要  false不需要
      type: Boolean,
      default: true
    },
    defaultExpand: {
      // 默认状态——true展开  false收起
      type: Boolean,
      default: true
    },
    autoCompleteData: {
      type: Array,
      default() {
        return []
      }
    },
    // isSelect: {
    //   // 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件
    //   type: Boolean,
    //   default: false
    // },
    isSelectAsync: {
      // 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件
      type: Boolean,
      default: false
    },
    // searchAsyncData: {
    //   type: Array,
    //   default() {
    //     return []
    //   } // 要求数据结构为[{label:'',value:'',...}] 判断根据value字段的值进行判断
    // },
    // el-col :span 间距 默认6
    colSpan: {
      type: Number,
      default: 6
    },
    // rowNum 一行几个查询框，如果要
    rowNum: {
      type: Number,
      default: 3
    },
    cascaderData: {
      type: Array,
      default: () => []
    },
    isResetFields: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      defaultHeight: '73px',
      isCanExpand: true,
      ownUserList: [],
      conditions: {}, // 表单key
      rulesList: {}, // rules校验
      searchList: [],
      options: [],
      size: 25,
      loadStatus: false,
      rowNumClone: 1
    }
  },
  computed: {
    // 取到表单对应的key
    // 表单rules校验是否必传
    rulesFn() {
      let key = {}
      let rulesData = this.searchConditions.reduce((map, i) => {
        if (i.rules) {
          map[i.prop] = i.rules
        }
        key[i.prop] = (i.defaultValue && i.defaultValue) || ''
        return map
      }, {})
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.conditions = key
      return rulesData
    }
  },
  created() {
    this.rowNumClone = this.rowNum
    if (this.defaultExpand || !this.isExpand) {
      this.defaultHeight = 'auto'
      this.isCanExpand = true
    }
    this.geta()
  },
  mounted() {
    // Bus.$on('multiConfirm', ({ key = '', value = '' }) => {
    //   this.conditions[key] = value
    // })
  },
  methods: {
    handeleClear(k) {
      this.$emit('handeleClear', k)
    },
    // 失去焦点时触发
    handleBlur(k) {
      this.$emit('handleBlur', k)
    },
    handleFocus(_event, t) {
      this.conditions[t.prop] = ''
      this.ownUserList = []
      // this.loadStatus = true;
      // select 获取焦点时，重置参数
      this.ajaxGetInfo(this.size, t)
    },
    expandAll() {
      this.isCanExpand = !this.isCanExpand
      this.defaultHeight = 'auto'
      this.rowNumClone = this.searchConditions.length
      this.geta()
    },
    closeAll() {
      this.isCanExpand = !this.isCanExpand
      this.defaultHeight = '73px'
      this.rowNumClone = this.rowNum
      this.geta()
    },

    // 查询筛选内容
    // 查询内容传给组件调用者，进行列表查询
    // 将数据改为二维数组，方便页面展示
    geta() {
      let arrlist = this.searchConditions
      let imglist = []
      for (let i = 0, len = arrlist.length; i < len; i += this.rowNumClone) {
        imglist.push(arrlist.slice(i, i + this.rowNumClone))
      }
      this.searchList = imglist[0] ?? []
    },
    dateChange(val) {
      this.$emit('dateChange', val)
    },
    // 提交查询数据
    submitQuery(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('screenChange', this.conditions) // 回传函数
          localStorage.setItem('emptyType', '')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 重置表单
    resetCheck() {
      this.$refs?.multiRef?.forEach((item) => item.handleCheckAllChange(false))
    },
    resetHandle(formName) {
      this.resetCheck()
      if (this.isResetFields) {
        this.$refs[formName].resetFields()
      } else {
        this.conditions = {}
      }
      this.$emit('resetChange', this.conditions)
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect(item) {
      this.$emit('selectItem', item)
    },
    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },

    handleSelectAsync(params) {
      this.$emit('searchItemAsync', params)
    },
    // change事件
    emitFunc(newVal) {
      this.$emit('selectVal', newVal)
    },
    changeFunc(val, k) {
      this.$emit('changeFunc', { val: val, type: k.prop })
    },
    retrievalSelectFilter(value, t) {
      this.$emit('retrievalSelectFilter', { value: value, type: t.prop })
      // this.conditions[t.prop] = value;
      //   this.retrievalSelectChange(t);
    },
    cascaderChange(e) {
      this.$emit('cascaderChange', e)
    },
    multiConfirm(val, type) {
      // this.$emit('multiSelectChange', val)
    }
  }
}
</script>
