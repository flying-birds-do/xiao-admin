<template>
   <section class="table-template-warp">
    <span :class="isFixed ? 'mask-table-fixed':''" />
    <el-table
      :id="scrollable ? tableId : ''"
      ref="multipleTable"
      v-loading="loading"
      :max-height="(!scrollable && dialogHeight) ? dialogHeight : maxHeight"
      :data="tableData"
      :span-method="objectSpanMethod"
      tooltip-effect="dark"
      :cell-class-name="setCellClass"
      :show-summary="isShowSummary"
      :summary-method="getSummaries"
      @selection-change="handleSelectionChange"
      @cell-click="cellJumpHandler"
    >
      <el-table-column v-if="isRadio" label="选择" fixed width="80">
        <template slot-scope="scope">
          <el-radio
            v-model="tableRadio"
            :label="scope?.row"
            @change="changeRadio"
          ><i /></el-radio>
        </template>
      </el-table-column>

      <el-table-column
        v-if="isSelection"
        type="selection"
        fixed
        class="selection"
        column-key="selection"
        width="70"
      />
      <el-table-column v-if="isSingleChoice" width="70" fixed label="选择">
        <template scope="/* eslint-disable */ scope">
          <el-radio
            v-model="radio"
            @change.native.stop="() => handleRadioChange(scope.row)"
            :label="scope.$index + 1"
          ></el-radio>
        </template>
      </el-table-column>
      <!-- isFixed === true 默认向左固定 -->
      <el-table-column
        v-for="(item, index) in tableHeader"
        :key="isStockSearch ? Math.random() : index"
        :prop="item.props"
        :label="item.title"
        :width="item.width"
        :formatter="item.formatter"
        :fixed="item.isFixed ? (item.direction || 'left') : false"
        :show-overflow-tooltip="true"
      >
        <template slot="header" slot-scope="/* eslint-disable */ scope">
          {{ item?.title }}
          <template v-if="item.type === 'sort'">
            <div class="sort-infomation-warp">
              <span class="icon-grey-bg" slot="reference">
                <svg-icon
                  :icon-class="
                    item.props === currentHighSort ? SortIcon : 'icon-sort'
                  "
                />
              </span>
              <el-tooltip
                class="item"
                effect="dark"
                content="调整排序"
                placement="top"
              >
                <span
                  class="show-header-tip"
                  @click="getSortIcon(item.props)"
                ></span>
              </el-tooltip>
            </div>
          </template>
          <template v-if="item.type === 'screen'">
            <el-popover
              placement="bottom"
              trigger="click"
              ref="popoverRef"
              popper-class="header-popper"
            >
              <div class="table-header-screen-warp">
                <el-checkbox-group v-model="checkedCities" v-if="item.list.length > 0">
                  <el-checkbox
                    v-for="(item1, index1) in item.list"
                    :label="item1.props"
                    :key="item1.props"
                    >{{ item1.text }}</el-checkbox
                  >
                </el-checkbox-group>
                <p v-else style="text-align: center; margin-bottom: 10px">暂无数据</p>
                <p class="table-header-operate-warp">
                  <el-button class="reset-btn" @click="screenResetHandle"
                    >重置</el-button
                  >
                  <el-button
                    class="sure-btn"
                    @click="screenSureHandle(item.props)"
                    >确定</el-button
                  >
                </p>
              </div>
              <div
                class="sort-infomation-warp none"
                slot="reference"
                @mouseenter="enterMouseScreen(1, item.props)"
                @mouseleave="enterMouseScreen(2, item.props)"
              >
                <span class="icon-grey-bg" slot="reference">
                  <!-- <img
                    src="@/assets/icon_screen_select.png"
                    width="20px"
                    height="20px"
                    slot="reference"
                    v-if="!screenDefalut && currentScreenHigh === item.props"
                  />
                  <img
                    src="@/assets/icon_screen_default.png"
                    width="20px"
                    height="20px"
                    slot="reference"
                    v-else
                  /> -->
                </span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="筛选"
                  placement="top"
                >
                  <span class="show-header-tip"></span>
                </el-tooltip>
              </div>
            </el-popover>
          </template>
          <template v-if="item.type === 'search'">
            <el-popover
              placement="bottom"
              trigger="click"
              popper-class="header-popper"
              ref="popoverSearchRef"
            >
              <div class="table-header-search-warp">
                <el-input placeholder="请输入关键词" v-model="search" />
                <p class="operte-btn">
                  <el-button
                    class="search-btn"
                    @click="toSearch({ type: item.props })"
                    >搜索</el-button
                  >
                </p>
              </div>
              <div class="sort-infomation-warp" slot="reference">
                <span class="icon-grey-bg"
                  ><i class="el-icon-search" @click="clearSearch"></i
                ></span>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="搜索"
                  placement="top"
                >
                  <span class="show-header-tip"></span>
                </el-tooltip>
              </div>
            </el-popover>
          </template>
        </template>
        <template slot-scope="scope">
          <template v-if="item.customRender">
            <slot :name="item.props" :scope="scope" :row="scope.row" />
          </template>
          <template v-else-if='item.type === "input"'>
            <el-input
              v-model="scope.row.storeCount"
              :type="item.inputType || 'text'"
              :disabled="scope.row.isDisabled"
              :autofocus="true"
              @blur="inputBlur(scope.row)"
              @keyup.enter.native="mountChangeHandle(scope.row)"
              @change="mountChangeHandle(scope.row)"
          /></template>
          <template v-else-if="item.formatter">
            {{ item.formatter(scope.row) }}
          </template>
          <template v-else>
            <!-- [null, undefined, ''] -->
            {{
              blackList.indexOf(scope.row[item.props]) < 0
                ? scope.row[item.props]
                : "--"
            }}
          </template>
        </template>
      </el-table-column>
      <slot />
      <el-table-column
        v-if="isNeedOperate"
        :width="operateWidth"
        label="操作"
        :fixed="isFixed ? 'right' : ''"
      >
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="handleClick(scope.row, item, code)"
            v-for="(item, index) in operateList"
            :key="index"
            class="operate-inset-btn"
            v-permission="item.permission"
          >
            <el-popover
              placement="top-end"
              trigger="click"
              popper-class="header-popper"
              ref="deletePoppver"
              width="172"
              v-if="item.type == 'delete'"
            >
              <div class="delete-warp">
                <p>
                  <svg class="icon" aria-hidden="true" width="16" height="16">
                    <use xlink:href="#icon-warn"></use>
                  </svg>
                  你确定删除吗？
                </p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="cancelDeleteHandler"
                    >取消</el-button
                  >
                  <el-button
                    type="primary"
                    size="mini"
                    @click="sureDeleteHandler(scope.row)"
                    >确定</el-button
                  >
                </div>
              </div>
              <span slot="reference">{{ item.value }}</span>
            </el-popover>
            <span v-else>{{ item.value }}</span>
          </el-button>
        </template>

        <slot name="operate"></slot>
      </el-table-column>
      <!-- 自定义暂无数据 -->
      <div slot="empty" class="empty-wrap">
        <svg class="icon empty-pic" aria-hidden="true">
          <use xlink:href="#icon-no_data"></use>
        </svg>
        <p>暂无数据</p>
      </div>
    </el-table>
  </section>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, ref, defineEmits } from 'vue'

