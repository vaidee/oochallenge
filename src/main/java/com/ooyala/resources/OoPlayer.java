package com.ooyala.resources;


import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.http.client.ClientProtocolException;
import org.json.simple.JSONObject;


/**
 * Root resource (exposed at "ooPlayer" path)
 */
@Path("getallplayers")
public class OoPlayer {
	
	
	/**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     * @return 
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public JSONObject getAllPlayers() {
    	
    	JSONObject jsonresponse = null;
    	Object response = null;
    	OoyalaAPI ooyalaapi = null;
    	ooyalaapi = new OoyalaAPI("NoNTgyOnzfsCuyuMHS3_U_x9R8Jy.T9zcm","rqyh7up7Cy6E8c8y9PFZbzh-gtzNm0eZ-YUvukM7"); 
    	
    	try {
    	String requestPath = "/players";
    	HashMap<String, String> parameters = new HashMap<String, String>();
    	jsonresponse = (JSONObject) ooyalaapi.sendRequest("GET", requestPath);
    	} catch (ClientProtocolException e) {
    		System.out.println("ClientProtocolException occured");
    	} catch (NoSuchAlgorithmException e) {
    		System.out.println("NoSuchAlgorithmException occured");
    	} catch (IOException e) {
    		System.out.println("IOException occured");
    	} catch (HttpStatusCodeException e) {
    		System.out.println("HttpStatusCodeException occured");
    	}
    	
    	System.out.println("response is " + jsonresponse.toString());
    	//jsonresponse.
        return jsonresponse;
    }
    
    
    
}
