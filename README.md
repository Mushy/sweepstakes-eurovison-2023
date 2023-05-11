# Eurovision 2023 Sweepstake Generator.

## About
This is a quick and dirty sweepstake generator for Eurovision 2023, copied from the 2021 for a quick and dirty spin up, for some fun in work. I am not a JS developer nor front end developer so design and responsive are lacking (responsive not even looked at) and the Javascript behind it will make the baby Jesus weep. At some point I will ideally go back and clean up the code... but that isn't very likely unfortunately.

And example of how it looks / works can be found at https://mushy.github.io/sweepstakes-eurovison-2023/.

## Functionality
### Quick Assign
This feature will instantly assign all artists to players with no delays. Uses a log in the middle panel instead of showing full artist info. Shows all assigns in a grid on the right so no need to read through the log.

### Step Assign
This feature will step through all artists on a timer fading in artist info and player assignment. Tweak the timer settings to make this faster if you wish. Also assigns to a grid on the right so you don't need to manually keep track instantly.

### Single Assign
This feature works much the same as Step Assign with the major difference being it is not automatic stepping, you need to click the button again to assign the next artist.

### Clear Sweeps
Simply removes any assigning that has been done already and allows you to go from fresh. Clearing the sweepstakes will also randomise the countries again. Please note that this will *not* stop a step assign if it has been fired, you will need to refresh the page for that.

## Todo
If I ever get time / inclination to go back...

### Cleaner / better code.
This was a quick hack job and I'm no JS dev. Ideally better code will be done at some point.

### Add Player
Currently players are hard set in the code to save time developing / debugging. Ideally this would be altered to allow people to add players and start from fresh.

### Save / Load Team
If I make it so players can be added dynamically then it also makes sense that teams / assigns can be saved and loaded.
