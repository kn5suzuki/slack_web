from fastapi import FastAPI
import api.routes as routes
from fastapi.middleware.cors import CORSMiddleware

# import sys
# sys.setrecursionlimit(3000)

app = FastAPI()
app.include_router(routes.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],  # 許可するHTTPメソッド
    allow_headers=["Authorization", "Content-Type"],
)
