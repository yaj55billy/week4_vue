
// step3 引入換頁模組
import pagination from './pagination.js';
Vue.component('pagination', pagination);

// step5 建立 Modal 元件
import modal from './modal.js';
Vue.component('modal', modal);

// step7 建立 刪除 元件
import delmodal from './delmodal.js';
Vue.component('delmodal', delmodal);

// vue-loading
Vue.component('loading', VueLoading);

new Vue({
  el: '#app',
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: [],
    },
    api: {
      uuid: 'e6527241-dd52-4bd8-94eb-eb0e02127c72',
      path: 'https://course-ec-api.hexschool.io/api/'
    },
    token: '',
    isLoading: false // vue-loading
  },
  methods: {
    openModal(status, item) {
      if (status === 'new') {

        this.tempProduct = {
          imageUrl: [],
        };
        $('#productModal').modal('show');

      } else if (status === 'edit') {
        // step5 取得遠端當下這筆
        this.isLoading = true;
        const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
        axios.get(url).then((res) => {
          this.tempProduct = res.data.data;
          $('#productModal').modal('show');
          this.isLoading = false;
        })
      } else if (status === 'delete') {
        // step7 取得遠端當下這筆
        this.isLoading = true;
        const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;
        axios.get(url).then((res) => {
          this.tempProduct = res.data.data;
          $('#delProductModal').modal('show');
          this.isLoading = false;
        })
      }
    },

    getProducts(num = 1) {
      // step2 api.get product 
      // step4 ?page=${num}
      this.isLoading = true;
      const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`
      axios.get(url).then((res) => {
        this.products = res.data.data;
        this.pagination = res.data.meta.pagination; // 分頁的資料傳遞會用到
        this.isLoading = false;
      });
      // step5 如果是編輯的狀況，會帶一筆 this.tempProduct
      if (this.tempProduct.id) {
        this.tempProduct = {
          imageUrl: [],
        };
        $('#productModal').modal('hide');
      } else {
        // step6 新增資料
        this.tempProduct = {
          imageUrl: [],
        };
        $('#productModal').modal('hide');
      }
    }
  },
  created() {
    // step1 將 token 帶進來
    this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
    this.getProducts();
  }
});
