from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user, auth, rbac
from . import database

app = FastAPI(log_level="debug")

async def startup_event():
    print("Starting up the application")
    database.seed()
    
@app.on_event("startup")
async def startup():
    await startup_event()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user.router)
app.include_router(auth.router)
app.include_router(rbac.router)

@app.get("/")
def root():
    return {"message": "Hello World!"}
