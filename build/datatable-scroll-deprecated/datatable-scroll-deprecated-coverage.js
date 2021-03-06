/*
Copyright (c) 2010, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 3.7.2
build: 3.7.2
*/
if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js",
    code: []
};
_yuitest_coverage["/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js"].code=["YUI.add('datatable-scroll-deprecated', function(Y) {","","// API Doc comments disabled to avoid deprecated class leakage into","// non-deprecated class API docs.  See the 3.4.1 datatable API doc files in the","// download at http://yui.zenfs.com/releases/yui3/yui_3.4.1.zip for reference.","/**","Extends DataTable base to enable x,y, and xy scrolling.","","DEPRECATED. As of YUI 3.5.0, DataTable has been rebuilt.  This module","is designed to work with `datatable-base-deprecated` (effectively the 3.4.1","version of DataTable) and will be removed from the library in a future version.","","See http://yuilibrary.com/yui/docs/migration.html for help upgrading to the","latest version.","","For complete API docs for the classes in this and other deprecated","DataTable-related modules, refer to the static API doc files in the 3.4.1","download at http://yui.zenfs.com/releases/yui3/yui_3.4.1.zip","","@module datatable-deprecated","@submodule datatable-scroll-deprecated","@deprecated","**/","","","var YNode = Y.Node,","    YLang = Y.Lang,","    YUA = Y.UA,","    YgetClassName = Y.ClassNameManager.getClassName,","    DATATABLE = \"datatable\",","    CLASS_HEADER = YgetClassName(DATATABLE, \"hd\"),","    CLASS_BODY = YgetClassName(DATATABLE, \"bd\"),","    CLASS_DATA = YgetClassName(DATATABLE, \"data\"),","    CLASS_LINER = YgetClassName(DATATABLE, \"liner\"),","    CLASS_SCROLLABLE = YgetClassName(DATATABLE, \"scrollable\"),","    CONTAINER_HEADER = '<div class=\"'+CLASS_HEADER+'\"></div>',","    CONTAINER_BODY = '<div class=\"'+CLASS_BODY+'\"></div>',","    TEMPLATE_TABLE = '<table></table>',","    scrollbarWidth = Y.cached(function () {","        var testNode = Y.one('body').appendChild('<div style=\"position:absolute;visibility:hidden;overflow:scroll;width:20px;\"><p style=\"height:1px\"/></div>'),","            width = testNode.get('offsetWidth') - testNode.get('clientWidth');","","        testNode.remove(true);","","        return width;","    });","    ","/*"," * Adds scrolling to DataTable."," * @class DataTableScroll"," * @extends Plugin.Base"," */","function DataTableScroll() {","    DataTableScroll.superclass.constructor.apply(this, arguments);","}","","Y.mix(DataTableScroll, {","    NS: \"scroll\",","","    NAME: \"dataTableScroll\",","","    ATTRS: {","    ","        /*","        *  The width for the table. Set to a string (ex: \"200px\", \"20em\") if you want the table to scroll in the x direction.","        *","        * @attribute width","        * @public","        * @type string","        */","        width: {","            value: undefined,","            writeOnce: \"initOnly\"","        },","        ","        /*","        *  The height for the table. Set to a string (ex: \"200px\", \"20em\") if you want the table to scroll in the y-direction.","        *","        * @attribute height","        * @public","        * @type string","        */","        height: {","            value: undefined,","            writeOnce: \"initOnly\"","        },","        ","        ","        /*","        *  The scrolling direction for the table.","        *","        * @attribute scroll","        * @private","        * @type string","        */","        _scroll: {","            //value: 'y',","            valueFn: function() {","                var w = this.get('width'),","                h = this.get('height');","                ","                if (w && h) {","                    return 'xy';","                }","                else if (w) {","                    return 'x';","                }","                else if (h) {","                    return 'y';","                }","                else {","                    return null;","                }","            }","        },","        ","        ","        /*","        *  The hexadecimal colour value to set on the top-right of the table if a scrollbar exists. ","        *","        * @attribute COLOR_COLUMNFILLER","        * @public","        * @type string","        */","        COLOR_COLUMNFILLER: {","            value: '#f2f2f2',","            validator: YLang.isString,","            setter: function(param) {","                if (this._headerContainerNode) {","                    this._headerContainerNode.setStyle('backgroundColor', param);","                }","            }","        }","    }","});","","Y.extend(DataTableScroll, Y.Plugin.Base, {","    ","    /*","    *  The table node created in datatable-base","    *","    * @property _parentTableNode","    * @private","    * @type {Node}","    */","    _parentTableNode: null,","    ","    ","    /*","    *  The THEAD node which resides within the table node created in datatable-base","    *","    * @property _parentTheadNode","    * @private","    * @type {Node}","    */","    _parentTheadNode: null,","    ","    ","    /*","    *  The TBODY node which resides within the table node created in datatable-base","    *","    * @property _parentTbodyNode","    * @private","    * @type {Node}","    */","    _parentTbodyNode: null,","    ","    ","    /*","    *  The TBODY Message node which resides within the table node created in datatable-base","    *","    * @property _parentMsgNode","    * @private","    * @type {Node}","    */","    _parentMsgNode: null,","    ","    ","    /*","    *  The contentBox specified for the datatable in datatable-base","    *","    * @property _parentContainer","    * @private","    * @type {Node}","    */","    _parentContainer: null,","    ","    ","    /*","    *  The DIV node that contains all the scrollable elements (a table with a tbody on it)","    *","    * @property _bodyContainerNode","    * @private","    * @type {Node}","    */","    _bodyContainerNode: null,","    ","    ","    /*","    *  The DIV node that contains a table with a THEAD in it (which syncs its horizontal scroll with the _bodyContainerNode above)","    *","    * @property _headerContainerNode","    * @private","    * @type {Node}","    */","    _headerContainerNode: null,","    ","    ","    //--------------------------------------","    //  Methods","    //--------------------------------------","","","    ","    initializer: function(config) {","        var dt = this.get(\"host\");","        this._parentContainer = dt.get('contentBox');","        this._parentContainer.addClass(CLASS_SCROLLABLE);","        this._setUpNodes();","    },","    ","    /////////////////////////////////////////////////////////////////////////////","    //","    // Set up Table Nodes","    //","    /////////////////////////////////////////////////////////////////////////////","    ","    /*","    *  Set up methods to fire after host methods execute","    *","    * @method _setUpNodes","    * @private","    */          ","    _setUpNodes: function() {","        ","        this.afterHostMethod(\"_addTableNode\", this._setUpParentTableNode);","        this.afterHostMethod(\"_addTheadNode\", this._setUpParentTheadNode); ","        this.afterHostMethod(\"_addTbodyNode\", this._setUpParentTbodyNode);","        this.afterHostMethod(\"_addMessageNode\", this._setUpParentMessageNode);","        //this.beforeHostMethod('renderUI', this._removeCaptionNode);","        this.afterHostMethod(\"renderUI\", this.renderUI);","        this.afterHostMethod(\"bindUI\", this.bindUI);","        this.afterHostMethod(\"syncUI\", this.syncUI);","        ","        if (this.get('_scroll') !== 'x') {","            this.afterHostMethod('_attachTheadThNode', this._attachTheadThNode);","            this.afterHostMethod('_attachTbodyTdNode', this._attachTbodyTdNode);","        }","        ","    },","        ","    /*","    *  Stores the main &lt;table&gt; node provided by the host as a private property","    *","    * @method _setUpParentTableNode","    * @private","    */","    _setUpParentTableNode: function() {","        this._parentTableNode = this.get('host')._tableNode;","    },","    ","    ","    /*","    *  Stores the main &lt;thead&gt; node provided by the host as a private property","    *","    * @method _setUpParentTheadNode","    * @private","    */","    _setUpParentTheadNode: function() {","        this._parentTheadNode = this.get('host')._theadNode;","    },","    ","    /*","    *  Stores the main &lt;tbody&gt; node provided by the host as a private property","    *","    * @method _setUpParentTbodyNode","    * @private","    */","    _setUpParentTbodyNode: function() {","        this._parentTbodyNode = this.get('host')._tbodyNode;","    },","    ","    ","    /*","    *  Stores the main &lt;tbody&gt; message node provided by the host as a private property","    *","    * @method _setUpParentMessageNode","    * @private","    */","    _setUpParentMessageNode: function() {","        this._parentMsgNode = this.get('host')._msgNode;","    },","    ","    /////////////////////////////////////////////////////////////////////////////","    //","    // Renderer","    //","    /////////////////////////////////////////////////////////////////////////////","    ","    /*","    *  Primary rendering method that takes the datatable rendered in","    * the host, and splits it up into two separate &lt;divs&gt; each containing two ","    * separate tables (one containing the head and one containing the body). ","    * This method fires after renderUI is called on datatable-base.","    * ","    * @method renderUI","    */","    renderUI: function() {","        //Y.Profiler.start('render');","        this._createBodyContainer();","        this._createHeaderContainer();","        this._setContentBoxDimensions();","        //Y.Profiler.stop('render');","        //console.log(Y.Profiler.getReport(\"render\"));","    },","    ","    /*","    Binds event subscriptions to keep the state and UI in sync","","    @method bindUI","    **/","    bindUI: function () {","        // FIXME: I don't know why the string bind, but I don't want to break","        // stuff until I have time to rebuild it properly","        this._bodyContainerNode.on('scroll', Y.bind(\"_onScroll\", this));","","        this.afterHostEvent(\"recordsetChange\", this.syncUI);","        this.afterHostEvent(\"recordset:recordsChange\", this.syncUI);","    },","","    /*","    *  Post rendering method that is responsible for creating a column","    * filler, and performing width and scroll synchronization between the &lt;th&gt; ","    * elements and the &lt;td&gt; elements.","    * This method fires after syncUI is called on datatable-base","    * ","    * @method syncUI","    * @public","    */","    syncUI: function() {","        //Y.Profiler.start('sync');","        this._removeCaptionNode();","        this._syncWidths();","        this._syncScroll();","        //Y.Profiler.stop('sync');","        //console.log(Y.Profiler.getReport(\"sync\"));","        ","    },","    ","    /*","    *  Remove the caption created in base. Scrolling datatables dont support captions.","    * ","    * @method _removeCaptionNode","    * @private","    */","    _removeCaptionNode: function() {","        this.get('host')._captionNode.remove();","        //Y.DataTable.Base.prototype.createCaption = function(v) {/*do nothing*/};","        //Y.DataTable.Base.prototype._uiSetCaption = function(v) {/*do nothing*/};","    },","","    /*","    *  Adjusts the width of the TH and the TDs to make sure that the two are in sync","    * ","    * Implementation Details: ","    *   Compares the width of the TH liner div to the the width of the TD node.","    *   The TD liner width is not actually used because the TD often stretches","    *   past the liner if the parent DIV is very large. Measuring the TD width","    *   is more accurate.","    *   ","    *   Instead of measuring via .get('width'), 'clientWidth' is used, as it","    *   returns a number, whereas 'width' returns a string, In IE6,","    *   'clientWidth' is not supported, so 'offsetWidth' is used. 'offsetWidth'","    *   is not as accurate on Chrome,FF as 'clientWidth' - thus the need for","    *   the fork.","    * ","    * @method _syncWidths","    * @private","    */","    _syncWidths: function() {","        var headerTable = this._parentContainer.one('.' + CLASS_HEADER),","            bodyTable   = this._parentContainer.one('.' + CLASS_BODY),","            // nodelist of all the THs","            headers     = headerTable.all('thead .' + CLASS_LINER),","            // nodelist of the TDs in the first row","            firstRow    = bodyTable.one('.' + CLASS_DATA + ' tr'),","            cells       = firstRow && firstRow.all('.' + CLASS_LINER),","            // FIXME: Code smell","            widthProperty = (YUA.ie) ? 'offsetWidth' : 'clientWidth';","","            //stylesheet = new YStyleSheet('columnsSheet'),","            //className;","            ","        // If there are data rows, iterate each header and the cells of the","        // first row comparing cell widths.  Assign the larger width to the","        // narrower node (header or cell).","        if (cells && cells.size()) {","            headers.each(function (header, i) {","                var cell        = cells.item(i),","                    headerWidth = header.get(widthProperty),","                    cellWidth   = cell.get(widthProperty),","                    width       = Math.max(headerWidth, cellWidth);","","                width -= (parseInt(header.getComputedStyle('paddingLeft'),10)|0) +","                         (parseInt(header.getComputedStyle('paddingRight'),10)|0);","                ","                header.setStyle('width', width + 'px');","                cell.setStyle('width', width + 'px');","            });","        }","            /*","            // If browser is not IE - get the clientWidth of the Liner","            // div and the TD.","            // Note:  We are not getting the width of the TDLiner, we","            // are getting the width of the actual cell.  Why? Because","            // when the table is set to auto width, the cell will grow","            // to try to fit the table in its container.  The liner","            // could potentially be much smaller than the cell width.","            // TODO: Explore if there is a better way using only LINERS","            // widths - I don't think this should be a problem, given","            // that the liner is a div, a block element and will","            // expand to width.","            if (!ie) {","                // TODO: this should actually be done with","                // getComputedStyle('width') but this messes up","                // columns. Explore this option.","                thWidth = thLiner.get('clientWidth');","                tdWidth = td.item(i).get('clientWidth');","            } else {","                // IE wasn't recognizing clientWidths, so we are using","                // offsetWidths.","                // TODO: should use getComputedStyle('width') because","                // offsetWidth will screw up when padding is changed.","                // TODO: for some reason, using","                // tdLiner.get('clientWidth') doesn't work - why not?","                thWidth = thLiner.get('offsetWidth');","                tdWidth = td.item(i).get('offsetWidth');","                //thWidth = parseFloat(thLiner.getComputedStyle('width').split('px')[0]);","                //tdWidth = parseFloat(td.item(i).getComputedStyle('width').split('px')[0]);","            }","                                ","            // expand the TH or the TD to match the wider","            if (thWidth > tdWidth) {","                tdLiner.setStyle('width', (thWidth - 20 + 'px'));","                //thLiner.setStyle('width', (tdWidth - 20 + 'px'));","                //stylesheet.set(className,{'width': (thWidth - 20 + 'px')});","            } else if (tdWidth > thWidth) {","                // if you don't set an explicit width here, when the width","                // is set in line 368, it will auto-shrink the widths of","                // the other cells (because they dont have an explicit","                // width)","                thLiner.setStyle('width', (tdWidth - 20 + 'px'));","                tdLiner.setStyle('width', (tdWidth - 20 + 'px'));","                //stylesheet.set(className,{'width': (tdWidth - 20 + 'px')});","            }","                ","            //}","","        }","        */","        ","        //stylesheet.enable();","","    },","    ","    /*","    *  Adds the approriate width to the liner divs of the TH nodes before they are appended to DOM","    *","    * @method _attachTheadThNode","    * @private","    */","    _attachTheadThNode: function(o) {","        var width = o.column.get('width');","        ","        if (width) {","            o.th.one('.' + CLASS_LINER)","                .setStyles({","                    width: width,","                    overflow:'hidden'","                });","        }","    },","    ","    /*","    *  Adds the appropriate width to the liner divs of the TD nodes before they are appended to DOM","    *","    * @method _attachTbodyTdNode","    * @private","    */","    _attachTbodyTdNode: function(o) {","        var width = o.column.get('width');","        ","        if (width) {","            o.td.one('.' + CLASS_LINER)","                .setStyles({","                    width: width,","                    overflow: 'hidden'","                });","        }","    },","    ","    /*","    *  Creates the body DIV that contains all the data. ","    *","    * @method _createBodyContainer","    * @private","    */","    _createBodyContainer: function() {","        var bd = YNode.create(CONTAINER_BODY);","            ","        this._bodyContainerNode = bd;       ","        this._setStylesForTbody();","        ","        bd.appendChild(this._parentTableNode);","        this._parentContainer.appendChild(bd);","    },","    ","    /*","    *  Creates the DIV that contains a &lt;table&gt; with all the headers. ","    *","    * @method _createHeaderContainer","    * @private","    */","    _createHeaderContainer: function() {","        var hd = YNode.create(CONTAINER_HEADER),","            tbl = YNode.create(TEMPLATE_TABLE);","            ","        this._headerContainerNode = hd;","        ","        //hd.setStyle('backgroundColor',this.get(\"COLOR_COLUMNFILLER\"));","        this._setStylesForThead();","        tbl.appendChild(this._parentTheadNode);","        hd.appendChild(tbl);","        this._parentContainer.prepend(hd);","        ","    },","    ","    /*","    *  Creates styles for the TBODY based on what type of table it is.","    *","    * @method _setStylesForTbody","    * @private","    */","    _setStylesForTbody: function() {","        var dir = this.get('_scroll'),","            w = this.get('width') || \"\",","            h = this.get('height') || \"\",","            el = this._bodyContainerNode,","            styles = {width:\"\", height:h};","                ","        if (dir === 'x') {","            //X-Scrolling tables should not have a Y-Scrollbar so overflow-y is hidden. THe width on x-scrolling tables must be set by user.","            styles.overflowY = 'hidden';","            styles.width = w;","        } else if (dir === 'y') {","            //Y-Scrolling tables should not have a X-Scrollbar so overflow-x is hidden. The width isn't neccessary because it can be auto.","            styles.overflowX = 'hidden';","        } else if (dir === 'xy') {","            styles.width = w;","        } else {","            //scrolling is set to 'null' - ie: width and height are not set. Don't have any type of scrolling.","            styles.overflowX = 'hidden';","            styles.overflowY = 'hidden';","            styles.width = w;","        }","        ","        el.setStyles(styles);","        return el;","    },","    ","    ","    /*","    *  Creates styles for the THEAD based on what type of datatable it is.","    *","    * @method _setStylesForThead","    * @private","    */","    _setStylesForThead: function() {","        var w = this.get('width') || \"\",","            el = this._headerContainerNode;","        ","        //if (dir !== 'y') {","        el.setStyles({'width': w, 'overflow': 'hidden'});","        // }","    },","    ","    /*","    *  Sets an auto width on the content box if it doesn't exist or if its a y-datatable.","    *","    * @method _setContentBoxDimensions","    * @private","    */","    _setContentBoxDimensions: function() {","        ","        if (this.get('_scroll') === 'y' || (!this.get('width'))) {","            this._parentContainer.setStyle('width', 'auto');","        }","        ","    },","    ","    /////////////////////////////////////////////////////////////////////////////","    //","    // Scroll Syncing","    //","    /////////////////////////////////////////////////////////////////////////////","    ","    /*","    *  Ensures that scrolling is synced across the two tables","    *","    * @method _onScroll","    * @private","    */","    _onScroll: function() {","        this._headerContainerNode.set('scrollLeft', this._bodyContainerNode.get('scrollLeft'));","    },","    ","    /*","     *  Syncs padding around scrollable tables, including Column header right-padding","     * and container width and height.","     *","     * @method _syncScroll","     * @private ","     */","    _syncScroll : function() {","        this._syncScrollX();","        this._syncScrollY();","        this._syncScrollOverhang();","        if (YUA.opera) {","            // Bug 1925874","            this._headerContainerNode.set('scrollLeft', this._bodyContainerNode.get('scrollLeft'));","            ","            if(!this.get(\"width\")) {","                // Bug 1926125","                document.body.style += '';","            }","        }","    },","    ","    /*","    *  Snaps container width for y-scrolling tables.","    *","    * @method _syncScrollY","    * @private","    */","    _syncScrollY : function() {","        var tBody = this._parentTbodyNode,","            tBodyContainer = this._bodyContainerNode,","            w;","            // X-scrolling not enabled","            if(!this.get(\"width\")) {","                // Snap outer container width to content","                w = (tBodyContainer.get('scrollHeight') > tBodyContainer.get('clientHeight')) ?","                // but account for y-scrollbar since it is visible","                    (tBody.get('parentNode').get('clientWidth') + scrollbarWidth()) + \"px\" :","                    // no y-scrollbar, just borders","                    (tBody.get('parentNode').get('clientWidth') + 2) + \"px\";","                this._parentContainer.setStyle('width', w);","        }","    },","        ","    /*","     *  Snaps container height for x-scrolling tables in IE. Syncs message TBODY width. ","     * Taken from YUI2 ScrollingDataTable.js","     *","     * @method _syncScrollX","     * @private","     */","    _syncScrollX: function() {","        var tBody = this._parentTbodyNode,","            tBodyContainer = this._bodyContainerNode,","            w;","","        this._headerContainerNode.set('scrollLeft',","            this._bodyContainerNode.get('scrollLeft'));","        ","        if (!this.get('height') && (YUA.ie)) {","            w = (tBodyContainer.get('scrollWidth') > tBodyContainer.get('offsetWidth')) ?","                (tBody.get('parentNode').get('offsetHeight') + scrollbarWidth()) + \"px\" : ","                tBody.get('parentNode').get('offsetHeight') + \"px\";","            ","            tBodyContainer.setStyle('height', w);","        }","            ","        if (tBody.get('rows').size()) {","            this._parentMsgNode.get('parentNode').setStyle('width', \"\");","        } else {","            this._parentMsgNode.get('parentNode').setStyle('width', this._parentTheadNode.get('parentNode').get('offsetWidth')+'px');","        }","            ","    },","    ","    /*","     *  Adds/removes Column header overhang as necesary.","     * Taken from YUI2 ScrollingDataTable.js","     *","     * @method _syncScrollOverhang","     * @private","     */","    _syncScrollOverhang: function() {","        var tBodyContainer = this._bodyContainerNode,","            padding = 1;","        ","        //when its both x and y scrolling","        if ((tBodyContainer.get('scrollHeight') > tBodyContainer.get('clientHeight')) || (tBodyContainer.get('scrollWidth') > tBodyContainer.get('clientWidth'))) {","            padding = 18;","        }","        ","        this._setOverhangValue(padding);","        ","        // After the widths have synced, there is a wrapping issue in the","        // headerContainer in IE6. The header does not span the full length of","        // the table (does not cover all of the y-scrollbar). By adding this","        // line in when there is a y-scroll, the header will span correctly.","        // TODO: this should not really occur on this.get('_scroll') === y - it","        // should occur when scrollHeight > clientHeight, but clientHeight is","        // not getting recognized in IE6?","        if (YUA.ie !== 0 && this.get('_scroll') === 'y' && this._bodyContainerNode.get('scrollHeight') > this._bodyContainerNode.get('offsetHeight'))","        {","            this._headerContainerNode.setStyle('width', this._parentContainer.get('width'));","        }","    },","    ","    ","    /*","     *  Sets Column header overhang to given width.","     * Taken from YUI2 ScrollingDataTable.js with minor modifications","     *","     * @method _setOverhangValue","     * @param nBorderWidth {Number} Value of new border for overhang. ","     * @private","     */ ","    _setOverhangValue: function(borderWidth) {","        var host = this.get('host'),","            cols = host.get('columnset').get('definitions'),","            //lastHeaders = cols[cols.length-1] || [],","            len = cols.length,","            value = borderWidth + \"px solid \" + this.get(\"COLOR_COLUMNFILLER\"),","            children = YNode.all('#'+this._parentContainer.get('id')+ ' .' + CLASS_HEADER + ' table thead th');","","        children.item(len-1).setStyle('borderRight', value);","    }","    ","});","","Y.namespace(\"Plugin\").DataTableScroll = DataTableScroll;","","","}, '3.7.2' ,{requires:['datatable-base-deprecated','plugin']});"];
_yuitest_coverage["/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js"].lines = {"1":0,"26":0,"40":0,"43":0,"45":0,"53":0,"54":0,"57":0,"99":0,"102":0,"103":0,"105":0,"106":0,"108":0,"109":0,"112":0,"129":0,"130":0,"137":0,"216":0,"217":0,"218":0,"219":0,"236":0,"237":0,"238":0,"239":0,"241":0,"242":0,"243":0,"245":0,"246":0,"247":0,"259":0,"270":0,"280":0,"291":0,"310":0,"311":0,"312":0,"325":0,"327":0,"328":0,"342":0,"343":0,"344":0,"357":0,"381":0,"397":0,"398":0,"399":0,"404":0,"407":0,"408":0,"473":0,"475":0,"476":0,"491":0,"493":0,"494":0,"509":0,"511":0,"512":0,"514":0,"515":0,"525":0,"528":0,"531":0,"532":0,"533":0,"534":0,"545":0,"551":0,"553":0,"554":0,"555":0,"557":0,"558":0,"559":0,"562":0,"563":0,"564":0,"567":0,"568":0,"579":0,"583":0,"595":0,"596":0,"614":0,"625":0,"626":0,"627":0,"628":0,"630":0,"632":0,"634":0,"646":0,"650":0,"652":0,"657":0,"669":0,"673":0,"676":0,"677":0,"681":0,"684":0,"685":0,"687":0,"700":0,"704":0,"705":0,"708":0,"717":0,"719":0,"733":0,"740":0,"745":0};
_yuitest_coverage["/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js"].functions = {"(anonymous 2):39":0,"DataTableScroll:53":0,"valueFn:98":0,"setter:128":0,"initializer:215":0,"_setUpNodes:234":0,"_setUpParentTableNode:258":0,"_setUpParentTheadNode:269":0,"_setUpParentTbodyNode:279":0,"_setUpParentMessageNode:290":0,"renderUI:308":0,"bindUI:322":0,"syncUI:340":0,"_removeCaptionNode:356":0,"(anonymous 3):398":0,"_syncWidths:380":0,"_attachTheadThNode:472":0,"_attachTbodyTdNode:490":0,"_createBodyContainer:508":0,"_createHeaderContainer:524":0,"_setStylesForTbody:544":0,"_setStylesForThead:578":0,"_setContentBoxDimensions:593":0,"_onScroll:613":0,"_syncScroll:624":0,"_syncScrollY:645":0,"_syncScrollX:668":0,"_syncScrollOverhang:699":0,"_setOverhangValue:732":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js"].coveredLines = 117;
_yuitest_coverage["/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js"].coveredFunctions = 30;
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 1);
YUI.add('datatable-scroll-deprecated', function(Y) {

// API Doc comments disabled to avoid deprecated class leakage into
// non-deprecated class API docs.  See the 3.4.1 datatable API doc files in the
// download at http://yui.zenfs.com/releases/yui3/yui_3.4.1.zip for reference.
/**
Extends DataTable base to enable x,y, and xy scrolling.

DEPRECATED. As of YUI 3.5.0, DataTable has been rebuilt.  This module
is designed to work with `datatable-base-deprecated` (effectively the 3.4.1
version of DataTable) and will be removed from the library in a future version.

See http://yuilibrary.com/yui/docs/migration.html for help upgrading to the
latest version.

For complete API docs for the classes in this and other deprecated
DataTable-related modules, refer to the static API doc files in the 3.4.1
download at http://yui.zenfs.com/releases/yui3/yui_3.4.1.zip

@module datatable-deprecated
@submodule datatable-scroll-deprecated
@deprecated
**/


_yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 26);
var YNode = Y.Node,
    YLang = Y.Lang,
    YUA = Y.UA,
    YgetClassName = Y.ClassNameManager.getClassName,
    DATATABLE = "datatable",
    CLASS_HEADER = YgetClassName(DATATABLE, "hd"),
    CLASS_BODY = YgetClassName(DATATABLE, "bd"),
    CLASS_DATA = YgetClassName(DATATABLE, "data"),
    CLASS_LINER = YgetClassName(DATATABLE, "liner"),
    CLASS_SCROLLABLE = YgetClassName(DATATABLE, "scrollable"),
    CONTAINER_HEADER = '<div class="'+CLASS_HEADER+'"></div>',
    CONTAINER_BODY = '<div class="'+CLASS_BODY+'"></div>',
    TEMPLATE_TABLE = '<table></table>',
    scrollbarWidth = Y.cached(function () {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "(anonymous 2)", 39);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 40);
var testNode = Y.one('body').appendChild('<div style="position:absolute;visibility:hidden;overflow:scroll;width:20px;"><p style="height:1px"/></div>'),
            width = testNode.get('offsetWidth') - testNode.get('clientWidth');

        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 43);
