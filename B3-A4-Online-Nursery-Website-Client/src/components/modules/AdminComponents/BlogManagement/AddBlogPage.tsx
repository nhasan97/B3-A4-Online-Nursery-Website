/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useBlogCrudContext from "@/hooks/useBlogCrudContext";
import { TBlogCrudContext } from "@/types/blog.type";
import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import { IoIosSave } from "react-icons/io";
import DashboardContainer from "@/components/layouts/dashboardLayout/DashboardContainer";
import { Helmet } from "react-helmet-async";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import "../../cssStyles/jodit.css";

const AddBlogPage = () => {
  const {
    tags,
    content,

    setTitle,
    setThumbnailImageFile,
    setAuthor,
    setAuthorImageFile,
    setAuthorEmail,
    setContent,
    setTags,
    setReadingTime,

    handleAddBlog,
  } = useBlogCrudContext() as TBlogCrudContext;

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Start typings...",
  };

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
          <title>Blooms & Beyond | Dashboard | Add Blogs</title>
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
                  <BreadcrumbPage>Add Blogs</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <form
            className="grid gap-4 py-4 overflow-y-auto"
            onSubmit={(e) => handleAddBlog(e)}
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-left text-[#757575]">
                Title
              </Label>
              <Input
                id="title"
                className="col-span-3"
                required
                onBlur={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="thumbnail" className="text-left text-[#757575]">
                Thumbnail
              </Label>
              <Input
                type="file"
                id="thumbnail"
                // required
                className="col-span-3"
                onBlur={(e) =>
                  setThumbnailImageFile(e.target.files?.[0] as File)
                }
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author" className="text-left text-[#757575]">
                Author
              </Label>
              <Input
                id="author"
                className="col-span-3"
                required
                onBlur={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authorEmail" className="text-left text-[#757575]">
                Author's Email
              </Label>
              <Input
                type="email"
                id="authorEmail"
                className="col-span-3"
                required
                onBlur={(e) => setAuthorEmail(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authorImage" className="text-left text-[#757575]">
                Author's Image
              </Label>
              <Input
                type="file"
                id="authorImage"
                className="col-span-3"
                onBlur={(e) => setAuthorImageFile(e.target.files?.[0] as File)}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authorImage" className="text-left text-[#757575]">
                Content
              </Label>

              <div className="col-span-3">
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                  // onChange={(newContent) => {}}
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
                      value={inputField.tag}
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
                required
                onBlur={(e) => setReadingTime(e.target.value)}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#5D7E5F] text-lg font-semibold space-x-2 rounded-full"
            >
              <IoIosSave /> <p>Save</p>
            </Button>
          </form>
        </div>
      </DashboardContainer>
    </div>
  );
};

export default AddBlogPage;