Vue.component('psi-handover-component', {
    props: ['node', 'indicator','projectstatus'],
    template: `<tr>
                 <td  style="background-color: lightgrey;position: sticky;left:0px;"   v-if="node.idParent == 0" :style="{\'padding-left\': node.level * indent + left_padding + \'px\'}"><b>{{node.sequenceDisplay}} {{node.titleNew}}</b></td>
                 <td  style="background-color: lightgrey;position: sticky;left:0px;" :style="{\'padding-left\': node.level * indent + left_padding + \'px\'}" v-if="node.idParent != 0">{{node.sequenceDisplay}} {{node.titleNew}}</td>
                 <td   v-if="!emptyValue(node)"style="text-align: right;width: 100px;min-width: 100px;background-color: #cccc77;position: sticky;left:350px;" ><b>{{node.amount | toNumericSeparatorAndDecimal(node) }}</b></td>
                 <td   v-if="emptyValue(node)"style="text-align: right;width: 100px;min-width: 100px;background-color: #cccc77;position: sticky;left:350px;" ><b></b></td>
              <template  v-for="(orderVer,count) in node.orderVersionViewModals">
                    <template v-for="(orderVerCost,index) in orderVer.orderCostDetails" >
                      <td style="text-align: right;width: 100px;min-width: 100px;" v-if="node.children.length >0 && !emptyValue(orderVerCost)">{{ orderVerCost.orderCostAmount | toNumericSeparatorAndDecimal(orderVerCost) }}</td>
                      <td style="text-align: right;width: 100px;min-width: 100px;" v-if="node.idParent ==0 && node.children.length>0 && emptyValue(orderVerCost)"></td>
                      <td style="text-align: right;width: 100px;min-width: 100px;" v-if="node.idParent ==0 && node.children.length==0">{{ orderVerCost.orderCostAmount | toNumericSeparatorAndDecimal(orderVerCost) }}</td>
                      <td  style="text-align: right;width: 100px;min-width: 100px;"  v-if=" node.children.length==0 && node.idParent !=0  " >
                      
                      <template v-if="orderVer.orderVersion ==0 && (projectstatus == 'DRAFT' || projectstatus == 'FORECAST')">
                      <input type="text" v-model="orderVerCost.orderCostAmount" style="border-width:0px;border:none;text-align: right;"  @keypress="isNumber($event)" @input="handleInput(orderVerCost,$event)" @keyup.enter="enterClicked(orderVerCost)"/>
                      </template>
                      
                      <template v-if="orderVer.orderVersion ==0 && (projectstatus == 'ACTIVE' || projectstatus == 'CLOSED')">
                      <input  type="text"  style="border-width:0px;border:none;text-align: right;"  v-model="orderVerCost.orderCostAmount"   disabled="disabled" @input="handleInput(orderVerCost,$event)"/>
                      </template>
                      
                      <template v-if="orderVer.orderVersion >0 && projectstatus == 'ACTIVE'">
                      <input type="text" v-model="orderVerCost.orderCostAmount" style="border-width:0px;border:none;text-align: right;"   @keypress="isNumber($event)" @input="handleInput(orderVerCost,$event)" @keyup.enter="enterClicked(orderVerCost)"/>
                      </template>
                      
                         
                      <template v-if="orderVer.orderVersion >0 && projectstatus == 'CLOSED'" >
                      <input  type="text"  style="border-width:0px;border:none;text-align: right;"  v-model="orderVerCost.orderCostAmount"   disabled="disabled" @input="handleInput(orderVerCost,$event)"/>
                      </template>
                      </td>
                    
                  </template>
              </template>
              
              
              </tr>`,

    data() {
        return {
            indent: 20,
            left_padding: 3,

        };
    },
    computed: {

    },
    methods: {
        handleInput: function (orderVerCost, event)
        {
            if (this.node.idProjectCost == orderVerCost.idProjectCost)
            {
                console.log(orderVerCost.orderCostAmount);
            }
        },
        emptyValue(orderVerCost)
        {
           let indCatorforEmpty=false;
            if(orderVerCost.sequenceDisplay === '5' || orderVerCost.sequenceDisplay === '3' || orderVerCost.sequenceDisplay === '6'|| orderVerCost.sequenceDisplay === '9')
            {
                indCatorforEmpty = true;
            }else{
                indCatorforEmpty = false;
            }
            return indCatorforEmpty;
        },


        enterClicked: function (orderVerCost) {
            let config = {};
            config.headers = {};
            config.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
            try {
                axios.post('/api/v1/project/saveEachHandOver?idProject=' + this.node.idProject, orderVerCost, config)
                    .then(function (res) {
                      console.log(res.data);
                       this.$emit('nodesvalescost', res.data)
                    }.bind(this))
            } catch (err) {
                console.error(err);
            }

        },

        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var e = (evt.which) ? evt.which : evt.keyCode;

            if (e != 46 && e != 45 && e != 46 &&
                !(e >= 48 && e <= 57)){
                evt.preventDefault();;
            } else {
                return true;
            }
        }


    },
    mounted() {

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