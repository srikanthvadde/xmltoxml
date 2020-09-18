Vue.component("psi-cost-table", {
    template: `
               <div class="row">
                   <div class="col">
                       <div class="row">
                           <div class="col-md-12" style="padding-left:0;position:relative;overflow-x: scroll; overflow-y: scroll; white-space: nowrap; width: 768px; max-width: 100%; max-height: 67vh;">
                               <table :id="id" class="table table-hover table-condensed table-editable">
                                   <thead class="thead-dark">
                                       <tr ref="infoBox">
                                           <th class="stickytheader" scope="col" rowspan="2" style="width: 75px;min-width: 75px;max-width: 75px;left:0px;z-index: 1;">No</th>
                                           <th class="stickytheader" scope="col" rowspan="2" style="width: 40px;min-width:40px;max-width:40px;left:40px;z-index: 1;"></th>
                                           <th class="stickytheader" scope="col" rowspan="2" style="width: 300px;min-width:300px;max-width: 300px;left:75px;z-index: 1;">Description</th>
                                           <th class="stickytheader" scope="col" rowspan="2" style="width: 70px;min-width:70px;max-width: 70px;left:375px;z-index: 1;">Handover</br></th>
                                           <th class="stickytheader" scope="col" rowspan="2" style="width: 70px;min-width:70px;max-width: 70px;left:445px;z-index: 1;">Forecast</br></th>
                                           <th class="stickytheader" scope="col" rowspan="2" style="width: 70px;min-width:70px;max-width: 70px;left:515px;z-index: 1;">Actual</br></th>
                                           <template v-for="each in monthsYears">
                                            <template v-if="!each.afterCurrentMonth && !each.isMonthlyClosedByPM && showActual">
                                                <th style="cursor: pointer; background-color: Navy;" class="stickytheader" scope="col" v-bind:colspan="!showForecastActual && !each.afterCurrentMonth ? '3' : '1'"  @click="showMonthlyCloseNotes(each)">
                                                        PMS Close {{each.monthDisplay + ' ' + each.year}}
                                                </th>
                                            </template>
                                            <template v-else>
                                                <th class="stickytheader" scope="col" v-bind:colspan="!showForecastActual && !each.afterCurrentMonth ? '3' : '1'">
                                                    {{each.monthDisplay + ' ' + each.year}}
                                                </th>
                                            </template>
                                           </template>
                                       </tr>
                                       <tr>
                                           <template v-for="each in monthsYears">
                                               <th class="stickytheader" scope="col" v-bind:style="{ top: calculateHeight }">Forecast</th>
                                               <th class="stickytheader" v-if="!showForecastActual && !each.afterCurrentMonth" scope="col" v-bind:style="{ top: calculateHeight }">Actual</th>
                                               <th class="stickytheader" v-if="!showForecastActual && !each.afterCurrentMonth" scope="col" v-bind:style="{ top: calculateHeight }">Variance</th>
                                           </template> 
                                       </tr>
                                   </thead>
                                   <tbody>
                                       <tr v-for="(item, index) in sortedNodes">
                                           <!-- to show Normal font  for child costs according to excel file -->
                                             <template  v-if ="(item.idParent >0)">
                                           <td scope="row" class="stickytbody textformat" style="left:0px;"><span v-for="n in item.level">&nbsp;&nbsp;</span>{{item.sequenceDisplay}}</td>
                                           <td>
                                               <button v-if="isShowAddableChild(item,viewmode)" type="button" title="Add Children Row" style="padding: 1px 1px;" class="btn" @click="addNode(item.idProjectCost)"><span class="icon-plus"></span></button>
                                               <button v-if="showRemoveRowButton" type="button" title="Remove Row" class="btn btn-square btn-danger btn-sm" @click="removeNode(item.idProjectCost)"><span class="icon-trash"></span></button>
                                           </td>
                                          <template v-if="showEditRowButton">
                                              <td class="stickytbody textformat" style="left:75px;" v-bind:title="item.title"><span v-for="n in item.level">&nbsp;&nbsp;</span>{{item.title}}</td>
                                                    <template v-if="isShowTotal(item)">
                                                        <td class="stickytbody numberformat" style="left:375px;">
                                                        <span v-if="isEmptyValue(item, 'HANDOVER')">{{item.total| toNumericSeparatorAndDecimal(item)}}</span></td>
                                                    </template>
                                                    <template v-else>
                                                        <td v-if="isForecastPhaseNodeEditable(item,viewmode)" class="stickytbody numberformat" style="left:375px;"  v-bind:style="[forecastEditableStyleObject]">
                                                        	<span v-if="isEmptyValue(item, 'HANDOVER')"><a  class="editable-link" href="javascript:void(0)" @click="editNode(item.idProjectCost)">{{item.amount | toNumericSeparatorAndDecimal(item) }}</a></span></td>
                                                        <td v-if="!isForecastPhaseNodeEditable(item,viewmode)" class="stickytbody numberformat" style="left:375px;">
                                                       <span v-if="isEmptyValue(item, 'HANDOVER')">{{item.amount | toNumericSeparatorAndDecimal(item) }}</span></td>
                                                    </template>
                                                </template>
                                            <template v-else>
                                                  <td  class="stickytbody textformat" style="left:75px;" v-bind:title="item.title"><span v-for="n in item.level">&nbsp;&nbsp;</span>{{item.title}}</td>
                                                
                                                <template v-if="isShowTotal(item)">
                                                    <td class="stickytbody numberformat" style="background-color: #b39ddb;left:375px;">
                                                  <span v-if="isEmptyValue(item, 'HANDOVER')"> {{item.total| toNumericSeparatorAndDecimal(item)}}</span></td>
                                                </template>
                                                <template v-else>
                                                    <td class ="stickytbody numberformat" style ="left:375px;" >
                                                    <span v-if="isEmptyValue(item, 'HANDOVER')">
                                                        {{item.amount | toNumericSeparatorAndDecimal(item) }}
                                                        </span></td>
                                                </template>
                                            </template>                                   
                                           <td class="stickytbody numberformat" style="background-color: #9fa8da;left:445px;" > <span v-if="isEmptyValue(item, 'FORECAST')"> {{getTotalForecastPerItem(item) | toNumericSeparatorAndDecimal(item)}} </span></td>
                                           <td class="stickytbody numberformat" style="background-color: #90caf9;left:515px;"><span v-if="isEmptyValue(item, 'ACTUAL')">{{getTotalActualPerItem(item)| toNumericSeparatorAndDecimal(item)}}</span></td>
                                           <template v-for="each in monthsYears">
                                                <template v-if="each.afterCurrentMonth || (showForecastActual && each.currentMonth)">
                                                    <td v-if="isShowAddableChildEditable(item,viewmode)" v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                        <span v-if="isEmptyValue(item, 'MONTHLY', each)"> <a class="editable-link" href="javascript:void(0)" @click="editAmount('forecast', item.idProjectCost, each)">{{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal(item)}}</a></span>
                                                    </td>
                                                    <td v-else v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                           <span v-if="isEmptyValue(item, 'MONTHLY', each)"> {{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal(item)}}</span>
                                                    </td>
                                                </template>
                                                <template v-else>
                                                	<td v-if="!each.isMonthlyClosedByPM && showActual && isShowAddableChildEditable(item,viewmode) && each.checkGL1 && each.checkEHR" v-bind:style= "[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                         <span v-if="isEmptyValue(item, 'MONTHLY', each)"> <a class="editable-link" href="javascript:void(0)" @click="editAmount('forecast', item.idProjectCost, each)">{{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal(item)}}</a></span>
                                                    </td>
                                                    <td v-else v-bind:style= "[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                            <span v-if="isEmptyValue(item, 'MONTHLY', each)">{{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal(item) }}</span>
                                                    </td>
                                                     <td v-if="!showForecastActual " v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                           <span v-if="isEmptyValue(item, 'MONTHLY', each)"> {{getMonthlyAmount('actual', item, each)| toNumericSeparatorAndDecimal(item) }}</span>
                                                    </td>
                                                    <td v-if="!showForecastActual" v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                        	<span v-if="isEmptyValue(item, 'MONTHLY', each)">{{getMonthlyAmount('variance', item, each)| toNumericSeparatorAndDecimal(item) }}</span>
                                                    </td> 
                                                </template>
                                           </template>
                                           </template>
                                 
                               <!-- to show bold for Parent costs according to excel file -->
                                       <template  v-if ="item.idParent == 0">
                                           <td scope="row" class="stickytbody textformat" style="left:0px;"><span v-for="n in item.level">&nbsp;&nbsp;</span><b>{{item.sequenceDisplay}}</b></td>
                                           <td>
                                               <button v-if="isShowAddableChild(item,viewmode)" type="button" title="Add Children Row" style="padding: 1px 1px;" class="btn" @click="addNode(item.idProjectCost)"><span class="icon-plus"></span></button>
                                               <button v-if="showRemoveRowButton" type="button" title="Remove Row" class="btn btn-square btn-danger btn-sm" @click="removeNode(item.idProjectCost)"><span class="icon-trash"></span></button>
                                           </td>
                                          <template v-if="showEditRowButton">
                                              <td class="stickytbody textformat" style="left:75px;" v-bind:title="item.title"><span v-for="n in item.level">&nbsp;&nbsp;</span><b>{{item.title}}</b></td>
                                               
                                                    <template v-if="isShowTotal(item) ">
                                                        <td class="stickytbody numberformat" style="left:375px;">
                                                       <span v-if="isEmptyValue(item, 'HANDOVER')"> <b>{{item.total| toNumericSeparatorAndDecimal(item)}}</b></span></td>
                                                    </template>
                                                    <template v-else>
                                                        <td v-if="isForecastPhaseNodeEditable(item,viewmode)" class="stickytbody numberformat" style="left:375px;"  v-bind:style="[forecastEditableStyleObject]">
                                                        	<span v-if="isEmptyValue(item, 'HANDOVER')"><a  class="editable-link" href="javascript:void(0)" @click="editNode(item.idProjectCost)"><b>{{item.amount | toNumericSeparatorAndDecimal(item) }}</b></a></span></td>
                                                        <td v-if="!isForecastPhaseNodeEditable(item,viewmode)" class="stickytbody numberformat" style="left:375px;">
                                                       <span v-if="isEmptyValue(item, 'HANDOVER')">
                                                       <b>{{item.amount | toNumericSeparatorAndDecimal(item) }}</b></span></td>
                                                    </template>
                                                </template>
                                            <template v-else>
                        
                                                  <td  class="stickytbody textformat" style="left:75px;" v-bind:title="item.title"><span v-for="n in item.level">&nbsp;&nbsp;</span><b>{{item.title}}</b></td>
                                                <template v-if="isShowTotal(item)">
                                                    <td class="stickytbody numberformat" style="background-color: #b39ddb;left:375px;">
                                                   <span v-if="isEmptyValue(item, 'HANDOVER')"><b>{{item.total| toNumericSeparatorAndDecimal(item)}}</b></span></td>
                                                </template>
                                                <template v-else>
                                                    <td class ="stickytbody numberformat" style ="left:375px;" >
                                                    <span v-if="isEmptyValue(item, 'HANDOVER')">
                                                       <b> {{item.amount | toNumericSeparatorAndDecimal(item) }}</b> 
                                                        </span></td>
                                                </template>
                                            </template>                                   
                                           <td class="stickytbody numberformat" style="background-color: #9fa8da;left:445px;"><span v-if="isEmptyValue(item, 'FORECAST')"><b>{{getTotalForecastPerItem(item) | toNumericSeparatorAndDecimal(item)}}</b></span></td>
                                           <td class="stickytbody numberformat" style="background-color: #90caf9;left:515px;"><span v-if="isEmptyValue(item, 'ACTUAL')"><b>{{getTotalActualPerItem(item)| toNumericSeparatorAndDecimal(item)}}</b></span></td>
                                           <template v-for="each in monthsYears">
                                                <template v-if="each.afterCurrentMonth || (showForecastActual && each.currentMonth)">
                                                    <td v-if="isShowAddableChildEditable(item,viewmode)" v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                         <a class="editable-link" href="javascript:void(0)" @click="editAmount('forecast', item.idProjectCost, each)"><span v-if="isEmptyValue(item, 'MONTHLY', each)"><b>{{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal}}</b></span></a>
                                                    </td>
                                                    <td v-else v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                            <span v-if="isEmptyValue(item, 'MONTHLY', each)"><b>{{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal(item)}}</b></span>
                                                    </td>
                                                </template>
                                                <template v-else>
                                                	<td v-if="!each.isMonthlyClosedByPM && showActual && isShowAddableChildEditable(item,viewmode)" v-bind:style= "[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                          <a class="editable-link" href="javascript:void(0)" @click="editAmount('forecast', item.idProjectCost, each)"><span v-if="isEmptyValue(item, 'MONTHLY', each)"><b>{{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal}}</b></span></a>
                                                    </td>
                                                    <td v-else v-bind:style= "[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                            <span v-if="isEmptyValue(item, 'MONTHLY', each)"><b>{{getMonthlyAmount('forecast', item, each)| toNumericSeparatorAndDecimal(item)}}</b></span>
                                                    </td>
                                                    
                                                   <td v-if="!showForecastActual" v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                            <span v-if="isEmptyValue(item, 'MONTHLY', each)"><b>{{getMonthlyAmount('actual', item, each)| toNumericSeparatorAndDecimal(item)}}</b></span>
                                                    </td>
                                                    <td v-if="!showForecastActual" v-bind:style="[forecastUneditableStyleObject, each.month % 2 ? evenMonthStyleObject : oddMonthStyleObject]">
                                                        	<span v-if="isEmptyValue(item, 'MONTHLY', each)"><b>{{getMonthlyAmount('variance', item, each)| toNumericSeparatorAndDecimal(item)}}</b></span>
                                                    </td> 
                                                </template>
                                           </template>
                                           </template>
                                    </tr>
                                       
                                   </tbody>
                               </table>
                           </div>
                       </div>
                       <br/>
                       <div class="row" style="display:none;">
                           <div class="col">
                               <button v-if="showAddNewRowButton" class="btn btn-warning btn-square pull-right"
                                       title="Add Root Node"
                                       @click="addNode(0)">
                                   <span class="icon-plus"></span> ADD NEW ROW
                               </button>
                           </div>
                       </div>
                       <div class="modal fade" id="costClosingModal" tabindex="-1" role="dialog">
                           <div class="modal-dialog" role="document">
                               <div class="modal-content">
                                   <div class="modal-header">
                                       <h5 class="modal-title">Monthly Closing Cost :{{monthlyEntry.monthDisplay}} {{monthlyEntry.year}}</h5>
                                       <button type="button" class="close" @click="resetClosingModal(true)">
                                           <span>&times;</span>
                                       </button>
                                   </div>
                                   <div class="modal-body">
                                       <form>
                                           <div class="container">
                                               <div class="row">
                                                   <div class="col">
                                                   	   <span style="display:block;">Are you sure to proceed?</span>
                                                   	   <span id="checkGL1" v-if="monthlyEntry.checkGL1" style="color:red;display:block;">Your monthly general ledger import have not been processed.</span>
                                                   	   <span id="checkEHR" v-if="monthlyEntry.checkEHR" style="color:red;display:block;">Your monthly engineering hour import have not been processed</span>
                                                   	   <span style="display:block;">Please fill monthly closing note below:</span>
                                                       <label><strong>Monthly Closing Notes</strong><font color="red" size="4">*</font></label>
                                                       <textarea rows="5" name="closeNotes" id="closeNotes" class="form-control"></textarea>
                                                   </div>
                                               </div>
                                           </div>
                                       </form>
                                   </div>
                                   <div class="modal-footer">
                                       <button type="button" class="btn btn-secondary" @click="resetClosingModal(true)">Cancel</button>
                                       
                                        <button type="button"
                                                    v-if="monthlyEntry.checkGL1||monthlyEntry.checkEHR"
                                                    class="btn btn-primary" @click="onImportGLEH">Import
                                            </button>
                                            <button type="button" class="btn btn-primary"
                                                    @click="onMonthlyCloseSave(monthlyEntry)">Proceed
                                            </button>
                                           
                                   </div>
                                </div>
                           </div>
                       </div>
                       <div class="modal fade" id="costEntryModal" tabindex="-1" role="dialog" aria-labelledby="New Node" aria-hidden="true">
                           <div class="modal-dialog" role="document">
                               <div class="modal-content">
                                   <div class="modal-header">
                                       <h5 class="modal-title">Project Cost Entry</h5>
                                       <button type="button" class="close" aria-label="Close" @click="resetNodeModal(true)">
                                           <span aria-hidden="true">&times;</span>
                                       </button>
                                   </div>
                                   <div class="modal-body">
                                       <form>
                                           <div class="container">
                                               <div class="row">
                                                   <div class="col">
                                                       <label><strong>Cost Title</strong></label><br/>
                                                       
                                                       <input v-if="disableDescriptionControl" id="costTitles" style="width: 100%" class="form-control"
                                                           v-model="nodeModal.title" :readonly="disableDescriptionControl" @keyup.enter="onModalSave"/>
                                                           
                                                        <select v-if="!disableDescriptionControl" v-model="nodeModal.title" placeholder="Cost Title" class="form-control" id="costTitles"
                                                            @keyup.enter="onModalSave">
                                                           <option v-for="costTitle in costTitles" v-bind:value="costTitle.nodeName">
                                                               {{ costTitle.nodeName }}
                                                           </option>
                                                        </select>
                                                   </div>
                                               </div>
                                               <div class="row">
                                                   <div class="col">
                                                       <label><strong>Amount</strong></label><br/>
                                                       <input id="costAmount" style="width: 100%" type="number" class="form-control"
                                                           v-model.number="nodeModal.amount" :readonly="disableAmountControl" @keyup.enter="onModalSave"/>
                                                   </div>
                                               </div>
                                               <div class="row">
                                                   <div class="col">
                                                       <label><strong>Formula</strong></label><br/>
                                                       <input id="amountFormula" style="width: 100%" class="form-control"
                                                           v-model="nodeModal.amountFormula" :readonly="disableFormulaControl" @keyup.enter="onModalSave"/>
                                                   </div>
                                               </div>
                                               <div class="row">
                                               	<div class="col">
                                                       <label><strong>Ledger Accounts</strong></label>
                                                      
                                                              <select witdh="100%" class="form-control" id="ledgerAccounts" multiple="multiple" :readonly="disableAccountLedgerControl" required="required" @change="onModalSave"></select>
                                                              </div>
                                               </div>
                                           </div>
                                       </form>
                                   </div>
                                   <div class="modal-footer">
                                       <button type="button" class="btn btn-secondary" @click="resetNodeModal(true)">Close</button>
                                       <button type="button" class="btn btn-primary" @click="onModalSave">Save</button>
                                   </div>
                                </div>
                           </div>
                       </div>
                   </div>
               </div>`,
    props: {
        id: {
            type: String
        },
        nodes: {
            type: Array
        },
        idProject: {
            type: Number,
            default:0
        },
        showSaveButton: {
            type: Boolean,
            default: true
        },
        project: {
            type: Object
        },
        viewmode: {
            type: String
        },
        currentUser: {
            type: String
        },
        agtotalsales: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            isAdministrator: Boolean,
            menus: [],
            monthlyEntry: "",
            addChildState: false,
            selectedItem: {
                idProjectCost: -1,
                index: -1
            },
            axiosConfig: {
                headers: {
                    [document.querySelector('meta[name="_csrf_header"]')
                        .content
                        ]: document.querySelector('meta[name="_csrf"]').content
                }
            },
            controls: {
                costLinksControl: null,
                notesControl: null
            },
            nodeModal: {
                idParent: 0,
                idProjectCost: 0,
                title: "",
                amount: 0,
                amountFormula: "",
                type: "",
                monthYear: {},
                costLinks: []
            },
            dsOptionLedger: {},
            selectedOptionLedger: [],
            availableOptionLedger: [],
            availableOptionLedgerDB: [],
            forecastEditableStyleObject: {
                verticalAlign: "top",
                textAlign: "right",
                backgroundColor: "#b2dfdb"
            },
            forecastUneditableStyleObject: {
                verticalAlign: "top",
                textAlign: "right",
                backgroundColor: "#e0e0e0"
            },
            evenMonthStyleObject: {
                backgroundColor: "#e0e0e0"
            },
            oddMonthStyleObject: {
                backgroundColor: "#FFF"
            },
            costTitles: []
        };
    },
    computed: {

        calculateHeight() {
            if (this.$refs.infoBox.clientHeight == 0) return 22 + "px";
            return this.$refs.infoBox.clientHeight + 10 + "px";
        },
        showForecastActual() {
            return this.mode === "FORECAST";
        },
        showActual() {
            return this.mode === "ACTIVE";
        },
        showUpDownButton() {
            return this.mode === "TEMPLATE" || this.mode === "DRAFT";
        },
        showEditRowButton() {
            return (
                this.mode === "TEMPLATE" ||
                this.mode === "DRAFT" ||
                this.mode === "FORECAST"
            );
        },
        showAddNewRowButton() {
            return this.mode === "TEMPLATE" || this.mode === "DRAFT";
        },
        showRemoveRowButton() {
            return this.mode === "TEMPLATE" || this.mode === "DRAFT";
        },
        sortedNodes() {
            this.nodes.sort(function (a, b) {
                return a.sequenceDisplay.localeCompare(b.sequenceDisplay, undefined, {
                    numeric: true,
                    sensitivity: "base"
                });
            });

            const count = (str, ch) => _.countBy(str)[ch] || 0;

            _.eachRight(this.nodes, value => {
                value.level = count(value.sequenceDisplay, ".");
                if (this.getChildrenCount(value.idProjectCost) > 0) {
                    value.amount = "";
                } else {
                    value.total = "";
                }
                //this.recalculateParentTotal(value.idProjectCost);
            });
            //this.calculateAllNodeWithFormula();
            this.addChildState = false;
            return this.nodes;
        },
        nextRootSequence() {
            let count = _.countBy(this.nodes, function (o) {
                return o.idParent === 0;
            });
            return !_.isNil(count) && !_.isNil(count.true) ? count.true + 1 : 1;
        },
        disableAmountControl() {
            if (this.nodeModal.type === "addchild") return true;
            if (this.nodeModal.type === "editNode") return false;
            if (this.nodeModal.idProjectCost <= 0) return false;

            let level = 0;
            let foundProjectCost = false;
            let idProject = -1;
            this.nodes.some(o => {
                if (o.idProjectCost === this.nodeModal.idProjectCost) {
                    foundProjectCost = true;
                    idProject = o.idProject;
                    return true;
                }
            });

            if (foundProjectCost && idProject > -1) {
                level = this.getLevelOfParent(
                    this.nodeModal.idProjectCost,
                    idProject,
                    level
                );
            }
            if (level > 1) {
                return false;
            } else {
                if (this.nodeModal.type === "forecast") return false;
                return true;
            }
        },
        disableAccountLedgerControl() {
            if (this.nodeModal.type === "forecast") {
                let controlLedgerAccounts = $("#ledgerAccounts").data(
                    "kendoMultiSelect"
                );
                controlLedgerAccounts.readonly(true);
                $(".k-multiselect-wrap").css("background-color", "#e4e7ea");
                return true;
            }

            return false;
        },
        disableFormulaControl() {
            if (
                this.nodeModal.type === "addchild" ||
                this.nodeModal.type === "forecast"
            )
                return true;
            if (this.nodeModal.idProjectCost <= 0) return false;

            let level = 0;
            let foundProjectCost = false;
            let idProject = -1;
            this.nodes.some(o => {
                if (o.idProjectCost === this.nodeModal.idProjectCost) {
                    foundProjectCost = true;
                    idProject = o.idProject;
                    return true;
                }
            });
            if (foundProjectCost && idProject > -1) {
                level = this.getLevelOfParent(
                    this.nodeModal.idProjectCost,
                    idProject,
                    level
                );
            }
            if (level > 1) {
                return false;
            } else {
                if (this.nodeModal.type === "forecast") return false;
                return true;
            }
        },
        disableDescriptionControl() {
            return (
                this.nodeModal.type === "forecast" || this.nodeModal.type === "editNode" || this.nodeModal.type === "actual"
            );
        },
        mode() {
            if (this.project) {
                return this.project.status;
            }
            return "TEMPLATE";
        },
        monthsYears() {
            let result = [];
            if (this.project && this.project.idProject > 0) {
                this.getCheckMonthlyClosed()
                    .then(x => {

                        x.forEach(item => {

                            result.push({
                                month: item.month,
                                monthDisplay: item.monthDisplay,
                                year: item.year,
                                afterCurrentMonth: item.afterCurrentMonth,
                                isMonthlyClosedByPM: item.isMonthlyClosedByPM,
                                isMonthlyClosedByFinance: item.isMonthlyClosedByFinance,
                                currentMonth: item.currentMonth,
                                checkGL1: item.isMonthlyImportGL,
                                checkEHR: item.isMonthlyImportEHR
                            });
                            this.$forceUpdate();
                        });

                    })
                    .catch(error => {
                        return result;
                    });
            }
            return result;
        }
    },
    methods: {

        onImportGLEH() {
            window.open("/importData/import-data");
        },

        getCheckMonthlyClosed() {
            this.errors = [];
            try {
                return axios
                    .get(
                        "/api/v1/project/" +
                        this.idProject +
                        "/generate-month-year-cost-entry",
                        this.axiosConfig
                    )
                    .then(res => {
                        return Promise.resolve(res.data);
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            } catch (error) {
                return Promise.reject(error);
            }
        },

        setupControls() {
            this.dsOptionLedger = new kendo.data.DataSource({
                transport: {
                    read: operation => {
                        let data = operation.data.data || [];
                        operation.success(data);
                    }
                }
            });

            this.controls.costLinksControl = $("#ledgerAccounts")
                .kendoMultiSelect({
                    dataTextField: "nodeName",
                    dataValueField: "idKeyValue",
                    dataSource: this.dsOptionLedger
                })
                .data("kendoMultiSelect");

            this.controls.notesControl = $("#closeNotes").kendoEditor({
                tools: []
            });
        },

        loadOptionLedger() {
            axios
                .get("/api/v1/key-value/fetch-all-ledgers?id=" + 0, this.axiosConfig)
                .then(res => {
                    this.dsOptionLedger.read({
                        data: (this.availableOptionLedgerDB = res.data)
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },

        loadAllOptionLedger() {
            axios
                .get(
                    "/api/v1/project/fetchLedgerOptions?idProject=" + this.idProject,
                    this.axiosConfig
                )
                .then(res => (this.availableOptionLedger = res.data))
                .catch(err => {
                    console.log(err);
                });
        },

        isForecastPhaseNodeEditable(cost, viewmode) {
            return cost.isForecastEditable && !viewmode;
        },

        isShowTotal(cost) {
            let subChildCount = this.getChildrenCount(cost.idProjectCost);
            return subChildCount > 0;
        },

        isEmptyValue(cost, columnType, monthYear) {

            let displayValue = true;
            if(cost.title == "POC%" && ( columnType == "HANDOVER" || columnType == "FORECAST"))
            {
                displayValue = false;
            }
            else if(cost.title == "Man-Hour Cost Rate" || cost.title == "Gross Margin 1" || cost.title == "Project Execution Cost" || cost.title == "Earnings")
            {
                displayValue = false;
                if(columnType == "MONTHLY" )
                {

                    if (!cost.values)
                    {

                        let data = {
                            idProjectCostEntry: 0,
                            idProjectCost: 0,
                            type: "",
                            month: monthYear.month,
                            year: monthYear.year,
                            forecast: 0,
                            actual: 0,
                            variance: 0
                        };
                        cost.values = [];
                        cost.values.push(data);
                    }

                }

            }

            return displayValue;
        },

        isShowAddableChild(cost, viewmode) {
            let totalForecast = 0;
            let totalActual = 0;
            totalForecast = this.getTotalForecastPerItem(cost);
            totalActual = this.getTotalActualPerItem(cost);
            return (
                !cost.isMandatory &&
                cost.isChildAddable &&
                (totalForecast <= 0 && totalActual <= 0 && cost.amount <= 0) &&
                !viewmode
            );
        },

        isShowAddableChildEditable(cost, viewmode) {
            let subChildCount = this.getChildrenCount(cost.idProjectCost);
            let parent = this.getParentNode(cost.idProjectCost);
            return (
                (!viewmode && (cost.isForecastEditable && subChildCount == 0)) ||
                (parent && cost.isForecastEditable && subChildCount == 0)
            );
        },

        editAmount(type, idProjectCost, monthYear) {

            let node = this.getNode(idProjectCost);
            this.nodeModal.idProjectCost = node.idProjectCost;
            console.log("nodemodals"+node.idProjectCost)
            this.nodeModal.type = type;
            this.nodeModal.title = node.title;
            console.log("monthyear"+node.title)
            this.nodeModal.amount = this.getMonthlyAmount(type, node, monthYear);

            this.nodeModal.monthYear = monthYear;
            console.log("monthyear"+monthYear)
            this.nodeModal.amountFormula = "";
            _.each(node.projectCostLinks, v => {
                console.log("links"+v.idKeyValue)
                this.nodeModal.costLinks.push(v.idKeyValue);
            });
            //  this.dsOptionLedger.read({data: this.selectedOptionLedger});
            this.controls.costLinksControl.value(this.nodeModal.costLinks);

            $("#costEntryModal").modal("show");
        },

        setMonthlyData(type, cost, monthYear) {
            let data = this.getMonthlyData(type, cost, monthYear);
            console.log(cost.totalForecast+cost.title+cost.amount)

            let config = {};
            config.headers = {};
            config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
            if (data) {
                if(type != 'actual') {
                    data.forecast = this.nodeModal.amount;
                    data.totForeCast = cost.totalForecast;
                    data.totalActual = cost.totalActual;
                    data.handOverAmount = cost.amount;
                }
                else{
                    data.actual = this.nodeModal.amount;
                    data.type='actual';
                }
                try {
                    axios.post('/api/v1/project/saveEachProjectCostEntry?id=' + this.idProject, data, config)
                        .then(function(res){
                         if(res.data.result !='fail') {
                             this.$emit('nodesvales', res.data.listData)
                         }

                        }.bind(this))
                } catch (err) {
                    console.error(err);
                }
            }
        },

        setCostLinkData(links, idProjectCost) {
            let data = this.getCostLinks(links, idProjectCost);
            if (data) {
                _.forEach(this.controls.costLinksControl.value(), x => {
                    data.idKeyValue = x;
                });
            } else {
                _.forEach(this.controls.costLinksControl.value(), x => {
                    let data = {
                        idProjectCostLink: 0,
                        idProjectCost: this.nodeModal.idProjectCost,
                        status: "",
                        idKeyValue: x
                    };
                    links.push(data);
                });
            }
        },

        getTotalForecastPerItem(cost) {
            if(cost.formatStyle == 'percent'){
                return cost.totalForecast;
            }else {
               return Math.round(cost.totalForecast);
            }
        },

        getTotalActualPerItem(cost) {
            if(cost.formatStyle == 'percent'){
                return cost.totalActual;
            }else {
                return Math.round(cost.totalActual);
            }

        },

        getMonthlyAmount(type, cost, monthYear) {
            let data = this.getMonthlyData(type, cost, monthYear);
            if (data) {
                if (type === "variance") {
                    data.variance = data.actual - data.forecast
                    return data.variance;
                } else if (type === "forecast") {
                    return data.forecast;
                } else {
                    return data.actual;
                }
            } else {
                data = {
                    idProjectCostEntry: 0,
                    idProjectCost: 0,
                    type: "",
                    month: monthYear.month,
                    year: monthYear.year,
                    forecast: 0,
                    actual: 0,
                    variance: 0
                };
                if (!cost.values) cost.values = [];
                cost.values.push(data);
            }
            return 0;
        },

        getMonthlyData(type, cost, monthYear) {
            if (!cost || !cost.values || !monthYear) return 0;
            return _.find(cost.values, o => {
                return o.year == monthYear.year && o.month == monthYear.month;
            });
        },

        getCostLinks(links, idProjectCost) {
            if (!links || !idProjectCost) return 0;
            return _.find(links, o => {
                return o.idProjectCost == idProjectCost;
            });
        },

        addNode(idProjectCost) {
            this.resetNodeModal(false);
            this.nodeModal.type = "addchild";
            this.nodeModal.idParent = idProjectCost;
            this.dsOptionLedger.read({
                data: this.availableOptionLedgerDB
            });
            if (this.selectedOptionLedger.length > 0) {
                let allOptions = [];
                allOptions = this.availableOptionLedger.slice(0);
                _.each(this.selectedOptionLedger, v => {
                    let index = allOptions.findIndex(x => x.idKeyValue === v.idKeyValue);
                    allOptions.splice(index, 1);
                });
                this.dsOptionLedger.read({
                    data: this.allOptions
                });
            }
            this.costTitles = [];
            this.loadCostTitles(0);

            $("#costEntryModal").modal("show");
        },

        editNode(idProjectCost) {
            let node = this.getNode(idProjectCost);
            console.log("nodesModal"+this.nodeModal.title)
            this.nodeModal.idProjectCost = node.idProjectCost;
            this.nodeModal.title = node.title;
            this.nodeModal.amount = node.amount;
            this.nodeModal.amountFormula = node.amountFormula;
            this.dsOptionLedger.read({
                data: this.availableOptionLedgerDB
            });
            if (this.selectedOptionLedger.length > 0) {
                let allOptions = [];
                allOptions = this.availableOptionLedger.slice(0);
                _.each(this.selectedOptionLedger, v => {
                    let index = allOptions.findIndex(x => x.idKeyValue === v.idKeyValue);
                    allOptions.splice(index, 1);
                });
                this.dsOptionLedger.read({
                    data: allOptions
                });
                if (node.projectCostLinks.length > 0) {
                    _.each(node.projectCostLinks, v => {
                        this.nodeModal.costLinks.push(v.idKeyValue);
                        var item = this.availableOptionLedger.find(
                            x => x.idKeyValue === v.idKeyValue
                        );
                        allOptions.push(item);
                    });
                    this.dsOptionLedger.read({
                        data: allOptions
                    });
                }
            }

            //  this.dsOptionLedger.read({data: this.selectedOptionLedger});
            this.controls.costLinksControl.value(this.nodeModal.costLinks);

            this.nodeModal.type = "editNode";
            $("#costEntryModal").modal("show");
        },

        getRandomNumberBetween(min, max) {
            return Math.random() * (max - min) + min;
        },

        onModalSave() {
            if (this.nodeModal.idProjectCost > 0) {
                let node = this.getNode(this.nodeModal.idProjectCost);
                if (this.nodeModal.type === "editNode") {
                    node.title = this.nodeModal.title;
                    node.amount = this.nodeModal.amount;
                    node.amountFormula = this.nodeModal.amountFormula;
                    this.setCostLinkData(node.projectCostLinks, this.nodeModal.idProjectCost);
                } else if (this.nodeModal.type === "forecast" || this.nodeModal.type === "actual") {
                    this.setMonthlyData(this.nodeModal.type, node, this.nodeModal.monthYear);
                    this.setCostLinkData(node.projectCostLinks, this.nodeModal.idProjectCost); //temp - for testing import during ACTIVE phase
                }
                const count = (str, ch) => _.countBy(str)[ch] || 0;
                _.eachRight(this.nodes, value => {
                    value.level = count(value.sequenceDisplay, ".");
                    if (this.getChildrenCount(value.idProjectCost) > 0) {
                        value.amount = "";
                    } else {
                        value.total = "";
                    }
                   //this.recalculateParentTotal(value.idProjectCost);
                });
                //this.calculateAllNodeWithFormula();
            }
            this.resetNodeModal(true);
        },

        resetNodeModal(closeModal) {
            this.nodeModal.idParent = 0;
            this.nodeModal.idProjectCost = 0;
            this.nodeModal.title = "";
            this.nodeModal.amountFormula = "";
            this.nodeModal.type = "";
            this.nodeModal.amount = 0;
            this.nodeModal.monthYear = {};
            this.nodeModal.costLinks = [];
            this.controls.costLinksControl.value(this.nodeModal.costLinks);
            let controlLedgerAccounts = $("#ledgerAccounts").data("kendoMultiSelect");
            controlLedgerAccounts.readonly(false);
            $(".k-multiselect-wrap").css("background-color", "white");
            if (closeModal) $("#costEntryModal").modal("hide");
        },

        removeNode(idProjectCost) {
            let confirmDelete = true;
            let parentNode = this.getParentNode(idProjectCost);

            let childrenCount = this.getChildrenCount(idProjectCost);
            if (childrenCount > 0) {
                alert(
                    "Cannot delete, this entry has children. Please delete the children first."
                );
                return;
                //confirmDelete = confirm('This will remove all of its children, continue?');
            }
            if (confirmDelete) {
                this.removeNodeAndItsChildren(idProjectCost);
                this.updateNodeSequenceDisplay(
                    parentNode ? parentNode.idProjectCost : 0,
                    true
                );
            }
        },

        updateNodeSequenceDisplay(idParent, autoSequence) {
            let count = 1;
            _.each(this.nodes, v => {
                if (v.idParent !== idParent) return;
                let parent = this.getParentNode(v.idProjectCost);
                let newSequence = count;
                if (!autoSequence) {
                    newSequence = v.sequence;
                }
                v.sequence = newSequence;
                if (_.isNil(parent)) {
                    v.sequenceDisplay = newSequence.toString();
                } else {
                    v.sequenceDisplay = parent.sequenceDisplay + "." + newSequence;
                }
                count++;
                this.updateNodeSequenceDisplay(v.idProjectCost, autoSequence);
            });
        },

        removeNodeAndItsChildren(idProjectCost) {
            let children = this.getChildrenNode(idProjectCost);
            for (let i = 0; i < children.length; i++) {
                this.removeNodeAndItsChildren(children[i].idProjectCost);
            }
            this.removeSingleNode(idProjectCost);
        },

        removeSingleNode(idProjectCost) {
            let index = _.findIndex(this.nodes, {
                idProjectCost: idProjectCost
            });
            this.$delete(this.nodes, index);
        },

        getParentNode(idProjectCost) {
            let node = this.getNode(idProjectCost);
            return _.find(this.nodes, o => {
                return o.idProjectCost === node.idParent;
            });
        },

        getChildrenNode(idProjectCost) {
            return _.filter(this.nodes, o => {
                return o.idParent === idProjectCost;
            });
        },

        getLevelOfParent(idProjectCost, idProject, level) {
            let foundParent = false;
            let idParent = -1;
            this.nodes.some(o => {
                if (o.idProjectCost === idProjectCost && o.idProject === idProject) {
                    foundParent = true;
                    idParent = o.idParent;
                    return true;
                }
            });
            if (foundParent && idParent > -1) {
                return this.getLevelOfParent(idParent, idProject, level + 1);
            }
            if (!foundParent) {
                return level;
            }
        },

        getChildrenCount(idProjectCost) {
            return this.getChildrenNode(idProjectCost).length;
        },

        getNode(idProjectCost) {
            return _.find(this.nodes, o => {
                return o.idProjectCost === idProjectCost;
            });
        },

        loadCostTitles(id) {
            let self = this;
            try {
                let config = {};
                config.headers = {};
                config.headers[
                    document.querySelector('meta[name="_csrf_header"]').content
                    ] = document.querySelector('meta[name="_csrf"]').content;
                axios
                    .get("/api/v1/key-value/fetch-all-cost-titles-by-id?id=" + id, config)
                    .then(response => {
                        if (response.data.length > 0) {
                            $.each(response.data, function (i, item) {
                                let checkExistTitle = _.find(self.nodes, o => {
                                    return o.title === item.nodeName;
                                });
                                if (!checkExistTitle) self.costTitles.push(item);
                            });
                        } else {
                            response.data.errors["generalErrors"];
                            psi.alert(response.data.errors["generalErrors"]);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        //self.generalErrors.push(error);
                    });
            } catch (err) {
                console.error(err);
            }
        },

        onMonthlyCloseSave(monthlyEntry) {
            this.errors = [];
            this.controls.notesControl = $("#closeNotes").data("kendoEditor");
            let notes = this.controls.notesControl.value();
            if (notes === "") {
                psi.alert("Notes is required.");
                return;
            }

            let checkGL1text = $("#checkGL1").text();
            let checkEHRtext = $("#checkEHR").text();

            let projectIdArray = [];
            projectIdArray.push(parseInt(this.idProject));

            let monthlyClose = {
                idProject: projectIdArray,
                notes: checkGL1text + checkEHRtext + notes,
                months: parseInt(monthlyEntry.month),
                years: parseInt(monthlyEntry.year),
                type: "MON_PM_CLOSE",
                costViewModelList :this.nodes,
                fromCostTable:true
            };
            $("#costClosingModal").modal("hide");
            axios
                .post("/api/v1/monthly-closings/", monthlyClose, this.axiosConfig)
                .then(res => {
                    if (res.data.result == "success") {
                        psi.alert("Monthly Closing  success!");
                        window.location.href = "/project/tab?t=2&idProject=" + this.idProject;
                    } else {
                        psi.alert(
                            "Error closing monthly cost : " +
                            res.data.errors["generalErrors"]
                        );
                    }

                })
                .catch(err => {
                    console.log(err);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        resetClosingModal(closeModal) {
            this.controls.notesControl = $("#closeNotes").data("kendoEditor");
            this.controls.notesControl.value("");
            if (closeModal) $("#costClosingModal").modal("hide");
        },

        showMonthlyCloseNotes(each) {
            this.monthlyEntry = each;
            this.resetClosingModal(false);
            $("#costClosingModal").modal("show");
        }
    },
    watch: {},
    created() {},
    mounted() {
        let self = this;
        self.setupControls();
        self.loadOptionLedger();
        self.isAdministrator = false;

        if (self.currentUser === "Administrator") {
            self.isAdministrator = true;
        }

        axios
            .get("/api/v1/user/" + self.currentUser, self.axiosConfig)
            .then(function (res) {
                if (res.data) {
                    self.menus = res.data.menus.split(",");
                }
            })
            .catch(function (err) {
                console.error(err);
            })
            .then(function () {});
        $("#costEntryModal")
            .modal({
                backdrop: "static",
                focus: true,
                show: false
            })
            .on("shown.bs.modal", e => {
                $("#costTitle").focus();
            });
        $('[data-toggle="tooltip"]').tooltip();
    },
    filters: {
        toNumericSeparatorAndDecimal(value, item) {


            if (_.isNaN(value) ) {
                return "0";
            }

            let hasFraction = false;
            let fractionDigits = 0;
            let formatStyle = "decimal";

            if (item != null) {
                fractionDigits = item.fractionDigits;
                hasFraction = fractionDigits > 0;
                formatStyle = item.formatStyle != null ? item.formatStyle : "decimal";
            }

            if(item.formatStyle=="percent")
            {
                if(Math.abs(value) >1){
                    value = value/100;
                    fractionDigits = fractionDigits;
                }
            }


            const formatter = new Intl.NumberFormat("en-US", {
                style: formatStyle,
                useGrouping: ",",
                minimumFractionDigits: 0,
                maximumFractionDigits: fractionDigits
            });
            return formatter.format(hasFraction ? value : Number(value).toFixed());
        }
    }
});