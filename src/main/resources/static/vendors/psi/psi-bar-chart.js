Vue.component('psi-bar-chart', {
    template: `

<div class="content">
		<div class="wrapper"><canvas id="chart-0"></canvas></div>
		<div class="toolbar">
			<button onclick="randomize(this)">Randomize</button>
			<button onclick="addDataset(this)">Add Dataset</button>
			<button onclick="removeDataset(this)">Remove Dataset</button>
		</div>
	</div>

    `,
     data: function(){
       return{
          data:{},
    	  options:{},
    	  chart:{},
    	  DATA_COUNT :16,
    	 
        	  }
        
          },
          watch: {},
          methods: {	
        colorize(opaque, ctx) {	
        	var v = ctx.dataset.data[ctx.dataIndex];
			var c = v < -50 ? '#D60000'
				: v < 0 ? '#F46300'
				: v < 50 ? '#0358B6'
				: '#44DE28';
			return opaque ? c : Samples.utils.transparentize(c, 1 - Math.abs(v / 150));
			},
		
		 generateData() {
			return Samples.utils.numbers({
				count: this.DATA_COUNT,
				min: -100,
				max: 100
			});
		},
		getData(){
			this.data = {
					labels: Samples.utils.months({count: this.DATA_COUNT}),
					datasets: [{
						data: this.generateData()
					}]
				}
			},
			getoptions(){
				this.options = {
			
					legend: false,
					tooltips: false,
					elements: {
						rectangle: {
							backgroundColor: this.colorize.bind(null, false),
							borderColor: this.colorize.bind(null, true),
							borderWidth: 2
						}
					}
				}
			},
			getChart(){
				this.chart = new Chart('chart-0', {
					type: 'bar',
					data: this.data,
					options: this.options
				})
			},
		
	
		// eslint-disable-next-line no-unused-vars
	     randomize() {
			chart.data.datasets.forEach(function(dataset) {
				dataset.data = this.generateData();
			});
			chart.update();
		},
		// eslint-disable-next-line no-unused-vars
		 addDataset() {
			let self =this;
			chart.data.datasets.push({
				data: this.generateData()
			});
			chart.update();
		},
		// eslint-disable-next-line no-unused-vars
		 removeDataset() {
			chart.data.datasets.shift();
			chart.update();
		},
	
	
		},
		
   mounted(){
	  Samples.utils.srand(110);
       this.getData();
       this.getoptions();
       this.getChart();
		
	
   }
         
});


