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
    unique_combinations = set()

    for obj in data:
        if groupId in obj and isinstance(obj[groupId], list):
            ids = sorted(obj[groupId])  # Sort the IDs to ensure the same combination order
            for r in range(1, len(ids) + 1):
                for comb in combinations(ids, r):
                    unique_combinations.add(tuple(comb))

    return list(unique_combinations)

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

    # Create a set to keep track of unique jersey numbers encountered
    unique_jersey_numbers = set()

    for obj in data:
        if groupId in obj and isinstance(obj[groupId], list):
            for player in obj[groupId]:
                jersey_number = player.get('jersey')

                # Check if jersey_number exists and if it's not already in the unique set
                if jersey_number and jersey_number not in unique_jersey_numbers:
                    player_id = player.get('playerId')

                    # Instead of using a dictionary, add the player info as a tuple to the set
                    unique_players[jersey_number] = (jersey_number, player_id)
                    
                    # Add jersey_number to the unique set to avoid duplicates
                    unique_jersey_numbers.add(jersey_number)

    # Convert the set of tuples back to a list of dictionaries
    return [{'jersey': player_info[0], 'playerId': player_info[1]} for player_info in unique_players.values()]

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

