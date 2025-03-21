from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.custom_openapi import setup_custom_openapi
from src.api.routers.routers import all_routers
from src.api.custom_swagger import setup_custom_swagger

app = FastAPI(title='Hackathon_Api', swagger_ui_parameters={'defaultModelsExpandDepth': -1, "tryItOutEnabled": True})


for router in all_routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://mythbusters.vercel.app'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

setup_custom_openapi(app)
setup_custom_swagger(app)
