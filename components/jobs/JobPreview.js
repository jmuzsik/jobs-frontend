import { Card, Elevation, Divider, ProgressBar, H1 } from "@blueprintjs/core";
import { getTimeAgo } from "../../utils/time";

import Markdown from "../Markdown";

import { truncate } from "./utils";

export default function JobPreview({ job = {}, passedRef, final = false }) {
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
