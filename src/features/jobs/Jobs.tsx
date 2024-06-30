import './styles.css';
import { useState, useEffect } from "react";

const JOBS_PER_PAGE = 6;
const JOBS_IDS_URL = "https://hacker-news.firebaseio.com/v0/jobstories.json";
const DEFAULT_FETCH_PARAMS = {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
}

interface Job {
  url: string;
  by: string;
  title: string;
  time: number;
}
type ButtonT = {
  text: string;
  onClick: () => void
}
type JobItemT = {
  job: Job
}

const Button = ({ text, onClick }: ButtonT) => {
  return (
    <button className="btn" onClick={onClick}>{text}</button>
  )
}

const JobItem = ({ job }: JobItemT) => {
  const title = job.url
    ? <a className="card-title" href={job.url}>{job.title}</a> 
    : <span className="card-title">{job.title}</span>;

  const datetime = new Date(job.time);

  return (
    <article className="job-card">
      {title}
      <span>By {job.by} | {datetime.toString()}</span>
    </article>
  )
}

const JobsList = ({ jobs }: { jobs: Job[] }) => {
  return (
    <ul className="jobs-list">
      {jobs.map(job => <li><JobItem job={job} /></li>)}
    </ul>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [jobsIds, setJobsIds] = useState<number[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchJobsIds();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [jobsIds.length, page])

  const fetchJobsIds = async () => {
    const response = await fetch(JOBS_IDS_URL, DEFAULT_FETCH_PARAMS);
    const ids = await response.json();

    setJobsIds(ids);
    setIsLoading(false);
  }

  const fetchJob = async (url: string) => {
    return fetch(url, DEFAULT_FETCH_PARAMS).then(res => res.json());
  }

  const fetchJobs = async () => {
    setIsLoading(true);

    const start = jobs.length;
    const end = JOBS_PER_PAGE * page;
    const currentIds = jobsIds.slice(start, end);
    const currentUrls = currentIds.map((id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    const result = await Promise.all(currentUrls.map(url => fetchJob(url)));

    setJobs([...jobs, ...result]);
    setIsLoading(false);
  }

  const onLoadMore = () => {
    setPage((page) => page + 1);
  }

  return (
    <div>
      <h1>Hacker News Jobs Board</h1>
      <JobsList jobs={jobs} />
      <Button text={isLoading ? "Loading..." : "Load More"} onClick={onLoadMore} />
    </div>
  );
}
