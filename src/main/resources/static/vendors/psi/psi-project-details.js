Vue.component('psi-project-details', {
    template: `
    <div class="container-fluid" style="padding:0;" id="root">
            <div class="card">
                <div class="card-body" style="padding-top:0px;padding-left:2px;padding-right:2px;">                   
                    <div class="row">
                        <div class="col">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active lesstabheight" data-toggle="tab" href="#projectDetails-content" role="tab" @click.prevent="setActiveTabName('pdetails')"><b><i class="nav-icon cui-tags"></i>Details</b></a>
                                </li>
                                <li class="nav-item" id="sales-budget-tab" >
                                    <a class="nav-link lesstabheight" data-toggle="tab" href="#salesBudget-content" role="tab" @click.prevent="setActiveTabName('sbudget')"><i class="nav-icon cui-dollar"></i><b>Sales Forecast</b></a>
                                </li>
                                <li class="nav-item" id="stake-holder-tab">
                                    <a class="nav-link lesstabheight" data-toggle="tab" href="#stakeHolder-content" role="tab" @click.prevent="setActiveTabName('sholder')"><i class="nav-icon cui-people"></i><b>Stakeholder</b></a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link lesstabheight" id="history-tab" data-toggle="tab" href="#history-content" role="tab" @click.prevent="setActiveTabName('log')"><i class="nav-icon cui-align-center"></i><b>History</b></a>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                           
                                <div class="tab-pane fade show active"
                                    id="projectDetails-content" role="tabpanel"
                                    aria-labelledby="stake-holder-tab">
                                
                                    <span  v-if="errors.length" class="text-danger">
                                            <b>Please correct the following error(s):</b>
                                        <ul>
                                            <li v-for="error in errors">{{ error }}</li>
                                        </ul>
                                    </span> 
                                    
                                    <fieldset>
                                        <legend style="font-size: 15px">
                                            <b>Business Information</b>
                                        </legend>
                                       
                                        <div class="form-group row">
                                            <label for="projectType" class="col-sm-2 col-form-label">Project
                                                Type<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="projectType" id="projectType" style="width: 100%" disabled />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="businessUnit" class="col-sm-2 col-form-label">Business
                                                Division<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="businessUnit" id="businessUnit"
                                                    style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="operativeUnit" class="col-sm-2 col-form-label">Operative
                                                Unit<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="operativeUnit" id="operativeUnit"
                                                    style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="expectedOrderIntake" class="col-sm-2 col-form-label">Expected Order Intake<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="expectedOrderIntake" id="expectedOrderIntake" style="width: 100%" />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend style="font-size: 15px">
                                            <b>Project Profile</b>
                                        </legend>
                                        <div class="form-group row">
                                            <label for="projectName" class="col-sm-2 col-form-label">Project Name<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="projectName" id="projectName" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="projectCode" class="col-sm-2 col-form-label">Project
                                                Code<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="projectCode" id="projectCode" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="sageCode" class="col-sm-2 col-form-label">SAGE Code<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="sageCode" id="sageCode" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="tenderNo" class="col-sm-2 col-form-label">Tender
                                                No</label><br/>
                                            <div class="col-sm-8">
                                                <input name="tenderNo" id="tenderNo" class="form-control"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="dateOfTender" class="col-sm-2 col-form-label">Date Of Tender</label><br/>
                                            <div class="col-sm-8">
                                                <input name="dateOfTender" id="dateOfTender" style="width: 100%"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="contractNo" class="col-sm-2 col-form-label">Contract No</label><br/>
                                            <div class="col-sm-8">
                                                <input name="contractNo" id="contractNo" class="form-control"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="dateOfContract" class="col-sm-2 col-form-label">Date Of Contract</label><br/>
                                            <div class="col-sm-8">
                                                <input name="dateOfContract" id="dateOfContract" style="width: 100%"/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="customer"
                                                class="col-sm-2 col-form-label">Customer<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="customer" id="customer" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="endCustomer"
                                                class="col-sm-2 col-form-label">End Customer<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="endCustomer" id="endCustomer" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="scope" class="col-sm-2 col-form-label">Scope</label><br/>
                                            <div class="col-sm-8">
                                                        <textarea rows="4" name="scope" id="scope" class="form-control" ></textarea>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="incoTerms" class="col-sm-2 col-form-label">INCO Terms<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="incoTerms" id="incoTerms" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="expectedStartDate" class="col-sm-2 col-form-label">Expected Start Date<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="expectedStartDate" id="expectedStartDate" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="expectedDeliveryDate" class="col-sm-2 col-form-label">Expected Delivery Date</label><br/>
                                            <div class="col-sm-8">
                                                <input name="expectedDeliveryDate" id="expectedDeliveryDate" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="dateOfCompletion" class="col-sm-2 col-form-label">Date
                                                Of Completion<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="dateOfCompletion" id="dateOfCompletion" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="endOfWarranty" class="col-sm-2 col-form-label">End
                                                of Warranty<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="endOfWarranty" id="endOfWarranty" style="width: 100%" />
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend style="font-size: 15px">
                                            <b>Currency Details</b>
                                        </legend>
                                        <div class="form-group row">
                                            <label for="contractValue" class="col-sm-2 col-form-label">Contract
                                                Value<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input type="number" name="contractValue" id="contractValue" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="engineeringHour" class="col-sm-2 col-form-label">Engineering Hour Rate<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input type="number" name="engineeringHour" id="engineeringHour" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="contractualCurrency" class="col-sm-2 col-form-label">Contractual
                                                Currency<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="contractualCurrency" id="contractualCurrency" style="width: 100%" required/>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="localCurrency" class="col-sm-2 col-form-label">Local
                                                Currency<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input name="localCurrency" id="localCurrency" style="width: 100%" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="exchangeRate" class="col-sm-2 col-form-label">Exchange
                                                Rate<font color="red" size="4">*</font></label><br/>
                                            <div class="col-sm-8">
                                                <input type="number" name="exchangeRate" id="exchangeRate" class="form-control" />
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <label for="paymentTerms" class="col-sm-2 col-form-label">Payment Terms</label><br/>
                                            <div class="col-sm-8">
                                                <input type="number" name="paymentTerms" id="paymentTerms" class="form-control" maxlength="2"/>
                                                 <label>Months/Weeks</label>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend style="font-size: 15px">
                                            <b>Other Details</b>
                                        </legend>
                                        <div class="form-group row">
                                            <label for="notes" class="col-sm-2 col-form-label">Notes4564646</label><br/>
                                            <div class="col-sm-8">
                                                        <textarea rows="4" name="notes" id="notes" class="form-control"></textarea>
                                            </div>
                                        </div>
                                      
                                    </fieldset>
                                </div>
                              
                                <div class="tab-pane" id="salesBudget-content" role="tabpanel"
                                    aria-labelledby="stake-holder-tab" style="padding: 5px 15px;">
                                    <div class="row" style="display: none;" :style="{ display: hasErrors }">
                                        <div class="alert alert-danger" role="alert">
                                            <span class="glyphicon glyphicon-exclamation-sign"></span>
                                            <ul>
                                                <li v-for="item in generalErrors">{{item}}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div v-if="project && project.status === 'FORECAST' && this.nodes.length === 0">
                                        <button type="button" id="selectProjectCostTemplate" class="btn btn-light" style="margin-bottom: 10px;" @click="openSelectCostTemplateDialog">
                                            <i class="cui-layers"></i>Load From Template
                                        </button>
                                    </div>
                                     <div class="alert alert-danger" role="alert" id="infoMsg" style="display:none;"></div>
                                                           
                                        <div class="modal fade mx-auto" tabindex="0" role="dialog" id="modalData">
                                              <div class="modal-dialog modal-dialog-centered justify-content-center " role="document">
                                                       <psi-progress-bar v-bind:width="0" ></psi-progress-bar>
                                              </div>
                   </div>  
                                    <psi-cost-table id="costTable" :id-project="idProject" :nodes="nodes" :project="project"
                                                    v-on:save-project-cost="onSaveProjectCost" :show-save-button="false" :viewmode="this.viewMode" :current-user="currentUser"></psi-cost-table>
                                                 
                                </div>
                                <div class="tab-pane fade"
                                    id="stakeHolder-content" role="tabpanel"
                                    aria-labelledby="stake-holder-tab">
                                    <div class="grid-wrap">
                                        <div id="stake-holder-grid"></div>
                                    </div>
                                </div>
                                <div class="tab-pane fade"
                                    id="history-content" role="tabpanel"
                                    aria-labelledby="history-tab">
                                    <div class="grid-wrap">
                                        <div id="project-log-grid"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                    <div class="row">
                        <div id="commandButton" class="col" style="text-align: center;padding-top:3px;">
                            <button id="importButton" type="button" v-if="project && project.status === 'ACTIVE' && tabName ==='sbudget' && !project.importInd" class="btn btn-primary" data-toggle="modal" data-target="#myModal" @click="refreshTheModal">Import</button>
                            <button id="saveProjectButton" class="btn btn-primary"  @click="saveProject">Save</button>
                            <button id="cancelButton" class="btn btn-secondary" @click="returnToProjectListPage">Cancel</button>
                        </div>
                    </div>
                   
                </div>
            </div>
            <div>
                <div class="modal fade" id="formModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Stakeholder</h5>
                                <button type="button" class="close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div id="stockHolderWarningAlert" class="alert alert-warning form-group"
                                    style="display: none;">
                                    <strong>Warning!</strong> Complete required fields (*)
                                </div>
                                <div class="form-group row">
                                    <label for="shname" class="col-sm-4 col-form-label">
                                        Name<span class="required">*</span>
                                    </label><br/>
                                    <div class="col-sm-8">
                                        <select id="shname" class="form-control" style="witdh:100%;"></select>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="title" class="col-sm-4 col-form-label">
                                        Title
                                    </label><br/>
                                    <div class="col-sm-8">
                                        <input name="title" id="title" class="form-control" readonly="readonly"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="email" class="col-sm-4 col-form-label">
                                        Email
                                    </label><br/>
                                    <div class="col-sm-8">
                                        <input name="email" id="email" class="form-control" readonly="readonly"/>
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="title" class="col-sm-4 col-form-label">
                                        Mobile Number
                                    </label><br/>
                                    <div class="col-sm-8">
                                        <input name="mobileNumber" id="mobileNumber" class="form-control" readonly="readonly"/>
                                    </div>
                                    <input type="hidden" id="rowNum" value="-1"/>
                                </div>
                                <div class="form-group row">
                                    <div class="col-sm-4">
                                        <button type="button" class="btn btn-primary" @click="saveStakeHolder">Save
                                        </button>
                                        <button type="button" class="btn btn-neutral" data-dismiss="modal">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
             <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog" style="max-width:1000px;" id="myUploadModal">
    
      <!-- Modal content-->
      <div class="modal-content">
 
       <div class="alert alert-danger" role="alert" id="infoMsg1" style="display:none;"></div>
     
        <div class="modal-header">
          <h4 class="modal-title">Import Data</h4>
        </div>
        <div class="modal-body">
     
          <div class="form-group" id="fileUploadXl"  >
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="uploadLabel">Upload<font color="red">*</font></span>
							</div>
							<div class="custom-file col-sm-4">
								<input type="file" class="custom-file-input"  required  
									 id="inputGroupFileCost" name="menu.file" @change="someHandler"
									 aria-describedby="uploadLabel" accept=".xls,.xlsx">
								<label class="custom-file-label" for="inputGroupFileCost">Please select Proper file based on type</label>
							</div>
						</div>
					</div>
			<div id="import-data-cost-actual" ></div> 
        </div>
        <div class="modal-footer">
          <button  id="submit" class="btn btn-primary"
						@click="showOnUpload" >Show Data</button>
						 <button  id="submit1" class="btn btn-primary "
						@click="onModalImportVerify" style="display:none;"  >Verify</button>
						    <button  id="submit2" class="btn btn-primary "
						@click="onModalImport" style="display:none;" data-dismiss="modal" >Save</button>
                     <button type="button"  class="btn btn-primary mx-left" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
					
		
	
            <!-- Start SELECT Template Modal -->
            <div class="modal fade" id="selectTemplateModal" tabindex="-1" role="dialog" aria-labelledby="selectTemplate" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Select Project Cost Template</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="container">
                                    <div class="row">
                                        <div class="col">
                                            <div style="padding: 5px 0;">
                                                <input id="nodeTitle" type="text" placeholder="SEARCH" class="form-control" v-model="costTemplate.keyword"/>
                                            </div>
                                            <div id="entity-list-container" class="list-group" style="overflow-y: auto;">
                                                <ul id="entity-list"
                                                    style="background-color: #ffffff; list-style-type: none; padding: 0;">
                                                    <li v-for="item in filteredCostTemplates">
                                                        <a href="javascript:void(0);" class="list-group-item" :class="{ active : costTemplate.selectedTemplate.title == item.title }"
                                                        @click="onCostTemplateClick(item)"><input
                                                                class="idContainer"
                                                                type="hidden"
                                                                value="' + id + '"/>
                                                            <h5 class="list-group-item-heading" style="margin-bottom: 0;">{{ item.title }}</h5>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" @click="onSelectedCostTemplate">SELECT</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- End SELECT Template Modal -->
        </div>
        
        
       `,
    data: function() {
        return {
        	tabName:"pdetails",
            nodes: [],
            menu: {},
            generalErrors: [],
            isAdministrator: Boolean,
            errors: [],
            axiosConfig: {
                headers: {
                    [document.querySelector('meta[name="_csrf_header"]').content]: document.querySelector('meta[name="_csrf"]').content
                }
            },
            idProject: '',
            viewMode: $('#view-id').val(),
            project: null,
            filterOptions: {
                ignoreCase: true,
                cell: {
                    operator: "contains",
                    suggestionOperator: "contains",
                    minLength: "99",
                    showOperators: false
                }
            },
            controls: {
                projectType: null,
                businessUnitControl: null,
                operativeUnitControl: null,
                incoTermsControl: null,
                contractualCurrencyControl: null,
                localCurrencyControl: null,
                customerControl: null,
                endCustomerControl: null,
                expectedOrderIntakeControl: null,
                endOfWarrantyControl: null,
                dateOfContractControl: null,
                expectedStartDateControl: null,
                expectedDeliveryDateControl: null,
                dateOfCompletionControl: null,
                dateOfTenderControl: null,
                scopeControl: null,
                notesControl: null,
                paymentTermsControl:null,
                shSelectNameControl: null
            },
            stakeHolders: {
                list: []
            },
            costTemplate: {
                keyword: "",
                templates: [],
                selectedTemplate: {}
            },
            menu:{
              	uploadfile:null,
              	totalImportList: {},
                totalList:[],
                monthList:"",
              },
            dsHistoryLog: {},
            dsStakeHolder: {}
        };
    },
    watch: {},
    computed: {
        filteredCostTemplates() {
            let len = this.costTemplate.keyword.length;
            if (len >= 2) {
                let filteredList = [];
                this.costTemplate.templates.forEach(function (item) {
                    if (item.title.toLowerCase().includes(this.costTemplate.keyword.toLowerCase())) {
                        filteredList.push(item);
                    }
                }.bind(this));
                return filteredList;
            }
            return this.costTemplate.templates;
        },
        hasErrors() {
            return "none";
        }
    },
    methods: {
        someHandler(){
            var fileName = document.getElementById('inputGroupFileCost').files[0].name;
            $('.custom-file-label').html(fileName);
        },

        onModalImportVerify(){
            try {

                let self = this;
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                config.headers["'Content-Type': 'multipart/form-data'"];
                let bpmnFile = document.getElementById('inputGroupFileCost').files[0];
                let formData = new FormData();
                formData.append('file', bpmnFile);
                self.menu["idProject"] = self.idProject;
                self.menu["columnsMap"] = "MH";
                self.menu["indicator"] = "X";
                formData.append('data', JSON.stringify(self.menu));


                axios.post('/api/v1/import-data/verifyDataImportProjectCost', formData, config)
                    .then((response) => {

                    if(response.data.result!="fail"){
                    if(response.data.data!=null)
                    {
                        $("#infoMsg1").show();
                        $("#infoMsg1").html("Mismatched The following Excel Project costs,Please re-check Cost Titles and Save");
                        var ul = $("div#infoMsg1");
                        ul.append('<i id ="image" class="fa fa-info-circle" ></i>');
                        console.log("Mismatched:"+response.data.data.titles);
                        this.checkMismatchRecords(response.data.data.titles);
                    }else{
                        $("#submit2").show();
                    }
                }
            })
            } catch (err) {
                console.error(err);
            }

        },

        onModalImport(){
              try {

                  let self = this;
                  let config = {};
                  config.headers = {};
                  config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                  config.headers["'Content-Type': 'multipart/form-data'"];
                  let bpmnFile = document.getElementById('inputGroupFileCost').files[0];
                  let formData = new FormData();
                  formData.append('file', bpmnFile);
                  self.menu["idProject"] = self.idProject;
                  self.menu["columnsMap"] = "MH";
                  self.menu["indicator"] = "Y";
                  formData.append('data', JSON.stringify(self.menu));
                  $("#modalData").modal("show");
                  axios.post('/api/v1/import-data/showDataImportProjectCost', formData, config)
                      .then((response) => {
                    	  
                            if(response.data.result!="fail"){
                                  $("#infoMsg").show();
                                  $("#infoMsg").text("Successfully imported the data");
                                  $("#modalData").modal("hide");
                                  $("#importButton").hide();
                                  if (self.idProject > 0)
                                      window.location.href = '/project/' + self.idProject;
                              }else{

                                    $("#infoMsg").show();
                                    $("#infoMsg").text("Error:Something is wrong!! Please reupload");
                                    $("#modalData").modal("hide");
                  }
              })
              } catch (err) {
                  console.error(err);
              }

          },

        checkMismatchRecords(titles){

            var  html = "<div><b>Mismatched Project Costs(Please Re-verify the Cost title names:</b><ul>";
            titles.forEach(function(value)
            {
                console.log(value.title);
                var result = value.title;
                html += "<li>" + result + "</li>";
            });
            html += "</ul></div>";

            $('#image').popover({
                html: true,
                content: html
            });
        },

          showGrid(gridData) {
        	     var dataSource = new kendo.data.DataSource({
        	       data:gridData,
        	       serverPaging: false,
        	       pageSize: 46,
        	     });
        	    var columnsArray = [];
        	    	columnsArray = [];
        	        columnsArray.push(
        	    {field: "titleForGrid", title: "Cost title", width: 80 },
        	    {field: "monthYear", title: "Month", width: 80},
				{field: "forecast", title: "Forecast", width: 150},
				{field: "actual", title: "Actuals", width: 150 },
				{field: "variance", title: "Variance", width: 80});
        	
        	    $("#import-data-cost-actual").kendoGrid({
        	        dataSource: dataSource,
        	    	scrollable: true,
    				filterable: true,
    				resizeable: true,
    				sortable: true,
    				height: 450,
    				serverPaging: true,
    				navigatable: true,
    				pageable: {
                        alwaysVisible: true
                    },
                   
        	        columns: columnsArray
        	      
        	    });
        	},
          
        	  showOnUpload(){
          	  try {
          		  
          	    let self = this;
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                config.headers["'Content-Type': 'multipart/form-data'"];
                let bpmnFile = document.getElementById('inputGroupFileCost').files[0];
                
                  
                if (typeof(bpmnFile) == 'undefined')
                {
                	$("#infoMsg1").show();
                	$("#infoMsg1").text("Please select the File"); 
                	return false;
                }else {
                	$("#infoMsg1").hide();
                }
                
                if("P"!= bpmnFile.name.substring(0,1) )
                {
                  	 $("#infoMsg1").show();
             		 $("#infoMsg1").text("Error:The Uploaded file is not correct Destiantion file.Please reupload the file ");
                  	 return false;
                }
                  
                let formData = new FormData();
                formData.append('file', bpmnFile);
                self.menu["idProject"] = self.idProject;
                self.menu["indicator"] = "N";
                self.menu["columnsMap"] = "MH";
                formData.append('data', JSON.stringify(self.menu));
                $("#submit").hide();

                axios.post('/api/v1/import-data/showDataImportProjectCost', formData, config)
                    .then((response) => {

                      	  if(response.data.result!="fail"){
                      	      response.data.data.titles.forEach(function (item){
                                  self.menu.totalList = self.menu.totalList.concat(item.entries);
                              });
                          	  this.showGrid(self.menu.totalList);
                          	  this.menu.totalImportList = response.data.data;
                          	  this.menu.monthList = response.data.payload;

                          	  $("#submit1").show();
                          	  $("#infoMsg").hide();
                      	  }else{
                      		  $("#infoMsg1").show();
                      		  $("#infoMsg1").text("Error:Something is wrong!! Please reupload");
                      	  }

                        })
                } catch (err) {
                    console.error(err);
                }
            },
    	
    	
    	setActiveTabName(name) {
    		$('#saveProjectButton').show();
    	     if(name==='log')
    	    	 $('#saveProjectButton').hide();
    	    },
        setupControls() {
            let self = this;
            self.dsHistoryLog = new kendo.data.DataSource({
                 transport: {
                     read: function (operation) {
                         let data = operation.data.data || [];
                         operation.success(data);
                     }
                 },
                 schema: {model: {id: "idProjectChangeLog"}},
                 pageSize: 10,
                 serverFiltereing: false,
                 serverGrouping: false,
                 serverPaging: false,
                 serverSorting: false
             });
            
            self.dsStakeHolder = new kendo.data.DataSource({
                transport: {
                    read: (operation) => {
                        let data = operation.data.data || [];
                        operation.success(data);
                    }
                },
                schema: {
                    model: {
                        id: "idProjectStakeHolder"
                    }
                },
                pageSize: 10,
                serverFiltering: false,
                serverGrouping: false,
                serverPaging: false,
                serverSorting: false
            });
             
            let logGridElement = $('#project-log-grid').kendoGrid({
                toolbar: kendo.template($("#template").html()),
                dataSource: self.dsHistoryLog,
                scrollable: true,
                filterable: true,
                resizeable: true,
                sortable: true,
                pageable: true,
                persistSelection: true,
                selectable: false,
                height: 500,
                columns: [
                    {
                        field: "idProjectChangeLog",
                        title: "idProjectChangeLog",
                        width: 20,
                        filterable: this.filterOptions,
                        hidden: true
                    },
                    {
                        field: "idProject",
                        title: "idProject",
                        width: 20,
                        filterable: this.filterOptions,
                        hidden: true
                    },
                    {field: "username", title: "User", filterable: this.filterOptions, width: 20},
                   {
                       field: "entryDateTime",
                       title: "Date/Time",
                       width: 20,
                       filterable: this.filterOptions,
                       template: '#if(entryDateTime === null){# #} else{# #=kendo.toString(kendo.parseDate(entryDateTime), "dd MMM yyyy hh:mm:ss tt")# #}#',
                   },
                    {field: "details", title: "Details", filterable: this.filterOptions, width: 50,attributes: {
                        style: 'white-space: nowrap '
                    	}
                    }
                     
                ]
            });
            
            $("#project-log-grid").kendoTooltip({
            	show: function(e){
                    if(this.content.text() !=""){
                      $('[role="tooltip"]').css("visibility", "visible");
                    }

                  },
                  hide: function(){
                    $('[role="tooltip"]').css("visibility", "hidden");
                  },
                filter: "td:nth-child(5)",
                animation: {
                    close: { effects: "fadeOut zoom:out", duration: 300 },
                    open: { effects: "fadeIn zoom:in", duration: 300 }
                },
                position: "bottom",
                content: function(e){
                	var dataItem = $("#project-log-grid").data("kendoGrid").dataItem(e.target.closest("tr"));
                    var content = dataItem.details;
                    if(content.length > 20){
                      return content;
                    }
                    
                }
              }).data("kendoTooltip");
            
            logGridElement.find('#add-project').hide();
            logGridElement.find('#edit-project').hide();
            logGridElement.find('#remove-project').hide();
            logGridElement.find('#searchBox').on('keyup', function (e) {
                var valueInput = $(this);
                logGridElement.searchGrid(valueInput.val());
            });
            logGridElement.searchGrid = function (textInput) {
                let searchBoxValue = textInput;
                if (searchBoxValue === null || searchBoxValue === undefined ) return;

                let filter = {
                    logic: "or", filters: [
                        {field: "username", operator: "contains", value: searchBoxValue},
                        {field: "tstamp", operator: "contains", value: searchBoxValue},
                        {field: "details", operator: "contains", value: searchBoxValue}
                    ]
                };
                self.dsHistoryLog.filter(filter);           
            };
            
         
            this.controls.projectTypeControl = $('#projectType').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/key-value/fetch-by-type?type=Project Type',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "nodeValue",
                dataValueField: "nodeValue"
            }).data("kendoDropDownList");

            this.controls.businessUnitControl = $('#businessUnit').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/key-value/fetch-by-type?type=Business Unit',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "nodeValue",
                dataValueField: "nodeValue"
            }).data("kendoDropDownList");

            this.controls.operativeUnitControl = $('#operativeUnit').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/key-value/fetch-by-type?type=Operative Unit',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "nodeValue",
                dataValueField: "nodeValue"
            }).data("kendoDropDownList");

            this.controls.incoTermsControl = $('#incoTerms').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/key-value/fetch-by-type?type=INCO',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "nodeValue",
                dataValueField: "nodeValue"
            }).data("kendoDropDownList");

            this.controls.contractualCurrencyControl = $('#contractualCurrency').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/key-value/fetch-by-type?type=Currency',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "nodeValue",
                dataValueField: "nodeValue",
                change: () => {
                    this.getRate();
                }
            }).data("kendoDropDownList");

            this.controls.localCurrencyControl = $('#localCurrency').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/key-value/fetch-by-type?type=Currency',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "nodeValue",
                dataValueField: "nodeValue",
                change: () => {
                    this.getRate();
                }
            }).data("kendoDropDownList");

            this.controls.customerControl = $('#customer').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/customer/customers',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "name",
                dataValueField: "idCompany"
            }).data("kendoDropDownList");
            
            this.controls.endCustomerControl = $('#endCustomer').kendoDropDownList({
                optionLabel: "-- SELECT --",
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/customer/customers',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                dataTextField: "name",
                dataValueField: "idCompany"
            }).data("kendoDropDownList");
            
            this.controls.shSelectNameControl = $("#shname").width(275).kendoDropDownList({
                optionLabel: " ",
                dataTextField: "givenName",
                dataValueField: "givenName",
                template:'<span><p>#:data.givenName # <b>(#: data.username #)</b></p></span>',
                filter: 'startswith',
                dataSource: {
                    transport: {
                        read: {
                            url: '/api/v1/user/ldap/all',
                            type: "GET",
                            dataType: "json"
                        }
                    }
                },
                    
                change: () => {
                  this.getStockholderDetails();
                
              }
            }).data("kendoDropDownList");

          
            this.controls.expectedOrderIntakeControl = $('#expectedOrderIntake').kendoDatePicker({
                format: "dd MMMM yyyy"
            }).data("kendoDatePicker");

            this.controls.endOfWarrantyControl = $("#endOfWarranty").kendoDatePicker({
                format: "dd MMMM yyyy"
            }).data("kendoDatePicker");

            this.controls.dateOfContractControl = $("#dateOfContract").kendoDatePicker({
                format: "dd MMMM yyyy"
            }).data("kendoDatePicker");

            this.controls.expectedStartDateControl = $("#expectedStartDate").kendoDatePicker({
                format: "dd MMMM yyyy"
            }).data("kendoDatePicker");

            this.controls.expectedDeliveryDateControl = $("#expectedDeliveryDate").kendoDatePicker({
                format: "dd MMMM yyyy",
            }).data("kendoDatePicker");

            this.controls.dateOfCompletionControl = $("#dateOfCompletion").kendoDatePicker({
                format: "dd MMMM yyyy"
            }).data("kendoDatePicker");

            this.controls.dateOfTenderControl = $("#dateOfTender").kendoDatePicker({
                format: "dd MMMM yyyy"
            }).data("kendoDatePicker");

            this.controls.scopeControl = $("#scope").kendoEditor({
                tools: [
                    "bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter",
                    "justifyRight", "justifyFull", "insertUnorderedList", "insertOrderedList",
                    "indent", "outdent", "createLink", "fontName", "fontSize", "foreColor"
                ]
            });

            this.controls.notesControl = $("#notes").kendoEditor({
                tools: [
                    "bold", "italic", "underline", "strikethrough", "justifyLeft", "justifyCenter",
                    "justifyRight", "justifyFull", "insertUnorderedList", "insertOrderedList",
                    "indent", "outdent", "createLink", "fontName", "fontSize", "foreColor"
                ]
            });
            
            let shGridElement = $('#stake-holder-grid').kendoGrid({
                dataSource: self.dsStakeHolder,
                scrollable: true,
                filterable: true,
                resizeable: true,
                sortable: true,
                pageable: true,
                persistSelection: true,
                height: 500,
                toolbar: kendo.template($("#template").html()),
                change: function (e)
                   {
                      var selectedRows = this.select();
                      var totalSelectedRows = selectedRows.length;
                      shGridElement.find('#edit-project').hide();
                      shGridElement.find('#remove-project').hide();
                      if ( totalSelectedRows == 1 )
                          {
                            shGridElement.find('#edit-project').show();
                            shGridElement.find('#remove-project').show();
                          }
                      if(totalSelectedRows > 1 ) 
                          {
                              shGridElement.find('#remove-project').show();
                          }
        
                   },
                columns: [
                    {selectable: true, width: 3},
                    {
                        field: "idProjectStakeHolder",
                        title: "idProjectStakeHolder",
                        width: 20,
                        filterable: this.filterOptions,
                        hidden: true
                    },
                    {
                        field: "idProject",
                        title: "idProject",
                        width: 20,
                        filterable: this.filterOptions,
                        hidden: true
                    },
                    {
                        field: "name",
                        title: "Name",
                        filterable: this.filterOptions,
                        width: 20
                    },
                    {field: "title", title: "Title", filterable: this.filterOptions, width: 20},
                    {field: "mobileNumber", title: "Mobile Number", filterable: this.filterOptions, width: 20},
                    {field: "email", title: "Email Address", filterable: this.filterOptions, width: 20}
                ]
            });
            
            $('#stake-holder-grid tbody').on("click", "tr", function(e) {

                var rowElement = this;
                var row = $(rowElement);
                var grid = $("#stake-holder-grid").getKendoGrid();
                if (row.hasClass("k-state-selected")) {
                
                  var selected = grid.select();
                  selected = $.grep(selected,function(x){
                    var itemToRemove = grid.dataItem(row);
                    var currentItem = grid.dataItem(x);
                    return itemToRemove.OrderID != currentItem.OrderID
                  })

                  grid.clearSelection();
                  grid.select(selected);
                  e.stopPropagation();
                }else{
                  grid.select(row)
                  e.stopPropagation();
                }
              });
            
            
            shGridElement.find('#searchBox').on('keyup', function (e) {
                var valueInput = $(this);
                shGridElement.searchGrid(valueInput.val());
            });
            shGridElement.searchGrid = function (textInput) {
                let searchBoxValue = textInput;
                if (searchBoxValue === null || searchBoxValue === undefined ) return;

                let filter = {
                    logic: "or", filters: [
                        {field: "name", operator: "contains", value: searchBoxValue},
                        {field: "title", operator: "contains", value: searchBoxValue},
                        {field: "mobileNumber", operator: "contains", value: searchBoxValue},
                        {field: "email", operator: "contains", value: searchBoxValue}
                    ]
                };
                self.dsStakeHolder.filter(filter);           
            };

            shGridElement.find('#add-project').on('click', () => {
                $('#formModal').modal({show: true});
                this.clearStakeHolder();
            });
            
            shGridElement.find('#edit-project').on('click', () => {
                let grid = $("#stake-holder-grid").data("kendoGrid");
                let dataItem = grid.dataItem(grid.select());
                 if (dataItem != null) {
                     let currentIndex = grid.select().closest("tr").index();
                     this.editStakeholder(dataItem, currentIndex);
                 }
                 else { psi.alert('Please select a stakeholder');}
            
                
            });
            
            shGridElement.find('#remove-project').on('click', () => {
                let grid = $("#stake-holder-grid").data("kendoGrid");
                psi.confirm("Delete stakeholder(s)",  () => {
                       var ids = [];
                          var rows = grid.select();
                       rows.each(function(e) {
                           var id = grid.dataItem(this).idProjectStakeHolder;
                           ids.push(id);
                       });
                       this.removeStakeholder(ids);
                    },
                    function () {
                        psi.alert("Cancel");
                    }
                );
                
            });
           
            if(!this.viewMode) 
                {
                    shGridElement.on("dblclick", "tr.k-state-selected", () => {
                                let grid = $("#stake-holder-grid").data("kendoGrid");
                                   let dataItem = grid.dataItem(grid.select());
                                   if (dataItem != null) {
                                       let currentIndex = grid.select().closest("tr").index();
                                       this.editStakeholder(dataItem, currentIndex);
                                   }
                    });
        
                }
            if(this.viewMode) 
            {
                shGridElement.find('#add-project').hide();
                shGridElement.find('#edit-project').hide();
                shGridElement.find('#remove-project').hide();
                 
            }

            this.loadStakeHolders();
            // this.loadLdapUsers();

            $('#selectTemplateModal').modal({backdrop: 'static', focus: true, show: false})
                .on('shown.bs.modal', e => {
                    $('#nodeTitle').focus();
                });

            $('#sales-budget-tab').hide();
            $('#stake-holder-tab').hide();
            $('#history-tab').hide();
         
        },            
        viewProjectDetails() {            	
             this.controls.projectTypeControl.enable(false);
             this.controls.businessUnitControl.enable(false);
             this.controls.operativeUnitControl.enable(false);
             this.controls.expectedOrderIntakeControl.enable(false);
               $('#projectName').attr('disabled', 'disabled');
               $('#projectCode').attr('disabled', 'disabled');
               $('#tenderNo').attr('disabled', 'disabled');
               this.controls.dateOfTenderControl.enable(false);
               $('#contractNo').attr('disabled', 'disabled');
               this.controls.dateOfContractControl.enable(false);
               this.controls.customerControl.enable(false);
               this.controls.endCustomerControl.enable(false);
                 $($('#scope').data().kendoEditor.body).attr('contenteditable', false);
                 this.controls.incoTermsControl.enable(false);
                 this.controls.expectedStartDateControl.enable(false);
                 this.controls.expectedDeliveryDateControl.enable(false);
               this.controls.dateOfCompletionControl.enable(false);
               this.controls.endOfWarrantyControl.enable(false);
               $('#contractValue').attr('disabled', 'disabled');
               $('#engineeringHour').attr('disabled', 'disabled');
               $('#sageCode').attr('disabled', 'disabled');
               this.controls.contractualCurrencyControl.enable(false);
               this.controls.localCurrencyControl.enable(false);
               $('#exchangeRate').attr('disabled', 'disabled');
               $($('#notes').data().kendoEditor.body).attr('contenteditable', false);
               document.getElementById("saveProjectButton").style.display="none"; 
               document.getElementById("cancelButton").style.display="none"; 
          },	  		
        returnToProjectListPage() {
            window.location.href = '/projects';
        },
        saveProject() {
            this.errors = [];
            let projectType = $('#projectType').val();
            let businessUnit = $('#businessUnit').val();
            let operativeUnit = $('#operativeUnit').val();
            let expectedProjectIntake = $('#expectedOrderIntake').val() != '' ? new Date($('#expectedOrderIntake').val()) : null;
            let name = $('#projectName').val();
            let code = $('#projectCode').val();
            let customer = $('#customer').val();
            let endCustomer = $('#endCustomer').val();
            let tenderNumber = $('#tenderNo').val();
            let tenderDateTime = $('#dateOfTender').val() != '' ? new Date($('#dateOfTender').val()) : null;
            let contractNumber = $('#contractNo').val();
            let contractDate = $('#dateOfContract').val() != '' ? new Date($('#dateOfContract').val()) : null;
            let scope = $('#scope').val();
            let expectedStart = $('#expectedStartDate').val() != '' ? new Date($('#expectedStartDate').val()) : null;
            let expectedProjectDelivery = $('#expectedDeliveryDate').val() != '' ? new Date($('#expectedDeliveryDate').val()) : null;
            let expectedProjectCompletion = $('#dateOfCompletion').val() != '' ? new Date($('#dateOfCompletion').val()) : null;
            let incoTerms = $('#incoTerms').val();
            let endOfWarranty = $('#endOfWarranty').val() != '' ? new Date($('#endOfWarranty').val()) : null;
            let contractValue = $('#contractValue').val();
            let contractCurrency = $('#contractualCurrency').val();
            let exchangeRate = $('#exchangeRate').val();
            let localCurrency = $('#localCurrency').val();
            let notes = $('#notes').val();
            let paymentTerms = $('#paymentTerms').val();
            let status = '';
            let stakeHolders = this.stakeHolders.list;
            let engineeringHourRate = $('#engineeringHour').val();
            let sageProjectCode = $('#sageCode').val();

            let project = {
                "idProject": this.idProject,
                "projectType": projectType,
                "businessUnit": businessUnit,
                "operativeUnit": operativeUnit,
                "idCompany": customer,
                "idEndCustomer": endCustomer,
                "expectedProjectIntakeDateTime": expectedProjectIntake,
                "name": name,
                "code": code,
                "tenderNumber": tenderNumber,
                "tenderDateTime": tenderDateTime,
                "contractNumber": contractNumber,
                "contractDateTime": contractDate,
                "scope": scope,
                "expectedStartDateTime": expectedStart,
                "expectedProjectDeliveryDateTime": expectedProjectDelivery,
                "expectedProjectCompletionDateTime": expectedProjectCompletion,
                "incoTerms": incoTerms,
                "endOfWarrantyDateTime": endOfWarranty,
                "contractValue": contractValue,
                "contractCurrency": contractCurrency,
                "exchangeRate": exchangeRate,
                "localCurrency": localCurrency,
                "notes": notes,
                "paymentTerms":paymentTerms,
                "status": status,
                "stakeHolders": stakeHolders,
                "engineeringHourRate" : engineeringHourRate,
                "sageProjectCode" : sageProjectCode,
                "projectCost": this.nodes,
                "tabNameforHistory":this.tabName
                
            };

           if (this.validateForm()==true) {
                 axios.post('/api/v1/project/', project, this.axiosConfig)
                    .then(res => {
                        if (res.data.result == 'success') {
                             psi.alert("Save success!");
                             if(this.idProject > 0)
                                 window.location.href = '/project/'+ this.idProject;
                             else
                            	 window.location.href = '/projects';
                           
                        } else {
                            this.generalErrors = res.data.errors['generalErrors'];
                            this.errors.push(" " + this.generalErrors);
                            psi.alert('Error when saving record');

                        }
                       
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {

                    });
            }

        },
        loadProjectDetails() {
            axios.get('../api/v1/project?id=' + this.idProject, this.axiosConfig)
                .then(res => {
                    if (res !== '') {
                        let status = res.data.status;
                        
                        if(this.idProject > 0) $('#history-tab').show();
                        if(status != 'DRAFT' && this.idProject > 0) {
                            $('#sales-budget-tab').show();
                            $('#stake-holder-tab').show();
                       
                        }

                        $('#projectName').val(res.data.name);
                        $('#projectCode').val(res.data.code);
                        $('#projectNameLbl').text(res.data.name);
                        $('#projectCodeLbl').text(res.data.code);
                        $('#projectStatus').text(status);
                        if(res.data.status)
                        	{
	                        	var statusProject = res.data.status.toLowerCase();
	                        	$('#projectStatus').text(statusProject);
	                        	$('#projectStatus').css("text-transform", "capitalize");
                        	}
                        	
                        $('#tenderNo').val(res.data.tenderNumber);
                        $('#contractNo').val(res.data.contractNumber);
                        $('#exchangeRate').val(res.data.exchangeRate);
                        $('#contractValue').val(res.data.contractValue);
                        $('#engineeringHour').val(res.data.engineeringHourRate);
                        $('#sageCode').val(res.data.sageProjectCode);

                        $("#notes").data("kendoEditor").value(res.data.notes);
                        $("#scope").data("kendoEditor").value(res.data.scope);

                        this.project = res.data;
                        this.controls.customerControl.value(res.data.idCompany);
                        this.controls.endCustomerControl.value(res.data.idEndCustomer);
                        this.controls.projectTypeControl.value(res.data.projectType);
                        this.controls.businessUnitControl.value(res.data.businessUnit);
                        this.controls.operativeUnitControl.value(res.data.operativeUnit);
                        this.controls.incoTermsControl.value(res.data.incoTerms);
                        this.controls.contractualCurrencyControl.value(res.data.contractCurrency);
                        this.controls.localCurrencyControl.value(res.data.localCurrency);

                        this.controls.paymentTermsControl.value(res.data.paymentTermsControl);
                        this.controls.expectedOrderIntakeControl.value(moment(res.data.expectedProjectIntakeDateTime).toDate());
                        this.controls.endOfWarrantyControl.value(moment(res.data.endOfWarrantyDateTime).toDate());
                        this.controls.dateOfContractControl.value(moment(res.data.contractDateTime).toDate());
                        this.controls.expectedStartDateControl.value(moment(res.data.expectedStartDateTime).toDate());
                        this.controls.expectedDeliveryDateControl.value(moment(res.data.expectedProjectDeliveryDateTime).toDate());
                        this.controls.dateOfCompletionControl.value(moment(res.data.expectedProjectCompletionDateTime).toDate());
                        this.controls.dateOfTenderControl.value(moment(res.data.tenderDateTime).toDate());
                        
                        if(status === 'ACTIVE')
                    	{
                        	$('#projectName').attr('disabled', 'disabled');
                            $('#projectCode').attr('disabled', 'disabled');
                            $('#sageCode').attr('disabled', 'disabled');
                        	this.controls.expectedStartDateControl.enable(false);
                            this.controls.expectedDeliveryDateControl.enable(false);
                            this.controls.dateOfCompletionControl.enable(false);
                            this.controls.endOfWarrantyControl.enable(false);
                    	
                    	}
 
                        
                    } else {
                        psi.alert('Error retrieving data');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                });
        },
        loadProjectCost() {
            try {
                axios.get('/api/v1/project/' + this.idProject + '/cost/top-level?flat=true')
                    .then(response => {
                        this.nodes = [];
                        response.data.forEach(item => {
                            this.nodes.push(item);
                        });
                    })
                    .catch(error => {
                        this.generalErrors.push(error);
                    });
            }
            catch (err) {
                console.error(err);
            }
        },
        onSaveProjectCost(data) {
            try {
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                axios.post('/api/v1/project/' + this.idProject + '/cost', data, config)
                    .then(response => {
                        if (response.data.result === 'success') {
                            this.loadProjectCost();
                        }
                        else {
                            this.generalErrors = response.data.errors['generalErrors'];
                            this.loadProjectCost();
                        }
                    })
                    .catch(error => {
                        this.generalErrors.push(error);
                    });
            }
            catch (err) {
                console.error(err);
            }
        },
        loadProjectLogs() {
            let self = this;
            axios.get('../api/v1/project-log/fetch-by-project?idProject=' + self.idProject, self.axiosConfig)
                .then(res => {
                    self.dsHistoryLog.read({data: res.data});
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {

                });
        },
        loadStakeHolders() {
            let self = this;

            this.stakeHolders.list = [];
            axios.get('../api/v1/project/fetch-stake-holders?idProject=' + self.idProject, self.axiosConfig)
                .then(res => {
                    self.dsStakeHolder.read({data: res.data});
                    for (var x = 0; x < res.data.length; x++) {
                        this.stakeHolders.list.push(res.data[x]);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {

                });
        },
        clearStakeHolder() {
            var dropdownlist = $("#shname").data("kendoDropDownList");
            dropdownlist.refresh();
            $('#title').val("");
            $('#email').val("");
            $('#mobileNumber').val("");
            $('#stockHolderWarningAlert').hide();
        },
        removeStakeholder(ids) {
 
                 axios.put('../api/v1/project/update-stake-holders/' + ids, null,
                    this.axiosConfig)
                    .then(res => {
                        if (res.data == true) {
                            psi.alert("Successfully Deleted Stakeholder");
                            this.loadStakeHolders();
                            this.loadProjectLogs();
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .then(() => {
                    }); 
            
        },
        editStakeholder(dataItem, currentIndex) {
            $('#stockHolderWarningAlert').hide();
            var dropdownlist = $("#shname").data("kendoDropDownList");
            dropdownlist.value(dataItem.name);
            $('#title').val(dataItem.title);
            $('#email').val(dataItem.email);
            $('#mobileNumber').val(dataItem.mobileNumber);
            $('#rowNum').val(currentIndex);
            $('#formModal').modal({show: true});
        },
        getRate() {
            let baseCurrency = $('#contractualCurrency').val();
            let targetCurrency = $('#localCurrency').val();

            if (baseCurrency !== '' && targetCurrency !== '') {
                axios.get('../api/v1/currency-exchange/rate/' + baseCurrency + '/' + targetCurrency, this.axiosConfig)
                    .then(res => {
                        if (res.data !== '') {
                            baseCurrency = $('#exchangeRate').val(res.data);
                        } else {
                            psi.alert('No existing rate for the selected currencies');
                            $('#exchangeRate').val("");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .then(() => {

                    });
            }
        },
        validateForm() {            	
            this.errors = [];
            let projectType = $('#projectType').val();
            let businessUnit = $('#businessUnit').val();
            let operativeUnit = $('#operativeUnit').val();
            let expectedProjectIntake = $('#expectedOrderIntake').val() != '' ? new Date($('#expectedOrderIntake').val()) : null;
            let name = $('#projectName').val();
            let code = $('#projectCode').val();
            let customer = $('#customer').val();
            let endCustomer = $('#endCustomer').val();
            let incoTerms = $('#incoTerms').val();
            let expectedStart = $('#expectedStartDate').val() != '' ? new Date($('#expectedStartDate').val()) : null;
            let expectedProjectCompletion = $('#dateOfCompletion').val() != '' ? new Date($('#dateOfCompletion').val()) : null;
            let endOfWarranty = $('#endOfWarranty').val() != '' ? new Date($('#endOfWarranty').val()) : null;
            let contractValue = $('#contractValue').val();
            let engineerHourRate = $('#engineeringHour').val();
            let sageCode = $('#sageCode').val();
            let contractCurrency = $('#contractualCurrency').val();
            let exchangeRate = $('#exchangeRate').val();
            let localCurrency = $('#localCurrency').val();
            var dateofTender =$('#dateOfTender').val();
            var dateofContract = $('#dateOfContract').val();
            var expecteddeliveryDate = $('#expectedDeliveryDate').val();
            
            
            if(projectType && businessUnit && operativeUnit && expectedProjectIntake && name && code && customer &&
                    endCustomer && incoTerms && expectedStart && expectedProjectCompletion && endOfWarranty && contractValue && engineerHourRate && sageCode &&
                    contractCurrency && exchangeRate && localCurrency) {

            	let noCheckError = true;
            	if(Date.parse(dateofContract) <= Date.parse(dateofTender)){
                	 this.errors.push("Contract date should not earlier than Tender Date");
                	 $('#dateOfContract').css({"border-color": "#84353","-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483", "box-shadow" : "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483"});
                	 noCheckError = false;
                } 
            	if(Date.parse(expecteddeliveryDate) <= Date.parse(expectedStart)){
             	     this.errors.push("Expected Delivery date should not earlier than Expected Start Date");
             	     $('#expectedDeliveryDate').css({"border-color": "#84353","-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483", "box-shadow" : "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483"});
             	     noCheckError = false;
                }
            	if(Date.parse(expectedProjectCompletion) <= Date.parse(expectedStart) || Date.parse(expectedProjectCompletion) <= Date.parse(expecteddeliveryDate)){
            	     this.errors.push("Date of Completion should not earlier than Expected Start Date/Delivary date");
            	     $('#dateOfCompletion').css({"border-color": "#84353","-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483", "box-shadow" : "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483"});
            	     noCheckError = false;
                } 
            	if(Date.parse(endOfWarranty) <= Date.parse(expectedStart) || Date.parse(endOfWarranty) <= Date.parse(expecteddeliveryDate)|| Date.parse(endOfWarranty) <= Date.parse(expectedProjectCompletion)){
           	         this.errors.push("End Of Warranty Date should not earlier than Expected Start Date/Delivary date/Date of Completion");
           	         $('#endOfWarranty').css({"border-color": "#84353","-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483", "box-shadow" : "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483"});
           	         noCheckError = false;
                }
            	let stringErrorMessage = "Got validation error(s). If you in different tab please check at details tab; <br><br>";
            	this.errors.forEach( error => {
            		stringErrorMessage +=  error + "<br>";
    			})
    			
    			if(!noCheckError)
    			{
    				psi.alert(stringErrorMessage);
                	$('.errorinput').focus();	
    			}
            	
                return noCheckError;
             
            } else {
                

                if (!projectType) {
                    this.errors.push("Project type is required.");
                    $('#projectType').addClass("errorinput");
                }
                if (!businessUnit) {
                    this.errors.push("Business unit is required.");
                    $('#businessUnit').addClass("errorinput");
                }
                if (!operativeUnit) {
                    this.errors.push("Operative unit is required.");
                    $('#operativeUnit').addClass("errorinput");
                }
                if (expectedProjectIntake == null) {
                    this.errors.push("Expected Project Intake date is required.");
                    $('#expectedOrderIntake').addClass("errorinput");
                }
                if (!name) {
                    this.errors.push("Project name is required.");
                    $('#projectName').addClass("errorinput");
                }
                if (!code) {
                    this.errors.push("Project code is required.");
                    $('#projectCode').addClass("errorinput");
                }
                if (!customer) {
                    this.errors.push("Customer is required.");
                    $('#customer').addClass("errorinput");
                }
                if (!endCustomer) {
                    this.errors.push("End customer is required.");
                    $('#endCustomer').addClass("errorinput");
                }
                if (!incoTerms) {
                    this.errors.push("INCO terms is required.");
                    $('#incoTerms').addClass("errorinput");
                }
                if (expectedStart == null) {
                    this.errors.push("Expected start date is required.");
                    $('#expectedStartDate').css({"border-color": "#84353","-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483", "box-shadow" : "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483"});
                }
                if (expectedProjectCompletion == null) {
                    this.errors.push("Expected Project Completion date is required.");
                    $('#dateOfCompletion').css({"border-color": "#84353","-webkit-box-shadow": "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483", "box-shadow" : "inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #ce8483"});
                }
                if (endOfWarranty == null) {
                    this.errors.push("End of warranty date is required.");
                    $('#endOfWarranty').addClass("errorinput");
                }
                if (!contractValue) {
                    this.errors.push("Contract value is required.");
                    $('#contractValue').addClass("errorinput");
                }
                if (!contractCurrency) {
                    this.errors.push("Contract currency is required.");
                    $('#contractCurrency').addClass("errorinput");
                }
                if (!exchangeRate) {
                    this.errors.push("Exchange rate is required.");
                    $('#exchangeRate').addClass("errorinput");
                }
                if (!localCurrency) {
                    this.errors.push("Local currency is required.");
                    $('#localCurrency').addClass("errorinput");
                }
                if (!engineerHourRate) {
                    this.errors.push("Engineering hour rate is required.");
                    $('#engineerHourRate').addClass("errorinput");
                }
                if (!sageCode) {
                    this.errors.push("SAGE project code is required.");
                    $('#sageCode').addClass("errorinput");
                }
             
                let stringErrorMessage = "Got validation error(s). If you in different tab please check at details tab; <br><br>";
            	this.errors.forEach( error => {
            		stringErrorMessage +=  error + "<br>";
    			})
    			
            	psi.alert(stringErrorMessage);
            	 $('.errorinput').focus();
                 return false;                	
            }                
            
        },
        getStockholderDetails() {
            var dropdownlist = $("#shname").data("kendoDropDownList");
       
            let givenName = dropdownlist.value();
            axios.get('/api/v1/user/ldap/search-by-givenName/' + givenName, this.axiosConfig)
                .then(res => {
                    $('#title').val(res.data.position);
                    $('#mobileNumber').val(res.data.mobileNumber);
                    $('#email').val(res.data.email);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                });
        },
        saveStakeHolder() {
            let currentIndex = $('#rowNum').val();
            if (this.validateStakeHolder()) {
                var dropdownlist = $("#shname").data("kendoDropDownList");
                let stockHolderName = dropdownlist.value();
                let stockHolderTitle = $('#title').val();
                let stockHolderEmail = $('#email').val();
                let stockHolderMobile = $('#mobileNumber').val();

                let newStockholder = {
                    "name": stockHolderName,
                    "title": stockHolderTitle,
                    "email": stockHolderEmail,
                    "mobileNumber": stockHolderMobile
                };

                if (currentIndex == -1) {
                    this.stakeHolders.list.push(newStockholder);
                } else {
                    let item = this.stakeHolders.list[currentIndex];
                    item.name = stockHolderName;
                    item.title = stockHolderTitle;
                    item.email = stockHolderEmail;
                    item.mobileNumber = stockHolderMobile;
                }

                this.dsStakeHolder.read({data: this.stakeHolders.list});
                this.clearStakeHolder();
                $("#formModal").modal("toggle");
            } else {
                $('#stockHolderWarningAlert').show();
            }
        },
        validateStakeHolder() {
            var dropdownlist = $("#shname").data("kendoDropDownList");
            return dropdownlist.value() != "";
         
        },
        openSelectCostTemplateDialog() {
            this.loadCostTemplate();
            this.costTemplate.keyword = "";
            this.costTemplate.selectedTemplate = {};

            if (this.nodes.length > 0) {
                psi.confirm('You already have some entries, this will clear all row and new row will be added based on the template you select, continue?',
                    () => {
                        $('#selectTemplateModal').modal('show');
                    });
                return;
            }
            $('#selectTemplateModal').modal('show');
        },
        onCostTemplateClick(item) {
            this.costTemplate.selectedTemplate = item;
        },
        onSelectedCostTemplate() {
            if (!this.costTemplate.selectedTemplate.title) {
                psi.alert('Please select a template.');
                return;
            }

            this.nodes = [];
            try {
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                axios.get('/api/v1/project/cost/template?flat=true&idParent=' + this.costTemplate.selectedTemplate.idProjectCostTemplate)
                    .then((response) => {
                        this.costTemplate.templates = [];
                        response.data.forEach(item => {
                            let idParent = item.idParent === this.costTemplate.selectedTemplate.idProjectCostTemplate ? 0 : item.idParent;
                            let projectCostViewModel = {
                                idProjectCost: item.idProjectCostTemplate,
                                idProject: this.idProject,
                                idParent: idParent,
                                title: item.title,
                                code: item.code,
                                sequence: item.sequence,
                                sequenceDisplay: item.sequenceDisplay,
                                description: item.descriptionPlaceholder,
                                amountFormula: item.formula,
                                amount: 0,
                                total: 0,
                                addedOnStage: this.project.status,
                                addedOnStageDateTime: new Date(),
                                isMandatory: item.isMandatory,
                                fromTemplate: true,
                                newRecord: true,
                                projectCostLinks: item.projectCostTemplateLink,
                                isForecastEditable: item.isForecastEditable ,
                                isChildAddable: item.isChildAddable,
                                isMultipleFormula: item.isMultipleFormula,
                                formulaVersion: item.formulaVersion,
                                fractionDigits: item.fractionDigits,
                                formatStyle: item.formatStyle,
                                defaultMultipleFormula: item.defaultMultipleFormula,
                                supportingFormula1: item.supportingFormula1,
                                supportingFormula2: item.supportingFormula2,
                                supportingFormula3: item.supportingFormula3,
                                supportingFormula4: item.supportingFormula4,
                                supportingFormula5: item.supportingFormula5
                            };

                            this.nodes.push(projectCostViewModel);
                        });
                    })
                    .catch((error) => {
                        this.generalErrors.push(error);
                    });
            }
            catch (err) {
                console.error(err);
            }

            $('#selectTemplateModal').modal('hide');
        },
        getRandomNumberBetween(min, max) {
            return Math.random() * (max - min) + min;
        },
        loadCostTemplate() {
            try {
                let config = {};
                config.headers = {};
                config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
                axios.get('/api/v1/project/cost/template?idParent=0')
                    .then((response) => {
                        this.costTemplate.templates = [];
                        response.data.forEach(item => {
                            this.costTemplate.templates.push(item);
                        });
                    })
                    .catch((error) => {
                        this.generalErrors.push(error);
                    });
            }
            catch (err) {
                console.error(err);
            }
        },
        activeTabNameConversion(nameTabs){
        	let self = this;
        	if(nameTabs === '#projectDetails-content')
       	    	self.tabName = 'pdetails';
       	    else if(nameTabs === '#salesBudget-content')
       	    	self.tabName = 'sbudget';
       	    else if(nameTabs === '#stakeHolder-content')
       	    	self.tabName = 'sholder';
	       	else if(nameTabs === '#history-content')
	       	    self.tabName = 'log';
	       	else
       	    	self.tabName = 'pdetails';
        },
        refreshTheModal(){
            //just to refresh the data modal
                $(this).removeData('modal');
        }
    },
    created() {
        let self = this;
        let pathArray = window.location.pathname.split('/');
        self.idProject = pathArray[2];
    },
    props: {
        currentUser: {type: String}
    },
    mounted() {
        let self = this;
        self.setupControls();
        self.loadProjectDetails();
        self.loadProjectLogs();
        self.loadProjectCost();

        self.isAdministrator = false;
        if(self.currentUser === 'Administrator') {
            self.isAdministrator = true;
        }
        if(self.viewMode) {
            self.viewProjectDetails();
        }
            if (location.hash) {
              $('a[href=\'' + location.hash + '\']').tab('show');
            }
            var activeTab = localStorage.getItem('activeTab');

            if (activeTab) {
            	
            	$('a[href="' + activeTab + '"]').tab('show');
            	$('#saveProjectButton').show();
	       	    if(activeTab==='#history-content')
	       	    	 $('#saveProjectButton').hide();
       	    
	       	    $('#projectTab').text($('a[href="' + activeTab + '"]').text());
	       	    
	       	    self.activeTabNameConversion(activeTab);   
            }
            else
            {
            	$('#projectTab').text($('a[href="#projectDetails-content"]').text()); //default
            	self.tabName = 'pdetails';
            }
            
            $('body').on('click', 'a[data-toggle=\'tab\']', function (e) {
              e.preventDefault()
              var tab_name = this.getAttribute('href');
              if (history.pushState) {
                history.pushState(null, null, tab_name);
              }
              else {
                location.hash = tab_name;
              }
              localStorage.setItem('activeTab', tab_name);	       	    
              self.activeTabNameConversion(tab_name); 
	       	    
              $('#projectTab').text($('a[href="' + tab_name + '"]').text());
              $(this).tab('show');
              return false;
            });
            $(window).on('popstate', function () {
              var anchor = location.hash || $('a[data-toggle=\'tab\']').first().attr('href');
              $('a[href=\'' + anchor + '\']').tab('show');
            });

       
    }
});