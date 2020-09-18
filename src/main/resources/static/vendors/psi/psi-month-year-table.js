Vue.component('psi-month-year-table', {
    template: `
    	<div class="scrollbar" style="height:600px;">
    	<nav   id="context-menu" class="contextMenu">
					               <ul class="contextMenu-items"">
						               <li class="contextMenu-item">
							              <button class="contextMenu-action btn btn-primary" @click="onOpenModal('N')"   v-if="showAdd"  data-action="Add" >
								          <i class="fa fa-plus"></i> Add</button>
						               </li>
						               <li class="contextMenu-item">
							              <button class="contextMenu-action btn btn-primary" @click="onOpenModal('Y')" v-if="showInd " data-action="Edit">
								          <i class="fa fa-edit"></i>{{buttonName}}</button>
						               </li>
					               </ul>
				                 </nav>
    		<table class="billing-table">
                <thead>                    
                        <tr align="center">
                            <template v-for="(item, index) in axisX">
                                <th v-if="!item.isBlankSpacer" :colspan="computeColspan(index)" v-html="item.title"></th>
                                <th v-if="item.isBlankSpacer" :colspan="computeColspan(index)" style="border: none; background-color: #ffffff;">&nbsp;</th>
                            </template>                                                                                                            
                        </tr>
                        <tr align="center" v-if="flatSecondHeader.length > 0">
                            <template v-for="head in flatSecondHeader">
                                <th v-html="head.title"></th>
                            </template>                                                
                        </tr>                                                                                                    
    			</thead>
    			<tbody>
    			    <template v-for="(row, rindex) in axisY">
    			        <tr>    			            
    			            <template v-for="(col, i) in flatSecondHeader">
    			            	<template v-if="rindex==0">
	    			                 <template v-if="id=='billingTable'">
	    			                 	 <td v-if="((i) == 0)"></td>
	    			                	 <td v-if="((i) == 1)"><span v-html="row.title"></span></td>
	    			                	 <td align="center" v-if="((i) == 2)"><span v-html="row.percentage"></span></td>
	    			                	 <td align="right" v-if="((i) == 3)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.value)"></span></td>
	    			                	 <td align="right" v-if="((i) == 4)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumForecast)"></span></td>
	    			                     <td align="right" v-if="((i) == 5)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumActual)"></span></td>
	    			                     <td align="right" v-if="((i) > 5)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(getTotalPerMonthData(row.id, col.id))"></span></td>
	    			                </template>
	    			                <template v-else>
	    			                	 <td v-if="((i) == 0)"></td>
	    			                	 <td v-if="((i) == 1)"><span v-html="row.title"></span></td>
	    			                	 <td align="right" v-if="((i) == 2)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumForecast)"></span></td>
	    			                     <td align="right" v-if="((i) == 3)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumActual)"></span></td>
	    			                	 <td align="right" v-if="((i) > 3)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(getTotalPerMonthData(row.id, col.id))"></span></td>
	    			                </template>
    			            	</template>
    			            	<template v-else>
	    			                <template v-if="id=='billingTable'">
		    			                <td v-if="((i) == 0)"><span v-html="(rindex+1-1)"></span></td>
		    			                <td v-if="((i) == 1)"><span v-html="row.title"></span></td>
	    			                	<td align="center" v-if="((i) == 2)"><span v-html="row.percentage"></span></td>
	    			                	<td align="right" v-if="((i) == 3)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.value)"></span></td>
	    			                	<td align="right" v-if="((i) == 4)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumForecast)"></span></td>
	    			                	<td align="right" v-if="((i) == 5)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumActual)"></span></td>
	    			                	<template v-if="isDisplayEntry(row,col)">
		    			                	 <td align="right" v-if="((i) > 5)" @dblclick="onDblClick(col.title,row.id, col.id)" v-html="$options.filters.toNumericSeparatorAndDecimal(getData(row.id, col.id))"></td>
		    			                </template>
		    			                <template v-else>
		    			                	 <td align="right" v-if="((i) > 5)" @dblclick="onDblClick(col.title,row.id, col.id)" v-html="$options.filters.toNumericSeparatorAndDecimal(getData(row.id, col.id))"></td>
		    			                </template>
	    			                </template>
		    			            <template v-else>
		    			            	<td v-if="((i) == 0)"><span v-html="(rindex+1-1)"></span></td>
		    			                <td v-if="((i) == 1)"><span v-html="row.title"></span></td>
	    			                	<td align="right" v-if="((i) == 2)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumForecast)"></span></td>
	    			                	<td align="right" v-if="((i) == 3)"><span v-html="$options.filters.toNumericSeparatorAndDecimal(row.cumActual)"></span></td>
	    			                		 <template v-if="isDisplayEntry(row,col)">
		    			                	 <td align="right" v-bind:style="getColor(row.id,col.id)"   v-if="((i) > 3)"  v-bind:class = "(col.id.includes('actual') || col.id.includes('forecast') )?'contextMenu-target':''"  @dblclick="onDblClick(col.title,row.id, col.id)" v-html="$options.filters.toNumericSeparatorAndDecimal(getData(row.id, col.id))" @contextmenu.prevent="getTheData(col.title,row.id,col.id)"  ></td>
		    			                </template>
		    			                <template v-else>
		    			                	 <td align="right"  v-bind:style="getColor(row.id,col.id)" v-if="((i) > 3)"    v-bind:class = "(col.id.includes('actual') || col.id.includes('forecast'))?'contextMenu-target':''"   @dblclick="onDblClick(col.title,row.id, col.id)" v-html="$options.filters.toNumericSeparatorAndDecimal(getData(row.id, col.id))" @contextmenu.prevent="getTheData(col.title,row.id,col.id)">
		    			           </td>
		    			                </template>
		    			            </template>
    			            	</template>
                            </template> 
    			        </tr>
    			    </template>
                </tbody>
    		</table>
    	</div>
    `,
    props: {
        id: {type: String},
        axisX: {type: Array},
        axisY: {type: Array},
        data: {type: Array},
        yearCurrent:{type:Number},
        monthCurrent:{type:Number}
    },
    data() {
        return {
            index: [],
            sumIndex: [],
            selected: {},
            buttonName:"",
            showInd:false,
            showAdd:false,
            backGroundColor:""
        }

    },
    watch:
        {},
    computed: {
        flatSecondHeader() {
            let tmpList = [];
            if (this.axisX.length > 0) {
                for (let i = 0; i < this.axisX.length; ++i) {
                    if (this.axisX[i].headers.length > 0) {
                        for (let j = 0; j < this.axisX[i].headers.length; ++j) {
                            tmpList.push(this.axisX[i].headers[j]);
                        }
                    }
                }
            }
            return tmpList;
        }
    },
    methods: {
    	isDisplayEntry(r,c)
    	{
    	   console.log("sggdddf");
    		let isCheckDisplayEntry = false;
    		if(this.getData(r.id, c.id) || this.getData(r.id, c.id) == 0)
    	    	{
    				isCheckDisplayEntry = true;
    				
    				if(c.isMonthlyClose == "true")
    				{
    					isCheckDisplayEntry = false;
    				}
    				else if(c.id.startsWith("invoice"))
	    			{
	    				isCheckDisplayEntry = false;
	    			}
    				else if(c.id.startsWith("receipt"))
	    			{
	    				isCheckDisplayEntry = false;
	    			}

    	    	}
    			
    		return isCheckDisplayEntry;
    	},
        computeColspan(index) {
            if (this.axisX.length > 0) {
                return this.axisX[index].headers.length;
            }
            return 0;
        },
        getTotalForecastPerMonth(month, year)
        {
        	let totalForecastPerMonth = 0;
    		for(let i = 0; i < this.data.length; ++i)
    		{
    			if(month == this.data[i].month && year == this.data[i].year)
    			{
    				totalForecastPerMonth += this.data[i].forecast;
    			}
    		}
        	return totalForecastPerMonth;
        },
        getTotalActualPerMonth(month, year)
        {
        	var totalActualPerMonth = 0;
        	for(var i = 0; i < this.data.length; ++i)
    		{
        		if(month == this.data[i].month && year == this.data[i].year)
    			{
        			totalActualPerMonth += this.data[i].actual;
    			}
    		}
        	return totalActualPerMonth;	
        },
        genMap() {

            for (let i = 0; i < this.data.length; ++i) {
                try {
                	
                	
                	let cellForecast = 'c_' + this.data[i].id + "_forecast" + this.data[i].month + "_" + this.data[i].year;
                    let cellActual = 'c_' + this.data[i].id + "_actual" + this.data[i].month + "_" + this.data[i].year;
                    let cellInvoice = 'c_' + this.data[i].id + "_invoice" + this.data[i].month + "_" + this.data[i].year;

        		
            		this.index[cellForecast] = this.data[i].forecast;
                    this.index[cellActual] = this.data[i].actual;
                    this.index[cellInvoice] = this.data[i].invoice;
                    
                	if(this.id == "collectionTable")
                		{
	                       let cellReceipt = 'c_' + this.data[i].id + "_receipt" + this.data[i].month + "_" + this.data[i].year;
	                       this.index[cellReceipt] = this.data[i].receipt;
	            
                		}

                    //set initial row for total
                    let cellTotalForecastPerMonth = "sum_0_" + "forecast" + this.data[i].month + "_" + this.data[i].year;
                    let cellTotalActualPerMonth = "sum_0_" + "actual" + this.data[i].month + "_" + this.data[i].year;
                    	
                    this.sumIndex[cellTotalForecastPerMonth] = this.getTotalForecastPerMonth(this.data[i].month, this.data[i].year);
                    this.sumIndex[cellTotalActualPerMonth] = this.getTotalActualPerMonth(this.data[i].month, this.data[i].year);
                    
                }
                catch (err) {
                }
            }
            
        },
        genKey(r, c) {
            return "c_" + r + "_" + c;
        },
        genTotalPerMonthKey(r, c) {
            return "sum_" + r + "_" + c;
        },
        getTotalPerMonthData(r, c) {
            let key = this.genTotalPerMonthKey(r, c);
            return this.sumIndex[key];
        },
        getData(r, c) {
            let key = this.genKey(r, c);
            return this.index[key];
        },
        getEntry(r, c) {
            let key = this.genKey(r, c);

	            		for (let i = 0; i < this.data.length; ++i) {
	                        try {
	                            let cellForecast = 'c_' + this.data[i].id + "_forecast" + this.data[i].month + "_" + this.data[i].year;
	                            let cellActual = 'c_' + this.data[i].id + "_actual" + this.data[i].month + "_" + this.data[i].year;
	                            let cellInvoice = 'c_' + this.data[i].id + "_invoice" + this.data[i].month + "_" + this.data[i].year;
	                            let cellReceipt = null;
	                            if(this.id == "collectionTable")
	                    		{
	                            	 cellReceipt = 'c_' + this.data[i].id + "_receipt" + this.data[i].month + "_" + this.data[i].year;
	                    		}
	                           
	                            if(key === cellForecast || key === cellActual || key === cellInvoice || key === cellReceipt)
	                            {
	                                return this.data[i];
	                            }
	                        }
	                        catch (err) {
	                        }
	                    }
            
            return null;
        },
        onDblClick(t, r, c) {
        	console.log(t);
        	console.log(c);
        	console.log(r);
        	let x = this.getEntry(r, c);

        	if(x !== null)
        		{
                    x.type = t;
                    if(t === 'Actual') {
                       if(x.month == this.monthCurrent && x.year == this.yearCurrent) {

                           this.$emit('cell-double-click', x);
                       }else{
                           return;
                       }
                    }
                    if(t === 'Forecast') {
                            this.$emit('cell-double-click', x);
                    }


        		}else{
        	    if(t === 'Actual') {
                    psi.alert("Forecast is mandatory inorder to enter Actual amount ");
                    return;
                }
                if(t === 'Forecast') {
                    psi.alert("Please create a milestone to proceed for this month");
                    return;
                }
            }
        },

        getColor(r,c){
    	    let x= this.getEntry(r,c);
    	    if(x!=null && x.backGroundColor!=null) {
    	        console.log(x.backGroundColor)
                return x.backGroundColor;
            }else{
    	        return "background-color:#FFFFFF";
            }
        },

        getTheData(t, r, c) {

            this.clickedObj = {};
            let x = this.getEntry(r, c);
            this.clickedObj = x;

            if (t === 'Forecast')
            {
                this.showAdd = false;
                console.log(this.clickedObj);
                if (this.clickedObj != null)
                {
                    if (this.clickedObj.actual == null || this.clickedObj.actual <= 0)
                    {
                        this.buttonName ='Move';
                        this.showInd = true;
                    } else
                    {
                        this.showInd = false;
                    }
                }else
                {
                    this.showAdd = false;
                    this.showInd = false;
                }
            } else
                {
                if(this.clickedObj != null) {
                    this.buttonName = 'Edit';
                    this.showAdd = true;
                    this.showInd = true;
                }else{
                    this.showAdd = false;
                    this.showInd = false;
                }
                }


            if (this.clickedObj !== null) {
                this.clickedObj.type = t;
            }

        },

        onOpenModal(indicator) {
            console.log(this.clickedObj)

            if (indicator == 'N') {
                var newObj = {};
                var newObj = {};
                newObj.isDirty = false;
                newObj.idReceiptScheduleEntry = this.clickedObj.idReceiptScheduleEntry;
                newObj.idMilestone = this.clickedObj.idMilestone;
                newObj.idReceipt = 0;
                newObj.idInvoice = this.clickedObj.idInvoice;
                newObj.invoiceAmount = this.clickedObj.invoiceAmount;
                newObj.forecast = this.clickedObj.forecast;
                newObj.actual = 0;
                newObj.invoice = this.clickedObj.invoice;
                newObj.receipt = "";
                newObj.month = this.clickedObj.month;
                newObj.year = this.clickedObj.year;
                newObj.type = this.clickedObj.type;
                newObj.partialBalance = this.clickedObj.partialBalance;
                newObj.partialMonth = this.clickedObj.partialMonth;
                newObj.partialYear = this.clickedObj.partialYear;

                this.$emit('cell-double-click', newObj);
            } else {
                this.clickedObj = this.clickedObj;
                console.log(this.clickedObj)
                this.$emit('cell-double-click', this.clickedObj);
            }

        }
    },
    created() {
    },
    mounted() {
        this.genMap();

        //sharedEvents.$on('forceInjectPivotData', this.forceInjectData);
    },
    filters: {
        toNumericSeparatorAndDecimal(value) {
          if (typeof value !== "number") {
            return value;
          }

          const formatter = new Intl.NumberFormat("en-US", {
            style: "decimal",
            useGrouping: ",",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
          });
          return formatter.format(value);
        }
      }
});


