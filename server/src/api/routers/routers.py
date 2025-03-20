from src.api.routers.auth.router import router as router_auth
from src.api.routers.auth.router import router_token
from src.api.routers.user.router import router as router_user
from src.api.routers.game.router import router as router_game
from src.api.routers.news.router import router as router_news

all_routers = [
    router_auth,
    router_token,
    router_user,
    router_game,
    router_news
]