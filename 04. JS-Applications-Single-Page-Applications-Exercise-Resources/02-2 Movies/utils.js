export function ce(tag, spec, ...content) {
    let result = document.createElement(tag);

    let specKeys = Object.keys(spec);

    if (specKeys.length > 0) {
        specKeys.forEach((key) => {
            if (key.slice(0, 2) === "on") {
                result.addEventListener(key.substring(2).toLowerCase(), spec[key]);
            } else {
                result.setAttribute(key, spec[key]);
            }
        });
    }

    content.forEach((c) => {
        if (typeof c !== "object") {
            if (tag === "input" || tag === "textarea") {
                result.value = c;
            } else {
                result.innerText = c;
            }
        } else {
            result.appendChild(c);
        }
    });

    return result;
}

let utils = { ce };

export default utils;