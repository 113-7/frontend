<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Fu Jen Catholic University</h4>
              <h2>輔大轉系生資訊平台 | 各學系轉系資訊</h2>
              <h2>{{ detail[0]?.name }}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Banner Ends Here -->
  <section class="about-us">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h2 style="font-size: 30px; margin-top: -30px">
            <b>{{ detail[0]?.name }}</b>
          </h2>
          <div v-if="loggedIn == true">
            <button class="favorite-btn" @click="toggleFavorite">
              <span v-if="isFavorited">❤️</span>
              <span v-else>🤍</span>
            </button>
          </div>

          <p></p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <h2><b>114年轉系資訊</b></h2>
          <p>
            輔仁大學 114
            學年度日間學士班招收轉系生各系級組年級、考試科目及名額一覽表
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <h2>學院</h2>
          <p style="font-size: 20px">{{ detail[0]?.faculty }}</p>
        </div>
        <div class="col-lg-4 col-md-6">
          <h2>年級</h2>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].second_year_quota !== '0'"
          >
            二年級
          </p>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].third_year_quota !== '0'"
          >
            三年級
          </p>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].fourth_year_quota !== '0'"
          >
            四年級
          </p>
        </div>
        <div class="col-lg-4 col-md-6">
          <h2>預定招收名額</h2>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].second_year_quota !== '0'"
          >
            {{ detail[0]?.second_year_quota }}
          </p>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].third_year_quota !== '0'"
          >
            {{ detail[0]?.third_year_quota }}
          </p>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].fourth_year_quota !== '0'"
          >
            {{ detail[0]?.fourth_year_quota }}
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-4 col-md-6">
          <h2>筆試</h2>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].written_exam_weight !== '0'"
          >
            有/{{ detail[0]?.written_exam_weight }}%
          </p>
          <p style="font-size: 20px" v-else>無</p>
        </div>
        <div class="col-lg-4 col-md-6">
          <h2>口試</h2>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].interview_weight !== '0'"
          >
            有/{{ detail[0]?.interview_weight }}%
          </p>
          <p style="font-size: 20px" v-else>無</p>
        </div>
        <div class="col-lg-4 col-md-6">
          <h2>資料審查</h2>
          <p
            style="font-size: 20px"
            v-if="detail[0] && detail[0].review_weight !== '0'"
          >
            有/{{ detail[0]?.review_weight }}%
          </p>
          <p style="font-size: 20px" v-else>無</p>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-12">
          <h2 style="margin-bottom: 40px">備註</h2>
          <p
            class="notes-text"
            style="
              font-size: 20px;
              text-align: left;
              margin: 0 auto;
              width: 60%;
            "
          >
            簡述:{{ detail[0]?.brief_description }}<br /><br />
            {{ detail[0]?.additional_notes }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <footer style="margin-top: 300px">
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
export default {
  name: "DeptDetail",

  data() {
    return {
      detail: {},
      isFavorited: false,
      loggedIn: false,
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.fetchDepartmentDetails();
    this.checkIfFavorited();
  },
  methods: {
    async checkLoginStatus() {
      try {
        const response = await fetch("http://localhost/SA/loginornot.php", {
          credentials: "include", // 為了帶上 session cookie到後端?如果沒加這一行後端不會判斷有登入，還有要指定8080
        });
        const data = await response.json();
        if (data.loggedIn) {
          this.loggedIn = true;
          this.userRole = data.role;
          console.log("已登入，角色：", this.userRole);
        } else {
          this.loggedIn = false;
          this.userRole = null;
          console.log("未登入");
        }
      } catch (error) {
        console.error("取得登入狀態失敗", error);
      }
    },
    fetchDepartmentDetails() {
      const id = this.$route.params.id;
      fetch(`http://localhost/SA/department_detail.php?id=${id}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Received data:", data);
          this.detail = data;
          console.log("Received data:", this.detail);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },

    async toggleFavorite() {
      const departmentId = this.$route.params.id;

      if (this.isFavorited) {
        // 已收藏 -> 要取消（這部分你說後端也分開，我等等會教）
        try {
          const formData = new FormData();
          formData.append("department_id", departmentId);

          const response = await fetch(
            "http://localhost/SA/remove_favorite.php",
            {
              method: "POST",
              body: formData,
              credentials: "include", // 加這行讓 session cookie 傳過去
            }
          );
          const result = await response.json();
          if (result.success) {
            this.isFavorited = false;
            console.log("取消收藏成功", result.message);
          } else {
            console.warn("取消收藏失敗", result.message); // 顯示明確錯誤
          }
        } catch (error) {
          console.error("取消收藏失敗", error);
        }
      } else {
        // 尚未收藏 -> 要新增
        try {
          const formData = new FormData();
          formData.append("department_id", departmentId);

          const response = await fetch("http://localhost/SA/add_favorite.php", {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          const result = await response.json(); // 把回傳的 JSON 取出來

          if (result.success) {
            this.isFavorited = true;
            console.log("收藏成功", result.message);
          } else {
            console.warn("收藏失敗", result.message); // 顯示明確錯誤
          }
        } catch (error) {
          console.error("收藏失敗（網路錯誤）", error);
        }
      }
    },

    checkIfFavorited() {
      const id = this.$route.params.id;

      fetch(`http://localhost/SA/get_favorite_detail.php?department_id=${id}`, {
        method: "GET",
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.isFavorited = data.favorited;
            console.log("收藏狀態:", this.isFavorited);
          } else {
            console.warn("檢查此學系收藏狀態失敗", data.message);
          }
        })
        .catch((error) => {
          console.error("檢查此學系收藏錯誤", error);
        });
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}
.col-lg-4 {
  width: 30%;

  box-sizing: border-box;
}
.col-lg-12 {
  width: 100%;
  box-sizing: border-box;
}
.notes-text {
  white-space: pre-line; /* 保留換行符號 */
}

.dept-name {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.favorite-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.2);
}
</style>