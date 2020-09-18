Vue.component('scheduler-wrapper', {
    template: `<div :id="id"></div>`,
    props: {
        id: {type: String},
    },
    data() {
        return {
            componentData: [],
            /*ds: new kendo.data.DataSource({
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
            })*/
        }
    },
    watch:
        {},
    computed: {
        componentOptions() {
            return {
                toolbar: ["excel"],
                excel:{
                    allPages: true
                },
                excelExport: this.doExcelExport,
                dataSource: this.ds,
                selectable: this.selectMode,
                height: 550,
                sortable: true,
                pageable: true,
                groupable: true,
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
        initComponent() {
            //console.log("grid-wrapper::initGrid");
            this.$nextTick(function () {
                /*$(this.$el).kendoGrid(this.componentOptions);
                this.ds.read({data: this.gridData});*/

                $(this.$el).kendoScheduler({
                    workDayStart: new Date(2000, 1, 1, 0, 0, 0),
                    workDayEnd: new Date(2050, 12, 31, 23, 59, 59),
                    showWorkHours: true,
                    date: new Date(),
                    startTime: new Date(),
                    views: [
                        {type: "month", selected: true},
                        "day",
                        {type: "timeline", eventHeight: 50}
                    ],
                    editable: false,
                    selectable: true,
                    dataSource: {
                        batch: true,
                        transport: {
                            read: {
                                url: this.context + "secured-api/v1/get-interview-appointment-schedule?idJobVacancy=",
                                dataType: "json",
                                method: "POST",
                                beforeSend: function(request){
                                    //var config = {};
                                    //config.headers = {};
                                    //config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                                    //request.headers = config.headers;
                                    request.setRequestHeader(document.querySelector('meta[name="_csrf_header"]').content, document.querySelector('meta[name="_csrf"]').content);
                                    //console.log(request);
                                },
                            }
                        },
                        requestEnd: function (e) {
                            //Once Task and User DataSource have been fetched, create the Scheduler
                            //alert(JSON.stringify(e));
                        },
                        schema: {
                            model: {
                                id: "idInterviewAppointment",
                                fields: {
                                    idInterviewAppointment: {from: "idInterviewAppointment", type: "number"},
                                    title: {
                                        from: "title",
                                        defaultValue: "No title",
                                        validation: {required: true}
                                    },
                                    start: {type: "date", from: "startDateTime"},
                                    end: {type: "date", from: "endDateTime"},
                                    description: {from: "checklistRemarks"}
                                }
                            }
                        }
                    },
                    change: this.scheduler_change
                });
            });
        },
        forceInjectScheduleData(v) {
            //console.log("grid-wrapper::forceInjectGridData");
            //console.log(v);
            if(this.id === v.id) {
                this.gridData = v.data;
                this.ds.read({data: this.gridData});
                var grid = $('#' + this.id).data('kendoGrid');
                grid.refresh();
            }
        },
    },
    created() {
        //console.log("grid-wrapper::created");
    },
    mounted() {
        //console.log("grid-wrapper::mounted");
        this.initComponent();
        sharedEvents.$on('forceInjectScheduleData', this.forceInjectScheduleData);
    }
});