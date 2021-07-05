import apiReady from "/api/main.js";

apiReady.then(async () => {
    let item = await application.load(new URL(location).searchParams.get("id"));
    document.title = item.name;

    let audits = application.audit(item);

    let template = document.querySelector("#success");
    let fragment = template.content.cloneNode(true);

    fragment.textContent = JSON.stringify(audits);
    document.body.prepend(fragment);

}).catch(error => {
    console.debug(error);

    let [title, ...description] = `${ error }`.split(":");
    document.title = title;

    let template = document.querySelector("#failure");
    let fragment = template.content.cloneNode(true);

    fragment.textContent = description.join(":");
    document.body.prepend(fragment);
});
