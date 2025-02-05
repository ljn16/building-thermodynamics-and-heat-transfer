# from fastapi import FastAPI, WebSocket
# import redis
# import asyncpg
# import os

# app = FastAPI()

# # Redis client
# redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=6379, decode_responses=True)

# # PostgreSQL connection string
# ### DATABASE_URL = os.getenv("DATABASE_URL")  # e.g. "postgresql://user:pass@host:5432/dbname"
# DATABASE_URL = "postgresql://afdbAd:Masterpass-090@airflow-db.clmqyyummkmr.us-east-1.rds.amazonaws.com:5432/airflow-db"

# # 1. Create a pool on startup
# @app.on_event("startup")
# async def startup_event():
#     app.state.db_pool = await asyncpg.create_pool(DATABASE_URL)
#     async with app.state.db_pool.acquire() as conn:
#         await conn.execute("""
#             CREATE TABLE IF NOT EXISTS temperature_readings (
#                 id SERIAL PRIMARY KEY,
#                 reading FLOAT NOT NULL,
#                 timestamp TIMESTAMP DEFAULT now()
#             );
#         """)
# # 2. Close the pool on shutdown
# @app.on_event("shutdown")
# async def shutdown_event():
#     await app.state.db_pool.close()

# # --------------------
# # WebSocket Endpoint
# # --------------------
# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_text()
#         # Save latest temperature to Redis
#         await redis_client.set("latest_temperature", data)
#         # Echo the data back to the client
#         await websocket.send_text(f"Received: {data}")

# # --------------------
# # Redis Endpoint
# # --------------------
# @app.get("/temperature")
# async def get_temperature():
#     latest_temp = redis_client.get("latest_temperature")
#     return {"temperature": latest_temp}

# # --------------------
# # Example PostgreSQL Endpoints
# # --------------------

# # GET all readings from the database
# @app.get("/readings")
# async def get_readings():
#     async with app.state.db_pool.acquire() as conn:
#         rows = await conn.fetch("SELECT * FROM temperature_readings")
#         return [dict(r) for r in rows]

# # POST a new reading to the database
# @app.post("/add_reading")
# async def add_reading(reading: float):
#     async with app.state.db_pool.acquire() as conn:
#         record_id = await conn.fetchval(
#             "INSERT INTO temperature_readings (reading) VALUES ($1) RETURNING id",
#             reading
#         )
#         return {"inserted_id": record_id}





# *******************************************************************************************************************
# *******************************************************************************************************************




# from fastapi import FastAPI, WebSocket
# import asyncpg
# import os

# # Uncomment the following lines to enable Redis:
# # import redis
# # redis_client = redis.Redis(host=os.getenv("REDIS_HOST", "localhost"), port=6379, decode_responses=True)

# app = FastAPI()

# # Hard-coded PostgreSQL connection string (adjust as needed)
# # DATABASE_URL = os.getenv("DATABASE_URL")
# DATABASE_URL = "postgresql://afdbAd:Masterpass-090@airflow-db.clmqyyummkmr.us-east-1.rds.amazonaws.com:5432/airflow-db"


# @app.on_event("startup")
# async def startup_event():
#     """
#     Create a connection pool on startup. Also create the temperature_readings
#     table if it doesn't already exist.
#     """
#     app.state.db_pool = await asyncpg.create_pool(DATABASE_URL)
#     async with app.state.db_pool.acquire() as conn:
#         await conn.execute(
#             """
#             CREATE TABLE IF NOT EXISTS temperature_readings (
#                 id SERIAL PRIMARY KEY,
#                 reading FLOAT NOT NULL,
#                 timestamp TIMESTAMP DEFAULT now()
#             );
#             """
#         )


# @app.on_event("shutdown")
# async def shutdown_event():
#     """
#     Close the connection pool on shutdown.
#     """
#     await app.state.db_pool.close()


# # --------------------
# # WebSocket Endpoint
# # --------------------

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_text()
#         # Uncomment to store data in Redis:
#         # await redis_client.set("latest_temperature", data)

#         # Echo the data back to the client
#         await websocket.send_text(f"Received: {data}")


# # --------------------
# # Redis Endpoint (Currently Disabled)
# # --------------------

# @app.get("/temperature")
# async def get_temperature():
#     """
#     This endpoint no longer uses Redis. Uncomment lines below to re-enable.
#     """
#     # latest_temp = redis_client.get("latest_temperature")
#     # return {"temperature": latest_temp}

#     return {"temperature": "Redis disabled"}


# # --------------------
# # PostgreSQL Endpoints
# # --------------------

# @app.get("/readings")
# async def get_readings():
#     """ Fetch all readings from the temperature_readings table. """
#     async with app.state.db_pool.acquire() as conn:
#         rows = await conn.fetch("SELECT * FROM temperature_readings")
#         return [dict(r) for r in rows]


# @app.post("/add_reading")
# async def add_reading(reading: float):
#     """ Insert a new reading into the temperature_readings table. """
#     async with app.state.db_pool.acquire() as conn:
#         record_id = await conn.fetchval(
#             "INSERT INTO temperature_readings (reading) VALUES ($1) RETURNING id",
#             reading
#         )
#         return {"inserted_id": record_id}
