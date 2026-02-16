'use strict';

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { corsOptions } from './cors-configuration.js';
import { dbConnection } from './db.js';
import { helmetConfiguration } from './helmet-configuration.js';

import { requestLimit } from '../src/middlewares/request-limit.js';
import { errorHandler } from '../src/middlewares/handle-errors.js';

import usersRoutes from '../src/users/user.routes.js';
import restaurantsRoutes from '../src/restaurants/restaurant.routes.js';
import menusRoutes from '../src/menus/menu.routes.js';
import inventoryRoutes from '../src/inventory/inventory.routes.js';
import ordersRoutes from '../src/orders/order.routes.js';
import reservationsRoutes from '../src/reservations/reservation.routes.js';
import tablesRoutes from '../src/tables/table.routes.js';
import billingRoutes from '../src/billing/billing.routes.js';
import eventsRoutes from '../src/events/event.routes.js';

const BASE_URL = '/restaurantAdmin/v1';

const middlewares = (app) => {
    app.use(helmet(helmetConfiguration));
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: false, limit: '10mb' }));
    app.use(express.json({ limit: '10mb' }));
    app.use(requestLimit);
    app.use(morgan('dev'));
};

const routes = (app) => {
    app.use(`${BASE_URL}/users`, usersRoutes);
    app.use(`${BASE_URL}/restaurants`, restaurantsRoutes);
    app.use(`${BASE_URL}/menus`, menusRoutes);
    app.use(`${BASE_URL}/inventory`, inventoryRoutes);
    app.use(`${BASE_URL}/orders`, ordersRoutes);
    app.use(`${BASE_URL}/reservations`, reservationsRoutes);
    app.use(`${BASE_URL}/tables`, tablesRoutes);
    app.use(`${BASE_URL}/billing`, billingRoutes);
    app.use(`${BASE_URL}/events`, eventsRoutes);
};

const initServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;

    try {
        await dbConnection();
        middlewares(app);
        routes(app);

        app.get(`${BASE_URL}/health`, (req, res) => {
            res.status(200).json({
                status: 'ok',
                service: 'Restaurant Management API',
                version: '1.0.0'
            });
        });

        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
            console.log(`Base URL: http://localhost:${PORT}${BASE_URL}`);
        });
    } catch (error) {
        console.error('Error iniciando servidor:', error);
    }
};

export { initServer };
