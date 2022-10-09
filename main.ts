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
//% color="#ff7f50" icon="\uf06e" block="CrawlBot"
namespace creatures {
    //% blockId=setNewPosition
    //% block="set position %frontback %side %joint %position"
    export function setNewPosition(frontback: enumFrontBack, side: enumSide, joint: enumJoint, position: enumDirection) {
    let newPositions: number[] = []
    multiplier = 1
        if (side == enumSide.left) {
        multiplier = 1
    } else {
        multiplier = -1
    }
        if (position == enumDirection.forward) {
        _newAngle = HIPFORWARD
        } else if (position == enumDirection.backward) {
        _newAngle = HIPBACKWARD
        } else if (position == enumDirection.up) {
        _newAngle = KNEEUP
        } else if (position == enumDirection.down) {
        _newAngle = KNEEDOWN
    } else {
        _newAngle = 90
    }
    _newAngle = 90 + _newAngle * multiplier
    _idx = getIndex(frontback, side, joint)
    newPositions[_idx] = _newAngle
    serial.writeLine("" + _idx + "," + _newAngle)
}
    function getIndex(frontback: enumFrontBack, side: enumSide, joint: enumJoint) {
        if (frontback == enumFrontBack.front) {
            if (side == enumSide.left) {
                if (joint == enumJoint.hip) {
                _idx = 1
            } else {
                _idx = 2
            }
        } else {
                if (joint == enumJoint.hip) {
                _idx = 3
            } else {
                _idx = 4
            }
        }
    } else {
            if (side == enumSide.left) {
                if (joint == enumJoint.hip) {
                _idx = 5
            } else {
                _idx = 6
            }
        } else {
                if (joint == enumJoint.hip) {
                _idx = 7
            } else {
                _idx = 8
            }
        }
    }
    return _idx
}
function limitedMove (servo: number, angle: number) {
    if (_newAngle < 20) {
        _newAngle = 20
    } else if (_newAngle > 160) {
        _newAngle = 160
    } else {
        _newAngle = angle
    }
    if (servo == 1) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo1, _newAngle)
    } else if (servo == 2) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo2, _newAngle)
    } else if (servo == 3) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo3, _newAngle)
    } else if (servo == 4) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo4, _newAngle)
    } else if (servo == 5) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo5, _newAngle)
    } else if (servo == 6) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo6, _newAngle)
    } else if (servo == 7) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo7, _newAngle)
    } else if (servo == 8) {
        Kitronik_Robotics_Board.servoWrite(Kitronik_Robotics_Board.Servos.Servo8, _newAngle)
    }
}
//% blockId=smoothMoveTogether
//% block="smooth move"
function smoothMoveTogether() {
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
    for (let _idx = 0; _idx <= numSteps - 1; _idx++) {
        //limitedMove(1, positions[1])
        positions[1] = easeServo(1, positions[1], deltas[1], _idx/numSteps)
        serial.writeLine("position" + deltas[1] + "," + positions[1])
        basic.pause(20)
    }
}

// t must be between 0 and 1
function easeServo(servo: number, current: number, delta: number, t: number) {
    _newAngle = current + delta * t * (2 - t) 
    serial.writeLine("" + (_newAngle))
    return _newAngle
}

let _idx = 0
let _newAngle = 0
let multiplier = 0
let KNEEDOWN = 0
let KNEEUP = 0
let HIPBACKWARD = 0
let HIPFORWARD = 0
let positions: number[] = []
let newPositions: number[] = []
let deltas: number[] = []
let numSteps = 50
HIPFORWARD = 20
HIPBACKWARD = 40
KNEEUP = 0
KNEEDOWN = 30
    setNewPosition(enumFrontBack.front, enumSide.left, enumJoint.hip, enumDirection.forward)
basic.forever(function () {
	
})
}
