Vue.component('psi-grid-wrapper', {
    template: `<div class="x-grid psi-grid" :id="id"></div>`,
    props: {
        id: {type: String},
        url: {type: String},
        schema: {type: Object},
        aggregate: {type: Array, default: function() { return[]; }},
        columns: {type: Array},
        multipleSelect: {
            type: Boolean,
            default: false
        },
        pageSize: {
            type: Number,
            default: 500
        },
        gridHeight: {
            type: Number,
            default: 500
        },
        enableExcel: {
            type: Boolean,
            default: true
        },
        enableGrouping: {
            type: Boolean,
            default: true
        },
        enablePaging: {
            type: Boolean,
            default: true
        },
        autoHeight: {
            type: Boolean,
            default: false
        },
        columnMenu: {
            type: Boolean,
            default: true
        },
        excelProxy: { type: String, default: '' }
    },
    data() {
        return {
            gridData: [],
            selectedItems: [],
            generalErrors: [],
            ds: new kendo.data.DataSource({
                transport: {
                    read: function (operation) {
                        var data = operation.data.data || [];
                        operation.success(data);
                    },
                    parameterMap: function (options, operation) {
                        if (operation !== "read" && options.models) {
                            return {models: kendo.stringify(options.models)};
                        }
                    }
                },
                schema: this.schema,
                pageSize: this.pageSize,
                aggregate: this.aggregate
            })
        }
    },
    watch:
        {
            generalErrors: {
                handler: function(val, oldVal) {
                    this.$emit('on-error', this.generalErrors);
                },
                deep: true
            }
        },
    computed: {},
    methods: {
        onRowSelectedHandler(selectedRows) {
            if (typeof selectedRows !== 'undefined') {
                if (selectedRows.length > 0) {
                    this.selectedItems = [];
                    selectedRows.forEach(item => {
                        this.selectedItems.push(item);
                    });
                    this.$emit('rowSelected', this.selectedItems);
                }
            }
        },
        populateData() {
            try {
                var config = {};
                config.headers = {};
                //config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                axios.get(this.url, config)
                    .then(response => {
                        //region POPULATE STATEMENTS
                        this.gridData = [];
                        if (response.data) {
                            response.data.forEach(item => {
                                this.gridData.push(item);
                            });
                        }

                        let realGridHeight = this.gridHeight;
                        let count = this.gridData.length;
                        if (this.autoHeight) {
                            realGridHeight = (count * 33.6);
                            realGridHeight += 31.6;
                            if (this.enableExcel) {
                                realGridHeight += 38;
                            }
                            if (this.enableGrouping) {
                                realGridHeight += 36;
                            }
                            if (this.enablePaging) {
                                realGridHeight += 40.3;
                            }
                        }

                        this.$nextTick(function () {
                            $(this.$el).psiKendoGridWrapper(this.ds, this.columns, this.multipleSelect, this.onRowSelectedHandler, realGridHeight, this.enableExcel, this.enableGrouping, this.enablePaging, this.columnMenu, this.excelProxy); // RENDER THE GRID
                            this.ds.read({data: this.gridData}); // LOAD THE INFORMATION
                        });
                        //endregion
                    })
                    .catch(error => {
                        this.generalErrors.push(error);
                        this.$nextTick(function () {
                            $(this.$el).psiKendoGridWrapper(this.ds, this.columns, this.multipleSelect, this.onRowSelectedHandler, this.gridHeight, this.enableExcel, this.enableGrouping, this.enablePaging, this.columnMenu, this.excelProxy); // RENDER THE GRID
                            this.ds.read({data: this.gridData}); // LOAD THE INFORMATION
                        });
                    });
            }
            catch (err) {
                this.generalErrors.push(error);
            }
        }
    },
    created() {
    },
    mounted() {
        this.populateData();
    }
})