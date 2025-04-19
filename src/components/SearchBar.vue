<template>
  <div class="search-panel">
    <div class="search-card">
      <select v-model="selectedCollege">
        <option value="">選擇學院</option>
        <option v-for="college in allColleges" :key="college">{{ college }}</option>
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
        <option value="fourth_year_quota">四年級</option>
        <option value="fourth_year_quota">四年級</option>
      </select><br>

    <div class="exam-and-keyword">
      <div class="exam-options">
        <label><input type="checkbox" value="筆試" v-model="selectedExam" /> 筆試</label>
        <label><input type="checkbox" value="口試" v-model="selectedExam" /> 口試</label>
        <label><input type="checkbox" value="資料審查" v-model="selectedExam" /> 資料審查</label>
      </div>

      <input type="text" v-model="keyword" placeholder="輸入關鍵字" class="search-input" />
      <button class="submit-btn" @click="filterDepartments">搜尋</button>
    </div></div>

    <div class="result-list" v-if="filtered.length">
      <ul>
        <li v-for="dept in filtered" :key="dept.department_id">
          <router-link :to="`/DeptDetail/${dept.department_id}`">{{ dept.name }}</router-link>
        </li>
      </ul>
    </div>
    <p v-else style="text-align: center; margin-top: 20px;">沒有符合的資料</p>
  </div>
</template>

<script>
export default {
  name: "SearchPanel",
  props: {
    departments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedCollege: "",
      selectedGrade: "",
      selectedDept: '',
      selectedExam: [],
      keyword: "",
      filtered: []
    };
  },
  computed: {
  allColleges() {
    const set = new Set(this.departments.map(d => d.faculty));
    return [...set];
  },
  departmentsFilteredByCollege() {
    if (!this.selectedCollege) return this.departments;
    return this.departments.filter(d => d.faculty === this.selectedCollege);
  }
}
  
  ,
  methods: {
    filterDepartments() {
      this.filtered = this.departments.filter(dept => {
        const matchesCollege = !this.selectedCollege || dept.faculty === this.selectedCollege;
        const matchesGrade = !this.selectedGrade || parseInt(dept[this.selectedGrade]) > 0;
        const matchesDept = !this.selectedDept || dept.name === this.selectedDept;


        const examTypes = [];
        if (parseFloat(dept.written_exam_weight) > 0) examTypes.push("筆試");
        if (parseFloat(dept.interview_weight) > 0) examTypes.push("口試");
        if (parseFloat(dept.review_weight) > 0) examTypes.push("資料審查");

        const matchesExam = this.selectedExam.every(e => examTypes.includes(e));
        const matchesKeyword = dept.name.includes(this.keyword.trim());

        return matchesCollege && matchesGrade && matchesExam && matchesKeyword && matchesDept;

      });
    }
  }
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
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
</style>
