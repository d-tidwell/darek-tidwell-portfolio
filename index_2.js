function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  var myDIV = document.getElementById("myDiv");
  if (isMobile()) {
    myDIV.innerHTML = ` <h1>Sorry this page is only available on desktop</h1>`;
  } else {
   myDIV.innerHTML = `<div class="progress-bar-container">
   <label for="progress-bar">Dialing in...</label>
   <progress id="progress-bar" value="0" max="100"></progress>
    </div>
 
   <video id="video" muted="true" loop preload="auto"  autoplay="true" width="1920" height="1080" src="video/floor_video.mp4" playbackRate="10" playsinline webkit-playsinline ></video>
   <script>
     let count = 0;
     document.addEventListener('mousemove', () => {
       if (count < 1){
         document.getElementById('video').play();
         count += 1;
         console.log(count, "video play button");
       }
     });
   </script>
   
   <canvas class="webgl"></canvas>`
  }