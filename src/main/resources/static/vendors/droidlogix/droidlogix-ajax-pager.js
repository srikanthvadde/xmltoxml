Vue.component('droidlogix-ajax-pager', {
    template: `<ul :id="id" class="mx-auto pagination">
                        <li class="page-item disable-user-select" :class="showPreviousButton"><button class="page-link" @click="previousPage">Previous</button></li>
                        <li v-for="item in pageSet" class="page-item disable-user-select" :class="isActive(item)"><button class="page-link" @click="handleChange(item.display)" v-html="item.display"></button></li>
                        <li class="page-item disable-user-select" :class="showNextButton"><button class="page-link" @click="nextPage">Next</button></li>
                    </ul>`,
    props: {
        id: {type: String},
        page: {type: Number, default: 1},
        pageSize: {type: Number, default: 100},
        total: {type: Number, default: 1},
    },
    data() {
        return {
            min: 1,
            max: 1,
            currentPage: this.page,
            pageSet: []
        }
    },
    watch:
        {
            total: function(oldVal, newVal){
                this.setupMax();
                this.setupPageSet();
            }
        },
    computed: {
        showPreviousButton() {
            if (this.currentPage === 0 || this.currentPage === 1) {
                return 'disabled';
            }
            return '';
        },
        showNextButton() {
            if (this.currentPage >= this.max) {
                return 'disabled';
            }
            return '';
        },
    },
    methods: {
        setupMax()
        {
            if(this.total <= this.pageSize) // If total is less than page size then only single page
            {
                this.max = 1;
            }
            else
            {
                let tmp = Math.floor(this.total / this.pageSize); // Divide the total count into page size. Use Math.floor to extract only whole number
                if((this.total % this.pageSize) !== 0) // Check if any remainder. If any we need to add one more page
                {
                    tmp = tmp + 1;
                }
                this.max = tmp;
            }
        },
        getFlooring() {
            if((this.currentPage - 4) <= this.min)
            {
                return 1;
            }
            else
            {
                return this.currentPage - 4;
            }
        },
        getCeiling() {
            if((this.currentPage + 6) >= this.max)
            {
                return this.max;
            }
            else
            {
                return this.currentPage + 6;
            }
        },
        isActive(o) {
            if (this.currentPage === o.display) {
                return 'active';
            }
            return '';
        },
        previousPage()
        {
            if(this.currentPage !== this.min)
            {
                this.currentPage = this.currentPage - 1;
            }
            this.setupPageSet();
            this.$emit('change', this.currentPage);
        },
        nextPage()
        {
            if(this.currentPage !== this.max)
            {
                this.currentPage = this.currentPage + 1;
            }
            this.setupPageSet();
            this.$emit('change', this.currentPage);
        },
        handleChange(p)
        {
            this.currentPage = p;
            this.setupPageSet();
            this.$emit('change', this.currentPage);
        },
        setupPageSet()
        {
            this.pageSet = [];
            let f = this.getFlooring();
            let c = f + 9;

            if(c >= this.max)
            {
                c = this.max;
            }

            let b = 0;
            for(var i = f; i <= c; i++, b++)
            {
                if(b === 10)
                {
                    c = i;
                    break;
                }
            }

            if(b < 10)
            {
                b = 0;
                for(var i = c; i > this.min; i--, b++)
                {
                    if(b === 9)
                    {
                        f = i;
                        break;
                    }
                }
            }

            for(var i = f; i <= c; i++, b++)
            {
                this.pageSet.push({display: i});
            }
        }
    },
    created() {
    },
    mounted() {
        this.setupMax();
        this.setupPageSet();
    }
})