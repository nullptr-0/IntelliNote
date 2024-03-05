<template>
    <div class="notes">
        <h1>This is the notes page</h1>
    </div>
</template>

<style>
    .notes {
        display: flex;
        align-items: center;
    }
</style>


/**
<body>
    <div class="markdown-input">
         <!-- 设置用户输入的文本框 -->
        <textarea id="input" placeholder="Enter your Markdown here..."></textarea>
        <!-- 设置预览markdown输出的文本框 -->
        <div id="output" class="markdown-output"></div>
    </div>
    <script>
        // 获取文本域中的输入的字符
        const inputElement = document.getElementById('input');
        // 获取预览markdown输出的文字
const outputElement = document.getElementById('output');
// 函数：markdown输入规则算法
function parseMarkdown(input) {
    // 斜体
    const italicRegex = /(\*{1})([^\*]+)\1/g;
    // 黑体、粗体
    const boldRegex = /(\*{2})([^\*]+)\1/g;
    // 黑、斜体   
    const boldItalicRegex = /(\*{3})([^\*]+)\1/g;
    // 删除线
    const strikethroughRegex = /(\~{2})([^~]+)\1/g;
    // 标题
    const headingRegex = /(#{1,6})\s*([^#\n]+)/g;
    // 无序列表
    const unorderedListRegex = /(\*\s+)([^\*\n]+)/g;
    // 水平线
    const horizontalLineRegex = /-{3,}/g;
    // 图片
    const imageRegex = /\!\[([^\]]+)\]\(([^)]+)\)/g;
    // 链接
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;


    // 调用函数 parseMarkdown的对象input
    const parsedText = input
    //通过replace去替换输入的内容，用h5标签去替换
        .replace(italicRegex, '<i>$2</i>')
        .replace(boldItalicRegex, '<b><i>$2</i></b>')
        .replace(boldRegex, '<b>$2</b>')
        .replace(strikethroughRegex, '<del>$2</del>')
        .replace(headingRegex, (_, level, content) => `<h${level.length}>${content}</h${level.length}>`)
        .replace(unorderedListRegex, '<li>$2</li>')
        .replace(horizontalLineRegex, '<hr>')
        .replace(imageRegex, '<img src="$2" alt="$1">')
        .replace(linkRegex, '<a href="$2">$1</a>');
        // 返回预览框
    return parsedText;
}
// 事件：用户输入文字后解析
inputElement.addEventListener('input', () => {
    const inputValue = inputElement.value;
    const parsedValue = parseMarkdown(inputValue);
    // 输出的文字皆为经过解析后所得
    outputElement.innerHTML = parsedValue;
});

    </script>
</body>
**/