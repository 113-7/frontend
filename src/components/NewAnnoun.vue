<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Recent Information</h4>
              <h2>轉系生平台資訊 | 新增公告</h2>
              <br />
              <h2>新增公告資訊</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <section>
    <div class="cont2">
      <h2 style="text-align: center">公告內容設定</h2>
      <form @submit.prevent="AddAnnouncement" class="container mt-5">
        <!-- 公告標題 -->
        <div class="form-group row">
          <label for="title" class="col-sm-2 col-form-label">公告標題</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="title" v-model="announcement.title" required />
          </div>
        </div>

        <!-- 公告內容 -->
        <div class="form-group row">
          <label for="content" class="col-sm-2 col-form-label">公告內容</label>
          <div class="col-sm-10">
            <textarea class="form-control" id="content" rows="4" v-model="announcement.content" required></textarea>
          </div>
        </div>

        <!-- 發布單位 -->
        <div class="form-group row">
          <label for="author" class="col-sm-2 col-form-label">發布單位</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="author" v-model="session.department_name" readonly />
          </div>
        </div>


        <!-- 提交按鈕 -->
        <div class="form-group row">
          <div class="col-sm-10 offset-sm-2">
            <button type="submit" class="btn edit-btn">提交公告</button>
          </div>
        </div>
      </form>
    </div>
  </section>

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
            <p>| 天主教輔仁大學 © 2014-2022 版權所有，建議使用 IE8.0 以上瀏覽器瀏覽</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, inject, onMounted,watch } from 'vue';

const session = inject("session");

const announcement = ref({
  department_id: '',
  date: '',
  title: '',
  content: ''
});

watch(
  () => session.value,
  () => {
    AddAnnouncement();
  }
);

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份需要加1，並補零
  const day = String(date.getDate()).padStart(2, '0'); // 補零
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 自動取得部門與日期
onMounted(() => {
    console.log("session.value", session.value);
  if (session.value) {
    announcement.value.department_id = session.value.department_id;
    announcement.value.date = formatDate(new Date());
  } else {
    alert("尚未登入或無法取得學系 ID");
  }
});

// 提交公告函式
const AddAnnouncement = async () => {
  const response = await fetch("/api/SA/add_announcement.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(announcement.value)
  });

    //確認後端錯誤訊息用
  //const textResponse = await response.text(); // 先讀取純文本
  //console.log("後端回應的原始資料:", textResponse); // 確認是否含有 HTML

  if (response.ok) {
    const result = await response.json();
    if (result.status === "success") {
      alert("公告新增成功！");
      window.location.href = "/UserProfile"; // 或導回公告列表頁
    } else {
      alert("公告新增失敗：" + result.message);
    }
  } else {
    alert("伺服器錯誤，請稍後再試");
  }
};
</script>
