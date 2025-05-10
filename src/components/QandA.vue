<template>
  <div class="heading-page header-text">
    <section class="page-heading">
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="text-content">
              <h4>Q&A</h4>
              <h2>常見問題與解答</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  <section class="blog-posts py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="bg-white p-4 shadow rounded">
            <h4 class="mb-4 text-black">Q&A 常見問題與解答</h4>

            <div class="accordion" id="faqAccordion">
              <div v-for="(q, index) in qaList" :key="index" class="accordion-item mb-3">
                <h2 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#faq' + index">
                    {{ q.q }}
                  </button>
                </h2>
                <div :id="'faq' + index" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">{{ q.a }}</div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="bg-dark text-light py-4">
    <div class="container text-center">
      <ul class="list-inline">
        <li class="list-inline-item">天主教輔仁大學</li>
        <li class="list-inline-item">242062 新北市新莊區中正路510號</li>
        <li class="list-inline-item">(02) 29052000</li>
        <li class="list-inline-item">pubwww@mail.fju.edu.tw</li>
      </ul>
      <p class="mt-2">| 天主教輔仁大學 © 2014-2022 版權所有，建議使用IE8.0以上瀏覽器瀏覽</p>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      qaList: [
        { q: "Q1：我什麼時候可以申請轉系？", a: "根據輔大校曆，轉系申請通常於每年 3月中下旬開放線上申請，詳情請見當年度教務處公告。" },
        { q: "Q2：可以從進修部轉到日間部嗎？", a: "根據教育部規定，自 110 學年度起，禁止不同學制間轉系。" },
        { q: "Q3：我是一年級新生，可以申請轉系嗎？", a: "需修讀滿一學年才具轉系資格，特例需經核准。" },
        { q: "Q4：我要準備哪些文件？", a: "轉系申請書、歷年成績單、學系規定資料（如讀書計畫、自傳等）" },
        { q: "Q5：可以申請轉到幾個學系？", a: "每位學生每學年限申請一個學系。" },
        { q: "Q6：成績要多好才可以轉？", a: "看GPA、總平均、排名與面試或筆試成績。" },
        { q: "Q7：申請後怎麼知道有沒有錄取？", a: "教務處於5月中公告轉系結果。" },
        { q: "Q8：轉系會延畢嗎？", a: "視原修課學分與新系課程差異而定。" },
        { q: "Q9：被錄取後可以反悔嗎？", a: "轉系錄取並完成手續即視為成功，不得撤回。" },
        { q: "Q10：我是陸生／僑生／外籍生，可以轉系嗎？", a: "須符合教育部規定並經國際事務處確認。" },
      ],
      comments: [
        { id: 1, user: "412691723", date: "2020/5/16", content: "教授不只看成績，也會問轉系原因...", avatar: require('@/assets/images/comment-author-01.jpg') },
        { id: 2, user: "418463679", date: "2020/5/20", content: "我花了一整個寒假準備資料和面試...", avatar: require('@/assets/images/comment-author-02.jpg') },
        { id: 3, user: "4124284992", date: "2025/3/28", content: "剛轉系那陣子真的很孤單...", avatar: require('@/assets/images/comment-author-03.jpg') },
      ],
      newComment: {
        user: '',
        content: '',
      },
    };
  },
  methods: {
    submitComment() {
      if (!this.newComment.user || !this.newComment.content) return;
      this.comments.push({
        ...this.newComment,
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        avatar: require('@/assets/images/comment-author-01.jpg')
      });
      this.newComment.user = '';
      this.newComment.content = '';
    },
  },
};
</script>

<style scoped>
.accordion-button {
  background-color: #f8f9fa;
  font-weight: bold;
}
.accordion-item {
  border-radius: 8px;
  overflow: hidden;
}
.text-primary{
  color:#ff8000;
}
.text-orange{
  color:#ff8000;
}
</style>
