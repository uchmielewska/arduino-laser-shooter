from time import sleep

from fastapi import FastAPI, Query, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import serial


app = FastAPI()

origins = [
    "localhost:3000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

result = {
    "hit": 0,
    "miss": 0
}


@app.get("/start")
def start(background_tasks: BackgroundTasks, targets: int | None = Query(gt=0)):
    with serial.Serial() as ser:
        ser.baudrate = 9600
        ser.port = "/dev/ttyACM0"
        ser.open()
        data = "start;" + str(targets) + '\n'
        sleep(1)
        ser.write(data.encode("ascii"))

        # result["miss"] = 0
        # result["hit"] = 0

        background_tasks.add_task(count_hits, targets)

    return {"message": "Game started"}


@app.get("/result")
def obtain_result():
    return result


def count_hits(targets: int):
    counter = 0
    response = None

    print("start")

    while counter < targets:
        with serial.Serial() as ser:
            ser.baudrate = 9600
            ser.port = "/dev/ttyACM0"
            ser.open()
            response = ser.read()

        if response is not None:
            if response == b"\x00":
                result["miss"] += 1
            elif response == b"\x01":
                result["hit"] += 1

            response = None
            counter += 1
    
    result["miss"] = 0
    result["hit"] = 0
