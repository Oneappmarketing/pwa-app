

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//if jquery is not present load thes scripts if it is a success load the function to load our website
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

if (typeof(jQuery) == 'undefined') {
    //jquery not present on website
   (function() {
       // Load jquery script if doesn't exist
       var script = document.createElement("SCRIPT");
       script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
       script.type = 'text/javascript';
       script.onload = function() {
           pwaBuilderOverlayInit();
       };
       document.getElementsByTagName("head")[0].appendChild(script);
   })();
}else{
    //loads thw body of our front page ajax call
   pwaBuilderOverlayInit();
}


   //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Call our website From ajax request
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

function pwaBuilderOverlayInit(){
$(document).one("ready",function(){
    console.log('Front page was Loaded');
    $.ajax({
        url: 'pwa-overlay.html',
        success: function(response){
            $("body").append(response);
            
        }
    });

   });
}
