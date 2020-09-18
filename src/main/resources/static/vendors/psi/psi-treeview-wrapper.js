Vue.component('psi-treeview-wrapper', {
    template: `<div :id="id"></div>`,
    props: {
        id: {type: String},
        nodes: {type: Array},
        plugins: {type: Array},
        types: {},
    },
    data() {
        return {
            selectedItem: []
        }
    },
    computed: {},
    methods: {
        onJsTreeChangedHandler(e, data) {
            this.selectedItem = []; //RESET THE SELECTED ITEM

            var i, j;
            for (i = 0, j = data.selected.length; i < j; i++) {
                this.selectedItem.push(data.instance.get_node(data.selected[i])); //PUSH SELECTED ITEMS INSIDE AN ARRAY
            }
            this.$emit('item-selected', this.selectedItem); //EMIT AN EVENT
        },
        customMenu(node) {
            var items = {
                'item1': {
                    'label': 'Add Equipment',
                    'action': function () {
                    }
                },
                'item2': {
                    'label': 'Delete Equipment',
                    'action': function () {
                    }
                }
            }

            if (node.type === 'voltage-level') {
                delete items.item2;
            } else if (node.type === 'busbar') {
                delete items.item1;
            }

            return items;
        },
    },
    watch:
        {
            nodes: {
                handler: function (val, oldVal) {
                    this.$nextTick(function () {
                        $(this.$el).jstree().settings.core.data = this.nodes;
                        //$(this.$el).jstree(true).redraw();
                        $(this.$el).jstree().refresh();
                    });
                },
                deep: true
            }
        },
    created() {
    },
    mounted() {
        $(this.$el).jstree({
            core: {
                data: this.nodes
            },
            contextmenu: {
                'items': this.customMenu
            },
            plugins: this.plugins,
            types: this.types,
        }).on({
                'changed.jstree': this.onJsTreeChangedHandler,
                'loaded.jstree': function () {
                    $(this.$el).jstree('open_all', -1)
                },
            }
        );

        /*sharedEvents.$on('add-root-menu', this.onAddRootMenu);
        sharedEvents.$on('add-sub-menu', this.onAddSubMenu);
        sharedEvents.$on('delete-menu', this.onDeleteMenu);*/
    }
})