package com.ooyala.heroku;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

import com.ooyala.resources.OoAsset;



/**
 * This class launches the web application in an embedded Jetty container. This is the entry point to your application. The Java
 * command that is used for launching should fire this main method.
 */
public class Main {

    /**
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception{
    	
    	/*LastMovie lastmovie = new LastMovie();
    	
        OoPlayer oplayer = new OoPlayer();
        System.out.println("main method **");
        System.out.println(lastmovie.getLastMovie());
        System.out.println(oplayer.getAllPlayers());*/
    	
    	/*OoAsset asset = new OoAsset();
    	Object response = asset.UpdateAssetName("{\"name\":\"changednamed\"}");
    	System.out.println(response.toString());*/
    	
    	
        // The port that we should run on can be set into an environment variable
        // Look for that variable and default to 8080 if it isn't there.
        String webPort = System.getenv("PORT");
        if (webPort == null || webPort.isEmpty()) {
            webPort = "8090";
        }

        final Server server = new Server(Integer.valueOf(webPort));
        final WebAppContext root = new WebAppContext();

        root.setContextPath("/");
        // Parent loader priority is a class loader setting that Jetty accepts.
        // By default Jetty will behave like most web containers in that it will
        // allow your application to replace non-server libraries that are part of the
        // container. Setting parent loader priority to true changes this behavior.
        // Read more here: http://wiki.eclipse.org/Jetty/Reference/Jetty_Classloading
        root.setParentLoaderPriority(true);

        final String webappDirLocation = "src/main/webapp/";
        root.setDescriptor(webappDirLocation + "/WEB-INF/web.xml");
        root.setResourceBase(webappDirLocation);

        server.setHandler(root);

        server.start();
        server.join();
              
    }
}
