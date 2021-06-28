<template>
  <div>
    <head-bar></head-bar>
    <el-radio-group class="language" v-model="language" @change="languageChange">
      <el-radio-button label="zh">{{ $t('Home.LanguageChinese') }}</el-radio-button>
      <el-radio-button label="en">{{ $t('Home.LanguageEnglish') }}</el-radio-button>
    </el-radio-group>
    <div class="tab-bar">
      <router-link class="tab-item" active-class="tab-item-active" to="/video-preview">{{$t('生成视频预览')}}</router-link>
      <router-link class="tab-item" active-class="tab-item-active" to="/match-chinese">{{$t('移动文件')}}</router-link>
      <router-link class="tab-item" active-class="tab-item-active" to="/find-file">{{$t('查找文件夹')}}</router-link>
      <router-link class="tab-item" active-class="tab-item-active" to="/cut-files">{{$t('移动文件')}}</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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

