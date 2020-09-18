Vue.component('psi-role-entry', {

	template: `
        <form @submit.prevent id="roleEdit" >
                        <div class="form-group row">
                            <label for="name" class="col-sm-2 col-form-label">Name<font color="red">*</font></label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="name" placeholder="Name" required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="description" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-4">
                                <input type="text" class="form-control" id="description" placeholder="Description" >
                            </div>
                        </div>
                        <div class="form-group row" >
                            <label for="menus" class="col-sm-2 col-form-label">Permissions<font color="red">*</font></label>
                            <div class="col-sm-4">
                                <select class="form-control" id="menus" ></select>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-sm-4">
                          <input type="hidden" id="title" />
                                <button id="save-button" type="submit" class="btn btn-primary">Save</button>
                                <button id="cancel-button" type="button" class="btn btn-neutral">Cancel</button>
                                 
                            </div>
                        </div>
                         </form>
    `,

	data: function () {
		return {
			menu: {
				roleEdit: {},
			},

		}

	},
	watch: {},
	methods: {
		save() {
			let self = this;
			roleEdit.axiosConfig = {};
			roleEdit.axiosConfig.headers = {};
			roleEdit.axiosConfig.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
			roleEdit.data = {};
			roleEdit.data.name = roleEdit.controls.name.val().trim();
			roleEdit.data.description = roleEdit.controls.description.val();
			roleEdit.data.menus = roleEdit.controls.menus.value().toString();
			roleEdit.data.idRole = roleEdit.controls.idRole.val();
			if (self.validate(roleEdit.data)) {

				axios.post('/api/v1/role/' + roleEdit.data.idRole, roleEdit.data, roleEdit.axiosConfig)
					.then(function (res) {
						if (res.data.existedRecord) {
							psi.alert('Record Already Existed for Same Code');
						} else {
							psi.alert("Save success!");
							location.href = "/role";
						}
					})
					.catch(function (err) {
						console.log(err);
						psi.alert('Error when saving role');
					})

			}
		},


		loadRole(idrole) {
			
			roleEdit.axiosConfig = {};
			roleEdit.axiosConfig.headers = {};
			roleEdit.axiosConfig.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
			axios.get('/api/v1/role/' + idrole, roleEdit.axiosConfig)
				.then(function (res) {
					if (res.data) {
						roleEdit.data = res.data;
					}
				})
				.catch(function (err) {
					psi.alert('Error when loading role');
				})
				.then(function () {
					if (roleEdit.data) {
						roleEdit.controls.name.val(roleEdit.data.name);
						roleEdit.controls.description.val(roleEdit.data.description);
						roleEdit.controls.idRole.val(roleEdit.data.idRole)
						if (roleEdit.data.menus && roleEdit.data.menus.length > 0)
							roleEdit.controls.menus.value(roleEdit.data.menus.split(','));

					}
				});
		},

		setup() {
			let self = this;
			roleEdit.controls = {};
			roleEdit.controls.idRole = $('#idRole');
			roleEdit.controls.name = $('#name');
			roleEdit.controls.description = $('#description');

			roleEdit.controls.menus = $("#menus").kendoMultiSelect({
				optionLabel: " ",
				dataTextField: "name",
				dataValueField: "name",
				dataSource: {
					data: [{
							name: "Dashboard",
							type: "#"
						},
						{
							name: "Companies",
							type: "#"
						},
						{
							name: "Catalog",
							type: "#"
						},
						{
							name: "Billing",
							type: "Catalog"
						},
						{
							name: "Collection",
							type: "Catalog"
						},
						{
							name: "Equipment Types",
							type: "CRP"
						},
						{
							name: "Project Types",
							type: "Masters"
						},
						{
							name: "Business Division",
							type: "Masters"
						},
						{
							name: "Operative Unit",
							type: "Masters"
						},
						{
							name: "INCO TERMS",
							type: "Masters"
						},
						{
							name: "Generic",
							type: "Masters"
						},
						{
							name: "Ledger Master",
							type: "Masters"
						},
						{
							name: "Formula Version",
							type: "Masters"
						},
						{
							name: "Cost Types",
							type: "Project Cost"
						},
						{
							name: "Cost Templates",
							type: "Project Cost"
						},
						{
							name: "Project List",
							type: "Project"
						},
						{
							name: "PMS",
							type: "Project"
						},
						{
							name: "User Management",
							type: "Admin"
						},
						{
							name: "Role Management",
							type: "Admin"
						},
						{
							name: "Import User",
							type: "Admin"
						},
						{
							name: "Import Data",
							type: "Admin"
						},
						{
							name: "Currency Exchange",
							type: "Admin"
						},
						{
							name: "Financial Monthly Closing",
							type: "Admin"
						},
						{
							name: "PM Monthly Closing",
							type: "Project Cost"
						}
					],
					group: {
						field: "type"
					}
				}
			}).data("kendoMultiSelect");

			$('#save-button').on('click', function () {
				self.save();
			});

			$('#cancel-button').on('click', function () {
				window.location.href = '/role';
			});


		},

		validate(data) {

			roleEdit.data = data;
			if (!roleEdit.data.name.trim() || !roleEdit.data.menus.trim()) {
				if (!roleEdit.data.name.trim() && !roleEdit.data.menus.trim())
					$("#roleEdit").trigger('reset');
				else if (!roleEdit.data.name.trim()) {
					$("#name").val("");
				} else if (!roleEdit.data.menus) {
					$("#menus").val("");
					psi.alert("Please select atleast one permission to Role")

				}
				return false;
			}
			return true;
		},



	},
	mounted() {

		let self = this;
		self.setup();
		var idRole = $('#idRole').val();
		var x = $('#title').val();
		document.getElementById("idtile").innerHTML = x;
		self.loadRole(idRole);


	}

});