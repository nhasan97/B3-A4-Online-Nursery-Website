import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidations } from './blog.validation';
import { blogControllers } from './blog.controllers';

const router = express.Router();

//------------route for fetching all the blog data from DB------------
router.get('/get-all-blogs', blogControllers.getAllBlogs);

router.get('/get-all-blogs-count', blogControllers.getBlogCount);

router.get('/get-top-blogs', blogControllers.getTopBlogs);

router.get('/get-single-blog/:id', blogControllers.getSingleBlog);

//------------route for inserting new blog data in DB------------
router.post(
  '/create-blog',
  validateRequest(BlogValidations.createBlogValidationSchema),
  blogControllers.createBlog,
);

//------------route for updating blog data in DB------------
router.put(
  '/edit-blog/:id',
  validateRequest(BlogValidations.updateBlogValidationSchema),
  blogControllers.updateBlog,
);

//------------route for deleting specific blog data from DB------------
router.delete('/delete-blog/:id', blogControllers.deleteBlog);

//exporting routes
export const blogRoutes = router;
