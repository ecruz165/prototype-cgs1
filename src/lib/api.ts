import {
  type DecisionDetail,
  DecisionDetailSchema,
  type JobActivity,
  JobActivitySchema,
} from '@/schemas/activity';
import {
  type HaltDetail,
  HaltDetailSchema,
  type JobBudget,
  JobBudgetSchema,
} from '@/schemas/budget';
import {
  type JobContextData,
  JobContextSchema,
  type QueryDetail,
  QueryDetailSchema,
} from '@/schemas/context';
import { type JobFlow, JobFlowSchema } from '@/schemas/flow';
import { type Job, JobSchema } from '@/schemas/job';
import { type NewJobDraft, NewJobDraftSchema } from '@/schemas/newJob';
import { type NodeDetail, NodeDetailSchema } from '@/schemas/nodeDetail';
import {
  type Notifications,
  NotificationsSchema,
} from '@/schemas/notifications';
import {
  type FileDiff,
  FileDiffSchema,
  type JobOutput,
  JobOutputSchema,
} from '@/schemas/output';
import {
  type JobPerformance,
  JobPerformanceSchema,
  type PerfDetail,
  PerfDetailSchema,
} from '@/schemas/performance';
import {
  type GateDetail,
  GateDetailSchema,
  type JobQuality,
  JobQualitySchema,
} from '@/schemas/quality';
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

export async function fetchJobQuality(jobId: string): Promise<JobQuality> {
  const response = await fetch(`/api/jobs/${jobId}/quality`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/quality failed: ${response.status}`,
    );
  }
  return JobQualitySchema.parse(await response.json());
}

export async function fetchGateDetail(
  jobId: string,
  gateId: string,
): Promise<GateDetail> {
  const response = await fetch(`/api/jobs/${jobId}/quality/${gateId}`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/quality/${gateId} failed: ${response.status}`,
    );
  }
  return GateDetailSchema.parse(await response.json());
}

export async function fetchJobBudget(jobId: string): Promise<JobBudget> {
  const response = await fetch(`/api/jobs/${jobId}/budget`);
  if (!response.ok) {
    throw new Error(`GET /api/jobs/${jobId}/budget failed: ${response.status}`);
  }
  return JobBudgetSchema.parse(await response.json());
}

export async function fetchHaltDetail(
  jobId: string,
  gateId: string,
): Promise<HaltDetail> {
  const response = await fetch(`/api/jobs/${jobId}/budget/${gateId}`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/budget/${gateId} failed: ${response.status}`,
    );
  }
  return HaltDetailSchema.parse(await response.json());
}

export async function fetchJobActivity(jobId: string): Promise<JobActivity> {
  const response = await fetch(`/api/jobs/${jobId}/activity`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/activity failed: ${response.status}`,
    );
  }
  return JobActivitySchema.parse(await response.json());
}

export async function fetchDecisionDetail(
  jobId: string,
  decisionId: string,
): Promise<DecisionDetail> {
  const response = await fetch(`/api/jobs/${jobId}/activity/${decisionId}`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/activity/${decisionId} failed: ${response.status}`,
    );
  }
  return DecisionDetailSchema.parse(await response.json());
}

export async function fetchJobPerformance(
  jobId: string,
): Promise<JobPerformance> {
  const response = await fetch(`/api/jobs/${jobId}/performance`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/performance failed: ${response.status}`,
    );
  }
  return JobPerformanceSchema.parse(await response.json());
}

export async function fetchPerfDetail(
  jobId: string,
  itemId: string,
): Promise<PerfDetail> {
  const response = await fetch(`/api/jobs/${jobId}/performance/${itemId}`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/performance/${itemId} failed: ${response.status}`,
    );
  }
  return PerfDetailSchema.parse(await response.json());
}

export async function fetchJobContext(jobId: string): Promise<JobContextData> {
  const response = await fetch(`/api/jobs/${jobId}/context`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/context failed: ${response.status}`,
    );
  }
  return JobContextSchema.parse(await response.json());
}

export async function fetchQueryDetail(
  jobId: string,
  itemId: string,
): Promise<QueryDetail> {
  const response = await fetch(`/api/jobs/${jobId}/context/${itemId}`);
  if (!response.ok) {
    throw new Error(
      `GET /api/jobs/${jobId}/context/${itemId} failed: ${response.status}`,
    );
  }
  return QueryDetailSchema.parse(await response.json());
}

export async function fetchNotifications(): Promise<Notifications> {
  const response = await fetch('/api/notifications');
  if (!response.ok) {
    throw new Error(`GET /api/notifications failed: ${response.status}`);
  }
  return NotificationsSchema.parse(await response.json());
}

export async function fetchNewJobDraft(): Promise<NewJobDraft> {
  const response = await fetch('/api/new-job');
  if (!response.ok) {
    throw new Error(`GET /api/new-job failed: ${response.status}`);
  }
  return NewJobDraftSchema.parse(await response.json());
}
