import smtplib
from getpass import getpass

#on demande le login
#login = input("Saisir votre login : ")
login = "loic.robin@epsi.fr"
#on demande le mdp avec une fonction plus sécurisé que le input pour ne pas voir le mdp saisit
passwd = getpass("Saisir votre mot de passe : ")

# adresse email a qui envoyer
#receiver = input("Saisir l'adresse mail du destinataire : ")
receiver = "loic.robin@epsi.fr"
# smtp.office365.com

mailserver = smtplib.SMTP('SMTP.office365.com', 587)
mailserver.connect('SMTP.office365.com', 587)
mailserver.ehlo()
mailserver.starttls()
mailserver.login(login, passwd)
SUBJECT = "Le sujet test"
TEXT = "Bonjour test de julien"
message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)
mailserver.sendmail(login, receiver, message)