from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("groups/<gameId>/<groupId>", views.getMatchingPlayerGroups, name="playerGroups"),
    path("players/<gameId>/<groupId>", views.getPlayersInGame, name="gamePlayers"),
    path("teamPlayers/<gameId>/<groupId>", views.getTeamPlayers, name="teamPlayers"),
    path("players/<team>", views.getPlayersView, name="team"),
    path("games/", views.getGamesView, name="games"),
    path("events/length/<gameId>", views.getDataLength, name="eventsLength")

]