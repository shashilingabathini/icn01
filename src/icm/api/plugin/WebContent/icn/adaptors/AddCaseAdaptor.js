define(["dojo/_base/declare","icm/model/properties/controller/ControllerManager"],function(declare,ControllerManager) {

    return declare("icn/adaptors/AddCaseAdaptor", [] , {

        showCommentsByPOCName : function(adaptor , payload) {
            // adaptor is a script adaptor
            console.log('showCommentsByPOCName is called');
            window.adaptor = adaptor;
            window.payload = payload;
            // on change of property type want to show other props in UI. we do not want to use icm.PropertyUpdated from Properties widget for this
            if(payload) {
                var editable = payload.caseEditable;
                var controller = this.bindController(editable);
                window.controller = controller;
            }
        },
        bindController : function(editable) {
            return ControllerManager.bind(editable);
        },
        unbindController : function(editable) {
            return ControllerManager.unbind(editable);
        }

    });

});