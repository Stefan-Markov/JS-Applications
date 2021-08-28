function lockedProfile() {
  //async taking the data
  //http://localhost:3030/jsonstore/advanced/profiles

  let template = document.querySelector(".profile");
  template.style.display = "none";

  async function myFetch() {
    let response = await fetch(
      "http://localhost:3030/jsonstore/advanced/profiles"
    );
    return await response.json();
  }

  (async () => {
    let profileRequest = await fetch(
      "http://localhost:3030/jsonstore/advanced/profiles"
    );
    let profiles = await profileRequest.json();

    await myFetch();
    // console.log(profiles);
    let profileStructure = document.querySelector("#main");

    Object.keys(profiles).forEach((key, i) => {
      let profile = profiles[key];
      // console.log(profile);
      let htmlProfile = createProfile(
        i + 1,
        profile.username,
        profile.email,
        profile.age
      );
      profileStructure.appendChild(htmlProfile);
    });
  })();

  myFetch().catch((e) => {
    console.log(
      "There has been a problem with your fetch operation: " + e.message
    );
  });
  //make the HTML structure for the received data using the example

  function createProfile(userIndex, username, email, age) {
    let profileDiv = document.createElement("div");
    profileDiv.classList.add("profile");

    let imgTag = document.createElement("img");
    imgTag.classList.add("userIcon");
    imgTag.src = "./iconProfile2.png";
    let labelLock = document.createElement("label");
    labelLock.textContent = "Lock";
    let inputRadio = document.createElement("input");
    inputRadio.type = "radio";
    inputRadio.name = `user${userIndex}Locked`;
    inputRadio.value = "locked";
    inputRadio.checked = true;

    let labelUnlock = document.createElement("label");
    labelUnlock.textContent = "Unlock";
    let inputRadio1 = document.createElement("input");
    inputRadio1.type = "radio";
    inputRadio1.name = `user${userIndex}Locked`;
    inputRadio1.value = "unlock";

    let br = document.createElement("br");
    let hr = document.createElement("hr");

    let labelUsername = document.createElement("label");
    labelUsername.textContent = "Username";
    let inputText = document.createElement("input");
    inputText.type = "text";
    inputText.name = `user${userIndex}Username`;
    inputText.value = username;
    inputText.readOnly = true;
    inputText.disabled = true;

    let hiddenFields = document.createElement("div");
    hiddenFields.setAttribute("id", "user1HiddenFields");
    let btnShow = document.createElement("button");
    btnShow.textContent = "Show more";
    btnShow.addEventListener("click", toggleInfo);

    profileDiv.appendChild(imgTag);
    profileDiv.appendChild(labelLock);
    profileDiv.appendChild(inputRadio);
    profileDiv.appendChild(labelUnlock);
    profileDiv.appendChild(inputRadio1);
    profileDiv.appendChild(br);
    profileDiv.appendChild(hr);
    profileDiv.appendChild(labelUsername);
    profileDiv.appendChild(inputText);
    profileDiv.appendChild(hiddenFields);
    profileDiv.appendChild(btnShow);

    let hr1 = document.createElement("hr");

    let labelEmail = document.createElement("label");
    labelEmail.textContent = "Email:";
    let inputEmail = document.createElement("input");
    inputEmail.type = "email";
    inputEmail.name = `user${userIndex}Email`;
    inputEmail.value = email;
    inputEmail.readOnly = true;
    inputEmail.disabled = true;

    let labelAge = document.createElement("label");
    labelAge.textContent = "Age:";
    let inputAge = document.createElement("input");
    inputAge.type = "email";
    inputAge.name = `user${userIndex}Age`;
    inputAge.value = age;
    inputAge.readOnly = true;
    inputAge.disabled = true;

    hiddenFields.appendChild(hr1);
    hiddenFields.appendChild(labelEmail);
    hiddenFields.appendChild(inputEmail);
    hiddenFields.appendChild(labelAge);
    hiddenFields.appendChild(inputAge);

    return profileDiv;
  }

  function toggleInfo(e) {
    let button = e.target;
    let profile = e.target.parentElement;
    let radioButton = profile.querySelector(`input[type="radio"]:checked`);

    if (radioButton.value === "unlock") {
      let hiddenFieldEl = button.previousElementSibling; // one el before the button

      hiddenFieldEl.style.display =
        hiddenFieldEl.style.display === "block" ? "none" : "block";
      button.textContent =
        button.textContent === "Show more" ? "Hide it" : "Show more";
    } else {
        return
    }
  }
}
