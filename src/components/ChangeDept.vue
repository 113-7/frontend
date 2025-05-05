<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Recent Information</h4>
              <h2>轉系生平台資訊 | 更新學系轉系資訊</h2>
              <br />
              <h2>{{departmentData.name}}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-if="departmentData">
    <!-- Banner Ends Here -->
    <section>
      <div class="cont2">
        <h2 style="text-align: center">申請條件設定</h2>
        <form @submit.prevent="ChangeDept" class="container mt-5">
          <!-- department_id（不可編輯）-->
          <div class="form-group row">
            <label for="department_id" class="col-sm-2 col-form-label"
              >學系 ID</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="department_id"
                name="department_id"
                v-model="departmentData.department_id"
                readonly
              />
            </div>
          </div>

          <!-- name（不可編輯）-->
          <div class="form-group row">
            <label for="name" class="col-sm-2 col-form-label">學系名稱</label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                v-model="departmentData.name"
                readonly
              />
            </div>
          </div>

          <!-- faculty（不可編輯）-->
          <div class="form-group row">
            <label for="faculty" class="col-sm-2 col-form-label"
              >所屬學院</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="faculty"
                name="faculty"
                v-model="departmentData.faculty"
                readonly
              />
            </div>
          </div>

          <!-- second_year_quota（可編輯）-->
          <div class="form-group row">
            <label for="second_year_quota" class="col-sm-2 col-form-label"
              >二年級名額</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="second_year_quota"
                name="second_year_quota"
                v-model="departmentData.second_year_quota"
              />
            </div>
          </div>

          <!-- third_year_quota（可編輯）-->
          <div class="form-group row">
            <label for="third_year_quota" class="col-sm-2 col-form-label"
              >三年級名額</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="third_year_quota"
                name="third_year_quota"
                v-model="departmentData.third_year_quota"
              />
            </div>
          </div>

          <!-- fourth_year_quota（可編輯）-->
          <div class="form-group row">
            <label for="fourth_year_quota" class="col-sm-2 col-form-label"
              >四年級名額</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="fourth_year_quota"
                name="fourth_year_quota"
                v-model="departmentData.fourth_year_quota"
              />
            </div>
          </div>

          <!-- brief_description（可編輯）-->
          <div class="form-group row">
            <label for="brief_description" class="col-sm-2 col-form-label"
              >簡述</label
            >
            <div class="col-sm-10">
              <textarea
                class="form-control"
                id="brief_description"
                name="brief_description"
                rows="3"
                v-model="departmentData.brief_description"
              ></textarea>
            </div>
          </div>

          <!-- written_exam_weight（可編輯）-->
          <div class="form-group row">
            <label for="written_exam_weight" class="col-sm-2 col-form-label"
              >筆試占比</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="written_exam_weight"
                name="written_exam_weight"
                v-model="departmentData.written_exam_weight"
              />
            </div>
          </div>

          <!-- interview_weight（可編輯）-->
          <div class="form-group row">
            <label for="interview_weight" class="col-sm-2 col-form-label"
              >面試占比</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="interview_weight"
                name="interview_weight"
                v-model="departmentData.interview_weight"
              />
            </div>
          </div>

          <!-- review_weight（可編輯）-->
          <div class="form-group row">
            <label for="review_weight" class="col-sm-2 col-form-label"
              >資料審查占比</label
            >
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="review_weight"
                name="review_weight"
                v-model="departmentData.review_weight"
              />
            </div>
          </div>

          <!-- additional_notes（可編輯）-->
          <div class="form-group row">
            <label for="additional_notes" class="col-sm-2 col-form-label"
              >備註</label
            >
            <div class="col-sm-10">
              <textarea
                class="form-control"
                id="additional_notes"
                name="additional_notes"
                rows="4"
                v-model="departmentData.additional_notes"
              >
              </textarea>
            </div>
          </div>

          <!-- 提交按鈕 -->
          <div class="form-group row">
            <div class="col-sm-10 offset-sm-2">
              <button type="submit" class="btn edit-btn">提交更改</button>
            </div>
          </div>
        </form>
      </div>

      <!-- Modal 彈窗 -->
      <div class="modal2" id="modal2">
        <div class="modal2-content">
          <h3 id="modal2-title">修改內容</h3>
          <textarea
            id="modal2-input"
            rows="6"
            style="width: 100%; resize: none; padding: 10px; font-size: 16px"
          ></textarea>

          <button class="edit-btn" onclick="saveChange()">儲存</button>
        </div>
      </div>
    </section>
  </div>

  <div v-else>
    <p>數據加載中，請稍後...</p>
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
              | 天主教輔仁大學 © 2014-2022 版權所有，建議使用IE8.0以上瀏覽器瀏覽
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { reactive, inject, ref, watch, onMounted } from "vue";
import { nextTick } from "vue";

