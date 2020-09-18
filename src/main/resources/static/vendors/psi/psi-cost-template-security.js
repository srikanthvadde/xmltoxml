Vue.component('psi-cost-template-security', {
    template: `
        <div id="cost-template" class="container-fluid">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h4>Project Cost Template</h4>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="editor-tab" data-toggle="tab"
                                    href="#editor-content"
                                    role="tab" aria-controls="home" aria-selected="true">Cost Rules</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="editor-content" role="tabpanel"
                                    aria-labelledby="home-tab">
                                    <div style="min-height: 600px;">
                                        <div class="row" style="display: none;" :style="{ display: hasErrors }">
                                            <div class="alert alert-danger" role="alert">
                                                <span class="glyphicon glyphicon-exclamation-sign"></span>
                                                <ul>
                                                    <li v-for="item in generalErrors">{{item}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="container-fluid">
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <p>
                                                            <button class="btn btn-primary"
                                                                    title="Add Root Node"
                                                                    @click="onAddTemplateNode('root')">
                                                                <span class="icon-plus"></span> New Template
                                                            </button>
                                                            <button class="btn btn-light"
                                                                    title="Add Child Node"
                                                                    @click="onAddTemplateNode('child')">
                                                                <span class="icon-plus"></span> Add Child
                                                            </button>
                                                            <button class="btn btn-primary" 
					                                           title="Force Update"
					                                           @click="onForceUpdate">
				                                              <span class="icon-reload"></span>Force Update
			                                                 </button>
                                                        </p>
                                                        &nbsp;
                                                        <template v-if="loadPsiTreeviewWrapper">
                                                            <psi-treeview-wrapper id="menuTreeView"
                                                                                @item-selected="onItemSelectedHandler"
                                                                                :nodes="nodes"
                                                            ></psi-treeview-wrapper>
                                                        </template>
                                                    </div>
                                                    <div class="col-md-6">
                                                    	<form @submit.prevent>
                                                        <div v-show="hasSelectedItem"
                                                            :style="{ display: hasMenuData }">
                                                            <p style="text-align: right">
                                                            <button type="button" class="btn btn-primary" @click="onSubmit">Save</button>
                                                                <button @click="onDeleteMenu"
                                                                        class="btn btn-danger">
                                                                    Delete
                                                                </button>
                                                            </p>
                                                                <div class="form-group">
                                                                    <label>Title</label>
                                                                    <input v-model="menu.title" type="text" disabled="disabled" class="form-control" placeholder="">
                                                                </div>
                                                                <!--<div class="form-group">
                                                                    <label>Code</label>
                                                                    <input v-model="menu.code" type="text" disabled="disabled" class="form-control" placeholder="">
                                                                </div>-->
                                                                <div class="form-group">
                                                                    <label>Formula</label>
                                                                    <input v-model="menu.formula" type="text" :disabled="menu.isMultipleFormula" class="form-control" id="formula">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label>Fraction Digits</label>
                                                                    <input v-model="menu.fractionDigits" class="form-control col-sm-3" type="number">
                                                                </div>
                                                                <div class="form-group">
                                                                     <label>Number Style</label>
                                                                     <select v-model="menu.formatStyle" class="form-control col-sm-3" id="formatStyle">
                                                                     <option value=""></option>
                                                                     <option value="decimal">Decimal</option>
                                                                     <option value="percent">Percent</option>
                                                                     </select>
                                                                </div>
                                                                <div class="form-group">
                                                                    <input type="checkbox" v-model="menu.isChildAddable" value="true"/>
                                                                    <label>Node Can Add Child?</label>
                                                                </div>
                                                                <div class="form-group">
                                                                    <input type="checkbox" v-model="menu.isForecastEditable" value="true"/>
                                                                    <label>Node Can Edit?</label>
                                                                </div>
                                                                <div class="form-group">
                                                                    <input type="checkbox" @click="onChangeCheckBox" v-model="menu.isMultipleFormula" value="true"/>
                                                                    <label>Got Multiple Formula?</label>
                                                                </div>
                                                                <div class="form-group" v-show="menu.isMultipleFormula">
                                                                     <label>Formula Versioning</label>
                                                                     <select placeholder="formula version" v-model="menu.formulaVersion" class="form-control" id="formulaVersion">
                                                                     <option value="0">Please Select</option>
                                                                     <option v-for="x in formulaVersions" v-bind:value="x.idKeyValue">
                                                        				{{ x.nodeName }}
    																</option>
                                                                     </select>
                                                                </div>
                                                                <div class="form-group">
                                                                    <label >Ledger Accounts</label>
                                                                    <select  v-model="menu.ledger"  class="form-control" id="ledgerAccounts" multiple="multiple" required="required" ></select>
                                                                </div>
                                                                
                                                                <input type="hidden" v-model="menu.idProjectCostTemplate">
                                                        </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Start Add Template Modal -->
            <div class="modal fade" id="templateNodeModal" tabindex="-1" role="dialog"
                aria-labelledby="newTemplateNode" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Template Node</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <div class="input-group" style="padding: 5px 0;">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="sequenceNo">{{this.newSequenceDisplay}}</span>
                                                </div>
                                                <input id="nodeTitle" v-model="nodeModal.title" type="text" placeholder="Title" class="form-control" aria-describedby="sequenceNo"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="saveTemplateModal">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Add Template Modal -->

            <!-- Start Add Child Node Modal -->
            <div class="modal fade" id="childNodeModal" tabindex="-1" role="dialog"
                aria-labelledby="newChildNode" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add New Child Node</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <div class="input-group" style="padding: 5px 0;">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text" id="sequenceNo">{{this.newSequenceDisplay}}</span>
                                                </div>
                                                <select v-model="nodeModal.title" placeholder="Title" class="form-control" id="costTitles" aria-describedby="sequenceNo">
                                                    <option v-for="costTitle in costTitles" v-bind:value="costTitle.nodeName">
                                                        {{ costTitle.nodeName }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="saveTemplateModal">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End Add Child Node Modal -->

        </div>
    `,
    data: function () {
        return {
            nodeModal: {
                title: "",
                code: "",
                formula: "",
                isForecastEditable: false,
                isChildAddable: false,
                isMultipleFormula: false,
                modalMode: "",
                fractionDigits: 0,
                formatStyle: "decimal",
                newSequence: 0
            },
            nodes: [],
            flatNodes: [],
            menu: {
                ledger: [],
                formulaVersion: [],
            },
            ledger: {},
            formulaVersions: [],
            generalErrors: [],
            loadPsiTreeviewWrapper: false,
            costTitles: [],

        }
    },
    watch: {},
    computed: {
        newSequenceDisplay() {
            let self = this;
            if (!self.menu.idProjectCostTemplate || self.menu.idParent === 0) return self.nodeModal.newSequence.toString();
            if (self.menu.idParent > 0) {
                var counted = self.nodeModal.newSequence + 1;
                return self.menu.sequenceDisplay + "." + counted;
            }
        },
        hasMenuData() {
            let self = this;
            if (self.menu === null) {
                return "none";
            } else {
                return "block";
            }
        },
        hasSelectedItem() {
            let self = this;
            return !!self.menu.idProjectCostTemplate;
        },
        hasErrors() {
            return "none";
        }
    },
    methods: {
        onChangeCheckBox() {
            if (!this.menu.isMultipleFormula) {
                this.menu.formula = '';
                this.menu.formulaVersion = 0;
            }
        },
        saveTemplateModal() {
            try {
                let self = this;
                let title = self.nodeModal.title;
                let type = self.nodeModal.modalMode;
                let validation = self.validateNodeName(title, type === 'child' ? self.menu.idProjectCostTemplate : '0');
                if (!validation) {
                    psi.alert(title + ' already used in this template. Please input another name.');
                    return
                } else {
                    console.log('No duplicate. ' + title + ' saved to database.');
                }

                self.onModalSaveTemplateNode(type, title);
            } catch (err) {
                console.error(err);
            }
            $("#templateNodeModal").modal("hide");
            $('#childNodeModal').modal('hide');
        },
        getTemplates() {
            let self = this;
            try {
                axios.get('/api/v1/project/cost/template') //list of root nodes
                    .then((response) => {
                        self.nodes = [];
                        response.data.forEach(item => {
                            self.nodes.push(item);
                        });
                    })
                    .catch((error) => {
                        self.generalErrors.push(error);
                    });


                axios.get('/api/v1/project/cost/template?flat=true') //list of root nodes and it contents
                    .then((response) => {
                        self.flatNodes = [];
                        response.data.forEach(item => {
                            self.flatNodes.push(item);
                        });
                    })
                    .catch((error) => {
                        self.generalErrors.push(error);
                    });
            } catch (err) {
                console.error(err);
            }
        },
        onModalSaveTemplateNode(type, title) {
            try {
                let self = this;
                let idParent = type === 'child' ? self.menu.idProjectCostTemplate : 0;

                let config = {};
                config.headers = {};

                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                axios.post('/api/v1/project/cost/template', {
                    idProjectCostTemplate: 0,
                    idParent: idParent,
                    title: title,
                    sequence: self.nodeModal.newSequence,
                    sequenceDisplay: self.newSequenceDisplay,
                    descriptionPlaceholder: "",
                    amountPlaceholder: 0,
                    isMandatory: false,
                    isTemplateRoot: type !== 'child',
                    children: []
                }, config)
                    .then((response) => {
                        if (response.data.result === 'success') {
                            self.getTemplates();
                        } else {
                            self.generalErrors = response.data.errors['generalErrors'];
                        }
                    })
                    .catch((error) => {
                        self.generalErrors.push(error);
                    });
            } catch (err) {
                console.error(err);
            }
        },
        onDeleteMenu() {
            let self = this;
            psi.confirm("Are you sure you want to delete this node?", () => {
                try {
                    try {
                        let config = {};
                        config.headers = {};
                        config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                        axios.delete('/api/v1/project/cost/template?id=' + self.menu.idProjectCostTemplate, config)
                            .then((response) => {
                                if (response.data.result !== 'success'){
                                    self.generalErrors = response.data.errors['generalErrors'];
                                }

                                self.menu = {};
                                self.getTemplates();
                            })
                            .catch((error) => {
                                self.generalErrors.push(error);
                            });
                    } catch (err) {
                        console.error(err);
                    }
                } catch (err) {
                    self.generalErrors.push(err);
                    self.getTemplates();
                }
            }, () => {});
        },
        onAddTemplateNode(t) {
            let self = this;
            self.nodeModal.title = "";
            if (t === 'child') {
                if (!self.menu.idProjectCostTemplate) {
                    psi.alert('Please select a node');
                    return;
                } else {
                    self.getMaxSequence(self.menu.idProjectCostTemplate);
                }
                self.nodeModal.modalMode = t;
                $("#childNodeModal").modal("show");
            } else {
                self.getMaxSequence(0);
                self.nodeModal.modalMode = t;
                $("#templateNodeModal").modal("show");
            }
        },
        onSubmit() {
            let self = this;
            try {
                let multi = $("#ledgerAccounts").getKendoMultiSelect();
                self.menu['ledger1'] = multi.dataItems();

                if (this.menu.isMultipleFormula === true) {
                    if (this.menu.formulaVersion === 0) {
                        psi.alert("Multiple Formula is require to select formula version");
                        $('#formulaVersion').addClass("errorinput");
                        return;
                    } else if (this.menu.formula !== '') {
                        psi.alert("Multiple Formula is not require formula text input");
                        $('#formula').addClass("errorinput");
                        return;
                    }
                }

                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                self.menu.projectCostTemplates = self.flatNodes;
                axios.post('/api/v1/project/cost/template', self.menu, config)
                    .then((response) => {
                        if (response.data.result === 'success') {
                            psi.alert('Save success.');
                            self.getTemplates();
                        } else {
                            self.generalErrors = response.data.errors['generalErrors'];
                            psi.alert('Save failed[1]. ' + self.generalErrors);
                        }

                    })
                    .catch((error) => {
                        self.generalErrors.push(error);
                        psi.alert('Save failed[0]. ' + self.generalErrors);
                    });
            } catch (err) {
                console.error(err);
            }
        },
        onItemSelectedHandler(item) {
            let self = this;
            if (item !== null) {
                if (item.length > 0) {
                    self.menu = item[0].original;
                }
            }
            if (typeof self.menu.idProjectCostTemplate != "undefined")
                self.getNewDrop(self.menu.idParent);
        },
        getNewDrop(idParent) {
            let self = this;
            try {
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                let parentNode = self.getNodeById(idParent);
                if (!parentNode) {
                    // psi.alert('Parent node not found.');
                    return;
                }
                /* while (parentNode.idParent != 0) {
                     parentNode = self.getNodeById(parentNode.idParent);
                 }*/

                axios.post('/api/v1/project/cost/template/fetchAllLedgerVal?id=' + parentNode.idProjectCostTemplate + '&templateId=' + self.menu.idProjectCostTemplate, self.flatNodes, config)
                    .then((response) => {

                        let ids = [];
                        let dataSource = new kendo.data.DataSource({
                            data: response.data['ledger']
                        });

                        $.each(response.data['ledger1'], function (i, item) {
                            ids.push(item.idKeyValue);
                        });

                        let multiselect = $("#ledgerAccounts").data("kendoMultiSelect");
                        multiselect.setDataSource(dataSource);
                        multiselect.value(ids);


                    });

            } catch (err) {
                console.error(err);
            }

        },
        getMaxSequence(idParent) {
            try {
                let self = this;
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;

                axios.get('/api/v1/project/cost/template/max-sequence?id=' + idParent, config)
                    .then((response) => {
                        if (response.data.result === 'success') {
                            let json = JSON.parse(response.data.data);
                            self.nodeModal.newSequence = json.data;
                        } else {
                            self.generalErrors = response.data.errors['generalErrors'];
                        }
                        self.getTemplates();
                    })
                    .catch((error) => {
                        self.generalErrors.push(error);
                    });
            } catch (err) {
                console.error(err);
            }
        },
        validateNodeName(title, idParent) {
            let self = this;
            if (!title || !idParent) return false;
            if (self.nodes && self.nodes.length <= 0) return true;

            if (idParent === '0') {
                // If parent id = 0
                // Check if template name already exists
                for (let i = 0; i < self.nodes.length; i++) {
                    if (title.toLowerCase() === self.nodes[i].title.toLowerCase()) {
                        psi.alert(title + ' already used as a template name. Please input another name.');
                        return false;
                    } else
                        return true;
                }
            } else {
                // If parent id != 0
                // Go up until found parent id = 0
                // From the top, loop the children make sure new name is not used yet
                let parentNode = self.getNodeById(idParent);
                if (!parentNode) {
                    psi.alert('Parent node not found.');
                    return;
                }

                while (parentNode.idParent != 0) {
                    parentNode = self.getNodeById(parentNode.idParent);
                }

                if (!parentNode) {
                    psi.alert('Top parent node not found');
                    return;
                }

                let isTitleAlreadyExists = self.isTitleExists(title, parentNode.idProjectCostTemplate, null);
                return !isTitleAlreadyExists;
            }
        },
        isTitleExists(title, idParent, nodes) {
            let self = this;
            if (!title || !idParent) return false;
            if (!nodes) {
                nodes = [];
                for (let i = 0; i < self.nodes.length; i++) {
                    if (self.nodes[i].idProjectCostTemplate == idParent) {
                        nodes.push(self.nodes[i]);
                    }
                }
            }

            if (!nodes || nodes.length <= 0) return false;

            let result = false;

            _.forEach(nodes, x => {
                if (x.title.toLowerCase() === title.toLowerCase()) {
                    console.log('Found duplicate: ' + x.title);
                    result = true;
                }

                if (!result) {
                    if (x.children && x.children.length > 0) {
                        let exist = self.isTitleExists(title, idParent, x.children);
                        if (exist) result = true;
                    }
                }
            });

            return result;
        },
        getNodeById(id) {
            let self = this;
            for (let i = 0; i < self.flatNodes.length; i++) {
                let node = self.flatNodes[i];
                if (node.idProjectCostTemplate == id) {
                    return node;
                }
            }
        },
        getLedgerAccountsDropdown(id) {
            let self = this;
            self.ledger = $("#ledgerAccounts").kendoMultiSelect({
                autoClose: false,
                index: 0,
                optionLabel: " ",
                dataTextField: "nodeName",
                dataValueField: "idKeyValue",
                dataSource: {
                    transport: {
                        read: {
                            cache: false,
                            dataType: "json",
                            url: '/api/v1/key-value/fetch-all-ledgers?id=' + id
                        }
                    }
                }
            }).data("kendoMultiSelect");
        },
        loadCostTitles(id) {
            let self = this;
            try {
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                axios.get('/api/v1/key-value/fetch-all-cost-titles-by-id?id=' + id, config)
                    .then((response) => {
                        if (response.data.length > 0) {
                            $.each(response.data, function (i, item) {
                                self.costTitles.push(item);
                            });
                        } else {
                            self.generalErrors = response.data.errors['generalErrors'];
                        }
                    })
                    .catch((error) => {
                        self.generalErrors.push(error);
                    });
            } catch (err) {
                console.error(err);
            }
        },
        loadFormulaVersion() {
            let self = this;
            try {
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                axios.get('/api/v1/key-value/fetch-by-type?type=Formula Version', config)
                    .then((response) => {
                        if (response.data.length > 0) {
                            $.each(response.data, function (i, item) {
                                self.formulaVersions.push(item);
                            });
                        } else {
                            self.generalErrors = response.data.errors['generalErrors'];
                        }
                    })
                    .catch((error) => {
                        self.generalErrors.push(error);
                    });
            } catch (err) {
                console.error(err);
            }
        },
        onForceUpdate() {
            try {
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;

                axios.get('/api/v1/project/cost/template/forceUpdateLedgersToAllProjects', this.config)
                    .then((response) => {
                        if(response.data.result!='fail'){
                            psi.alert("Mapped The Latest Ledgers to All Active Projects:  "+response.data.count)
                        }else{
                            psi.alert("Mapped The Latest Ledgers to  Active Projects Count: "+response.data.count+"<br/>"+"Error Desc: "+response.data.errors['generalErrors'])
                        }
                    })
            }catch (err) {
                self.generalErrors.push(err);
            }
        }

    },
    mounted() {
        let self = this;
        $('#templateNodeModal').modal({
            backdrop: 'static',
            focus: true,
            show: false
        })
            .on('shown.bs.modal', e => {
                $('#nodeTitle').focus();
            });
        self.getTemplates();
        self.getMaxSequence(0);
        self.getLedgerAccountsDropdown(0);
        self.loadCostTitles(0);
        self.loadFormulaVersion();
        self.loadPsiTreeviewWrapper = true;
    }
});