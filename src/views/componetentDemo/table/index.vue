<template>
  <section class="table-warp">
    <tableTemplate :tableData="state.tableData"></tableTemplate>
  </section>
</template>
<script lang="ts" setup>
import { defineComponent, reactive } from 'vue';
import tableTemplate from '@/components/tableTem/index.vue'

    const state = reactive({
      multipleSelection: [],
      // 是否需要复选框
      isSelection: true,
      // 是否显示操作列
      isNeedOperate: true,
      // 需要做合并单元格的列
      concatColumList: [2, 4],
      // 是否需要合计
      isShowSummary: false,
      // 列表数据
      tableData: [
        {
          id: 1,
          storeId: 1,
          date: '2016-05-03',
          storeName: '王小虎',
          status: 1,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 12
        },
        {
          id: 1,
          storeId: 2,
          date: '2016-05-02',
          storeName: '王小虎',
          status: 2,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 13
        },
        {
          id: 2,
          storeId: 3,
          date: '2016-05-04',
          storeName: '王小虎',
          status: 3,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 2
        },
        {
          id: 2,
          storeId: 4,
          date: '2016-05-01',
          storeName: '王小虎',
          status: 4,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 5
        },
        {
          id: 3,
          storeId: 5,
          date: '2016-05-08',
          storeName: '王小虎',
          status: 5,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        },
        {
          id: 4,
          storeId: 6,
          date: '2016-05-06',
          storeName: '王小虎',
          status: 6,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        },
        {
          id: 4,
          storeId: 7,
          date: '2016-05-07',
          storeName: '王小虎',
          status: 7,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        },
        {
          id: 4,
          storeId: 7,
          date: '2016-05-07',
          storeName: '王小虎',
          status: 7,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        },
        {
          id: 4,
          storeId: 7,
          date: '2016-05-07',
          storeName: '王小虎',
          status: 7,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        },
        {
          id: 4,
          storeId: 7,
          date: '2016-05-07',
          storeName: '王小虎',
          status: 7,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        },
        {
          id: 4,
          storeId: 7,
          date: '2016-05-07',
          storeName: '王小虎',
          status: 7,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        },
        {
          id: 4,
          storeId: 7,
          date: '2016-05-07',
          storeName: '王小虎',
          status: 7,
          origin: '上海市普陀区金沙江路 1518 弄',
          phone: '15117960415',
          concat: '小鱼仔',
          createTime: '2022-1-15',
          storeCount: 1
        }
      ],
      needIconList: [{
        colmn: '3',
        icon: 'icon-a-nav_inventoryquery'
      }],
      // 是否需要固定操作列
      isFixed: true,
      // 需要自己根据页面情况做自定义
      // @params {1} type 代表类型 有5种类型  search 是表头带搜索的 、normal 是普通表头
      // screen 是筛选的表头 筛选的需要传list input 是列表需要渲染输入框的类型 sort 表示表头排序
      // @params title 表头名称 props 列表渲染对应的接口字段 formatter 需要前端进行转义的格式 不需要可不写 width 特殊需要定义的宽度，可不传
      //
      //

      // 如果需要操作项， 则需要传当前需要的按钮 type 类型 主要是自己拿到这个类型的时候知道该做什么操作就行，value是按钮显示的内容
      operateList: [
        { type: 'delete', value: '删除' },
        { type: 'edit', value: '编辑' },
        { type: 'look', value: '查看' }
      ],
    })
</script>