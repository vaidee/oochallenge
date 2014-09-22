    function getElement(id) { return document.querySelector('#'+id); } 
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
            window.metadataElement.innerHTML += "Title is: " + player.getTitle() + "<br/>"; 
            window.metadataElement.innerHTML += "Description is: " + player.getDescription() + "<br/>"; 
            window.metadataElement.innerHTML += "Duration is: " + player.getDuration() + "<br/>"; 
            }); 
        } 
        window.bufferElement = getElement('buffer'); 
        window.bitrateElement = getElement('bitrate'); 
        window.metadataElement = getElement('metadata'); 
        
        /* OO.ready(function() { 
            // Surround everything with OO.ready to make sure the script has 
            // loaded and initialized completely 
            window.player = OO.Player.create('playerwrapper','U2ZG9rcDrX08ZMI7Ju74Ey3be0jSbRtd', 
                    { onCreate: window.onCreate, autoplay: false 
                // Instead of calling object.play it is easier (and more robust) to set autoplay here 
                }); 
            }); */