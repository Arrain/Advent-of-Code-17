
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
    	var grpLvl = 0;
		var isGarbage = false;
		var gCount = 0;
		
		var inp = inputs[0];

    	for(var i = 0; i < inp.length; i++)
    	{
    		if(inp[i] === '!')
    		{
    			i++;
    		}
    		else if(inp[i] === '<')
    		{
				if(isGarbage)
				{
					gCount++;
				}
    			isGarbage = true;
    		}
    		else if(inp[i] === '>')
    		{
    			isGarbage = false;
    		}
    		else if(inp[i] === '{' && !isGarbage)
    		{
    			grpLvl++;
    		}
    		else if(inp[i] === '}' && !isGarbage)
    		{
    			s += grpLvl;
    			grpLvl--;
			}
			else if(isGarbage)
			{
				gCount++;
			}

    	}

    	console.log(s, gCount);
    });
