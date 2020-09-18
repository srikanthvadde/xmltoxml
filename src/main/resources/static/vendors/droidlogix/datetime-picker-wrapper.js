Vue.component('datetime-picker-wrapper', {
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
            this.$emit('change', $("#"+this.id).data("kendoDateTimePicker").value());
        }
    },
    created() {
    },
    mounted() {
        $(this.$el).kendoDateTimePicker({
            format: this.format,
            value: this.value,
            change: this.onChange,
        }).attr("readonly","readonly");
    }
})