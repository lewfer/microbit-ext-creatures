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
    back,
    forwardMore,
    backMore,
    middle
}
enum enumKneeDirection {
    up,
    down,
    upMore,
    downMore,
    middle
}
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
        } else if (direction == enumHipDirection.back) {
            newAngle = HIPBACK
        } else if (direction == enumHipDirection.forwardMore) {
            newAngle = HIPFORWARDMORE
        } else if (direction == enumHipDirection.backMore) {
            newAngle = HIPBACKMORE
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
        let multiplier2
        serial.writeLine("setNewPosition " + leg + "," + direction)
        let newAngle2
        multiplier2 = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier2 = 1
        } else {
            multiplier2 = -1
        }
        if (direction == enumKneeDirection.up) {
            newAngle2 = KNEEUP
        } else if (direction == enumKneeDirection.down) {
            newAngle2 = KNEEDOWN
        } else if (direction == enumKneeDirection.upMore) {
            newAngle2 = KNEEUPMORE
        } else if (direction == enumKneeDirection.downMore) {
            newAngle2 = KNEEDOWNMORE
        } else {
            newAngle2 = 0
        }
        let idx2 = getIndex(leg, enumJoint.knee)
        newRawAngles[idx2] = 90 + newAngle2 * multiplier2
        serial.writeLine("set " + idx2 + "," + newRawAngles[idx2])
    }

    //% blockId=smoothMoveHip
    //% block="smooth move hip %leg %direction"
    //% group="Move servos"
    //% weight=50
    export function smoothMoveHip(leg: enumLeg, direction: enumHipDirection) {
        let multiplier3
        serial.writeLine("moveHip " + leg + "," + direction)
        let newAngle3
        multiplier3 = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier3 = 1
        } else {
            multiplier3 = -1
        }
        if (direction == enumHipDirection.forward) {
            newAngle3 = HIPFORWARD
        } else if (direction == enumHipDirection.back) {
            newAngle3 = HIPBACK
        } else if (direction == enumHipDirection.forwardMore) {
            newAngle3 = HIPFORWARDMORE
        } else if (direction == enumHipDirection.backMore) {
            newAngle3 = HIPBACKMORE
        } else {
            newAngle3 = 0
        }
        let idx3 = getIndex(leg, enumJoint.hip)
        newRawAngles[idx3] = 90 + newAngle3 * multiplier3

        // Now move it
        smoothMove(idx3)
    }

    //% blockId=smoothMoveKnee
    //% block="smooth move knee %leg %direction"
    //% group="Move servos"
    //% weight=40
    export function smoothMoveKnee(leg: enumLeg, direction: enumKneeDirection) {
        let multiplier4
        serial.writeLine("setNewPosition " + leg + "," + direction)
        let newAngle4
        multiplier4 = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier4 = 1
        } else {
            multiplier4 = -1
        }
        if (direction == enumKneeDirection.up) {
            newAngle4 = KNEEUP
        } else if (direction == enumKneeDirection.down) {
            newAngle4 = KNEEDOWN
        } else if (direction == enumKneeDirection.upMore) {
            newAngle4 = KNEEUPMORE
        } else if (direction == enumKneeDirection.downMore) {
            newAngle4 = KNEEDOWNMORE
        } else {
            newAngle4 = 0
        }
        let idx4 = getIndex(leg, enumJoint.knee)
        newRawAngles[idx4] = 90 + newAngle4 * multiplier4        
        
        // Now move it
        smoothMove(idx4)
    }



    //% blockId=moveHipAngle
    //% block="set hip angle %leg %angle"
    //% angle.min=-70 angle.max=70
    //% group="Set servo positions"
    //% weight=30
    export function moveHipAngle(leg: enumLeg, angle: number) {
        let multiplier5
        serial.writeLine("moveHipAngle " + leg + "," + angle)
        multiplier5 = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier5 = 1
        } else {
            multiplier5 = -1
        }
        let idx5 = getIndex(leg, enumJoint.hip)
        newRawAngles[idx5] = 90+angle
        serial.writeLine("set " + idx5 + "," + angle)
    }

    //% blockId=moveKneeAngle
    //% block="set knee angle %leg %angle"
    //% angle.min=-70 angle.max=70
    //% group="Set servo positions"
    //% weight=20
    export function moveKneeAngle(leg: enumLeg, angle: number) {
        let multiplier6
        serial.writeLine("moveKneeAngle " + leg + "," + angle)
        multiplier6 = 1
        if (leg == enumLeg.frontLeft || leg == enumLeg.backLeft) {
            multiplier6 = 1
        } else {
            multiplier6 = -1
        }
        let idx6 = getIndex(leg, enumJoint.knee)
        newRawAngles[idx6] = 90+angle
        serial.writeLine("set " + idx6 + "," + angle)
    }

    //% blockId=moveServoAngle
    //% block="set servo %servo to angle %angle"
    //% servo.min=1 servo.max=8
    //% angle.min=-70 angle.max=70
    //% group="Set servo positions"
    //% weight=10
    export function moveServoAngle(servo: number, angle: number) {
        let multiplier7
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
        for (let idx22 = 0; idx22 <= SMOOTHNESS; idx22++) {
            easeServo(servo, rawAngles[servo], deltas[servo], idx22 / SMOOTHNESS)
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
        for (let idx23 = 0; idx23 <= SMOOTHNESS; idx23++) {
            for (let servo=1; servo<=8; servo++) {
                easeServo(servo, rawAngles[servo], deltas[servo], idx23 / SMOOTHNESS)
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
        let idx32=0;
        if (leg == enumLeg.frontLeft) {
            if (joint == enumJoint.hip) {
                idx32 = 1
            } else {
                idx32 = 2
            }
        }
        else if (leg == enumLeg.frontRight) {
            if (joint == enumJoint.hip) {
                idx32 = 3
            } else {
                idx32 = 4
            }
        }
        else if (leg == enumLeg.backLeft) {
            if (joint == enumJoint.hip) {
                idx32 = 5
            } else {
                idx32 = 6
            }
        } else if (leg == enumLeg.backRight) {
            if (joint == enumJoint.hip) {
                idx32 = 7
            } else {
                idx32 = 8
            }
        }
        return idx32
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
        HIPBACK = offset
    }

    //% blockId=setHipForwardMoreOffset
    //% block="set hip forwardmore offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=50
    export function setHipForwardMoreOffset(offset: number) {
        HIPFORWARDMORE = offset
    }

    //% blockId=setHipBackwardMoreOffset
    //% block="set hip backwardmore offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=40
    export function setHipBackwardMoreOffset(offset: number) {
        HIPBACKMORE = offset
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

    //% blockId=setKneeUpMoreOffset
    //% block="set knee upmore offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=30
    export function setKneeUpMoreOffset(offset: number) {
        KNEEUPMORE = offset
    }

    //% blockId=setKneeDownMOreOffset
    //% block="set knee downmore offset %offset"
    //% offset.min=-70 offset.max=70
    //% group="Standard offsets"
    //% weight=20
    export function setKneeDownMoreOffset(offset: number) {
        KNEEDOWNMORE = offset
    }

    //% blockId=setSmoothness
    //% block="set smoothness %steps"
    //% angle.steps=1 steps.max=50
    //% group="Settings"
    //% weight=50
    export function setSmoothness(steps: number) {
        SMOOTHNESS = steps
    }


    let KNEEUPMORE = -20
    let KNEEUP = 0
    let KNEEDOWN = 30
    let KNEEDOWNMORE = 40
    let HIPBACKMORE = 40
    let HIPBACK = 20
    let HIPFORWARD = 20
    let HIPFORWARDMORE = 40
    let rawAngles: number[] = [-1,90,90,90,90,90,90,90,90]
    let newRawAngles: number[] = [-1, 90, 90, 90, 90, 90, 90, 90, 90]
    let deltas: number[] = [-1,0,0,0,0,0,0,0,0]
    let SMOOTHNESS = 20
    for (let servo3 = 1; servo3 <= 8; servo3++) {
        limitedMove(servo3, rawAngles[servo3])
    }
    basic.forever(function () {
        
    })
}
