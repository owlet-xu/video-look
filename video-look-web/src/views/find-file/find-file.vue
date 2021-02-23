<template>
  <div class="find-file">
    <div class="search-container">
      <el-input v-model="pathSource" :placeholder="$t('请输入目标文件夹，英文逗号分隔')">
        <template slot="prepend">目标文件夹：</template>
      </el-input>
      <el-input v-model="keyWords" :placeholder="$t('请输入关键字')" @keyup.enter.native="matchChinese">
        <template slot="prepend">关键字：</template>
      </el-input>
      <el-button @click="findFiles">{{ $t('查找') }}</el-button>
    </div>
    <div class="count">{{ result.length }}个匹配</div>
    <el-table :data="result" highlight-current-row v-loading="loading" height="600">
      <el-table-column label="视频">
        <template slot-scope="scope">
          <a @click="showItemInFolder(scope.row.path)">{{ scope.row.path }}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" src="./find-file.ts"></script>
<style lang="scss" src="./find-file.scss" scoped></style>
