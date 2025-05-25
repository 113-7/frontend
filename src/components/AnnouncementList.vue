<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Fu Jen Catholic University</h4>
              <h2>相關公告</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div class="container">
    <h2 class="text-center my-4"><b>114轉系申請時間線</b></h2>
    <ul class="timeline">
      <li class="timeline-item" data-date="2025-03-24">
        <div class="date">申請開始</div>
        <p>3月24日 8:00 開始</p>
      </li>
      <li class="timeline-item" data-date="2025-03-26">
        <div class="date">申請結束</div>
        <p>3月26日 22:00 結束</p>
      </li>
      <li class="timeline-item" data-date="2025-03-27">
        <div class="date">筆試/面試開始</div>
        <p>4月/請參閱各系公告和通知</p>
      </li>
      <li class="timeline-item" data-date="2025-04-30">
        <div class="date">筆試/面試結束</div>
        <p>4月/請參閱各系公告和通知</p>
      </li>
      <li class="timeline-item" data-date="2025-05-12">
        <div class="date">公告名單</div>
        <p>5月12日 公告結果</p>
      </li>
    </ul>
  </div>
  
  <SimplifySearchBar :departments="departments" />

  <hr class="custom-hr2" />
  <div class="container mt-5 pt-5">
    <h2 class="text-center my-4"><b>📢 最新公告</b></h2>
    <div
      v-for="item in announcements"
      :key="item.id"
      class="card mb-2 shadow-sm announcement-card"
    >
      <div class="card-body p-3 mr-auto">
        <h6 class="card-title mb-1 text-start">{{ item.title }}</h6>
        <small class="text-muted d-block text-start mb-1">
          {{ formatDate(item.created_at) }}
          <span v-if="item.department_name">｜{{ item.department_name }}</span>
        </small>
        <p class="card-text excerpt text-start mb-2">
          {{ item.content }}
        </p>
        <div class="text-end">
          <router-link
            :to="`/AnnouncementDetail/${item.announcement_id}`"
            class="btn btn-sm btn-outline-primary"
          >
            查看更多
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="copyright-text">
            <p>
              242062 新北市新莊區中正路510號 | (02) 29052000 |
              pubwww@mail.fju.edu.tw
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import SimplifySearchBar from "./SimplifySearchBar.vue";
export default {
  components: {
    SimplifySearchBar
  },
  data() {
    return {
      announcements: [],
      departments: [],
    };
  },
  mounted() {
    this.updateTimelineStatus();
    fetch("/api/SA/announcements.php")
      .then((res) => res.json())
      .then((data) => (this.announcements = data));
    fetch("http://localhost/SA/department_all.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("後端資料:", data);
        this.departments = data; // 確保獲取到正確的資料
      })
      .catch((error) => console.error("錯誤:", error));
    
  },
  methods: {
    //把後端created_at時間轉換成年/月/日模式
    formatDate(dateStr) {
      return new Date(dateStr).toLocaleDateString();
    },

    updateTimelineStatus() {
      const timelineItems = document.querySelectorAll(".timeline-item");
      const currentDate = new Date();

      // 使用 requestAnimationFrame 來分散 DOM 操作，減少阻塞
      const updateItemStatus = (index) => {
        if (index >= timelineItems.length) return; // 防止越界

        const item = timelineItems[index];
        const itemDate = new Date(item.getAttribute("data-date"));

        if (itemDate < currentDate) {
          item.classList.add("completed");
        } else if (itemDate > currentDate) {
          item.classList.add("future");
        } else {
          item.classList.add("active");
        }

        // 使用 requestAnimationFrame 分散處理
        requestAnimationFrame(() => updateItemStatus(index + 1));
      };

      // 開始處理
      updateItemStatus(0);
    },
  },
};
</script>

<style scoped>
.timeline {
  display: flex;
  justify-content: space-between;
  position: relative;
  padding: 20px 0;
  margin: 0;
  list-style: none;
  overflow: hidden;
}

.timeline-item {
  width: 20%;
  text-align: center;
  position: relative;
}

.timeline-item .date {
  background-color: #ccc;
  padding: 5px 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  font-weight: bold;
}

.timeline-item.active .date {
  background-color: #007bff;
  color: white;
}

.timeline-item.completed .date {
  background-color: rgb(237, 146, 27);
  color: white;
}

.timeline-item.future .date {
  background-color: grey;
  color: white;
}

.timeline-item:before {
  content: "";
  position: absolute;
  top: 20px;
  left: 50%;
  width: 2px;
  height: 100%;
  z-index: -1;
}

.timeline-item:first-child:before {
  display: none;
}
.card {
  /* 讓卡片的高度自動調整 */
  height: auto;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 保證從上方對齊 */
  align-items: flex-start; /* 保證左對齊 */
  padding: 1rem; /* 可以根據需求調整內邊距 */
  min-height: 100px; /* 設置最小高度，避免內容過少時空間過大 */
}

.card-title,
.card-text,
small {
  text-align: left !important;
}

.announcement-card {
  border-radius: 10px;
  font-size: 0.9rem;
  text-align: left !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 保證內容垂直方向上對齊 */
  height: auto; /* 讓卡片高度自適應 */
}

.excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 顯示 2 行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3rem;
  max-height: 2.6rem;
  text-align: left !important;
}
.custom-hr2 {
  border: 0.5px solid;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}
</style>
