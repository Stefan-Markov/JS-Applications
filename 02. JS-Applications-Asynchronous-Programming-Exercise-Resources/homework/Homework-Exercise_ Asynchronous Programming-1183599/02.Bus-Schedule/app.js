function solve() {

    let infoDivElement = document.querySelector('#info span');
    let departBtnElement = document.querySelector('#depart');
    let arriveBtnElement = document.querySelector('#arrive');

    const baseUrl = 'http://localhost:3030/jsonstore/bus/schedule/';
    let currentStopId = 'depot';
    let nextStopId;

    function depart() {
        travel('depart');

        departBtnElement.disabled = true;
        arriveBtnElement.disabled = false;
    }

    function arrive() {
        travel('arrive');

        departBtnElement.disabled = false;
        arriveBtnElement.disabled = true;
    }

    function travel(command) {

        fetch(`${baseUrl}${currentStopId}`)
            .then(response => response.json())
            .then(data => {
                infoDivElement.textContent = command === 'arrive'
                    ? `Arriving at ${data.name}` : `Next stop ${data.name}`;

                if (command === 'arrive') {
                    currentStopId = nextStopId;

                } else {
                    nextStopId = data.next;
                }
            })
            .catch(error => {
                infoDivElement.textContent = 'Error';
                departBtnElement.disabled = true;
                arriveBtnElement.disabled = true;
            });
    }

    return {
        depart,
        arrive
    };
}

let result = solve();