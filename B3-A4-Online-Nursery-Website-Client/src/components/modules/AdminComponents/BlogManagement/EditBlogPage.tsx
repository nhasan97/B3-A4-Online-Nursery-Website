import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import Loading from "@/components/shared/Loading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBlogCrudContext from "@/hooks/useBlogCrudContext";
import blogApi from "@/redux/api/blogAPi";
import { TBlogCrudContext } from "@/types/blog.type";
import JoditEditor from "jodit-react";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { IoIosSave } from "react-icons/io";
import { useParams } from "react-router-dom";

const EditBlogPage = () => {
  const { _id } = useParams();

  const { isLoading: loadingBlog, data: loadedBlog } =
    blogApi.useGetSingleBlogQuery(_id);

  const {
    tags,
    setTitle,
    setThumbnailImageFile,
    setAuthor,
    setAuthorImageFile,
    setAuthorEmail,
    setContent,
    setTags,
    setReadingTime,
    handleEditBlog,
  } = useBlogCrudContext() as TBlogCrudContext;

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Start typings...",
  };

  useEffect(() => {
    if (!loadingBlog) {
      setTags(loadedBlog?.data?.tags);
    }
  }, [loadedBlog?.data?.tags, loadingBlog, setTags]);

  const changeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const values = [...tags];
    const key = e.target.name as keyof (typeof values)[number];
    values[index][key] = e.target.value;
    setTags(values);
  };

  const handleAddFields = () => {
    setTags([...tags, { tag: "" }]);
  };

  const handleRemoveFields = (index: number) => {
    const values = [...tags];
    values.splice(index, 1);
    setTags(values);
  };

  return (
    <div className="h-[calc(100vh-64px)]">
      <DashboardContainer>
        <Helmet>
          <title>Blooms & Beyond | Dashboard | Edit Blog</title>
        </Helmet>

        <div className="w-full h-full flex flex-col gap-3">
          <div className="w-full">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/admin-overview">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin-dashboard/blogs">
                    Blogs
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />

                <BreadcrumbItem>
                  <BreadcrumbPage>Edit Blog</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {loadingBlog ? (
            <Loading />
          ) : (
            <div
              className="bg-white grid gap-12 p-2 sm:p-5 rounded-lg overflow-y-auto"
              onSubmit={(e) => handleEditBlog(e, loadedBlog?.data)}
            >
              <div className="space-y-3 sm:space-y-6">
                <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                  Blog Metadata
                </h6>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-left text-[#757575]">
                    Title
                  </Label>
                  <Input
                    id="title"
                    className="col-span-3"
                    defaultValue={loadedBlog?.data?.title}
                    onBlur={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="thumbnail"
                    className="text-left text-[#757575]"
                  >
                    Thumbnail
                  </Label>

                  <div className="col-span-3 flex items-center gap-4">
                    <img
                      src={loadedBlog?.data?.thumbnail}
                      alt=""
                      className="size-20 p-[2px] border-2 border-[#5D7E5F] rounded-full"
                    />
                    <Input
                      type="file"
                      id="thumbnail"
                      onBlur={(e) =>
                        setThumbnailImageFile(e.target.files?.[0] as File)
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="tags" className="text-left text-[#757575]">
                    Tags
                  </Label>
                  <div className="col-span-3 max-h-[125px] space-y-3 overflow-y-auto">
                    {tags.map((inputField, index) => (
                      <div key={index} className="flex gap-2 sm:gap-6">
                        <Input
                          type="text"
                          id="tag"
                          name="tag"
                          defaultValue={inputField.tag}
                          onChange={(e) => changeInput(e, index)}
                        />

                        <Button
                          className="text-lg hover:text-green-500"
                          onClick={handleAddFields}
                        >
                          <i className="fa-solid fa-circle-plus"></i>
                        </Button>

                        <Button
                          className="text-lg hover:text-red-600"
                          onClick={() => handleRemoveFields(index)}
                          disabled={tags.length === 1}
                        >
                          <i className="fa-solid fa-circle-minus"></i>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="read" className="text-left text-[#757575]">
                    Reading Duration
                  </Label>
                  <Input
                    id="read"
                    className="col-span-3"
                    defaultValue={loadedBlog?.data?.readingTime}
                    onBlur={(e) => setReadingTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-3 sm:space-y-6">
                <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                  Author Information
                </h6>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="author" className="text-left text-[#757575]">
                    Author
                  </Label>
                  <Input
                    id="author"
                    className="col-span-3"
                    defaultValue={loadedBlog?.data?.author}
                    onBlur={(e) => setAuthor(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="authorEmail"
                    className="text-left text-[#757575]"
                  >
                    Author's Email
                  </Label>
                  <Input
                    type="email"
                    id="authorEmail"
                    className="col-span-3"
                    defaultValue={loadedBlog?.data?.authorEmail}
                    onBlur={(e) => setAuthorEmail(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="authorImage"
                    className="text-left text-[#757575]"
                  >
                    Author's Image
                  </Label>
                  <div className="col-span-3 flex items-center gap-4">
                    <img
                      src={loadedBlog?.data?.authorImage}
                      alt=""
                      className="size-20 p-[2px] border-2 border-[#5D7E5F] rounded-full"
                    />
                    <Input
                      type="file"
                      id="authorImage"
                      onBlur={(e) =>
                        setAuthorImageFile(e.target.files?.[0] as File)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-6">
                <h6 className="text-lg lg:text-xl text-[#505050] font-medium">
                  Content
                </h6>

                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-span-4">
                    <JoditEditor
                      ref={editor}
                      value={loadedBlog?.data?.content}
                      config={config}
                      onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for perdivance reasons
                      // onBlur={(newContent) => {}}
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
                onClick={(e) => handleEditBlog(e, loadedBlog?.data)}
              >
                <IoIosSave /> <p>Save</p>
              </Button>
            </div>
          )}
        </div>
      </DashboardContainer>
    </div>
  );
};

export default EditBlogPage;
