<template>
  <div>
    <head-bar></head-bar>
    <el-radio-group class="language" v-model="language" @change="languageChange">
      <el-radio label="zh">{{ $t('Home.LanguageChinese') }}</el-radio>
      <el-radio label="en">{{ $t('Home.LanguageEnglish') }}</el-radio>
    </el-radio-group>
    <div class="tab-bar">
      <router-link class="tab-item" active-class="tab-item-active" to="/video-preview">生成视频预览</router-link>
      <router-link class="tab-item" active-class="tab-item-active" to="/match-chinese">匹配字幕</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>

<style lang="scss" scoped>
.language {
  margin: 10px;
}
.tab-bar {
  margin: 10px;
  .tab-item {
    margin-right: 10px;
  }

  .tab-item-active {
    color: red;
  }
}
</style>

