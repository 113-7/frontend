<template>
  <!-- Header -->

  <!-- Page Content -->
  <!-- Banner Starts Here -->
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Fu Jen Catholic University</h4>
              <h2>輔大轉系生資訊平台</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div>
    <h2 class="text_tt" style="text-align: center">本校各學院</h2>
  </div>
  <!--  item --------------------------------------------->
  <div class="academy_container">
    <div class="scroll-container">
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'cla' } }">
          <img src="../assets/images/kk1.jpg" alt="Apple Watch" />
          <p>文學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'cla' } }">
          <img src="../assets/images/kk2.jpg" alt="iPad" />
          <p>藝術學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'cla' } }">
          <img src="../assets/images/kk3.jpg" alt="Apple Watch" />
          <p>傳播學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'med' } }">
          <img src="../assets/images/kk5.jpg" alt="Apple Watch" />
          <p>醫學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'cse' } }">
          <img src="../assets/images/kk6.jpg" alt="Apple Watch" />
          <p>理工學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'cfll' } }">
          <img src="../assets/images/kk7.jpg" alt="Apple Watch" />
          <p>外國語文學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'che' } }">
          <img src="../assets/images/kk8.jpg" alt="Apple Watch" />
          <p>民生學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'law' } }">
          <img src="../assets/images/kk9.jpg" alt="Apple Watch" />
          <p>法律學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'css' } }">
          <img src="../assets/images/kk10.jpg" alt="Apple Watch" />
          <p>社會科學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'com' } }">
          <img src="../assets/images/kk11.jpg" alt="Apple Watch" />
          <p>管理學院</p>
        </router-link>
      </div>
      <div class="scroll-item">
        <router-link :to="{ path: '/DeptAll', query: { scrollTo: 'ctc' } }">
          <img src="../assets/images/kk12.jpg" alt="Apple Watch" />
          <p>織品服裝學院</p>
        </router-link>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div
    class="modal fade"
    id="infoModal"
    tabindex="-1"
    aria-labelledby="infoModalLabel"
    aria-hidden="true"
    v-if="isModalVisible"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="infoModalLabel">{{ modalTitle }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>
        <div class="modal-body">這是關於{{ modalTitle }}的資訊。</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Banner Starts Here -->
  <div class="cards_1">
    <div class="main-banner header-text">
      <div class="container-fluid">
        <div class="owl-banner owl-carousel">
          <router-link to="/DeptAll">
            <div class="item">
              <img src="../assets/images/focus1095.jpg" alt="" />

              <div class="item-content">
                <div class="main-content">
                  <div class="meta-category">
                    <span>114年</span>
                  </div>
                  <a href="各學系資訊.html"><h4>各學系轉系資訊</h4></a>
                  <ul class="post-info">
                    <li><a href="#">查看資訊</a></li>
                    <li><a href="#">搜尋資訊</a></li>
                    <li><a href="#">轉系條件</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </router-link>
          <router-link to="/ApplyPaper">
            <div class="item">
              <img src="../assets/images/focus1.jpg" alt="" />
              <div class="item-content">
                <div class="main-content">
                  <div class="meta-category">
                    <span>114年</span>
                  </div>
                  <a href="申請.html"><h4>轉系申請</h4></a>
                  <ul class="post-info">
                    <li><a href="#">文件下載</a></li>
                    <li><a href="#">文件繳交</a></li>
                    <li><a href="#">前往察看</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </router-link>
          <router-link to="/QandA">
            <div class="item">
              <img src="../assets/images/focus03.jpg" alt="" />
              <div class="item-content">
                <div class="main-content">
                  <div class="meta-category">
                    <span>消息</span>
                  </div>
                  <a href="Q&A.html"><h4>轉系資訊Q&A</h4></a>
                  <ul class="post-info">
                    <li><a href="#">常見問題</a></li>
                    <li><a href="#">相關討論</a></li>
                    <li><a href="#">查詢文章</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </router-link>
          <router-link to="/LatestAnn">
            <div class="item">
              <img src="../assets/images/focus02.jpg" alt="" />
              <div class="item-content">
                <div class="main-content">
                  <div class="meta-category">
                    <span>消息</span>
                  </div>
                  <router-link to="/LatestAnn">
                    <a href="相關公告.html"><h4>轉系相關公告</h4></a>
                    <ul class="post-info">
                      <li><a href="#">114年</a></li>
                      <li><a href="#">轉系公告公文</a></li>
                      <li><a href="#">轉系辦法</a></li>
                    </ul>
                  </router-link>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- Banner Ends Here -->

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

  <!-- Bootstrap core JavaScript 



    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <script src="assets/js/custom.js"></script>
    <script src="assets/js/owl.js"></script>
    <script src="assets/js/slick.js"></script>
    <script src="assets/js/isotope.js"></script>
    <script src="assets/js/accordions.js"></script>

    <script language = "text/Javascript"> 
      cleared[0] = cleared[1] = cleared[2] = 0; //set a cleared flag for each field
      function clearField(t){                   //declaring the array outside of the
      if(! cleared[t.id]){                      // function makes it static and global
          cleared[t.id] = 1;  // you could use true and false, but that's more typing
          t.value='';         // with more chance of typos
          t.style.color='#fff';
          }
      }
    </script>-->
</template>

<script>
//這些是為了匯入模板做的努力
//後來也有放在index.html裡，但保險起見還是不要亂動，維持這樣
//包含import和require的部分
import "../assets/css/fontawesome.css";
import "../assets/css/templatemo-stand-blog.css";
import "../assets/css/owl.css";
import "../assets/css/flex-slider.css";

import "../vendor/bootstrap/css/bootstrap.min.css";

export default {
  name: "HelloWorld",
  mounted() {
    // 在 mounted 鉤子中引入 JS
    require("../assets/js/custom.js");
    require("../assets/js/owl.js");
    require("../assets/js/slick.js");
    require("../assets/js/isotope.js");
    require("../assets/js/accordions.js");

    //解決每次換頁，主頁下面的三個格子就跑掉的問題
    //選取class=owl-carousel的HTML，並啟動owlCarousel套件來變成輪播效果
    this.$nextTick(() => {
      $(".owl-carousel").owlCarousel({
        items: 3,
        loop: true,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,// 滑鼠移上去會暫停播放
      });
    });
  },
  data() {
    //都是彈窗的東西
    return {};
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.owl-carousel .item {
  margin: 10px;
}
.cards_1 {
  text-align: left !important;
}
</style>
