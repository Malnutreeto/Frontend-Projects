function currentTime() {
    let date = new Date(); 
    let hh = date.getHours();
    let mm = date.getMinutes();
    let session = "AM";
  
    if(hh === 0){
        hh = 12;
    }
    if(hh > 12){
        hh = hh - 12;
        session = "PM";
     }
  
     hh = (hh < 10) ? "0" + hh : hh;
     mm = (mm < 10) ? "0" + mm : mm;
    
      
     let time = hh + ":" + mm + ":";
  
    document.getElementById("clock").innerText = time; 
    let t = setTimeout(function(){ 
        currentTime() }, 1000);
  } 
  currentTime();

  function seconds () {
    let data = new Date();
    let ss = data.getSeconds();

    ss = (ss < 10) ? "0" + ss : ss;

    let secs = ss;
    document.getElementById("seconds").innerText = secs;
    let s = setTimeout(function(){
        seconds()}, 1000);
  }
  seconds();

  function currentDay() {
    let day = new Date() ;
    let d = day.getDate();
    let m = day.getMonth()+1;
    let y = day.getFullYear();
    let weekName = day.toLocaleString('default', {weekday: 'short'} );
    let monthName = day.toLocaleString('default', {month: 'short'} );
    let yearName = day.toLocaleString('default', {year: '2-digit'} );
      

    let dataScritta = d + "/" + 0 + m + "/" + y + " " + weekName + " " + monthName + " " + yearName;
    document.getElementById("giornoEanno").innerText = dataScritta;
    let dd = setTimeout(function(){
        currentDay()}, 1000);
  }
  currentDay ();

// let secondHand = document.querySelector('.second-hand');
// let minsHand = document.querySelector('.min-hand');
// let hourHand = document.querySelector('.hour-hand');

//  function setDate() {
//   let now = new Date();

//   let hour = now.getHours();
//   let hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
//   hourHand.style.transform = `rotate(${hourDegrees}deg)`;
//   let mins = now.getMinutes();

//   let minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
//   minsHand.style.transform = `rotate(${minsDegrees}deg)`;

//   let seconds = now.getSeconds();
//   let secondsDegrees = ((seconds / 60) * 360) + 90;
//   secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

//   let sd = setTimeout(function(){
//     setDate()}, 1000);

// }

// setDate();

let secondHand = document.querySelector('.second-hand');
let minsHand = document.querySelector('.min-hand');
let hourHand = document.querySelector('.hour-hand');

 function setDate() {
  let now = new Date();

  let seconds = now.getSeconds();
  let secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  let mins = now.getMinutes();
  let minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  let hour = now.getHours();
  let hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);

setDate();