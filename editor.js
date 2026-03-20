(function () {
  var FALLBACK_IMAGE_BASE64 =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzODQiIGhlaWdodD0iMjE2IiB2aWV3Qm94PSIwIDAgMzg0IDIxNiI+PHJlY3Qgd2lkdGg9IjM4NCIgaGVpZ2h0PSIyMTYiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSIxIiB5PSIxIiB3aWR0aD0iMzgyIiBoZWlnaHQ9IjIxNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2JkNWUxIiBzdHJva2UtZGFzaGFycmF5PSI2IDQiLz48Y2lyY2xlIGN4PSIxMTAiIGN5PSI5MCIgcj0iMTgiIGZpbGw9IiNmY2E1YTUiLz48cGF0aCBkPSJNNDAgMTY4TDEyMCAxMDhMMTc2IDE1MkwyNDQgODJMMzQ0IDE2OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOTRhM2I4IiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjx0ZXh0IHg9IjE5MiIgeT0iMTg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNDc1NTY5IiBmb250LXNpemU9IjI0IiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSxCbGlua01hY1N5c3RlbUZvbnQsJ1NlZ29lIFVJJyxzYW5zLXNlcmlmIj7ml6Dlm77ml6DnnJ/nm7g8L3RleHQ+PC9zdmc+";

  function renderEditor(container) {
    container.innerHTML = [
      '<svg aria-hidden="true" width="0" height="0" style="position:absolute; width:0; height:0; overflow:hidden">',
      '  <symbol id="copy" viewBox="0 0 24 24">',
      '    <rect x="9" y="9" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.8" fill="none"></rect>',
      '    <path d="M15 9V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"></path>',
      "  </symbol>",
      "</svg>",
      '<div class="md-editor">',
      '  <div class="title-input"><input id="mde-title" type="text" placeholder="请输入标题" /></div>',
      '  <div class="tab-select window_header">',
      '    <div class="tab-left">',
      '      <div class="tab-option active" data-mode="content">内容</div>',
      '      <div class="tab-option" data-mode="preview">预览</div>',
      '      <div class="tab-option" data-mode="split">对照</div>',
      '    </div>',
      '    <div class="markdown-tip">支持<a href="https://www.runoob.com/markdown/md-tutorial.html" target="_blank" rel="noopener noreferrer">markdown语法</a></div>',
      '    <a href="javascript:void(0)" title="行号" class="editor-top-button" data-action="line-numbers"><span class="i-icon"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M20 9H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 19H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 29H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M20 39H42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 29H12V32L6 38V39H12" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 11L9 9V19M9 19H7M9 19H11" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></a>',
      '    <a href="javascript:void(0)" title="工具栏" class="editor-top-button" data-action="toggle-toolbar"><span class="i-icon"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M8 25V38C8 39.6569 9.34315 41 11 41H37C38.6569 41 40 39.6569 40 38V25" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 15C5 13.8954 5.89543 13 7 13H41C42.1046 13 43 13.8954 43 15V23C43 24.1046 42.1046 25 41 25H7C5.89543 25 5 24.1046 5 23V15Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M31 13V9C31 7.89543 30.1046 7 29 7H19C17.8954 7 17 7.89543 17 9V13" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 23V29" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M33 23V29" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></a>',
      '    <a href="javascript:void(0)" title="全屏" class="editor-top-button" data-action="fullscreen"><span class="i-icon"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M6 6L16 15.8995" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 41.8995L16 32" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M42.0001 41.8995L32.1006 32" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M41.8995 6L32 15.8995" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M33 6H42V15" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M42 33V42H33" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 42H6V33" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 15V6H15" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></a>',
      "  </div>",
      '  <div class="mde-toolbar">',
      '    <button type="button" class="toolbar-item" title="加粗" aria-label="加粗"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M24 24C29.5056 24 33.9688 19.5228 33.9688 14C33.9688 8.47715 29.5056 4 24 4H11V24H24Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M28.0312 44C33.5368 44 38 39.5228 38 34C38 28.4772 33.5368 24 28.0312 24H11V44H28.0312Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="斜体" aria-label="斜体"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M20 6H36" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 42H28" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M29 5.95215L19 41.9998" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="删除线" aria-label="删除线"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M5 24H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M24 24C40 30 34 44 24 44C13.9999 44 12 36 12 36" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M35.9999 12C35.9999 12 33 4 23.9999 4C14.9999 4 11.4359 11.5995 15.6096 18" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 36C12 36 15.9999 44 24 44C32 44 36.564 36.4005 32.3903 30" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <div class="sep"></div>',
      '    <button type="button" class="toolbar-item" title="标题" aria-label="标题"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M12 5V43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M36 5V43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 24L36 24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="无序列表" aria-label="无序列表"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M9 42C11.2091 42 13 40.2091 13 38C13 35.7909 11.2091 34 9 34C6.79086 34 5 35.7909 5 38C5 40.2091 6.79086 42 9 42Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M9 14C11.2091 14 13 12.2092 13 10C13 7.79086 11.2091 6 9 6C6.79086 6 5 7.79086 5 10C5 12.2092 6.79086 14 9 14Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M9 28C11.2091 28 13 26.2092 13 24C13 21.7908 11.2091 20 9 20C6.79086 20 5 21.7908 5 24C5 26.2092 6.79086 28 9 28Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M21 24H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 38H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 10H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="有序列表" aria-label="有序列表"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M9 4V13" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 13H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 27H6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 19.9998C6 19.9998 9 16.9998 11 19.9998C13 22.9999 6 26.9998 6 26.9998" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.00016 34.5001C6.00016 34.5001 8.00016 31.5 11.0002 33.5C14.0002 35.5 11.0002 38 11.0002 38C11.0002 38 14.0002 40.5 11.0002 42.5C8.00015 44.5 6.00015 41.5 6.00015 41.5" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 38H9" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 4L6 6" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 24H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 38H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 10H43" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="引用" aria-label="引用"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.8533 9.11587C11.3227 13.9521 7.13913 19.5811 6.30256 26.0028C5.00021 35.9999 13.9404 40.8932 18.4703 36.4966C23.0002 32.1 20.2848 26.5195 17.0047 24.9941C13.7246 23.4686 11.7187 23.9999 12.0686 21.9614C12.4185 19.923 17.0851 14.2712 21.1849 11.6391C21.4569 11.4078 21.5604 10.959 21.2985 10.6185C21.1262 10.3946 20.7883 9.95545 20.2848 9.30102C19.8445 8.72875 19.4227 8.75017 18.8533 9.11587Z" fill="currentColor"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M38.6789 9.11587C31.1484 13.9521 26.9648 19.5811 26.1282 26.0028C24.8259 35.9999 33.7661 40.8932 38.296 36.4966C42.8259 32.1 40.1105 26.5195 36.8304 24.9941C33.5503 23.4686 31.5443 23.9999 31.8943 21.9614C32.2442 19.923 36.9108 14.2712 41.0106 11.6391C41.2826 11.4078 41.3861 10.959 41.1241 10.6185C40.9519 10.3946 40.614 9.95545 40.1105 9.30102C39.6702 8.72875 39.2484 8.75017 38.6789 9.11587Z" fill="currentColor"></path></svg></button>',
      '    <div class="sep"></div>',
      '    <button type="button" class="toolbar-item" title="链接" aria-label="链接"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><rect x="34.6074" y="3.4939" width="14" height="18" rx="2" transform="rotate(45 34.6074 3.4939)" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></rect><rect x="16.2227" y="21.8787" width="14" height="18" rx="2" transform="rotate(45 16.2227 21.8787)" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></rect><path d="M31.0723 16.929L16.9301 31.0711" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="图片" aria-label="图片"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 10C5 8.89543 5.89543 8 7 8L41 8C42.1046 8 43 8.89543 43 10V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V10Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15C13.6716 15 13 15.6716 13 16.5C13 17.3284 13.6716 18 14.5 18Z" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 24L20 28L26 21L43 34V38C43 39.1046 42.1046 40 41 40H7C5.89543 40 5 39.1046 5 38V34L15 24Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="代码块" aria-label="代码块"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M16 13L4 25.4322L16 37" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M32 13L44 25.4322L32 37" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M28 4L21 44" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path></svg></button>',
      '    <div class="sep"></div>',
      '    <button type="button" class="toolbar-item" title="表格" aria-label="表格"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M42 6H6C4.89543 6 4 6.89543 4 8V40C4 41.1046 4.89543 42 6 42H42C43.1046 42 44 41.1046 44 40V8C44 6.89543 43.1046 6 42 6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M4 18H44" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M17.5 18V42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M30.5 18V42" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M4 30H44" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M44 8V40C44 41.1046 43.1046 42 42 42H6C4.89543 42 4 41.1046 4 40V8" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="分割线" aria-label="分割线"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M10.5 24L38.5 24" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <div class="sep"></div>',
      '    <button type="button" class="toolbar-item" title="撤销" aria-label="撤销"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M11.2721 36.7279C14.5294 39.9853 19.0294 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6C19.0294 6 14.5294 8.01472 11.2721 11.2721C9.61407 12.9301 6 17 6 17" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6 9V17H14" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="重做" aria-label="重做"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M36.7279 36.7279C33.4706 39.9853 28.9706 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6C28.9706 6 33.4706 8.01472 36.7279 11.2721C38.3859 12.9301 42 17 42 17" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path><path d="M42 8V17H33" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>',
      '    <button type="button" class="toolbar-item" title="清空" aria-label="清空"><svg width="16" height="16" viewBox="0 0 48 48" fill="none"><path d="M44.7818 24.1702L31.918 7.09935L14.1348 20.5L27.5 37L30.8556 34.6643L44.7818 24.1702Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M27.4998 37L23.6613 40.0748L13.0978 40.074L10.4973 36.6231L4.06543 28.0876L14.4998 20.2248" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M13.2056 40.072L44.5653 40.072" stroke="currentColor" stroke-width="4" stroke-linecap="round"></path></svg></button>',
      "  </div>",
      '  <div class="content-area split-view-container">',
      '    <div id="cm-editor-wrapper">',
      '      <div class="editor-area">',
      '        <div class="line-number-gutter" aria-hidden="true"><div class="line-number-list"></div></div>',
      '        <pre class="editor-highlight" aria-hidden="true"></pre>',
      '        <textarea id="editorTextarea" class="editor-textarea" placeholder="鼓励友善发言，禁止人身攻击"></textarea>',
      "      </div>",
      "    </div>",
      '    <div class="markHtml-wrapper"><div class="post-content"></div></div>',
      "  </div>",
      '  <div class="topic-select">',
      '    <div class="topic-select-left">',
      '      <label for="category">板块</label>',
      '      <select id="category"><option value="daily">日常</option><option value="tech">技术</option></select>',
      '      <label for="rank">阅读限制</label>',
      '      <select id="rank"><option value="0">公开</option><option value="1">Lv1</option><option value="255">私有</option></select>',
      "    </div>",
      '    <button type="button" class="submit btn">发布帖子</button>',
      "  </div>",
      "</div>",
    ].join("");
  }

  function syncVisibleViewportHeight() {
    var viewport = window.visualViewport;
    var viewportHeight = viewport && viewport.height ? viewport.height : 0;
    var height = Math.max(window.innerHeight || 0, viewportHeight);
    document.documentElement.style.setProperty(
      "--editor-visible-height",
      Math.max(0, Math.floor(height) - 10) + "px",
    );
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function parseMarkdown(raw) {
    var source = String(raw || "");
    var codeBlocks = [];

    source = source.replace(/```([\s\S]*?)```/g, function (_, code) {
      var token = "@@CODE_BLOCK_" + codeBlocks.length + "@@";
      codeBlocks.push(String(code).replace(/^\n+|\n+$/g, ""));
      return token;
    });

    var html = escapeHtml(source);
    html = html.replace(/^###\s(.+)$/gm, "<h3>$1</h3>");
    html = html.replace(/^##\s(.+)$/gm, "<h2>$1</h2>");
    html = html.replace(/^#\s(.+)$/gm, "<h1>$1</h1>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/~~(.+?)~~/g, "<s>$1</s>");
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, function (_, alt, url) {
      var cleanUrl = String(url || "").trim();
      var usableUrl = /^https?:\/\/.+/i.test(cleanUrl)
        ? cleanUrl
        : FALLBACK_IMAGE_BASE64;
      var fallbackClass =
        usableUrl === FALLBACK_IMAGE_BASE64 ? ' class="img-fallback"' : "";
      var title =
        usableUrl === FALLBACK_IMAGE_BASE64
          ? ' title="图片地址无效，已显示默认提示图"'
          : "";
      return (
        '<img src="' +
        usableUrl +
        '" alt="' +
        alt +
        '"' +
        fallbackClass +
        title +
        " />"
      );
    });
    html = html.replace(
      /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );

    function renderListBlock(block) {
      var lines = block.split(/\n/).filter(function (line) {
        return line.trim() !== "";
      });
      if (!lines.length) return null;

      var isUnordered = lines.every(function (line) {
        return /^\s*-\s+/.test(line);
      });
      var isOrdered = lines.every(function (line) {
        return /^\s*\d+\.\s+/.test(line);
      });

      if (!isUnordered && !isOrdered) {
        return null;
      }

      var listTag = isOrdered ? "ol" : "ul";
      var prefixRegex = isOrdered ? /^\s*\d+\.\s+/ : /^\s*-\s+/;
      var items = lines.map(function (line) {
        return "<li>" + line.replace(prefixRegex, "") + "</li>";
      });
      return "<" + listTag + ">" + items.join("") + "</" + listTag + ">";
    }

    function renderTableBlock(block) {
      var lines = block.split(/\n/).filter(function (line) {
        return line.trim() !== "";
      });
      if (lines.length < 2) return null;
      if (!/^\|?.+\|.+\|?$/.test(lines[0])) return null;
      if (!/^\|?[\s:-]+\|[\s|:-]+\|?$/.test(lines[1])) return null;

      function splitCells(line) {
        return line
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map(function (cell) {
            return cell.trim();
          });
      }

      var headers = splitCells(lines[0]);
      var head =
        "<tr>" +
        headers
          .map(function (h) {
            return "<th>" + h + "</th>";
          })
          .join("") +
        "</tr>";
      var rows = lines
        .slice(2)
        .map(function (line) {
          var cells = splitCells(line);
          return (
            "<tr>" +
            cells
              .map(function (c) {
                return "<td>" + c + "</td>";
              })
              .join("") +
            "</tr>"
          );
        })
        .join("");
      return (
        "<table><thead>" + head + "</thead><tbody>" + rows + "</tbody></table>"
      );
    }

    function renderQuoteLines(lines) {
      var content = lines
        .map(function (line) {
          return line.replace(/^\s*&gt;\s?/, "").trim();
        })
        .join("<br>");
      return '<blockquote class="oc-done"><p>' + content + "</p></blockquote>";
    }

    function renderQuoteBlock(block) {
      var lines = block.split(/\n/).filter(function (line) {
        return line.trim() !== "";
      });
      if (!lines.length) return null;

      var hasQuoteLine = lines.some(function (line) {
        return /^\s*&gt;\s?/.test(line);
      });
      if (!hasQuoteLine) return null;

      var parts = [];
      var textBuffer = [];
      var quoteBuffer = [];

      function flushText() {
        if (!textBuffer.length) return;
        parts.push("<p>" + textBuffer.join("<br>") + "</p>");
        textBuffer = [];
      }

      function flushQuote() {
        if (!quoteBuffer.length) return;
        parts.push(renderQuoteLines(quoteBuffer));
        quoteBuffer = [];
      }

      lines.forEach(function (line) {
        if (/^\s*&gt;\s?/.test(line)) {
          flushText();
          quoteBuffer.push(line);
          return;
        }
        flushQuote();
        textBuffer.push(line);
      });

      flushText();
      flushQuote();

      return parts.join("");
    }

    var rendered = html
      .replace(/(<h[1-3]>[\s\S]*?<\/h[1-3]>)/g, "\n\n$1\n\n")
      .split(/\n{2,}/)
      .map(function (block) {
        var trimmedBlock = block.trim();
        if (/^@@CODE_BLOCK_\d+@@$/.test(trimmedBlock)) return trimmedBlock;
        if (/^<h[1-3]>/.test(trimmedBlock)) return trimmedBlock;
        if (/^(?:---|\*\*\*|___)$/.test(trimmedBlock)) return "<hr>";
        var quoteHtml = renderQuoteBlock(block);
        if (quoteHtml) return quoteHtml;
        var tableHtml = renderTableBlock(block);
        if (tableHtml) return tableHtml;
        var listHtml = renderListBlock(block);
        if (listHtml) return listHtml;
        return "<p>" + block.replace(/\n/g, "<br>") + "</p>";
      })
      .join("");

    rendered = rendered.replace(/@@CODE_BLOCK_(\d+)@@/g, function (_, idx) {
      var code = escapeHtml(codeBlocks[Number(idx)] || "");
      return (
        '<pre><code>' +
        code +
        '</code><span class="copy-code" title="复制代码"><svg class="iconpark-icon" aria-hidden="true"><use href="#copy"></use></svg></span></pre>'
      );
    });

    return rendered;
  }

  function initEditor(container) {
    var tabOptions = container.querySelectorAll(".tab-option");
    var contentArea = container.querySelector(".split-view-container");
    var textarea = container.querySelector("#editorTextarea");
    var preview = container.querySelector(".post-content");
    var submitBtn = container.querySelector(".submit.btn");
    var toolbarButtons = container.querySelectorAll(".toolbar-item");
    var topButtons = container.querySelectorAll(".editor-top-button");
    var toolbarToggleBtn = container.querySelector(
      '.editor-top-button[data-action="toggle-toolbar"]',
    );
    var toolbarEl = container.querySelector(".mde-toolbar");
    var editorRoot = container.querySelector(".md-editor");
    var fullscreenBtn = container.querySelector(
      '.editor-top-button[data-action="fullscreen"]',
    );
    var lineNumberList = container.querySelector(".line-number-list");
    var highlightEl = container.querySelector(".editor-highlight");
    var lineNumbersBtn = container.querySelector(
      '.editor-top-button[data-action="line-numbers"]',
    );
    var draftKey = "simpleMdeDraft:v3";

    var toastEl = document.createElement("div");
    toastEl.className = "editor-toast";
    document.body.appendChild(toastEl);
    var toastTimer = null;

    var historyStack = [];
    var historyIndex = -1;
    var lockHistory = false;
    var toolbarHiddenByUser = false;
    var lastNonSplitMode = "content";

    if (toolbarEl) {
      toolbarEl.addEventListener("mousedown", function (evt) {
        var item = evt.target && evt.target.closest(".toolbar-item");
        if (!item) return;
        rememberSelection();
        evt.preventDefault();
      });
    }
    var activeImageUrlLine = -1;
    var activeBracketStart = -1;
    var activeBracketEnd = -1;
    var codeBlockRanges = [];
    var syncRafId = null;
    var panelResizeObserver = null;
    var lastContentAreaHeight = 344;
    var toolbarReservedHeight = 0;
    var lastSelectionStart = 0;
    var lastSelectionEnd = 0;

    function rememberSelection() {
      lastSelectionStart = textarea.selectionStart || 0;
      lastSelectionEnd = textarea.selectionEnd || lastSelectionStart;
    }

    function restoreSelection() {
      textarea.focus();
      var max = textarea.value.length;
      var start = Math.max(0, Math.min(lastSelectionStart, max));
      var end = Math.max(start, Math.min(lastSelectionEnd, max));
      textarea.selectionStart = start;
      textarea.selectionEnd = end;
    }

    function scheduleDecorationSync() {
      if (syncRafId) cancelAnimationFrame(syncRafId);
      syncRafId = requestAnimationFrame(function () {
        syncRafId = null;
        updateEditorDecorations();
      });
    }

    function setToolbarHidden(hidden) {
      if (toolbarEl) toolbarEl.classList.toggle("is-hidden", !!hidden);
      if (toolbarToggleBtn) toolbarToggleBtn.classList.toggle("active", !hidden);
    }

    function setFullscreen(enabled) {
      if (editorRoot) editorRoot.classList.toggle("is-fullscreen", !!enabled);
      if (fullscreenBtn) fullscreenBtn.classList.toggle("active", !!enabled);
      if (enabled) {
        contentArea.style.height = "";
      } else {
        syncPanelHeight();
      }
    }

    function syncPanelHeight(modeOverride) {
      if (!contentArea || !textarea) return;
      if (editorRoot && editorRoot.classList.contains("is-fullscreen")) return;
      var editorArea = container.querySelector(".editor-area");
      var measured = editorArea ? Math.ceil(editorArea.offsetHeight) : 0;
      if (measured > 0) lastContentAreaHeight = measured;
      if (toolbarEl && toolbarEl.offsetHeight > 0) {
        toolbarReservedHeight = Math.ceil(toolbarEl.offsetHeight);
      }
      var mode =
        modeOverride ||
        (contentArea.classList.contains("mode-preview")
          ? "preview"
          : contentArea.classList.contains("mode-split")
            ? "split"
            : "content");
      var target = Math.max(320, lastContentAreaHeight);
      if (mode === "preview") {
        target += toolbarReservedHeight;
      }
      contentArea.style.height = target + "px";
    }

    function syncEditorOverlayScroll() {
      if (lineNumberList) {
        lineNumberList.style.transform = "translateY(" + -textarea.scrollTop + "px)";
      }
      if (highlightEl) {
        highlightEl.scrollTop = textarea.scrollTop;
        highlightEl.scrollLeft = textarea.scrollLeft;
      }
    }

    function syncHighlightOverlayLayout() {
      if (!highlightEl || !textarea) return;
      highlightEl.style.right = "auto";
      highlightEl.style.bottom = "auto";
      highlightEl.style.left = textarea.offsetLeft + "px";
      highlightEl.style.top = textarea.offsetTop + "px";
      highlightEl.style.width = textarea.clientWidth + "px";
      highlightEl.style.height = textarea.clientHeight + "px";
    }

    function updateLineNumbers() {
      if (!lineNumberList) return;
      var style = window.getComputedStyle(textarea);
      var lineHeight = parseFloat(style.lineHeight) || 24;
      var totalRows = Math.max(1, Math.ceil((textarea.scrollHeight || 0) / lineHeight));
      var numbers = [];
      for (var i = 1; i <= totalRows; i += 1) numbers.push(String(i));
      lineNumberList.textContent = numbers.join("\n");
      syncEditorOverlayScroll();
    }

    function updateEditorHighlight() {
      if (!highlightEl) return;
      var raw = textarea.value || "";
      var lineRegex = /!\[([^\]]*)\]\(([^)\n]+)\)/g;

      function renderInlineStyles(text, lineIndex) {
        function renderBasicStyles(input) {
          var boldRegex = /\*\*([^*]+?)\*\*/g;
          var out = "";
          var cursor = 0;
          var match = null;

          while ((match = boldRegex.exec(input))) {
            var start = match.index;
            var whole = match[0] || "";
            var content = match[1] || "";
            out += escapeHtml(input.slice(cursor, start));
            out += '<span class="md-bold-marker">**</span>';
            out += '<span class="md-bold-text">' + escapeHtml(content) + "</span>";
            out += '<span class="md-bold-marker">**</span>';
            cursor = start + whole.length;
          }

          out += escapeHtml(input.slice(cursor));

          var delRegex = /~~([^~\n]+?)~~/g;
          var delOut = "";
          var delCursor = 0;
          var delMatch = null;

          while ((delMatch = delRegex.exec(out))) {
            var dStart = delMatch.index;
            var dWhole = delMatch[0] || "";
            var dContent = delMatch[1] || "";
            delOut += out.slice(delCursor, dStart);
            delOut += '<span class="md-del-marker">~~</span>';
            delOut += '<span class="md-del-text">' + dContent + "</span>";
            delOut += '<span class="md-del-marker">~~</span>';
            delCursor = dStart + dWhole.length;
          }

          delOut += out.slice(delCursor);

          var italicRegex = /\*([^*\n]+?)\*/g;
          var italicOut = "";
          var italicCursor = 0;
          var italicMatch = null;

          while ((italicMatch = italicRegex.exec(delOut))) {
            var iStart = italicMatch.index;
            var iWhole = italicMatch[0] || "";
            var iContent = italicMatch[1] || "";
            italicOut += delOut.slice(italicCursor, iStart);
            italicOut += '<span class="md-italic-marker">*</span>';
            italicOut += '<span class="md-italic-text">' + iContent + "</span>";
            italicOut += '<span class="md-italic-marker">*</span>';
            italicCursor = iStart + iWhole.length;
          }

          italicOut += delOut.slice(italicCursor);
          return italicOut;
        }

        var linkRegex = /\[([^\]]+)\]\(([^)\n]+)\)/g;
        var out = "";
        var cursor = 0;
        var match = null;

        while ((match = linkRegex.exec(text))) {
          var start = match.index;
          var whole = match[0] || "";
          var label = match[1] || "";
          var url = match[2] || "";
          var activeClass = activeImageUrlLine === lineIndex ? " md-image-url-active" : "";

          out += renderBasicStyles(text.slice(cursor, start));
          out += '<span class="md-link-part">[' + escapeHtml(label) + '](</span>';
          out += '<span class="md-link-url' + activeClass + '">' + escapeHtml(url) + "</span>";
          out += '<span class="md-link-part">)</span>';
          cursor = start + whole.length;
        }

        out += renderBasicStyles(text.slice(cursor));
        return out;
      }

      var lineCursorForRange = 0;
      var inCodeRange = false;
      var codeRangeStart = -1;
      codeBlockRanges = [];

      raw.split("\n").forEach(function (line) {
        var lineStart = lineCursorForRange;
        var lineEndExcl = lineStart + line.length;
        var isFence = /^\s*```/.test(line);
        if (!inCodeRange && isFence) {
          inCodeRange = true;
          codeRangeStart = lineStart;
        } else if (inCodeRange && isFence) {
          codeBlockRanges.push([codeRangeStart, lineEndExcl]);
          inCodeRange = false;
          codeRangeStart = -1;
        }
        lineCursorForRange = lineEndExcl + 1;
      });
      if (inCodeRange) codeBlockRanges.push([codeRangeStart, raw.length]);

      var prevLineIsQuote = false;
      var lineCursor = 0;
      var result = raw
        .split("\n")
        .map(function (line, lineIndex) {
          var lineStart = lineCursor;
          lineCursor += line.length + 1;
          var isCodeLine = codeBlockRanges.some(function (range) {
            return lineStart >= range[0] && lineStart < range[1];
          });

          if (isCodeLine) {
            var codeOut = "";
            for (var i = 0; i < line.length; i += 1) {
              var ch = line.charAt(i);
              var rawIdx = lineStart + i;
              if (/[()\[\]{}]/.test(ch)) {
                var activeClass =
                  rawIdx === activeBracketStart || rawIdx === activeBracketEnd
                    ? " md-code-bracket-active"
                    : "";
                codeOut +=
                  '<span class="md-code-bracket' +
                  activeClass +
                  '" data-raw-index="' +
                  rawIdx +
                  '">' +
                  escapeHtml(ch) +
                  "</span>";
              } else {
                codeOut += escapeHtml(ch);
              }
            }
            prevLineIsQuote = false;
            return '<span class="md-code-line">' + codeOut + "</span>";
          }

          var quoteMatch = line.match(/^(\s*>\s*)/);
          var keepQuoteMarker = !!quoteMatch && !prevLineIsQuote;
          var displayLine = line;
          var hiddenQuoteMarkerHtml = "";
          if (quoteMatch && !keepQuoteMarker) {
            var quotePrefix = quoteMatch[1] || "";
            displayLine = line.slice(quotePrefix.length);
            hiddenQuoteMarkerHtml =
              '<span class="md-quote-marker-hidden">' +
              escapeHtml(quotePrefix) +
              "</span>";
          }
          var out = "";
          var cursor = 0;
          var match = null;
          lineRegex.lastIndex = 0;

          while ((match = lineRegex.exec(displayLine))) {
            var start = match.index;
            var full = match[0] || "";
            var alt = match[1] || "";
            var url = match[2] || "";
            var activeClass = activeImageUrlLine === lineIndex ? " md-image-url-active" : "";

            out += renderInlineStyles(displayLine.slice(cursor, start), lineIndex);
            out += '<span class="md-image-bang">!</span>';
            out += '<span class="md-image-part">[' + escapeHtml(alt) + '](</span>';
            out += '<span class="md-image-url' + activeClass + '">' + escapeHtml(url) + "</span>";
            out += '<span class="md-image-part">)</span>';
            cursor = start + full.length;
          }

          out += renderInlineStyles(displayLine.slice(cursor), lineIndex);
          if (hiddenQuoteMarkerHtml) out = hiddenQuoteMarkerHtml + out;
          if (quoteMatch) {
            prevLineIsQuote = true;
            return '<span class="md-quote-line">' + out + "</span>";
          }
          prevLineIsQuote = false;
          if (/^\s*(?:-\s+|\d+\.\s+)/.test(line)) {
            return '<span class="md-list-line">' + out + "</span>";
          }
          if (/^#{1,6}\s+/.test(line)) {
            return '<span class="md-heading-line">' + out + "</span>";
          }
          return out;
        })
        .join("\n");

      if (/\n$/.test(raw)) {
        result += '<span class="md-trailing-line-placeholder"> </span>';
      }

      highlightEl.innerHTML = result || "\n";
      syncEditorOverlayScroll();
    }

    function getCodeRangeAt(index) {
      for (var i = 0; i < codeBlockRanges.length; i += 1) {
        var range = codeBlockRanges[i];
        if (index >= range[0] && index < range[1]) return range;
      }
      return null;
    }

    function findMatchingBracket(raw, index) {
      var range = getCodeRangeAt(index);
      if (!range) return -1;
      var ch = raw.charAt(index);
      var openToClose = { "(": ")", "[": "]", "{": "}" };
      var closeToOpen = { ")": "(", "]": "[", "}": "{" };
      var pair = openToClose[ch] || closeToOpen[ch];
      if (!pair) return -1;

      if (openToClose[ch]) {
        var depthForward = 0;
        for (var i = index; i < range[1]; i += 1) {
          var c = raw.charAt(i);
          if (c === ch) depthForward += 1;
          else if (c === pair) {
            depthForward -= 1;
            if (depthForward === 0) return i;
          }
        }
        return -1;
      }

      var depthBackward = 0;
      for (var j = index; j >= range[0]; j -= 1) {
        var b = raw.charAt(j);
        if (b === ch) depthBackward += 1;
        else if (b === pair) {
          depthBackward -= 1;
          if (depthBackward === 0) return j;
        }
      }
      return -1;
    }

    function updateActiveBracketPair() {
      var raw = textarea.value || "";
      var prevStart = activeBracketStart;
      var prevEnd = activeBracketEnd;
      activeBracketStart = -1;
      activeBracketEnd = -1;

      if (textarea.selectionStart !== textarea.selectionEnd) {
        return prevStart !== activeBracketStart || prevEnd !== activeBracketEnd;
      }

      var caret = textarea.selectionStart;
      var candidates = [caret, caret - 1];

      for (var i = 0; i < candidates.length; i += 1) {
        var idx = candidates[i];
        if (idx < 0 || idx >= raw.length) continue;
        var ch = raw.charAt(idx);
        if (!/[()\[\]{}]/.test(ch)) continue;
        var match = findMatchingBracket(raw, idx);
        if (match === -1) continue;
        activeBracketStart = Math.min(idx, match);
        activeBracketEnd = Math.max(idx, match);
        break;
      }

      return prevStart !== activeBracketStart || prevEnd !== activeBracketEnd;
    }

    function updateActiveImageUrlLine() {
      var value = textarea.value || "";
      if (textarea.selectionStart !== textarea.selectionEnd) {
        activeImageUrlLine = -1;
        return;
      }

      var caret = textarea.selectionStart;
      var lineStart = value.lastIndexOf("\n", Math.max(0, caret - 1)) + 1;
      var nextBreak = value.indexOf("\n", caret);
      var lineEnd = nextBreak === -1 ? value.length : nextBreak;
      var line = value.slice(lineStart, lineEnd);
      var beforeCaret = value.slice(0, caret);
      var lineIndex = beforeCaret.split("\n").length - 1;
      var isLineEnd = caret === lineEnd;
      var hasImageMarkdown =
        /!\[[^\]]*\]\([^)\n]+\)/.test(line) || /\[[^\]]+\]\([^)\n]+\)/.test(line);

      activeImageUrlLine = isLineEnd && hasImageMarkdown ? lineIndex : -1;
    }

    function updateEditorDecorations() {
      syncHighlightOverlayLayout();
      updateActiveImageUrlLine();
      updateLineNumbers();
      updateEditorHighlight();
      if (updateActiveBracketPair()) updateEditorHighlight();
    }

    function setLineNumbers(enabled) {
      if (editorRoot) editorRoot.classList.toggle("show-line-numbers", !!enabled);
      if (lineNumbersBtn) lineNumbersBtn.classList.toggle("active", !!enabled);
      localStorage.setItem(draftKey + ":lineNumbers", enabled ? "1" : "0");
      updateEditorDecorations();
    }

    function showToast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.remove("show");
      void toastEl.offsetWidth;
      toastEl.classList.add("show");
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        toastEl.classList.remove("show");
      }, 1400);
    }

    function refreshPreviewIfVisible() {
      if (
        contentArea.classList.contains("mode-preview") ||
        contentArea.classList.contains("mode-split")
      ) {
        renderPreview();
      }
    }

    function flashCopiedState(btn) {
      if (!btn) return;
      if (btn._copiedTimer) clearTimeout(btn._copiedTimer);
      btn.classList.add("is-copied");
      btn._copiedTimer = setTimeout(function () {
        btn.classList.remove("is-copied");
        btn._copiedTimer = null;
      }, 1200);
    }

    function renderPreview() {
      preview.innerHTML = parseMarkdown(textarea.value);

      preview.querySelectorAll(".copy-code").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var preEl = btn.closest("pre");
          var codeEl = preEl ? preEl.querySelector("code") : null;
          var text = codeEl ? codeEl.textContent || "" : "";
          if (!text) return;

          if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard
              .writeText(text)
              .then(function () {
                flashCopiedState(btn);
                showToast("代码已复制");
              })
              .catch(function () {
                showToast("复制失败，请手动复制");
              });
            return;
          }

          var copyInput = document.createElement("textarea");
          copyInput.value = text;
          copyInput.style.position = "fixed";
          copyInput.style.left = "-9999px";
          document.body.appendChild(copyInput);
          copyInput.focus();
          copyInput.select();
          var ok = false;
          try {
            ok = document.execCommand("copy");
          } catch (err) {
            ok = false;
          }
          document.body.removeChild(copyInput);
          if (ok) flashCopiedState(btn);
          showToast(ok ? "代码已复制" : "复制失败，请手动复制");
        });
      });

      preview.querySelectorAll("img").forEach(function (img) {
        var applyFallback = function () {
          if (img.dataset.fallbackApplied === "1") return;
          img.dataset.fallbackApplied = "1";
          img.src = FALLBACK_IMAGE_BASE64;
          img.alt = "图片加载失败";
          img.title = "图片加载失败，已显示默认提示图";
          img.classList.add("img-fallback");
        };

        img.addEventListener("error", applyFallback, { once: true });
        if (!img.getAttribute("src")) {
          applyFallback();
        }
      });
    }

    function pushHistory(force) {
      if (lockHistory) return;
      var text = textarea.value;
      if (!force && historyStack[historyIndex] === text) return;
      if (historyIndex < historyStack.length - 1) {
        historyStack = historyStack.slice(0, historyIndex + 1);
      }
      historyStack.push(text);
      if (historyStack.length > 200) historyStack.shift();
      historyIndex = historyStack.length - 1;
    }

    function setMode(mode) {
      syncPanelHeight(mode);
      if (mode !== "split") lastNonSplitMode = mode;
      tabOptions.forEach(function (tab) {
        tab.classList.toggle("active", tab.getAttribute("data-mode") === mode);
      });
      if (editorRoot) editorRoot.classList.toggle("mode-split-active", mode === "split");
      if (editorRoot)
        editorRoot.classList.toggle("mode-preview-active", mode === "preview");
      contentArea.classList.remove("mode-preview", "mode-split");
      if (mode === "preview") contentArea.classList.add("mode-preview");
      if (mode === "split") contentArea.classList.add("mode-split");
      if (mode === "split") setFullscreen(true);
      if (mode === "preview") setToolbarHidden(true);
      else setToolbarHidden(toolbarHiddenByUser);
      localStorage.setItem(draftKey + ":mode", mode);
      if (mode === "preview" || mode === "split") {
        renderPreview();
      }
      syncPanelHeight(mode);
    }

    function wrapSelection(prefix, suffix, fallback) {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var value = textarea.value;
      var selected = value.slice(start, end) || fallback;
      textarea.value =
        value.slice(0, start) + prefix + selected + suffix + value.slice(end);
      textarea.focus();
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = textarea.selectionStart + selected.length;
      updateEditorDecorations();
      refreshPreviewIfVisible();
      pushHistory(false);
      saveDraft();
    }

    function insertAtCursor(text) {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var value = textarea.value;
      textarea.value = value.slice(0, start) + text + value.slice(end);
      textarea.focus();
      textarea.selectionStart = start + text.length;
      textarea.selectionEnd = textarea.selectionStart;
      updateEditorDecorations();
      refreshPreviewIfVisible();
      pushHistory(false);
      saveDraft();
    }

    function startQuoteBlock() {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var value = textarea.value;
      var selected = value.slice(start, end);
      if (selected) {
        var lines = selected.split(/\r?\n/).map(function (line) {
          return ">" + line;
        });
        textarea.value = value.slice(0, start) + lines.join("\n") + value.slice(end);
        textarea.focus();
        textarea.selectionStart = start;
        textarea.selectionEnd = start + lines.join("\n").length;
        updateEditorDecorations();
        refreshPreviewIfVisible();
        pushHistory(false);
        saveDraft();
        return;
      }
      insertAtCursor(">");
    }

    function handleQuoteEnter(evt) {
      if (evt.key !== "Enter") return;
      if (evt.isComposing) return;
      if (evt.shiftKey || evt.ctrlKey || evt.metaKey || evt.altKey) return;
      if (textarea.selectionStart !== textarea.selectionEnd) return;

      var value = textarea.value;
      var caret = textarea.selectionStart;
      var lineStart = value.lastIndexOf("\n", Math.max(0, caret - 1)) + 1;
      var lineEndIdx = value.indexOf("\n", caret);
      var lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
      var line = value.slice(lineStart, lineEnd);
      if (!/^\s*>\s?/.test(line)) return;

      evt.preventDefault();
      var content = line.replace(/^\s*>\s*/, "").trim();
      if (content === "") {
        insertAtCursor("\n");
        return;
      }
      insertAtCursor("\n>");
    }

    function applyList(isOrdered) {
      var start = textarea.selectionStart;
      var end = textarea.selectionEnd;
      var value = textarea.value;
      var selected = value.slice(start, end) || "列表项";
      var lines = selected.split(/\r?\n/);
      var nextLines = lines.map(function (line, index) {
        var text = line.trim();
        if (text === "") return isOrdered ? String(index + 1) + ". " : "- ";
        return isOrdered ? String(index + 1) + ". " + text : "- " + text;
      });
      var replaced = nextLines.join("\n");
      textarea.value = value.slice(0, start) + replaced + value.slice(end);
      textarea.focus();
      textarea.selectionStart = start;
      textarea.selectionEnd = start + replaced.length;
      updateEditorDecorations();
      refreshPreviewIfVisible();
      pushHistory(false);
      saveDraft();
    }

    function undo() {
      if (historyIndex <= 0) return showToast("没有可撤销内容");
      historyIndex -= 1;
      lockHistory = true;
      textarea.value = historyStack[historyIndex];
      lockHistory = false;
      updateEditorDecorations();
      refreshPreviewIfVisible();
      saveDraft();
    }

    function redo() {
      if (historyIndex >= historyStack.length - 1)
        return showToast("没有可重做内容");
      historyIndex += 1;
      lockHistory = true;
      textarea.value = historyStack[historyIndex];
      lockHistory = false;
      updateEditorDecorations();
      refreshPreviewIfVisible();
      saveDraft();
    }

    function saveDraft() {
      var title = container.querySelector("#mde-title").value;
      var category = container.querySelector("#category").value;
      var rank = container.querySelector("#rank").value;
      localStorage.setItem(
        draftKey,
        JSON.stringify({
          title: title,
          content: textarea.value,
          category: category,
          rank: rank,
        }),
      );
    }

    function loadDraft() {
      try {
        var raw = localStorage.getItem(draftKey);
        if (!raw) return;
        var data = JSON.parse(raw);
        if (!data || typeof data !== "object") return;
        if (typeof data.title === "string")
          container.querySelector("#mde-title").value = data.title;
        if (typeof data.content === "string") textarea.value = data.content;
        if (typeof data.category === "string")
          container.querySelector("#category").value = data.category;
        if (typeof data.rank === "string")
          container.querySelector("#rank").value = data.rank;
      } catch (err) {}
    }

    function insertImage(file, label) {
      if (!file || !/^image\//.test(file.type)) return;
      var reader = new FileReader();
      reader.onload = function (evt) {
        var dataUrl = String((evt.target && evt.target.result) || "");
        if (!dataUrl) return;
        wrapSelection("\n![" + label + "](", ")", dataUrl);
        textarea.value = textarea.value.replace(
          "![" + label + "](文本)",
          "![" + label + "](" + dataUrl + ")",
        );
        updateEditorDecorations();
        refreshPreviewIfVisible();
        saveDraft();
        showToast("图片已插入");
      };
      reader.readAsDataURL(file);
    }

    tabOptions.forEach(function (tab) {
      tab.addEventListener("click", function () {
        syncPanelHeight();
        setMode(tab.getAttribute("data-mode"));
      });
    });

    topButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var action = btn.getAttribute("data-action");
        if (action === "line-numbers") {
          var next = !editorRoot.classList.contains("show-line-numbers");
          setLineNumbers(next);
          return;
        }
        if (action === "toggle-toolbar") {
          if (contentArea.classList.contains("mode-preview")) {
            setToolbarHidden(true);
            return;
          }
          toolbarHiddenByUser = !toolbarHiddenByUser;
          setToolbarHidden(toolbarHiddenByUser);
          return;
        }
        if (action === "fullscreen") {
          var inSplitMode = contentArea.classList.contains("mode-split");
          var isFullscreen = editorRoot.classList.contains("is-fullscreen");
          if (inSplitMode && isFullscreen) {
            setFullscreen(false);
            setMode(lastNonSplitMode || "content");
            return;
          }
          var nextFullscreen = !editorRoot.classList.contains("is-fullscreen");
          setFullscreen(nextFullscreen);
        }
      });
    });

    toolbarButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        restoreSelection();
        var title = btn.title;
        if (title === "加粗") return wrapSelection("**", "**", "加粗文本");
        if (title === "斜体") return wrapSelection("*", "*", "斜体文本");
        if (title === "删除线") return wrapSelection("~~", "~~", "删除线文本");
        if (title === "标题") return wrapSelection("# ", "", "标题");
        if (title === "无序列表") return applyList(false);
        if (title === "有序列表") return applyList(true);
        if (title === "引用") return startQuoteBlock();
        if (title === "链接")
          return wrapSelection("[链接文字](", ")", "https://");
        if (title === "图片") return wrapSelection("![图片描述](", ")", "https://");
        if (title === "代码块")
          return wrapSelection("\n```\n", "\n```\n", "代码");
        if (title === "表格")
          return insertAtCursor("\n|表头A|表头B|\n|---|---|\n|内容A|内容B|\n");
        if (title === "分割线") return wrapSelection("\n---\n", "", "");
        if (title === "撤销") return undo();
        if (title === "重做") return redo();
        if (title === "清空") {
          textarea.value = "";
          updateEditorDecorations();
          refreshPreviewIfVisible();
          pushHistory(false);
          saveDraft();
          return showToast("已清空内容");
        }
      });
    });

    textarea.addEventListener("input", function () {
      rememberSelection();
      updateEditorDecorations();
      refreshPreviewIfVisible();
      pushHistory(false);
      saveDraft();
    });

    textarea.addEventListener("keydown", handleQuoteEnter);
    textarea.addEventListener("scroll", function () {
      syncEditorOverlayScroll();
      scheduleDecorationSync();
    });
    textarea.addEventListener("mousemove", function () {
      if (updateActiveBracketPair()) updateEditorHighlight();
    });
    textarea.addEventListener("click", function () {
      rememberSelection();
      scheduleDecorationSync();
    });
    textarea.addEventListener("mouseup", function () {
      rememberSelection();
      syncPanelHeight();
      scheduleDecorationSync();
    });
    textarea.addEventListener("keyup", function () {
      rememberSelection();
      scheduleDecorationSync();
    });
    textarea.addEventListener("focus", function () {
      rememberSelection();
      scheduleDecorationSync();
    });
    textarea.addEventListener("blur", function () {
      rememberSelection();
      scheduleDecorationSync();
    });
    window.addEventListener("resize", updateEditorDecorations);
    window.addEventListener("resize", syncPanelHeight);

    document.addEventListener("selectionchange", function () {
      if (document.activeElement !== textarea) return;
      rememberSelection();
      scheduleDecorationSync();
    });

    if (window.ResizeObserver) {
      panelResizeObserver = new ResizeObserver(function () {
        syncPanelHeight();
      });
      panelResizeObserver.observe(textarea);
      var editorArea = container.querySelector(".editor-area");
      if (editorArea) panelResizeObserver.observe(editorArea);
    }

    textarea.addEventListener("paste", function (evt) {
      var items = (evt.clipboardData && evt.clipboardData.items) || [];
      for (var i = 0; i < items.length; i += 1) {
        if (items[i].kind === "file") {
          var file = items[i].getAsFile();
          if (file && /^image\//.test(file.type)) {
            evt.preventDefault();
            insertImage(file, "粘贴图片");
            break;
          }
        }
      }
    });

    contentArea.addEventListener("dragover", function (evt) {
      evt.preventDefault();
      contentArea.classList.add("drag-active");
    });
    contentArea.addEventListener("dragleave", function () {
      contentArea.classList.remove("drag-active");
    });
    contentArea.addEventListener("drop", function (evt) {
      evt.preventDefault();
      contentArea.classList.remove("drag-active");
      var files = (evt.dataTransfer && evt.dataTransfer.files) || [];
      for (var i = 0; i < files.length; i += 1) {
        if (/^image\//.test(files[i].type)) insertImage(files[i], "拖拽图片");
      }
    });

    submitBtn.addEventListener("click", function () {
      var data = {
        title: container.querySelector("#mde-title").value.trim(),
        content: textarea.value.trim(),
        category: container.querySelector("#category").value,
        rank: container.querySelector("#rank").value,
      };
      console.log("发布帖子:", data);
      showToast("已输出发布数据到控制台");
    });

    container.querySelector("#mde-title").addEventListener("input", saveDraft);
    container.querySelector("#category").addEventListener("change", saveDraft);
    container.querySelector("#rank").addEventListener("change", saveDraft);

    loadDraft();
    rememberSelection();
    updateEditorDecorations();
    if (toolbarEl) toolbarReservedHeight = Math.ceil(toolbarEl.offsetHeight || 0);
    syncPanelHeight();
    setLineNumbers(localStorage.getItem(draftKey + ":lineNumbers") !== "0");
    setMode(localStorage.getItem(draftKey + ":mode") || "content");
    pushHistory(true);
  }

  var root = document.getElementById("editor");
  if (!root) return;
  syncVisibleViewportHeight();
  window.addEventListener("resize", syncVisibleViewportHeight);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncVisibleViewportHeight);
    window.visualViewport.addEventListener("scroll", syncVisibleViewportHeight);
  }
  renderEditor(root);
  initEditor(root);
})();
