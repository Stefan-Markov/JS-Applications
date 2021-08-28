function getInfo() {
    let baseUrl = 'http://localhost:3030/jsonstore/bus/businfo';
    let stopIdInput = document.getElementById('stopId');
    let stopNameDivElement = document.getElementById('stopName');
    let busesList = document.getElementById('buses');

    clearList();

    fetch(`${baseUrl}/${stopIdInput.value}`)
        .then(res => res.json())
        .then(data => {
            stopNameDivElement.textContent = data.name;
            for (const [bus, minutes] of Object.entries(data.buses)) {
                let busInfoListItem = document.createElement('li');
                busInfoListItem.textContent = `Bus ${bus} arrives in ${minutes} minutes`;
                busesList.appendChild(busInfoListItem);
            }
        })
        .catch(error => {
            stopNameDivElement.textContent = 'Error';
        });

    stopIdInput.value = '';
    // stopIdInput.focus();

    function clearList() {
        while (busesList.firstChild) {
            busesList.firstChild.remove();
        }
    }
}