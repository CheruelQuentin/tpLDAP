import smtplib
from getpass import getpass
import sys
#on demande le login
#login = input("Saisir votre login : ")
login = sys.argv[1]
#on demande le mdp avec une fonction plus sécurisé que le input pour ne pas voir le mdp saisit
passwd = sys.argv[2]

# adresse email a qui envoyer
#receiver = input("Saisir l'adresse mail du destinataire : ")
receiver = sys.argv[3]
# smtp.office365.com

mailserver = smtplib.SMTP('SMTP.office365.com', 587)
mailserver.connect('SMTP.office365.com', 587)
mailserver.ehlo()
mailserver.starttls()
mailserver.login(login, passwd)
SUBJECT = sys.argv[4]
TEXT = sys.argv[5]
message = 'Subject: {}\n\n{}'.format(SUBJECT, TEXT)
mailserver.sendmail(login, receiver, message)
print("Mail envoyé")