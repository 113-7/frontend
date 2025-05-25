<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Application</h4>
              <h2>申請文件繳交</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Banner Ends Here -->
  <section class="call-to-action">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="main-content">
            <div class="row">
              <div class="col-lg-8">
                <span>Download</span>
                <h4>轉系申請書下載</h4>
              </div>
              <div class="col-lg-4">
                <div class="main-button">
                  <a href="/document/Course_transfer_application.doc" download
                    >下載</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="call-to-action">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="main-content">
            <div class="row">
              <div class="col-lg-8">
                <span>Application</span>
                <h4>轉系文件提交</h4>
              </div>
              <div class="col-lg-4">
                <div class="main-button">
                  <button @click="showForm = true">提交</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal 表單 -->
    <div v-if="showForm" class="modal-overlay">
      <div class="modal-card">
        <form @submit.prevent="submitForm">
          <h3>轉系文件繳交</h3>

          <div class="form-group">
            <label>原系級：</label>
            <input type="text" v-model="session.department_name" readonly />
          </div>
          <div class="form-group">
            <label>姓名：</label>
            <input type="text" v-model="session.username" readonly />
          </div>
          <div class="form-group">
            <label>學號：</label>
            <input type="text" v-model="session.user_id" readonly />
          </div>

          <div class="form-group">
            <label>請選擇要轉入系所：</label>
            <select v-model="form.apply_department">
              <option disabled value="">-- 請選擇系所 --</option>
              <option
                v-for="dept in departments"
                :key="dept.department_id"
                :value="dept.department_id"
              >
                {{ dept.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label
              >上傳檔案：(若有多個檔案
              例:成績單/自我介紹/請壓縮成一個檔案)</label
            >
            <input type="file" @change="handleFileUpload" />
          </div>

          <div class="form-footer">
            <button
              style=" background-color:rgb(199, 198, 198);l"
              type="button"
              @click="showForm = false"
            >
              取消
            </button>
            <button type="submit">繳交</button>
          </div>
        </form>
      </div>
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
            <p>
              | 天主教輔仁大學 © 2014-2022 版權所有，建議使用IE8.0以上瀏覽器瀏覽
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { inject, watch } from "vue";
export default {
  //從上一層抓學生資料填入轉系表單(表單記得改唯讀)
  inject: ["session"],

  data() {
    return {
      showForm: false,
      form: {
        department_name: "",
        name: "",
        user_id: "",
        apply_department: "",
        file: null,
      },
      departments: [],
    };
  },

  //一開始就載入系所資料，用於表單選擇轉入系所
  created() {
    fetch("http://localhost/SA/department_all.php")
      .then((res) => res.json())
      .then((data) => {
        this.departments = data.map((item) => ({
          department_id: item.department_id,
          name: item.name,
        }));
      })
      .catch((err) => {
        console.error("系所載入失敗", err);
      });
  },

  mounted() {
    // 初始用注入的 session 填入資料（有可能當時已經有值）
    if (this.session) {
      this.form.username = this.session.username || "";
      this.form.user_id = this.session.user_id || "";
      this.form.department_name = this.session.department_name || "";
    }
  },
  watch: {
    // 監聽 session 變化
    session: {
      immediate: true,
      handler(newSession) {
        if (newSession) {
          this.form.username = newSession.username || "";
          this.form.user_id = newSession.user_id || "";
          this.form.department_name = newSession.department_name || "";
          console.log("watch session user_id:", this.form.user_id);
        }
      },
    },
  },

  methods: {
    handleFileUpload(event) {
      this.form.file = event.target.files[0];
    },
    async submitForm() {
      // 建立 FormData 物件
      const formData = new FormData();
      formData.append("user_id", this.form.user_id);
      formData.append("transfer_id", this.form.apply_department);
      if (this.form.file) {
        formData.append("file", this.form.file);
      }

      console.log(
        "送出的 user_id:",
        this.form.user_id,
        "轉系系所:",
        this.form.apply_department
      );
      try {
        const response = await fetch(
          "http://localhost/SA/submit_application.php",
          {
            method: "POST",
            body: formData,
          }
        );
        const text = await response.text(); // 拿原始回傳文字
        try {
          const data = JSON.parse(text); // 嘗試轉換成 JSON

          if (data.status === "success") {
            alert("成功繳交！"+ (data.message));
            this.showForm = false;
            console.log("成功繳交！", data.message);
          } else {
            alert("繳交失敗：" + (data.message || "未知錯誤"));
          }
        } catch (jsonErr) {
          console.error("不是合法的 JSON：", text);
          alert("後端回傳格式錯誤，請查看 console");
        }
      } catch (err) {
        alert("發生錯誤，請稍後再試");
        console.error("fetch 發生錯誤：", err);
      }

      /*.then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            alert("成功繳交！");
            this.showForm = false;
            // 可以清空表單或其他動作
          } else {
            alert("繳交失敗：" + (data.message || "未知錯誤"));
          }
        })
        .catch((err) => {
          alert("發生錯誤，請稍後再試");
          console.error(err);
        });*/
    },
  },
};
</script>




<style scoped>
.call-to-action {
  margin-top: 50px;
}

.main-button a,
.main-button button {
  display: inline-block;
  padding: 10px 22px;
  background: linear-gradient(135deg, #ff8000, rgb(255, 166, 77));
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  overflow: auto;
}

.modal-card {
  margin-top: 120px;
  background: rgb(255, 255, 255);
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 700px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
}

.modal-card h3 {
  margin-bottom: 20px;
  font-weight: bold;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 6px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.form-footer button {
  padding: 8px 16px;
  border: none;
  background-color: #ff8000;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
}
</style>