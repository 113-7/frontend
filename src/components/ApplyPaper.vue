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
                  <a href="/document/Course_transfer_application.doc" download>下載</a>
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
                <div class="main-button ">
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
        <input type="text" v-model="form.department">
      </div>
      <div class="form-group">
        <label>姓名：</label>
        <input type="text" v-model="form.name">
      </div>
      <div class="form-group">
        <label>學號：</label>
        <input type="text" v-model="form.studentId" readonly />
      </div>


     <div class="form-group">
          <label>請選擇要轉入系所：</label>
          <select v-model="form.targetDepartment">
            <option disabled value="">-- 請選擇系所 --</option>
            <option  v-for="dept in departments"
                    :key="dept.department_id"
                    :value="dept.name">

               {{ dept.name }}

            </option>
            
          </select>
        </div>


      <div class="form-group">
        <label>上傳檔案：</label>
        <input type="file" @change="handleFileUpload" />
      </div>

      <div class="form-footer">
        <button style=" background-color:rgb(199, 198, 198);l" type="button" @click="showForm = false">取消</button>
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
export default {
  data() {
    return {
      showForm: false,
      form: {
        college: '',
        department: '',
        name: '',
        studentId: '',
        targetDepartment: '',
        file: null,
        agree: false
      },
      departments: [],
    };
  },

  created() {
    fetch("/api/departments")
      .then((res) => res.json())
      .then((data) => {
        this.departments = data;
      })
      .catch((err) => {
        console.error("系所資料載入失敗", err);
      });
  },

  mounted() {
    const userInfo = {
      name: "王小明",
      studentId: "411000123",
      department: "資工三甲"
    };
    this.form.name = userInfo.name;
    this.form.studentId = userInfo.studentId;
    this.form.department = userInfo.department;
  },

  methods: {
    handleFileUpload(event) {
      this.form.file = event.target.files[0];
    },
    submitForm() {
      console.log("繳交內容：", this.form);
      alert("成功繳交！");
      this.showForm = false;
    }
  }
};
</script>




<style scoped>
.call-to-action{
  margin-top: 50px;
}

.main-button a,
.main-button button {
  display: inline-block;
  padding: 10px 22px;
  background: linear-gradient(135deg, #ff8000,rgb(255, 166, 77));
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
  margin-top:120px;
  background:rgb(255, 255, 255);
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