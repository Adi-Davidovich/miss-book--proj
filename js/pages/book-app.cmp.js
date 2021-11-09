import { bookService } from '../services/book-service.js'
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'

export default {
    components: {
        bookList,
        bookFilter
    },
    template: `
        <section class="book-app app-main" >
            <book-filter @filtered="setFilter"/>   
            <book-list :books="booksToShow"/>
        </section>
    `,
    data() {
        return {
            books: null,
            filterBy: null
        }
    },
    created() {
        this.loadBooks();
    },
    methods: {
        loadBooks(){
            bookService.query()
                .then(books => this.books = books)
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const { title, fromPrice, toPrice } = this.filterBy
            const searchStr = title.toLowerCase();
            const booksToShow = this.books.filter(book => {
                const bookTitle = book.title.toLowerCase()
                const amount = book.listPrice.amount;
                if (!fromPrice) return bookTitle.includes(searchStr)
                else return bookTitle.includes(searchStr) && amount > fromPrice && amount < toPrice
            });
            return booksToShow;

        }
    }
}