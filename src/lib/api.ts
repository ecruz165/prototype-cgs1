import { type JobFlow, JobFlowSchema } from '@/schemas/flow';
import { type Job, JobSchema } from '@/schemas/job';
import { type NodeDetail, NodeDetailSchema } from '@/schemas/nodeDetail';

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
