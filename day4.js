
    //expect inputArray - one line per cell

    var dailyDoIt = function()
    {
        //p1
        var sum = 0;
        for (var i = 0; i < inputArray.length; i++) // for each line
        {
            var bits = inputArray[i].split(' ');
            var found = false;

            for(var j = 0; j < bits.length-1; j++) // for each word
            {
                for(var k = j+1; k < bits.length; k++) // for each next word
                {
                    if(bits[j] == bits[k])
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
                sum++;
            }
        }

        console.log(sum);

        //p2
        sum = 0;
        for (var i = 0; i < inputArray.length; i++) // for each line
        {
            var bits = inputArray[i].split(' ');
            var found = false;
            
            for(var j = 0; j < bits.length-1; j++) // for each word
            {
                for(var k = j+1; k < bits.length; k++) // for each next word
                {
                    var ana = bits[k];
                    var main = bits[j];
                    if(main.length != ana.length)
                    {
                        continue;
                    }
                    for(var q = 0; q < main.length; q++) // for each letter of main
                    {
                        var ind = ana.indexOf(main[q]);
                        if(ind >= 0)
                        {
                            ana = ana.substring(0, ind) + ana.substring(ind + 1, ana.length);
                        }
                    }
                    if(ana.length == 0)
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
                sum++;
            }
        }

        console.log(sum);
    };
