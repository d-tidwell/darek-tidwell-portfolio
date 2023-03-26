function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  if (isMobile()) {
    document.body.innerHTML = `<div class="navbar">
      <nav class="navbar navbar-expand-lg navbar-dark shadow-5-strong">
          <a class="navbar-brand" href="#">Darek Tidwell - Software Developer</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://docs.google.com/document/d/1jZqIvZcVZWQkfJU9TESe29JKVjbm_ljHd53KlaldIGw/edit?usp=sharing" target="_blank">Resume</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Projects
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-item" href="https://github.com/d-tidwell/aipr" target="_blank">AiPR-AutoCommit Message CLI</a>
                  <a class="dropdown-item" href="" target="_blank">TBD Capstone Project</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="https://github.com/d-tidwell/darek-tidwell-portfolio" target="_blank">3D Portfolio Code</a>
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="https://github.com/d-tidwell" target="_blank"><img src="logos/github-mark (1)/github-mark/github-mark-white.png" width="23" height="22.5" alt="github_logo"></a>
              </li>
            </ul>
          </div>
        </nav>
  </div>
  <div> <h1>Sorry this page is only available on desktop</h1>`;
  } else {
   document.getElementById("myDiv").remove();
   document.body.innerHTML = `<div class="progress-bar-container">
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
   
   <canvas class="webgl"></canvas>
   `
  }