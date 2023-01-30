//load sample ecm desktop load handler for checks
require([
    "ecm/model/Desktop",
    "dojo/aspect",
    "dojo/_base/lang"
], function(Desktop, aspect,lang) {

    var handler = aspect.after(Desktop,"onDesktopLoaded",lang.hitch(this,function(d) {
        console.log('desktop loaded');
        window.d = d;
        window.d1 = this;
    }));

    window.handler = handler; // this is just for manipulation during runtime

});