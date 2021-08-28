function getInfo() {
    let stopIdElement = document.getElementById('stopId');
    let stopNameElement = document.getElementById('stopName');
    let ulBusElement = document.getElementById('buses');

    let stopIdValue = stopIdElement.value;

    const baseUrl = 'http://localhost:3030/jsonstore/bus/businfo/';

    fetch(`${baseUrl}${stopIdValue}`)
        .then(response => response.json())
        .then(data => {
            stopNameElement.textContent = data.name;

            while (ulBusElement.firstChild) {
                ulBusElement.firstChild.remove();
            }

            for (const busId in data.buses) {
                let li = document.createElement('li');

                li.textContent = `Bus ${busId} arrives in ${data.buses[busId]}`;

                ulBusElement.appendChild(li);
            }
        })
        .catch(error => {
            stopNameElement.textContent = 'Error';

            while (ulBusElement.firstChild) {
                ulBusElement.firstChild.remove();
            }
        });

    stopIdElement.value = '';
}