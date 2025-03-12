from src.api.routers.auth.router import router as router_auth
from src.api.routers.auth.router import router_token
from src.api.routers.user.router import router as router_user

all_routers = [
    router_auth,
    router_token,
    router_user
]