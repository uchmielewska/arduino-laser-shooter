#include <Servo.h>

Servo whiteServo;
Servo greenServo;

enum SERVO_ID
{
    WHITE = 6,
    GREEN = 5
};

const int SERVO_UP = 180;
const int SERVO_DOWN = 90;

boolean enableShootingTarget(int servoId)
{
    Servo selectedServo;

    if (servoId == GREEN)
        selectedServo = greenServo;
    else
        selectedServo = whiteServo;

    selectedServo.write(SERVO_UP);

    int timeToShoot = random(1, 4) * 1000;

    for (int i = 0; i < timeToShoot; i++)
    {
        delay(1);

        if (analogRead(servoId) > 900)
            return true;
    }

    return false;
}

void gameLoop(int numberOfTargets = 20)
{
    delay(1500);
    
    for (int i = 0; i < numberOfTargets; i++)
    {
        int selectedTarget = random(GREEN, WHITE + 1);
        boolean isTargetHit = enableShootingTarget(selectedTarget);
        whiteServo.write(SERVO_DOWN);
        greenServo.write(SERVO_DOWN);

        Serial.write(isTargetHit);

        int targetDelay = random(1, 6) * 1000;
        delay(targetDelay);
    }
}

void setup()
{
    whiteServo.attach(WHITE);
    greenServo.attach(GREEN);

    Serial.begin(19200);

    randomSeed(analogRead(0));
}

void loop()
{
    String response;

    if (Serial.available() > 0)
    {
        response = Serial.readStringUntil('\n');

        String startString = response.substring(0, 5);
        String targetsString = response.substring(6);

        if (startString.equals("start"))
            gameLoop(targetsString.toInt());

        delay(100);
    }
}
