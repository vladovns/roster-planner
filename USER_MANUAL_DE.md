# Team Roster Planner — Benutzerhandbuch

## Inhalt

1. Überblick und Datenspeicherung
2. Rollen & Regeln
3. Schichten verwalten
4. Teammitglieder und Vertragsverlauf
5. Abwesenheiten, Urlaub und eigene Ereignisse
6. Monatsdienstplan
7. Auto-Planung: Regeln und Grenzen
8. PDF-Export und Datensicherung
9. Empfohlener Arbeitsablauf
10. Problemlösung

---

## 1. Überblick und Datenspeicherung

Team Roster Planner ist eine browserbasierte Anwendung zur Erstellung monatlicher Dienstpläne. Sie unterstützt konfigurierbare Schichtzeiten und Personalziele, rollenbasierte Zuweisungsregeln, einen datierten Verlauf des Beschäftigungsgrads, Abwesenheiten und eigene Ereignisse, manuelle Planänderungen, automatische Planung und PDF-Export.

**Die Dienstplandaten werden im lokalen Speicher des Browsers abgelegt.** Es findet keine automatische Synchronisierung zwischen verschiedenen Browsern oder Geräten statt. Verwenden Sie regelmässig **Daten speichern**, um eine JSON-Sicherung herunterzuladen.

Die Benutzeroberfläche ist auf Englisch und Deutsch verfügbar.

### Hauptbereiche

- **Monatsplan** — den ausgewählten Monatsplan anzeigen und bearbeiten.
- **Team verwalten** — Teammitglieder hinzufügen, bearbeiten, entfernen und sortieren.
- **Schichten verwalten** — Schichtzeiten, Farben und tägliche Personalziele festlegen.
- **Rollen & Regeln** — Schichtpräferenzen, Ausschlüsse und feste freie Tage definieren.
- **Abwesenheiten & Urlaub** — Abwesenheiten buchen und eigene Ereignisse verwalten.

Oben rechts befinden sich die Sprachauswahl sowie die Funktionen **Daten speichern** und **Daten laden**.

---

## 2. Rollen & Regeln

Erstellen Sie Rollen, bevor Sie Teammitglieder hinzufügen. Jedes Teammitglied muss einer Rolle zugeordnet sein.

### Rolle erstellen oder bearbeiten

Legen Sie einen Rollennamen fest und wählen Sie ein **Prioritätsziel**:

- **Flexibel (Keine Präferenz)** — das Mitglied kann jeder Schicht zugewiesen werden, sofern diese nicht ausgeschlossen ist.
- **Hauptsächlich (Schicht priorisieren)** — die ausgewählte Schicht wird bevorzugt. Andere Schichten bleiben bei Bedarf möglich. An Tagen ohne Personalbedarf für die bevorzugte Schicht entfällt der Nachteil für andere Schichten.
- **Nur (Exklusiv für eine Schicht)** — das Mitglied kann ausschliesslich der ausgewählten Schicht zugewiesen werden.

Zusätzlich können Sie Folgendes festlegen:

- **Strikte Ausschlüsse** — Schichten, denen Mitglieder dieser Rolle niemals zugewiesen werden dürfen.
- **Feste freie Tage** — Wochentage, an denen Mitglieder dieser Rolle für die Auto-Planung nicht verfügbar sind.

Mit dem Stiftsymbol bearbeiten Sie eine Rolle, mit dem Papierkorbsymbol löschen Sie sie. Bei einer Umbenennung wird der Rollenname auch bei den zugeordneten Teammitgliedern aktualisiert. Beim Löschen einer Rolle werden betroffene Mitglieder einer anderen bestehenden Rolle zugeordnet, sofern eine vorhanden ist.

---

## 3. Schichten verwalten

Erstellen Sie jede Schicht mit folgenden Angaben:

- **Schichtname** — verwenden Sie eine eindeutige Bezeichnung, zum Beispiel B, S1, S2 oder S3.
- **Zeit** — Beginn und Ende im Format `HH:MM - HH:MM` eingeben. Schichten über Mitternacht werden unterstützt, zum Beispiel `19:00 - 04:00`.
- **Farbe** — zur visuellen Kennzeichnung im Dienstplan.
- **Personalbedarf** — legen Sie für jeden Wochentag die benötigte Anzahl Mitarbeitender fest. Der Wert 0 bedeutet, dass die Schicht an diesem Wochentag nicht benötigt wird.

