import bookPreview from './book-preview.cmp.js'

export default {
    components: {
        bookPreview
    },
    props: ['books'],
    template: `
        <ul v-if="books" class="book-list">
            <li v-for="book in books" :key="book.id" class="book-preview-container" >
                <book-preview :book="book"/>
                <router-link :to="'/book/'+book.id">Details</router-link>
            </li>
        </ul>   
    `,
    methods: {
        
    }
}