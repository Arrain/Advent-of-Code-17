<?php

    $input = [4,1,15,12,0,9,9,5,5,8,7,3,14,5,12,3];
    $inputLength = count($input);
    $currentArrangement = $input;

    $previousStates = [];

    function hasBeenSeen()
    {
        global $currentArrangement, $previousStates;

        $currentState = implode(",", $currentArrangement);
//var_dump($currentState);
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

        //var_dump($previousStates);
    }
    
    var_dump($steps);

    $steps = 0;

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
    
