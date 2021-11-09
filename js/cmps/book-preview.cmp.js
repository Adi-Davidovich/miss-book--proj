export default {
  props: ['book'],
  template: `
        <div class="book-preview">
            <div class="title">"{{book.title}}" </div>
            <div class="images">
                <img :src="book.thumbnail" alt="" class="book-thumbnail-preview">
                <img v-if="book.listPrice.isOnSale" class="sale-tag" src="../img/sale-tag.png" alt="">
            </div>
            <div class="price">price: <span>{{priceToShow}}</span></div>
        </div>
    `,
  computed: {
    priceToShow() {
      const currencyCode = this.book.listPrice.currencyCode;
      const amount = this.book.listPrice.amount;
      return new Intl.NumberFormat('en', {style: 'currency', currency: currencyCode}).format(amount);
    },
  },
};