testNode.remove(true);

        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 45);
return width;
    });
    
/*
 * Adds scrolling to DataTable.
 * @class DataTableScroll
 * @extends Plugin.Base
 */
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 53);
function DataTableScroll() {
    _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "DataTableScroll", 53);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 54);
DataTableScroll.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 57);
Y.mix(DataTableScroll, {
    NS: "scroll",

    NAME: "dataTableScroll",

    ATTRS: {
    
        /*
        *  The width for the table. Set to a string (ex: "200px", "20em") if you want the table to scroll in the x direction.
        *
        * @attribute width
        * @public
        * @type string
        */
        width: {
            value: undefined,
            writeOnce: "initOnly"
        },
        
        /*
        *  The height for the table. Set to a string (ex: "200px", "20em") if you want the table to scroll in the y-direction.
        *
        * @attribute height
        * @public
        * @type string
        */
        height: {
            value: undefined,
            writeOnce: "initOnly"
        },
        
        
        /*
        *  The scrolling direction for the table.
        *
        * @attribute scroll
        * @private
        * @type string
        */
        _scroll: {
            //value: 'y',
            valueFn: function() {
                _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "valueFn", 98);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 99);
var w = this.get('width'),
                h = this.get('height');
                
                _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 102);
if (w && h) {
                    _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 103);
return 'xy';
                }
                else {_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 105);
if (w) {
                    _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 106);
return 'x';
                }
                else {_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 108);
