import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProgressBar, H1 } from "@blueprintjs/core";
import { useInView } from "react-intersection-observer";

import Link from "../Link";
import JobPreview from "./JobPreview";

import useScrollPosition from "../../hooks/useScrollPosition";

import {
  getTotalPages,
  isNotLast,
  getMoreData,
  createPaginationPageStr,
  calcProgress,
} from "./utils";
import { JOB_PREVIEW } from "./constants";
import { jobPreviewUpdates } from "./updates";
import { jobPreviewRoutes } from "./routes";

export default function JobPreviews({ jobsData, curPage, count, perPage }) {
  const [jobs, setJobs] = useState(JOB_PREVIEW.jobs);
  const [scrollHeights, setScrollHeights] = useState(JOB_PREVIEW.scrollHeights);
  const [paginationPage, setPaginationPage] = useState(
    JOB_PREVIEW.paginationPage
  );

  const router = useRouter();
  // intersection observer - ie. when is the ref in view?
  const { ref, inView } = useInView({ threshold: 1 });

  const totalPages = getTotalPages(count, perPage);

  // Set jobs
  useEffect(() => {
    if (count !== jobs.length) {
      setJobs(jobPreviewUpdates.jobs(jobs, jobsData));
    }
  }, [jobsData]);

  // each time the ref attaches to the final job posting currently queried
  // this runs when it is fully on the screens
  useEffect(() => {
    if (getMoreData(inView, curPage, totalPages)) {
      const page = Number(curPage) + 1;
      setScrollHeights(jobPreviewUpdates.scrollHeights(scrollHeights, page));
      // returns array of arguments
      router.replace(...jobPreviewRoutes.updateData(router, jobs, page));
    }
  }, [inView]);

  useScrollPosition(({ currPos: { y } }) => {
    const page = jobPreviewUpdates.paginationPage(scrollHeights, y);
    if (page !== paginationPage) setPaginationPage(page);
  });

  return (
    <div className="jobs container">
      {jobs.map((job, i) => {
        return (
          // slug is uid
          <Link slug={job.slug} key={job.id} className="job">
            {isNotLast(jobs, i) ? (
              <JobPreview job={job} />
            ) : (
              <JobPreview job={job} passedRef={ref} final={true} />
            )}
          </Link>
        );
      })}
      <div className="pagination">
        <H1>{createPaginationPageStr(paginationPage, totalPages)}</H1>
        <ProgressBar
          stripes={false}
          animate={false}
          value={calcProgress(paginationPage, totalPages)}
        />
      </div>
      <style jsx>
        {`.jobs {
          margin-left: 1rem;
          margin-right: 1rem;
        }
          @media (min-width: 1100px) {
            .jobs {
              width: 1000px;
              margin: 2rem auto;
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-gap: 1rem;
            }
          }
        }
        .pagination {
          height: 100px; 
          position: fixed; 
          top: 5rem;
          right: 2rem;
        }`}
      </style>
    </div>
  );
}
