// import Hero from "../components/Hero/Hero";
import JobPreviews from "../components/jobs/JobPreviews";

export default function Home({ jobs }) {
  return (
    <div className="home">
      {/* WIP for the future */}
      {/* <Hero /> */}
      <JobPreviews jobs={jobs} />
    </div>
  );
}

export async function getServerSideProps({ params: { page } }) {
  // right now as i have few jobs, do 3
  const start = page * 3;
  const res = await fetch(
    `http://localhost:1337/jobs?_sort=date:desc&_start=${start}&_limit=3`
  );
  const jobs = await res.json();
  return { props: { jobs } };
}
