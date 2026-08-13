import { type JobFlow, JobFlowSchema } from '@/schemas/flow';
import { type Job, JobSchema } from '@/schemas/job';
import { type NodeDetail, NodeDetailSchema } from '@/schemas/nodeDetail';
import {
  type FileDiff,
  FileDiffSchema,
  type JobOutput,
  JobOutputSchema,
} from '@/schemas/output';
import {
  type JobSteering,
  JobSteeringSchema,
  type SteeringDetail,
  SteeringDetailSchema,
} from '@/schemas/steering';

// Zod at the network boundary: malformed payloads become Query errors
// instead of bad renders.
export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch('/api/jobs');
  if (!response.ok) {
    throw new Error(`GET /api/jobs failed: ${response.status}`);
  }
  return JobSchema.array().parse(await response.json());
}

export async function fetchJobFlow(jobId: string): Promise<JobFlow> {
  const response = await fetch(`/api/jobs/${jobId}/flow`);
  if (!response.ok) {
    throw new Error(`GET /api/jobs/${jobId}/flow failed: ${response.status}`);
  }
  return JobFlowSchema.parse(await response.json());
}

export async function fetchNodeDetail(
  jobId: string,
  phaseId: string,
): Promise<NodeDetail> {
  const response = await fetch(`/api/jobs/${jobId}/flow/${phaseId}`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/flow/${phaseId} failed: ${response.status}`,
    );
  }
  return NodeDetailSchema.parse(await response.json());
}

export async function fetchJobSteering(jobId: string): Promise<JobSteering> {
  const response = await fetch(`/api/jobs/${jobId}/steering`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/steering failed: ${response.status}`,
    );
  }
  return JobSteeringSchema.parse(await response.json());
}

export async function fetchSteeringDetail(
  jobId: string,
  requestId: string,
): Promise<SteeringDetail> {
  const response = await fetch(`/api/jobs/${jobId}/steering/${requestId}`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/steering/${requestId} failed: ${response.status}`,
    );
  }
  return SteeringDetailSchema.parse(await response.json());
}

export async function fetchJobOutput(jobId: string): Promise<JobOutput> {
  const response = await fetch(`/api/jobs/${jobId}/output`);
  if (!response.ok) {
    throw new Error(`GET /api/jobs/${jobId}/output failed: ${response.status}`);
  }
  return JobOutputSchema.parse(await response.json());
}

export async function fetchFileDiff(
  jobId: string,
  fileId: string,
): Promise<FileDiff> {
  const response = await fetch(
    `/api/jobs/${jobId}/output/files/${encodeURIComponent(fileId)}`,
  );
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/output/files/${fileId} failed: ${response.status}`,
    );
  }
  return FileDiffSchema.parse(await response.json());
}
