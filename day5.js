
    const readline = require('readline');
    const fs = require('fs');

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt')
    });

    var inputs1 = [];
    var inputs2 = [];

    rl.on('line', function (line) {

        inputs1.push(line - 0);
        inputs2.push(line - 0);

    });

    rl.on('close', function(){
        //p1
        var current = 0;
        var steps = 0;
        while(current < inputs1.length || current < 0)
        {
            var next = inputs1[current];
            inputs1[current]++;
            steps++;
            current += next;
        }

        console.log("end1", steps);

        //p2
        current = 0;
        steps = 0;
        while(current < inputs2.length || current < 0)
        {
            var next = inputs2[current];
            if(inputs2[current] < 3)
            {
                inputs2[current]++;
            }
            else
            {
                inputs2[current]--; 
            }
            steps++;
            current += next;
        }

        console.log("end2", steps);

    });
