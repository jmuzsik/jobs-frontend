export const truncate = (s = "") => {
  return s.length > 300 ? s.slice(0, 300) + "..." : s;
};

export const getTotalPages = (count, perPage) => Math.ceil(count / perPage);

export const getMoreData = (inView, curPage, totalPages) =>
  inView && curPage < totalPages - 1;

export const isNotLast = (jobs, i) => jobs.length - 1 !== i;

export const createPaginationPageStr = (paginationPage, totalPages) =>
  `${Number(paginationPage) + 1}/${Number(totalPages)}`;

export const calcProgress = (paginationPage, totalPages) =>
  (Number(paginationPage) + 1) / (Number(totalPages));
