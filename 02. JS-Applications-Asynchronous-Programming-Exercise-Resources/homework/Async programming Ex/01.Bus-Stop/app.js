function getInfo() {
  let baseUrl = "http://localhost:3030/jsonstore/bus/businfo/";
  let stopId = document.getElementById("stopId").value;
  let stopName = document.getElementById("stopName");
  let buses = document.getElementById("buses");

  fetch(`${baseUrl}/${stopId}`)
    .then((res) => res.json())
    .then((bus) => {
      stopName.textContent = bus.name;
      Array.from(buses.querySelectorAll("li")).forEach(li => li.remove());

      Object.keys(bus.buses).forEach((busLine) => {
        let li = document.createElement("li");
        buses.appendChild(li);
        li.textContent = `Bus ${busLine} arrives in ${bus.buses[busLine]}`;
      });
    })
    .catch((error) => {
      stopName.textContent = `Error`;
      Array.from(buses.querySelectorAll("li")).forEach(li => li.remove());
    });
}
