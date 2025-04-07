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
          <h2 style="font-size: 30px; margin-top: -30px;">
            <b>{{ detail[0]?.name }}</b>
          </h2>
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
    };
  },
  mounted() {
    this.fetchDepartmentDetails();
  },
  methods: {
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
</style>