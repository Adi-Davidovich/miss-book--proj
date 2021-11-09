export default {
    template: `
        <section class="about-page app-main">
            <h3 ref="header">About us...</h3>
        </section>
    `,
    
    created() {
        console.log('Created');
    },
    mounted(){
        console.log('Mounted');
    }
};