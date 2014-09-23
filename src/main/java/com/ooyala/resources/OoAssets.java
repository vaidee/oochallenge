package com.ooyala.resources;


import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.http.client.ClientProtocolException;
import org.json.simple.JSONObject;


/**
 * Root resource (exposed at "assets" path)
 */
@Path("testassset")
public class OoAssets {
	
	
	/**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "application/json" media type.
     * @return 
     *
     * @return Json that will be returned as response.
     */
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Object getAllAssets(@PathParam("path") String path) {
    	
    	String requestPath = null;
    	JSONObject jsonresponse = null;
    	Object response = null;
    	OoyalaAPI ooyalaapi = null;
    	ooyalaapi = new OoyalaAPI("NoNTgyOnzfsCuyuMHS3_U_x9R8Jy.T9zcm","rqyh7up7Cy6E8c8y9PFZbzh-gtzNm0eZ-YUvukM7"); 
    	
    	try {
    	if(path == "all")
    	{
    		requestPath = "assets";
    	}
    	else {
    		requestPath = "assets"+path;
    	}
    	HashMap<String, String> parameters = new HashMap<String, String>();
    	response = ooyalaapi.sendRequest("GET", requestPath);
    	} catch (ClientProtocolException e) {
    		System.out.println("ClientProtocolException occured");
    	} catch (NoSuchAlgorithmException e) {
    		System.out.println("NoSuchAlgorithmException occured");
    	} catch (IOException e) {
    		System.out.println("IOException occured");
    	} catch (HttpStatusCodeException e) {
    		System.out.println("HttpStatusCodeException occured");
    	}
    	
    	System.out.println("response is " + response.toString());
    	//jsonresponse.
        return response;
    }
    
    
    
}
