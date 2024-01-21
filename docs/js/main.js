document.addEventListener('DOMContentLoaded', function() {
    // Funktion zur Erstellung und Anzeige der Fehlermeldung, wenn die PLZ ungültig ist
    function plzFehlerAnzeigen(anzeigen, plzFeld) {
        let plzFehlermeldung = plzFeld.nextElementSibling;
        if (!plzFehlermeldung) {
            plzFehlermeldung = document.createElement('div');
            plzFehlermeldung.style.color = 'red';
            plzFehlermeldung.style.fontSize = '0.8em';
            plzFehlermeldung.style.marginTop = '10px';
            plzFeld.parentNode.insertBefore(plzFehlermeldung, plzFeld.nextSibling);
        }
        plzFehlermeldung.textContent = anzeigen ? 'PLZ außerhalb des Abholbereichs' : '';
    }

    // Event-Listener für PLZ-Eingabefeld
    const plzFeld = document.getElementById('postleitzahl');
    plzFeld.addEventListener('input', function() {
        const plzWert = plzFeld.value;
        plzFehlerAnzeigen(plzWert.length >= 2 && !plzWert.startsWith('12'), plzFeld);
    });

    // Funktion zur Speicherung der Formulardaten
    function formDatenSpeichern(formId) {
        var formDaten = {};
        var formFelder = document.querySelectorAll('#' + formId + ' input, #' + formId + ' select, #' + formId + ' textarea');
        formFelder.forEach(function(formFeld) {
            if (formFeld.name) {
                formDaten[formFeld.name] = formFeld.value;
            }
        });
        formDaten['formTyp'] = formId; // Speichern des Formulartyps
        localStorage.setItem('formDaten', JSON.stringify(formDaten));
    }

    // Event-Listener für Buttons
    document.getElementById('btn-abgabe').addEventListener('click', function() {
        document.getElementById('form-abgabe').style.display = 'block';
        document.getElementById('form-abholung').style.display = 'none';
    });

    document.getElementById('btn-abholung').addEventListener('click', function() {
        document.getElementById('form-abgabe').style.display = 'none';
        document.getElementById('form-abholung').style.display = 'block';
    });


    // Event-Listener für das Formular-Submit von 'form-abholung'
    document.getElementById('form-abholung').addEventListener('submit', function(event) {
        event.preventDefault();
        var plzWert = document.getElementById('postleitzahl').value;
        if (plzWert.length >= 2 && !plzWert.startsWith('12')) {
            // Anzeigen der Fehlermeldung und Verhindern des Formular-Submit
            plzFehlerAnzeigen(true, document.getElementById('postleitzahl'));
            return;
        }
        // Speichern der Formulardaten und Weiterleitung zur Bestätigungsseite
        formDatenSpeichern('form-abholung');
        window.location.href = 'spendenbestaetigung.html';
    });


    // Event-Listener für das Formular-Submit von 'form-abgabe'
    document.getElementById('form-abgabe').addEventListener('submit', function(event) {
        event.preventDefault();
        // Speichern der Formulardaten und Weiterleitung zur Bestätigungsseite
        formDatenSpeichern('form-abgabe');
        window.location.href = 'spendenbestaetigung.html';
    });
});