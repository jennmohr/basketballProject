from django.shortcuts import render
from django.http import HttpResponse
from itertools import combinations
import json
import os

def index(request):
    return HttpResponse("Hello, world. You're at the basketball index.")

def read_jsonl_file(filename):
    with open(filename, 'r') as file:
        lines = file.readlines()
        objects = [json.loads(line.strip()) for line in lines]
        return objects

def read_json_file(filename):
    with open(filename, 'r') as file:
        data = json.load(file)
        return data

def collect_unique_id_combinations(data, groupId):
    unique_combinations = {}

    for obj in data:
        combination = tuple(obj[groupId])

        if combination in unique_combinations:
            unique_combinations[combination] += 1
        else:
            unique_combinations[combination] = 1

    result = [{'combination': list(comb), 'count': count} for comb, count in unique_combinations.items()]
    result.sort(key=lambda x: x['count'], reverse=True)
    return result

def find_object_with_matching_value(data, key, value):
    for obj in data:
        if obj.get(key) == value:
            return obj
    return None

def getTeamPlayers(request, gameId, groupId):
    filename = f'basketball/data/commonGameData.json'
    filepath = os.path.join(os.getcwd(), filename)
    data = read_json_file(filepath)
    matching_object = find_object_with_matching_value(data, 'gameId', gameId)
    if groupId == 'homePlayers':
        return HttpResponse(json.dumps(getPlayers(matching_object['homeTeam'])))
    elif groupId =='awayPlayers':
        return HttpResponse(json.dumps(getPlayers(matching_object['awayTeam'])))
    else:
        return HttpResponse('No players found')

def getPlayers(team):
    filename = f'basketball/data/commonPlayerData.json'
    filepath = os.path.join(os.getcwd(), filename)
    data = read_json_file(filepath)
    return data[team]

def getPlayersView(request, team):
    return HttpResponse(json.dumps(getPlayers(team)))

def getGamesView(request):
    filename = f'basketball/data/commonGameData.json'
    filepath = os.path.join(os.getcwd(), filename)
    data = read_json_file(filepath)
    return HttpResponse(json.dumps(data))

def gather_unique_players(data, gameId, groupId):
    unique_players = {}
    team_players = getTeamPlayers(None, gameId, groupId)

    for obj in data:
        if groupId in obj and isinstance(obj[groupId], list):
            for player in obj[groupId]:
                jersey_number = player['jersey']

                # Add player info directly to the dictionary if not already present
                if jersey_number not in unique_players:
                    player_id = player['playerId']
                    unique_players[jersey_number] = {'jersey': jersey_number, 'playerId': player_id}

    # Return the list of unique player information from the dictionary values
    return list(unique_players.values())

def split_array_by_shotclock(json_array):
    result = []
    current_subarray = []

    for i, obj in enumerate(json_array):
        if i > 0 and obj.get('shotClock', 0) > json_array[i - 1].get('shotClock', 0):
            if current_subarray:
                result.append(current_subarray)
            current_subarray = []

        current_subarray.append(obj)

    if current_subarray:
        result.append(current_subarray)

    return result

def organize_possessions(possessions):
    home_possessions = []
    away_possessions = []

    for possession in possessions:
        first_event_player_id = possession[0]['playerId']

        if first_event_player_id in possession[0]['homePlayers']:
            home_possessions.append(possession)
        elif first_event_player_id in possession[0]['awayPlayers']:
            away_possessions.append(possession)

    return {'home': home_possessions, 'away': away_possessions}

def getMatchingPlayerGroups(request, gameId, groupId):
    filename = f'basketball/data/{gameId}_events.jsonl'
    filepath = os.path.join(os.getcwd(), filename)
    objects = read_jsonl_file(filepath)
    matching_ids = collect_unique_id_combinations(objects, groupId)
    return HttpResponse(json.dumps(matching_ids))

def getPlayersInGame(request, gameId, groupId):
    filename = f'basketball/data/{gameId}_tracking.jsonl'
    filepath = os.path.join(os.getcwd(), filename)
    objects = read_jsonl_file(filepath)
    unique_players = gather_unique_players(objects, gameId, groupId)
    return HttpResponse(json.dumps(unique_players))

def getDataLength(request, gameId):
    filename = f'basketball/data/{gameId}_events.jsonl'
    filepath = os.path.join(os.getcwd(), filename)
    objects = read_jsonl_file(filepath)
    return HttpResponse(len(objects))

def getAllPlays(request, gameId):
    filename = f'basketball/data/{gameId}_events.jsonl'
    filepath = os.path.join(os.getcwd(), filename)
    objects = read_jsonl_file(filepath)
    plays = split_array_by_shotclock(objects)
    return HttpResponse(json.dumps(plays))

def getTeamPossessions(request, gameId, groupId):
    filename = f'basketball/data/{gameId}_events.jsonl'
    filepath = os.path.join(os.getcwd(), filename)
    objects = read_jsonl_file(filepath)
    plays = split_array_by_shotclock(objects)
    possessions = organize_possessions(plays)
    if groupId == 'home':
        return HttpResponse(json.dumps(possessions['home']))
    elif groupId == 'away':
        return HttpResponse(json.dumps(possessions['away']))
    else: 
        return HttpResponse('Cannot get possessions')
    
def get_unique_combinations_with_event_count(data, groupId):
    unique_combinations = {}

    for obj in data:
        combination = tuple(obj[groupId])
        event_type = obj['eventType']

        combination_key = str(combination)  # Convert the tuple to a string
        if combination_key not in unique_combinations:
            unique_combinations[combination_key] = {event_type: 1}
        else:
            if event_type in unique_combinations[combination_key]:
                unique_combinations[combination_key][event_type] += 1
            else:
                unique_combinations[combination_key][event_type] = 1

    return unique_combinations

def getLineupStats(request, gameId, groupId):
    filename = f'basketball/data/{gameId}_events.jsonl'
    filepath = os.path.join(os.getcwd(), filename)
    objects = read_jsonl_file(filepath)
    comboEvents = get_unique_combinations_with_event_count(objects, groupId)
    return HttpResponse(json.dumps(comboEvents))
    
    