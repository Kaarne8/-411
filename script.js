
const lomake = document.getElementById("omaLomake");
const tulos = document.getElementById("lomakeTulos");

function tarkistaKentta(id, virhe) {
    const kentta = document.getElementById(id);

    kentta.classList.toggle("is-invalid", virhe !== "");
    kentta.classList.toggle("is-valid", virhe === "");

    document.getElementById(id + "Virhe").textContent = virhe;
}

lomake.addEventListener("submit", function(event) {
    event.preventDefault();

    let kaikkiOk = true;
    let virhe = "";

    const kayttajaId = document.getElementById("kayttajaId").value.trim();
    const salasana = document.getElementById("salasana").value;
    const nimi = document.getElementById("nimi").value.trim();
    const osoite = document.getElementById("osoite").value.trim();
    const maa = document.getElementById("maa").value;
    const postinumero = document.getElementById("postinumero").value.trim();
    const sahkoposti = document.getElementById("sahkoposti").value.trim();
    const kieli = document.querySelector('input[name="kieli"]:checked');
    const sukupuoli = document.querySelector('input[name="sukupuoli"]:checked');

    virhe = "";

    if (kayttajaId === "") {
        virhe = "Käyttäjä ID on pakollinen.";
    } else if (kayttajaId.length < 6) {
        virhe = "Käyttäjä ID:n pitää olla vähintään 6 merkkiä.";
    }

    tarkistaKentta("kayttajaId", virhe);
    if (virhe !== "") kaikkiOk = false;

    virhe = "";

    if (salasana === "") {
        virhe = "Salasana on pakollinen.";
    } else if (salasana.length < 6) {
        virhe = "Salasanan pitää olla vähintään 6 merkkiä.";
    } else if (!/[0-9]/.test(salasana)) {
        virhe = "Salasanassa pitää olla numero.";
    } else if (!/[A-ZÄÖÅ]/.test(salasana)) {
        virhe = "Salasanassa pitää olla iso kirjain.";
    } else if (!/[!@£$€&%#]/.test(salasana)) {
        virhe = "Salasanassa pitää olla sallittu erikoismerkki.";
    }

    tarkistaKentta("salasana", virhe);
    if (virhe !== "") kaikkiOk = false;

    virhe = nimi === "" ? "Nimi on pakollinen." : "";

    tarkistaKentta("nimi", virhe);
    if (virhe !== "") kaikkiOk = false;

    virhe = osoite === "" ? "Osoite on pakollinen." : "";

    tarkistaKentta("osoite", virhe);
    if (virhe !== "") kaikkiOk = false;

    virhe = maa === "" ? "Valitse maa." : "";

    tarkistaKentta("maa", virhe);
    if (virhe !== "") kaikkiOk = false;

    virhe = "";

    if (postinumero === "") {
        virhe = "Postinumero on pakollinen.";
    } else if (!/^[0-9]{5}$/.test(postinumero)) {
        virhe = "Postinumerossa pitää olla 5 numeroa.";
    }

    tarkistaKentta("postinumero", virhe);
    if (virhe !== "") kaikkiOk = false;

    virhe = "";

    if (sahkoposti === "") {
        virhe = "Sähköposti on pakollinen.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sahkoposti)) {
        virhe = "Anna kelvollinen sähköpostiosoite.";
    }

    tarkistaKentta("sahkoposti", virhe);
    if (virhe !== "") kaikkiOk = false;

    if (!sukupuoli) {
        document.getElementById("sukupuoliVirhe").textContent =
            "Valitse sukupuoli.";
        kaikkiOk = false;
    } else {
        document.getElementById("sukupuoliVirhe").textContent = "";
    }

    if (!kieli) {
        document.getElementById("kieliVirhe").textContent =
            "Valitse kieli.";
        kaikkiOk = false;
    } else {
        document.getElementById("kieliVirhe").textContent = "";
    }

    if (kaikkiOk) {
        tulos.textContent =
            "Kaikki ok";
        tulos.className = "mt-3 text-success";
    } else {
        tulos.textContent =
            "Tarkista punaisella merkityt kentät.";
        tulos.className = "mt-3 text-danger";
    }
});

lomake.addEventListener("reset", function() {
    setTimeout(function() {
        lomake.querySelectorAll(".is-valid, .is-invalid").forEach(function(kentta) {
            kentta.classList.remove("is-valid", "is-invalid");
        });

        document.querySelectorAll(".invalid-feedback").forEach(function(kentta) {
            kentta.textContent = "";
        });

        document.getElementById("sukupuoliVirhe").textContent = "";
        document.getElementById("kieliVirhe").textContent = "";
        tulos.textContent = "";
    }, 0);
});
