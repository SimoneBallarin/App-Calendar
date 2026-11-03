# Obiettivi

Dashboard personale per gestire **obiettivi, impegni ed eventi**: giornalieri, settimanali, mensili e a lungo termine, con statistiche, streak, fattibilità e un coach basato su Gemini. È un’app web installabile (PWA) su **Android** e **Windows**, con accesso Google e sincronizzazione tra dispositivi.

Non ha un server proprio: è un unico `index.html` (HTML, CSS e JavaScript, senza passaggi di build). I dati restano sul dispositivo e, se attivi la sincronizzazione, nel tuo progetto Firebase.

## Funzioni

- **Tre tipi di voce**: obiettivo, impegno ed evento, ciascuno con titolo, descrizione, progetto, parole chiave, scadenza, ora e tempo per volta.
- **Frequenze**: giornaliera (con giorni attivi), settimanale, mensile, progetto o lungo termine con scadenza.
- **Streak e fattibilità**: serie di giorni, settimane o mesi; la fattibilità di ogni voce tiene conto del ritmo richiesto, dell’affidabilità storica e del carico totale rispetto ai minuti disponibili al giorno.
- **Tempo reale**: inizio e fine effettivi con giustificazione; la revisione settimanale confronta reale e previsto e propone strategie.
- **Revisione settimanale**: recap, target della settimana successiva e nuovi obiettivi validi solo per quella settimana.
- **Calendario mensile** con il giorno corrente evidenziato, menu degli anni e riepilogo annuale.
- **Ricerca rapida** (tasto `/`), filtri per progetto e parola chiave, vista estesa o compatta.
- **Allegati** (PDF, immagini, testi) per le voci più complesse.
- **Coach Gemini**: crea piani, modifica o elimina qualsiasi voce, usa gli allegati e accetta il dettato vocale.
- **Accesso Google e sincronizzazione** tra telefono e PC.
- **Funziona offline**, si installa come app e avvisa quando c’è una versione nuova.
- **Backup** in JSON, con o senza allegati.
- **Profilo** in cima al menu laterale: nome, data e luogo di nascita, residenza, lavoro, luoghi di interesse e altri dati rilevanti.
- **Impostazioni** in fondo al menu: tema (automatico, chiaro, scuro o due colori a scelta), lingua (italiano e inglese), festività di uno o più paesi, importazione ed esportazione dei dati.

## Inserimento rapido

Nella barra in alto si può scrivere tutto in una riga:

```
Studiare C++ #Tesi +uni +studio /s x3 @30/10 ~45
```

| Elemento | Significato |
| --- | --- |
| `#Progetto` | progetto |
| `+parola` | parola chiave (se ne possono mettere più d’una) |
| `/g` `/s` `/m` `/p` | giornaliero, settimanale, mensile, progetto o lungo termine |
| `/e` `/i` | evento, impegno |
| `x3` | target (volte o unità) |
| `@30/10` oppure `@2026-10-30` | scadenza o data |
| `~45` | minuti per volta |

## Contenuto del repository

| File | A cosa serve |
| --- | --- |
| `index.html` | l’app completa |
| `manifest.json` | dati per l’installazione (nome, icone, scorciatoie) |
| `sw.js` | service worker: funzionamento offline |
| `firebase-config.js` | configurazione del tuo progetto Firebase (da compilare) |
| `firestore.rules` | regole di sicurezza da incollare in Firestore |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | icone |

## Messa online (GitHub Pages)

Un’app installabile deve stare su un indirizzo `https`. Il modo più semplice è GitHub Pages, gratuito.

1. Crea un repository **pubblico** (con l’account gratuito i repository con Pages devono esserlo) e carica tutti i file con **Add file → Upload files**.
2. Vai in **Settings → Pages → Build and deployment**, scegli **Deploy from a branch**, branch `main`, cartella `/(root)`, poi **Save**.
3. Dopo qualche minuto l’app è su `https://TUO-NOME.github.io/NOME-REPOSITORY/`.

Il repository contiene solo il codice: i dati e la chiave Gemini restano nei dispositivi e nel tuo progetto Firebase.

## Sincronizzazione con l’account Google (Firebase)

Si configura una sola volta. Serve un progetto Firebase gratuito (piano Spark): i dati vengono salvati nel *tuo* progetto e le regole permettono l’accesso solo al tuo account.

