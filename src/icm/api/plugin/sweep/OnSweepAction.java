package icm.api.plugin.sweep;
import com.filenet.api.core.Document;
import com.filenet.api.engine.HandlerCallContext;
import com.filenet.api.engine.SweepActionHandler;
import com.filenet.api.engine.SweepItemOutcome;
import com.filenet.api.sweep.CmSweep;
import com.filenet.api.sweep.CmSweepPolicy;

public class OnSweepAction implements SweepActionHandler {
    @Override
    public void onSweep(CmSweep cmSweep, SweepItem[] sweepItems) {
       StringBuilder builder = new StringBuilder();
       builder.append("Total Sweep Items :"+sweepItems.length);
       builder.append("\n");
       HandlerCallContext handlerCallContext =  HandlerCallContext.getInstance();
       // new changes are added as a comment is a source code
       for(int x = 0; x < sweepItems.length; x++) {
           if(handlerCallContext != null && handlerCallContext.isShuttingDown()) {
               System.out.println("Handler Context Shutting down in middle of processing");
           }
           Document document = (Document) sweepItems[x].getTarget();
           builder.append("document "+document.getProperties().getStringValue("DocumentTitle"));
           sweepItems[x].setOutcome(SweepItemOutcome.PROCESSED,"Item"+document.get_Id().toString());
       }
       builder.append("Processed Object Count"+cmSweep.get_ProcessedObjectCount());
       builder.append("Failed Object Count"+cmSweep.get_FailedObjectCount());
       System.out.println(builder.toString());
    }

    @Override
    public void onPolicySweep(CmSweep cmSweep, CmSweepPolicy cmSweepPolicy, SweepItem[] sweepItems) {

    }

    @Override
    public String[] getRequiredProperties() {
        return new String[0];
    }
}
