<template>
  <md-layout md-column id="page-wrapper">
    <md-layout :md-flex="false" id="toolbar-wrapper">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <md-button @click="$emit('openMainSidenav')" class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
          <span class="md-title">MarkCollab</span>
          <span style="flex: 1;"></span>
          <!-- Buttons go here -->
        </div>
        <div class="md-toolbar-container">
          <h2 class="md-title">{{currentDoc.title}}</h2>
          <span style="flex: 1;"></span>
          <md-button class="md-icon-button" :disabled="!currentDoc.id || saved" @click="saveCurrent">
            <md-icon>save</md-icon>
          </md-button>
        </div>
      </md-toolbar>
    </md-layout>
    <md-layout id="document-wrapper" md-gutter="24">
      <md-layout md-flex="50">
        <md-whiteframe>
          <md-layout md-column class="editor">
            <md-layout class="header">
              <span class="md-headline">Editor</span>
            </md-layout>
            <md-layout>
              <md-input-container>
                <label>Markdown</label>
                <md-textarea @change="saved=false" v-model="contentMd"></md-textarea>
              </md-input-container>
            </md-layout>
          </md-layout>
        </md-whiteframe>
      </md-layout>
      <md-layout md-flex="50" class="preview">
        <md-whiteframe>
          <md-layout md-column>
            <md-layout class="header">
              <span class="md-headline">Preview</span>
            </md-layout>
            <md-layout>
              <div v-html="contentHtml" class="preview-content"></div>
            </md-layout>
          </md-layout>
        </md-whiteframe>
      </md-layout>
    </md-layout>
  </md-layout>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Watch, Prop } from "vue-ts-decorate";
import { MdSidenav, MdSnackbar } from "vue-material";
import Marked from "marked";
import Document from "./../../ts/models/Document";

@Component()
export default class DocumentPage extends Vue {

  @Prop()
  currentDoc: Document = null;
  saved: boolean = true;

  get contentMd(): string {
    if (this.currentDoc.content === undefined) { return ""; }
    return this.currentDoc.content;
  }

  set contentMd(val: string) {
    if (this.currentDoc.content === undefined) { return; }
    this.currentDoc.content = val;
  }

  get contentHtml(): string {
    if (this.currentDoc.content === undefined) { return ""; }
    return Marked(this.currentDoc.content);
  }

  saveCurrent() {
    this.$emit("saveContent", this.currentDoc.id);
    this.saved = true;
  }
}
</script>
<style scoped lang="scss">
  #page-wrapper {
    width: 100%;
    height: 100%;

    .md-whiteframe {
      padding: 10px;
      width: 100%;
    }

    #toolbar-wrapper {
      flex: none;

      & > .md-toolbar {
        width: 100%;
      }
    }
    #document-wrapper {
      width: 100%;
      height: 100%;
      padding: 20px 60px;
      .editor {
        height: 100%;

        & > .md-layout.header {
          flex: none;
        }

        .md-input-container {
          margin: 0;

          textarea {
            height: 100% !important;
            max-height: 100%;
          }
        }
      }
      .preview {
        height: 100%;

        & > .md-whiteframe {
          overflow-y: auto;
        }
      }
    }
  }
</style>
