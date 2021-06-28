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
      <el-button @click="findFiles">{{ $t('查找文件夹') }}</el-button>
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
