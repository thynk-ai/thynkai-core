import type { Brand, IsoDateString } from "../shared/brand.js";
import { nowIso } from "../shared/brand.js";
import { ThynkError } from "../shared/errors.js";
import type { ContributorId } from "../models/contributor.js";

export type ProposalId = Brand<string, "ProposalId">;
export type ProposalStatus =
  | "draft"
  | "review"
  | "accepted"
  | "rejected"
  | "withdrawn";

export interface GovernanceProposal {
  id: ProposalId;
  title: string;
  authorContributorId: ContributorId;
  createdAt: IsoDateString;
  status: ProposalStatus;
  summary: string;
  rationale?: string;
  references?: readonly string[];
}

export function proposalId(id: string): ProposalId {
  if (!id.trim()) throw new TypeError("invalid_proposal_id");
  return id as ProposalId;
}

export function createProposal(input: {
  id: string;
  title: string;
  authorContributorId: ContributorId;
  summary: string;
  rationale?: string;
  references?: readonly string[];
  createdAt?: IsoDateString;
}): GovernanceProposal {
  if (!input.title.trim()) throw new TypeError("invalid_title");
  if (!input.summary.trim()) throw new TypeError("invalid_summary");
  return {
    id: proposalId(input.id),
    title: input.title,
    authorContributorId: input.authorContributorId,
    createdAt: input.createdAt ?? nowIso(),
    status: "draft",
    summary: input.summary,
    rationale: input.rationale,
    references: input.references
      ? Object.freeze([...input.references])
      : undefined,
  };
}

const allowed: Record<ProposalStatus, readonly ProposalStatus[]> = {
  draft: ["review", "withdrawn"],
  review: ["accepted", "rejected", "withdrawn"],
  accepted: [],
  rejected: [],
  withdrawn: [],
};

export function transitionProposal(
  p: GovernanceProposal,
  next: ProposalStatus
): GovernanceProposal {
  const ok = allowed[p.status].includes(next);
  if (!ok)
    throw new ThynkError("proposal_invalid_transition", "invalid_transition", {
      from: p.status,
      to: next,
    });
  return { ...p, status: next };
}
