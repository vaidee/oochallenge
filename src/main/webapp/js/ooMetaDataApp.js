var ooMetaDataApp = angular.module('ooMetaDataApp',[]);

/*ooMetaDataApp.directive( 'whenPaused', function () {
  $log.debug("the directive is formed");
    return {
        scope: true,
        link: function ( scope, element, attrs ) {
            scope.$on( '$scope.pausedValue', function () {

               
                if ( $location.path() == element.attr( 'href' ) ) { 
                    element.addClass( 'active' );
                }
                else {
                    element.removeClass( 'active' );
                }
            });
        }
    };
});*/

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
            alert("changing the titie method failed!");
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
            alert("getting players failed!");
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
            alert("getting assets failed!");
         }); 
      };       

      getPlayersList();
      getAssetsList();

      $scope.pausedValue = "this is value";

      $scope.test = function() {
        alert('pausedValue changed *****');
      };

      /*$scope.$watch('pausedValue', function() { 
         alert('pausedValue changed *****');
      });*/
      //$scope.pausedValue = false;

   /*$scope.myVar = 1;

   $scope.$watch('myVar', function() {
       alert('hey, myVar has changed!');
   });   

   $scope.myVar = 2;   */

});

