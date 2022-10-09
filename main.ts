enum enumFrontBack {
    front,
    back
}
enum enumSide {
    left,
    right
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
//% color="#ff7f50" icon="\uf188" block="CrawlBot"
namespace creatures {
    //% blockId=setNewPosition
    //% block="set position %frontback %side %joint %position"
    export function setNewPosition(frontback: enumFrontBack, side: enumSide, joint: enumJoint, position: enumDirection) {
        let multiplier
        serial.writeLine("setNewPosition " + frontback + "," + side + "," + joint + "," + position)
        let newAngle
        multiplier = 1
        if (side == enumSide.left) {
            multiplier = 1
        } else {
            multiplier = -1
        }
        if (position == enumDirection.forward) {
            newAngle = HIPFORWARD
        } else if (position == enumDirection.backward) {
            newAngle = HIPBACKWARD
        } else if (position == enumDirection.up) {
            newAngle = KNEEUP
        } else if (position == enumDirection.down) {
            newAngle = KNEEDOWN
        } else {
            newAngle = 90
        }
        newAngle = 90 + newAngle * multiplier
        let idx = getIndex(frontback, side, joint)
        newPositions[idx] = newAngle
        serial.writeLine("set " + idx + "," + newAngle)
    }

    //% blockId=smoothMoveTogether
    //% block="smooth move"
    export function smoothMoveTogether() {
        // Compute deltas
        deltas = [
            0,
            (newPositions[1] - positions[1]),
            (newPositions[2] - positions[2]),
            (newPositions[3] - positions[3]),
            (newPositions[4] - positions[4]),
            (newPositions[5] - positions[5]),
            (newPositions[6] - positions[6]),
            (newPositions[7] - positions[7]),
            (newPositions[8] - positions[8])
        ]

        //serial.writeLine("delta " + positions[1] + " " + newPositions[1] + " " + deltas[1] )
        // Ease servos to their new position
        for (let idx2 = 0; idx2 <= numSteps; idx2++) {
            for (let servo=1; servo<=8; servo++) {
                easeServo(servo, positions[servo], deltas[servo], idx2 / numSteps)
            }
            //limitedMove(1, positions[1])
            //let easePosition = easeServo(1, positions[1], deltas[1], idx / numSteps)
            //serial.writeLine("position" + deltas[1] + "," + easePosition)
            basic.pause(20)
        }

        // Update to final positions
        for (let servo2 = 1; servo2 <= 8; servo2++)
            positions[servo2] = newPositions[servo2]
    }
    function getIndex(frontback: enumFrontBack, side: enumSide, joint: enumJoint) {
        let idx3=0;
        if (frontback == enumFrontBack.front) {
            if (side == enumSide.left) {
                if (joint == enumJoint.hip) {
                idx3 = 1
            } else {
                idx3 = 2
            }
        } else {
            if (joint == enumJoint.hip) {
                idx3 = 3
                } else {
                    idx3 = 4
                }
            }
        } else {
            if (side == enumSide.left) {
                if (joint == enumJoint.hip) {
                    idx3 = 5
                } else {
                    idx3 = 6
                }
            } else {
                if (joint == enumJoint.hip) {
                    idx3 = 7
                } else {
                    idx3 = 8
                }
            }
        }
        return idx3
    }
function limitedMove (servo: number, angle: number) {
    let newAngle
    if (angle < 20) {
        newAngle = 20
    } else if (angle > 160) {
        newAngle = 160
    } else {
        newAngle = angle
    }
    if (servo == 1) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, newAngle)
    } else if (servo == 2) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, newAngle)
    } else if (servo == 3) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, newAngle)
    } else if (servo == 4) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo4, newAngle)
    } else if (servo == 5) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, newAngle)
    } else if (servo == 6) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo6, newAngle)
    } else if (servo == 7) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo7, newAngle)
    } else if (servo == 8) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo8, newAngle)
    }
}

// t must be between 0 and 1
function easeServo(servo: number, current: number, delta: number, t: number) {

    //_newAngle = current + delta * t // linear
    //_newAngle = current + delta * t * (2 - t) // decelerating
    let newAngle2 = current + delta * (t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t) // acceleration until halfway, then deceleration
    //serial.writeLine("ease" + (newAngle))
    limitedMove(servo, newAngle2)
    return newAngle2
}



let KNEEDOWN = 0
let KNEEUP = 0
let HIPBACKWARD = 0
let HIPFORWARD = 0
let positions: number[] = [-1,90,90,90,90,90,90,90,90]
let newPositions: number[] = [-1, 90, 90, 90, 90, 90, 90, 90, 90]
let deltas: number[] = [-1,0,0,0,0,0,0,0,0]
let numSteps = 20
HIPFORWARD = 20
HIPBACKWARD = 40
KNEEUP = 0
KNEEDOWN = 30
for (let servo = 1; servo <= 8; servo++) {
    limitedMove(servo, positions[servo])
}
basic.forever(function () {
	
})
}
