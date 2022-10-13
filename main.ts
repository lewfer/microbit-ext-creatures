/*
Raw angles are 0 to 180 and are what is passed to the servo.
Angles are -90 to +90 and are used by the user through the interface.
 */
/*enum enumFrontBack {
    front,
    back
}
enum enumSide {
    left,
    right
}*/
enum enumLeg {
    frontLeft,
    frontRight,
    backLeft,
    backRight
}
enum enumJoint {
    hip,
    knee
}
enum enumDirection {
    forward,
    backward,
    up,
    down,
    middle
}
enum enumHipDirection {
    forward,
    backward,
    middle
}

enum enumKneeDirection {
    up,
    down,
    middle
}
//% color="#ff7f50" icon="\uf188" block="Creatures"
namespace creatures {
    //% blockId=moveHip
    //% block="set hip %leg %direction"
    //% group="Set servo positions"
    //% weight=50
    export function moveHip(leg: enumLeg, direction: enumHipDirection) {
        let multiplier
        serial.writeLine("moveHip " + leg + "," + direction)
        let newAngle
        multiplier = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier = 1
        } else {
            multiplier = -1
        }
        if (direction == enumHipDirection.forward) {
            newAngle = HIPFORWARD
        } else if (direction == enumHipDirection.backward) {
            newAngle = HIPBACKWARD
        } else {
            newAngle = 0
        }
        let idx = getIndex(leg, enumJoint.hip)
        newRawAngles[idx] = 90 + newAngle * multiplier
        serial.writeLine("set " + idx + "," + newRawAngles[idx])
    }

    //% blockId=moveKnee
    //% block="set knee %leg %direction"
    //% group="Set servo positions"
    //% weight=40
    export function moveKnee(leg: enumLeg, direction: enumKneeDirection) {
        let multiplier
        serial.writeLine("setNewPosition " + leg + "," + direction)
        let newAngle
        multiplier = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier = 1
        } else {
            multiplier = -1
        }
        if (direction == enumKneeDirection.up) {
            newAngle = KNEEUP
        } else if (direction == enumKneeDirection.down) {
            newAngle = KNEEDOWN
        } else {
            newAngle = 0
        }
        let idx = getIndex(leg, enumJoint.knee)
        newRawAngles[idx] = 90 + newAngle * multiplier
        serial.writeLine("set " + idx + "," + newRawAngles[idx])
    }




    //% blockId=moveHipAngle
    //% block="set hip angle %leg %angle"
    //% angle.min=-70 angle.max=70
    //% group="Set servo positions"
    //% weight=30
    export function moveHipAngle(leg: enumLeg, angle: number) {
        let multiplier
        serial.writeLine("moveHipAngle " + leg + "," + angle)
        multiplier = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier = 1
        } else {
            multiplier = -1
        }
        let idx = getIndex(leg, enumJoint.hip)
        newRawAngles[idx] = 90+angle
        serial.writeLine("set " + idx + "," + angle)
    }

    //% blockId=moveKneeAngle
    //% block="set knee angle %leg %angle"
    //% angle.min=-70 angle.max=70
    //% group="Set servo positions"
    //% weight=20
    export function moveKneeAngle(leg: enumLeg, angle: number) {
        let multiplier
        serial.writeLine("moveKneeAngle " + leg + "," + angle)
        multiplier = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier = 1
        } else {
            multiplier = -1
        }
        let idx = getIndex(leg, enumJoint.knee)
        newRawAngles[idx] = 90+angle
        serial.writeLine("set " + idx + "," + angle)
    }

    //% blockId=moveServoAngle
    //% block="set servo %servo to angle %angle"
    //% servo.min=1 servo.max=8
    //% angle.min=-70 angle.max=70
    //% group="Set servo positions"
    //% weight=10
    export function moveServoAngle(servo: number, angle: number) {
        let multiplier
        serial.writeLine("moveServoAngle " + servo + "," + angle)
        newRawAngles[servo] = 90+angle
    }


    //% blockId=directMove
    //% block="direct move servo %servo"
    //% servo.min=1 servo.max=8
    //% group="Move servos"
    //% weight=20
    export function directMove(servo: number) {
        // Move
        limitedMove(servo, newRawAngles[servo])
        // Update to final position
        rawAngles[servo] = newRawAngles[servo]
    }

    //% blockId=smoothMove
    //% block="smooth move servo %servo"
    //% servo.min=1 servo.max=8
    //% group="Move servos"
    //% weight=40
    export function smoothMove(servo: number) {
        deltas[servo] = newRawAngles[servo] - rawAngles[servo]

        // Ease servo to new position
        for (let idx2 = 0; idx2 <= SMOOTHNESS; idx2++) {
            easeServo(servo, rawAngles[servo], deltas[servo], idx2 / SMOOTHNESS)
            basic.pause(20)
        }

        // Update to final position
        rawAngles[servo] = newRawAngles[servo]
    }

    //% blockId=smoothMoveAll
    //% block="smooth move all servos"
    //% group="Move servos"
    //% weight=50
    export function smoothMoveAll() {
        // Compute deltas
        deltas = [
            0,
            (newRawAngles[1] - rawAngles[1]),
            (newRawAngles[2] - rawAngles[2]),
            (newRawAngles[3] - rawAngles[3]),
            (newRawAngles[4] - rawAngles[4]),
            (newRawAngles[5] - rawAngles[5]),
            (newRawAngles[6] - rawAngles[6]),
            (newRawAngles[7] - rawAngles[7]),
            (newRawAngles[8] - rawAngles[8])
        ]

        //serial.writeLine("delta " + rawAngles[1] + " " + newRawAngles[1] + " " + deltas[1] )
        // Ease servos to their new position
        for (let idx2 = 0; idx2 <= SMOOTHNESS; idx2++) {
            for (let servo=1; servo<=8; servo++) {
                easeServo(servo, rawAngles[servo], deltas[servo], idx2 / SMOOTHNESS)
            }
            //limitedMove(1, rawAngles[1])
            //let easePosition = easeServo(1, rawAngles[1], deltas[1], idx / numSteps)
            //serial.writeLine("position" + deltas[1] + "," + easePosition)
            basic.pause(20)
        }

        // Update to final rawAngles
        for (let servo2 = 1; servo2 <= 8; servo2++)
            rawAngles[servo2] = newRawAngles[servo2]
    }



    function getIndex(leg: enumLeg, joint: enumJoint) {
        let idx3=0;
        if (leg == enumLeg.frontLeft) {
            if (joint == enumJoint.hip) {
                idx3 = 1
            } else {
                idx3 = 2
            }
        }
        else if (leg == enumLeg.frontRight) {
            if (joint == enumJoint.hip) {
                idx3 = 3
            } else {
                idx3 = 4
            }
        }
        else if (leg == enumLeg.backLeft) {
            if (joint == enumJoint.hip) {
                idx3 = 5
            } else {
                idx3 = 6
            }
        } else if (leg == enumLeg.backRight) {
            if (joint == enumJoint.hip) {
                idx3 = 7
            } else {
                idx3 = 8
            }
        }
        return idx3
    }

    function limitedMove (servo: number, rawAngle: number) {
        let newRawAngle
        if (rawAngle < 20) {
            newRawAngle = 20
        } else if (rawAngle > 160) {
            newRawAngle = 160
        } else {
            newRawAngle = rawAngle
        }

        serial.writeLine("limitedMove " + servo + "," + newRawAngle)
        if (servo == 1) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, newRawAngle)
        } else if (servo == 2) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, newRawAngle)
        } else if (servo == 3) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, newRawAngle)
        } else if (servo == 4) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo4, newRawAngle)
        } else if (servo == 5) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, newRawAngle)
        } else if (servo == 6) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo6, newRawAngle)
        } else if (servo == 7) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo7, newRawAngle)
        } else if (servo == 8) {
            Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo8, newRawAngle)
        }
    }

    // t must be between 0 and 1
    function easeServo(servo: number, current: number, delta: number, t: number) {

        //_newAngle = current + delta * t // linear
        //_newAngle = current + delta * t * (2 - t) // decelerating
        let newRawAngle2 = current + delta * (t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t) // acceleration until halfway, then deceleration
        //serial.writeLine("ease" + (newRawAngle2))
        limitedMove(servo, newRawAngle2)
        return newRawAngle2
    }


    //% blockId=setHipForwardOffset
    //% block="set hip forward offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=50
    export function setHipForwardOffset(offset:number) {
        HIPFORWARD = offset
    }

    //% blockId=setHipBackwardOffset
    //% block="set hip backward offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=40
    export function setHipBackwardOffset(offset:number) {
        HIPBACKWARD = offset
    }

    //% blockId=setKneeUpOffset
    //% block="set knee up offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=30
    export function setKneeUpOffset(offset: number) {
        KNEEUP = offset
    }

    //% blockId=setKneeDownOffset
    //% block="set knee down offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=20
    export function setKneeDownOffset(offset: number) {
        KNEEDOWN = offset
    }

    //% blockId=setSmoothness
    //% block="set smoothness %steps"
    //% angle.steps=1 steps.max=50
    //% group="Settings"
    //% weight=50
    export function setSmoothness(steps: number) {
        SMOOTHNESS = steps
    }


    let KNEEDOWN = 0
    let KNEEUP = 0
    let HIPBACKWARD = 0
    let HIPFORWARD = 0
    let KNEEDOWNMORE = 0
    let KNEEUPMORE = 0
    let rawAngles: number[] = [-1,90,90,90,90,90,90,90,90]
    let newRawAngles: number[] = [-1, 90, 90, 90, 90, 90, 90, 90, 90]
    let deltas: number[] = [-1,0,0,0,0,0,0,0,0]
    let SMOOTHNESS = 20
    HIPFORWARD = 20
    HIPBACKWARD = 40
    KNEEUPMORE = -20
    KNEEUP = 0
    KNEEDOWN = 30
    KNEEDOWNMORE = 60
    for (let servo = 1; servo <= 8; servo++) {
        limitedMove(servo, rawAngles[servo])
    }
    basic.forever(function () {
        
    })
}
