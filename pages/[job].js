// import Hero from "../components/Hero/Hero";
import Job from "../components/jobs/Job";

export default function Home({ job }) {
  return (
    <div className="job-posting">
      {/* WIP for the future */}
      {/* <Hero /> */}
      <Job job={job} />
    </div>
  );
}

export async function getServerSideProps({ params: { job } }) {
  const res = await fetch(`http://localhost:1337/jobs?slug=${job}`);
  const jobData = await res.json();
  return { props: { job: jobData } };
}
