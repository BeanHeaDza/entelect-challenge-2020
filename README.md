# What is this
This is my solution for the Entelect Internal Challenge 2020. This is not the solution we came up with after the 4.5 hours provided on the day. I have spent some time (around another 6 hours) optimizing the code and adding a nice image visualizer of the output. With the new changes our total score went from 30,058,205 (the score we got on the day, placing us second, with the winner getting a score of 31,592,026) to 37,003,056.

The specification of the challenge can be seen in the [Internal_Cup_2020.pdf](Internal_Cup_2020.pdf) file.

# How to run
## Yarn
```
yarn install
yarn build
yarn start
```
## npm
```
npm install
npm run build
npm start
```

The results will be in the `output` folder

# The grid
* 0 - blank spaces (visualized as a white block)
* -1 - blocked spaces (visualized as a black block)
* positive integers - Battery blocks, with the number being the id of the battery shape.

# Possible improvements
Because single empty cells are penalized so heavily (-4 score instead of -2 for grouped empty cells), a reasonable step would be to not have shape 14 in the normal loop (it is a single block). And then only once other shapes are places does 14 get places (prioritizing single block empty spaces).

Give a higher rating to top and left edges being covered. Because we are placing batteries top -> down, left -> right, it should be more important to cover the top and left edges. But when getting to the bottom or the right all edges should start counting the same again.

When checking the visualized map4 output you can see that the space available is a lot more than the batteries available. For cases like that we should prioritize checking the grid to ensure we aren't creating single cell empty blocks when placing a battery.