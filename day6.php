<?php

    $input = [4,1,15,12,0,9,9,5,5,8,7,3,14,5,12,3];
    $inputLength = count($input);
    $currentArrangement = $input;

    $previousStates = [];

    function hasBeenSeen()
    {
        global $currentArrangement, $previousStates;

        $currentState = implode(",", $currentArrangement);
        foreach($previousStates as $state)
        {
            if($state === $currentState)
            {
                return true;
            }
        }

        $previousStates[] = $currentState;

        return false;
    }

    //p1
    $steps = 0;

    while(!hasBeenSeen())
    {
        $max = 0;
        $maxIndex = 0;
        foreach($currentArrangement as $k => $v)
        {
            if($max < $v)
            {
                $max = $v;
                $maxIndex = $k;
            }
        }

        $currentArrangement[$maxIndex] = 0;

        while($max > 0)
        {
            $maxIndex = ($maxIndex + 1) % $inputLength;
            $currentArrangement[$maxIndex] += 1;
            $max--;
        }

        $steps++;
    }
    
    var_dump($steps);

    //p2
    $steps = 1;

    $currentState = implode(",", $currentArrangement);
    for($i = count($previousStates) - 1; $i >= 0; $i--)
    {
        if($previousStates[$i] === $currentState)
        {
            var_dump($steps);
            break;
        }
        else
        {
            $steps++;
        }
    }
    
