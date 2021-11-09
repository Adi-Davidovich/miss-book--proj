import { bookService } from '../services/book-service.js' 

export default {
    template: `
        <section class="book-add app-main">
           <input type="text" @input="searchBook" v-model="searchInput" placeholder="Search for a book by its title">
           <ul>
               <li v-for="googleBook in googleBooks">
                   {{googleBook.volumeInfo.title}} 
                   <button @click="addBook(googleBook)">+</button>
               </li>
           </ul>
        </section>
    `,
    data() {
        return {
            searchInput: '',
            googleBooks: []
        }
    },
    methods: {
        searchBook(){
            return axios.get(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${this.searchInput}`)
            .then(res => {
                this.googleBooks = res.data.items
            })
        },
        addBook(googleBook) {
            console.log(googleBook);
            bookService.addGoogleBook(googleBook)
                .then(book => this.$router.push('/book'))
        }
    }
}