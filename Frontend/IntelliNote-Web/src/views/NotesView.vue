<template>
  <div class="container">
    <div class="editor-preview-container">
      <div class="editor">
        <textarea class="markdown-input" v-model="inputText" placeholder="Enter your Markdown here..." rows="10"></textarea>
        <div class="button-container">
          <button class="clear-button" @click="clearInput">Clear</button>
          <button class="play-button" :class="{ active: speaking }" @click="toggleSpeak">{{ speaking ? 'Pause' : 'Play' }}</button>
          <button class="send-button" :disabled="loading" @click="sendToBackend">{{ loading ? 'Loading...' : 'Translate' }}</button>
          <button class="save-button" @click="saveDocument">Save</button> <!-- 添加保存按钮 -->
        </div>
      </div>
      <div class="preview">
        <div class="preview-placeholder">Preview Area</div>
        <div class="markdown-output" v-html="parsedMarkdown"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputText: '',
      parsedMarkdown: '',
      speaking: false,
      loading: false
    };
  },
  methods: {
    parseMarkdown(input) {
       let parsedText = input;

  // 加粗和斜体
  parsedText = parsedText.replace(/(\*\*|__)(.*?)\1/g, '<b>$2</b>').replace(/(\*|_)(.*?)\1/g, '<i>$2</i>');

  // 删除线
  parsedText = parsedText.replace(/~~(.*?)~~/g, '<del>$1</del>');

  // 标题
  parsedText = parsedText.replace(/(#+)(.*)/g, (_, hashes, content) => `<h${hashes.length}>${content.trim()}</h${hashes.length}>`);

  // 无序列表
  parsedText = parsedText.replace(/^\s*?\* (.*)$/gm, '<li>$1</li>').replace(/^\s*?<li>(.*)<\/li>/gm, '<ul>$1</ul>');

  // 有序列表
  parsedText = parsedText.replace(/^\s*?\d+\. (.*)$/gm, '<li>$1</li>').replace(/^\s*?<li>(.*)<\/li>/gm, '<ol>$1</ol>');

  // 水平线
  parsedText = parsedText.replace(/^-{3,}$/gm, '<hr>');

  // 图片
  parsedText = parsedText.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // 链接
  parsedText = parsedText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // 代码块
  parsedText = parsedText.replace(/```(.*?)\n([\s\S]*?)\n```/g, '<pre><code class="$1">$2</code></pre>');

  // 引用
  parsedText = parsedText.replace(/^\s*>\s(.*)$/gm, '<blockquote>$1</blockquote>');
  
  return parsedText;
    },
    toggleSpeak() {
      if (!this.speaking) {
        this.speakMarkdown();
      } else {
        this.pauseSpeak();
      }
    },
    speakMarkdown() {
      this.speaking = true;
      const utterance = new SpeechSynthesisUtterance(this.parsedMarkdown);
      utterance.onend = () => {
        this.speaking = false;
      };
      window.speechSynthesis.speak(utterance);
    },
    pauseSpeak() {
      window.speechSynthesis.cancel();
      this.speaking = false;
    },
    sendToBackend() {
      if (this.loading) return;
      
      this.loading = true;
      // 模拟请求延时
      setTimeout(() => {
        // 假设请求成功
        console.log('Request successful');
        this.loading = false;
      }, 2000);
    },
    saveDocument() {
      // 保存文档的方法
      // 向后端发送保存请求
      // 请根据实际情况替换以下示例代码
      axios.post('/api/save-document', { markdown: this.inputText })
        .then(response => {
          console.log('Document saved successfully:', response.data);
          // 可以根据后端返回的响应进行进一步处理
        })
        .catch(error => {
          console.error('Error saving document:', error);
          // 处理保存失败的情况
        });
    },
    clearInput() {
      this.inputText = '';
    }
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  color: #333;
  padding: 20px;
}

.editor-preview-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
}

.editor, .preview {
  flex: 1;
  margin: 0 10px;
}

.markdown-input {
  width: 100%;
  min-height: 200px;
  padding: 15px;
  border: 2px solid #5a5a5a;
  background-color: #f9f9f9;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  border-radius: 5px;
  resize: none;
}

.markdown-output {
  width: 100%;
  padding: 15px;
  border: 2px solid #5a5a5a;
  background-color: #f9f9f9;
  color: #333;
  font-family: 'Arial', sans-serif;
  font-size: 18px;
  border-radius: 5px;
  overflow-y: auto; /* 添加滚动条 */
  max-height: 300px; /* 设置最大高度 */
}

.button-container {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

button {
  padding: 12px 24px;
  border-radius: 5px;
  cursor: pointer;
}

.clear-button {
  background-color: #5a5a5a;
  color: #fff;
  border: none;
  margin-right: 10px; /* 添加间距 */
}

.play-button, .send-button {
  background-color: #5a5a5a;
  color: #fff;
  border: none;
  margin-right: 10px; /* 添加间距 */
}

.play-button.active {
  background-color: #e74c3c; /* 播放状态下的颜色 */
}

.send-button:hover {
  background-color: #5a5a5a;
}

.send-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.send-button:hover:disabled {
  background-color:#999;
}

.loading-message {
  margin-top: 10px;
  font-style: italic;
}

.preview-placeholder {
  color: #999;
  font-style: italic;
}

.save-button {
  padding: 12px 24px;
  border-radius: 5px;
  background-color: #5a5a5a;
  color: #fff;
  border: none;
  margin-right: 10px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #444;
}

.save-button:active {
  background-color: #333;
}
</style>