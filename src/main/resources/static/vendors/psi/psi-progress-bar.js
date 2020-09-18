Vue.component('psi-progress-bar', {
    template: `<div style="width:65%;"><div class="progress"  style="width:100%;height:35px;">
                    <div style="font-size: 18px;" class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" v-bind:style="{width: width + '%'}" v-html="width + '%'"></div>
                </div>
                <div style="font-size: 18px;text-align: center;padding-top: 15px;">Loading..Please wait..</div></div>
`,
    props: {
        width: {
            type: Number,
            default: 0
        }
    },
    data: function(){
        return{

        }
    },
    watch: {},

    methods: {
        handleProgressBarUpdateWithDetails(msg) {
            this.width = parseFloat(msg.body);
        },


        subscribe(frame){
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/ws-broadcast/update-progress', this.handleProgressBarUpdateWithDetails);

        },
        connect(){
            var socket = new SockJS('/progress-ws', {transports: ['websocket']});
            this.stompClient = Stomp.over(socket);
            this.stompClient.reconnect_delay = 5000;
            this.stompClient.connect({}, this.subscribe);
        },

    },
    mounted(){
        this.connect();
        this.$nextTick(() => {
            // Add the component back in
            this.width = 0;
        });
    }

});
