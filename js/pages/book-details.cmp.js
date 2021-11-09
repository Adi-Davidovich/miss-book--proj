import { bookService } from "../services/book-service.js";
import longText from "../cmps/long-text.cmp.js";
import bookReview from "../cmps/book-review.cmp.js";

export default {
    components: {
        longText,
        bookReview
    },
    template: `
        <section v-if="book" class="book-details app-main flex space-between">
            <div class="images">
                <img :src="book.thumbnail" alt="" class="book-thumbnail-details">
                <img v-if="book.listPrice.isOnSale" class="sale-tag" src="../img/sale-tag.png" alt="">
            </div>
                <div class="main-details">
                    <p><strong>Id:</strong> {{book.id}}</p>
                    <p><strong>Title:</strong> "{{book.title}}"</p>
                    <p><strong>Subtitle:</strong> "{{book.subtitle}}"</p>
                    <p><strong>{{authorTagToDisplay}}</strong> {{authorsToDisplay}}</p>
                    <p><strong>Published date:</strong> {{book.publishedDate}}{{bookAge}}</p>
                    <p><strong>Description:</strong> <long-text :txt="book.description" /></p>
                    <p><strong>Page count:</strong> {{book.pageCount}} {{bookReading}}</p>
                    <p><strong>categories:</strong> {{categoriesToDisplay}}</p>
                    <p><strong>Language:</strong> {{book.language}}</p>
                    <p><strong>Price:</strong> <span :class="priceColor">{{priceToShow}}</span></p>
                </div>
            <book-review :book="book"/>
        </section>
        <section v-else class="loader app-main">
            <h2>Loading...</h2>
        </section>
    `,
    data() {
        return {
            book: null
        };
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId)
            .then(book => this.book = book);
    },
    computed: {
        bookReading() {
            if (this.book.pageCount > 500) return '- Long reading'
            else if (this.book.pageCount >= 200 && this.book.pageCount < 500) return '- Decent reading'
            else if (this.book.pageCount <= 100) return '- Light reading'
        },
        priceToShow() {
            const currencyCode = this.book.listPrice.currencyCode;
            const amount = this.book.listPrice.amount;
            return new Intl.NumberFormat('en', {style: 'currency', currency: currencyCode}).format(amount);
          },
        bookAge() {
            if (new Date(Date.now()).getFullYear() - this.book.publishedDate > 10) return '- Veteran book'
            else if (new Date(Date.now()).getFullYear() - this.book.publishedDate < 1) return '- New book!'
        },
        priceColor() {
            if (this.book.listPrice.amount > 150) return 'red'
            else if (this.book.listPrice.amount < 20) return 'green'
        },
        categoriesToDisplay() {
           return this.book.categories.join(', ')
        },
        authorsToDisplay() {
           return this.book.authors.join(', ')
        },
        authorTagToDisplay() {
           if (this.book.authors.length === 1) return 'Author:';
           else return 'Authors:';
        }
    }
}

