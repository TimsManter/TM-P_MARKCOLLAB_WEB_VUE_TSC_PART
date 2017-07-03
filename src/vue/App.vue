<template>
  <div id="app-container">
    <md-sidenav class="md-left" ref="mainSidenav">
      <md-list v-if="api.Documents && api.Documents.length > 0">
        <md-subheader>Documents</md-subheader>
        <md-list-item @click="currentDoc=doc" v-for="doc in api.Documents" :key="doc.id">
          {{ doc.title }}
        </md-list-item>
      </md-list>
    </md-sidenav>
    <div id="main-wrapper">
      <md-layout md-gutter id="router-wrapper">
        <router-view :currentDoc="currentDoc"
          @openMainSidenav="$refs.mainSidenav.open()"
          @saveContent="saveContent"></router-view>
      </md-layout>
    </div>
    <md-snackbar ref="saveMsgSuccess">Document Saved!</md-snackbar>
    <md-snackbar ref="saveMsgFail">Document Saving Failed</md-snackbar>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import VueMaterial from "vue-material";
  import { Component, Watch, Prop, On } from "vue-ts-decorate";
  import { MdSidenav, MdSnackbar } from "vue-material";
  import MarkCollabAPI from "./../ts/MarkCollabAPI";
  import Document from "./../ts/models/Document";

  @Component()
  export default class App extends Vue {
  $refs = {
    "saveMsgSuccess": MdSnackbar,
    "saveMsgFail": MdSnackbar
  };
  saveMessageText: string = "";

    api: MarkCollabAPI = null;
    currentDoc: Document = null;

    mounted() {
      this.api = new MarkCollabAPI();
    }

    saveContent(id) {
      this.api.SaveContent(id, this.currentDoc.content,
        this.$refs["saveMsgSuccess"],
        this.$refs["saveMsgFail"]);
    }
  }
</script>

<style scoped lang="scss">
  #app-container, #main-wrapper, #router-wrapper {
    width: 100%;
    height: 100%;
  }
</style>
