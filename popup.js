import TimeUnit from "/api/TimeUnit.js";

let $ = (selector, root = document) => {
    return root.querySelector(selector);
};

let $$ = (selector, root = document) => {
    return root.querySelectorAll(selector);
};

// ...get estimates...

$("body").replaceChildren($("#main-template").content);

// ...iterate over estimates...

    let fragment = $("#row-template").content.cloneNode(true);
    // ...fill cells...
    $("#row-template").before(fragment);

    $("#rowgroup-row-template").before(...[
        ["Hourly",  TimeUnit.HOUR ],
        ["Daily",   TimeUnit.DAY  ],
        ["Weekly",  TimeUnit.WEEK ],
        ["Monthly", TimeUnit.MONTH],
        ["Annualy", TimeUnit.YEAR ]
    ].map(([title, value]) => {
        let fragment = $("#rowgroup-row-template").content.cloneNode(true);
        // ...fill cells...
        let [c1, c2, c3, c4] = $$(".table__cell", fragment);
        c1.textContent = title;
        return fragment;
    }));

