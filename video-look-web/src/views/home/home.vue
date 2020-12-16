<template>
  <div>
    <h1 class="theme">{{ $t('Home.HomePage') }}</h1>
    <el-radio-group v-model="language" @change="languageChange">
      <el-radio label="en">{{ $t('Home.LanguageEnglish') }}</el-radio>
      <el-radio label="zh">{{ $t('Home.LanguageChinese') }}</el-radio>
    </el-radio-group>
    <div>
      <el-input v-model="path" :placeholder="$t('Home.InputPath')"></el-input>
      <el-button @click="createVideoPreview">{{ $t('Home.CreateVideoPreview') }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" src="./home.ts"></script>


