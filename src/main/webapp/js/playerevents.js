    function getElement(id) { return document.querySelector('#'+id); } 
    function playFromHere(key) { console.log("playfromhere");player.setPlayheadTime(key);}
    window.bufferLength = -100; 
    var $globalTime = "";
    function onCreate(player) { 
        // Everything you do with the player should be done either in onCreate 
        // or as listeners on the message bus 
        // to ensure that the player is in the correct state. 
        console.log("-- onCreate"); 
        player.subscribe('*','myPage', function(eventName) 
                { console.log("RECEIVED EVENT: "+eventName); 
                // Player embedded parameters go here 
                }); 
        
        // Error handling listener 
        // Subscribe to error event 
        player.subscribe("error", "test-plugin", function(eventName, payload) { 
            console.log(eventName+": "+payload); 
            }); 

        // Error handling listener 
        // Subscribe to error event 
        player.subscribe("paused", "test-plugin", function(eventName, payload) { 
            console.log(eventName+": "+payload); 
            var $playHeadTime = player.getPlayheadTime();

            if($globalTime == "" || $globalTime != $playHeadTime) {
                $globalTime = $playHeadTime;
                console.log("Now only i ll write"); 
            var $contentId = player.getEmbedCode();
            console.log("playHeadTime "+$playHeadTime); 
            console.log("contentId "+$contentId); 
            //window.pausedElement.value = "This is the changed value";
            //window.pausedElement.change();
            //console.log("value is set in the paused element");

            //window.metadataElement.innerHTML += "<div class=\"input-group\"><div class=\"input-group-addon\">"+$playHeadTime+"</div><input class=\"form-control\" type=\"text\" ng-model=\"contentTitle\" ><div class=\"input-group-addon\">Add</div></div>"; 
            
            window.metadataElement.innerHTML += "<div class=\"input-group\">"+
                   "<div class=\"input-group-addon\">"+
                   "<a href='javascript:player.setPlayheadTime("+$playHeadTime+");'>"+$playHeadTime+"</a>"+
                   "</div>"+
                   "<input class=\"form-control\" type=\"text\">"+
                   "<div class=\"input-group-addon\">"+
                   "<a ng-click='updateCustomMetaData()'>add</a>"+
                   "</div>"+
                   "</div>";   

            /*var jsonString = "{\""+$playHeadTime+"\" : "+"\"the slow motion starts here\" , \"assetid\" : \""+$contentId+"\"}";
            console.log("jsonString "+jsonString); 
            //JSON.stringify(jsonString)
            addMetaData(jsonString);
            //$scope.sayHello();*/
             }
            });
            
        
        // Buffer listener 
        // Need to subscribe to an event if you want updates for the length of the buffer. 
        // Ideally you'd listen for the BUFFERING event. window.bufferLength = -100; 
        player.subscribe('playheadTimeChanged', 'myPage', function(eventName) { 
                var newBufferLength = player.getBufferLength(); 
                if (bufferLength === newBufferLength) { return; } 
                window.bufferElement.innerHTML += "Buffer length is " + player.getBufferLength() + "<br/>" 
                window.bufferLength = newBufferLength; 
                }); 
        
        // Bitrate listener 
        // You *must* listen to bitrateInfoAvailable in order to request it. 
        player.subscribe('bitrateInfoAvailable', 'myPage', function(eventName) { 
                var rates = player.getBitratesAvailable(); 
                if (rates.length > 0) { 
                    for (var i=0; i < rates.length; i++) { 
                        window.bitrateElement.innerHTML += "Rate: " + rates[i] + "<br/>" 
                        } 
                    } 
                }); 
        
        // Metadata 
        // Content information is available after contentTreeFetched, but it is best to wait until 
        // playbackReady for duration. 
        player.subscribe('playbackReady', 'myPage', function(eventName) { 
            /*window.metadataElement.innerHTML += "Title is: " + player.getTitle() + "<br/>"; 
            window.metadataElement.innerHTML += "Description is: " + player.getDescription() + "<br/>"; 
            window.metadataElement.innerHTML += "Duration is: " + player.getDuration() + "<br/>"; */
            }); 



        window.bufferElement = getElement('buffer'); 
        window.bitrateElement = getElement('bitrate'); 
        window.metadataElement = getElement('metadata'); 
        window.metadataPresent = getElement('metadataPresent');

        } 

        
        /* OO.ready(function() { 
            // Surround everything with OO.ready to make sure the script has 
            // loaded and initialized completely 
            window.player = OO.Player.create('playerwrapper','U2ZG9rcDrX08ZMI7Ju74Ey3be0jSbRtd', 
                    { onCreate: window.onCreate, autoplay: false 
                // Instead of calling object.play it is easier (and more robust) to set autoplay here 
                }); 
            }); */

      /*  function addMetaData(metadata) {
            console.log("in addmetadata method .try to add to server");
        $.post( "/rest/metadata", function(metadata) {
          alert( "success" );
        })
          .done(function() {
            alert( "second success" );
          })
          .fail(function() {
            alert( "error" );
          })
          .always(function() {
            alert( "finished" );
        })
      }*/


       /* function addMetaData(jsonString) {
            console.log("in addmetadata method .try to add to server");
              $.ajax({
                url: '/rest/metadata',
                type: 'PUT',
                data: jsonString ,
                contentType: 'application/text;',
                success: function (response) {
                    console.log("success");
                },
                error: function () {
                    console.log("failure");
                }
            });
          }*/