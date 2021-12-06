# Project Trybe Trivia 🚀

This is the second project of the Trybe course developed as a team. It's a trivia game that gets the questions from Open Trivia Database API, and the avatar picture from Gravatar API.

The app has some settings for the questions, marks the score and builds a ranking that is saved in the `localstorage`.

That was a great opportunity to practice my soft skills, as well the hard skills (specially `React`). The project was developed in a transition period for `hooks`, hence the mix between `classes` and `functions`.

We decided to style our projects individually, so the style was fully developed by me, a great opportunity to learn how to use the `Material UI`.

**The app's interface is in Brazilian Portuguese as a mandatory project requirement, however the questions and filters are in English, as they come from the API.**

`Requirements`

User must be able to complete the game and be able to see their score after answering all 5 questions, in addition to accessing the settings and ranking screen.


- 1 - Create the login page, where the person who plays must fill in the information to start a game;

- 2 - Create game start button;

- 3 - Create a button that takes the person to the configuration page;

- 4 - Create a `header` that should contain user information;

- 5 - Create the game page that should contain the information related to the question;

- 6 - Develop the game where it should only be possible to choose one correct answer per question;

- 7 - Develop the style that, when you click on an answer, the correct one should be green (I changed it to blue) and the incorrect ones red;

- 8 - Develop a timer where the player has 30 seconds to answer;

- 9 - Create the scoreboard with the following characteristics:

  * You must save the **current** score in `localStorage`;
  * Wrong answers should not add up to the score;
  * The formula for calculating points per question is: `10 + (timer * difficulty)`, where timer is the time remaining in the time and difficulty counter is `hard: 3, medium: 2, easy: 1`, depending on the question.

- 10 - Create a "next" button that appears after the answer is given;

- 11 - Design the game so that the person who plays must answer 5 questions in total;

- 12 - Develop the _feedback_ header that should contain the player information;

- 13 - Create the _feedback_ message to be displayed to the user;

- 14 - Display information related to the results obtained for the user;

- 15 - Create the option for the player to be able to play again;

- 16 - Create the option for the player to be able to view the _ranking_ screen;

- 17 - Create the _ranking_ screen;

- 18 - Create a button to go to the home page;

- 19 - When changing the category dropdown value, only questions from the selected category should appear for the person playing;

- 20 - When changing the value of the difficulty dropdown, only questions of the selected difficulty should appear for the person playing;

- 21 - When changing the value of the type dropdown, only questions of the selected type should appear for the person playing;
