import Markdown from "../Markdown";

export default function Job(job) {
  return (
    <div className="job-posting">
      <Markdown content={job.content} />
    </div>
  );
}
