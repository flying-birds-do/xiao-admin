<template>
  <section class="multip-delete-warp">
    <el-dialog
      title="提示"
      top="0"
      :visible.sync="dialogVisible"
      width="480"
      height="200"
      :before-close="handleClose"
    >
      <span class="tip-info">
        <svg class="icon" aria-hidden="true" width="16" height="16">
          <use xlink:href="#icon-warn" />
        </svg>
        确定删除所选数据吗？
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="makeSureDeleteHander(false)">取 消</el-button>
        <el-button
          type="primary"
          @click="makeSureDeleteHander(true)"
        >确 定</el-button>
      </span>
    </el-dialog>
  </section>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    makeSureDeleteHander(val) {
      this.$emit('makeSureDeleteHander', val)
    }
  }
}
</script>
<style lang="scss" scoped>
.multip-delete-warp {
  background: #ffffff;
  width: 100%;
  height: 100%;
  position: relative;

  :deep.el-dialog {
    box-shadow: 0px 12px 48px 16px rgba(0, 0, 0, 0.03),
      0px 9px 28px 0px rgba(0, 0, 0, 0.05),
      0px 6px 16px -8px rgba(0, 0, 0, 0.08);
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .tip-info {
  font-weight: 500;
color: #33343D;
    svg {
      vertical-align: middle;
    }
  }
}
</style>
