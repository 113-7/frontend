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
          :value="dept.name"
        >
          {{ dept.name }}
        </option>
      </select>

      <select v-model="selectedGrade">
        <option value="">選擇有名額的年級</option>
        <option value="second_year_quota">二年級</option>
        <option value="third_year_quota">三年級</option>
        <option value="fourth_year_quota">四年級</option></select
      ><br />

      <div class="exam-and-keyword">
        <div class="exam-options">
          筆試
          <label
            class="custom-checkbox"
            :class="{
              checked: examStates.written === 'yes',
              crossed: examStates.written === 'no',
            }"
            @click="toggleState('written')"
          ></label>
          口試
          <label
            class="custom-checkbox"
            :class="{
              checked: examStates.oral === 'yes',
              crossed: examStates.oral === 'no',
            }"
            @click="toggleState('oral')"
          ></label>
          資料審查
          <label
            class="custom-checkbox"
            :class="{
              checked: examStates.review === 'yes',
              crossed: examStates.review === 'no',
            }"
            @click="toggleState('review')"
          ></label>
        </div>

        <input
          type="text"
          v-model="keyword"
          placeholder="輸入關鍵字"
          class="search-input"
        />
        <button class="submit-btn" @click="filterDepartments">搜尋</button>
        <button class="btn btn-warning" @click="closeDeptTable">
          關閉搜尋欄
        </button>
      </div>
    </div>

    <div class="result-list" v-if="filtered.length">
      <!--原始搜尋結果
      <ul>
        <li v-for="dept in filtered" :key="dept.department_id">
          <router-link :to="`/DeptDetail/${dept.department_id}`">{{
            dept.name
          }}</router-link>
        </li>
      </ul>-->
      <!--表格式搜尋結果-->
      <section>
        <div class="cont2">
          <h2 style="text-align: center">查詢結果</h2>
          <br />
          <table style="width: 100%; border-collapse: collapse">
            <thead>
              <tr>
                <th style="width: 8%">學院</th>
                <th style="width: 10%">學系</th>
                <th style="width: 8%">二年級名額</th>
                <th style="width: 8%">三年級名額</th>
                <th style="width: 8%">四年級名額</th>
                <th style="width: 8%">筆試</th>
                <th style="width: 8%">口試</th>
                <th style="width: 10%">資料審查</th>
                <th style="width: 32%">備註</th>
              </tr>
            </thead>
            <tbody id="result-table">
              <tr
                v-for="dept in filtered"
                :key="dept.department_id"
                @click="goToDetail(dept.department_id)"
                style="cursor: pointer"
              >
                <td>{{ dept.faculty }}</td>
                <td>
                  <b>{{ dept.name }}</b>
                </td>
                <td>{{ dept.second_year_quota }}人</td>
                <td>{{ dept.third_year_quota }}人</td>
                <td>{{ dept.fourth_year_quota }}人</td>
                <td>
                  {{ parseFloat(dept.written_exam_weight) > 0 ? "有" : "無" }}
                </td>
                <td>
                  {{ parseFloat(dept.interview_weight) > 0 ? "有" : "無" }}
                </td>
                <td>{{ parseFloat(dept.review_weight) > 0 ? "有" : "無" }}</td>
                <td>
                  <div class="note-cell">
                    <span class="clamp-text">{{ dept.additional_notes }}</span>
                    <span
                      v-if="isOverflow(dept.additional_notes)"
                      class="more-link"
                      @click.stop="showFullNote(dept.additional_notes)"
                    >
                      查看更多
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div v-else style="text-align: center; margin-top: 20px">
      <p
        v-if="hasSearched && filtered.length === 0"
        style="text-align: center; margin-top: 20px"
      >
        沒有符合的資料
      </p>
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
      selectedGrade: "",
      selectedDept: "",
      selectedExam: [],
      keyword: "",
      filtered: [],
      hasSearched: false,
      examStates: {
        written: "none", // 'none' | 'yes' | 'no'
        oral: "none",
        review: "none",
      },
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
    toggleState(type) {
      if (this.examStates[type] === "none") {
        this.examStates[type] = "yes";
      } else if (this.examStates[type] === "yes") {
        this.examStates[type] = "no";
      } else {
        this.examStates[type] = "none";
      }
    },
    filterDepartments() {
      this.hasSearched = true;
      this.filtered = this.departments.filter((dept) => {
        const matchesCollege =
          !this.selectedCollege || dept.faculty === this.selectedCollege;
        const matchesGrade =
          !this.selectedGrade || parseInt(dept[this.selectedGrade]) > 0;
        const matchesDept =
          !this.selectedDept || dept.name === this.selectedDept;

        const examCheck = {
          written: parseFloat(dept.written_exam_weight) > 0,
          oral: parseFloat(dept.interview_weight) > 0,
          review: parseFloat(dept.review_weight) > 0,
        };

        const matchesExam =
          (this.examStates.written === "none" ||
            (this.examStates.written === "yes" && examCheck.written) ||
            (this.examStates.written === "no" && !examCheck.written)) &&
          (this.examStates.oral === "none" ||
            (this.examStates.oral === "yes" && examCheck.oral) ||
            (this.examStates.oral === "no" && !examCheck.oral)) &&
          (this.examStates.review === "none" ||
            (this.examStates.review === "yes" && examCheck.review) ||
            (this.examStates.review === "no" && !examCheck.review));
        const keyword = this.keyword.trim();
        const matchesKeyword = Object.values(dept).some((value) =>
          String(value).includes(keyword)
        );

        return (
          matchesCollege &&
          matchesGrade &&
          matchesExam &&
          matchesKeyword &&
          matchesDept
        );
      });
    },
    goToDetail(departmentId) {
      this.$router.push(`/DeptDetail/${departmentId}`);
    },
    isOverflow(text) {
      // 保守估算：中文每行大約 15 字
      return text.length > 32;
    },
    showFullNote(text) {
      alert(text); // 或用 Modal 顯示
    },
    closeDeptTable() {
      this.filtered = [];
      this.selectedCollege = "";
      this.selectedGrade = "";
      this.selectedDept = "";
      this.keyword = "";
      this.examStates = {
        written: "none",
        oral: "none",
        review: "none",
      };
      this.selectedExam = [];
      this.hasSearched = false;
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
  border: 1px solid #ccc;
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
  color: #0077cc;
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
</style>