export default defineComponent({
  name: 'analysis',
    props: {
    isRadio: {
      type: Boolean,
      default: false
    },
    // 列表数据
    tableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 动态渲染table的配置项
    // columns 添加一个最重要的属性
    // scopedSlots: { customRender: [prop] },
    // 如果添加了这个属性 就在内部渲染 组件应该灵活可扩展
    tableHeader: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否显示多选
    isSelection: {
      type: Boolean,
      default: true
    },
    // 是否需要操作按钮
    isNeedOperate: {
      type: Boolean,
      default: true
    },
    // 操作按钮的集合
    operateList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 要合并的列
    concatColumList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否显示合计
    isShowSummary: {
      type: Boolean,
      default: false
    },
    // 是否固定操作列
    isFixed: {
      type: Boolean,
      default: true
    },
    // 点击跳转的列
    needJumpList: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 是否显示单选
    isSingleChoice: {
      type: Boolean,
      default: false
    },
    needIconList: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    // 传入的合计对象
    summaryObj: {
      type: Object,
      default: () => { return {} }
    },
    observerDomId: {
      // 某个dom高度变化会引起table高度变化，非必传（例如，搜索区域的展开收起）
      type: String,
      default: ''
    },
    scrollable: {
      // table是否需要有滚动条
      type: Boolean,
      default: false
    },
    otherDomId: {
      // 要减去的其他dom高度的id，比如弹窗中底部确定取消按钮
      type: Array,
      default: () => {
        return []
      }
    },
    otherDistance: {
      // 要减去的其他高度，不能通过某些方式获取到，只能写死传过来的
      type: Number,
      default: 0
    },
    hideSingle: {
      type: Boolean,
      default: false
    },
    operateWidth: {
      type: String,
      default: '200px'
    },
    isStockSearch: {
      type: Boolean,
      default: false
    },
    isHasPage: {
      type: Boolean,
      default: true
    },
    code: { // 父组件点击传参
      type: Number,
      default: null
    },
    dialogHeight: {
      type: String,
      default: ''
    }
  },
  setup() {
    const state = reactive({
      tableRadio: {},
      blackList: [null, undefined, ''],
      multipleSelection: [],
      search: '',
      visible: true,
      checkedCities: [],
      spanArr: [],
      changeMount: [], // 用来存放修改过的input
      SortIcon: 'icon-sort',
      isShow: true,
      radio: '',
      currentHighSort: '',
      listeners: {},
      tableId: `tableList${new Date().getTime()}`,
      maxHeight: 'auto',
      observer: null,
      screenDefalut: true,
      currentScreenHigh: ''
    })
    const emit = defineEmits(['changeRadio','handleClick','changeMultipleSelection','remoteTimeSortHangle','toSearch','screenSureHandle','inputBlur','mountChangeHandle','sureDeleteHandler','handleRadioChange','cellJumpHandler',"Sort"])
    const popoverRef = ref<HTMLElement>();
    // 单选
  const  changeRadio = (val:any)=> {
      emit('changeRadio', val)
    }
    // 点击操作列的按钮 告诉父组件当前的id 和是点击的什么按钮
  const  handleClick =(row:any, type:any, code:any)=> {
      emit('handleClick', { row: row, type: type.type, code: code })
    }
    // 列表勾选事件
   const handleSelectionChange = (val:any) =>{
      state.multipleSelection = val
     emit('changeMultipleSelection', val)
    }
    // 时间排序的方法
   const remoteTimeSortHangle =({ column }:any)=> {
      const property = column['property']
      const sort = column['order'] // "descending" 降序  "ascending" 升序号
      emit('remoteTimeSortHangle', {
        sort: sort,
        type: property
      })
    }
    // 点击搜索派发事件给父组件
   const toSearch =(val:any)=> {
      emit('toSearch', { ...val, value: state.search })
      state.search = ''
      multipClosePoppver('popoverSearchRef')
    }
    // 筛选重置
   const screenResetHandle =() =>{
      state.checkedCities = []
      emit('screenSureHandle', state.checkedCities)
      multipClosePoppver('popoverRef')
    }
    // 筛选换图
   const enterMouseScreen =(val:any, type:any)=> {
      state.currentScreenHigh = type
      if (val === 1) {
        state.screenDefalut = false
      } else {
        state.screenDefalut = true
      }
    }
    // 筛选确定
   const screenSureHandle =(item:any)=> {
      // emit('screenSureHandle', { list: state.checkedCities, type: item })
      // for (let i = 0; i < popoverRef.length; i++) {
      //   $refs.popoverRef[i].doClose()
      // }
      // state.checkedCities = []
    }

    // 合并单元格
  const  objectSpanMethod = ({ row,column, rowIndex, columnIndex }:any) =>{
      // if (state.concatColumList.indexOf(columnIndex) !== -1) {
      //   const _row = state.spanArr[rowIndex]
      //   const _col = _row > 0 ? 1 : 0
      //   return {
      //     // [0,0] 表示这一行不显示， [2,1]表示行的合并数
      //     rowspan: _row,
      //     colspan: _col
      //   }
      // }
    }
    // input 失去焦点
   const inputBlur=(val:any)=> {
      emit('inputBlur', val)
    }
    // 获取列表input 输入列表的值
   const mountChangeHandle =(val:never) =>{
      // for (let i = 0; i < state.changeMount.length; i++) {
      //   if (state.changeMount[i].storeId === val.storeId) {
      //     state.changeMount.splice(i, 1)
      //   }
      // }
      state.changeMount.push(val)
      emit('mountChangeHandle', state.changeMount)
    }
    // 清空搜索框内容
   const clearSearch =()=>{
      state.search = ''
    }
    // 批量关闭popover框
    const multipClosePoppver = (popoverSearchRef:any)=> {
      // for (let i = 0; i < $refs[popoverSearchRef].length; i++) {
      //   $refs[popoverSearchRef][i].doClose()
      // }
    }
    // 适用于排序好的数据
   const getSpanArr =(data:any) =>{
      // for (var i = 0; i < data.length; i++) {
      //   if (i === 0) {
      //     state.spanArr.push(1)
      //     state.pos = 0
      //   } else {
      //     // 判断当前元素与上一个元素是否相同
      //     if (data[i].id === data[i - 1].id) {
      //       state.spanArr[pos] += 1
      //       state.spanArr.push(0)
      //     } else {
      //       state.spanArr.push(1)
      //       state.pos = i
      //     }
      //   }
      // }
    }
    // 设置列的类名
   const setCellClass = ({ row, column, rowIndex, columnIndex }:any)=> {
      // row.index = rowIndex
      // column.index = columnIndex
      // if (state.concatColumList.includes(columnIndex)) {
      //   return 'border-right'
      // }
      // if (state.needJumpList.includes(columnIndex)) {
      //   return 'link-line'
      // }
    }
    // 单元格点击的事件
   const cellJumpHandler =(row:Object, column:Object)=> {
      // const { index }:any = column
      // if (state.needJumpList.includes(index)) {
      //   emit('cellJumpHandler', { ...row, type: index })
      // }
    }
    // 排序状态的改变
   const getSortIcon =(val:any)=> {
      switch (state.SortIcon) {
        case 'icon-sort':
          state.SortIcon = 'icon-sort-up'
          break
        case 'icon-sort-up':
          state.SortIcon = 'icon-sort-down'
          break
        case 'icon-sort-down':
          state.SortIcon = 'icon-sort'
          break
      }
      state.currentHighSort = val
      emit('Sort', state.SortIcon, val)
    }
    // 删除操作取消
  const  cancelDeleteHandler =()=> {
      multipClosePoppver('deletePoppver')
    }
    // 删除操作确定
  const  sureDeleteHandler =(row:any)=> {
      emit('sureDeleteHandler', row)
      multipClosePoppver('deletePoppver')
    }
    // 单选改变的事件
   const handleRadioChange =(row:Object)=> {
      emit('handleRadioChange', row)
    }
    // 合计数据处理
   const getSummaries =(param:any) =>{
      // if (!state.isShowSummary) return
      // const { columns, data } = param
      // const sums:any = []
      // columns.forEach((column:any, index:any) => {
      //   if (index === 0) {
      //     sums[index] = '合计'
      //     return
      //   }
      //   if (index > 2) {
      //     const values = data.map((item:any) => Number(item[column.property]))

      //     if (!values.every((value:any) => isNaN(value))) {
      //       for (let key in state.summaryObj) {
      //         sums[key] = state.summaryObj[key]
      //       }
      //     }
      //   }
      // })
      // return sums
    }
   
    onMounted(() => {
      //  getSpanArr(state.tableData)
      // $nextTick(() => {
      //   $refs.multipleTable.doLayout()
      // })
    })
 
    return {
      ...state,
      changeRadio,
      handleClick,
      handleSelectionChange,
      remoteTimeSortHangle,
      toSearch,
      screenSureHandle,
      inputBlur,
      mountChangeHandle,
      sureDeleteHandler,
      handleRadioChange,
      cellJumpHandler,
      getSortIcon,
      getSummaries,
      cancelDeleteHandler,
      setCellClass,
      objectSpanMethod,

    }
  }

})


</script>
