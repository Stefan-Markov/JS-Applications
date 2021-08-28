export function queryEncoder(queryObject) {
    return Object.entries(queryObject)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
}