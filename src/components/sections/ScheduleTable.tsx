type Row = {
  label: string;
  cells: string[];
};

type Props = {
  tagline: string;
  heading: string;
  columns: string[];
  rows: Row[];
};

export type ScheduleTableProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

/**
 * Custom section — a nearest, lightweight Relume-styled swap for the wireframe's
 * "Schedule for the week" grid. Built as a semantic table with Relume tokens.
 */
export const ScheduleTable = (props: ScheduleTableProps) => {
  const { heading, columns, rows } = { ...ScheduleTableDefaults, ...props };
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="text-h3 font-bold">{heading}</h2>
        </div>
        <div className="w-full overflow-x-auto rounded-card border border-scheme-border">
          <table className="w-full min-w-[48rem] border-collapse text-left">
            <thead>
              <tr className="bg-scheme-foreground">
                <th className="px-6 py-4 text-small font-bold">Branch</th>
                {columns.map((col) => (
                  <th key={col} className="px-6 py-4 text-small font-bold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-scheme-border"
                >
                  <td className="px-6 py-4 font-semibold">{row.label}</td>
                  {row.cells.map((cell, i) => (
                    <td key={i} className="px-6 py-4 text-small">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export const ScheduleTableDefaults: Props = {
  tagline: "Schedule",
  heading: "Schedule for the week",
  columns: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  rows: [
    { label: "Branch one", cells: ["4–5 PM", "4–5 PM", "4–5 PM", "4–5 PM", "4–5 PM", "10–11 AM"] },
    { label: "Branch two", cells: ["5–6 PM", "5–6 PM", "5–6 PM", "5–6 PM", "5–6 PM", "11–12 PM"] },
    { label: "Branch three", cells: ["6–7 PM", "6–7 PM", "6–7 PM", "6–7 PM", "6–7 PM", "12–1 PM"] },
  ],
};
