import update from "immutability-helper";

export const jobPreviewUpdates = {
  scrollHeights: (scrollHeights, page) => {
    // infinity to avoid wierd stuff happening in case incompatible with users browser
    const height = document.documentElement.scrollTop || Infinity;
    return update(scrollHeights, { $push: [{ height, pageNum: page }] });
  },
  jobs: (jobs, jobsData) => {
    let newJobs = jobs;
    for (let i = 0; i < jobsData.length; i++) {
      const cur = jobsData[i];
      newJobs = update(newJobs, { $push: [cur] });
    }
    return newJobs;
  },
  paginationPage: (scrollHeights, y) => {
    let page = 0;
    let closestToZero = Infinity;
    for (let i = 0; i < scrollHeights.length; i++) {
      const c = scrollHeights[i];
      // it's negative for whatever reason
      let v = Math.abs(Math.abs(y) - c.height);
      if (v < closestToZero) {
        closestToZero = v;
        page = c.pageNum;
      }
    }
    return page;
  },
};
