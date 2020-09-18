Vue.component('psi-table-wrapper',{
    props:{
        project:{type:Object},
        id: {type: String},
    },
    template:`<div class="form-group row" :id="id" style="margin-left:242px;"  @mouseout.out="mouseDown()"  >
			<table class="table table-striped table-bordered"  style="width: 79%;">
			
				<thead class="thead-light">
					<tr>
					<th>Order Version</th>
					<th>Order Start Date</th>
					<th>Order End Date</th>
					<th>Order Value</th>
					<th width="5%">
						<button id="save-order" class="btn btn-primary"   @click="saveOrderDetails()" ><i class="icon-plus"></i></button>
					</th>
					</tr>
					</thead>
					<tbody>
					<tr v-for ="(contractOrderDetails,index) in orderList">
					<td width="5%">
						<input :id="'orderSequence_'+index"  v-model="contractOrderDetails.orderSequence" class="form-control" disabled="true" />
					</td>
					<td>
						<psi-datepicker-wrapper class="form-control w-100" :id="'orderOfStart_'+index" name="orderOfStart" v-model="contractOrderDetails.orderStartDate" 
												format="dd MMMM yyyy" :value="contractOrderDetails.orderStartDate" @change="onChangeBind('orderOfStart',$event,index)"
						></psi-datepicker-wrapper>
					</td>
					<td>
						<psi-datepicker-wrapper class="form-control w-100" :id="'orderOfEnd_'+index" name="orderOfEnd" v-model="contractOrderDetails.orderEndDate" 
												format="dd MMMM yyyy" :value="contractOrderDetails.orderEndDate" @change="onChangeBind('orderOfEnd',$event,index)"
						></psi-datepicker-wrapper>
					</td>
					<td>
						<psi-auto-numeric type="text" :id="'orderValue_'+index"  v-model="contractOrderDetails.orderValue"     :value="contractOrderDetails.orderValue" ></psi-auto-numeric>
					</td>
					<td>
						<button id="delete-order" class="btn btn-primary" @click="deleteOrderDetails(index)"  ><i class="icon-trash"></i></button>
					</td>
					
				</tr>
				</tbody>
			</table>
		
		</div>`,

    data: function() {
        return {
            orderList:[],
            count:0

        }
    },
   computed:{


   },
    methods:{
        onChangeBind(id,e,index){

            if (id == "orderOfStart") {
                this.orderList[index].orderStartDate = moment(e).format("DD MMMM YYYY").toString();
                console.log( this.orderList[index].orderStartDate);
            } else if (id == "orderOfEnd") {
                this.orderList[index].orderEndDate = moment(e).format("DD MMMM YYYY").toString();
                console.log( this.orderList[index].orderEndDate);
            }

        },

        saveOrderDetails()
        {

            this.orderList.push({
                    orderValue: 0,
                    orderStartDate: null,
                    orderEndDate: null,
                    orderSequence: this.orderList.length
                })
            this.project.orderDetailList = this.orderList;
            this.count++;

        },

        mouseDown(){
            let amount=0;
            this.orderList.forEach(res=>{
             amount=amount+accounting.unformat(res.orderValue);
            })
            this.project.contractValue=0;
            this.project.contractValue = amount;
            console.log(moment(this.orderList[0].orderStartDate).format("DD MMMM YYYY").toString());
            this.project.expectedStartDateTime = moment(this.orderList[0].orderStartDate).format("DD MMMM YYYY").toString();
            this.project.expectedProjectCompletionDateTime = moment(this.orderList[this.orderList.length-1].orderEndDate).format("DD MMMM YYYY").toString();
        },


        deleteOrderDetails(index){
            this.$delete(this.orderList,index);
        },

    },
    created: function(){
        this.orderList = this.project.orderDetailsList
    },
    mounted(){
        this.orderList = this.project.orderDetailsList;

    }



});