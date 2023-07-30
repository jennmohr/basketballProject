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

`cd util`
`python3 download_data.py`

There will be 32 files following the naming convention {gameId}_events.jsonl & {gameId}_tracking.jsonl. Select all of the files downloaded from S3 and move them into the backend>basketball>data folder.
download data from download_data.py util
move downloaded files into backend data folder
download any dependencies
run api backend 
test that it's running
run react frontend

