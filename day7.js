
    const readline = require('readline');
    const fs = require('fs');

    const rl = readline.createInterface({
        input: fs.createReadStream('input.txt')
    });

    var inputs = [];

    rl.on('line', function (line) {

        inputs.push(line);

    });

    /*
    serv
    {
        name:
        weight:
        chidren:
        totalWeight:
    }
    */

    rl.on('close', function(){
        //p1
        var s = 0;
        var servs = [];
        for(var i = 0; i < inputs.length; i++)
        {
            var bits = inputs[i].split(" -> ");
            var miniBits = bits[0].split(" ");
            servs.push({
                name:miniBits[0],
                weight: miniBits[1].slice(1,-1) - 0,
                children: []
            });

            if(bits.length > 1)
            {
                servs[servs.length-1].children = bits[1].split(', ');
            }
        }

        var parents = []
        for(var i = 0; i < servs.length; i++)
        {
            if(servs[i].children.length > 0)
            {
                parents.push(servs[i]);
            }
        }

        for(var i = 0; i < parents.length; i++)
        {
            var found = false;
            for(var j = 0; j < parents.length; j++)
            {
                if( i == j)
                {
                    continue;
                }

                if(parents[j].children.indexOf(parents[i].name) >= 0)
                {
                    found = true;
                    break;
                }
            }

            if(!found)
            {
                console.log(parents[i]);
                break;
            }
        }

        //p2
        var getServ = function(servName)
        {
            for(var i = 0; i < servs.length; i++)
            {
                if(servs[i].name == servName)
                {
                    return servs[i];
                }
            }
        }

        var getTotalWeight = function(servName)
        {
            var serv = getServ(servName);
            var sum = serv.weight;
            for(var i = 0; i < serv.children.length; i++)
            {
                sum += getTotalWeight(serv.children[i]);
            }

            serv.totalWeight = sum;
            return sum;
        }

        for(var i = 0; i < parents.length; i++)
        {
            if(parents[i].hasOwnProperty("totalWeight"))
            {
                continue;
            }

            getTotalWeight(parents[i].name);
        }

        var badChain = [];
        for(var i = 0; i < parents.length; i++)
        {
            var w = getServ(parents[i].children[0]).totalWeight;
            for(var j = 1; j < parents[i].children.length; j++)
            {
                if(getServ(parents[i].children[j]).totalWeight != w)
                {
                    badChain.push(parents[i]);
                }
            }
        }

        for(var i = 0; i < badChain.length; i++)
        {
            var found = false;
            for(var j = 0; j < badChain[i].children.length; j++)
            {
                for(var k = 0; k < badChain.length; k++)
                {
                    if(badChain[k].name === badChain[i].children[j])
                    {
                        found = true;
                        break;
                    }
                }

                if(found)
                {
                    break;
                }
            }

            if(!found)
            {
                for(var j = 0; j < badChain[i].children.length - 1; j++)
                {
                    var s1 = getServ(badChain[i].children[j]);
                    var s2 = getServ(badChain[i].children[j+1]);

                    if(s1.totalWeight == s2.totalWeight)
                    {
                        continue;
                    }

                    if(Math.abs(s1.totalWeight * badChain[i].children.length - badChain[i].totalWeight) 
                        < Math.abs(s2.totalWeight * badChain[i].children.length - badChain[i].totalWeight))
                    {
                        console.log(s1.weight + s2.totalWeight - s1.totalWeight);
                    }
                    else
                    {
                        console.log(s2.weight + s1.totalWeight - s2.totalWeight);
                    }

                    return;
                }
            }
        }
    });
