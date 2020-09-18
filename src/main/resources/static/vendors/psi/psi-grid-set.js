Vue.component('psi-grid-set', {
    template: `<div class="container-fluid">
        <div class="row">
             <slot name="title"></slot>            
        </div>
        <div class="row" style="display: none;" :style="{ display: hasErrors }">
            <!--<div class="alert alert-danger" role="alert">
                <span class="glyphicon glyphicon-exclamation-sign"></span>
                <ul>
                    <li v-for="item in generalErrors">{{item}}</li>
                </ul>
            </div>-->
        </div>
        <div class="row">
            <div>
                <template v-for="button in contextButtons">                    
                    <button type="button" class="btn " v-bind:class="button.class ? button.class : 'btn-primary'" @click="onButtonClick(button.clickAction, $event)" v-bind:disabled="button.disabled">
                        <span class="glyphicon" v-bind:class="button.icon ? button.icon : ''" aria-hidden="true"></span>{{ button.icon ? ' ' : '' }}{{ button.display }}
                    </button>&nbsp;
                </template>                
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12" style="padding: 20px 0;">
                <psi-grid-wrapper 
                ref="theGrid"
                :id="id" 
                :url="url" 
                :schema="schema" 
                :aggregate="aggregate"
                :columns="columns" 
                :multipleSelect="multipleSelect"
                :grid-height="gridHeight"
                :enable-excel="enableExcel"
                :enable-grouping="enableGrouping"
                :enable-paging="enablePaging"
                :auto-height="autoHeight"
                :column-menu="columnMenu"
                :excel-proxy="excelProxy"
                v-on:rowSelected="onRowSelectedHandler"
                v-on:on-error="onErrorHandler"                
                v-once></psi-grid-wrapper>
                <slot></slot>
            </div>
        </div>
    </div>`,
    props: {
        id: {type: String},
        url: {type: String},
        contextButtons: {type: Array},
        schema: {type: Object},
        aggregate: {type: Array, default: function() { return []; }},
        columns: {type: Array},
        multipleSelect: {
            type: Boolean,
            default: false
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
            counter: 0,
            generalErrors: [],
            selectedItems: []
        }
    },
    computed: {
        hasErrors() {
            if (this.generalErrors.length > 0) {
                return "block";
            }
            else {
                return "none";
            }
        }
    },
    methods:
        {
            onRowSelectedHandler(selectedRows)
            {
                this.selectedItems = selectedRows;
                //console.log(this.selectedItems);
            },
            onErrorHandler(generalErrors)
            {
                if(generalErrors.length > 0) {
                    generalErrors.forEach(item => {
                        this.generalErrors.push(item.message);
                    });
                }
            },
            onButtonClick(clickActionCallback, event) {
                clickActionCallback(this.selectedItems, event);
            },
            refresh() {
                this.$refs.theGrid.populateData();
            },
            disableButtons() {
                $('.btn').attr('disabled', 'disabled');
            }
        },
    created() {
    },
    mounted() {
    }
})