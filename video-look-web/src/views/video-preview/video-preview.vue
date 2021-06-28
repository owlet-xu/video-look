<template>
  <div class="video-preview">
        <p class="tips">功能是生成视频文件的快速预览图</p>
    <div class="search-container">
      <el-input v-model="path" :placeholder="$t('Home.InputPath')">
        <template slot="prepend">视频文件夹：</template>
      </el-input>
      <el-button @click="createVideoPreview">{{ $t('Home.CreateVideoPreview') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./video-preview.ts"></script>
<style lang="scss" src="./video-preview.scss" scoped></style>
