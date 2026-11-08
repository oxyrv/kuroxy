async function get_data(data, category) {
    var api = 'https://api.hashvault.pro/v3/monero/wallet/4BBzCwwk4ssNLNPxVK8JfUWijsxf48RN7GXwYdiQtLd85nLHRoS6LfhBwrHzZLqwXCdttvjJahuKTWKoZBTREHnB5zQgCps/stats?chart=false';
    const response = await fetch(api, {
            method: "GET",
            // headers: {
                // "poc-id": id
            // },
            mode: "cors"
        });

        if (!response.ok) {
            throw new Error("Something went wrong on API server!");
        }

        const json = await response.json();
        return json?.[category]?.[data] ?? 0;
}

function atomic_to_dec(value) {
    var XMR_FACTOR = 1000000000000;
    return value / XMR_FACTOR;
}

async function load_data() {
    const hashtxt = document.getElementById('curhash');
    const rate = document.getElementById('shareRate');
    const bal = document.getElementById('bal');

    const hash = await get_data("hashRate", "collective");
    const rateval = await get_data("shareRate", "collective");
    const balval = await get_data("confirmedBalance", "revenue");

    bal.innerHTML = `${atomic_to_dec(balval)}`.padEnd(15);
    hashtxt.innerHTML = hash;
    rate.innerHTML = rateval;
}