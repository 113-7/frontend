<script setup>
import { inject } from "vue";

const session = inject("session");
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg container-fluid">
      <div class="container">
        <a class="navbar-brand" href="首頁.html">
          <h2>轉系生平台<em>.</em></h2>
        </a>

        <!-- 新增響應式按鈕 -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- 將導航項目包裹在 collapse 中 -->
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link to="/" @click="closeNavbar">
                <a class="nav-link">
                  首頁
                  <span class="sr-only"></span>
                </a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/DeptAll" @click="closeNavbar">
                <a class="nav-link" href="各學系資訊.html">各學系資訊</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/LatestAnn" @click="closeNavbar">
                <a class="nav-link" href="相關公告.html">相關公告</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/ApplyPaper" @click="closeNavbar">
                <a class="nav-link" href="申請.html">申請</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/QandA" @click="closeNavbar">
                <a class="nav-link" href="Q&A.html">Q&A</a>
              </router-link>
            </li>
            <li class="nav-item" v-if="!session">
              <router-link to="/LogIn" class="nav-link" @click="closeNavbar">登入</router-link>
            </li>
            <li class="nav-item" v-else>
              <router-link to="/UserProfile" class="nav-link" @click="closeNavbar">個人資料</router-link>
            </li>
            <li class="nav-item" v-if="session">
              <a href="#" class="nav-link" @click.prevent="logout" @click="closeNavbar">登出</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>

export default {
  name: "Navbar",
  methods: {
  closeNavbar() {
    const el = document.getElementById("navbarResponsive");
    const collapse = bootstrap.Collapse.getInstance(el);
    if (collapse) {
      collapse.hide();
    }
  }
}
};
</script>

<style scoped>
.nav {
  margin-top: -40px;
}
/*li {
  display: inline-block;
}
.collapse {
  margin-left: 700px;
}
.navbar-brand {
  margin-left: 50px;
}*/
</style>