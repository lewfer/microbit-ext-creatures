function setNewPosition (frontback: string, side: string, joint: string, position: string) {
    let newPositions: number[] = []
    multiplier = 1
    if (side == "left") {
        multiplier = 1
    } else {
        multiplier = -1
    }
    if (position == "forward") {
        _newAngle = HIPFORWARD
    } else if (position == "backward") {
        _newAngle = HIPBACKWARD
    } else if (position == "up") {
        _newAngle = KNEEUP
    } else if (position == "down") {
        _newAngle = KNEEDOWN
    } else {
        _newAngle = 90
    }
    _newAngle = 90 + _newAngle * multiplier
    _idx = getIndex(frontback, side, joint)
    newPositions[_idx] = _newAngle
    serial.writeLine("" + _idx + "," + _newAngle)
}
function getIndex (frontback: string, side: string, joint: string) {
    if (frontback == "front") {
        if (side == "left") {
            if (joint == "hip") {
                _idx = 1
            } else {
                _idx = 2
            }
        } else {
            if (joint == "hip") {
                _idx = 3
            } else {
                _idx = 4
            }
        }
    } else {
        if (side == "left") {
            if (joint == "hip") {
                _idx = 5
            } else {
                _idx = 6
            }
        } else {
            if (joint == "hip") {
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
let _idx = 0
let _newAngle = 0
let multiplier = 0
let KNEEDOWN = 0
let KNEEUP = 0
let HIPBACKWARD = 0
let HIPFORWARD = 0
let positions: number[] = []
let numSteps = 50
HIPFORWARD = 20
HIPBACKWARD = 40
KNEEUP = 0
KNEEDOWN = 30
setNewPosition("front", "left", "hip", "forward")
basic.forever(function () {
	
})
