<template>
  <div v-if="isLogin">
    <div v-if="session.role === 'student'">
      <h2 class="section-title" style="position: absolute; top: 150px">
        個人資訊
      </h2>

      <hr class="custom-hr1" />
      <section class="contact-us">
        <div class="container">
          <div class="row">
            <div class="info-wrapper">
              <div class="info-line">
                <span class="info-label">學號</span>
                <span class="info-value" id="student-id">{{
                  session.user_id
                }}</span>
              </div>
              <div class="info-line">
                <span class="info-label">姓名</span>
                <span class="info-value" id="student-name">{{
                  session.username
                }}</span>
              </div>
              <div class="info-line">
                <span class="info-label">入學年份</span>
                <span class="info-value">{{ enrollmentYear }}</span>
              </div>
              <div class="info-line">
                <span class="info-label">就讀學系</span>
                <span class="info-value" id="student-name">{{
                  session.department_name
                }}</span>
              </div>

              <div class="info-line">
                <span class="info-label">班級</span>
                <span class="info-value">{{ className }}</span>
              </div>
              <div class="info-line">
                <span class="info-label">座號</span>
                <span class="info-value">{{ seatNumber }}</span>
              </div>
              <br />
            </div>
          </div>
        </div>
      </section>

      <h2 class="section-title">申請轉系</h2>
      <hr class="custom-hr2" />
      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-12">
            <div class="alert alert-info" role="alert">
              <strong>暫無申請學系</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h2 class="section-title" style="position: absolute; top: 150px">
        學系管理員資訊
      </h2>
      <hr class="custom-hr1" />
      <section class="contact-us">
        <div class="container">
          <div class="row">
            <div class="info-wrapper">
              <div class="info-line">
                <span class="info-label">教職員號</span>
                <span class="info-value" id="student-id">{{
                  session.user_id
                }}</span>
              </div>
              <div class="info-line">
                <span class="info-label">職稱</span>
                <span class="info-value" id="student-name">{{
                  session.username
                }}</span>
              </div>
              <br />
            </div>
          </div>
        </div>
      </section>

      <h2 class="section-title">
        本系轉系資訊
        <button type="button" class="btn btn-danger">更改本系轉系資訊</button>
      </h2>
      <hr class="custom-hr2" />
      <div v-if="departmentData && departmentData.length > 0">
        <div class="row">
          <div class="info-wrapper" style="margin-top: 20px">
            <div class="info-line">
              <span class="info-label">學系</span>
              <span class="info-value">{{ departmentData[0]?.name }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">所屬學院</span>
              <span class="info-value">{{ departmentData[0]?.faculty }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">二年級名額</span>
              <span class="info-value">{{
                departmentData[0]?.second_year_quota
              }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">三年級名額</span>
              <span class="info-value">{{
                departmentData[0]?.third_year_quota
              }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">四年級名額</span>
              <span class="info-value">{{
                departmentData[0]?.fourth_year_quota
              }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">簡述</span>
              <span class="info-value">{{
                departmentData[0]?.brief_description
              }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">考試占比</span>
              <span class="info-value">{{
                departmentData[0]?.written_exam_weight
              }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">面試占比</span>
              <span class="info-value">{{
                departmentData[0]?.interview_weight
              }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">書審占比</span>
              <span class="info-value">{{
                departmentData[0]?.review_weight
              }}</span>
            </div>
            <div class="info-line">
              <span class="info-label">備註</span>
              <span class="info-value">{{
                departmentData[0]?.additional_notes
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 class="section-title">轉系申請</h2>
      <hr class="custom-hr2" />
      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-12">
            <div class="alert alert-info" role="alert">
              <strong>暫無收到轉系申請</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <ul class="social-icons">
              <li><a href="#">天主教輔仁大學</a></li>
              <li><a href="#">242062 新北市新莊區中正路510號</a></li>
              <li><a href="#">(02) 29052000</a></li>
              <li><a href="#">pubwww@mail.fju.edu.tw</a></li>
            </ul>
          </div>
          <div class="col-lg-12">
            <div class="copyright-text">
              <p>
                | 天主教輔仁大學 © 2014-2022
                版權所有，建議使用IE8.0以上瀏覽器瀏覽
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
  <div v-else>
    <router-link to="/LogIn" class="main-button">請先登入</router-link>
  </div>
</template>

<script setup>
import { inject, ref, watch, onMounted } from "vue";

const session = inject("session");

const departmentData = ref(null); // 🔥 這個用來存學系資料

const isLogin = ref(false); // 🔥 這個用來控制畫面
const enrollmentYear = ref("未知");
const className = ref("未知");
const seatNumber = ref("未知");

const updateUserData = () => {
  if (session?.value) {
    console.log("✅ 取得 session:", session.value);
    isLogin.value = true; // 有資料，標記登入
    const userIdString = String(session.value.user_id);
    enrollmentYear.value = `1${userIdString.slice(1, 3)}`;
    className.value =
      userIdString.charAt(5) === "1"
        ? "甲班"
        : userIdString.charAt(5) === "2"
        ? "乙班"
        : "未知";
    seatNumber.value = userIdString.slice(7, 9);
  } else {
    console.log("❌ session 還是空的");
    isLogin.value = false; // 沒資料，標記未登入
  }
};

// 取得學系資料的函式
const getDepartmentData = async () => {
  console.log("取得學系資料的函式被呼叫了");
  console.log("session.value?.department_id:", session.value?.department_id);
  if (session.value?.department_id) {
    try {
      const response = await fetch(
        `/api/SA/department_detail.php?id=${session.value?.department_id}`,
        {
          method: "GET",
        }
      ); // 假設這是後端的 API 路徑
      if (response.ok) {
        const data = await response.json();
        departmentData.value = data; // 假設返回的資料是學系的詳細資訊
        console.log("學系資料:", departmentData.value);
      } else {
        console.error("無法取得學系資料", response.status);
      }
    } catch (error) {
      console.error("發生錯誤:", error);
    }
  } else {
    console.error("沒有學系 ID，無法取得學系資料");
  }
};

onMounted(() => {
  updateUserData();
  getDepartmentData();
});

watch(
  () => session.value,
  () => {
    updateUserData();
    getDepartmentData();
  }
);
</script>


<style scoped>
.info-wrapper {
  margin-top: 270px;
}
.section-title {
  margin-left: 5%;
}

.custom-hr1 {
  position: absolute;
  top: 185px;
  border: 0.5px solid;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  left: 5%;
}
.custom-hr2 {
  border: 0.5px solid;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

</style>
