import "whatwg-fetch";

export function getUniqueLineups(gameId, groupId) {
  const url = `http://localhost:8000/basketball/groups/${gameId}/${groupId}`;
  return fetch(url).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(response);
  });
}

export function getActivePlayers(gameId, groupId) {
  const url = `http://localhost:8000/basketball/players/${gameId}/${groupId}`;

  return fetch(url).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(response);
  });
}

export function getTeamPlayers(gameId, groupId) {
  const url = `http://localhost:8000/basketball/teamPlayers/${gameId}/${groupId}`;

  return fetch(url).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(response);
  });
}

export function getEventLength(gameId) {
  const url = `http://localhost:8000/basketball/events/length/${gameId}`;

  return fetch(url).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(response);
  });
}

export function getEventTypes(gameId, groupId) {
  const url = `http://localhost:8000/basketball/stats/${gameId}/${groupId}`;

  return fetch(url).then((response) => {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response.json());
    }
    return Promise.reject(response);
  });
}
