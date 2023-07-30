import 'whatwg-fetch';
import httpOption from './httpOption';

export function getPlayers(team) {
  const url = `localhost:8000/basketball/players/${team}`;
  const options = httpOption.GET();

  return fetch(url, options)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response.json());
      }
      return Promise.reject(response);
    });
}

export function getGames() {
    const url = `localhost:8000/basketball/games`;
    const options = httpOption.GET();
  
    return fetch(url, options)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response.json());
        }
        return Promise.reject(response);
      });
  }