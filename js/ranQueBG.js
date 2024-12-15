const colors = [
    'rgba(0,0,0,0.02)',
    'rgba(173, 216, 230, 0.5)',
    'rgba(230, 230, 250, 0.5)',
    'rgba(255, 182, 193, 0.5)',
    'rgba(255, 253, 208, 0.5)',
    'rgba(255, 228, 181, 0.5)',
    'rgba(144, 238, 144, 0.5)',
    'rgba(144, 238, 144, 0.5)',
    'rgba(255, 255, 224, 0.5)',
    'rgba(255, 239, 213, 0.5)',
    'rgba(211, 211, 211, 0.5)',
  ];
  
const btn=document.querySelector(".change-bg-button");

btn.addEventListener("click", changeBg);

function getAnotherColor(randomColor){
    let randomColor2;
    do{
       randomColor2= colors[Math.floor(Math.random()*colors.length)];
    }while(randomColor===randomColor2);

    return randomColor2;
}


function changeBg(){
    const randomColor = colors[Math.floor(Math.random()*colors.length)];
    const randomColor2=getAnotherColor(randomColor);

    document.body.style.background=`linear-gradient(to right, ${randomColor},${randomColor2})`;

}

changeBg();