Die Anwendung berechnet die Nettoarbeitszeit mit automatischen Pausenabzügen:

| Brutto-Schichtdauer | Abzug |
|---|---:|
| Mehr als 5,5 Stunden | 15 Minuten |
| Mehr als 7 Stunden | 45 Minuten |
| Mehr als 9 Stunden | 1 Stunde |

Es wird jeweils nur ein passender Abzug angewendet. Die Dauer von Nachtschichten wird über Mitternacht hinweg berechnet.

**Die Schichtbeginnzeiten beeinflussen die Besetzungspriorität.** Wenn nicht genügend geeignete Mitarbeitende für alle aktiven Schichten verfügbar sind, werden früher beginnende Schichten in der Regel zurückgestellt, damit spätere Schichten besetzt werden können. Eine Schicht mit dem Namen **S3** erhält freitags und samstags besonderen Vorrang, sofern ihr Personalziel grösser als 0 ist.

Mit dem Stiftsymbol bearbeiten Sie eine Schicht. Beim Löschen einer Schicht werden auch deren Zuweisungen entfernt. Rollenpräferenzen und Ausschlüsse, die auf diese Schicht verweisen, werden ebenfalls bereinigt.

---

## 4. Teammitglieder und Vertragsverlauf

### Teammitglied hinzufügen

Geben Sie den Namen ein und wählen Sie eine bestehende Rolle. Den anfänglichen Beschäftigungsgrad können Sie aus den Prozentvorschlägen auswählen oder als ganze Prozentzahl eingeben. Legen Sie das Datum fest, ab dem dieser Beschäftigungsgrad gilt. Standardmässig ist das aktuelle Datum eingetragen.

Optionale Einstellungen:

- **Max. freie Tage** — die maximale Anzahl freier Tage dient als Vollzeit-Basis für den Monat. Das daraus abgeleitete Arbeitsziel wird entsprechend dem monatlichen Beschäftigungsgrad angepasst.
- **Schichtzuweisung** — steuert die bevorzugte Schichtfolge innerhalb einer Arbeitsperiode:
  - **Ruhezeit maximieren** — bevorzugt spätere Schichten am Anfang und frühere Schichten gegen Ende einer Arbeitsperiode. Berücksichtigt werden die für das Mitglied zulässigen Schichten.
  - **Gleiche Schichten** — bevorzugt dieselbe Schicht während einer ganzen Arbeitsperiode.
- **Geburtstag** — der Geburtstag wird von der Auto-Planung als freier Tag behandelt.

### Beschäftigungsgrad-Verlauf bearbeiten

Öffnen Sie **Teammitglied bearbeiten**, um den datierten Vertragsverlauf zu pflegen. Erfassen Sie für jede Vertragsänderung einen eigenen Eintrag:

1. Geben Sie das Datum ein, ab dem der neue Beschäftigungsgrad gilt.
2. Wählen Sie einen Prozentvorschlag oder geben Sie eine ganze Zahl zwischen 1 und 100 ein.
3. Fügen Sie für jede spätere Vertragsänderung einen weiteren Eintrag hinzu.

Jeder Eintrag benötigt ein gültiges, einmaliges Gültigkeitsdatum. Die Planung verwendet an jedem Kalendertag den jeweils gültigen Beschäftigungsgrad — auch wenn sich der Vertrag innerhalb eines Monats ändert.

Beim Belastungsausgleich berücksichtigt der Planer die beschäftigungsgradbereinigten Stunden und Arbeitstage. **Dies ist ein weicher Ausgleichswert und keine feste Obergrenze für Schichten oder Stunden.** Der Personalbedarf und die Einsatzberechtigungen können dazu führen, dass die tatsächlichen Stunden vom proportionalen Ziel abweichen.

Mit dem Stiftsymbol bearbeiten Sie ein Teammitglied. Mit den Pfeilen nach oben und unten ändern Sie die Reihenfolge im Dienstplan. Beim Entfernen eines Mitglieds werden auch dessen Schichtzuweisungen entfernt.

---

## 5. Abwesenheiten, Urlaub und eigene Ereignisse

### Abwesenheit buchen

