const fetcher = (...arg: [RequestInfo, RequestInit?]) => fetch(...arg).then((res) => res.json());
export default fetcher;
