//load sample ecm desktop load handler for checks
require([
    "ecm/model/Desktop",
    "dojo/aspect",
    "dojo/_base/lang",
    "ecm/widget/viewer/ContentViewer"
], function(Desktop, aspect,lang) {

    var handler = aspect.after(Desktop,"onDesktopLoaded",lang.hitch(this,function(d) {
        console.log('desktop loaded');
        window.d = d;
        window.d1 = this;
    }));

    // proxy the document open
    handler = aspect.after(ContentViewer.prototype,"open",lang.hitch(this,function(item,openInBackground,pageNumber) {
        alert('document is opened');

    }),true);

    window.handler = handler;

    // all script adaptor handlers for [AddCase] Page

    function AddCaseAdaptor(adaptor , payload) { // this is only meant for add case action
        console.log(adaptor);
        console.log(payload);
        if(!adaptor || !payload)
            return;
        this.adaptor = adaptor;
        this.payload =  payload; // local to function class variables



    }

});