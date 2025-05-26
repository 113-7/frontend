<template>
  <header>
    <nav class="navbar navbar-expand-lg container-fluid">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <h2>轉系生平台<em>.</em></h2>
        </router-link>

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
            <li class="nav-item">
              <router-link to="/" @click="closeNavbar" class="nav-link">
                首頁
                <span class="sr-only"></span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/DeptAll" @click="closeNavbar" class="nav-link">
                各學系資訊
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                to="/AnnouncementList"
                @click="closeNavbar"
                class="nav-link"
              >
                相關公告
              </router-link>
            </li>

            <li class="nav-item" v-if="session && session.role === 'student'">
              <router-link
                to="/ApplyPaper"
                @click="closeNavbar"
                class="nav-link"
              >
                申請
              </router-link>
            </li>
            <li class="nav-item" v-if="session && session.role === 'student'">
              <router-link to="/StudentForum" @click="closeNavbar" class="nav-link">
                討論區
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/QandA" @click="closeNavbar" class="nav-link">
                Q&A
              </router-link>
            </li>
            <li class="nav-item" v-if="!session">
              <router-link to="/LogIn" class="nav-link" @click="closeNavbar"
                >登入</router-link
              >
            </li>
            <li class="nav-item" v-else>
              <router-link
                to="/UserProfile"
                class="nav-link"
                @click="closeNavbar"
              >
                <div v-if="session.role === 'student'">個人資料</div>
                <div v-else>管理學系</div>
              </router-link>
            </li>
            <li class="nav-item" v-if="session">
              <a href="#" class="nav-link" @click.prevent="handleLogout"
                >登出</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";
import { onMounted, onBeforeUnmount } from "vue";

const session = inject("session");
const router = useRouter();

//關閉選單方法
const closeNavbar = () => {
  const el = document.getElementById("navbarResponsive");
  const collapse = bootstrap.Collapse.getInstance(el);
  if (collapse) {
    collapse.hide();
  }
};

const logout = async () => {
  try {
    const response = await fetch("/api/SA/logout.php", {
      method: "POST",
      credentials: "include",
    });

    const data = await response.json();
    if (data.status === "success") {
      session.value = null; // 清除登入狀態
      alert("登出成功！");
      router.push("/LogIn");
    } else {
      console.error("後端登出失敗");
    }
  } catch (err) {
    console.error("登出錯誤:", err);
  }
};

//按下按鈕後關閉選單
const handleLogout = async () => {
  await logout();
  closeNavbar();
};

// 點擊頁面外部時關閉選單
const handleOutsideClick = (event) => {
  const navbar = document.getElementById("navbarResponsive");
  const toggler = document.querySelector(".navbar-toggler");

  if (
    navbar.classList.contains("show") &&
    !navbar.contains(event.target) &&
    !toggler.contains(event.target)
  ) {
    closeNavbar();
  }
};
// 在組件掛載時添加事件監聽器
onMounted(() => {
  document.addEventListener("click", handleOutsideClick);
});
// 在組件卸載時移除事件監聽器
onBeforeUnmount(() => {
  document.removeEventListener("click", handleOutsideClick);
});
</script>

