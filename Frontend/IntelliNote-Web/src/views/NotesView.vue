<template>
  <div class="markdown-container">
    <textarea class="markdown-input" v-model="inputText" placeholder="Enter your Markdown here..." rows="10"></textarea>
    <div class="markdown-output" v-html="parsedMarkdown"></div>
    <i class="fas fa-play-circle" @click="speakMarkdown"></i>
    <button class="play-button" @click="speakMarkdown">Play</button>
    <button class="send-button" @click="sendToBackend">Translate</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      parsedMarkdown: ''
    };
  },
  methods: {
    parseMarkdown(input) {
      let parsedText = input;

      // Bold and italic
      parsedText = parsedText.replace(/(\*\*|__)(.*?)\1/g, '<b>$2</b>').replace(/(\*|_)(.*?)\1/g, '<i>$2</i>');

      // Strikethrough
      parsedText = parsedText.replace(/~~(.*?)~~/g, '<del>$1</del>');

      // Headings
      parsedText = parsedText.replace(/(#+)(.*)/g, (_, hashes, content) => `<h${hashes.length}>${content.trim()}</h${hashes.length}>`);

      // Unordered list
      parsedText = parsedText.replace(/^\s*?\* (.*)$/gm, '<li>$1</li>').replace(/^\s*?<li>(.*)<\/li>/gm, '<ul>$1</ul>');

      // Ordered list
      parsedText = parsedText.replace(/^\s*?\d+\. (.*)$/gm, '<li>$1</li>').replace(/^\s*?<li>(.*)<\/li>/gm, '<ol>$1</ol>');

      // Horizontal line
      parsedText = parsedText.replace(/^-{3,}$/gm, '<hr>');

      // Images
      parsedText = parsedText.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

      // Links
      parsedText = parsedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

      // Code block
      parsedText = parsedText.replace(/```(.*?)\n([\s\S]*?)\n```/g, '<pre><code class="$1">$2</code></pre>');

      // Blockquote
      parsedText = parsedText.replace(/^\s*>\s(.*)$/gm, '<blockquote>$1</blockquote>');

      return parsedText;
    },
    speakMarkdown() {
      // 创建朗读实例
      const utterance = new SpeechSynthesisUtterance(this.parsedMarkdown);
      // 开始朗读
      window.speechSynthesis.speak(utterance);
    }
  },
  sendToBackend() {
      // 发送请求到后端
      // 请替换以下代码为实际发送请求的逻辑
      // 假设您使用的是 axios 库
      axios.post('/your/backend/endpoint', { html: this.parsedMarkdown })
        .then(response => {
          // 处理后端响应
          console.log(response.data);
        })
        .catch(error => {
          // 处理错误
          console.error('Error sending request:', error);
        });
    },
  watch: {
    inputText(newInput) {
      this.parsedMarkdown = this.parseMarkdown(newInput);
    }
  }
};
</script>

<style scoped>
/* Add CSS styles for the component */
</style>


<style scoped>
/* Add CSS styles for the component */
.markdown-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #333;
  padding: 20px;
}

.markdown-input {
  width: 100%;
  height: 200px;
  padding: 15px;
  border: 2px solid #6c6;
  background-color: #f9f9f9;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  margin-bottom: 20px;
}

.markdown-output {
  width: 100%;
  padding: 15px;
  border: 2px solid #6c6;
  background-color: #f9f9f9;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
}

pre {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
}

blockquote {
  background-color: #f0f0f0;
  border-left: 4px solid #ccc;
  padding: 10px;
  margin-left: 0;
}

.play-button, .send-button {
  padding: 12px 24px;
  background-color: #6c6;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 20px
}

.play-button:hover, .send-button:hover {
  background-color: #f0f0f0;
}
</style>
