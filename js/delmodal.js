export default {
  data() {
    return {

    }
  },
  props: ['tempProduct', 'api'],
  template: `
  <div class="modal-dialog" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-danger text-white">
        <h5 id="exampleModalLabel" class="modal-title">
          <span>刪除產品</span>
        </h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
          取消
        </button>
        <button type="button" class="btn btn-danger" @click="deleteProduct">
          確認刪除
        </button>
      </div>
    </div>
  </div>
  `,
  methods: {
    deleteProduct() {
      // step7 執行刪除 axios.delete
      const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
      axios.delete(url).then((res) => {
        $('#delProductModal').modal('hide');
        this.$emit('update-data');
      });
    }
  }
}