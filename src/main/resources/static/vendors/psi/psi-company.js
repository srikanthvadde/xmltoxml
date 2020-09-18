Vue.component('psi-company', {
	

    template: `
        <form @submit.prevent id="companyForm" >
                      
                         </form>
                         
    `,
      
          data: function(){
        	  return{
          menu:{
        	  companyForm:{


			  },
          
          	
          	
          },
  
        	  }
          },
          watch: {},
          methods: {
        	        save() {
        	        	let self=this;
        	    	companyForm.data = {};
        	        companyForm.data.idCompany = companyForm.controls.idCompany.val();
        	        companyForm.data.name = companyForm.controls.name.val().trim();
        	        companyForm.data.code = companyForm.controls.code.val().trim();
        	        companyForm.data.pentaCode = companyForm.controls.pentaCode.val().trim();
        	        companyForm.data.status = companyForm.controls.status.val();
        	        console.log(companyForm.data.status);
        	        companyForm.axiosConfig = {};
        	        companyForm.axiosConfig.headers = {};
        	        companyForm.axiosConfig.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;

        	        console.log(companyForm.data);
        	   
        	        if(self.validate(companyForm.data)){
        	        let success = false;
        	     
        	        axios.post('/api/v1/customer/upsert-customer', companyForm.data, companyForm.axiosConfig)
        	            .then(function (res) {
        	            	
        	            	if(res.data.existedRecord)
        	            	{
        	            		 psi.alert('Record Already Existed for Same Code');
        	            	}
        	            	else
        	            	{
        	                     success = res.data && res.data.idCompany;
        	            	     psi.alert("Save success!");
        	            	     location.href = "/customer/customers";
        	            	}
        	            })
        	            .catch(function (err) {
        	                psi.alert('Error when saving record');
        	            })
        	           
        	        }
        	    },
    
   
        	   loadCompany(id) {
        	        axios.get('/api/v1/customer/get-customer?id=' + id, companyForm.axiosConfig)
        	            .then(function (res) {
        	                if (res.data) {
        	                    companyForm.data = res.data;
        	                }
        	            })
        	            .catch(function (err) {
        	                psi.alert('Error when loading user');
        	            })
        	            .then(function () {
        	                if (companyForm.data) {
        	                    companyForm.controls.idCompany.val(companyForm.data.idCompany)
        	                    companyForm.controls.name.val(companyForm.data.name);
        	                    companyForm.controls.code.val(companyForm.data.code);
        	                    companyForm.controls.pentaCode.val(companyForm.data.pentaCode);
        	                    companyForm.controls.status.val(companyForm.data.status);
        	                }
        	            });
        	    },
        	    
        	   setup() {
        	    	let self=this;
        	        companyForm.controls = {};
        	        companyForm.controls.idCompany = $('#idCompany');
        	        companyForm.controls.name = $('#name');
        	        companyForm.controls.code = $('#code');
        	        companyForm.controls.pentaCode = $('#pentaCode');
                   companyForm.controls.status = $('#status');
                   console.log(companyForm.controls.status);

        	        $('#save-button').on('click', function () {
        	        	self.save();
        	        });
        	    
        	        //let paths = window.location.pathname.split('/');
        	        //let length = paths.length;
        	        //companyForm.idCompany = paths[length - 1];
        	    },
              
        	    validate(data){
        	    	 companyForm.data = data;
        	    	 if(!companyForm.data.name.trim()||!companyForm.data.code.trim()){
        	      	   if(!companyForm.data.name.trim() && !companyForm.data.code.trim())
        	      	       $("#companyForm").trigger('reset');
        	      	   else if(!companyForm.data.name.trim()){
        	      		   $("#name").val("");
        	      	   } else if(!companyForm.data.code.trim()){
        	      		   $("#code").val("");
        	      	   }
        	      	 return false;
        	      	   }
        	      	return true;  
        	         },
           
 },
   mounted(){
	  let self = this;
	  self.setup();
	  var idcompany = $('#idCompany').val();
	   self.loadCompany(idcompany);
	
	
   }
         
});


