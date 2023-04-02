<template>
  <div class="table-container">
    <div v-if="isCheck" class="table-title" @click="handlePull">
      <i :class="[isPull ? 'el-icon-caret-bottom' : 'el-icon-caret-right']" />
      <span>{{ title }}</span>
    </div>
    <div v-show="isPull" :class="[isCheck ? 'padd' : '', 'table-box']">
      <el-table
        :data="tableData"
        :border="isSort"
        :span-method="objectSpanMethod"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in tableHeader"
          :key="index"
          :label="item.title"
          :align="item.align"
          :width="item.width"
        >
          <template slot-scope="scope">
            {{
              blackList.indexOf(scope.row[item.props]) > -1 ? '--' : scope.row[item.props]
            }}
          </template>
        </el-table-column>
        <el-table-column
          v-if="isCheck"
          fixed="right"
          width="500px"
          label="操作"
        >
          <template slot-scope="scope">
            <div class="checkout-contai">
              <el-row type="flex" class="row-bg" justify="space-between">
                <el-col :span="6">
                  <el-checkbox v-model="scope.row._distributionState" :disabled="isEdit || scope.row.whetherUpdate === 0">配送可用</el-checkbox>
                </el-col>
                <el-col :span="6">
                  <el-checkbox v-model="scope.row._onLineState" :disabled="isEdit || scope.row.whetherUpdate === 0">线上销售可用</el-checkbox>
                </el-col>
                <el-col :span="6">
                  <el-checkbox v-model="scope.row._offLineState" :disabled="isEdit || scope.row.whetherUpdate === 0">线下销售可用</el-checkbox>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    tableHeader: {
      type: Array,
      required: true,
      default: () => []
    },
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    isSort: { // 是否需要筛选排序
      type: Boolean,
      default: true
    },
    isCheck: { // 是否需要单多选
      type: Boolean,
      default: true
    },
    isEdit: { // 是否可编辑
      type: Boolean,
      default: true
    },
    keyWord: { // 列表根据哪个关键字进行合并
      type: String,
      default: ''
    }
  },
  data() {
    return {
      blackList: [null, undefined, ''],
      groupss: [],
      isPull: true,
      checked: true
    }
  },
  watch: {
    tableData() {
      if (!this.isSort) return
      let sortTemp = []
      let startNum = 0
      for (let i = 0; i < this.tableData.length; i++) {
        if (i === 0) { // 默认第一次进来加一
          sortTemp.push(1)
          startNum = 0
        } else { // 校验这次与上一次类型是否一致
          if (this.tableData[i][this.keyWord] === this.tableData[i - 1][this.keyWord]) {
            sortTemp[startNum] += 1
            sortTemp.push(0)
          } else {
            sortTemp.push(1)
            startNum = i
          }
        }
      }
      this.sortList = sortTemp
    }
  },
  methods: {
    handlePull() {
      this.isPull = !this.isPull
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1 && this.isSort) {
        const _row = this.sortList[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    classify() { // 按规则分类
      let groups = []
      this.tableData.forEach(item => {
        let value = item['type']
        groups[value] = groups[value] || []
        groups[value].push(item)
      })
      this.groupss = groups.flat(2)
    }
  }
}
</script>

<style lang="scss">
.table-container{
  .el-table__header-wrapper tr th{
      &:first-child{
        .cell {
          padding-left: 24px !important;
        }
      }
    }
  .el-table__body-wrapper tr td {
    &:first-child{
      .cell{
        padding-left: 24px !important;
      }
    }
  }
  .checkout-contai{
    &:last-child{
      color: red;
      padding-right: 24px;
    }
  }
}
// /deep/.box-center
</style>

<style lang="scss" scoped>
.table-container{
  margin-top: 8px;
  .table-title{
    display: flex;
    align-items: center;
    padding: 24px 36px;
    cursor: pointer;
    >i{
      font-size: 16px;
      color: #9496A8;
    }
    >span{
      font-weight: 500;
      padding-left: 8px;
      color: #33343D;
      font-size: 16px;
      line-height: 24px;
    }
  }

  .table-box{
    &.padd{
      padding: 0 32px 8px 32px;
    }
  }
}

</style>
