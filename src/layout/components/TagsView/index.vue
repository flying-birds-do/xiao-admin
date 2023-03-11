<template>
  <div id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPane" class="tags-view-wrapper" @showTagsOpetate="showTagsOpetate">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :to="{ path: tag.path}"
        tag="span"
        class="tags-view-item"
      >
        <div class="tag-wrap">
          {{ tag.title }}
          <span  class="el-icon-close" @click.prevent.stop="closeSelectedTag()" />
        </div>
      </router-link>

    </scroll-pane>
    <ul v-show="visible"  class="contextmenu">
      <!-- <li @click="refreshSelectedTag(selectedTag)">Refresh</li> -->
      <li  @click="closeSelectedTag">关闭当前</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭全部</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const visitedViews = ref([{
  path: '/',
  query: '1',
  fullPath: '/',
  title:'名字'
  
}])
const showTagsOpetate = () => {
}
const closeOthersTags = () => {
  
}
const closeAllTags = () => {
  
}
const closeSelectedTag = () => {
  
}
const visible = ref(false)
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
.tags-view-container {
  // height: 32px;
  width: 100%;
  background: #fff;
  // margin-top: 1px;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      // height: 26px;
      line-height: 36px;
      color: #495060;
      background: #fff;
      font-size: 12px;
      &:last-of-type {
        margin-right: 15px;
        .tag-wrap{
          border-right: 1px solid #d8dce5;
        }
      }
      &.active {
        background-color: #F2F3F7;
        color: #6F7185;
        .tag-wrap{
          border-left: none;
          border-right:none;
        }
        + .tags-view-item{
          .tag-wrap{
            border-left: none;
          }
        }
      }
      .tag-wrap{
        height: 16px;
        line-height: 16px;
        margin: 10px 0;
        border-left: 1px solid #d8dce5;
        padding: 0 16px;
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      margin-left:6px ;
      &:before {
        // transform: scale(.6);
        display: inline-block;
        vertical-align: -2px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
