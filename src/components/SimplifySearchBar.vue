<template>
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
          :value="dept.department_id"
        >
          {{ dept.name }}
        </option></select
      ><br />

      <div class="exam-and-keyword">
        <button class="submit-btn" @click="fetchAnnouncements">查詢公告</button>
      </div>
    </div>

    <div class="result-list" v-if="announcements.length">
      <section>
        <div class="container mt-4">
          <h2 class="text-center mb-4 text-primary">公告列表查詢結果</h2>

          <div class="table-container">
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th style="width: 20%">標題</th>
                    <th style="width: 20%">發布時間</th>
                    <th style="width: 60%">內容</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(a, index) in announcements"
                    :key="index"
                    @click="goToDetail(a.announcement_id)"
                  >
                    <td>
                      <strong>{{ a.title }}</strong>
                    </td>
                    <td>{{ a.created_at }}</td>
                    <td>{{ a.content }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else-if="hasSearched" style="text-align: center; margin-top: 20px">
      沒有公告資料
    </div>
  </div>
</template>


<script>
export default {
  name: "SearchPanel",
  props: {
    departments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedCollege: "",
      selectedDept: "",
      announcements: [],
      hasSearched: false,
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
  },
  methods: {
    async fetchAnnouncements() {
      this.hasSearched = true;
      if (!this.selectedCollege || !this.selectedDept) {
        alert("學院和學系都要選擇");
        this.announcements = [];
        return;
      }

      try {
        const response = await fetch(
          `http://localhost/SA/announcements.php?department=${encodeURIComponent(
            this.selectedDept
          )}`
        );
        if (!response.ok) throw new Error("伺服器錯誤");

        const data = await response.json();
        this.announcements = data;
      } catch (error) {
        console.error("取得公告失敗：", error);
        this.announcements = [];
      }
    },
    goToDetail(announcement_id) {
      this.$router.push(`/AnnouncementDetail/${announcement_id}`);
    },
  },
};
</script>


<style scoped>
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
.exam-options {
  display: flex;
  gap: 15px;
}
.exam-options label {
  font-size: 18px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
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
  border: 1px solid #ffffff;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.submit-btn {
  background-color: #007bff;
  font-size: 16px;
  color: white;
  padding: 10px 24px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #0056b3;
}
.result-list {
  margin-top: 40px;
  text-align: center;
}
.result-list ul {
  list-style: none;
  padding: 0;
}
.result-list li {
  margin: 10px 0;
}
.result-list a {
  color: #000000;
  font-weight: bold;
  font-size: 18px;
  text-decoration: none;
}
.result-list a:hover {
  text-decoration: underline;
}

/*控制備註大小寬度跑查看更多的地方*/
.note-cell {
  position: relative;
  max-width: 100%;
  line-height: 1.5;
}

.clamp-text {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: normal;
}

.more-link {
  position: absolute;
  bottom: 0;
  right: 0;
  background: white;
  font-size: 14px;
  color: rgb(236, 150, 12);
  cursor: pointer;
  padding-left: 4px;
  font-weight: bold;
}
.custom-checkbox {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid #ccc;
  background-color: #f8f8f8;
  color: transparent;
  text-align: center;
  line-height: 20px;
  font-size: 20px;
  transition: all 0.2s;
  cursor: pointer;
  margin-top: 2px;
  margin-left: -5px;
}

/* ✔ */
.custom-checkbox.checked {
  background-color: #2ecc71;
  color: white;
}
.custom-checkbox.checked::before {
  content: "✔";
}

/* × */
.custom-checkbox.crossed {
  background-color: #e74c3c;
  color: white;
}
.custom-checkbox.crossed::before {
  content: "×";
}
.table-container {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
}

.table {
  border-radius: 15px;
  overflow: hidden;
}

.table th {
  background-color: #fd7e14 !important;
  color: white;
  text-align: center;
}

.table td,
.table th {
  vertical-align: middle;
  border: 1px solid #e3e3e3;
}

.table td {
  background-color: white;
}
</style>
