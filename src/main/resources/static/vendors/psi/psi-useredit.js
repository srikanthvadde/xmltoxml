Vue.component('psi-useredit', {

    template: `
        <form @submit.prevent id="userEdit" >
                         
                         </form>
                         
    `,

    data: function(){
        return{
            menu:{
                userEdit:{},

            },

        }
    },
    watch: {},
    methods: {
        save() {

            userEdit.axiosConfig = {};
            userEdit.axiosConfig.headers = {};
            userEdit.axiosConfig.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;

            console.log(userEdit.data);

                let success = false;
                axios.post('/api/v1/user/' + userEdit.data.username, userEdit.data, userEdit.axiosConfig)
                    .then(function (res) {
                        success = res.data && res.data.idUser;
                    })
                    .catch(function (err) {
                        console.log(err);
                        psi.alert('Error when saving user');
                    })
                    .then(function () {
                        psi.alert(success ? "Save success!" : "Save might be failed.");
                        if(success) {
                            window.location.href = '/user';
                        }
                    });


        },


        loadUser(username) {
            console.log(username);
        axios.get('/api/v1/user/' + username, userEdit.axiosConfig)
            .then(function (res) {
                if (res.data) {
                    userEdit.data = res.data;
                }
            })
            .catch(function (err) {
                psi.alert('Error when loading user');
            })
            .then(function () {
                if (userEdit.data) {
                    console.log(userEdit.data.username);
                    userEdit.controls.username.val(userEdit.data.username);
                    userEdit.controls.name.val(userEdit.data.name);
                    userEdit.controls.position.val(userEdit.data.position);
                    userEdit.controls.department.val(userEdit.data.department);
                    userEdit.controls.email.val(userEdit.data.email);
                    userEdit.controls.mobileNumber.val(userEdit.data.mobileNumber);
                    console.log(userEdit.controls.username);

                    if (userEdit.data.idRoles && userEdit.data.idRoles.length > 0)
                        userEdit.controls.roles.value(userEdit.data.idRoles);
                }
            })
    },

        setup() {
            let self=this;
            userEdit.controls = {};
            userEdit.controls.username = $('#username');
            userEdit.controls.name = $('#name');
            userEdit.controls.position = $('#position');
            userEdit.controls.department = $('#department');
            userEdit.controls.email = $('#email');
            userEdit.controls.mobileNumber = $('#mobileNumber');

            userEdit.controls.roles = $("#roles").kendoMultiSelect({
                autoClose: false,
                optionLabel: " ",
                dataTextField: "name",
                dataValueField: "idRole",
                dataSource: {
                    transport: {
                        read: {
                            dataType: "json",
                            url: "/api/v1/role"
                        }
                    }
                }
            }).data("kendoMultiSelect");

            $('#save-button').on('click', function () {
                userEdit.data = {};
                userEdit.data.username = userEdit.controls.username.val();
                userEdit.data.name = userEdit.controls.name.val();
                userEdit.data.position = userEdit.controls.position.val();
                userEdit.data.department = userEdit.controls.department.val();
                userEdit.data.email = userEdit.controls.email.val();
                userEdit.data.mobileNumber = userEdit.controls.mobileNumber.val();
                userEdit.data.idRoles = userEdit.controls.roles.value();
                if(self.validate(userEdit.data)) {
                    self.save(userEdit.data);
                }
            });

            $('#cancel-button').on('click', function () {
                window.location.href = '/user';
            });

            //userEdit.username = $('#username').val();
        },

        validate(data){
            userEdit.data = data;
            if(!userEdit.data.name.trim()||!userEdit.data.email.trim() || !userEdit.data.mobileNumber.trim()){
                if(!userEdit.data.name.trim() && !userEdit.data.code.trim() && !userEdit.data.mobileNumber.trim())
                    $("#userEdit").trigger('reset');
                else if(!userEdit.data.name.trim()){
                    $("#name").val("");
                } else if(!userEdit.data.email.trim()){
                    $("#email").val("");
                }
                else if(!userEdit.data.mobileNumber.trim()){
                    $("#mobileNumber").val("");
                }
                return false;
            }
            return true;
        },

    },
    mounted(){
        let self = this;
        self.setup();
        var username = $('#data-id').val();
        self.loadUser(username);


    }

});