Wählen Sie unter **Abwesenheiten & Urlaub** ein Teammitglied, die Abwesenheitsart sowie Start- und Enddatum aus und klicken Sie auf **Buchen**.

Verfügbare Arten:

- Urlaub
- Krankheitstag
- Wunschtag
- Unbezahlte Abwesenheit
- Eigene Ereignisse, die im Bereich Events erstellt wurden

Das Datumsbereich-Buchungsformular verhindert, dass am selben Datum mehr als eine Person Urlaub gebucht hat. Für Krankheitstage, Wunschtage, unbezahlte Abwesenheiten und eigene Ereignisse gilt diese Ein-Personen-Beschränkung nicht.

Gebuchte Tage stehen der Auto-Planung nicht für Schichtzuweisungen zur Verfügung.

### Eigene Ereignisse erstellen

Klappen Sie den Bereich **Events** auf, um ein eigenes Ereignis zu erstellen. Legen Sie Name, Kürzel (bis zu fünf Zeichen), Stunden, Farbe und optional eine Erklärung fest. Zusätzlich können Sie bestimmen, ob das Ereignis **als Arbeitstag zählt**.

Wird ein eigenes Ereignis einem Mitglied an einem Datum zugewiesen, steht dieses Mitglied an diesem Tag nicht für eine Schicht zur Verfügung. Ist das Ereignis als Arbeitstag markiert, werden die hinterlegten Stunden und der Arbeitstag in der Monatszusammenfassung angerechnet. Andernfalls wird es als Ereignistag angezeigt, ohne Arbeitsstunden hinzuzufügen.

Wenn Sie ein Ereignis bearbeiten, wird dessen Definition aktualisiert. Beim Löschen eines Ereignisses werden auch bestehende Buchungen entfernt, die auf dieses Ereignis verweisen.

### Buchungen nach Jahr anzeigen

Die Buchungsliste öffnet sich standardmässig mit dem aktuellen Kalenderjahr. Über die Auswahl **Jahr** können Sie andere Jahre mit vorhandenen Buchungen anzeigen. Eine Buchung über Silvester hinweg wird im jeweiligen Jahr mit dem entsprechenden Teil des Datumsbereichs angezeigt.

Mit dem Papierkorbsymbol neben einer Buchung können Sie diese entfernen.

---

## 6. Monatsdienstplan

### Dienstplan anzeigen und Monat wechseln

Mit den Pfeilen neben dem Monatsnamen wechseln Sie den angezeigten Monat. Jede Zeile steht für ein Teammitglied, jede Spalte für einen Kalendertag. Die Schichtlegende zeigt die Farben und Zeiten der definierten Schichten.

### Zelle manuell bearbeiten

Klicken Sie auf eine verfügbare Zelle, um Folgendes zuzuweisen:

- Eine definierte Schicht
- Frei (OFF)
- Urlaub (HOL)
- Krankheit
- Wunschtag (WSH)
- Unbezahlte Abwesenheit
- Ein eingerichtetes eigenes Ereignis

Geburtstage und rollenbasierte feste freie Tage sind gesperrt.

Manuelle Änderungen werden automatisch im Browser gespeichert.

### Abdeckungswarnungen und Monatszusammenfassung

Die Zeile **Abdeckungswarnungen** zeigt Tage und Schichten an, bei denen die Anzahl zugewiesener Mitarbeitender unter dem Personalziel liegt. Eine Warnung wie `S1: 1/2` bedeutet, dass eine Person zugewiesen ist, obwohl zwei benötigt werden.

Die **Monatszusammenfassung** zeigt pro Mitglied geleistete Schichten bzw. Arbeitstage, Nettoarbeitsstunden, freie Tage und Abwesenheiten. Eigene Ereignisse, die als Arbeitstage zählen, werden mit ihren hinterlegten Stunden und als Arbeitstag angerechnet.

Im Notizbereich unter dem Dienstplan können Sie Hinweise für den angezeigten Monat speichern.

**Monat leeren** entfernt ausschliesslich die Schichtzuweisungen des aktuell angezeigten Monats. Abwesenheitsbuchungen, Teammitglieder, Rollen, Schichten und weitere Einstellungen bleiben erhalten.

---

## 7. Auto-Planung: Regeln und Grenzen

