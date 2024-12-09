import express from 'express';
import { productRoutes } from '../modules/product/product.route';
import { categoryRoutes } from '../modules/category/category.route';
import { orderRoutes } from '../modules/order/order.route';
import { authRoutes } from '../modules/auth/auth.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/products',
    routes: productRoutes,
  },
  {
    path: '/categories',
    routes: categoryRoutes,
  },
  {
    path: '/orders',
    routes: orderRoutes,
  },
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.routes),
);

export default router;
