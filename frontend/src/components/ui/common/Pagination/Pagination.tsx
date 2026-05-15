import { useFrappeGetDocCount, type Filter } from "frappe-react-sdk";
import React from "react";
import PageSelector from "./PageSelector";

type Props = {
  doctype: string;
  filters?: Filter[];
  pageLimitStart: number;
  setPageLimitStart: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  doctype,
  filters,
  pageLimitStart,
  setPageLimitStart,
}: Props) => {
  const PAGE_LENGTH = 20;

  const { data: count } = useFrappeGetDocCount(doctype, filters);

  const totalPages = Math.ceil((count ?? 0) / PAGE_LENGTH);

  const currentPage = pageLimitStart / PAGE_LENGTH;

  const next = () => {
    console.log("next");
    setPageLimitStart((p) => {
      const newPageLimitStart = p + PAGE_LENGTH;
      if (newPageLimitStart > (count ?? 0)) return p;
      return newPageLimitStart;
    });
  };
  const previous = () => {
    console.log("previous");
    setPageLimitStart((p) => {
      const newPageLimitStart = p - PAGE_LENGTH;
      if (newPageLimitStart < 0) return p;
      return newPageLimitStart;
    });
  };

  console.log(count);
  return (
    <PageSelector
      currentPage={currentPage}
      totalPages={totalPages}
      next={next}
      previous={previous}
    />
  );
};

export default Pagination;
