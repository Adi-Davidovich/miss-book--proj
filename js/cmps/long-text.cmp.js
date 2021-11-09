export default {
    props: ['txt'],
    template: `
    <section v-if="txt" class="long-text">
        <div>
            <p v-if="txt.length > 100 && !isOpen">{{shortTextToDisplay}} </p>
            <p v-if="txt.length <= 100 || isOpen">{{txt}}</p>
            <a v-if="txt.length > 100" @click="onShowMore" href="#">{{tagShowToDisplay}}</a>
        </div>
    </section>
    <section v-else>
        Description is not available
    </section>
    `,
    data() {
        return {
            isOpen: false
        }
    },
    watch: {
        txt: function () {
            this.isOpen = false;
        }
    },
    methods: {
        onShowMore() {
            this.isOpen = !this.isOpen;
        }
    },
    computed:{
        shortTextToDisplay(){
            return this.txt.substring(0,100)+' ...';
        },
        tagShowToDisplay(){
            if (!this.isOpen) return 'Show more';
            else return 'Show less';
        }
    },
  

}