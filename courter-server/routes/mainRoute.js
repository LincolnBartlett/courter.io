const express = require('express'),
      router = express.Router();

router.get( '/', 
    (req, res)=> {
        res.sendFile(`./index.html`);
    }
);

router.get( '/chat/*', 
    (req, res)=> {
        res.sendFile(`./index.html`);
    }
);


module.exports = router;