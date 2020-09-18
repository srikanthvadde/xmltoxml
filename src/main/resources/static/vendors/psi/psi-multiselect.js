Vue.component('psi-multiselect', {
    template: `<select :id="id" class="form-control" multiple="multiple"></select>`,
    props: {
        id: {type: String},
        data: {type: Array},
        dataTextField: {type: String},
        dataValueField: {type: String},
    },
    data() {
        return {}
    },
    watch:
        {
        },
    computed: {},
    methods: {
        onChange() {
            this.$nextTick(function () {
                let x = $("#"+this.id).data("kendoMultiSelect");
                let result = x.value();
                let selected = [];
                for(let i = 0; i < result.length; ++i)
                {
                    selected.push(result[i]);
                }
                this.$emit("select",selected);
                console.log("selectedval:"+ selected);
            })
            //this.$emit('change', $("#"+this.id).data("kendoDateTimePicker").value());
        },
        forceInjectData(v)
        {
           this.injectData();
            if(v.id === this.id)
            {
                //console.log("injecteddata:"+v.data);
                console.log("id:"+v.id);
                this.$nextTick(function () {
                    var x = $("#"+this.id).data("kendoMultiSelect");
                    x.value(v.data);
                    console.log(x);
                });

            }
        },

        injectData(){
            this.$nextTick(function () {
                console.log("IN MOUNTED");
                $(this.$el).kendoMultiSelect({
                    dataSource: this.data,
                    dataTextField: this.dataTextField,
                    dataValueField: this.dataValueField,
                    select:this.onChange,
                    deselect:this.onChange
                });
            });

        }
    },
    created() {
    },
    mounted() {
        sharedEvents.$on('forceInjectData', this.forceInjectData);
    }
})