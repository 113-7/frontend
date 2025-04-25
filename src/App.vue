<template>
  <NavBar/>
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue'
import HelloWorld from './components/HelloWorld.vue'
import { provide, ref, onMounted } from 'vue';


export default {
  name: 'App',
  components: {
    NavBar,
    HelloWorld
  },
  setup() {
    const session = ref(null);

    provide('session', session); // 提供 reactive session

    const fetchSession = async () => {
      try {
        const response = await fetch('/api/SA/get_session.php');
        const data = await response.json();
        console.log('回傳資料:', data); 

        if (data.status === 'success') {
          session.value = data.session;
        } else {
          console.error('沒有登入的會話', data.message);
        }
      } catch (error) {
        console.error('發生錯誤:', error);
      }
    };

    onMounted(() => {
      fetchSession();
    });

    return {
      session,
    };
  }
}
  

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
