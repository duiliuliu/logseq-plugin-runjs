import "@logseq/libs";
import React from "react";
import { MD5 } from 'crypto-es/lib/md5.js';

export default function (props: { content: string }) {
  const { content } = props;
  const [evalOutput, setEvalOutput] = React.useState("");
  const elRef = React.useRef(null);
  const id = `run-js-id-${MD5(content).toString()}`

  const addCopyBtn = () => {
    // 获取目标元素
    const runJsElement = parent.document.querySelector(`#${id}`);
    // 获取 .actions 元素
    const actionsSpan = runJsElement.previousElementSibling;
    // 获取目标按钮元素
    const originalButton = actionsSpan.querySelector("button");
    const newButton = originalButton.cloneNode(true) as HTMLElement;
    // 创建新的 SVG 元素
    const newSvg = `<svg t="1728808872016" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9393" id="mx_n_1728808872017" width="14" height="14"><path d="M656.170667 42.666667a64 64 0 0 1 45.226666 18.773333l175.872 175.786667A64 64 0 0 1 896 282.538667V768a85.333333 85.333333 0 0 1-85.333333 85.333333h-42.666667v42.666667a85.333333 85.333333 0 0 1-85.333333 85.333333H256a85.333333 85.333333 0 0 1-85.333333-85.333333V256a85.333333 85.333333 0 0 1 85.333333-85.333333h42.666667V128a85.333333 85.333333 0 0 1 85.333333-85.333333h272.170667zM298.666667 213.333333H256a42.666667 42.666667 0 0 0-42.368 37.674667L213.333333 256v640a42.666667 42.666667 0 0 0 37.674667 42.368L256 938.666667h426.666667a42.666667 42.666667 0 0 0 42.368-37.674667L725.333333 896v-42.666667H384a85.333333 85.333333 0 0 1-85.333333-85.333333V213.333333z m341.461333-128H384a42.666667 42.666667 0 0 0-42.368 37.674667L341.333333 128v640a42.666667 42.666667 0 0 0 37.674667 42.368L384 810.666667h426.666667a42.666667 42.666667 0 0 0 42.368-37.674667L853.333333 768l0.042667-469.418667a36.266667 36.266667 0 0 1-2.261333 0.085334H661.333333a21.333333 21.333333 0 0 1-21.333333-21.333334V87.552L640.128 85.333333zM725.333333 640a21.333333 21.333333 0 0 1 3.84 42.325333L725.333333 682.666667h-256a21.333333 21.333333 0 0 1-3.84-42.325334L469.333333 640h256z m0-128a21.333333 21.333333 0 0 1 3.84 42.325333L725.333333 554.666667h-256a21.333333 21.333333 0 0 1-3.84-42.325334L469.333333 512h256z m0-128a21.333333 21.333333 0 0 1 3.84 42.325333L725.333333 426.666667h-256a21.333333 21.333333 0 0 1-3.84-42.325334L469.333333 384h256z" fill="#fffaf0" p-id="9394"></path></svg>`;
    // 替换按钮中的 SVG
    const originalSvg = newButton.querySelector('svg');
    if (originalSvg) {
      originalSvg.outerHTML = newSvg; // 用新的 SVG 替换原有的
    }
    // 将新的按钮添加到页面中（根据你的需求选择合适的位置）
    actionsSpan.appendChild(newButton);
    // 添加新的事件监听器
    newButton.addEventListener('click', () => {
      try {
        // focus the window
        window.focus();
        navigator.clipboard.writeText(elRef.current.innerText);
        logseq.UI.showMsg(elRef.current.innerText, "copy success")
      } catch (error) {
        logseq.UI.showMsg(elRef.current.innerText, "copy error")
        console.log("copy error", error)
      }
    });
  }

  React.useEffect(() => {
    const setOutput = (text) => {
      setEvalOutput(text);
      elRef.current.innerHTML = text;
    };

    addCopyBtn()

    setTimeout(() => {
      // Have to put this in a timeout or LogSeq freaks out
      eval(content);
    }, 100);






  }, []);

  return (
    <>
      <div id={id}>
        {evalOutput ? (
          <div className="runjs" ref={elRef} />
        ) : (
          <i>Processing...</i>
        )}
      </div>
    </>
  );
}