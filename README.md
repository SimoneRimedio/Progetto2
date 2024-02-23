# Progetto 2 – Dov’è

## Descrizione generale

Il progetto prevede la realizzazione di un web server destinato alla rete locale della scuola in cui implementare un servizio di localizzazione dei docenti in base all’orario scolastico.

Il progetto consiste in una pagina web con un campo di ricerca dove è possibile digitare il cognome di un professore ed il sistema risponderà indicando:

- l’aula o il laboratorio in cui sta insegnando in quel momento il docente;
- la materia insegnata;
- l’eventuale compresenza di altri docenti;
- se il docente è in un’ora buca e quindi presumibilmente a scuola;
- se l’ora è prima o dopo l’orario scolastico del docente e quindi presumibilmente non a scuola;
- l’indirizzo e-mail per contattare il docente;
- il piano orario settimanale del docente.

## Specifiche di progetto

- Il sito deve essere accessibile nell’intranet scolastica tramite un hostname. È di conseguenza da configurare correttamente il DNS interno per la risoluzione dell’indirizzo.
- Il sito deve essere facilmente visitabile da mobile, quindi va realizzato in modo responsive e testato sui più comuni dispositivi e risoluzioni.
- Deve essere prevista una pagina di amministrazione del portale, protetto da login, in cui è possibile aggiornare l’orario scolastico, ad esempio all’inizio di un nuovo anno scolastico o in seguito a delle variazioni.