if (h) {
                    _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 109);
return 'y';
                }
                else {
                    _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 112);
return null;
                }}}
            }
        },
        
        
        /*
        *  The hexadecimal colour value to set on the top-right of the table if a scrollbar exists. 
        *
        * @attribute COLOR_COLUMNFILLER
        * @public
        * @type string
        */
        COLOR_COLUMNFILLER: {
            value: '#f2f2f2',
            validator: YLang.isString,
            setter: function(param) {
                _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "setter", 128);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 129);
if (this._headerContainerNode) {
                    _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 130);
this._headerContainerNode.setStyle('backgroundColor', param);
                }
            }
        }
    }
});

_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 137);
Y.extend(DataTableScroll, Y.Plugin.Base, {
    
    /*
    *  The table node created in datatable-base
    *
    * @property _parentTableNode
    * @private
    * @type {Node}
    */
    _parentTableNode: null,
    
    
    /*
    *  The THEAD node which resides within the table node created in datatable-base
    *
    * @property _parentTheadNode
    * @private
    * @type {Node}
    */
    _parentTheadNode: null,
    
    
    /*
    *  The TBODY node which resides within the table node created in datatable-base
    *
    * @property _parentTbodyNode
    * @private
    * @type {Node}
    */
    _parentTbodyNode: null,
    
    
    /*
    *  The TBODY Message node which resides within the table node created in datatable-base
    *
    * @property _parentMsgNode
    * @private
    * @type {Node}
    */
    _parentMsgNode: null,
    
    
    /*
    *  The contentBox specified for the datatable in datatable-base
    *
    * @property _parentContainer
    * @private
    * @type {Node}
    */
    _parentContainer: null,
    
    
    /*
    *  The DIV node that contains all the scrollable elements (a table with a tbody on it)
    *
    * @property _bodyContainerNode
    * @private
    * @type {Node}
    */
    _bodyContainerNode: null,
    
    
    /*
    *  The DIV node that contains a table with a THEAD in it (which syncs its horizontal scroll with the _bodyContainerNode above)
    *
    * @property _headerContainerNode
    * @private
    * @type {Node}
    */
    _headerContainerNode: null,
    
    
    //--------------------------------------
    //  Methods
    //--------------------------------------


    
    initializer: function(config) {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "initializer", 215);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 216);
var dt = this.get("host");
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 217);
this._parentContainer = dt.get('contentBox');
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 218);
this._parentContainer.addClass(CLASS_SCROLLABLE);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 219);
this._setUpNodes();
    },
    
    /////////////////////////////////////////////////////////////////////////////
    //
    // Set up Table Nodes
    //
    /////////////////////////////////////////////////////////////////////////////
    
    /*
    *  Set up methods to fire after host methods execute
    *
    * @method _setUpNodes
    * @private
    */          
    _setUpNodes: function() {
        
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setUpNodes", 234);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 236);
this.afterHostMethod("_addTableNode", this._setUpParentTableNode);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 237);
this.afterHostMethod("_addTheadNode", this._setUpParentTheadNode); 
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 238);
this.afterHostMethod("_addTbodyNode", this._setUpParentTbodyNode);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 239);
this.afterHostMethod("_addMessageNode", this._setUpParentMessageNode);
        //this.beforeHostMethod('renderUI', this._removeCaptionNode);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 241);
