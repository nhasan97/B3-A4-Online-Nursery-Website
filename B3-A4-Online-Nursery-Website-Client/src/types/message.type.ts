export type TMessage = {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  sendersImage?: string;
  sentTo: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};

export type TMessageContext = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;

  loadingMessages: boolean;
  receivedMessages: TMessage[];
  sentMessages: TMessage[];
  totalReceivedCount: number;
  totalSentCount: number;

  resetBrower: () => void;
  resetPagination: () => void;
  handleDeleteMessage: (_id: string) => void;
};
