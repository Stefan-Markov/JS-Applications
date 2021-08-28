function lockedProfile() {
    let profilesBaseUrl = 'http://localhost:3030/jsonstore/advanced/profiles';
    let mainSection = document.getElementById('main');

    fetch(profilesBaseUrl)
        .then(response => response.json())
        .then(data => {

            let initialProfile = document.querySelector('div.profile');
            setProfileButton(initialProfile);
            let newProfile;
            let userCounter = 1;
            let dataSize = Object.size(data);

            for (const profileData in data) {
                let userNameInput = `input[name="user${userCounter}Username"]`;
                document.querySelector(userNameInput).value = data[profileData].username;
                let emailInput = `input[name="user${userCounter}Email"]`;
                document.querySelector(emailInput).value = data[profileData].email;
                let ageInput = `input[name="user${userCounter}Age"]`;
                document.querySelector(ageInput).value = data[profileData].age;

                if (userCounter < dataSize) {
                    [newProfile, userCounter] = createNewProfile(initialProfile, newProfile, userCounter);
                    mainSection.appendChild(newProfile);
                }
            }
        })
        .catch(error => console.log(error));

    function createNewProfile(template, newProfile, userCounter) {
        newProfile = template.cloneNode(true);
        let profileLocks = newProfile.querySelectorAll('input[name="user1Locked"]');
        profileLocks[0].name = `user${userCounter + 1}Locked`;
        profileLocks[1].name = `user${userCounter + 1}Locked`;
        newProfile.querySelector('div#user1HiddenFields').id = `user${userCounter + 1}HiddenFields`;
        newProfile.querySelector('input[name="user1Username"]').name = `user${userCounter + 1}Username`;
        newProfile.querySelector('input[name="user1Email"]').name = `user${userCounter + 1}Email`;
        newProfile.querySelector('input[name="user1Age"]').name = `user${userCounter + 1}Age`;
        setProfileButton(newProfile);
        userCounter += 1;
        return [newProfile, userCounter];
    }

    function setProfileButton(profileDiv) {

        profileDiv.querySelector('div.profile input[value="lock"]').addEventListener('click', (e) => {
            e.target.parentNode.querySelector('button').disabled = true;
        });
        profileDiv.querySelector('div.profile input[value="unlock"]').addEventListener('click', (e) => {
            e.target.parentNode.querySelector('button').disabled = false;
        });

        profileDiv.querySelector('button')
            .addEventListener('click', (e) => {
                let buttonShowHide = e.target;
                let userInfoDiv = buttonShowHide.parentNode.querySelector('div');
                let radioButton = buttonShowHide.parentNode.querySelector('input[type="radio"]:checked');

                if (radioButton.value === 'unlock') {
                    if (userInfoDiv.style.display === 'block') {
                        userInfoDiv.style.display = 'none';
                        buttonShowHide.innerText = 'Show more';
                    } else {
                        userInfoDiv.style.display = 'block';
                        buttonShowHide.innerText = 'Hide it';
                    }
                }
            });
    }

    Object.size = function (obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };
}