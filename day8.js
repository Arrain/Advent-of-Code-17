
    const readline = require('readline');
    const fs = require('fs');

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt')
    });

    var inputs = [];

    rl.on('line', function (line) {

        inputs.push(line);

    });

    var regs = {};

    rl.on('close', function(){

        var getReg = function(regName)
        {
        	return (regs[regName] || 0);
        }

        var executeInst = function(bits)
        {
        	if(bits[1] === "inc")
        	{
        		regs[bits[0]] = getReg(bits[0]) + (bits[2] - 0);
        	}
        	else
        	{
        		regs[bits[0]] = getReg(bits[0]) - (bits[2] - 0);
        	}
        }

        var mmax = 0;
        for (var i = 0; i < inputs.length; i++) {

	        for(var j in regs)
	        {
	        	if (regs[j] > mmax) {
	        		mmax = regs[j];
	        	}
	        }

        	var bits = inputs[i].split(' ');
        	if( bits[5] == '>' )
        	{
        		if(getReg(bits[4]) > (bits[6] - 0) )
        		{
        			executeInst(bits);
        		}
        	}
        	else if( bits[5] == '>=' )
        	{
        		if(getReg(bits[4]) >= (bits[6] - 0) )
        		{
        			executeInst(bits);
        		}
        	}
        	else if( bits[5] == '<' )
        	{
        		if(getReg(bits[4]) < (bits[6] - 0) )
        		{
        			executeInst(bits);
        		}
        	}
        	else if( bits[5] == '<=' )
        	{
        		if(getReg(bits[4]) <= (bits[6] - 0) )
        		{
        			executeInst(bits);
        		}
        	}
        	else if( bits[5] == '==' )
        	{
        		if(getReg(bits[4]) == (bits[6] - 0) )
        		{
        			executeInst(bits);
        		}
        	}
        	else if( bits[5] == '!=' )
        	{
        		if(getReg(bits[4]) != (bits[6] - 0) )
        		{
        			executeInst(bits);
        		}
        	}
        }

        var max = 0;
        for(var i in regs)
        {
        	if (regs[i] > max) {
        		max = regs[i];
        	}
        }

        console.log(max, mmax);
    });
