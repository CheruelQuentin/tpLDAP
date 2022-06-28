var role = 0
//role 0 = erreur/inconnue au bataillon
//role 1 = admin peut ouvrir le ftp et envoyés des mails
//role 2 = peut envouyés des mails
//role 3 = peut ouvrir le ftp

const connectUser = (username, password) => {
  username = username.trim().toLowerCase()
  password = password.trim().toLowerCase()
  
  if(password == "quentin"){
    role = 1
    return role
  } else if(password == "loïc") {
    role = 2
    return role
  } else if(password == "lucas") {
    role = 3
    return role
  } else {
    return role
  }


}


module.exports =  connectUser 