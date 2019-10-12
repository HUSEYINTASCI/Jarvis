
var userpa3;
var t;
var s;
var lasttranscript;
var d = new Date();
document.querySelector("#time").innerHTML = d;
var voice;
var text;
var gs;
var uc;
//-------------------------------------------------------------------------------------------------------------------------------------

//Recognition user
function rec() {
  window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
  lasttranscript = '';
  let recognition = new window.SpeechRecognition();

  recognition.interimResults = true;
  recognition.maxAlternatives = 5;
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
    t = document.querySelector("#note_input").innerHTML = lasttranscript;

    if (t.indexOf("how are you") > -1) {

      speak("I am great ,  How about you");
  
      clean();
    } else if (t.indexOf("name") > -1) {
  
      speak("My name is, Jarvis, nice to meet you");
      clean();
    } else if (t.indexOf("name") > -1) {
  
      speak("");
      clean();
    } else if (t.indexOf("hey") > -1) {
  
      speak("Hi , How may help you to day");
      clean();
    } else if (t.indexOf("understand") > -1) {
  
      speak("Yes i can understand you but ,  i can not thing as a human , right now , but some future,  who knows");
      clean();
    }else if (t.indexOf("does mean") > -1) {
  
      speak("J.A.R.V.I.S.  , (Stands for Just A Rather Very Intelligent System), also stylized as JARVIS , or Jarvis , is a highly advanced computerized  A.I. , developed by , Harry ");
      clean();
    }else if (t.indexOf("search") > -1) {
      speak("sure");
      s=t;
     search();
      
      clean();
    }else if (t.indexOf("close") > -1) {
      speak("sure");
       
     cls();
      
      clean();
    }   else if (t.indexOf("movie") > -1) {
      uc=t.slice(5);
      mv();
      speak("Here is the movie information")
      clean();
    } else if (t.indexOf("song") > -1) {
  
      song();
      speak("Here is the song ")
      clean();
    } else if (t.indexOf("find") > -1) {
  
      speak("Yes sure , what exactly you want me to  find , movie , or , song, and , i can search to google if you want , just say search");
      clean();
    } else if (t.indexOf("thank you") > -1) {
  
      speak("it's my pleasure");
      clean();
    } else {
  
     // speak("sorry , i can not hear you very well , can you try again");
     //  clean();
  
    }
  }
  recognition.start();

}
$(document).on("click","body",function(){
$("#note_input").text("I'm Listening You !");

})

$(document).ready(function () {


  rec();

});

function speak(e) {

  text = new SpeechSynthesisUtterance(e);
  voice = window.speechSynthesis.getVoices();
  text.voice = voice[0];
  window.speechSynthesis.speak(text);

}

function clean() {
  $("#note_input").innerHTML = "";
  lasttranscript = "";
}

function search()
{
      url ='http://www.google.com/search?q=' + s;
       gs=  window.open(url,'_blank');
}
function cls(){

  gs.close();
}

//----------------------------------------------------------------------------------------------------------------------------------


function mv() {
  $("#downline").css("display", "block");
  $("#downline").empty();
  var murl = "https://www.omdbapi.com/?"+uc+"&apikey=trilogy";



  $.ajax({
    url: murl,
    method: "GET"
  }).then(function (response) {
    var image = $("<img class=" + "mposter" + ">");
    var plot = $("<p>");
    var title = $("<p>");

    title.text(response.Title);
    image.attr("src", response.Poster);
    plot.text(response.Plot);

    $("#downline").append(title, image, plot);
    $("#eart").css("display","none");
  });
}

function song() {
  $("#downline").css("display", "block");
  $("#downline").empty();
  var frame = $("<iframe width=" + "560" + " height=" + "315" + " src=" + "https://www.youtube.com/embed/TrmWoBneIww" + " frameborder=" + "0" + " allow=" + "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" + " allowfullscreen></iframe>")
  $("#downline").append(frame);
  $("#eart").css("display","none");
}