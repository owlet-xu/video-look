<template>
  <div class="find-file">
    <p class="tips">{{ $t('Home.FindFolderTips') }}</p>
    <div class="search-container">
      <el-input v-model="pathSource" :placeholder="$t('请输入目标文件夹')">
        <template slot="prepend">{{ $t('目标文件夹') }}</template>
      </el-input>
      <el-input v-model="keyWords" :placeholder="$t('请输入关键字')" @keyup.enter.native="matchChinese">
        <template slot="prepend">{{ $t('关键字') }}</template>
      </el-input>
      <el-button title="只查询文件" @click="findFiles">{{ $t('递归查找文件夹') }}</el-button>
      <el-button title="查询文件和文件夹" @click="findFilesNoDeep">{{ $t('不递归查找文件夹') }}</el-button>
    </div>
    <!-- 查找重复和不重复 -->
    <p class="tips">{{ $t('查找重复和不重复，递归查找') }}</p>
    <div class="search-container">
      <el-input v-model="sourcePath" :placeholder="$t('请输入源文件夹')">
        <template slot="prepend">{{ $t('源文件夹') }}</template>
      </el-input>
      <el-input v-model="targetPath" :placeholder="$t('请输入目标文件夹')">
        <template slot="prepend">{{ $t('目标文件夹') }}</template>
      </el-input>
      <el-input v-model="ignoreChars" :placeholder="$t('忽略字符串')" style="width: 200px">
        <template slot="prepend">{{ $t('忽略字符串') }}</template>
      </el-input>
      <el-button title="查找重复" @click="findRepeat(0)">{{ $t('查找重复') }}</el-button>
      <el-button title="查找不重复" @click="findRepeat(1)">{{ $t('查找不重复') }}</el-button>
    </div>

    <div class="count">{{ result.length }}{{ $t('个匹配') }}</div>
    <el-table :data="result" highlight-current-row v-loading="loading" height="600">
      <el-table-column :label="$t('文件名称')">
        <template slot-scope="scope">
          <a @click="showItemInFolder(scope.row.path)">{{ scope.row.path }}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" src="./find-file.ts"></script>
<style lang="scss" src="./find-file.scss" scoped></style>
