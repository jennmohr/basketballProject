# NBA Lineup Analysis
Introducing our cutting-edge application powered by data from the thrilling 2021-2022 NBA Playoffs! Immerse yourself in the world of basketball as we delve into every combination of lineups deployed by each team on the court.

Our innovative tool not only presents comprehensive statistics of each lineup's performance in terms of passes, shot attempts, rebounds, fouls, and turnovers, but it also showcases the percentage of plays where each combination took center stage.

## Tech Stack
![react badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![bootstrap badge](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![django badge](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green)
![python badge](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![javascript badge](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![css badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

# Getting Started
To get started with running the NBA Lineup Analysis tool, clone the repo locally and ensure that Python is installed on your machine.

Because of the privacy of the data being used in the application, the events and tracking data from each provided game needs to be downloaded directly from S3. This can be done using the AWS CLI and the AWS credentials distributed to WISD participants. After the AWS CLI is downloaded and the credentials are populated into the AWS config, follow the following steps to download the events and tracking data. 

```
cd util
```
```
python3 download_data.py
```

There will be 32 files following the naming convention `{gameId}_events.jsonl` & `{gameId}_tracking.jsonl`. Select all of the files populated into the `utils` folder and move them into the `backend>basketball>data` folder. 



The backend of the application that pulls inforrmation and processes the .jsonl files & data is written in django. For our front-end to receive the relevant information, the backend needs to be running. Keep this running while interacting with the application.

```
cd backend
```
```
python3 manage.py runserver
```

To test that the server is running correctly, navigate to `http://localhost:8000/basketball` and there should be a message:
```
Hello, world. You're at the basketball index.
```

Once this is up and running, open up a new terminal that will run alongside the backend. This terminal will be running our front-end React code. 
```
cd frontend
```
```
npm install
```
```
npm start
```
With our front-end and back-end both running alongside each other, the application should be ready to go! Have fun exploring the data and reach out to `jennifer@bpmohr.com` or Jenn Mohr on the WISD Slack.

# Further Improvements
If given more time, I would add the following improvements:
- **External API Usage**: All of the data used in the application is pulled from the provided SportRadar data and two small files of relevant player/game data that I pulled from `https://www.basketball-reference.com/`. If given more time, I would have liked to integrate external third-party APIs to provide more relevant information about players and their performances in the game.
- **Data Analysis**: Most of my background is in web & application development, so I was not able to come up with any advanced data science solutions. If given more time, I would have liked to do more research into data analysis and processing. I think implementing a ML solution with predicting future lineup stats/efficiencies vs certain opponents would have been interesting!
- **Responsive Styling/Accessibility**: Although I styled my application with the Bootstrap framework, I'll admit that the application isn't very responsive to browser sizes/devices. I did not spend much time worrying about mobile/tablet styling because I was navigating development under the assumption that the application would only ever be run on desktop devices. This would have been worked on given I had more time. I would have also made more efforts to make this application accessible for everyone. 


