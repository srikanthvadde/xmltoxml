Vue.mixin({
    methods: {
        formatDateTime(d) {
            return moment(d).format('MM/DD/YYYY HH:mm').toString()
        },

        formatDate(d) {
            return moment(d).format('MM/DD/YYYY').toString();
        },

        printLocaleCurrency(n)
        {
            var x = parseFloat(n);
            return x.toLocaleString();
        },
    }
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function htmlEncode(v) {
    var encoded = v.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    return encoded;
}

function htmlDecode(v) {
    var decoded = v.replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '\"')
        .replace(/&apos;/g, '\'');
    return decoded;
}