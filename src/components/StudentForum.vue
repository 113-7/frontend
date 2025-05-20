<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Fu Jen Catholic University</h4>
              <h2>學生討論區</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="search-panel">
    <div class="search-card">
      <select v-model="selectedCollege">
        <option value="">選擇學院</option>
        <option v-for="college in allColleges" :key="college">
          {{ college }}
        </option>
      </select>

      <select v-model="selectedDept">
        <option value="">選擇學系</option>
        <option
          v-for="dept in departmentsFilteredByCollege"
          :key="dept.department_id"
          :value="dept.name"
        >
          {{ dept.name }}
        </option>
      </select>
      <select v-model="selectedTag">
        <option value="">選擇標籤</option>
        <option v-for="commonTags in commonTags" :key="commonTags">
          {{ commonTags }}
        </option>
      </select>

      <input
        type="text"
        v-model="keyword"
        placeholder="輸入關鍵字"
        class="search-input"
      />
      <button class="submit-btn" @click="filterDepartments">搜尋</button>
    </div>
  </div>
  <!-- 討論區內容 -->
  <div class="forum-box-wrapper">
    <div class="forum-box">
      <div class="forum-container forum-main">
        <!-- 左邊：留言們 -->
        <div class="forum-left">
          <!-- 所有留言 -->
          <div class="popular-section">
            <h3>所有留言</h3>
            <div
              v-for="post in paginatedPosts"
              :key="post.id"
              class="post-card"
            >
              <p class="post-title">{{post.id}}</p>
              <p class="post-meta">{{ formatDate(post.created_at) }}</p>
              <p class="post-content">{{ post.content }}</p>
              <div class="tag-box">
                <span v-for="tag in post.tags" :key="tag" class="tag"
                  >#{{ tag }}</span
                >
              </div>
            </div>
          </div>

          <!-- 分頁 -->
          <div class="pagination">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </button>
          </div>
        </div>

        <!-- 右邊：發表留言 -->
        <div class="forum-right post-form">
          <h3>📝 發表留言</h3>
          <textarea
            v-model="newPost.content"
            class="input-area"
            placeholder="分享你的想法... 可使用 #hashtag"
          ></textarea>
          <br />

          <div class="hashtag-select">
            <span
              v-for="tag in commonTags"
              :key="tag"
              :class="['tag', selectedTags.includes(tag) ? 'selected-tag' : '']"
              @click="toggleTag(tag)"
            >
              #{{ tag }}
            </span>
          </div>
          <button class="submit-btn" @click="submitPost">發表</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedCollege: "",
      selectedDept: "",
      selectedTag: "",
      keyword: "",
      newPost: { content: "" },
      selectedTags: [],
      posts: [],
      commonTags: [
        "資料審查",
        "面試",
        "筆試",
        "成績",
        "課程",
        "分享",
        "問題",
        "經驗",
        "建議",
        "心得",
        "其他",
      ],
      currentPage: 1,
      pageSize: 10,
      departments: [],
    };
  },
  computed: {
    allColleges() {
      const set = new Set(this.departments.map((d) => d.faculty));
      return [...set];
    },
    departmentsFilteredByCollege() {
      if (!this.selectedCollege) return this.departments;
      return this.departments.filter((d) => d.faculty === this.selectedCollege);
    },
    popularPosts() {
      return [...this.posts].slice(0, 3);
    },
    totalPages() {
      return Math.ceil(this.posts.length / this.pageSize);
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.posts.slice(start, start + this.pageSize);
    },
  },
  mounted() {
    this.loadPosts();
    fetch("http://localhost/SA/department_all.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("後端資料:", data);
        this.departments = data; // 確保獲取到正確的資料
      })
      .catch((error) => console.error("錯誤:", error));
  },

  methods: {

    formatDate(ts) {
      return new Date(ts).toLocaleString();
    },
    loadPosts() {
      this.posts = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        content: `這是第 ${i + 1} 則留言內容 #範例`,
        created_at: Date.now() - i * 1000000,
        tags: ["範例"],
      }));
    },
    toggleTag(tag) {
      const idx = this.selectedTags.indexOf(tag);
      if (idx >= 0) this.selectedTags.splice(idx, 1);
      else this.selectedTags.push(tag);
    },
    submitPost() {
      const content = this.newPost.content.trim();
      if (!content) return;
      const newTags = [...this.selectedTags];
      this.posts.unshift({
        id: Date.now(),
        content,
        tags: newTags,
        created_at: Date.now(),
      });
      this.newPost.content = "";
      this.selectedTags = [];
    },
    filterDepartments() {
      // reserved for filtering
    },
  },
};
</script>

<style scoped>
.sticky-search-bar {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
.section-title {
  text-align: center;
  font-size: 1.8rem;
  margin: 40px 0 20px;
}
.search-card select,
.search-card input {
  padding: 10px;
  margin-right: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.submit-btn {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}
.forum-container {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}
.forum-main {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.forum-left {
  flex: 3;
  min-width: 60%;
}

.forum-right {
  flex: 1;
  min-width: 300px;
  border-left: 1px solid #ccc;
  padding-left: 20px;
}
.input-area {
  color: #999;
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
}
.hashtag-select .tag {
  background-color: #eee;
  color: #777;
  margin-right: 6px;
  margin-bottom: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  display: inline-block;
  cursor: pointer;
}
.hashtag-select .selected-tag {
  background-color: #ff8000;
  color: white;
}
.post-card {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
}
.post-meta {
  font-size: 0.75rem;
  color: #777;
}
.tag-box {
  margin-top: 10px;
}
.tag-box .tag {
  background-color: rgb(244, 142, 53);
  color: rgb(255, 255, 255);
  padding: 4px 8px;
  border-radius: 8px;
  margin-right: 5px;
  font-size: 0.9rem;
  display: inline-block;
}
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 30px 0;
}
.pagination button {
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
}
.pagination .active {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}
.forum-box-wrapper {
  display: flex;
  justify-content: center;
}
.forum-box {
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.search-panel {
  max-width: 1100px;
  margin: 40px auto;
}
.search-card {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: center;
  align-items: center;
}

.search-card select,
.search-card input[type="text"] {
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ffffff;
  width: 220px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.exam-and-keyword {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  justify-content: center;
}
.search-input {
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>
