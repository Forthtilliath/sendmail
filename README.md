# Introduction

API clé en main qui permet d'envoyer un email à l'aide d'une adresse Gmail.

# Configuration

### Le fichier de configuration .env

Afin de configurer l'API, il se suffit de modifier les variables du fichier  [.env]([https://link](https://github.com/Forthtilliath/sendmail/blob/main/.env))

```
# NODE_ENV = "production"               # Uncomment for production

PORT_HTTP  = 3000                       # Port to use for the api
ALLOWED_ORIGINS = ['http://127.0.0.1:5500','http://localhost:5500']

# Mails
GMAIL_ACCOUNT = false                    # If true, mails will be send by your gmail account to SEND_TO

GMAIL_USER = "YOUR GMAIL LOGIN"
GMAIL_PASS = "YOUR GMAIL PASSWORD"
SEND_TO = "EMAIL WHICH REVIECE MAILS"   # Only if GMAIL_ACCOUNT is false

# https://ethereal.email/               # For Tests
ETHER_USER = "YOUR ETHEREAL EMAIL"
ETHER_PASS = "YOUR ETHEREAL PASSWORD"
```

**PORT_HTTP :** Port sur lequel envoyer le formulaire (par défault, le port 3000 sera utilisé)

**ALLOWED_ORIGINS :** Liste des adresses url qui peuvent accéder à l'API. Il est possible d'autoriser l'accès à tout le monde, mais **grandement** déconseillé. Par défault, on autorise le localhost avec le port 5500.

**GMAIL_ACCOUNT :** Lors du dévelopement, il est préférable de laisser cette valeure à false. Cela permet de recevoir les mails sur un compte Ethereal afin de ne pas polluer votre boite mail lors des tests.

**GMAIL_USER :** L'adresse gmail de votre compte
**GMAIL_PASS :** Le mot de passe de votre compte

**SEND_TO :** L'email sur laquel envoyer les mails. Elle peut très bien être différente de votre adresse Gmail.
A noter que si GMAIL_ACCOUNT est à false, les mails seront envoyés sur votre compte Ethereal.

**ETHER_USER :** L'adresse mail de votre compte Ethereal
**ETHER_USER :** Le mot de passe de votre compte Ethereal

### La route pour envoyer le mail

Vous trouverez la racine de la route dans le fichier [app.js](https://github.com/Forthtilliath/sendmail/blob/main/app.js) et la route liée aux mails dans le fichier [routes/mail.js](https://github.com/Forthtilliath/sendmail/blob/main/routes/mail.js).

##### app.js
```
// Premier chemin du router
router.use('/mail', mailRoutes);

// Racine de la route
app.use('/api', router);
```

##### routes/mail.js
```
// Router vers le module qui envoi les mails
router.post('/send', mailCtrl.send);
```
Vous pouvez librement modifier les chemins à votre convenance. Par défault, l'adresse vers laquelle envoyer les données du formulaire correspond à : [http://localhost:3000/mail/send](http://localhost:3000/api/mail/send).

# Les données attendues

Par défaut, les données attendues par le formulaire sont les suivantes :
- name : Nom de la personne
- email : Email de la personne
- message : Contenu du message

Libre à vous d'envoyer d'autres valeurs. Vous pourrez les récupérer de la sorte : req.body.NomDeVotreChamp

# Format du mail envoyé

Il est tout à fait possible de modifier le format du mail envoyé, dans le fichier [config/mail.js](https://github.com/Forthtilliath/sendmail/blob/main/config/mail.js)

```
exports.getOptions = (req) => {
    return {
      from: `${req.body.name} <${req.body.email}>`,
      to: `Forth <${process.env.SEND_TO}>`,
      subject: 'CV : Message from ' + req.body.name,
      text: `Email : ${req.body.email}\nMessage :\n${req.body.message}`, 
   };
}
```
- from : Actuellement la variable n'est pas complètement prise en compte. Dans Ethereal, l'email affichée dans le from est exact, mais dans gmail, l'email affichée est toujours l'email avec laquelle vous avez envoyé le mail. Toutefois, la bonne valeur est dans X-Google-Original-From.
- to : Adresse vers laquelle le mail est envoyé
- subject : Sujet du message
- text : Contenu du message. Libre à vous d'adapter le contenu du mail comme bon vous semble.