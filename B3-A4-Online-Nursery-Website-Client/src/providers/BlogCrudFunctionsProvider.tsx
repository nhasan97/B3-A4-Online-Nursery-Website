import blogApi from "@/redux/api/blogAPi";
import { Tblog, TBlogCrudContext } from "@/types/blog.type";
import { TChildren } from "@/types/children.type";
import { catchAsync } from "@/utils/catchAsync";
import { displaySuccessToast } from "@/utils/displaySuccessToast";
import { uploadImage } from "@/utils/imageUploader";
import { createContext, FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

export const BlogCrudContext = createContext<TBlogCrudContext | undefined>(
  undefined
);

const BlogCrudFunctionsProvider = ({ children }: TChildren) => {
  //States for crud operations
  const [title, setTitle] = useState("");
  const [thumbnailImageFile, setThumbnailImageFile] = useState<File | null>(
    null
  );
  const [author, setAuthor] = useState("");
  const [authorImageFile, setAuthorImageFile] = useState<File | null>(null);
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<{ tag: string }[]>([{ tag: "" }]);
  const [readingTime, setReadingTime] = useState("");

  //destructuring DB operation functions from hooks
  const [addBlog] = blogApi.useAddBlogMutation();
  const [editBlog] = blogApi.useEditBlogMutation();
  const [deleteBlog] = blogApi.useDeleteBlogMutation();

  //handling addition
  const handleAddBlog = catchAsync(async (e: FormEvent) => {
    e.preventDefault();

    let thumbnail = import.meta.env.VITE_NO_IMAGE_AVAILABLE;
    if (thumbnailImageFile) {
      thumbnail = await uploadImage(thumbnailImageFile as File);
    }

    let authorImage = import.meta.env.VITE_USER_IMAGE;
    if (authorImageFile) {
      authorImage = await uploadImage(authorImageFile as File);
    }

    const blogDetails = {
      title,
      thumbnail,
      author,
      authorImage,
      authorEmail,
      content,
      tags,
      readingTime,
    };

    const res = await addBlog(blogDetails).unwrap();
    displaySuccessToast(res);

    resetStates();

    <Navigate to={"/admin-dashboard/blogs"}></Navigate>;
  });

  //handling edit
  const handleEditBlog = catchAsync(async (e: FormEvent, passedBlog: Tblog) => {
    e.preventDefault();

    let editedThumbail;
    if (thumbnailImageFile) {
      editedThumbail = await uploadImage(thumbnailImageFile as File);
    } else {
      editedThumbail = passedBlog?.thumbnail;
    }

    let editedAuthorImage;
    if (authorImageFile) {
      editedAuthorImage = await uploadImage(authorImageFile as File);
    } else {
      editedAuthorImage = passedBlog?.authorImage;
    }

    const payload = {
      _id: passedBlog?._id,
      blogDetails: {
        title: title || passedBlog?.title,
        thumbnail: editedThumbail,
        author: author || passedBlog?.author,
        authorImage: editedAuthorImage,
        authorEmail: authorEmail || passedBlog?.authorEmail,
        content: content || passedBlog?.content,
        tags: tags || passedBlog?.tags,
        readingTime: readingTime || passedBlog?.readingTime,
      },
    };
    const res = await editBlog(payload).unwrap();
    displaySuccessToast(res);
  });

  //handling delete
  const handleDeleteBlog = (_id: string) => {
    toast.warning("Are you sure? You won't be able to revert this!", {
      action: {
        label: "Yes, delete it",
        onClick: catchAsync(async () => {
          const res = await deleteBlog(_id).unwrap();
          displaySuccessToast(res);
        }),
      },
      cancel: {
        label: "Cancel",
        onClick: () => toast.info("Cancelled!", { duration: 2000 }),
      },
    });
  };

  const resetStates = () => {
    setTitle("");
    setThumbnailImageFile(null);
    setAuthor("");
    setAuthorImageFile(null);
    setAuthorEmail("");
    setContent("");
    setTags([{ tag: "" }]);
    setReadingTime("");
  };

  const blogCrudFunctions: TBlogCrudContext = {
    title,
    thumbnailImageFile,
    author,
    authorImageFile,
    authorEmail,
    content,
    tags,
    readingTime,

    setTitle,
    setThumbnailImageFile,
    setAuthor,
    setAuthorImageFile,
    setAuthorEmail,
    setContent,
    setTags,
    setReadingTime,

    handleAddBlog,
    handleEditBlog,
    handleDeleteBlog,
  };

  return (
    <BlogCrudContext.Provider value={blogCrudFunctions}>
      {children}
    </BlogCrudContext.Provider>
  );
};

export default BlogCrudFunctionsProvider;
