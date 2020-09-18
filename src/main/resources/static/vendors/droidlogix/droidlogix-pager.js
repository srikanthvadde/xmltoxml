Vue.component('droidlogix-pager', {
    template: `<ul :id="id" class="mx-auto pagination">
                        <li class="page-item" :class="showPreviousButton"><a class="page-link" :href="previousPageUrl">Previous</a></li>
                        <li v-for="item in pageSet" class="page-item" :class="isActive(item)"><a class="page-link" :href="getPageUrl(item.display)" v-html="item.display"></a></li>                        
                        <li class="page-item" :class="showMaxButton"><a class="page-link" :href="nextPageUrl">Next</a></li>
                    </ul>`,
    props: {
        id: {type: String},
        page: {type: Number, default: 1},
        url: {type: String},
        queryString: {type: String, default: ''},
        maxPage: {type: Number, default: 10},
    },
    data() {
        return {
            min: 1,
            max: this.maxPage,
            pageSet: []
        }
    },
    watch:
        {
        },
    computed: {
        showPreviousButton()
        {
            if(this.page === 0 || this.page === 1)
            {
                return 'disabled';
            }
            return '';
        },
        showNextButton()
        {
            if(this.page === this.maxPage)
            {
                return 'disabled';
            }
            return '';
        },
        previousPageUrl()
        {
            if(this.queryString !== null && this.queryString.length > 0) {
                return this.url + this.queryString + "&p=" + (this.page - 1);
            }
            else {
                return this.url + "?p=" + (this.page - 1);
            }
        },
        nextPageUrl()
        {
            if(this.queryString !== null && this.queryString.length > 0) {
                return this.url + this.queryString + "&p=" + (this.page + 1);
            }
            else {
                return this.url + "?p=" + (this.page + 1);
            }
        },
    },
    methods: {
        getPageUrl(p)
        {
            if(this.queryString !== null && this.queryString.length > 0) {
                return this.url + this.queryString + "&p=" + p;
            }
            else {
                return this.url + "?p=" + p;
            }
        },
        getFlooring()
        {
            if((this.page - 5) <= 1)
            {
                this.min = 1;
            }
            else
            {
                this.min = this.page - 5;
            }
            return this.min;
        },
        getCeiling()
        {
            if((this.page + 4) >= this.maxPage)
            {
                this.max = this.maxPage;
            }
            else if((this.page + 4) <= this.maxPage)
            {
                this.max = this.page + 4;
            }
            return this.max;
        },
        isActive(o)
        {
            if(this.page === o.display)
            {
                return 'active';
            }
            return '';
        }
    },
    created() {
    },
    mounted() {
        this.pageSet = [];
        for(var i = this.getFlooring(); i <= this.getCeiling(); ++i)
        this.pageSet.push({
            display: i,
            url: this.url + "?p=" + i
        });
    }
})