1. Su [console.firebase.google.com](https://console.firebase.google.com) crea un progetto (Google Analytics non serve).
2. **Authentication → Metodo di accesso → Google**: abilita e scegli la tua email di assistenza.
3. **Authentication → Impostazioni → Domini autorizzati**: aggiungi `TUO-NOME.github.io`.
4. **Firestore Database → Crea database** (edizione Standard, regione europea, modalità produzione). Nella scheda **Regole** incolla il contenuto di `firestore.rules` e pubblica.
5. **Impostazioni progetto → Generali → Le tue app**: registra un’app Web (senza Hosting) e copia i valori di `firebaseConfig`.
6. Incollali in `firebase-config.js` e ricarica il file su GitHub. In alternativa puoi incollare la configurazione nell’app, dal pulsante **☁ Accedi**.

I nomi dei menu nella console possono cambiare leggermente.

### Come funziona

- L’app è *local-first*: lavora sempre sui dati del dispositivo e sincronizza in background.
- Ogni voce è un documento in `users/{uid}/goals/{id}`; le impostazioni sono in `users/{uid}/meta/main`.
- Per ogni voce vince la modifica più recente. Le eliminazioni si propagano ai dispositivi collegati.
- Si sincronizzano voci, storico, tempi reali, minuti disponibili, ultima revisione, modello Gemini e anni aggiunti.
- **Non** si sincronizzano gli allegati (restano sul dispositivo dove sono stati aggiunti), la chiave Gemini, la vista compatta e i filtri.
- Importare un backup mentre si è connessi sostituisce i dati su tutti i dispositivi (l’app chiede conferma).

## Installazione

- **Android (Chrome)**: apri l’indirizzo, menu ⋮ → **Installa app**.
- **Windows (Edge o Chrome)**: apri l’indirizzo e premi l’icona **Installa** nella barra degli indirizzi, oppure il pulsante **Installa app** dentro la dashboard.

Per ottenere pacchetti nativi (APK/AAB per Android, MSIX per Windows) si può inserire l’indirizzo dell’app su [pwabuilder.com](https://www.pwabuilder.com).

### Primo accesso

1. Sul dispositivo che ha già i dati: dal vecchio file `Esporta` (rispondi OK per includere gli allegati), nell’app installata `Importa`.
2. Premi **☁ Accedi → Accedi con Google**.
3. Sugli altri dispositivi installa l’app e accedi con lo stesso account: i dati arrivano da soli. Non serve importare nulla.

Se il popup di accesso viene bloccato, consenti i popup per il sito.

## Coach Gemini

Si apre dal pulsante **✨ Coach Gemini** e usa l’API di Google (`generateContent`).

1. Crea una chiave API in [Google AI Studio](https://aistudio.google.com) e incollala nella sezione *Chiave API e modello* del coach. Resta salvata nel browser del dispositivo, non viene esportata e non va mai messa nel repository.
2. Scrivi o detta la richiesta (il dettato vocale funziona su Chrome, Edge e Safari): puoi aggiungere voci, modificarne qualsiasi campo o proporne l’eliminazione. Gemini propone, tu scegli cosa applicare con le caselle.
3. Se spunti **Includi i file allegati**, PDF e immagini (fino a 10 MB per richiesta) e i testi (fino a 40.000 caratteri per file) vengono inviati insieme alla richiesta. Il pulsante **✨ Pianifica con Gemini**, dentro una voce, invia solo i suoi allegati.

Il modello predefinito è modificabile nello stesso pannello. Per usare gli allegati con un’altra AI, **Copia contesto per un’altra AI** produce un testo con i dati della voce e il contenuto dei file di testo.

## Aggiornare l’app

1. Carica su GitHub il file indicato (di solito solo `index.html`) con lo stesso nome: **Add file → Upload files → Commit changes**.
2. Non sovrascrivere `firebase-config.js`.
3. L’app installata mostra da sola l’avviso **Nuova versione disponibile**: basta premere **Aggiorna**. In fondo al menu a sinistra si vede la versione in uso.

Ad ogni modifica va aumentato il numero di `APP_VER` dentro `index.html`: è quello che l’app confronta per accorgersi dell’aggiornamento.

I dati non si perdono negli aggiornamenti. Prima di modifiche importanti conviene comunque esportare un backup.

## Privacy e sicurezza

- I dati stanno nel browser del dispositivo (`localStorage`, gli allegati in `IndexedDB`) e, con la sincronizzazione, nel tuo progetto Firebase.
- La configurazione web di Firebase (`apiKey` e simili) non è un segreto: è pensata per stare nel codice. La protezione dei dati è nelle regole di `firestore.rules`, per cui ogni account legge e scrive solo la propria area.
- Quando usi il coach, obiettivi, statistiche e (se spuntato) allegati vengono inviati a Google.
- La chiave Gemini non viene mai sincronizzata né esportata.
- Il profilo si sincronizza con gli altri dati. Al coach Gemini arrivano solo età, residenza, lavoro, luoghi di interesse e note, e solo se lasci attiva la casella nel profilo.
- Le festività vengono scaricate dal servizio pubblico gratuito [date.nager.at](https://date.nager.at) e salvate sul dispositivo.

## Limiti noti

- Gli allegati non si sincronizzano: lo spazio file di Firebase richiede un piano a pagamento.
- Due modifiche simultanee alla stessa voce su dispositivi diversi: vince l’ultima.
- Il dettato vocale non è disponibile su Firefox.
- L’installazione non è stata provata su iOS.
- La traduzione inglese copre l’interfaccia; i messaggi di conferma del browser restano in italiano. Le scorciatoie di inserimento rapido (`/g`, `/s`, `/m`, `/p`) non cambiano con la lingua.
- Le festività importate sono quelle nazionali; quelle regionali o locali non vengono mostrate.

## Sviluppo in locale

Aprendo `index.html` direttamente tutto funziona, tranne installazione, offline e aggiornamenti. Per provarli:

```
python -m http.server 8000
```

e apri `http://localhost:8000`.

## Licenza

Progetto personale, nessuna licenza specificata. Se vuoi permettere ad altri di riutilizzarlo, aggiungi un file `LICENSE` (per esempio MIT).
