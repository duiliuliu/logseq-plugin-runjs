import "@logseq/libs";
import {
  LSPluginBaseInfo,
  SettingSchemaDesc,
} from "@logseq/libs/dist/LSPlugin";
import runjsRenderer from "./runjs";
import { copyToClipboard } from "./copy";

const Supports = {};

const settingsSchema: Array<SettingSchemaDesc> = [];

function main(baseInfo: LSPluginBaseInfo) {
  copyToClipboard('init runjs')
  console.log("Run JS plugin loaded")

  setTimeout(() => {
    const head = parent?.document?.head
    if (head) {
      const head = parent?.document?.head
      if (head) {
        const existingScript = head.querySelector(`script[src="lsp://logseq.io/${logseq.baseInfo.id}/dist/assets/copyToClipboard.js"]`);
        if (!existingScript) {
          // 创建一个新的 script 元素
          const script = document.createElement('script');
          script.src = `lsp://logseq.io/${logseq.baseInfo.id}/dist/assets/copyToClipboard.js`; // 设置脚本的 src 属性
          script.async = true; // 异步加载脚本
          script.defer = true; // 延迟执行脚本，直到文档解析完毕

          // 将新的 script 元素追加到 head 中
          document.head.appendChild(script);
        }
      }

      const logseqCSS = head.querySelector(`link[href="./css/style.css"]`);
      logseqCSS!.insertAdjacentHTML('afterend', `<link rel="stylesheet" id="css-awesomeProps" href="lsp://logseq.io/${globals.pluginID}/dist/assets/awesomeProps.css">`)
    }


  }, 100);


  logseq.Experiments.registerFencedCodeRenderer("runjs", {
    edit: true,
    render: runjsRenderer,
  });
}

// entry
logseq.useSettingsSchema(settingsSchema).ready(main).catch(console.error);
