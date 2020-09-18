let psi = {};
psi.alert = function(msg, title) {
    $("<div id='psi-alert'></div>").kendoDialog({
        width: "450px",
        title: title == null ? "PSI Phoenix" : title,
        closable: false,
        modal: false,
        content: "<p><i class='icon-exclamation'></i> " + msg + "<p>",
        actions: [
            { text: 'OK', primary: true /*, action: onOk */ }
        ],
        //close: psi.onAlertClose()
    }).data("kendoDialog").open().center();
};

psi.confirm = function(msg, onOk, onCancel) {
    $("<div id='psi-confirm'></div>").kendoDialog({
        width: "450px",
        title: "Confirmation",
        closable: false,
        modal: false,
        content: "<p><i class='icon-question'></i> " + msg + "<p>",
        actions: [
            { text: 'OK', action: onOk, primary: true },
            { text: "Cancel", action: onCancel }
        ]
    }).data("kendoDialog").open().center();
};

psi.enableGridResizer = function (grid) {
    psi.grid = grid;

    let minGridWidth = 150;
    let minGridHeight = 100;

    psi.changeGridPageSize(psi.grid);

    let wrappers = $(".grid-wrap");
    wrappers.each(function (idx, element) {
        let wrapper = $(element);
        // add resize handle
        let resizeHandle = $("<span class='k-icon k-resize-se' />").appendTo(wrapper);

        resizeHandle.kendoDraggable({
            dragstart: function (e) {
                // overlay iframe to prevent event gap
                wrapper.append("<div class='k-overlay' />");
                // cache some offsets for later use
                this.top = wrapper.offset().top - this.element.height();
                this.left = wrapper.offset().left - this.element.width();
                let win = $(window);
                this.scrollTop = win.scrollTop();
                this.scrollLeft = win.scrollLeft();
            },
            drag: function (e) {
                // update Grid height
                let gridElement = wrapper.children(".k-grid");
                gridElement.height(Math.max(minGridHeight, (e.clientY || e.originalEvent.clientY) - this.top + this.scrollTop));
                wrapper.width(Math.max(minGridWidth, (e.clientX || e.originalEvent.clientX) - this.left + this.scrollLeft));
                gridElement.data("kendoGrid").resize();
            },
            dragend: function (e) {
                // remove overlay
                wrapper.children(".k-overlay").remove();
                psi.changeGridPageSize(wrapper.children(".k-grid").data("kendoGrid"));
            }
        });
    });
};

psi.averageRowHeight = function (table) {
    let rowCount = table.find("tr").length;
    if (rowCount > 0) {
        return table.height() / table.find("tr").length;
    } else {
        let columnCount = table.find("col").length;
        table.children("tbody").append("<tr><td colspan='" + columnCount + "'>&nbsp;</td></tr>");
        return table.height();
    }
};

psi.changeGridPageSize = function (grid) {
    grid.dataSource.pageSize(Math.floor(grid.wrapper.children(".k-grid-content").height() / psi.averageRowHeight(grid.tbody.parent())));
};

psi.getUrlParameter = function(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};