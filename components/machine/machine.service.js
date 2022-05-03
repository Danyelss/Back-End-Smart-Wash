const { NotFoundError, BadRequestError } = require('../../utils/erros.model.js');
const MachineModel = require('./machine.model');

class MachineService {
    static async createMachine(id) {
        const existingMachine = await MachineModel.find({ where: { id } });
        if (existingMachine) {
            throw new BadRequestError('The machine already exist.');
        }

        let machine = await MachineModel.create({ title }, { returning: true });

        if (!machine) {
            throw new Error('Cannot create a machine.');
        }

        return { id: machine.id };
    }

    static async getMachine(query) {
        let options = {
            offset: +query.offset || 0,
            limit: +query.limit || 30,
            attributes: {
                exclude: ['updatedAt', 'createdAt', 'deletedAt']
            }
        };

        return await MachineModel.findAll(options);
    }

    static async updateMachineFromMachine(id, program, timer) {
        const machine = await MachineModel.findById(id);
        if (!machine) {
            throw new NotFoundError(`The machine doesn't exist.`);
        }

        await machine.update({ id, program, timer });

        return { id: machine.id, program: machine.program, timer: machine.timer };
    }

    static async updateMachineFromWatch(id, program) {
        const machine = await MachineModel.findById(id);
        if (!machine) {
            throw new NotFoundError(`The machine doesn't exist.`);
        }

        await machine.update({ id, program });

        return { id: machine.id, program: machine.program };
    }
}

module.exports = MachineService;