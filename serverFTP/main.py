from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer
import sys
import os
#
#PATH = "D:\\ftp"
#os.chdir(PATH)

addr = ('127.0.0.1', 21)
authorizer = DummyAuthorizer()
login = sys.argv[1]
psw = sys.argv[2]
print("login"+login+", psw " + psw )

authorizer.add_user(login,psw,".", perm="elradfmw")

handler = FTPHandler
handler.authorizer = authorizer
server = FTPServer(addr, handler)
server.serve_forever()


