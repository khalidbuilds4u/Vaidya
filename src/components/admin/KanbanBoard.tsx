"use client";

import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { updateCaseStatusDirect } from "@/app/actions/caseActions";
import { StatusDropdown } from "./StatusDropdown";
import { Calendar, MapPin, Building2, User, Clock, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const KANBAN_COLUMNS = [
  {
    id: "col-new",
    title: "New Leads",
    statuses: ["NEW", "UNDER_REVIEW", "ASSIGNED"],
    defaultStatus: "NEW",
    color: "bg-blue-50 border-blue-200 text-blue-700",
  },
  {
    id: "col-medical",
    title: "Medical Evaluation",
    statuses: ["HOSPITAL_MATCHING", "HOSPITAL_CONTACTED"],
    defaultStatus: "HOSPITAL_MATCHING",
    color: "bg-purple-50 border-purple-200 text-purple-700",
  },
  {
    id: "col-quoting",
    title: "Quoting & Decision",
    statuses: ["QUOTE_PENDING", "QUOTE_RECEIVED", "PATIENT_REVIEWING"],
    defaultStatus: "QUOTE_PENDING",
    color: "bg-amber-50 border-amber-200 text-amber-700",
  },
  {
    id: "col-treatment",
    title: "Treatment",
    statuses: ["TRAVEL_PLANNING", "ADMITTED", "TREATMENT_IN_PROGRESS", "TREATMENT_COMPLETED", "FOLLOW_UP"],
    defaultStatus: "TRAVEL_PLANNING",
    color: "bg-teal-50 border-teal-200 text-teal-700",
  },
  {
    id: "col-closed",
    title: "Closed",
    statuses: ["COMPLETED", "CANCELLED", "LOST", "DUPLICATE"],
    defaultStatus: "COMPLETED",
    color: "bg-slate-50 border-slate-200 text-slate-700",
  },
];

type KanbanBoardProps = {
  cases: any[];
};

export function KanbanBoard({ cases: initialCases }: KanbanBoardProps) {
  const [cases, setCases] = useState(initialCases);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCases(initialCases);
  }, [initialCases]);

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const sourceColId = result.source.droppableId;
    const destColId = result.destination.droppableId;
    const caseId = result.draggableId;

    if (sourceColId === destColId && result.source.index === result.destination.index) {
      return;
    }

    const destCol = KANBAN_COLUMNS.find((c) => c.id === destColId);
    if (!destCol) return;

    // Optimistic update
    const previousCases = [...cases];
    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          // If we move it to a different column, update status to default
          // If it's the same column, we just reorder (we don't persist order in DB right now, but UI will reflect)
          const newStatus = sourceColId !== destColId ? destCol.defaultStatus : c.status;
          return { ...c, status: newStatus };
        }
        return c;
      })
    );

    if (sourceColId !== destColId) {
      try {
        await updateCaseStatusDirect(caseId, destCol.defaultStatus);
      } catch (error) {
        console.error("Failed to update status", error);
        setCases(previousCases); // Revert on failure
      }
    }
  };

  if (!isClient) {
    return <div className="h-64 flex items-center justify-center text-slate-400">Loading Kanban Board...</div>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4 items-start min-h-[calc(100vh-250px)]">
        {KANBAN_COLUMNS.map((column) => {
          // Filter cases for this column
          const columnCases = cases.filter((c) => column.statuses.includes(c.status));

          return (
            <div key={column.id} className="w-80 shrink-0 flex flex-col bg-slate-100/50 rounded-2xl border border-slate-200/60 max-h-full">
              {/* Column Header */}
              <div className="p-4 border-b border-slate-200/60 flex items-center justify-between">
                <h3 className={`text-sm font-bold px-3 py-1 rounded-full border ${column.color}`}>
                  {column.title}
                </h3>
                <span className="text-xs font-semibold text-slate-400 bg-white px-2 py-0.5 rounded-full shadow-sm">
                  {columnCases.length}
                </span>
              </div>

              {/* Column Content */}
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 p-3 space-y-3 min-h-[150px] transition-colors ${
                      snapshot.isDraggingOver ? "bg-primary/5" : ""
                    }`}
                  >
                    {columnCases.map((patientCase, index) => (
                      <Draggable key={patientCase.id} draggableId={patientCase.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`bg-white rounded-xl border p-4 shadow-sm group ${
                              snapshot.isDragging ? "shadow-lg border-primary ring-2 ring-primary/20 rotate-2" : "border-slate-200 hover:border-primary/50"
                            } transition-all`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                                {patientCase.referenceId}
                              </span>
                              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(patientCase.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            
                            <h4 className="font-bold text-slate-900 mb-1">
                              {patientCase.patient?.firstName} {patientCase.patient?.lastName}
                            </h4>
                            
                            <div className="text-xs text-slate-500 mb-3 line-clamp-2">
                              {patientCase.medicalCondition || "Unspecified condition"}
                            </div>

                            <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {patientCase.patient?.country || "Unknown"}
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2" onPointerDown={(e) => e.stopPropagation()}>
                               <StatusDropdown 
                                caseId={patientCase.id} 
                                currentStatus={patientCase.status} 
                              />
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          );
        })}
      </div>
    </DragDropContext>
  );
}
