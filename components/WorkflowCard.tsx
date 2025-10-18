"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { Workflow } from "@prisma/client";

interface WorkflowCardProps {
  workflow: Workflow & { versions: { id: string; content: string; note: string; createdAt: string }[]; comments: { id: string; body: string; createdAt: string; user: { id: string; name: string; email: string } }[] };
  onDelete?: (id: string) => void;
}

export function WorkflowCard({ workflow, onDelete }: WorkflowCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">{workflow.title}</CardTitle>
            {workflow.description && (
              <CardDescription>{workflow.description}</CardDescription>
            )}
          </div>
          {workflow.isPublic && (
            <Badge variant="secondary">Public</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <span>{workflow.versions.length} versions</span>
          <span>{workflow.comments.length} comments</span>
          <span>{new Date(workflow.updatedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex gap-2">
          <Link href={`/workflows/${workflow.id}`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Eye className="h-4 w-4" />
              View
            </Button>
          </Link>
          <Link href={`/workflows/${workflow.id}/edit`}>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => onDelete?.(workflow.id)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
