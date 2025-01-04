import express from 'express';
import { productRoutes } from '../modules/product/product.route';
import { categoryRoutes } from '../modules/category/category.route';
import { orderRoutes } from '../modules/order/order.route';
import { authRoutes } from '../modules/auth/auth.route';
import { userRoutes } from '../modules/user/user.routes';
import { reviewRoutes } from '../modules/reviews/review.route';
import { blogRoutes } from '../modules/blog/blog.route';
import { messageRoutes } from '../modules/message/message.route';
import { wishlistRoutes } from '../modules/wishlist/wishlist.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: authRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
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
  {
    path: '/blogs',
    routes: blogRoutes,
  },
  {
    path: '/reviews',
    routes: reviewRoutes,
  },
  {
    path: '/messages',
    routes: messageRoutes,
  },
  {
    path: '/wishlist',
    routes: wishlistRoutes,
  },
];

moduleRoutes.forEach((moduleRoute) =>
  router.use(moduleRoute.path, moduleRoute.routes),
);

export default router;
