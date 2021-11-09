import bookPreview from './book-preview.cmp.js'

export default {
    components: {
        bookPreview
    },
    props: ['books'],
    template: `
    <section class="book-list">
        <ul v-if="books" class="book-list-container">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book"/>
                <router-link :to="'/book/'+book.id">Details</router-link>
            </li>
        </ul>   
    </section>
    `,
    methods: {
        
    }
}