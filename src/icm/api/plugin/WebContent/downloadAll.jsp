<html>
    <%@ include file="header.jsp" %>

    <%
        String folderId = request.getParameter("folderId");
    %>
    <script type="text/javascript">
        require(["ecm/model/Desktop","dojo/_base/lang"] , function(Desktop, lang) {
            var folderId = <%= folderId%>
            var d = Desktop;
            var params = {};
            params.userid = "<user_name>";
            params.desktop = "<desktop_id>";
            params.password = "<password>";
            var isLogged = d.isLoggedIn();
            if(!isLogged) {
              d.logon(params.password, lang.hitch(this, function() {
                    downloadAll(d);
                }) , params);
            } else {
                downloadAll(d);
            }
        });

        function downloadAll(desktop , folderId) {
            var repository = desktop.getDefaultRepository();
            if(repository != null) {
                require(["dojo/_base/lang"] , function(lang) {
                    repository.retrieveItem(folderId, lang.hitch(this,function(item) {
                        if(item && item.isFolder()) {
                            item.retrieveFolderContents(false,lang.hitch(this,function(documents) {
                                if(documents && documents.items.length > 0) {
                                    var actionsHandler = desktop.getActionsHandler();
                                    actionsHandler._download(repository, documents.items , lang.hitch(this,function() {
                                        console.log('download is completed');
                                    }));
                                }
                            }));
                        }
                    }));
                });
            }

        }
    </script>
</html>