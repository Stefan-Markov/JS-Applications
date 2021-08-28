function solve() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/schedule';
    let departButton = document.getElementById('depart');
    let arriveButton = document.getElementById('arrive');
    let currentBusStopId = 'depot';
    let info = document.querySelector('div#info span.info');

    function depart() {
        fetchAndManageData(true, false);
    }

    function arrive() {
        fetchAndManageData(false, true);
    }

    function fetchAndManageData(departButtonState, arriveButtonState) {
        fetch(`${baseUrl}/${currentBusStopId}`)
            .then(res => res.json())
            .then(data => {
                info.textContent = switchInfoMessage(data);
                departButton.disabled = departButtonState;
                arriveButton.disabled = arriveButtonState;
                currentBusStopId = data.next;
            });
    }

    function switchInfoMessage(data) {
        if (departButton.disabled) {
            return `Arriving at ${data.name}`;
        } else {
            return `Next stop ${data.name}`;
        }
    }

    return {
        depart,
        arrive
    };
}

let result = solve();