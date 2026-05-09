import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("contentUpdater", {
  loadWorkspace() {
    return ipcRenderer.invoke("updater:load-workspace");
  },
  getProjectRoot() {
    return ipcRenderer.invoke("updater:get-project-root");
  },
  saveSection(sectionKey, payload) {
    return ipcRenderer.invoke("updater:save-section", sectionKey, payload);
  },
  chooseFile(options) {
    return ipcRenderer.invoke("updater:choose-file", options);
  },
  importMedia(payload) {
    return ipcRenderer.invoke("updater:import-media", payload);
  },
  resolvePreviewUrl(sitePath) {
    return ipcRenderer.invoke("updater:resolve-preview-url", sitePath);
  },
  getPreviewStatus() {
    return ipcRenderer.invoke("updater:preview-status");
  },
  startPreview() {
    return ipcRenderer.invoke("updater:start-preview");
  },
  stopPreview() {
    return ipcRenderer.invoke("updater:stop-preview");
  },
  openExternal(url) {
    return ipcRenderer.invoke("updater:open-external", url);
  },
  getGitStatus() {
    return ipcRenderer.invoke("updater:git-status");
  },
  confirmPublish(payload) {
    return ipcRenderer.invoke("updater:confirm-publish", payload);
  },
  showPublishResult(payload) {
    return ipcRenderer.invoke("updater:show-publish-result", payload);
  },
  getGitHubActionsUrl() {
    return ipcRenderer.invoke("updater:github-actions-url");
  },
  publishToGitHub(commitMessage) {
    return ipcRenderer.invoke("updater:publish-github", commitMessage);
  },
  openInFolder(sitePath) {
    return ipcRenderer.invoke("updater:open-in-folder", sitePath);
  }
});
