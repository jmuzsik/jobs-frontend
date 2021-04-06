// import Hero from "../components/Hero/Hero";
import JobPreviews from "../components/jobs/JobPreviews";

export default function Home(props) {
  return (
    <div className="home">
      {/* WIP for the future */}
      {/* <Hero /> */}
      <JobPreviews {...props} />
    </div>
  );
}

export async function getServerSideProps({ query }) {
  // get jobs from the api
  const perPage = 6;
  const page = query.page || 0;
  let start = perPage * page;
  const res = await fetch(
    `http://localhost:1337/jobs?_sort=date:desc&_start=${start}&_limit=${perPage}`
  );
  const countRes = await fetch(`http://localhost:1337/jobs/count`);
  const jobs = await res.json();
  const count = await countRes.json();

  return {
    props: {
      jobsData: jobs,
      curPage: page,
      perPage,
      count,
    },
  };
}
