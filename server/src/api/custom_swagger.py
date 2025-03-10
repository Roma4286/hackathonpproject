from fastapi import FastAPI, applications
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles


def setup_custom_swagger(app: FastAPI):
    app.mount("/static", StaticFiles(directory="static"), name="static")
    def custom_swagger_ui_html(*args, **kwargs):
        return get_swagger_ui_html(
            *args,
            **kwargs,
            swagger_favicon_url="../../static/swagger/favicon.png",
            swagger_js_url="../../static/swagger/swagger-ui-bundle.js",
            swagger_css_url="../../static/swagger/swagger-ui.css",
        )
    applications.get_swagger_ui_html = custom_swagger_ui_html
