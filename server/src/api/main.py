from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html

# from src.api.custom_openapi import setup_custom_openapi
from src.api.routers.routers import all_routers

app = FastAPI(title='Hackathon_Api', swagger_ui_parameters={'defaultModelsExpandDepth': -1, "tryItOutEnabled": True})

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(openapi_url="/openapi.json", title="API docs", swagger_favicon_url="")


for router in all_routers:
    app.include_router(router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

# setup_custom_openapi(app)
