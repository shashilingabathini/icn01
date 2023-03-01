package icm.api.plugin;

import com.ibm.ecm.extension.Plugin;

import java.util.Locale;

public class ICNPlugin extends Plugin {

    public ICNPlugin() {}

    @Override
    public String getId() {
        return "icn_plugin_01";
    }

    @Override
    public String getName(Locale locale) {
        return "ICN_Plugin_01";
    }

    @Override
    public String getVersion() {
        return "0.1";
    }


    @Override
    public String getScript() {
        return "icn_plugin_01.js";
    }

    @Override
    public String getDojoModule() {
        return "icn_plugin_01";
    }

}
