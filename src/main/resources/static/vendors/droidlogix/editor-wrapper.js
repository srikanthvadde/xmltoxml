Vue.component('editor-wrapper', {
    template: `<textarea :id="id" :value="value"></textarea>`,
    props: {
        id: {type: String},
        value: {type: String},
    },
    data() {
        return {
            editor: null,
        }
    },
    watch:
        {
        },
    computed: {},
    methods: {
        onChange()
        {
            this.$emit('change', $("#"+this.id).data("kendoEditor").value());
        },
        forceUpdateValue(id, v)
        {
            console.log(v);
            if(id === this.id) {
                $("#" + this.id).data("kendoEditor").value(v);
            }
        }
    },
    created() {
    },
    mounted() {
        $(this.$el).kendoEditor({
            resizable: {
                content: true,
            },
            change: this.onChange,
            tools:[
                "bold",
                "italic",
                "underline",
                "strikethrough",
                "justifyLeft",
                "justifyCenter",
                "justifyRight",
                "justifyFull",
                "insertUnorderedList",
                "insertOrderedList",
                "indent",
                "outdent",
                //"tableWizard",
                "createTable",
                "addRowAbove",
                "addRowBelow",
                "addColumnLeft",
                "addColumnRight",
                "deleteRow",
                "deleteColumn",
                //"viewHtml"
            ]});
        this.editor = $("#"+this.id).data("kendoEditor");
        sharedEvents.$on('forceUpdateValue', this.forceUpdateValue);
    }
})