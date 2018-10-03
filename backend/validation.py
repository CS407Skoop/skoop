import smtplib
from cryptography.fernet import Fernet


def encodeUsername(username):
    file = open("key.txt", "r")
    key = file.read().encode()
    suit = Fernet(key)
    coded = suit.encrypt(str.encode(username))
    return coded

def decodeHash(hash):
    file = open("key.txt", "r")
    key = file.read().encode()
    suit = Fernet(key)
    decrypted = suit.decrypt(hash.encode())
    return decrypted.decode()

def send_validation(username):
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.ehlo()
    server.starttls()
    server.ehlo()
    server.login("skoopnews@gmail.com", "skoop.password")

    hashString = encodeUsername(username)

    # Send the mail
    msg = "Please click on the link to verify your account -\n\nhttp://127.0.0.1:5000/api/validate/" + hashString.decode()
    # The /n separates the message from the headers
    server.sendmail("skoopnews@gmail.com", username, msg)
    return hashString


def validate_hash(hash):
    return decodeHash(hash)




