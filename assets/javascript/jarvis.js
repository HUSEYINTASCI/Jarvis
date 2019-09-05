 
var userpa3;
var t;
var lasttranscript;
//-------------------------------------------------------------------------------------------------------------------------------------

//Recognition user
function rec(){
window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
lasttranscript = '';
let recognition = new window.SpeechRecognition();
 
recognition.interimResults = true;
recognition.maxAlternatives = 10;
recognition.continuous = true;
recognition.onresult = (lis) => {
  let itranscript = '';

  for (let i = lis.resultIndex, len = lis.results.length; i < len; i++) {
    let transcript = lis.results[i][0].transcript;
    if (lis.results[i].isFinal) {
      lasttranscript += transcript;
    } else {
      itranscript += transcript;
    }
  }
 t= document.querySelector("#note_input").innerHTML = lasttranscript;
 
}
recognition.start();
 
}


$(document).ready(function () {
 

rec();

});


 

 $(document).on("click","body",function(){

  sp();
  
   });

var voice;
var text;
function speak(e){

text=new SpeechSynthesisUtterance(e);
 voice=window.speechSynthesis.getVoices();
text.voice=voice[0];
window.speechSynthesis.speak(text);

}


 

 

function clean(){
 $("#note_input").innerHTML ="";
  lasttranscript="";
}

function sp(){
  
  t=$("#note_input").text();
  
     
    
  if (t.indexOf("how are you") > -1) {  
  
    speak("I am great ,  How about you");
  
  clean();
  }else if (t.indexOf("name") > -1){
  
    speak("My name is, Jarvis, nice to meet you");
  clean();
  }else if (t.indexOf("hey") > -1){
  
    speak("Hi , How may help you to day");
  clean();
  }else if (t.indexOf("understand") > -1){
    
    speak("Yes i can understand you but ,  i can not thing as a human , right now , but some future,  who knows");
  clean();
  }else if (t.indexOf("movie") > -1){
     
     mv();
     speak("Here is the movie information")
    clean();
  }else if (t.indexOf("song") > -1){
     
    song();
    speak("Here is the song ")
   clean();
 }else if (t.indexOf("find") > -1){
     
    speak("Yes sure , what exactly you want me to  find , movie , or , song");
    clean();
  }else if (t.indexOf("thank you") > -1){
     
    speak("it's my pleasure");
    clean();
  }else{
  
    speak("sorry , i can not hear you very well , can you try again");
    clean();
  
  }
   

}
 

//----------------------------------------------------------------------------------------------------------------------------------


function mv(){
  $("#downline").css("display","block");
  $("#downline").empty();
var murl = "https://www.omdbapi.com/?t=superman&apikey=trilogy";

 

$.ajax({
  url: murl,
  method: "GET"
}).then(function(response) {
          var image = $("<img class="+"mposter"+">");
          var plot=$("<p>");
         var title=$("<p>");

         title.text(response.Title);
         image.attr("src",response.Poster);
         plot.text(response.Plot);
   
         $("#downline").append(title,image,plot);
              
});
}

function song(){
  $("#downline").css("display","block");
  $("#downline").empty();
  var frame=$("<iframe width="+"560"+" height="+"315"+" src="+"https://www.youtube.com/embed/TrmWoBneIww"+" frameborder="+"0"+" allow="+"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"+" allowfullscreen></iframe>")
  $("#downline").append(frame);
}