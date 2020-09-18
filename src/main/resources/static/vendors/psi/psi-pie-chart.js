Vue.component('psi-pie-chart', {
    template: `


	<div class="content">
		<div class="wrapper"><canvas id="chart-1"></canvas></div>
		<div class="toolbar">
			<button onclick="randomize()">Sales</button>
			<button onclick="addDataset()">Finance & HR</button>
			<button onclick="removeDataset()">BU3 & BU1</button>
			<button onclick="togglePieDoughnut()">R&D</button>
		</div>
	</div>


    `,
     data: function(){
       return{
          data:{},
    	  options:{},
    	  chart:{},
    	  DATA_COUNT :5,
    	 
        	  }
        
          },
          watch: {},
          methods: {	
        colorize(opaque, hover, ctx) {
			var v = ctx.dataset.data[ctx.dataIndex];
			var c = v < -50 ? '#D60000'
				: v < 0 ? '#F46300'
				: v < 50 ? '#0358B6'
				: '#44DE28';
			var opacity = hover ? 1 - Math.abs(v / 150) - 0.2 : 1 - Math.abs(v / 150);
			return opaque ? c : Samples.utils.transparentize(c, opacity);
		},
		 hoverColorize(ctx) {
			return this.colorize(false, true, ctx);
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
					datasets: [{
						data: this.generateData(),
					}]
				}
			},
			getoptions(){
				this.options = {
					legend: false,
					tooltips: false,
					elements: {
						arc: {
							backgroundColor: this.colorize.bind(null, false, false),
							hoverBackgroundColor: this.hoverColorize
						}
					}
				}
			},
			getChart(){
				this.chart = new Chart('chart-1', {
					type: 'pie',
					data: this.data,
					options: this.options
				})
			},
		
	
		// eslint-disable-next-line no-unused-vars
	 randomize() {
			chart.data.datasets.forEach(function(dataset) {
				dataset.data = generateData();
			});
			chart.update();
		},
		// eslint-disable-next-line no-unused-vars
		 addDataset() {

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
		// eslint-disable-next-line no-unused-vars
		 togglePieDoughnut() {
			if (chart.options.cutoutPercentage) {
				chart.options.cutoutPercentage = 0;
			} else {
				chart.options.cutoutPercentage = 50;
			}
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


