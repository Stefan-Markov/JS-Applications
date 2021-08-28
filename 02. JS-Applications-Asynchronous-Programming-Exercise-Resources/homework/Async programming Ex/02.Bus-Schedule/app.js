function solve() {
  let departBtn = document.getElementById("depart");
  let arriveBtn = document.getElementById("arrive");
  let info = document.querySelector("#info span");

  let stop = {
    next: "depot",
  };

  function depart() {
    let baseUrl = "http://localhost:3030/jsonstore/bus/schedule/";

    fetch(`${baseUrl}/${stop.next}`) 
      .then((res) => res.json())
      .then((data) => {
        stop = data;
        info.textContent = `Next stop ${stop.name}`;
        departBtn.disabled = true;
        arriveBtn.disabled = false;
      })
      .catch((error) => {
        info.textContent = `Error`;
        departBtn.disabled = true;
        arriveBtn.disabled = true;
      });
  }

  function arrive() {
    // no need to fetch 2nd time
    // let baseUrl = "http://localhost:3030/jsonstore/bus/schedule/";

    // fetch(`${baseUrl}/${stop.next}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     stop = data;
        info.textContent = `Arriving at ${stop.name}`;
        departBtn.disabled = false;
        arriveBtn.disabled = true;
      //})
    //   .catch((error) => {
    //     info.textContent = `Error`;
    //     departBtn.disabled = true;
    //     arriveBtn.disabled = true;
    //   });
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
