Vue.component('date-picker-wrapper', {
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
            this.$emit('change', $("#"+this.id).data("kendoDatePicker").value());
        }
    },
    created() {
    },
    mounted() {
        $(this.$el).kendoDatePicker({
            format: this.format,
            value: this.value,
            change: this.onChange,
        }).attr("readonly","readonly");
    }
})