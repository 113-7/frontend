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