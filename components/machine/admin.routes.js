const app = require('express')();
const MachineController = require('./machine.controller.js');
const Validator = require('../../utils/validator.js');

/**
 * @api {post} /admin/machines Create machine
 * @apiName createMachine
 * @apiGroup Machine
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 * @apiParam {String} title new Title.
 *
 * @apiSuccess {Object} machine Machine.
 * @apiSuccess {Int} machine.id Id.
 * @apiSuccess {String} machine.title Title.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   machine: machine
 *  }
 *
 * @apiError {String} reason Error reason.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "reason": "DB error."
 *  }
 *
 *  @apiSampleReques
 */
app.post('/machine', Validator.idValidator, MachineController.add);

/**
 * @api {get} /admin/machines Get all machines
 * @apiName GetMachines
 * @apiGroup Machine
 * @apiPermission admin
 *
 * @apiHeader {String} X-Auth-Token User auth token.
 *
 *
 * @apiSuccess {Array} machines Machines List.
 * @apiSuccess {Object} machine Machine.
 * @apiSuccess {Int} machine.id Id.
 * @apiSuccess {String} machine.title Title.
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *   machines: [machine]
 *  }
 *
 * @apiError {String} reason Error reason.
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 400 Bad Request
 *  {
 *    "reason": "DB error."
 *  }
 *
 *  @apiSampleRequest
 */
app.get('/machine', Validator.idValidator, MachineController.getMachine);

module.exports = app;