this.afterHostMethod("renderUI", this.renderUI);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 242);
this.afterHostMethod("bindUI", this.bindUI);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 243);
this.afterHostMethod("syncUI", this.syncUI);
        
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 245);
if (this.get('_scroll') !== 'x') {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 246);
this.afterHostMethod('_attachTheadThNode', this._attachTheadThNode);
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 247);
this.afterHostMethod('_attachTbodyTdNode', this._attachTbodyTdNode);
        }
        
    },
        
    /*
    *  Stores the main &lt;table&gt; node provided by the host as a private property
    *
    * @method _setUpParentTableNode
    * @private
    */
    _setUpParentTableNode: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setUpParentTableNode", 258);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 259);
this._parentTableNode = this.get('host')._tableNode;
    },
    
    
    /*
    *  Stores the main &lt;thead&gt; node provided by the host as a private property
    *
    * @method _setUpParentTheadNode
    * @private
    */
    _setUpParentTheadNode: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setUpParentTheadNode", 269);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 270);
this._parentTheadNode = this.get('host')._theadNode;
    },
    
    /*
    *  Stores the main &lt;tbody&gt; node provided by the host as a private property
    *
    * @method _setUpParentTbodyNode
    * @private
    */
    _setUpParentTbodyNode: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setUpParentTbodyNode", 279);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 280);
