<template>
  <link
    href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i&display=swap"
    rel="stylesheet"
  />

  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>log in</h4>
              <h2>輔仁大學 - 學生資訊登入入口</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- Banner Ends Here -->

  <section class="contact-us">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="down-contact">
            <div class="row">
              <div class="col-lg-8">
                <div class="sidebar-item contact-form">
                  <div class="sidebar-heading">
                    <h2>登入 - 請使用輔仁大學單一帳號 (LDAP) 登入</h2>
                  </div>
                  <div class="content">
                    <form id="contact" action="" method="post">
                      <div class="row">
                        <div class="col-md-12 col-sm-12">
                          <fieldset>
                            <input
                              v-model="email"
                              type="text"
                              id="email"
                              placeholder="帳號"
                              required=""
                            />
                          </fieldset>
                        </div>
                        <div class="col-md-12 col-sm-12">
                          <fieldset>
                            <input
                              v-model="subject"
                              type="password"
                              id="subject"
                              placeholder="密碼"
                            />
                          </fieldset>
                        </div>
                        <div class="col-lg-12">
                          <fieldset>
                            <button
                              type="submit"
                              id="form-submit"
                              class="main-button bt_1"
                            >
                              登入</button
                            ><br />

                            <a
                              href="https://whoami.fju.edu.tw/pw_forget.php"
                              target="_blank"
                              >忘記密碼 <i class="fa fa-question"></i
                            ></a>
                          </fieldset>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="sidebar-item contact-information">
                  <div class="sidebar-heading">
                    <h2>天主教輔仁大學聯絡資訊</h2>
                  </div>
                  <div class="content">
                    <ul>
                      <li>
                        <h5>(02) 29052000</h5>
                        <span>電話號碼</span>
                      </li>
                      <li>
                        <h5>pubwww@mail.fju.edu.tw</h5>
                        <span>EMAIL</span>
                      </li>
                      <li>
                        <h5>242062 新北市新莊區中正路510號</h5>
                        <span>地址</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-12">
          <div id="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3614.9336837935034!2d121.43126543533164!3d25.03632451626951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a7dd8be91eaf%3A0xe342a67d6574f896!2z5aSp5Li75pWZ6LyU5LuB5aSn5a24!5e0!3m2!1szh-TW!2stw!4v1743391021521!5m2!1szh-TW!2stw"
              width="100%"
              height="450px"
              frameborder="0"
              style="border: 0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
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
      login: {
        name: "",
        password: "",
      },
    };
  },
  methods:{
    letLogin(){
        fetch()
    }
  }
};
</script>