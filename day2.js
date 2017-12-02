
    //expect inputArray - one line per cell

    var dailyDoIt = function()
    {
        var sum = 0;
        for(var i = 0; i < inputArray.length; i++)
        {
            var x = inputArray[i].split('\t');
            for(var j = 0; j < x.length; j++)
            {
                if(min > x[j]-0)
                {
                    min = x[j]-0;
                }
                if(max < x[j]-0)
                {
                    max = x[j]-0;
                }
            }
            sum += (max - min);

            var found = 0;
            sum = 0;
            for(var j = 0; j < x.length-1; j++)
            {
                for(var q = j+1; q < x.length; q++)
                {
                    if((x[q]-0)%(x[j]-0) == 0 || (x[j]-0)%(x[q]-0) === 0)
                    {
                        sum += Math.max((x[q]-0),(x[j]-0)) /  Math.min((x[q]-0),(x[j]-0));
                        found = 1;
                        break;

                    }
                }

                if(found)
                {
                    break;
                }

            }

        }

        console.log(sum);
    };
