export default {
    template: `
   <div class="book-filter">
   <label>Search: By book title</label>
            <input @input="filter" v-model="filterBy.title" type="text" placeholder="Search...">
        <form>
            <label>By price</label>
            <input v-model.number="filterBy.fromPrice" type="number" placeholder="from"> -
            <input v-model.number="filterBy.toPrice" type="number" placeholder="to">
            <button @click.prevent="filter">Go</button>
        </form>
   </div>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                fromPrice: null,
                toPrice: Infinity,
            }
        };
    },
    methods: {
        filter() {
            if (!this.filterBy.toPrice) this.filterBy.toPrice = Infinity;
            this.$emit('filtered', { ...this.filterBy });
            console.log(filterBy);
            //deep copy
            // this.$emit('filtered', JSON.parse(JSON.stringify(this.filterBy)));
        }
    }
};
