// import Hero from "../components/Hero/Hero";
import Job from "../../components/jobs/Job";

export default function Home({ job }) {
  return (
    <div className="job-posting">
      {/* WIP for the future */}
      {/* <Hero /> */}
      <Job {...job} />
    </div>
  );
}

export async function getServerSideProps({ params: { job } }) {
  // also have company slug available in params
  const jobRes = await fetch(`http://localhost:1337/jobs?slug=${job}`);
  const jobData = await jobRes.json();
  return { props: { job: jobData[0] } };
}
