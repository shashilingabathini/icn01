define(["dojo/_base/declare","icm/model/properties/controller/ControllerManager","dojo/_base/lang"],function(declare,ControllerManager,lang) {

    return declare("icn/adaptors/AddCaseAdaptor", [] , {

        enableWindowDebug : window.location.href.indexOf("enableWindowDebug=true") > 0 ,

        enableConsoleDebug : window.location.href.indexOf("enableConsoleDebug=true") > 0,

        showCommentsByPOCName : function(adaptor , payload) {
            // adaptor is a script adaptor
            console.log('showCommentsByPOCName is called');
            if(this.enableWindowDebug) {
                window.adaptor = adaptor;
                window.payload = payload;
            }
            // on change of property type want to show other props in UI. we do not want to use icm.PropertyUpdated from Properties widget for this
            if(payload) {
                var editable = payload.caseEditable;
                var controller = this.bindController(editable);
                if(this.enableWindowDebug)
                    window.controller = controller;
                var prefix = payload.caseType.getSolution().getPrefix(); // solution prefix
                if(this.enableConsoleDebug)
                    console.log(' solution prefix is '+prefix);
                var pocTypeName =  prefix + "_" + "POCType";
                var propertyController = controller.getPropertyController(pocTypeName);
                propertyController.watch("value",lang.hitch(this,function(o  , n) {
                    if(this.enableConsoleDebug) {
                        console.log(pocTypeName + " changes are detected in ui .");
                        console.log("Old "+o+" , New "+n);
                    }
                })); // watch the changes of this field
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