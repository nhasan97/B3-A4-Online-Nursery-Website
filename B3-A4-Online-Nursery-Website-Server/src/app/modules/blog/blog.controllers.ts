import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { blogServices } from './blog.services';

/*

--------------controller for getting all blogs data from DB----------------*/
const getAllBlogs = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await blogServices.getAllBlogsFromDB(req?.query);

  //sending response
  //   if (response.length) {
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Blogs retrieved successfully',
    response,
  );
  //   } else {
  //     sendResponse(res, httpStatus.NOT_FOUND, false, 'No Data Found', response);
  //   }
});
/*

--------------controller for getting blogs count from DB----------------*/
const getBlogCount = catchAsync(async (req, res) => {
  const response = await blogServices.getBlogCountFromDB();

  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Data fetched successfully!',
    response,
  );
});
/*

--------------controller for getting all blogs data from DB----------------*/
const getTopBlogs = catchAsync(async (req, res) => {
  //receiving data from service function
  const response = await blogServices.getTopBlogsFromDB();

  //sending response
  if (response.length) {
    sendResponse(
      res,
      httpStatus.OK,
      true,
      'Blogs retrieved successfully',
      response,
    );
  } else {
    sendResponse(res, httpStatus.NOT_FOUND, false, 'No Data Found', response);
  }
});
/*

--------------controller for getting single blog from DB----------------*/
const getSingleBlog = catchAsync(async (req, res) => {
  const response = await blogServices.getSingleBlogFromDB(req.params.id);
  sendResponse(
    res,
    httpStatus.OK,
    true,
    'Blog fetched successfully!',
    response,
  );
});
/*

----------------controller for inserting new blog data in DB----------------*/
const createBlog = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await blogServices.createBlogIntoDB(req.body);

  //sending response
  sendResponse(res, httpStatus.OK, true, 'Blog added successfully', response);
});
/*

--------------controller for updating specific blog info in DB----------------*/
const updateBlog = catchAsync(async (req, res) => {
  //Passing data to service function
  const response = await blogServices.updateBlogIntoDB(req.params.id, req.body);

  //sending response
  sendResponse(res, httpStatus.OK, true, 'Blog updated successfully', response);
});
/*

--------------controller for updating specific blog info in DB----------------*/
const deleteBlog = catchAsync(async (req, res) => {
  //Passing id to service function
  const response = await blogServices.deleteBlogFromDB(req.params.id);

  //sending response
  sendResponse(res, httpStatus.OK, true, 'Blog deleted successfully', response);
});

//exporting all the controller functions through blogControllers object
export const blogControllers = {
  getAllBlogs,
  getBlogCount,
  getTopBlogs,
  getSingleBlog,
  createBlog,
  updateBlog,
  deleteBlog,
};
