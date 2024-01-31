document.addEventListener('DOMContentLoaded', function() {
    // Formulardaten aus dem lokalen Speicher abrufen
    var formDaten = JSON.parse(localStorage.getItem('formDaten'));
    if (formDaten) {
        // Setzen des Namens im Dankessatz
        var nameElement = document.querySelector('#dankesnachricht strong');
        if (formDaten['Vorname'] && formDaten['Name']) {
            nameElement.textContent = formDaten['Vorname'] + ' ' + formDaten['Name'];
        }

        // Entscheiden, welche Nachricht basierend auf dem Formulartyp angezeigt wird
        var spendeAbgabe = document.getElementById('spende-abgabe');
        var spendeAbholung = document.getElementById('spende-abholung');
        if (formDaten['formTyp'] === 'form-abgabe') {
            spendeAbgabe.style.display = 'block';
        } else if (formDaten['formTyp'] === 'form-abholung') {
            spendeAbholung.style.display = 'block';
        }

        // Erstellen der Spendenbestätigung
        var bestaetigungsDiv = document.getElementById('spendenbestaetigung');
        // Hinzufuegen Datum und Uhrzeit
        var bestaetigungInhalt = '<p><strong>Datum und Uhrzeit:</strong> ' + new Date().toLocaleString() + '</p>';

        // Hinzufügen aller Formulardaten, außer 'formTyp'
        for (var key in formDaten) {
            if (key !== 'formTyp') {
                bestaetigungInhalt += '<p><strong>' + key + ':</strong> ' + formDaten[key] + '</p>';
            }
        }
        bestaetigungsDiv.innerHTML = bestaetigungInhalt;
    }
});