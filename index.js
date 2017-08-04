module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    
    var http = require('http');
    var options = {
        host: 'www.google.com',
        path: '/'
    };
    var gogbody = '';
    var reqq = http.get(options, function(res) {
        context.log('STATUS: ' + res.statusCode);
        context.log('HEADERS: ' + JSON.stringify(res.headers));
        context.log('res: ' + res.body);
        var bodyChunks = [];
        res.on('data', function(chunk) {
        // You can process streamed parts here...
            bodyChunks.push(chunk);
        }).on('end', function() {
            gogbody = gogbody + Buffer.concat(bodyChunks);
            //context.log('BODY: ' + gogbody);
            // ...and/or process the entire body here.

                context.log(context.res)
                if (req.query.name || (req.body && req.body.name)) {
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: "Hi!!!! " + (req.query.name || req.body.name) +'! GoogleBody:\n' + gogbody,
                    headers: {
                        "Content-Type": "text/html"
                    }
                };
            }
            else {
                context.res = {
                    status: 400,
                    body: "Please pass a name on the query string or in the request body"
                };
            }

            context.done();
      })
        
      
    });
    reqq.on('error', function(e) {
        context.log('ERROR: ' + e.message);
    });
    context.log('req')
    context.log(req)

    if (req.query.name || (req.body && req.body.name)) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello!!!! " + (req.query.name || req.body.name) + gogbody
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};