this._parentTbodyNode = this.get('host')._tbodyNode;
    },
    
    
    /*
    *  Stores the main &lt;tbody&gt; message node provided by the host as a private property
    *
    * @method _setUpParentMessageNode
    * @private
    */
    _setUpParentMessageNode: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setUpParentMessageNode", 290);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 291);
this._parentMsgNode = this.get('host')._msgNode;
    },
    
    /////////////////////////////////////////////////////////////////////////////
    //
    // Renderer
    //
    /////////////////////////////////////////////////////////////////////////////
    
    /*
    *  Primary rendering method that takes the datatable rendered in
    * the host, and splits it up into two separate &lt;divs&gt; each containing two 
    * separate tables (one containing the head and one containing the body). 
    * This method fires after renderUI is called on datatable-base.
    * 
    * @method renderUI
    */
    renderUI: function() {
        //Y.Profiler.start('render');
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "renderUI", 308);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 310);
this._createBodyContainer();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 311);
this._createHeaderContainer();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 312);
this._setContentBoxDimensions();
        //Y.Profiler.stop('render');
        //console.log(Y.Profiler.getReport("render"));
    },
    
    /*
    Binds event subscriptions to keep the state and UI in sync

    @method bindUI
    **/
    bindUI: function () {
        // FIXME: I don't know why the string bind, but I don't want to break
        // stuff until I have time to rebuild it properly
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "bindUI", 322);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 325);
this._bodyContainerNode.on('scroll', Y.bind("_onScroll", this));

        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 327);
