
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

        var progs = [];
        for(var i = 0; i < inputs.length; i++)
        {
            var bits = inputs[i].split(" <-> ");
            var newArr = [];
            childProgs = bits[1].split(', ');
            for(var j = 0; j < childProgs.length; j++)
            {
                newArr.push(childProgs[j]-0);
            }
            progs.push(newArr);
        }

        var chain = [];

        var processProg = function(progIndex)
        {
            if(chain.indexOf(progIndex) >= 0)
            {
                return;
            }

            chain.push(progIndex);

            for(var i = 0; i < progs[progIndex].length; i++)
            {
                processProg(progs[progIndex][i]);
            }
        }

        processProg(0);
        
        console.log(chain.length);

        var grpCount = 1;
        for(var i = 0 ; i < progs.length; i++)
        {
            if(chain.indexOf(i) >= 0)
            {
                continue;
            }

            processProg(i);
            grpCount++;

        }

        console.log(grpCount);

    });
