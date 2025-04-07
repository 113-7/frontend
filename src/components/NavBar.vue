<template>
  <header class="">
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" href="首頁.html"
          ><h2>轉系生平台<em>.</em></h2></a
        >

        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
              <router-link to="/">
                <a class="nav-link"
                  >首頁
                  <span class="sr-only"></span>
                </a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/DeptAll">
                <a class="nav-link" href="各學系資訊.html">各學系資訊</a>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/LatestAnn">
                <a class="nav-link" href="相關公告.html">相關公告</a>
              </router-link>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="申請.html">申請</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="Q&A.html">Q&A</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="登入.html">登入</a>
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
};
</script>

<style scoped>
li {
  display: inline-block;
}
.collapse {
  margin-left: 700px;
}
.navbar-brand {
  margin-left: 50px;
}
</style>