this.afterHostEvent("recordsetChange", this.syncUI);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 328);
this.afterHostEvent("recordset:recordsChange", this.syncUI);
    },

    /*
    *  Post rendering method that is responsible for creating a column
    * filler, and performing width and scroll synchronization between the &lt;th&gt; 
    * elements and the &lt;td&gt; elements.
    * This method fires after syncUI is called on datatable-base
    * 
    * @method syncUI
    * @public
    */
    syncUI: function() {
        //Y.Profiler.start('sync');
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "syncUI", 340);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 342);
this._removeCaptionNode();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 343);
this._syncWidths();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 344);
this._syncScroll();
        //Y.Profiler.stop('sync');
        //console.log(Y.Profiler.getReport("sync"));
        
    },
    
    /*
    *  Remove the caption created in base. Scrolling datatables dont support captions.
    * 
    * @method _removeCaptionNode
    * @private
    */
    _removeCaptionNode: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_removeCaptionNode", 356);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 357);
this.get('host')._captionNode.remove();
        //Y.DataTable.Base.prototype.createCaption = function(v) {/*do nothing*/};
        //Y.DataTable.Base.prototype._uiSetCaption = function(v) {/*do nothing*/};
    },

    /*
    *  Adjusts the width of the TH and the TDs to make sure that the two are in sync
    * 
    * Implementation Details: 
    *   Compares the width of the TH liner div to the the width of the TD node.
    *   The TD liner width is not actually used because the TD often stretches
    *   past the liner if the parent DIV is very large. Measuring the TD width
    *   is more accurate.
    *   
    *   Instead of measuring via .get('width'), 'clientWidth' is used, as it
    *   returns a number, whereas 'width' returns a string, In IE6,
    *   'clientWidth' is not supported, so 'offsetWidth' is used. 'offsetWidth'
    *   is not as accurate on Chrome,FF as 'clientWidth' - thus the need for
    *   the fork.
    * 
    * @method _syncWidths
    * @private
    */
    _syncWidths: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_syncWidths", 380);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 381);
var headerTable = this._parentContainer.one('.' + CLASS_HEADER),
            bodyTable   = this._parentContainer.one('.' + CLASS_BODY),
            // nodelist of all the THs
            headers     = headerTable.all('thead .' + CLASS_LINER),
            // nodelist of the TDs in the first row
            firstRow    = bodyTable.one('.' + CLASS_DATA + ' tr'),
            cells       = firstRow && firstRow.all('.' + CLASS_LINER),
            // FIXME: Code smell
            widthProperty = (YUA.ie) ? 'offsetWidth' : 'clientWidth';

            //stylesheet = new YStyleSheet('columnsSheet'),
            //className;
            
        // If there are data rows, iterate each header and the cells of the
        // first row comparing cell widths.  Assign the larger width to the
        // narrower node (header or cell).
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 397);
if (cells && cells.size()) {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 398);
headers.each(function (header, i) {
                _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "(anonymous 3)", 398);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 399);
