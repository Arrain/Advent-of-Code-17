
    const readline = require('readline');
    const fs = require('fs');

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt')
    });

    var inputs = [];

    rl.on('line', function (line) {

        inputs.push(line);

    });

    rl.on('close', function() {

        var s = 0;

        var scans = [];
        var freshScans = [];

        for(var i = 0; i < inputs.length; i++)
        {
            var bits = inputs[i].split(': ');

            scans.push({
                id: bits[0] - 0,
                range: bits[1] - 0,
                current: 0,
                inc: 1
            });

            freshScans.push({
                current: 0,
                inc: 1
            });
        }

        var resetScans = function()
        {
            for(var i = 0; i < scans.length; i++)
            {
                scans[i].current = freshScans[i].current;
                scans[i].inc = freshScans[i].inc;
            }
        }

        var moveScans = function()
        {
            for(var i = 0; i < scans.length; i++)
            {
                scans[i].current += scans[i].inc;

                if(scans[i].inc == 1)
                {
                    if(scans[i].current ==  scans[i].range - 1)
                    {
                        scans[i].inc = -1;
                    }
                }
                else
                {
                    if(scans[i].current == 0)
                    {
                        scans[i].inc = 1;
                    }
                }
            }
        }

        var getScan = function(id)
        {
            for(var i = 0; i < scans.length; i++)
            {
                if(scans[i].id == id)
                {
                    return scans[i];
                }
            }

            return null;
        }

        var severity = 0;

        var maxLvl = scans[scans.length-1].id;

        var doMoves = function(continueOnCaught)
        {
            severity = 0;
            for(var i = 0; i <= maxLvl; i++)
            {
                var currentScan = getScan(i);
                if(currentScan)
                {
                    if(currentScan.current == 0)
                    {
                        severity += i * currentScan.range;
                        if(!continueOnCaught)
                        {
                            return false;
                        }
                    }
                }
                moveScans();
            }

            return true;
        }

        //p1
        doMoves(true);
        console.log(severity);

        //p2
        //BRUTEFORCE!!!
        for(var i = 0; i < 10000000; i++)
        {
            resetScans();

            moveScans();
            //make snapshot
            for(var k = 0; k < scans.length; k++)
            {
                freshScans[k].current = scans[k].current;
                freshScans[k].inc = scans[k].inc;
            }

            if(doMoves())
            {
                console.log("delay", i);
                return;
            }
            
            console.log(i, severity);
        }
    });
