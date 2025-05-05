<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Fu Jen Catholic University</h4>
              <h2>詳細公告</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Banner Ends Here -->
  <div v-if="announcement">
    <section class="about-us">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <router-link to="/AnnouncementList" class="btn btn-light backbutton" style="font-size: 24px;text-align: left ">←</router-link>
            <h2>
              <b>{{ announcement?.title }}</b>
            </h2>
            <div>
              <p style="display: inline-block; margin-right: 10px">
                <strong>學系：</strong>{{ announcement.department_name }}
              </p>
              <p style="display: inline-block; margin-right: 10px">
                <strong>發布時間：</strong>{{ announcement.created_at }}
              </p>
            </div>
            <p v-html="announcement.content" style="text-align: left; margin: 60px;font-size: 20px">
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
  <div v-else-if="error">
    <p style="color: red">{{ error }}</p>
  </div>
  <div v-else>
    <p>載入中...</p>
  </div>

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
export default {
  data() {
    return {
      announcement: [],
      error: "",
    };
  },
  mounted() {
    const id = this.$route.params.id; // 例如 /announcement/3

    fetch(`/api/SA/announ_detail.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          this.error = data.error;
          console.error("Error:", this.error);
        } else {
          this.announcement = data[0];
          console.log("Received data:", this.announcement);
        }
      })
      .catch(() => {
        this.error = "無法取得資料";
      });
  },
};
</script>

<style scoped>
.backbutton{
  position: fixed;
  top: 25%;       /* 距離畫面上方 20% */
  left: 5%;       /* 距離畫面左側 5% */
  font-size: 28px;
  color: black;
  background-color: white;
  padding: 8px 12px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  z-index: 999;   /* 確保不會被其他元件遮住 */
  transition: background-color 0.3s;
}
</style>