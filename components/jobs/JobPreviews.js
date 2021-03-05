import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card, Elevation, Divider, ProgressBar, H1 } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import update from "immutability-helper";
import { useInView } from "react-intersection-observer";
import useScrollPosition from "../../hooks/useScrollPosition";

import Markdown from "../Markdown";

const getTimeAgo = (time) => {
  // in miliseconds
  var units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: (24 * 60 * 60 * 1000 * 365) / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  var rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  var elapsed = time - new Date();

  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u == "second") {
      return rtf.format(Math.round(elapsed / units[u]), u);
    }
};

const truncate = (s = "") => {
  return s.length > 200 ? s.slice(0, 200) + "..." : s;
};

function JobPreview({ job = {}, passedRef, final = false }) {
  const Inner = ({ job }) => (
    <Card className="card" elevation={Elevation.TWO} interactive>
      <h2>{job.title}</h2>
      <Markdown content={truncate(job.meta_description)} />
      <Divider />
      <div className="meta-job-footer">
        <p className="date">{job.date && getTimeAgo(new Date(job.date))}</p>
      </div>
      <style jsx>{`
        .card {
          margin: 5px;
        }
        .meta-job-footer .date {
          color: #808080;
        }
      `}</style>
    </Card>
  );
  // It's a real pain to conditionally add refs
  if (final) {
    return (
      <div ref={passedRef}>
        <Inner job={job} />
      </div>
    );
  }
  return <Inner job={job} />;
}

export default function JobPreviews({ jobsData, curPage, count, perPage }) {
  const totalPages = Math.ceil(count / perPage);

  const [jobs, setJobs] = useState([]);
  const [scrollHeights, setScrollHeights] = useState([
    { height: 0, pageNum: 0 },
  ]);
  const [paginationPage, setPaginationPage] = useState(0);

  const router = useRouter();

  // Set jobs
  useEffect(() => {
    let newJobs = jobs;
    for (let i = 0; i < jobsData.length; i++) {
      const cur = jobsData[i];
      newJobs = update(newJobs, { $push: [cur] });
    }
    setJobs(newJobs);
  }, [jobsData]);

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && curPage < totalPages - 1) {
      // infinity to avoid wierd stuff happening in case incompatible with users browser
      const height = document.documentElement.scrollTop || Infinity;
      const page = Number(curPage) + 1;
      setScrollHeights(
        update(scrollHeights, { $push: [{ height, pageNum: page }] })
      );
      router.replace(
        {
          pathname: router.asPath,
          query: {
            page,
            currentTotal: jobs.length,
          },
        },
        router.asPath,
        { scroll: false }
      );
    }
  }, [inView]);

  useScrollPosition(({ currPos: { y } }) => {
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
    if (page !== paginationPage) setPaginationPage(page);
  });

  return (
    <div className="jobs container">
      {jobs?.map((job, i) => {
        if (jobs.length - 1 !== i) {
          return (
            <Link href={`/${job.slug}-${i}`} key={job.id}>
              <a className={`job`}>
                <JobPreview job={job} />
              </a>
            </Link>
          );
        }
        return (
          <Link href={`/${job.slug}-${jobs.length - 1}`} key={job.id}>
            <a className={`job`}>
              <JobPreview job={job} passedRef={ref} final={true} />
            </a>
          </Link>
        );
      })}
      <div className="pagination">
        <H1>
          {Number(paginationPage) + 1}/{Number(totalPages)}
        </H1>
        <ProgressBar
          stripes={false}
          animate={false}
          value={Number(paginationPage) / (Number(totalPages) - 1)}
        />
      </div>
      <style jsx>{`
          .jobs {
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
          }
        `}</style>
    </div>
  );
}
