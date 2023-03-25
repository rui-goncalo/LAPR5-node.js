/*import * as sinon from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';

import IRouteDTO from '../dto/Route/IRouteDTO';
import RouteController from './routeController';
import IRouteService from '../Services/IServices/IRouteService';

describe('route controller', function() {
  beforeEach(function() {});

  test('createRoute: return json with all attributes', async function() {
    //let routeId = '1';
    let body = {
      routeId: '1',
      origin: '1',
      destination: '2',
      distance: '300',
      timeDistance: '30:00',
      energySpent: '150',
      extraTimeBattery: '30:00',
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let routeServiceClass = require(config.Services.route.path).default;
    let routeServiceInstance = Container.get(routeServiceClass);
    Container.set(config.Services.route.name, routeServiceInstance);

    routeServiceInstance = Container.get(config.Services.route.name);
    sinon.stub(routeServiceInstance, 'createRoute').return(
      Result.ok<IRouteDTO>({
        routeId: '1',
        origin: req.body.origin,
        destination: req.body.destination,
        distance: req.body.distance,
        timeDistance: req.body.timeDistance,
        energySpent: req.body.energySpent,
        extraTimeBattery: req.body.extraTimeBattery,
      }),
    );
    const ctrl = new RouteController(routeServiceInstance as IRouteService);

    await ctrl.createRoute(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        routeId: '1',
        origin: req.body.origin,
        destination: req.body.destination,
        distance: req.body.distance,
        timeDistance: req.body.timeDistance,
        energySpent: req.body.energySpent,
        extraTimeBattery: req.body.extraTimeBattery,
      }),
    );
  });
});
*/