const session = inject("session"); // 從父組件注入 session
console.log("session:", session);

nextTick(() => {
  console.log(session.value); // 確保這時候 session 已經正確賦值
});

const departmentData = reactive({
  department_id: null,
  name: "",
  faculty: "",
  second_year_quota: "",
  third_year_quota: "",
  fourth_year_quota: "",
  brief_description: "",
  written_exam_weight: "",
  interview_weight: "",
  review_weight: "",
  additional_notes: "",
});

// 取得學系資料的函式
const getDepartmentData = async () => {
  console.log("session1:", session);
  console.log("session.value:", session.value);
  console.log("取得學系資料的函式被呼叫了");
  if (session.value) {
    if (session.value?.department_id) {
      console.log(
        "session.value?.department_id:",
        session.value?.department_id
      );
      try {
        const response = await fetch(
          `/api/SA/department_detail.php?id=${session.value?.department_id}`,
          { method: "GET" }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("取得學系資料:", data);
          departmentData.department_id = data[0].department_id;
          departmentData.name = data[0].name;
          departmentData.faculty = data[0].faculty;
          departmentData.second_year_quota = data[0].second_year_quota;
          departmentData.third_year_quota = data[0].third_year_quota;
          departmentData.fourth_year_quota = data[0].fourth_year_quota;
          departmentData.brief_description = data[0].brief_description;
          departmentData.written_exam_weight = data[0].written_exam_weight;
          departmentData.interview_weight = data[0].interview_weight;
          departmentData.review_weight = data[0].review_weight;
          departmentData.additional_notes = data[0].additional_notes;
          console.log("取得學系資料成功", departmentData);
        } else {
          console.error("無法取得學系資料", response.status);
        }
      } catch (error) {
        console.error("發生錯誤:", error);
      }
    } else {
      console.error("沒有學系 ID，無法取得學系資料");
    }
  } else {
    console.error("Session 未定義，無法取得學系資料");
  }
};

const ChangeDept = async () => {
  try {
    console.log("原始 additional_notes:", departmentData.additional_notes);
    const cleanedAdditionalNotes = departmentData.additional_notes.replace(
      /<[^>]+>/g,
      "\n"
    );
    console.log("後來 additional_notes:", cleanedAdditionalNotes);
    // 準備要發送的資料
    const payload = {
      department_id: departmentData.department_id,
      second_year_quota: departmentData.second_year_quota,
      third_year_quota: departmentData.third_year_quota,
      fourth_year_quota: departmentData.fourth_year_quota,
      brief_description: departmentData.brief_description,
      written_exam_weight: departmentData.written_exam_weight,
      interview_weight: departmentData.interview_weight,
      review_weight: departmentData.review_weight,
      additional_notes: cleanedAdditionalNotes,
    };

    console.log("發送的資料:", payload);

    // 發送 POST 請求到後端
    const response = await fetch("/api/SA/update_department.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });


    //這裡以後可以用，可以看後端哪裡有錯誤
    //const textResponse = await response.text(); // 先讀取純文本
    //console.log("後端回應的原始資料:", textResponse); // 確認是否含有 HTML

    if (response.ok) {
      const result = await response.json();
      if (result.status === "success") {
        alert("資料更新成功！");
        console.log("更新成功:", result);
        window.location.href = "/UserProfile";
      } else {
        alert("資料更新失敗：" + result.message);
        console.error("更新失敗:", result);
      }
    } else {
      console.error("伺服器回應錯誤:", response.status);
      alert("伺服器回應錯誤，請稍後再試。");
    }
  } catch (error) {
    console.error("發生錯誤:", error);
    alert("發生錯誤，請稍後再試!!!!");
  }
};

watch(
  () => session.value,
  () => {
    getDepartmentData();
  }
);

onMounted(() => {
  const session = inject("session");
  console.log("session.value3:", session?.value); // 檢查 session.value
  getDepartmentData();
});

let lastDepartmentId = null;
</script>