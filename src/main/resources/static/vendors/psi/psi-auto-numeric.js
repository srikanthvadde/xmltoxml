Vue.component('psi-auto-numeric', {
    template: `<input  :id="id"  class="form-control" v-bind:value="value" v-on:input="$emit('input', $event.target.value)"/>`,
    props: ['id','value'],

    data() {
        return {

        }
    },
    methods:{


    },

    mounted(){

        new AutoNumeric('#'+this.id, {
            styleRules:
            AutoNumeric.options.styleRules.positiveNegative,
            watchExternalChanges: true

        });

    }


});