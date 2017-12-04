
    //p1 - did math

    //p2
    var inp = 277678;
    var size = 1000;
    var mat = new Array(size);
    for(var i = 0; i < size; i++ )
    {
        mat[i] = new Array(size);
    }

    var x = size/2;
    var y = size/2;

    mat[y][x] = 1;
    x++;
    mat[y][x] = 1;

    var sumAround = function(i, j)
    {
        var sum = (mat[i-1][j-1] || 0)
            + (mat[i-1][j] || 0)
            + (mat[i-1][j+1] || 0)
            + (mat[i][j-1] || 0)
            + (mat[i][j+1] || 0)
            + (mat[i+1][j-1] || 0)
            + (mat[i+1][j] || 0)
            + (mat[i+1][j+1] || 0);

        return sum;
    }
    
    var goUp = function () {
        y--;
    };

    var goDown = function(){
        y++;
    }

    var goLeft = function(){
        x--;
    }

    var goRight = function(){
        x++;
    }

    var lvl = 3;
    while(lvl * lvl <= size)
    {
        for(var i = 0; i < lvl - 2; i++)
        {
            goUp();
            mat[y][x] = sumAround(y, x);

            if(mat[y][x] >= inp)
            {
                return;
            }
        }

        for(var i = 0; i < lvl-1; i++)
        {
            goLeft();
            mat[y][x] = sumAround(y, x);

            if(mat[y][x] >= inp)
            {
                return;
            }
        }

        for(var i = 0; i < lvl-1; i++)
        {
            goDown();
            mat[y][x] = sumAround(y, x);
            
            if(mat[y][x] >= inp)
            {
                return;
            }
        }

        for(var i = 0; i < lvl; i++)
        {
            goRight();
            mat[y][x] = sumAround(y, x);
            
            if(mat[y][x] >= inp)
            {
                return;
            }
        }

        lvl += 2;
    }
    
    console.log(mat[y][x]);
