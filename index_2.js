function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
  var myDIV = document.getElementById("myDiv");
  if (isMobile()) {
    fetch('2d_html.html')
        .then(response => response.text())
        .then(data => {
        myDIV.innerHTML = data;
    })
        .catch(error => console.error(error));
  } else {
    fetch('3d_html.html')
    .then(response => response.text())
    .then(data => {
        myDIV.innerHTML = data;
    })
    .catch(error => console.error(error));
  }