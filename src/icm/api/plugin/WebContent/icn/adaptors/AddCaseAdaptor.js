define([
"dojo/_base/declare",
"icm/model/properties/controller/ControllerManager",
"dojo/_base/lang", //
"icm/base/Constants",
"dojo/_base/array"
],function(declare,ControllerManager,lang,Constants,array) {

    return declare(
        "icn/adaptors/AddCaseAdaptor", [] , {

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
            if(payload && adaptor) {
                var coordination = payload.coordination;
                var editable = payload.caseEditable;
                 // set up initial configurations bindings before load widget
                 coordination.participate(Constants.CoordTopic.BEFORELOADWIDGET,lang.hitch(this,function(context , complete , abort) {
                        var controller = this.bindController(editable);
                        if(this.enableWindowDebug)
                            window.controller = controller;
                        var prefix = payload.caseType.getSolution().getPrefix(); // solution prefix
                        if(this.enableConsoleDebug)
                            console.log(' solution prefix is '+prefix);
                        var pocTypeName =  prefix + "_" + "POCType";
                        var propertyController = controller.getPropertyController(pocTypeName);
                        if(this.enableConsoleDebug)
                             console.log(' POC Type Controller  is '+propertyController);
                        propertyController.watch("value",lang.hitch(this,function(v,n) {
                            if(this.enableConsoleDebug) {
                                console.log('v is '+v+" , n is "+n);
                            }
                            if(v && v == "POC01") { // show only poc 01 comments text area and hide poc 02 comments area
                                  var p1 = prefix + "_" + "POCType1Comments";
                                  var p2 =  prefix + "_" + "POCType2Comments";
                                  this.showOrHideProperty([p1,p2], [false, true],controller);
                            } else if(v && v == "POC02") { // show only p2 and hide p1
                                  var p1 = prefix + "_" + "POCType1Comments";
                                  var p2 =  prefix + "_" + "POCType2Comments";
                                  this.showOrHideProperty([p1,p2], [true, false],controller);
                            }
                        })); // watch the changes of this field
                        complete();
                 }));

                // add validate  checks for case page
                coordination.participate(Constants.CoordTopic.VALIDATE,lang.hitch(this,function(context, complete , abort) {
                    if(this.enableConsoleDebug)
                        console.log('coordination is started b/w add action widget VALIDATE');
                    var pocTypeName = payload.caseEditable.propertiesCollection.POC_POCType.value;
                    if(pocTypeName === "POC01") {
                        var widgets  = adaptor.page._getPageWidgets();
                        array.forEach(widgets,lang.hitch(this,function(widget) {
                            if(widget && widget.name && widget.name == "Documents") { // if content list widget available get items count for POCType 01
                                   var l = widget.ecmContentList.getResultSet().items.length;
                                   if(l == 0) {
                                        abort({'message' : 'documents upload is mandatory for this poc type'});
                                   } else complete();
                            }
                        }));
                    } else complete();

                }));

                coordination.participate(Constants.CoordTopic.AFTERLOADWIDGET,lang.hitch(this,function(context , complete , abort) {
                    this.unbindController(editable);
                }));
            }
        },
        bindController : function(editable) {
            return ControllerManager.bind(editable);
        },
        unbindController : function(editable) {
            return ControllerManager.unbind(editable);
        },
        showOrHideProperty : function(symbolicNames , showHides , controller) {
            if(this.enableConsoleDebug)
                console.log('Entry >> showOrHideProperty');
            if(lang.isArray(symbolicNames) && lang.isArray(showHides) && symbolicNames.length > 0 && showHides.length  > 0 && symbolicNames.length == showHides.length) {
                controller.beginChangeSet();
                for(var x  = 0; x < symbolicNames.length ; x++) {
                    if(this.enableConsoleDebug)
                        console.log('symbolic Name '+symbolicNames[x] +" , showHide "+showHides[x]);
                    controller.getPropertyController(symbolicNames[x]).set("hidden",showHides[x]);
                }
                controller.endChangeSet();
            }
            if(this.enableConsoleDebug)
                console.log('EXIT >> showOrHideProperty');
        }

    });

});
