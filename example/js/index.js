const modal = document.getElementById("myModal");
let infoModal = document.querySelector(`.modal`);
const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com';
let planets=  [];

async function getKey() {
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    if (response.status === 200) {
    const data = await response.json();
    return data.key;
    console.log(data);
  } else {
    console.error('Could not fetch key!')
  }
}

async function getPlanets() {
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
      headers: {
        'x-zocom': key
    }
    });
    const data = await response.json();
    console.log(data);

    planets = data.bodies;

    planets.forEach((planet) => {
        if (planet.id === 6) {
          document.getElementById(
            "planeter"
          ).innerHTML += `
          <div class="circle-div">
            <div id="planet${planet.id}">
          </div>
            <div id="saturnus-line">
          </div>
        </div>`;
        } else {
          document.getElementById(
            "planeter"
          ).innerHTML += `<div id="planet${planet.id}"></div>`;
        }
      });


planets.forEach((planet) => {
    document.getElementById(`planet${planet.id}`)
      .addEventListener("click", () => {
        const element = document.querySelector(`#planet${planet.id}`);
        const style = getComputedStyle(element);
        const backgroundColor = style.backgroundColor;

        document.getElementById("choosed-planet").style.backgroundColor = `${backgroundColor}`

        document.getElementById("rubrik").innerHTML = `${planet.name}`; 
        document.getElementById("latin").innerHTML = `${planet.latinName}`;
        document.getElementById("info").innerHTML = `${planet.desc}`;
        document.getElementById("circumference").innerHTML = `${planet.circumference}`;
        document.getElementById("distance").innerHTML = `${planet.distance}`;
        document.getElementById("max-temp").innerHTML = `${planet.temp.day}`;
        document.getElementById("min-temp").innerHTML = `${planet.temp.night}`;
        document.getElementById("moons").innerHTML = `${planet.moons}`;

        infoModal.style.display = "block";
      });
  });
}

getKey();
getPlanets();

let close = document.getElementsByClassName("close")[0];
 close.onclick = function() {
  modal.style.display = "none";
}


