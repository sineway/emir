if (!/^[A-Za-z0-9]{32}$/.test(localStorage.apiToken)) {
    localStorage.apiToken = prompt("API token");
}
