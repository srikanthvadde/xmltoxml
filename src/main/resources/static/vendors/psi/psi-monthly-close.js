Vue.component('psi-monthly-close', {
    template: `
  
    `,
    data:  {
            axiosConfig: {
                headers: {
                    [document.querySelector('meta[name="_csrf_header"]').content]: document.querySelector('meta[name="_csrf"]').content
                }
            },
            errors: [],
            monthlyEntry: "",
            controls: {
                notesControl: null
            },
            dsMonthlyClosing: {},
            filterOptions: {
                ignoreCase: true,
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains",
                    minLength: "99",
                    showOperators: false
                }
            },
            month: 0,
            year: 0,
            loadType: $('#projectChangeType').val()

    },
    watch: {},
    methods: {
        setupControls() {
            let self = this;
            self.dsMonthlyClosing = new kendo.data.DataSource({
                transport: {
                    read: function (operation) {
                        let data = operation.data.data || [];
                        operation.success(data);
                    }
                },
                schema: {
                    model: {
                        id: "idProject"
                    }
                },
                pageSize: 100,
                serverFiltering: false,
                serverGrouping: false,
                serverPaging: false,
                serverSorting: false
            });

            this.controls.notesControl = $("#closeNotes").kendoEditor({
                tools: []
            });


            let monthlyClosingGridElement = $('#monthly-closing-grid').kendoGrid({
                toolbar: kendo.template($("#template").html()),
                dataSource: self.dsMonthlyClosing,
                scrollable: true,
                filterable: false,
                resizeable: true,
                sortable: true,
                pageable: true,
                persistSelection: true,
                selectable: false,
                height: 550,
                columns: [{
                        selectable: true,
                        width: 3
                    },
                    {
                        field: "idProject",
                        title: "idProject",
                        hidden: true
                    },
                    {
                        field: "name",
                        title: "Project Name",
                        width: 20,
                        filterable: this.filterOptions
                    },
                    {
                        field: "code",
                        title: "Project Code",
                        width: 20,
                        filterable: this.filterOptions,
                        hidden: true
                    },
                    {
                        field: "sageProjectCode",
                        title: "SAGE Code",
                        width: 20,
                        filterable: this.filterOptions
                    },
                    {
                        field: "companyName",
                        title: "Customer Name",
                        width: 20,
                        filterable: this.filterOptions
                    },
                    {
                        field: "businessUnit",
                        title: "Business Unit",
                        width: 20,
                        filterable: this.filterOptions
                    },
                    {
                        field: "operativeUnit",
                        title: "Location",
                        width: 20,
                        filterable: this.filterOptions
                    }
                ],
                change: function (e) {
                    var selectedRows = this.select();
                    var totalSelectedRows = selectedRows.length;
                    monthlyClosingGridElement.find('#monthlyclose').hide();
                    if (totalSelectedRows > 0)
                        monthlyClosingGridElement.find('#monthlyclose').show();
                }
            });

            monthlyClosingGridElement.find("#monthYear").kendoDropDownList({
                dataTextField: "labelValue",
                dataValueField: "valueValue",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/monthly-closings/get-month-year-list',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                change: function () {
                    var value = this.value();
                    var splitMonthYearValue = value.split('/');
                    this.month = splitMonthYearValue[1];
                    this.year = splitMonthYearValue[2];
                    self.loadData(this.month, this.year);
                    $('#monthly-closing-grid').data('kendoGrid').refresh();
                }
            });


            monthlyClosingGridElement.find('#monthlyclose').hide();
            monthlyClosingGridElement.find('#searchBox').on('keyup', function (e) {
                var valueInput = $(this);
                monthlyClosingGridElement.searchGrid(valueInput.val());
            });
            monthlyClosingGridElement.searchGrid = function (textInput) {
                let searchBoxValue = textInput;
                if (searchBoxValue === null || searchBoxValue === undefined) return;

                let filter = {
                    logic: "or",
                    filters: [{
                            field: "companyName",
                            operator: "contains",
                            value: searchBoxValue
                        },
                        {
                            field: "name",
                            operator: "contains",
                            value: searchBoxValue
                        },
                        {
                            field: "sageProjectCode",
                            operator: "contains",
                            value: searchBoxValue
                        },
                        {
                            field: "businessUnit",
                            operator: "contains",
                            value: searchBoxValue
                        },
                        {
                            field: "operativeUnit",
                            operator: "contains",
                            value: searchBoxValue
                        }

                    ]
                };
                self.dsMonthlyClosing.filter(filter);
            };
            monthlyClosingGridElement.find('#monthlyclose').on('click', function (e) {
                let grid = $("#monthly-closing-grid").data("kendoGrid");
                let project = grid.dataItem(grid.select());
                if (project === null || project === undefined) psi.alert('Please select a project');
                var ids = [];
                var rows = grid.select();
                rows.each(function (e) {
                    var id = grid.dataItem(this).idProject;
                    ids.push(id);
                });

                self.monthlyClose(ids);
            });

        },
        loadData(localMonth, localYear) {
            let self = this;

            axios.get('../api/v1/monthly-closings?type=' + this.loadType + '&month=' + localMonth + '&year=' + localYear, self.axiosConfig)
                .then(res => {
                    self.dsMonthlyClosing.read({
                        data: res.data
                    });
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {

                });
        },
        monthlyClose(selectedId) {
            let self = this;
            let dropdown = $("#monthYear").data("kendoDropDownList");
            let selectedValue = dropdown.value();
            var splitMonthYearValue = selectedValue.split('/');
            self.month = splitMonthYearValue[1];
            self.year = splitMonthYearValue[2];
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            axios.get('../api/v1/monthly-closings/import-process-validate?idProjects=' + selectedId + '&type=' + self.loadType + '&month=' + self.month + '&year=' + self.year, self.axiosConfig)
                .then(res => {

                    let monthlyClose = {
                        idProject: res.data.idProject,
                        notes: "",
                        month: res.data.months,
                        monthDisplay: monthNames[self.month - 1],
                        year: res.data.years,
                        type: res.data.type,
                        checkGL1: res.data.isCheckGL,
                        checkEHR: res.data.isCheckEHR,
                        checkOH: res.data.isCheckOH

                    };
                    self.showMonthlyCloseNotes(monthlyClose);

                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {

                });


        },

        onImportGLEH()
        {
            window.open("/importData/importDataExcel");
        },

        onMonthlyCloseSave(monthlyEntry) {
            this.errors = [];
            this.controls.notesControl = $("#closeNotes").data("kendoEditor");

            let checkGL1text = $("#checkGL1").text();
            let checkEHRtext = $("#checkEHR").text();
            let checkOHtext = $("#checkOH").text();

            let notes = this.controls.notesControl.value();
            if (notes === "") {
                psi.alert('Notes is required.');
                return;
            }
            notes = notes + checkGL1text + checkEHRtext + checkOHtext;

            let monthlyClose = {
                idProject: monthlyEntry.idProject,
                notes: notes,
                months: monthlyEntry.month,
                years: monthlyEntry.year,
                type: monthlyEntry.type
            };

            this.resetClosingModal(true);
            axios.post('../api/v1/monthly-closings/', monthlyClose, this.axiosConfig)
                .then(res => {
                    if (res.data.result == "success") {
                        psi.alert("Success!");
                        this.loadData(monthlyEntry.month, monthlyEntry.year);
                        $('#monthly-closing-grid').data('kendoGrid').refresh();
                    } else {
                        psi.alert("Oops something went wrong! " + res.data.errors['generalErrors']);
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .then(() => {
                });

        },
        resetClosingModal(closeModal) {
            this.controls.notesControl = $("#closeNotes").data("kendoEditor");
            this.controls.notesControl.value('');
            if (closeModal) $("#costClosingModal").modal("hide");
        },
        showMonthlyCloseNotes(each) {
            this.monthlyEntry = each;
            this.resetClosingModal(false);
            $("#costClosingModal").modal("show");
        }
    },
    mounted() {
        let self = this;
        self.setupControls();
        var today = new Date();
        var initialMonth = today.getMonth() + 1;
        var initialYear = today.getFullYear();
        self.loadData(initialMonth, initialYear);
    }
});