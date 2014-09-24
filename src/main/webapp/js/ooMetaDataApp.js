var ooMetaDataApp = angular.module('ooMetaDataApp',['ngRoute']);


ooMetaDataApp.config(configFunction);

function configFunction($routeProvider,$logProvider,$locationProvider) {
  $logProvider.debugEnabled(true);
  $routeProvider.when('/videos',{
   templateUrl:'videos.html'
   //controller: 'playerCtrl'
 })
  .when('/',{
   templateUrl:'videos.html'
   //controller: 'playerCtrl'
 })
  .when('/challenge',{
   templateUrl:'challenge.html'
   //controller: 'playerCtrl'
 });
};


ooMetaDataApp.controller('playerCtrl', function($scope, $http,$log) {

       $log.debug('This is the playerCtrl ctrl');
       //$scope.contentId = "ghg";  //player.getTitle()  

      function playVideo(contentId) { 
        $log.debug('Clicked the play button');
      // Surround everything with OO.ready to make sure the script has 
      // loaded and initialized completely 
      if(window.player) {
        player.destroy();
        $log.debug('The player is destroyed');
      }
      window.player = OO.Player.create('playerwrapper',contentId, 
              { onCreate: window.onCreate, autoplay: false 
          // Instead of calling object.play it is easier (and more robust) to set autoplay here 
          }); 
      $log.debug('The player is created');
      };


     $scope.sayHello = function() {
       $log.debug('Hi Hello How are you');
     };


      

     $scope.listenToPlayer = function() {
        // Error handling listener 
        // Subscribe to error event 
        player.subscribe("paused", "test-plugin", function(eventName, payload) { 
            console.log(eventName+": "+payload); 
            var playHeadTime = player.getPlayheadTime();
            $scope.sayHello();
            }); 
      }

     $scope.loadVideo = function(name,description,contentId) {

      playVideo(contentId);
      //player.setEmbedcode(contentId);
      $scope.contentTitle = name;
      $scope.description =description;
      $scope.contentId = contentId;
      $("html, body").animate({ scrollTop: 0 }, "slow");
      getCustomMetaData(contentId);
     };

     $scope.changeTitle = function(checked) {
        $scope.checked=!checked;
        $log.debug("changing the ttile of the content..");
         var url = "/rest/assets"; 


         var jsonString = {
          "assetid" : $scope.contentId,
          "name" : $scope.contentTitle
        };
         var responsePromise = $http.post(url,jsonString);
         responsePromise.success(function(dataFromServer, status, headers, config) {
               console.log(dataFromServer);
               $scope.players = dataFromServer;
               console.log("the title is changed"); 
               playVideo($scope.contentId);
         });
          responsePromise.error(function(data, status, headers, config) {
            console.log("changing the titie method failed!");
         }); 
      }; 

      
     function getPlayersList() {
        $log.debug("getting the players from server..");
         var url = "/rest/players"; 
         var responsePromise = $http.get(url);
         responsePromise.success(function(dataFromServer, status, headers, config) {
               console.log(dataFromServer);
               $scope.players = dataFromServer;
               console.log("the list of players are retrieved"); 
         });
          responsePromise.error(function(data, status, headers, config) {
            console.log("getting players failed!");
         }); 
      }; 


     $scope.updateCustomMetaData = function(){
        $log.debug("updateCustomMetaData from server..");
         /*var url = "/rest/metadata"; 
         $scope.customMetaData.push({"assetid":assetid})
         $log.debug("asset id added"+$scope.customMetaData);
         var responsePromise = $http.put(url,$scope.customMetaData);
         responsePromise.success(function(dataFromServer, status, headers, config) {
               console.log(dataFromServer);
               console.log("the custom metadata updated"); 
         });
          responsePromise.error(function(data, status, headers, config) {
            console.log("updating metadata failed!");
         }); */
      };    


     function getCustomMetaData(assetid) {
        metadataPresent.innerHTML = "";
        metadataElement.innerHTML = "";
        $log.debug("getCustomMetaData from server..");
         var url = "/rest/metadata?assetId="+assetid; 
         var responsePromise = $http.get(url);
         responsePromise.success(function(dataFromServer, status, headers, config) {
               console.log(dataFromServer);
               $scope.customMetaData = dataFromServer;

                //var values = {name: 'misko', gender: 'male'};
                //var log = [];
                angular.forEach($scope.customMetaData, function(value, key) {
                  console.log("key & value"+value+key); 
                   metadataPresent.innerHTML += "<div class=\"input-group\">"+
                   "<div class=\"input-group-addon\">"+
                   "<a href='javascript:player.setPlayheadTime("+key+");'>"+key+"</a>"+
                   "</div>"+
                   "<input class=\"form-control\" type=\"text\" value=\""+value+"\" readonly>"+
                   "<div class=\"input-group-addon\">"+
                   "<a href='javascript:player.setPlayheadTime("+key+");'>play</a>"+
                   "</div>"+
                   "</div>";                  
                  });

               console.log("the custom metadata retrieved"); 
         });
          responsePromise.error(function(data, status, headers, config) {
            console.log("getting metadata failed!");
         }); 
      };       

     function getAssetsList() {
        $log.debug("getting the assets from server..");
         var url = "/rest/assets"; 
         var responsePromise = $http.get(url);
         responsePromise.success(function(dataFromServer, status, headers, config) {
               console.log(dataFromServer);
               $scope.assets = dataFromServer;
               console.log("the list of assets are retrieved");
         });
          responsePromise.error(function(data, status, headers, config) {
            console.log("getting assets failed!");
         }); 
      };       

      getPlayersList();
      getAssetsList();
      //$scope.loadVideo("Countdown","Countdown","VhZ3lucDo-mk1iZ5xD_knjYM2aPe_YAG");
});

