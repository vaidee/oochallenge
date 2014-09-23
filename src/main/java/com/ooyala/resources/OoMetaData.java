package com.ooyala.resources;


import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.http.client.ClientProtocolException;
import org.json.simple.JSONObject;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;


/**
 * Root resource (exposed at "assets" path)
 */
@Path("metadata")
public class OoMetaData {
	
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    //@QueryParam(value = "test") jsonString
    public Object addMetaData(String jsonString) {
    	
    	System.out.println("jsonString---"+jsonString);
    	HashMap<String, Object> response = null;
    	
    	JSONObject jsonrequest = null;
    	String assetid = "";
    	OoyalaAPI ooyalaapi = null;
    	ooyalaapi = new OoyalaAPI("NoNTgyOnzfsCuyuMHS3_U_x9R8Jy.T9zcm","rqyh7up7Cy6E8c8y9PFZbzh-gtzNm0eZ-YUvukM7"); 
    	ObjectMapper mapper = new ObjectMapper();
    	
    	try {

    	HashMap<String, Object> parameters = new HashMap<String, Object>();
    	parameters = mapper.readValue(jsonString , new TypeReference<HashMap<String,Object>>(){});
    	
    	System.out.println("Before removal"+parameters.toString());
    	System.out.println("parameters assetid---"+parameters.get("assetid"));
    	System.out.println("parameters name---"+parameters.get("name"));
    	

    	assetid = (String) parameters.get("assetid");
    	parameters.remove("assetid");
    	String requestPath = "/assets/"+assetid+"/metadata";
    	System.out.println("requestpath---"+requestPath);  	
    	//parameters.put("name", "changed title");
    	response = (HashMap<String, Object>) ooyalaapi.putRequest(requestPath,parameters);
    	} catch (ClientProtocolException e) {
    		System.out.println("ClientProtocolException occured");
    	} catch (NoSuchAlgorithmException e) {
    		System.out.println("NoSuchAlgorithmException occured");
    	} catch (IOException e) {
    		System.out.println("IOException occured"+e.getMessage());
    	} catch (HttpStatusCodeException e) {
    		System.out.println("HttpStatusCodeException occured"+e.getMessage());
    	} catch (Exception e) {
    		System.out.println("Exception occured");
    	}
    	
    	//System.out.println("response is "+response.toString());
    	//jsonresponse.
        return response;
    }
    
    
}
