from src.api.routers.auth.router import router as router_auth
from src.api.routers.auth.router import router_token

all_routers = [
    router_auth,
    router_token
]