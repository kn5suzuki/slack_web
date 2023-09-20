from fastapi import FastAPI
import api.routes as routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 許可するオリジン（この場合は全て）
    allow_credentials=True,
    allow_methods=["*"],  # 許可するHTTPメソッド
    allow_headers=["*"],  # 許可するHTTPヘッダー
)


@app.get("/")
async def root():
    return {"message": "hello world!"}
