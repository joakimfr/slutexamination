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

  planets.map((planet) => {
    document.getElementById(
      "planeter"
    ).innerHTML += `<div id="planet${planet.id}">${planet.name}</div>`;
});

//get more info when clicking on a planet
planets.map((planet) => {
    document
      .getElementById(`planet${planet.id}`)
      .addEventListener("click", () => {
        document.getElementById(
          "planetInfo"
        ).innerHTML = `${planet.name} is a ${planet.type} and has a latin name of ${planet.latinName}`;
      });
  });
}



getKey();
getPlanets();

