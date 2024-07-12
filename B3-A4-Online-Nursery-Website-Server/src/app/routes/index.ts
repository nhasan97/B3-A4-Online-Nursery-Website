import express from 'express';
import { productRoutes } from '../modules/product/product.route';
import { categoryRoutes } from '../modules/category/category.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/products',
    routes: productRoutes,
  },
  {
    path: '/categories',
    routes: categoryRoutes,
  },
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.routes),
);

export default router;
