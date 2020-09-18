Vue.component('grid-wrapper', {
    template: `<div class="x-grid" :id="id" ></div>`,
    props: {
        id: {type: String},
        schema: {type: Object},
        columns: {type: Array},
        multipleSelect: {
            type: Boolean,
            default: false
        },
        pageSize: {
            type: Number,
            default: 10
        },
        exportFilename: {
            type: String,
            default: "export"
        }
    },
    data() {
        return {
            gridData: [],
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
                pageSize: this.pageSize
            }),

        }
    },
    watch:
        {},
    computed: {
        selectMode() {
            var selectMode = "single row";
            if (this.multipleSelect) {
                selectMode = "multiple row";
            }
            return selectMode;
        },
        gridOptions() {
            /*this.setStylesForGrid();*/
            return {
                /*toolbar: ["excel"],*/
                excel: {
                    allPages: true
                },
                excelExport: this.doExcelExport,
                dataSource: this.ds,
                selectable: this.selectMode,
                height: 450,
                sortable: true,
                pageable: true,
                groupable: false,
                filterable: true,
                columnMenu: true,
                reorderable: true,
                resizable: true,
                columns: this.columns,
                change: this.rowSelectHandler,
                dataBound: this.dataBoundHandler
            }
        }
    },
    methods: {

        dataBoundHandler() {
            //console.log("grid-wrapper::dataBoundHandler");
            this.$emit('on-row-selected', []); // Reset the selected rows during filter
        },
        rowSelectHandler(e) {
            //console.log("grid-wrapper::rowSelectHandler");
            var rows = e.sender.select();
            var selectedRows = [];
            var grid = $("#" + this.id).data("kendoGrid");
            for (let i = 0; i < rows.length; ++i) {
                var dataItem = grid.dataItem(rows[i]);
                selectedRows.push(dataItem)
            }

            if (typeof selectedRows !== 'undefined') {
                this.$emit('on-row-selected', selectedRows);
            }
        },
        initGrid() {
            //console.log("grid-wrapper::initGrid");
            this.$nextTick(function () {
                $(this.$el).kendoGrid(this.gridOptions);
                this.ds.read({data: this.gridData});
            });
        },
        forceInjectGridData(v) {
            //console.log("grid-wrapper::forceInjectGridData");
            //console.log(v);
            if (this.id === v.id) {
                this.gridData = v.data;
                this.ds.read({data: this.gridData});
                var grid = $('#' + this.id).data('kendoGrid');
                //alert(this.id);
                grid.refresh();
            }
        },
        doExcelExport(e) {
            var formattedDate = kendo.toString(new Date(), 'dd-MMM-yyyy_HHmm');
            e.workbook.fileName = this.exportFilename + '_' + formattedDate + '.xlsx';
            var sheet = e.workbook.sheets[0];
            for (var rowIndex = 1; rowIndex < sheet.rows.length; rowIndex++) {
                var row = sheet.rows[rowIndex];
                for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                    row.cells[cellIndex].format = "MM-dd-yyyy hh:mm"
                    //if (columnExcelFormat) {
                    //row.cells[cellIndex].format = columnExcelFormat[cellIndex];
                    //} else {
                    //  row.cells[cellIndex].format = "dd-MM-yyyy hh:mm";
                    //}
                }
            }
        },
    },
    created() {
        //console.log("grid-wrapper::created");
    },
    mounted() {
        //console.log("grid-wrapper::mounted");
        this.initGrid();
        sharedEvents.$on('forceInjectGridData', this.forceInjectGridData);
    }
});