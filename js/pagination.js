// step3 建立換頁元件、帶外層資料進 pagedata
/*
  step4 頁碼優化

  頁碼數字 active 
  :class="{active: item === pagedata.current_page}

  PREV 如果當下頁碼 -1 === 0
  :disabled="(pagedata.current_page - 1) === 0" 
  :class="{disabled: (pagedata.current_page - 1) === 0}"

  NEXT 如果當下頁碼 === 總頁碼
  :disabled="pagedata.current_page === pagedata.total_pages"
  :class="{disabled: pagedata.current_page === pagedata.total_pages}
*/

export default {
  template: `
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li 
          class="page-item" 
          :disabled="(pagedata.current_page - 1) === 0"
          :class="{disabled: (pagedata.current_page - 1) === 0}">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Previous" 
            @click.prevent="passNum(pagedata.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>

        <li 
          class="page-item" 
          v-for="item in pagedata.total_pages" 
          :key="item" 
          :class="{active: item === pagedata.current_page}">
          <a 
            class="page-link" 
            href="#" 
            @click.prevent="passNum(item)">{{ item }}
          </a>
        </li>

        <li 
          class="page-item" 
          :disabled="pagedata.current_page === pagedata.total_pages"
          :class="{disabled: pagedata.current_page === pagedata.total_pages}">
          <a 
            class="page-link" 
            href="#" 
            aria-label="Next" 
            @click.prevent="passNum(pagedata.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  props: ['pagedata'],
  methods: {
    passNum(num) {
      // step4 把目前頁碼 $emit 到外層 getProduct
      // console.log(num);
      this.$emit('update', num);
    }
  }
}