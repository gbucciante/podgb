# PodGB

App di podcast che funziona nel browser e si installa sul telefono come un'app.

## Cosa fa
- **Cerca** podcast per nome (catalogo Apple Podcasts) e mostra i più ascoltati in Italia.
- **Iscriviti** e trovi le nuove puntate in **Novità**, con "Da finire" in cima.
- **Player** con velocità da 0,8× a 3×, salto -15 s / +30 s, timer di spegnimento, controlli nella schermata di blocco.
- **Riprende** ogni episodio dal punto in cui l'avevi lasciato.
- **Coda** di ascolto: gli episodi partono uno dopo l'altro, puoi riordinarli.
- **Scaricati**: salva gli episodi per ascoltarli senza connessione.
- **Feed RSS** e **OPML**: aggiungi un feed a mano, importa/esporta gli abbonamenti da e verso altre app.

Tutti i dati restano sul tuo dispositivo, non c'è nessun account.

## Come metterla online (5 minuti, gratis)
Serve un indirizzo https per usarla dal telefono. Il modo più semplice:
1. Scompatta `podgb.zip` sul computer.
2. Apri https://app.netlify.com/drop e trascina la cartella `podgb` nella pagina.
3. Crea l'account gratuito quando te lo chiede, così il sito resta online.
4. Apri il link che ti dà Netlify dal telefono.

In alternativa va bene GitHub Pages o qualsiasi hosting di file statici.

## Installarla sul telefono
- **Android (Chrome):** menu ⋮ → "Installa app" (o "Aggiungi a schermata Home").
- **iPhone (Safari):** pulsante Condividi → "Aggiungi alla schermata Home".

## Limiti da sapere
- Alcuni podcast non permettono il download dal browser: in quel caso li ascolti in streaming.
- Per leggere i feed che bloccano i browser, l'app passa da un servizio pubblico gratuito (allorigins, corsproxy). Se quei servizi sono giù, quei feed non si aggiornano.
- Su iPhone l'audio in background funziona, ma iOS può fermare l'app se resta inattiva a lungo.
