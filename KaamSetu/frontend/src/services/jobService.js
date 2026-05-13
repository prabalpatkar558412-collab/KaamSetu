import API from "./api";

export const getAvailableJobs = async () => {
  const response = await API.get("/jobs/available");
  return response.data;
};

export const bookJob = async (jobId) => {
  const response = await API.put(`/jobs/book/${jobId}`);
  return response.data;
};

export const updateJobStatus = async (
  jobId,
  status
) => {
  const response = await API.put(
    `/jobs/status/${jobId}`,
    { status }
  );

  return response.data;
};