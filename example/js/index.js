const modal = document.getElementById("myModal");
let playAgainModal = document.querySelector(`.modal`);
const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
// API nyckel att använda ifall man enbart siktar på godkänt: solaris-vKkkQHqQboi7c6JF
let planets=  [];

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    const data = await response.json();
    console.log(data);
}

async function getPlanets() {
    const response = await fetch(`${BASE_URL}/bodies`, {
        headers: {
            'x-zocom': 'solaris-vKkkQHqQboi7c6JF'
        }
    });
    const data = await response.json();
    console.log(data);

    planets = data.bodies;

    planets.forEach((planet) => {
        if (planet.id === 6) {
          document.getElementById(
            "planeter"
          ).innerHTML += `<div class="circle-div"><div id="planet${planet.id}"></div>
          <div id="saturnus-line"></div></div>`;
        } else {
          document.getElementById(
            "planeter"
          ).innerHTML += `<div id="planet${planet.id}"></div>`;
        }
      });


planets.forEach((planet) => {
    document
    
      .getElementById(`planet${planet.id}`)
      .addEventListener("click", () => {
        const element = document.querySelector(`#planet${planet.id}`);
        const style = getComputedStyle(element);
        const backgroundColor = style.backgroundColor;

        document.getElementById("valdplanet").style.backgroundColor = `${backgroundColor}`

        document.getElementById("rubrik").innerHTML = `${planet.name}`; 
        document.getElementById("latin").innerHTML = `${planet.latinName}`;
        document.getElementById("info").innerHTML = `${planet.desc}`;
        document.getElementById("circumference").innerHTML = `OMKRETS <br/> ${planet.circumference}`;
        document.getElementById("distance").innerHTML = `KM från solen <br/> ${planet.distance}`;
        document.getElementById("max-temp").innerHTML = `MAX TEMPERATUR <br/> ${planet.temp.day}`;
        document.getElementById("min-temp").innerHTML = `MIN TEMPERATUR <br/> ${planet.temp.night}`;
        document.getElementById("moons").innerHTML = `MÅNAR <br/> ${planet.moons}`;

        playAgainModal.style.display = "block";
      });
  });
}



getKey();
getPlanets();


let close = document.getElementsByClassName("close")[0];
 close.onclick = function() {
  modal.style.display = "none";
}


