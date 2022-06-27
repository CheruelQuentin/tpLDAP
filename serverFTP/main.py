from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer

import os
#
#PATH = "D:\\ftp"
#os.chdir(PATH)

addr = ('127.0.0.1', 21)
authorizer = DummyAuthorizer()
authorizer.add_user("epsi","client22",".", perm="elradfmw")

handler = FTPHandler
handler.authorizer = authorizer
server = FTPServer(addr, handler)
server.serve_forever()


