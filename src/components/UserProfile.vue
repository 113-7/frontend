<template>
  <div v-if="session">
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
import { inject, onMounted, ref, compute, watch } from "vue";

// 假設 session 正確注入
const session = inject("session");
console.log("session:",session.value); // 這裡會印出學號

const userId = ref("");
const enrollmentYear = ref("未知");
const className = ref("未知");
const seatNumber = ref("未知");

const updateUserData = () => {
  if (session.value?.user_id) {
    const userIdString = String(session.value.user_id);
    enrollmentYear.value = `1${userIdString.slice(1, 3)}`;
    className.value =
      userIdString.charAt(5) == "1"
        ? "甲班"
        : userIdString.charAt(5) == "2"
        ? "乙班"
        : "未知";
    seatNumber.value = userIdString.slice(7, 9);
  }
};

// 第一次掛載時也執行一次（如果 session 已經有值）
onMounted(() => {
  updateUserData();
});

// 如果 session 是後來才被注入或載入，這樣可以重新計算
watch(session, () => {
  updateUserData();
});
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
