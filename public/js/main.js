
$("document").ready(function(){
    
    
   var apiUrl = "http://tinyurlanim-koushikkumarv.c9users.io/"
   
    function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
    
    $(".inputLongUrl").on('click',"#submitButton",function(){
        var longUrlInput = $("#urlInput").val();
        ajaxRequest('POST',apiUrl+longUrlInput,function(data){
            var urlData = JSON.parse(data);
            if(urlData.result=='validationError'){
               $("#invalidUrl").css('visibility','visible');
            }else{
                $('.inputLongUrl').empty();
                var original_url = urlData.original_url;
                var original_url_array = original_url.split('');
                if(original_url_array.length>24){
                    var modifiedLongUrlArray = [];
                    for(var i=0;i<25;i++){
                        modifiedLongUrlArray.push(original_url_array[i]);
                    }
                    for(var i=0;i<8;i++){
                        modifiedLongUrlArray.push('.');
                    }
                    original_url = modifiedLongUrlArray.join('');
                }
                $('#longUrl').text(original_url);
                $('#tinyUrl').text(urlData.short_url);
                $('#hrefTinyUrl').attr('href',urlData.short_url);
                $('#longUrl').css('visibility','visible');
                initiateAnimation();
            }
        })
    });
    
    function initiateAnimation(){
      alignDivs();
    }
    var x = 0;
    function alignDivs(){
        var w = window.innerWidth;
        x = (w/2)-180;
        $(".openDoorDiv").css('margin-left',-(w/4+7));
        $("#longUrl").css('margin-left',x);
        setTimeout(function(){
            $("#longUrl").css('visibility','hidden');
            closeDoor(openDoor);
        },2100);
    }

    function openDoor(){
        var y = $(".openDoor-open");
        if(y.hasClass("openDoor-close")){
            y.removeClass("openDoor-close");
            setTimeout(function(){
                $("#tinyUrl").css('visibility','visible');
                $("#tinyUrl").css('transition','margin linear 2s');
                $("#tinyUrl").css('-webkit-transition','margin linear 2s');
                $("#tinyUrl").css('-moz-transition','margin linear 2s');
                $("#tinyUrl").css('-o-transition','margin linear 2s');
                $("#tinyUrl").css('margin-left','200px');
                setTimeout(function(){
                    $("#resetButton").css('visibility','visible');
                },2000);    
            },1000);
        }else{
            y.addClass("openDoor-close");
        }
    }

    function closeDoor(callback){
        var y = $(".closeDoor-open");
        if(y.hasClass("closeDoor-close")){
            y.removeClass("closeDoor-close");
            setTimeout(function(){ callback(); }, 1100);
        }else{
            y.addClass("closeDoor-close");
            setTimeout(function(){ callback(); }, 1100);
        }
    }
    
    $("#resetButton").on('click',function(){
       $(this).css('visibility','hidden'); 
       
       setTimeout(function() {
           $('.closeDoor-open').removeClass('closeDoor-close');
           setTimeout(function() {
               $('.inputLongUrl').append('<p id="invalidUrl">Invalid URL</p><input id = "urlInput" type="text" name="urlInput" placeholder="Enter Longggg URL"/><input class="btn btn-primary" id="submitButton" type="button" value="Generate"/>');
               $('#submitButton').css('margin-left','2px'); 
           },1200);
       }, 1000);
       $("#longUrl").css('margin-left','50px');
       $(".openDoor-open").addClass('openDoor-close');
       $('#tinyUrl').css('visibility','hidden');
       $('#tinyUrl').css('margin-left','0px');
    })
});
