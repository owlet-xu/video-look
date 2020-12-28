<template>
  <div>
    <el-input v-model="path" :placeholder="$t('Home.InputPath')"></el-input>
    <el-button @click="createVideoPreview">{{ $t('Home.CreateVideoPreview') }}</el-button>
  </div>
</template>

<script lang="ts" src="./video-preview.ts"></script>