var cell        = cells.item(i),
                    headerWidth = header.get(widthProperty),
                    cellWidth   = cell.get(widthProperty),
                    width       = Math.max(headerWidth, cellWidth);

                _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 404);
width -= (parseInt(header.getComputedStyle('paddingLeft'),10)|0) +
                         (parseInt(header.getComputedStyle('paddingRight'),10)|0);
                
                _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 407);
header.setStyle('width', width + 'px');
                _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 408);
cell.setStyle('width', width + 'px');
            });
        }
            /*
            // If browser is not IE - get the clientWidth of the Liner
            // div and the TD.
            // Note:  We are not getting the width of the TDLiner, we
            // are getting the width of the actual cell.  Why? Because
            // when the table is set to auto width, the cell will grow
            // to try to fit the table in its container.  The liner
            // could potentially be much smaller than the cell width.
            // TODO: Explore if there is a better way using only LINERS
            // widths - I don't think this should be a problem, given
            // that the liner is a div, a block element and will
            // expand to width.
            if (!ie) {
                // TODO: this should actually be done with
                // getComputedStyle('width') but this messes up
                // columns. Explore this option.
                thWidth = thLiner.get('clientWidth');
                tdWidth = td.item(i).get('clientWidth');
            } else {
                // IE wasn't recognizing clientWidths, so we are using
                // offsetWidths.
                // TODO: should use getComputedStyle('width') because
                // offsetWidth will screw up when padding is changed.
                // TODO: for some reason, using
                // tdLiner.get('clientWidth') doesn't work - why not?
                thWidth = thLiner.get('offsetWidth');
                tdWidth = td.item(i).get('offsetWidth');
                //thWidth = parseFloat(thLiner.getComputedStyle('width').split('px')[0]);
                //tdWidth = parseFloat(td.item(i).getComputedStyle('width').split('px')[0]);
            }
                                
            // expand the TH or the TD to match the wider
            if (thWidth > tdWidth) {
                tdLiner.setStyle('width', (thWidth - 20 + 'px'));
                //thLiner.setStyle('width', (tdWidth - 20 + 'px'));
                //stylesheet.set(className,{'width': (thWidth - 20 + 'px')});
            } else if (tdWidth > thWidth) {
                // if you don't set an explicit width here, when the width
                // is set in line 368, it will auto-shrink the widths of
                // the other cells (because they dont have an explicit
                // width)
                thLiner.setStyle('width', (tdWidth - 20 + 'px'));
                tdLiner.setStyle('width', (tdWidth - 20 + 'px'));
                //stylesheet.set(className,{'width': (tdWidth - 20 + 'px')});
            }
                
            //}

        }
        */
        
        //stylesheet.enable();

    },
    
    /*
    *  Adds the approriate width to the liner divs of the TH nodes before they are appended to DOM
    *
    * @method _attachTheadThNode
    * @private
    */
    _attachTheadThNode: function(o) {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_attachTheadThNode", 472);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 473);
var width = o.column.get('width');
        
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 475);
if (width) {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 476);
o.th.one('.' + CLASS_LINER)
                .setStyles({
                    width: width,
                    overflow:'hidden'
                });
        }
    },
    
    /*
    *  Adds the appropriate width to the liner divs of the TD nodes before they are appended to DOM
    *
    * @method _attachTbodyTdNode
    * @private
    */
    _attachTbodyTdNode: function(o) {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_attachTbodyTdNode", 490);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 491);
var width = o.column.get('width');
        
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 493);
if (width) {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 494);
o.td.one('.' + CLASS_LINER)
                .setStyles({
                    width: width,
                    overflow: 'hidden'
                });
        }
    },
    
    /*
    *  Creates the body DIV that contains all the data. 
    *
    * @method _createBodyContainer
    * @private
    */
    _createBodyContainer: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_createBodyContainer", 508);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 509);
var bd = YNode.create(CONTAINER_BODY);
            
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 511);
this._bodyContainerNode = bd;       
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 512);
this._setStylesForTbody();
        
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 514);
bd.appendChild(this._parentTableNode);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 515);
this._parentContainer.appendChild(bd);
    },
    
    /*
    *  Creates the DIV that contains a &lt;table&gt; with all the headers. 
    *
    * @method _createHeaderContainer
    * @private
    */
    _createHeaderContainer: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_createHeaderContainer", 524);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 525);
var hd = YNode.create(CONTAINER_HEADER),
            tbl = YNode.create(TEMPLATE_TABLE);
            
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 528);
this._headerContainerNode = hd;
        
        //hd.setStyle('backgroundColor',this.get("COLOR_COLUMNFILLER"));
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 531);
this._setStylesForThead();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 532);
tbl.appendChild(this._parentTheadNode);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 533);
hd.appendChild(tbl);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 534);
this._parentContainer.prepend(hd);
        
    },
    
    /*
    *  Creates styles for the TBODY based on what type of table it is.
    *
    * @method _setStylesForTbody
    * @private
    */
    _setStylesForTbody: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setStylesForTbody", 544);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 545);
var dir = this.get('_scroll'),
            w = this.get('width') || "",
            h = this.get('height') || "",
            el = this._bodyContainerNode,
            styles = {width:"", height:h};
                
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 551);
if (dir === 'x') {
            //X-Scrolling tables should not have a Y-Scrollbar so overflow-y is hidden. THe width on x-scrolling tables must be set by user.
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 553);
styles.overflowY = 'hidden';
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 554);
styles.width = w;
        } else {_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 555);
if (dir === 'y') {
            //Y-Scrolling tables should not have a X-Scrollbar so overflow-x is hidden. The width isn't neccessary because it can be auto.
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 557);
styles.overflowX = 'hidden';
        } else {_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 558);
if (dir === 'xy') {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 559);
styles.width = w;
        } else {
            //scrolling is set to 'null' - ie: width and height are not set. Don't have any type of scrolling.
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 562);
styles.overflowX = 'hidden';
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 563);
styles.overflowY = 'hidden';
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 564);
styles.width = w;
        }}}
        
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 567);
el.setStyles(styles);
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 568);
return el;
    },
    
    
    /*
    *  Creates styles for the THEAD based on what type of datatable it is.
    *
    * @method _setStylesForThead
    * @private
    */
    _setStylesForThead: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setStylesForThead", 578);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 579);
