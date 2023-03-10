define(["dojo/_base/declare","icn/adaptors/AddCaseAdaptor"], function(declare,AddCaseAdaptor) {

    return new declare("icn/adaptors/Caller",[],{ // this will create a static Caller object to call other utilities

        initializeCall : function(adaptorName , pageName , uniqueOpCode ,  adaptor , payload) {
            this.adaptorName = adaptorName;
            this.pageName = pageName;
            this.adaptor = adaptor;
            this.payload = payload;
            this.uniqueOpCode = uniqueOpCode;

            this.initCall();
        },
        initCall : function() {
            console.log('current page name is : '+this.pageName);
            switch (this.pageName) {
                case "AddCasePage" :
                    this.initializeAddCasePageCalls();
                    break;

                case "CaseDetailsPage" :
                    this.initializeCaseDetailsPageCalls();
                    break;

                case "WorkDetailsPage" :
                    this.initializeWorkDetailsPageCalls();
                    break;
            }
        },
        initializeAddCasePageCalls : function() {
             var addAdaptor = new AddCaseAdaptor();
             switch (this.uniqueOpCode) {
                case "showComments" :
                    addAdaptor.showCommentsByPOCName(this.adaptor , this.payload);
                    break;
             }
        },
        initializeCaseDetailsPageCalls : function() {

        },
        initializeWorkDetailsPageCalls : function() {

        }
    })
});