import "whatwg-fetch";

export function getPlayers(team) {
  const url = `http://localhost:8000/basketball/players/${team}`;

  return fetch(url).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(response);
  });
}

export function getGames() {
  const url = `http://localhost:8000/basketball/games/`;

  return fetch(url).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(response);
  });
}
