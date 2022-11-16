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

    for (int i = 0; i < 2000; i++)
    {
        delay(1);

        if (analogRead(servoId) > 890)
            return true;
    }

    return false;
}

void gameLoop(int numberOfTargets = 20)
{
    for (int i = 0; i < numberOfTargets; i++)
    {
        int selectedTarget = random(GREEN, WHITE + 1);
        boolean isTargetHit = enableShootingTarget(selectedTarget);
        whiteServo.write(SERVO_DOWN);
        greenServo.write(SERVO_DOWN);

        Serial.println(isTargetHit);

        int targetDelay = random(1, 6) * 1000;
        delay(targetDelay);
    }
}

void setup()
{
    whiteServo.attach(WHITE);
    greenServo.attach(GREEN);

    Serial.begin(9600);

    randomSeed(analogRead(0));
}

void loop()
{
    int response;

    if (Serial.available() > 0)
    {
        response = Serial.read();

        if (response == '2')
            gameLoop(5);

        delay(100);
    }
}
