const CommonUtils = require('../../utils/common');
const MachineService = require('./machine.service.js');

class Machine {
    static async add(req, res) {
        const id = req.body.id;

        try {
            const machine = await MachineService.createMachine(id);

            return res.status(200).json({ machine });
        } catch (err) {
            return CommonUtils.catchError(res, err);
        }
    }

    static async getMachine(req, res) {
        try {
            const machine = await MachineService.getMachine(req.query);

            return res.status(200).json({ machine });
        } catch (err) {
            return CommonUtils.catchError(res, err);
        }
    }

    static async updateFromMachine(req, res) {
        const id = req.params.id;
        const time = req.body.time;

        try {
            const machine = await MachineService.updateMachineFromMachine(id, program, time);

            return res.status(200).json({ machine });
        } catch (err) {
            return CommonUtils.catchError(res, err);
        }
    }

    static async updateFromWatch(req, res) {
        const id = req.params.id;
        const time = req.body.time;

        try {
            const machine = await MachineService.updateMachineFromWatch(id, program);

            return res.status(200).json({ machine });
        } catch (err) {
            return CommonUtils.catchError(res, err);
        }
    }
}

module.exports = Machine;