export const jobPreviewRoutes = {
  updateData: (router, jobs, page) => [
    {
      pathname: router.asPath,
      query: {
        page,
        currentTotal: jobs.length,
      },
    },
    router.asPath,
    { scroll: false },
  ],
};
