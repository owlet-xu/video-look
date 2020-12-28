<template>
  <div class="browser-header" style="-webkit-app-region: drag">
    <div class="browser-title">
      <img src="../../assets/logo.png" alt="" class="app-icon" />
      <span class="el-icon-arrow-left app-go" title="后退"></span>&nbsp; <span class="el-icon-arrow-right app-go" title="前进"></span>&nbsp;
      <span class="app-title" v-if="title" :title="title">{{ title }}</span>
    </div>
    <div class="browser-search">
      <!-- <el-input v-model="searchWorld" size="mini" class="search"></el-input>&nbsp;
      <el-button icon="el-icon-search" circle size="mini" @click="goSearch"></el-button> -->
    </div>
    <div class="browser-tools">
      <button class="ctrl-icon minimize" title="最小化窗口" @click="handleMinimize">-</button>
      <button class="ctrl-icon maximize" title="最大化窗口" @click="handleMaximize">o</button>
      <button class="ctrl-icon close" title="关闭窗口" @click="handleClose">x</button>
    </div>
  </div>
</template>

<script lang="ts" src="./head.ts"></script>

<style lang="scss" scoped>
.browser-header {
  -webkit-app-region: drag;
  background: #21252b;
  color: #f0f0f2;
  display: flex;
  height: 40px;
  align-items: center;
  padding: 0px 10px 0px 10px;
  -webkit-app-region: drag;
  user-select: none;
  .browser-title {
    flex: 0 0 400px;
    display: flex;
    align-items: center;
    font-size: 16px;
    .app-icon {
      width: 20px;
      height: 20px;
      margin-right: 10px;
      vertical-align: middle;
      -webkit-app-region: no-drag;
    }
    .app-go {
      font-size: 20px;
      color: white;
      cursor: pointer;
    }
    .app-name {
    }
    .app-title {
      display: inline-block;
      width: 200px;
    //   @include textOverflow();
    }
  }
  .browser-search {
    flex: 1 1 auto;
    .search {
      width: 300px;
    }
  }
  .browser-tools {
    flex: 0 0 100px;
    text-align: right;
    .ctrl-icon {
      display: inline-block;
      width: 20px;
      line-height: 20px;
      color: white;
      border-radius: 50%;
      outline: none;
      border: none;
      background: #bfbfbf;
      -webkit-app-region: no-drag;
      margin: 5px;
      &:active {
        opacity: 0.7;
      }
    }
    .minimize {
      background: #35cb4b;
    }
    .maximize {
      background: #fdbd41;
    }
    .close {
      background: #fc625d;
    }
  }
}
</style>