Mit **Auto-Planung** erstellen Sie den Dienstplan für den angezeigten Monat.

> **Wichtig:** Die Auto-Planung erstellt den gesamten angezeigten Monat neu. Bestehende Schichtzuweisungen dieses Monats — auch manuelle Änderungen — werden ersetzt. Abwesenheitsbuchungen und Einstellungen bleiben erhalten. Prüfen Sie das Ergebnis, bevor Sie es verwenden.

Die Auto-Planung berücksichtigt folgende Regeln und Präferenzen:

1. **Ruhezeit zwischen Schichten:** Zwischen aufeinanderfolgenden Schichten werden mindestens 11 Stunden Ruhezeit geprüft.
2. **Aufeinanderfolgende Arbeitstage:** Normalerweise werden höchstens fünf aufeinanderfolgende Arbeitstage geplant. Kann der notwendige Personalbedarf sonst nicht gedeckt werden, kann ein vorgeschriebener Ruhetag als Ausweichlösung aufgehoben werden.
3. **Min. 2 Tage Frei:** Ist die Option aktiviert, zielt die Planung auf zwei aufeinanderfolgende freie Tage zwischen Arbeitsperioden. Bei knappem Personalbedarf kann der letzte Ruhetag zur Besetzung einer benötigten Position verwendet werden.
4. **Rollenregeln:** Strikte Ausschlüsse, Einschränkungen von Nur-Rollen und feste freie Tage werden berücksichtigt. Präferenzen vom Typ Hauptsächlich sind Präferenzen und keine exklusiven Einschränkungen.
5. **Beschäftigungsgradgerechter Belastungsausgleich:** Für jedes Datum wird der dann gültige Beschäftigungsgrad verwendet, um Stunden und Arbeitstage vergleichbar zu gewichten. Dies ist ein Richtwert und begrenzt die Zuweisungen nicht.
6. **Max. freie Tage:** Das aus dieser Einstellung abgeleitete Vollzeit-Arbeitsziel wird anhand des monatlichen Beschäftigungsgrads angepasst. Droht eine Überschreitung, kann das Mitglied einer noch unbesetzten benötigten Schicht zugewiesen werden. Eine zusätzliche Person wird nicht zu einer Schicht hinzugefügt, deren Personalziel bereits erreicht ist.
7. **Schichtabdeckung:** Die Planung versucht, die Personalziele der Schichten zu erfüllen. Sind zu wenige geeignete Mitarbeitende verfügbar, können Positionen unbesetzt bleiben und erscheinen in den Abdeckungswarnungen.
8. **Besetzungspriorität:** Reicht die Zahl geeigneter Mitarbeitender nicht für alle aktiven Schichten, werden früher beginnende Schichten in der Regel zurückgestellt, damit spätere Schichten besetzt werden können. S3 wird freitags und samstags bei vorhandenem Personalziel an den Anfang der Zuweisungsreihenfolge gesetzt.
9. **Schichtfolge innerhalb einer Arbeitsperiode:** Die gewählte Schichtzuweisungsoption beeinflusst das bevorzugte Schichtmuster innerhalb einer Arbeitsperiode.

Bei der Prüfung auf aufeinanderfolgende Arbeitstage berücksichtigt der Planer auch das Ende des vorherigen Monats.

### Nach der Auto-Planung

- Prüfen Sie alle Abdeckungswarnungen.
- Kontrollieren Sie Arbeitstage und Nettoarbeitsstunden in der Monatszusammenfassung, insbesondere bei Teilzeitmitarbeitenden.
- Prüfen Sie Wochenenden und Schichten mit Rollenbeschränkungen.
- Nehmen Sie bei Bedarf manuelle Korrekturen vor.
- Beachten Sie, dass ein erneuter Klick auf Auto-Planung die Schichtzuweisungen des Monats erneut ersetzt.

Die Auto-Planung ist eine Planungshilfe. Sie kann keine Position besetzen, wenn kein geeignetes Teammitglied verfügbar ist.

---

## 8. PDF-Export und Datensicherung

### PDF exportieren

Klicken Sie auf **PDF Exportieren**, um für den aktuell angezeigten Monat ein A4-PDF im Querformat herunterzuladen. Es enthält den Dienstplan und die Monatszusammenfassung.

### Daten speichern und laden

