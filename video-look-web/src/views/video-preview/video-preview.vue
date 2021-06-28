<template>
  <div class="video-preview">
    <p class="tips">{{ $t('Home.VideoPreviewTips') }}</p>
    <div class="search-container">
      <el-input v-model="path" :placeholder="$t('Home.InputPath')">
        <template slot="prepend">{{ $t('视频文件夹') }}</template>
      </el-input>
      <el-button @click="createVideoPreview">{{ $t('生成视频预览') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./video-preview.ts"></script>
<style lang="scss" src="./video-preview.scss" scoped></style>
