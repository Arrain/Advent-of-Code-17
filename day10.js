
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

    	var lens = inputs[0].split(',');
        
        var knot = [];

        var size = 256;

        for(var i = 0; i < size; i++)
        {
            knot[i] = i;
        }

        var goToElm = function(pos)
        {
            return pos%size;
        }

        //p1

        var cursor = 0;
        var skipSize = 0;

        var knotIt = function()
        {
            for(var i = 0 ; i < lens.length; i++)
            {
                var len = (lens[i]-0);
                if(len > size)
                {
                    continue;
                }

                for(var j = 0; j < len / 2; j++)
                {
                    var aux = knot[goToElm(cursor + j)];
                    knot[goToElm(cursor + j)] = knot[goToElm(cursor + (len - j - 1))];
                    knot[goToElm(cursor + (len - j - 1))] = aux;
                }

                cursor = goToElm(cursor + len + skipSize);
                skipSize++;
            }
        }
        knotIt();
        console.log(knot[0] * knot[1]);

        //p2

        lens = [];
        for(var i = 0; i < inputs[0].length; i++)
        {
            lens.push(inputs[0].charCodeAt(i))
        }
        //",17,31,73,47,23";
        lens.push(17);
        lens.push(31);
        lens.push(73);
        lens.push(47);
        lens.push(23);

        cursor = 0;
        skipSize = 0;
        for(var i = 0; i < size; i++)
        {
            knot[i] = i;
        }

        for(var k = 0; k < 64; k++)
        {
            knotIt();
        }

        var hashThing = [];
        for(var i = 0; i < size; i+=16)
        {
            var xord = knot[i];

            for(var j = 1; j < 16; j++)
            {
                xord = xord ^ knot[i+j];
            }

            hashThing.push(xord.toString(16));
        }

        console.log(hashThing.join(''));
    });
