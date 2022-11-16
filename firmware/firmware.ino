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

void setup()
{
    whiteServo.attach(WHITE);
    greenServo.attach(GREEN);

    Serial.begin(9600);
}

void loop()
{
    whiteServo.write(SERVO_DOWN);
    greenServo.write(SERVO_DOWN);

    while (true)
    {
        int selectedTarget = random(GREEN, WHITE + 1);
        enableShootingTarget(selectedTarget);
        delay(5000);
    }
}

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
            break;
    }

    selectedServo.write(SERVO_DOWN);
}
