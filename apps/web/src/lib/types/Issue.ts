export type IssueStatus={
    id: string;
    name: string;
}
export type assignee={
    id: string;
    name: string;
  }
  export type cycle={
    id: string;
    name: string;
    startsAt: string;
    endsAt: string;
  }
  
export interface Issue {
    state: IssueStatus;
    project: string | null;
    assignee: assignee | null;
    cycle: cycle | null;
    _id: string;
    linearId: string;
    source: string;
    title: string;
    description: string;
    number: number;
    labels: string[];
    dueDate: string | null;
    createdAt: string;
    updatedAt: string;
    priority: number;
    url: string;
    linearTeamId: string;
    team: string;
    workspace: string;
    isArchived: boolean;
    isDeleted: boolean;
    uuid: string;
    __v: number;
}
