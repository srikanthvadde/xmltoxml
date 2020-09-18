Vue.component('psi-datepicker-wrapper', {
    template: `<input :id="id" :value="value" :format="format" />`,
    props: {
        id: {type: String},
        value: {type: String},
        format: {type: String},
    },
    data() {
        return {
        }
    },
    watch:
        {
        },
    computed: {},
    methods: {

        onChange()
        {
            var datepicker =$("#"+this.id).data("kendoDatePicker").value();
            this.$emit('change', datepicker);
        }
    },
    created() {
    },
    mounted() {

        $(this.$el).kendoDatePicker({
            format: this.format,
            value: this.value,
            change: this.onChange,
        });




    },



})