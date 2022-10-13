//% color="#ff7f50" icon="\uf06e" block="CrawlBot"
namespace creatures {

    //% blockId=registerJoint
    //% block="register joint %joint for servo %servo"
    //% servo.min=1 servo.max=8
    //% servo.defl=1
    //% group="Setup"
    //% weight=50
    export function registerJoint(joint: string, servo: number) {
        //joints.push({name:name, servo:servo, angles:[]})
        joints[joint] = { servo: servo, angles: {} }
        joints[joint].angles = {}

        serial.writeLine("register joint " + joint + "," + servo)
    }

    //% blockId=definePosition
    //% block="define position %name for joint %joint at %angle"
    //% angle.min=-70 angle.max=70
    //% angle.defl=0
    //% group="Setup"
    //% weight=40
    export function definePosition(position: string, joint: string, angle: number) {
        let _joint = joints[joint]
        if (_joint === undefined) throw ("Unregiestered joint " + joint)

        _joint.angles[position] = angle

        serial.writeLine("define angle " + joints[joint].servo + "," + joints[joint].angles[position])
    }


    //% blockId=setJointPosition
    //% block="set joint %joint to position %position"
    //% group="Movement"
    //% weight=50
    export function setJointPosition(joint: string, position: string) {
        let _joint = joints[joint]
        if (_joint === undefined) throw ("Unregiestered joint " + joint)
        let servo = _joint.servo
        let angle = _joint.angles[position]
        if (angle === undefined) throw ("Undefined position " + position)

        newRawAngles[servo] = 90 - angle
        serial.writeLine("setJointPosition " + servo + "," + newRawAngles[servo])
    }

    //% blockId=setJointAngle
    //% block="set joint %joint to angle %angle"
    //% angle.min=-70 angle.max=70
    //% group="Movement"
    //% weight=40
    export function setJointAngle(joint: string, angle: number) {
        let _joint = joints[joint]
        if (_joint === undefined) throw ("Unregiestered joint " + joint)
        let servo = _joint.servo
        newRawAngles[servo] = 90 - angle
        serial.writeLine("setJointAngle " + servo + "," + newRawAngles[servo])
    }


    //% blockId=move all
    //% block="move all servos"
    //% group="Movement"
    //% weight=30
    export function moveAll() {
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
            for (let servo = 1; servo <= 8; servo++) {
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

    //% blockId=moveJointToPosition
    //% block="move joint %joint to %position"
    //% group="Movement"
    //% weight=20
    export function moveJointToPosition(joint: string, position: string) {
        let _joint = joints[joint]
        if (_joint === undefined) throw ("Unregiestered joint " + joint)
        let servo = _joint.servo
        setJointPosition(joint, position)
        smoothMove(servo)
    }

    //% blockId=moveJointDirectToPosition
    //% block="move joint %joint direct to %position"
    //% group="Movement"
    //% weight=10
    export function moveJointDirectToPosition(joint: string, position: string) {
        let _joint = joints[joint]
        if (_joint === undefined) throw ("Unregiestered joint " + joint)
        let servo = _joint.servo
        setJointPosition(joint, position)
        smoothMove(servo)
    }

    //% blockId=setSmoothness
    //% block="set smoothness %steps"
    //% angle.steps=1 steps.max=50
    //% group="Settings"
    //% weight=50
    export function setSmoothness(steps: number) {
        SMOOTHNESS = steps
    }

    function directMove(servo: number) {
        // Move
        limitedMove(servo, newRawAngles[servo])
        // Update to final position
        rawAngles[servo] = newRawAngles[servo]
    }


    function smoothMove(servo: number) {
        deltas[servo] = newRawAngles[servo] - rawAngles[servo]
        //serial.writeLine("delta " + servo + "," + deltas[servo])

        // Ease servo to new position
        for (let idx22 = 0; idx22 <= SMOOTHNESS; idx22++) {
            easeServo(servo, rawAngles[servo], deltas[servo], idx22 / SMOOTHNESS)
            //serial.writeLine(".")
            basic.pause(20)
        }

        // Update to final position
        rawAngles[servo] = newRawAngles[servo]
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



    let rawAngles: number[] = [-1,90,90,90,90,90,90,90,90]
    let newRawAngles: number[] = [-1, 90, 90, 90, 90, 90, 90, 90, 90]
    let deltas: number[] = [-1,0,0,0,0,0,0,0,0]
    let SMOOTHNESS = 20
    //for (let servo3 = 1; servo3 <= 8; servo3++) {
    //    limitedMove(servo3, rawAngles[servo3])
    //}

    interface Angles { [name: string]: number }
    //let joints: { name: string, servo: number, angles: { name: string, angle: number }[] }[]
    //let joints: { [name: string]: { servo: number, angles: { [name: string]: number } } } = {}
    let joints: { [name: string]: { servo: number, angles: Angles } } = {}
    //let joints: { [name: string]: string } = {}
    basic.forever(function () {
        
    })
}
