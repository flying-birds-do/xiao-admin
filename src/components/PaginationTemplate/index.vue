<template>
  <div class="pagination-warp">
    <el-pagination
      id="pagination"
      background
      class="my-pagination"
      layout="total, prev, pager, next, sizes, jumper"
      :current-page="pagination.pageNumber"
      :page-size="pagination.pageSize"
      :total="pagination.totalCount"
      :page-sizes="pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: function() {
        return {
          pageNumber: 1,
          totalCount: 100,
          pageSize: 20
        }
      }
    }
  },
  data() {
    return {
      pageSize: [5, 10, 20, 50, 100]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val + '点击切换条数')
      this.$emit('paginationSizeChange', { current: val, isFirst: true })
    },
    handleCurrentChange(val) {
      console.log(val + '点击切换页码')
      this.$emit('paginationSizeChange', { current: val, isFirst: false })
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination-warp {
    padding-top: 16px;
    text-align: right;
}
.table {
//   ::v-deep .el-table-column--selection {
//     .cell {
//       padding-left: 10px !important;
//     }
//   }
//   ::v-deep .el-table {
//     td,
//     th {
//       &:first-child {
//         padding-left: 14px !important;
//       }
//     }
//   }
  .empty-wrap {
    padding: 80px 0;
    .empty-pic {
      width: 120px;
      height: 100px;
    }
    p {
      line-height: 20px !important;
      margin-top: -20px;
    }
  }
  .my-pagination {
    padding: 16px 5px;
    text-align: right;
    font-weight: normal;
    .el-pagination__jump {
      margin-left: 0;
    }
  }
}
</style>

