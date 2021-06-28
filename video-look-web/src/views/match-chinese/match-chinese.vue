<template>
  <div class="match-chinese">
    <p class="tips">{{ $t('Home.MatchChineseTips') }}</p>
    <div class="search-container">
      <el-input v-model="pathChinese" :placeholder="$t('请输入字幕文件夹')">
        <template slot="prepend">{{ $t('字幕文件夹') }}</template>
      </el-input>
      <el-input v-model="pathVideo" :placeholder="$t('请输入视频文件夹')">
        <template slot="prepend">{{ $t('视频文件夹') }}</template>
      </el-input>
      <el-button @click="matchChinese">{{ $t('开始匹配字幕') }}</el-button>
    </div>
    <div class="count">{{ result.length }}{{ $t('个匹配') }}</div>
    <el-table :data="result" highlight-current-row v-loading="loading" height="600">
      <el-table-column :label="$t('视频')">
        <template slot-scope="scope">
          <a @click="showItemInFolder(scope.row.vname)">{{ scope.row.vname }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('字幕')">
        <template slot-scope="scope">
          <a @click="showItemInFolder(scope.row.cname)">{{ scope.row.cname }}</a>
        </template>
      </el-table-column>
      <el-table-column :label="$t('匹配关键字')" width="200">
        <template slot-scope="scope">
          <a>{{ scope.row.match }}</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" src="./match-chinese.ts"></script>
<style lang="scss" src="./match-chinese.scss" scoped></style>
