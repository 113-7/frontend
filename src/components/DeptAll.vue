
<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Fu Jen Catholic University</h4>
              <h2 id="cla">輔大轉系生資訊平台 | 各學系轉系資訊</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <SearchBar :departments="departments" />
  <!-- Banner Ends Here -->

  <section class="about-us">
    <div class="card-container">
      <div class="card">
        <section tabindex="-1" class="jkb">
          <h3>文學院</h3>
          <div class="link-list" id="cehs">
            <a
              v-for="departments in getDepartmentsByCollege('文學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card">
        <section tabindex="-1" class="jkb">
          <h3>藝術學院</h3>
          <div class="link-list" id="med">
            <a
              v-for="departments in getDepartmentsByCollege('藝術學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card">
        <section tabindex="-1" class="jkb">
          <h3>傳播學院</h3>
          <div class="link-list" id="cse">
            <a
              v-for="departments in getDepartmentsByCollege('傳播學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>

      <div class="card" style="height: 520px">
        <section id="med" tabindex="-1" class="jkb">
          <h3>醫學院</h3>
          <div class="link-list" id="che">
            <a
              v-for="departments in getDepartmentsByCollege('醫學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card" style="height: 520px">
        <section id="cse" tabindex="-1" class="jkb">
          <h3>理工學院</h3>
          <div class="link-list" id="law">
            <a
              v-for="departments in getDepartmentsByCollege('理工學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card" style="height: 520px">
        <section id="cfll" tabindex="-1" class="jkb">
          <h3>外國語文學院</h3>
          <div class="link-list" id="css">
            <a
              v-for="departments in getDepartmentsByCollege('外國語文學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card" style="height: 350px">
        <section id="che" tabindex="-1" class="jkb">
          <h3>民生學院</h3>
          <div class="link-list" id="com">
            <a
              v-for="departments in getDepartmentsByCollege('民生學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card" style="height: 350px">
        <section id="law" tabindex="-1" class="jkb">
          <h3>法律學院</h3>
          <div class="link-list" id="ctc">
            <a
              v-for="departments in getDepartmentsByCollege('法律學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card" style="height: 350px">
        <section id="css" tabindex="-1" class="jkb">
          <h3>社會科學院</h3>
          <div class="link-list">
            <a
              v-for="departments in getDepartmentsByCollege('社會科學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card">
        <section id="com" tabindex="-1" class="jkb">
          <h3>管理學院</h3>
          <div class="link-list">
            <a
              v-for="departments in getDepartmentsByCollege('管理學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
      <div class="card">
        <section id="ctc" tabindex="-1" class="jkb">
          <h3>織品服裝學院</h3>
          <div class="link-list">
            <a
              v-for="departments in getDepartmentsByCollege('織品服裝學院')"
              :key="departments.id"
            >
              <router-link
                :to="'/DeptDetail/' + departments.department_id"
                class="dept-link"
              >
                {{ departments.name }}
                <!--<span v-if="favorites.includes(departments.department_id.toString())" class="heart">❤️</span>-->
              </router-link>
            </a>
          </div>
        </section>
      </div>
    </div>
  </section>

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
import "../assets/css/fontawesome.css";
import "../assets/css/templatemo-stand-blog.css";
import "../assets/css/owl.css";
import SearchBar from "../components/SearchBar.vue";

export default {
  components: {
    SearchBar, //把搜尋欄元件加進來
  },
  data() {
    return {
      faculty: "",
      grade: "",
      test: "",
      keyword: "",
      departments: [],
      searchResults: [],
      favorites: [],
    };
  },
  mounted() {
    require("../assets/js/custom.js");
    require("../assets/js/owl.js");
    require("../assets/js/slick.js");
    require("../assets/js/isotope.js");
    require("../assets/js/accordions.js");

    //這個功能先拿掉了
    //this.favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    fetch("http://localhost/SA/department_all.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("後端資料:", data);
        // 確保獲取到正確的資料
        this.departments = data; 
      })
      .catch((error) => console.error("錯誤:", error));
  },

  methods: {
    // 根據學院名稱過濾學系
    getDepartmentsByCollege(collegeName) {
      return this.departments.filter((d) => d.faculty === collegeName);
    },
  },
};
</script>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";

// 使用 Vue Router 的 useRoute 來獲取網址內的學院參數
const route = useRoute();

onMounted(() => {
  console.log("當前 URL 參數：", route.query.scrollTo);

  // 延遲 0.5秒 確保 DOM 生成完畢
  setTimeout(() => {
    if (route.query.scrollTo) {
      //抓取html元素的 ID 並滾動到該元素
      const targetElement = document.getElementById(route.query.scrollTo);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      } else {
        console.warn("找不到 ID：" + route.query.scrollTo);
      }
    }
  }, 500);
});
</script>


<style scoped>
.card {
  border-radius: 20px;
}
.card h3 {
  font-size: 31px;
}
.exam-and-keyword {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  justify-content: center;
}

.dept-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 18px;
  font-weight: 500;
}

.heart {
  font-size: 16px;
  color: red;
}
</style>