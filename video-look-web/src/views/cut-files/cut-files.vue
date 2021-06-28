<template>
  <div class="cut-files">
    <p class="tips">功能是将一个文件夹内所有文件移动到另一个文件夹中</p>
    <div class="search-container">
      <el-input v-model="sourcePath" :placeholder="$t('请输入源文件夹')">
        <template slot="prepend">源文件夹：</template>
      </el-input>
      <el-input v-model="targetPath" :placeholder="$t('请输入目标文件夹')">
        <template slot="prepend">目标文件夹：</template>
      </el-input>
      <el-button @click="cutFiles">{{ $t('剪切') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./cut-files.ts"></script>
<style lang="scss" src="./cut-files.scss" scoped></style>
