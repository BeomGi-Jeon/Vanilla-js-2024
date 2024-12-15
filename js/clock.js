    function updateClock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
  

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
  

    clockElement.innerText = `${hours}시 ${minutes}분`;
  }
  

  setInterval(updateClock, 1000);
  
  updateClock();