import React, { useMemo } from "react";
import { Gantt, Willow } from "@svar-ui/react-gantt";

// FIX: The documentation mentions 'all.css', but newer versions often use 'dist/style.css'
// If this build fails, try: "@svar-ui/react-gantt/style.css" or "@svar-ui/react-gantt/index.css"
import "@svar-ui/react-gantt/dist/style.css";

// Helper to format dates (e.g., "Tue 4/15/25")
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "numeric",
  day: "numeric",
  year: "2-digit",
});

function App() {
  // Define columns manually to fix broken icons & add "Finish Date"
  const columns = useMemo(() => [
    { id: "text", header: "Task Name", flexgrow: 1, tree: true, minWidth: 200 },
    { id: "start", header: "Start Date", width: 100, align: "center" },
    { 
      id: "end", 
      header: "Finish Date", 
      width: 100, 
      align: "center",
      template: (task) => task.end ? dateFormatter.format(task.end) : "" 
    },
    { id: "duration", header: "Duration", width: 80, align: "center" },
    { 
      id: "add-task", 
      header: "", 
      width: 40, 
      align: "center",
      // Manually render a "+" symbol to avoid broken icon fonts
      template: () => `<div style="font-weight:bold; font-size:20px; cursor:pointer; color:#555;">+</div>`
    }
  ], []);

  // Your "Proposed Office Fit-out" Schedule Data
  const tasks = useMemo(() => [
    // Project Root
    { id: 1, text: "Proposed Office Fit-out for Security Bank Corporation", type: "summary", start: new Date(2025, 1, 17), duration: 506, open: true },
    
    // Phase: Construction Documentation
    { id: 2, text: "CONSTRUCTION DOCUMENTATION", type: "summary", start: new Date(2025, 1, 17), duration: 102, parent: 1, open: true },
    { id: 3, text: "Preparation of vetting & construction drawings", start: new Date(2025, 1, 17), duration: 30, parent: 2 },
    { id: 4, text: "Submission of vetting & construction drawings", start: new Date(2025, 2, 19), duration: 9, parent: 2 },
    { id: 5, text: "Submission and review of construction drawings", start: new Date(2025, 2, 28), duration: 22, parent: 2 },
    { id: 6, text: "Submission of final bid proposal", start: new Date(2025, 3, 10), duration: 1, parent: 2 },
    { id: 7, text: "Review and clarification of bid proposal", start: new Date(2025, 3, 11), duration: 1, parent: 2 },
    
    // Milestones
    { id: 8, text: "Appointment of DB&B as fit-out contractor", type: "milestone", start: new Date(2025, 3, 14), duration: 0, parent: 1 },
    { id: 9, text: "Site hand-over by the Landlord / Tenant", type: "milestone", start: new Date(2025, 3, 15), duration: 0, parent: 1 },
    { id: 10, text: "Sign-off on project schedule and cost proposal", type: "milestone", start: new Date(2025, 3, 15), duration: 0, parent: 1 },
    
    // Phase: Construction Development
    { id: 13, text: "CONSTRUCTION DEVELOPMENT", type: "summary", start: new Date(2025, 3, 21), duration: 78, parent: 1, open: true },
    { id: 14, text: "Mobilization", start: new Date(2025, 3, 21), duration: 1, parent: 13 },
    { id: 15, text: "Site Protection & Demolition Works", start: new Date(2025, 3, 22), duration: 10, parent: 13 },
    { id: 16, text: "Site Setting Out Works", start: new Date(2025, 4, 2), duration: 4, parent: 13 },
    { id: 17, text: "Approval of Set Out", start: new Date(2025, 4, 6), duration: 1, parent: 13 },
    { id: 18, text: "Civil Works", start: new Date(2025, 4, 7), duration: 30, parent: 13 },
    { id: 19, text: "Roughing-in works for MEP", start: new Date(2025, 4, 7), duration: 30, parent: 13 },
    
    // Finishes
    { id: 20, text: "Installation of floor finishes", start: new Date(2025, 5, 6), duration: 4, parent: 13 },
    { id: 21, text: "Installation of joineries", start: new Date(2025, 5, 10), duration: 4, parent: 13 },
    { id: 22, text: "General Cleaning", start: new Date(2025, 5, 14), duration: 5, parent: 13 },
    
    // Completion
    { id: 23, text: "Practical Completion", type: "milestone", start: new Date(2025, 5, 19), duration: 0, parent: 1 },
    { id: 28, text: "Site Hand-over / Client Move-In Date", type: "milestone", start: new Date(2025, 6, 7), duration: 0, parent: 1, css: "red-task" },
    
    // Defects Phase
    { id: 29, text: "DEFECTS LIABILITY PERIOD", type: "summary", start: new Date(2025, 6, 8), duration: 365, parent: 1, open: false },
    { id: 30, text: "Rectification of defects", start: new Date(2025, 6, 8), duration: 15, parent: 29 },
    { id: 31, text: "Defects warranty period", start: new Date(2025, 6, 8), duration: 365, parent: 29 },
  ], []);

  return (
    <Willow>
      <div style={{ height: "100vh" }}>
        <Gantt 
            tasks={tasks} 
            columns={columns} 
            scales={[
                { unit: "month", step: 1, format: "MMMM yyyy" },
                { unit: "day", step: 1, format: "d" }
            ]}
        />
      </div>
    </Willow>
  );
}

export default App;
