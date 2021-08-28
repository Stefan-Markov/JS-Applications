function render(html, data) {
    let pattern = /{{(\w+)}}/gm;

    let result = html.replace(/\?disabled={{(\w+)}}/gm, (match, propName) => {
        return data[propName] ? 'disabled' : '';
    });

    result = result.replace(pattern, (match, propName) => {
        return data[propName];
    });

    return result;
}

export default render;