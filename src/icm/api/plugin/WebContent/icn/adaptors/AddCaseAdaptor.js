define(["dojo/_base/declare"],function(declare) {

    return declare("icn/adaptors/AddCaseAdaptor", [] , {

        showCommentsByPOCName : function(adaptor , payload) {
            // adaptor is a script adaptor
            console.log('showCommentsByPOCName is called');
            window.adaptor = adaptor;
            window.payload = payload;
        }

    });

});