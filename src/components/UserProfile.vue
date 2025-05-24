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
                <span class="info-label">年級</span>
                <span class="info-value">{{ gradeNumber }}</span>
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
            <div
              v-if="StudentApplyData.length === 0"
              class="alert alert-info"
              role="alert"
            >
              <strong>暫無申請學系</strong>
            </div>

            <div
              v-else
              class="table-responsive mt-4"
              style="border-radius: 12px"
            >
              <table class="table apply-table">
                <thead>
                  <tr>
                    <th>學系</th>
                    <th>學院</th>
                    <th>繳交時間</th>
                    <th>檔案</th>
                    <th>進度</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in StudentApplyData" :key="index">
                    <td>{{ item.department_name }}</td>
                    <td>{{ item.department_faculty }}</td>
                    <td>{{ item.application_date }}</td>
                    <td>
                      <a
                        :href="`http://localhost/SA/uploads/${item.application_file}`"
                        target="_blank"
                        rel="noopener"
                        style="text-decoration: underline"
                      >
                        查看檔案
                      </a>
                    </td>
                    <td>{{ item.status }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <h2 class="section-title mt-5">我的最愛</h2>
      <hr class="custom-hr2" />
      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-12" v-if="favoriteDepartments.length > 0">
            <div
              class="table-responsive mt-4"
              style="border-radius: 12px; overflow: hidden"
            >
              <table class="table my-fav-table table-hover align-middle">
                <thead>
                  <tr>
                    <th>學系</th>
                    <th>學院</th>
                    <th>二年級名額</th>
                    <th>三年級名額</th>
                    <th>四年級名額</th>
                    <th>筆試</th>
                    <th>口試</th>
                    <th>資料審查</th>
                    <th>簡述</th>
                    <th>點擊取消最愛</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    @click="goToDetail(favorite.department_id)"
                    v-for="(favorite, index) in favoriteDepartments"
                    :key="index"
                  >
                    <td>{{ favorite.name }}</td>
                    <td>{{ favorite.faculty }}</td>
                    <td>{{ favorite.second_year_quota }}人</td>
                    <td>{{ favorite.third_year_quota }}人</td>
                    <td>{{ favorite.fourth_year_quota }}人</td>
                    <td>{{ favorite.written_exam_weight }}%</td>
                    <td>{{ favorite.interview_weight }}%</td>
                    <td>{{ favorite.review_weight }}%</td>
                    <td style="text-align: left">
                      <span
                        class="d-inline-block text-truncate"
                        style="max-width: 240px"
                      >
                        {{ favorite.brief_description }}
                      </span>
                    </td>
                    <td>
                      <button
                        class="favorite-btn"
                        @click.stop="removeFavorite(favorite.department_id)"
                      >
                        <span>❤️</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-lg-12" v-else>
            <div class="alert alert-warning" role="alert">
              <strong>目前尚未收藏任何學系</strong>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 顯示學系管理員的部分 -->
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
        <router-link to="/ChangeDept">
          <button type="button" class="btn edit-btn">更改本系轉系資訊</button>
        </router-link>
        <router-link to="/NewAnnoun">
          <button type="button" class="btn edit-btn ml-1">
            新增本系轉系公告
          </button>
        </router-link>
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
            <div
              v-if="AdminApplyData.length === 0"
              class="alert alert-info"
              role="alert"
            >
              <strong>暫無收到轉系申請</strong>
            </div>
            <div
              v-else
              class="table-responsive mt-4"
              style="border-radius: 12px"
            >
              <table class="table apply-table">
                <thead>
                  <tr>
                    <th>姓名</th>
                    <th>學號</th>
                    <th>原學系</th>
                    <th>年級</th>
                    <th>申請時間</th>
                    <th>檔案</th>
                    <th>審核結果</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in AdminApplyData" :key="index">
                    <td>{{ item.student_name }}</td>
                    <td>{{ item.student_id }}</td>
                    <td>{{ item.odepartment_name }}</td>
                    <td>{{ calculateGrade(item.student_id) }}</td>
                    <td>{{ item.application_date }}</td>
                    <td>
                      <a
                        :href="`http://localhost/SA/uploads/${item.application_file}`"
                        target="_blank"
                        rel="noopener"
                        style="text-decoration: underline"
                      >
                        查看檔案
                      </a>
                    </td>
                    <select v-model="item.status" @change="updateStatus(item)">
                      <option value="審核中">審核中</option>
                      <option value="通過">通過</option>
                      <option value="備取">備取</option>
                      <option value="不通過">不通過</option>
                    </select>
                  </tr>
                </tbody>
              </table>
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

const departmentData = ref(null); // 這個用來存學系資料

//使用者資料
const isLogin = ref(false); // 是否登入
const enrollmentYear = ref("未知");
const className = ref("未知");
const seatNumber = ref("未知");
const gradeNumber = ref("未知"); // 年級

//計算民國幾年(為了之後計算入學年份)(目前只用在學系管理者審核的部分)
function getCurrentTaiwanYear() {
  const date = new Date();
  return date.getFullYear() - 1911;
}
function calculateGrade(studentId) {
  const idStr = String(studentId); // 學號轉成字串
  const admissionYear = parseInt('1' + idStr.slice(1, 3)); 
  const currentYear = getCurrentTaiwanYear() // 取得當前民國年份
  const grade = currentYear - admissionYear;//民國-入學年分

  return grade;
}

// 取得使用者資料
const updateUserData = () => {
  if (session?.value) {
    console.log("✅ 取得 session:", session.value);
    isLogin.value = true; // 確定有沒有登入
    const userIdString = String(session.value.user_id);
    enrollmentYear.value = `1${userIdString.slice(1, 3)}`;
    className.value =
      userIdString.charAt(5) === "1"
        ? "甲班"
        : userIdString.charAt(5) === "2"
        ? "乙班"
        : "未知";
    seatNumber.value = userIdString.slice(7, 9);
    gradeNumber.value = 14 - userIdString.slice(1, 3); // 年級
  } else {
    console.log("❌ session 還是空的");
    isLogin.value = false; // 沒資料，標記未登入
  }
};

// 取得學系資料的函式
const getDepartmentData = async () => {
  console.log("取得學系資料的函式被呼叫了");
  if (!session.value) {
    console.error("Session 未定義，無法取得學系資料");
    return;
  }

  console.log("session.value?.department_id:", session.value?.department_id);
  if (session.value?.department_id) {
    try {
      const response = await fetch(
        `/api/SA/department_detail.php?id=${session.value.department_id}`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const data = await response.json();
        departmentData.value = data;
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

//下面這兩行要在setup寫才能使用router
//searchbar裡面不是使用setup所以才沒使用
import { useRouter } from "vue-router";
const router = useRouter();
const goToDetail = async (departmentId) => {
  //非setup寫法 this.$router.push(`/DeptDetail/${departmentId}`);
  router.push(`/DeptDetail/${departmentId}`);
};

onMounted(() => {
  console.log("Session 值:", session.value);
  updateUserData();
  getDepartmentData();
  loadFavorites();
  getStudentApplyData();
  getAdminApplyData();
});

watch(
  () => session.value,
  () => {
    updateUserData();
    getDepartmentData();
  }
);
//以下是【學生】申請轉系顯示的部分
const StudentApplyData = ref([]);
const getStudentApplyData = async () => {
  try {
    const response = await fetch("/api/SA/get_student_application.php", {
      method: "GET",
      credentials: "include", // 確保帶上 session cookie
    });
    if (!response.ok) {
      console.error("取得申請資料失敗:", response.status);
      return;
    }
    const data = await response.json();
    StudentApplyData.value = data;
    console.log("申請資料:", StudentApplyData.value);
  } catch (error) {
    console.error("fetch 發生錯誤:", error);
  }
};

//以下是【學系管理人員】申請轉系顯示的部分
const AdminApplyData = ref([]);
const getAdminApplyData = async () => {
  try {
    const response = await fetch("/api/SA/get_department_application.php", {
      method: "GET",
      credentials: "include", // 確保帶上 session cookie
    });
    if (!response.ok) {
      console.error("取得申請資料失敗:", response.status);
      return;
    }
    const data = await response.json();
    AdminApplyData.value = data;
    console.log("申請資料:", AdminApplyData.value);
  } catch (error) {
    console.error("fetch 發生錯誤:", error);
  }
};
//以下是【學系管理人員】更新申請狀態的部分(審核中，通過，不通過，備取)
const updateStatus = async (item) => {
  try {
    const response = await fetch("/api/SA/update_application_status.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        application_id: item.application_id,
        status: item.status,
      }),
    });
    console.log("即將送出的狀態更新：", {
      application_id: item.application_id,
      status: item.status,
    });
    const result = await response.json();
    if (result.status === "success") {
      alert("審核狀態已更新！");
    } else {
      alert("更新失敗：" + JSON.stringify(result));
    }
  } catch (error) {
    console.error("更新發生錯誤", error);
  }
};

//以下是【學生】收藏的部分
const favoriteDepartments = ref([]);

const loadFavorites = async () => {
  try {
    const response = await fetch("/api/SA/get_favorite.php");
    if (!response.ok) {
      console.error("取得收藏失敗:", response.status);
      return;
    }
    const data = await response.json();
    favoriteDepartments.value = data;
    console.log("收藏學系資料:", favoriteDepartments.value);
  } catch (error) {
    console.error("fetch 發生錯誤:", error);
  }
};
//點擊紅心可以刪除收藏
const removeFavorite = async (departmentId) => {
  try {
    const formData = new FormData();
    formData.append("department_id", departmentId);

    const response = await fetch("/api/SA/remove_favorite.php", {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    const result = await response.json();

    if (result.success) {
      console.log("取消收藏成功", result.message);
    } else {
      console.warn("取消收藏失敗", result.message); // 顯示明確錯誤
    }

    // 從前端移除這筆收藏
    favoriteDepartments.value = favoriteDepartments.value.filter(
      (dept) => dept.department_id !== departmentId
    );
  } catch (error) {
    console.error("刪除收藏錯誤:", error);
  }
};
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

li a {
  text-decoration: none;
  color: #007bff;
}
li a:hover {
  text-decoration: underline;
}

.custom-fav-box {
  background-color: rgb(255, 219, 219);
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solidrgb(235, 190, 190);
}

::v-deep(.custom-fav-box a) {
  color: #000;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 我的最愛 */
.my-fav-table {
  border: 1px solid #ffeaea;
  border-radius: 12px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 15px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.my-fav-table thead {
  background-color: rgb(255, 241, 241);
  color: rgb(102, 12, 12);
}

.my-fav-table thead th {
  padding: 14px 12px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #f3d6d6;
}

.my-fav-table thead th:first-child {
  border-top-left-radius: 12px;
}
.my-fav-table thead th:last-child {
  border-top-right-radius: 12px;
}

.my-fav-table th,
.my-fav-table td {
  padding: 10px px8;
  vertical-align: middle;
  text-align: center;
  line-height: 1.5;
  font-size: 15px;
  color: #333;
  border-top: 1px solid #f3d6d6; /* 與申請表格一致對應的邊線粗細 */
}

.my-fav-table tbody tr:nth-child(even) td {
  background-color: rgb(255, 241, 241);
}

.my-fav-table tbody tr:hover td {
  background-color: rgb(251, 233, 233);
  transition: background-color 0.2s ease;
}

.my-fav-table tbody tr:first-child td:first-child {
  border-top-left-radius: 12px;
}
.my-fav-table tbody tr:first-child td:last-child {
  border-top-right-radius: 12px;
}
.my-fav-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}
.my-fav-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

.my-fav-table .text-truncate {
  display: block;
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 申請 */
.apply-table {
  border: 1px solid #d5e7f8;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 15px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

/* 表頭 */
.apply-table thead {
  background-color: #eef5fb;
  color: #0c3b66;
}

.apply-table thead th {
  padding: 14px 12px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #d5e7f8;
}

/* 表頭左右圓角 */
.apply-table thead th:first-child {
  border-top-left-radius: 12px;
}
.apply-table thead th:last-child {
  border-top-right-radius: 12px;
}

/* 表格內容 */
.apply-table td {
  padding: 12px 14px;
  vertical-align: middle;
  text-align: center;
  line-height: 1.5;
  font-size: 15px;
  color: #333;
  border-top: 1px solid #eef3f8;
}

/* 偶數列淡底 */
.apply-table tbody tr:nth-child(even) td {
  background-color: #f7fbff;
}

/* hover 效果：柔和藍底，不破壞圓角 */
.apply-table tbody tr:hover td {
  background-color: #eaf4ff;
  transition: background-color 0.2s ease;
}

.apply-table tbody tr:first-child td:first-child {
  border-top-left-radius: 12px;
}
.apply-table tbody tr:first-child td:last-child {
  border-top-right-radius: 12px;
}
.apply-table tbody tr:last-child td:first-child {
  border-bottom-left-radius: 12px;
}
.apply-table tbody tr:last-child td:last-child {
  border-bottom-right-radius: 12px;
}

/* 備註文字過長時截斷 */
.apply-table .text-truncate {
  display: block;
  max-width: 240px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.favorite-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #ff0000; /* 紅色 */
}
</style>