- **Daten speichern** lädt eine JSON-Sicherung mit Teammitgliedern und Vertragsverlauf, Rollen, Schichten, Zuweisungen, Abwesenheitsbuchungen, eigenen Ereignissen, Planungseinstellungen und Monatsnotizen herunter.
- **Daten laden** importiert eine zuvor gespeicherte JSON-Sicherung und stellt die Daten in der Anwendung wieder her.

Alle Änderungen werden zusätzlich automatisch im lokalen Speicher dieses Browsers gespeichert. Das Löschen der Browserdaten kann den Dienstplan entfernen; im privaten Browsermodus werden Daten möglicherweise nicht dauerhaft gespeichert. Bewahren Sie deshalb eine externe Sicherung auf.

---

## 9. Empfohlener Arbeitsablauf

1. Erstellen Sie Rollen und definieren Sie Präferenzen, Ausschlüsse und feste freie Tage.
2. Erstellen Sie die Schichten und legen Sie den Personalbedarf pro Wochentag fest.
3. Fügen Sie Teammitglieder hinzu, ordnen Sie Rollen zu, hinterlegen Sie Beschäftigungsgrade und Gültigkeitsdaten und erfassen Sie Geburtstage sowie weitere Optionen.
4. Erstellen Sie benötigte eigene Ereignisse und buchen Sie bekannte Urlaube, Abwesenheiten und Ereignisse.
5. Öffnen Sie den gewünschten Monat, aktivieren Sie bei Bedarf **Min. 2 Tage Frei** und klicken Sie auf **Auto-Planung**.
6. Prüfen Sie Abdeckungswarnungen und Monatszusammenfassung. Nehmen Sie erforderliche manuelle Korrekturen vor.
7. Exportieren Sie ein PDF und speichern Sie eine JSON-Sicherung.

---

## 10. Problemlösung

### Eine Schicht bleibt unbesetzt

Prüfen Sie den Personalbedarf, Rollenausschlüsse, Einschränkungen von Nur-Rollen, die 11-Stunden-Ruhezeit, feste freie Tage, Geburtstage und gebuchte Abwesenheiten. Sind nicht genügend geeignete Mitarbeitende verfügbar, kann der Planer nicht alle Positionen besetzen. Prüfen Sie die Abdeckungswarnungen.

### Nach der Auto-Planung sind meine manuellen Zuweisungen verändert

Das ist das vorgesehene Verhalten. Die Auto-Planung erstellt den gesamten angezeigten Monat neu und ersetzt dessen Schichtzuweisungen. Nehmen Sie manuelle Anpassungen nach dem letzten Auto-Planungslauf vor.

### Ein Teilzeitmitarbeiter hat mehr oder weniger Stunden als erwartet

Der beschäftigungsgradgerechte Belastungsausgleich ist ein Richtwert und keine garantierte Stundengrenze. Der tatsächliche Personalbedarf und die Anzahl der Schichten, für die das Mitglied eingesetzt werden darf, beeinflussen das Ergebnis. Prüfen Sie den Vertragsverlauf und die Gültigkeitsdaten im betreffenden Monat.

### Der Planer verwendet den falschen Beschäftigungsgrad

Öffnen Sie **Teammitglied bearbeiten** und prüfen Sie die Gültigkeitsdaten und Prozentsätze aller Vertragsänderungen. Jedes Gültigkeitsdatum muss einmalig sein.

### Beim Buchen von Urlaub erscheint ein Konflikt

Das Datumsbereich-Buchungsformular erlaubt pro Datum nur eine Urlaubsbuchung. Prüfen Sie die Buchungsliste auf eine bereits gebuchte Person am überschneidenden Datum.

### Eine ältere Buchung wird nicht angezeigt

Verwenden Sie die Jahresauswahl unter **Abwesenheiten & Urlaub**. Standardmässig wird das aktuelle Jahr angezeigt; weitere Jahre mit vorhandenen Buchungen können ausgewählt werden.

### Daten scheinen verloren gegangen zu sein

Die Daten werden im lokalen Speicher des Browsers abgelegt. Prüfen Sie, ob Sie denselben Browser und dasselbe Browserprofil verwenden. Stellen Sie bei Bedarf eine aktuelle JSON-Sicherung mit **Daten laden** wieder her.