var w = this.get('width') || "",
            el = this._headerContainerNode;
        
        //if (dir !== 'y') {
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 583);
el.setStyles({'width': w, 'overflow': 'hidden'});
        // }
    },
    
    /*
    *  Sets an auto width on the content box if it doesn't exist or if its a y-datatable.
    *
    * @method _setContentBoxDimensions
    * @private
    */
    _setContentBoxDimensions: function() {
        
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setContentBoxDimensions", 593);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 595);
if (this.get('_scroll') === 'y' || (!this.get('width'))) {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 596);
this._parentContainer.setStyle('width', 'auto');
        }
        
    },
    
    /////////////////////////////////////////////////////////////////////////////
    //
    // Scroll Syncing
    //
    /////////////////////////////////////////////////////////////////////////////
    
    /*
    *  Ensures that scrolling is synced across the two tables
    *
    * @method _onScroll
    * @private
    */
    _onScroll: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_onScroll", 613);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 614);
this._headerContainerNode.set('scrollLeft', this._bodyContainerNode.get('scrollLeft'));
    },
    
    /*
     *  Syncs padding around scrollable tables, including Column header right-padding
     * and container width and height.
     *
     * @method _syncScroll
     * @private 
     */
    _syncScroll : function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_syncScroll", 624);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 625);
this._syncScrollX();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 626);
this._syncScrollY();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 627);
this._syncScrollOverhang();
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 628);
if (YUA.opera) {
            // Bug 1925874
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 630);
this._headerContainerNode.set('scrollLeft', this._bodyContainerNode.get('scrollLeft'));
            
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 632);
if(!this.get("width")) {
                // Bug 1926125
                _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 634);
document.body.style += '';
            }
        }
    },
    
    /*
    *  Snaps container width for y-scrolling tables.
    *
    * @method _syncScrollY
    * @private
    */
    _syncScrollY : function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_syncScrollY", 645);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 646);
var tBody = this._parentTbodyNode,
            tBodyContainer = this._bodyContainerNode,
            w;
            // X-scrolling not enabled
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 650);
if(!this.get("width")) {
                // Snap outer container width to content
                _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 652);
w = (tBodyContainer.get('scrollHeight') > tBodyContainer.get('clientHeight')) ?
                // but account for y-scrollbar since it is visible
                    (tBody.get('parentNode').get('clientWidth') + scrollbarWidth()) + "px" :
                    // no y-scrollbar, just borders
                    (tBody.get('parentNode').get('clientWidth') + 2) + "px";
                _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 657);
this._parentContainer.setStyle('width', w);
        }
    },
        
    /*
     *  Snaps container height for x-scrolling tables in IE. Syncs message TBODY width. 
     * Taken from YUI2 ScrollingDataTable.js
     *
     * @method _syncScrollX
     * @private
     */
    _syncScrollX: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_syncScrollX", 668);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 669);
var tBody = this._parentTbodyNode,
            tBodyContainer = this._bodyContainerNode,
            w;

        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 673);
this._headerContainerNode.set('scrollLeft',
            this._bodyContainerNode.get('scrollLeft'));
        
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 676);
if (!this.get('height') && (YUA.ie)) {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 677);
w = (tBodyContainer.get('scrollWidth') > tBodyContainer.get('offsetWidth')) ?
                (tBody.get('parentNode').get('offsetHeight') + scrollbarWidth()) + "px" : 
                tBody.get('parentNode').get('offsetHeight') + "px";
            
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 681);
tBodyContainer.setStyle('height', w);
        }
            
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 684);
if (tBody.get('rows').size()) {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 685);
this._parentMsgNode.get('parentNode').setStyle('width', "");
        } else {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 687);
this._parentMsgNode.get('parentNode').setStyle('width', this._parentTheadNode.get('parentNode').get('offsetWidth')+'px');
        }
            
    },
    
    /*
     *  Adds/removes Column header overhang as necesary.
     * Taken from YUI2 ScrollingDataTable.js
     *
     * @method _syncScrollOverhang
     * @private
     */
    _syncScrollOverhang: function() {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_syncScrollOverhang", 699);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 700);
var tBodyContainer = this._bodyContainerNode,
            padding = 1;
        
        //when its both x and y scrolling
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 704);
if ((tBodyContainer.get('scrollHeight') > tBodyContainer.get('clientHeight')) || (tBodyContainer.get('scrollWidth') > tBodyContainer.get('clientWidth'))) {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 705);
padding = 18;
        }
        
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 708);
this._setOverhangValue(padding);
        
        // After the widths have synced, there is a wrapping issue in the
        // headerContainer in IE6. The header does not span the full length of
        // the table (does not cover all of the y-scrollbar). By adding this
        // line in when there is a y-scroll, the header will span correctly.
        // TODO: this should not really occur on this.get('_scroll') === y - it
        // should occur when scrollHeight > clientHeight, but clientHeight is
        // not getting recognized in IE6?
        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 717);
if (YUA.ie !== 0 && this.get('_scroll') === 'y' && this._bodyContainerNode.get('scrollHeight') > this._bodyContainerNode.get('offsetHeight'))
        {
            _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 719);
this._headerContainerNode.setStyle('width', this._parentContainer.get('width'));
        }
    },
    
    
    /*
     *  Sets Column header overhang to given width.
     * Taken from YUI2 ScrollingDataTable.js with minor modifications
     *
     * @method _setOverhangValue
     * @param nBorderWidth {Number} Value of new border for overhang. 
     * @private
     */ 
    _setOverhangValue: function(borderWidth) {
        _yuitest_coverfunc("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", "_setOverhangValue", 732);
_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 733);
var host = this.get('host'),
            cols = host.get('columnset').get('definitions'),
            //lastHeaders = cols[cols.length-1] || [],
            len = cols.length,
            value = borderWidth + "px solid " + this.get("COLOR_COLUMNFILLER"),
            children = YNode.all('#'+this._parentContainer.get('id')+ ' .' + CLASS_HEADER + ' table thead th');

        _yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 740);
children.item(len-1).setStyle('borderRight', value);
    }
    
});

_yuitest_coverline("/build/datatable-scroll-deprecated/datatable-scroll-deprecated.js", 745);
Y.namespace("Plugin").DataTableScroll = DataTableScroll;


}, '3.7.2' ,{requires:['datatable-base-deprecated','plugin']});
