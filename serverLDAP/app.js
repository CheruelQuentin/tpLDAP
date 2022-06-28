var ldap = require('ldapjs');
var server = ldap.createServer();

server.add('ou=people, o=example', (req, res, next) => {
  console.log('DN: ' + req.dn.toString());
  console.log('Entry attributes: ' + req.toObject().attributes);
  res.end();
});

server.use(function(req, res, next) {
  console.log('hello world');
  return next();
});           
           
server.listen(389, '127.0.0.1', function() {
  console.log('LDAP server listening at: ' + server.url);
});