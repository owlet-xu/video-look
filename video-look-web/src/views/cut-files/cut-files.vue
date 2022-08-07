<template>
  <div class="cut-files">
    <p class="tips">{{ $t('Home.MoveFileTips') }}</p>
    <div class="search-container">
      <el-input v-model="sourcePath" :placeholder="$t('请输入源文件夹')">
        <template slot="prepend">{{ $t('源文件夹') }}</template>
      </el-input>
      <el-input v-model="targetPath" :placeholder="$t('请输入目标文件夹')">
        <template slot="prepend">{{ $t('目标文件夹') }}</template>
      </el-input>
      <el-button @click="cutFiles">{{ $t('剪切') }}</el-button>
    </div>
    <!--去除文件名称  -->
    <p class="tips">{{ $t('功能是替换文件名称中的字符串') }}</p>
    <p class="tips">{{ $t('注意源文件夹后面有斜杠') }}</p>
    <div class="search-container">
      <el-input v-model="sourcePath2" :placeholder="$t('请输入源文件夹')">
        <template slot="prepend">{{ $t('源文件夹') }}</template>
      </el-input>
      <el-input v-model="keywords" :placeholder="$t('原字符|替换字符')">
        <template slot="prepend">{{ $t('原字符|替换字符') }}</template>
      </el-input>
      <el-button @click="replaceChars">{{ $t('替换') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./cut-files.ts"></script>
<style lang="scss" src="./cut-files.scss" scoped></style>
