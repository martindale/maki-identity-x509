class Identity {
  constructor(config) {
    var self = this;

    if (!config) config = {};

    self.config = config;
    self.extends = {
      services: {
        http: {
          middleware: function(req, res, next) {
            if (self.config.exclusive && !req.client.authorized) {
              let err = new Error( req.client.authorizationError );
              err.status = 401;
              return next(err);
            }

            if (req.secure) {
              req.identity = req.connection.getPeerCertificate();
            }

            //console.log('wat:', req.socket.pair._ssl.getPeerCertificate() );
            console.log('req.secure', req.secure);
            console.log('req.identity:', req.identity);


            return next();
          }
        }
      }
    };
  }
}

module.exports = Identity;
