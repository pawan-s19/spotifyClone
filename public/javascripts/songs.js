
      function isPaused(audio) {
        if (audio.paused) {
          return true;
        } else {
          return false;
        }
      }
      var playingGrid;
      var mainAudio = document.querySelector("#mainaudio");
      document
        .querySelector(".layout")
        .addEventListener("click", function (dets) {
          
          if (dets.target.className === "cover") {
          playingGrid = dets.target.parentNode;
         
            if (isPaused(mainAudio)) {
              if (mainAudio.src != dets.target.parentNode.childNodes[7].src) {
                mainAudio.setAttribute(
                  "src",
                  dets.target.parentNode.childNodes[7].src
                );
                
              }
              mainAudio.play();
              playingGrid.childNodes[5].childNodes[1].childNodes[3].childNodes[1].style.color = "white"
              dets.target.parentNode.childNodes[3].innerHTML = `<i id="pauseAndPlay" class="ri-pause-fill"></i>`;
             
              document.querySelector("#cir").className = "ri-pause-fill"

            } else {
              if (dets.target.parentNode.childNodes[7].src === mainAudio.src) {
                mainAudio.pause();
                dets.target.parentNode.childNodes[3].innerHTML = `<i id="pauseAndPlay" class="ri-play-fill"></i>`;
                document.querySelector("#cir").className = "ri-play-fill"

              } else {
                mainAudio.setAttribute(
                  "src",
                  dets.target.parentNode.childNodes[7].src
                );
                mainAudio.play();
              }
            }
          }
        });
      document
        .querySelector(".layout")
        .addEventListener("mousemove", function (dets) {
          if (dets.target.className === "cover") {
            if(isPaused(mainAudio)){
              dets.target.parentNode.childNodes[3].innerHTML = `<i id="pauseAndPlay" class="ri-play-fill"></i>`;
            }
            else {
              if(dets.target.parentNode.childNodes[7].src === mainAudio.src){
                dets.target.parentNode.childNodes[3].innerHTML = `<i id="pauseAndPlay" class="ri-pause-fill"></i>`;
              }
              else{
                dets.target.parentNode.childNodes[3].innerHTML = `<i id="pauseAndPlay" class="ri-play-fill"></i>`;
              }
            }
          }
        });
      document
        .querySelector(".layout")
        .addEventListener("mouseout", function (dets) {
          if (dets.target.className === "cover") {
            dets.target.parentNode.childNodes[3].innerHTML = "1";
          }
        });
mainAudio.addEventListener("timeupdate",function(dets){
var currentTime = dets.target.currentTime;
var duration = dets.target.duration;

var value = (currentTime/duration)*100;
document.querySelector(".mover").style.width = `${value}%`
})
document.querySelector(".bigmeter").addEventListener("mousemove",function(){
  document.querySelector(".mover").style.backgroundColor = "green"
  document.querySelector(".bob").style.display = "flex"
})
document.querySelector(".bigmeter").addEventListener("mouseout",function(){
  document.querySelector(".mover").style.backgroundColor = "white"
  document.querySelector(".bob").style.display = "none"

})

document.querySelector("#cir").addEventListener("click",function(){
if(isPaused(mainAudio)){
  mainAudio.play();
            
document.querySelector("#cir").className = "ri-pause-fill"
}
else{
  mainAudio.pause();
  document.querySelector("#cir").className ="ri-play-fill"
}
})
var meter = document.querySelector(".meter")
meter.addEventListener("click",function(dets){

  var offset = dets.offsetX

  mainAudio.currentTime = (offset/meter.clientWidth)*mainAudio.duration

})

document.querySelector("#next").addEventListener("click",function(){

  playingGrid = playingGrid.nextElementSibling;
  
  mainAudio.src = playingGrid.childNodes[7].src;
  mainAudio.play()
})
document.querySelector("#previous").addEventListener("click",function(){
playingGrid = playingGrid.previousElementSibling;


mainAudio.src = playingGrid.childNodes[7].src;
mainAudio.play();
})