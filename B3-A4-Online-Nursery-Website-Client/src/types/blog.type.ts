/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent } from "react";

export type Tblog = {
  _id: string;
  title: string;
  thumbnail: string;
  author: string;
  authorImage: string;
  authorEmail: string;
  date: string;
  content: string;
  tags: {
    tag: string;
  }[];
  readingTime: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};

export type TBlogContext = {
  loadingBlogCount: boolean;
  totalBlogs: number;

  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

  loadingTopBlogs: boolean;
  topBlogs: Tblog[];
  loadingBlogs: boolean;
  blogs: Tblog[];

  resetBrowser: () => void;
  resetPagination: () => void;
};

export type TBlogCrudContext = {
  title: string;
  thumbnailImageFile: File | null;
  author: string;
  authorImageFile: File | null;
  authorEmail: string;
  content: string;
  tags: {
    tag: string;
  }[];
  readingTime: string;

  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setThumbnailImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setAuthor: React.Dispatch<React.SetStateAction<string>>;
  setAuthorImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  setAuthorEmail: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        tag: string;
      }[]
    >
  >;
  setReadingTime: React.Dispatch<React.SetStateAction<string>>;

  handleAddBlog: (e: FormEvent, ...args: any[]) => Promise<void>;
  handleEditBlog: (e: FormEvent, ...args: any[]) => Promise<void>;
  handleDeleteBlog: (_id: string) => void;
};
