function lockedProfile() {
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/profiles';

    let mainElement = document.querySelector('#main');

    fetch(`${baseUrl}`)
        .then(response => response.json())
        .then(data => {
            for (const profileData of Object.values(data)) {

                let profileDiv = document.createElement('div');
                profileDiv.classList.add('profile');

                let pictureImg = document.createElement('img');
                pictureImg.src = './iconProfile2.png';
                pictureImg.classList.add('.userIcon');
                profileDiv.appendChild(pictureImg);

                let lockLabel = document.createElement('label');
                lockLabel.textContent = 'Lock ';
                profileDiv.appendChild(lockLabel);

                let inputRadioLock = document.createElement('input');
                inputRadioLock.type = 'radio';
                inputRadioLock.name = `${profileData._id}`;
                inputRadioLock.value = 'lock';
                inputRadioLock.checked = true;
                profileDiv.appendChild(inputRadioLock);

                let unlockLabel = document.createElement('label');
                unlockLabel.textContent = ' Unlock ';
                profileDiv.appendChild(unlockLabel);

                let inputRadioUnlock = document.createElement('input');
                inputRadioUnlock.type = 'radio';
                inputRadioUnlock.name = `${profileData._id}`;
                inputRadioUnlock.value = 'unlock';
                profileDiv.appendChild(inputRadioUnlock);

                let br = document.createElement('br');
                let hr1 = document.createElement('hr');
                profileDiv.appendChild(br);
                profileDiv.appendChild(hr1);

                let usernameLable = document.createElement('label');
                usernameLable.textContent = 'Username';
                profileDiv.appendChild(usernameLable);

                let usernameInput = document.createElement('input');
                usernameInput.type = 'text';
                usernameInput.name = profileData._id;
                usernameInput.value = profileData.username;
                usernameInput.disabled = true;
                usernameInput.readOnly = true;
                profileDiv.appendChild(usernameInput);

                let hiddenFieldsDiv = document.createElement('div');
                hiddenFieldsDiv.id = `${profileData._id}`;
                hiddenFieldsDiv.style.display = 'none';

                let hr2 = document.createElement('hr');
                hiddenFieldsDiv.appendChild(hr2);

                let emailLabel = document.createElement('label');
                emailLabel.textContent = 'Emal:';
                hiddenFieldsDiv.appendChild(emailLabel);

                let emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.name = profileData._id;
                emailInput.value = profileData.email;
                emailInput.disabled = true;
                emailInput.readOnly = true;
                hiddenFieldsDiv.appendChild(emailInput);

                
                let ageLabel = document.createElement('label');
                ageLabel.textContent = 'Age:';
                hiddenFieldsDiv.appendChild(ageLabel);

                let ageInput = document.createElement('input');
                ageInput.type = 'email';
                ageInput.name = profileData._id;
                ageInput.value = profileData.age;
                ageInput.disabled = true;
                ageInput.readOnly = true;
                hiddenFieldsDiv.appendChild(ageInput);


                profileDiv.appendChild(hiddenFieldsDiv);

                let showMoreHideBtn = document.createElement('button');
                showMoreHideBtn.textContent = 'Show more';
                profileDiv.appendChild(showMoreHideBtn);

                showMoreHideBtn.addEventListener('click', () => {
                    if (inputRadioLock.checked) {
                        return;
                    }
                    
                    hiddenFieldsDiv.style.display = hiddenFieldsDiv.style.display === 'block' ? 'none' : 'block';
                    showMoreHideBtn.textContent = showMoreHideBtn.textContent === 'Show more' ? 'Hide it' : 'Show more';
                })

                mainElement.appendChild(profileDiv);
            }
        })

}