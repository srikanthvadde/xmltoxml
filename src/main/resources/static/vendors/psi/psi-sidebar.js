Vue.component('psi-sidebar', {
    template: `        
    `,
    props: {
        currentUser: {type: String}
    },
    data: function() {
        return {
            layout: {
                axiosConfig: {
                    headers: {}
                }
            },
            menus: [],
            isAdministrator: Boolean
        }
    },
    watch: {},
    computed: {
        showHeaderProject() {
            return this.menus.includes('Project List') && this.menus.includes('PMS');
        }
    },
    methods: {},
    beforeCreate() {

    },
    mounted() {
        let self = this; // Important! need to set 'this' to local 'self' variable in order for mounted function to wait the ajax call to finish before proceeding to the next lifecycle
        self.isAdministrator = false;
        if(self.currentUser === 'Administrator') {
            self.isAdministrator = true;
        }

        self.layout = {};
        self.layout.axiosConfig = {};
        self.layout.axiosConfig.headers = {};
        self.layout.axiosConfig.headers[document.querySelector('meta[name="_csrf_header"]').content] = document.querySelector('meta[name="_csrf"]').content;
        axios.get('/api/v1/user/' + self.currentUser, self.layout.axiosConfig)
            .then(function (res) {
                if (res.data.menus) {
                    self.menus = res.data.menus.split(',');
                }
            })
            .catch(function (err) {
                console.error(err);
            })
            .then(function () {
            });
    }
});