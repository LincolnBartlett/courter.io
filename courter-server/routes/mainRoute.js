const express = require('express'),
      router = express.Router(),
      path = require('path');

router.get( '*', 
    (req, res)=> {
        res.sendFile(path.resolve(__dirname,'public', 'build', './index.html'));
    }
);



module.exports = router;