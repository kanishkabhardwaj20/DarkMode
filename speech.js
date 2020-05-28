var speech = {
  colors : ["dark mode on","dark mode off"],
  start : function () {
 
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speech.recognition = new SpeechRecognition();
    speech.recognition.continuous = false;
    speech.recognition.interimResults = false;
    speech.recognition.lang = "en-US";
    speech.recognition.onerror = function (evt) {
      console.log(evt);
    };
    speech.recognition.onresult = function (evt) {
      
	  var color = evt.results[0][0].transcript;
	  if(color == "dark mode on"){
		var col1 = "#000000";
		var col2 = "#373737";
      if (speech.colors.includes(color)) {
        document.getElementById("voice-cmd").style.backgroundColor = col1;
		document.getElementById("voice-cmd").style.color = "white";
		 document.getElementById("voice-cmd1").style.backgroundColor = col1;
		document.getElementById("voice-cmd1").style.color = "white";
		document.getElementById("voice-cmd2").style.backgroundColor = col2;
		document.getElementById("voice-cmd3").style.backgroundColor = col2;
      } 
      else {
        alert(color + " not recognized - Please try again");
      }
	  }else{
		var col1 = "#ffffff";
		var col2 = "#000000";
      if (speech.colors.includes(color)) {
        document.getElementById("voice-cmd").style.backgroundColor = col1;
		document.getElementById("voice-cmd").style.color = "black";
		document.getElementById("voice-cmd1").style.backgroundColor = col1;
		document.getElementById("voice-cmd1").style.color = "black";
		document.getElementById("voice-cmd2").style.backgroundColor = col2;
		document.getElementById("voice-cmd3").style.backgroundColor = "white";
      } 
      else {
        alert(color + " not recognized - Please try again");
      }  
	  }
      speech.stop();
    };
    speech.recognition.start();
    document.getElementById('voice-on').disabled = true;
    document.getElementById('voice-off').disabled = false;
  },
 
  stop : function () {

    if (speech.recognition != null) {
      speech.recognition.stop();
      speech.recognition = null;
      document.getElementById('voice-on').disabled = false;
      document.getElementById('voice-off').disabled = true;
    }
  }
};

window.addEventListener("load", function () {
  if (window.hasOwnProperty('SpeechRecognition') || window.hasOwnProperty('webkitSpeechRecognition')) {
    navigator.permissions.query({name: 'microphone'}).then(function (result) {
      if (result.state == 'denied') {
        document.getElementById("voice-cmd").innerHTML = "Please manually enable access to microphone";
      } else {
        navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
          document.getElementById('voice-on').disabled = false;
        })
        .catch(function(err) {
          document.getElementByI("voice-cmd").innerHTML = "Please enable access and attach a microphone";
        });
      }
    });
  } else {
    document.getElementById("voice-cmd").innerHTML = "Speech Recognition not supported on your browser";
  }
});