const SKELETON_ROW_KEYS = ['row-a', 'row-b', 'row-c', 'row-d'] as const;
const SKELETON_FILTER_KEYS = ['filter-a', 'filter-b', 'filter-c', 'filter-d'] as const;

export function OpenRolesTableSkeleton() {
  return (
    <>
      <div className="grid animate-pulse gap-[calc(0.5rem+0.35vw)] md:hidden">
        {SKELETON_ROW_KEYS.map((key) => (
          <div
            key={key}
            className="flex min-h-17 items-center gap-[calc(0.75rem+0.35vw)] rounded-xl border border-neutral-200/80 bg-white px-[clamp(0.875rem,calc(0.7rem+1vw),1.25rem)] py-[clamp(0.875rem,calc(0.7rem+0.4vw),1.15rem)] shadow-sm"
          >
            <div className="min-w-0 flex-1 max-w-[calc(100%-3.25rem)] space-y-sm">
              <div className="h-4 w-[calc(72%+1rem)] max-w-56 rounded-md bg-neutral-200" />
              <div className="h-3 w-[calc(48%+0.5rem)] max-w-40 rounded-md bg-neutral-200/70" />
              <div className="h-2.5 w-16 rounded-sm bg-neutral-200/60" />
            </div>
            <div className="size-[calc(2.25rem+0.2vw)] shrink-0 rounded-md bg-neutral-200/70" />
          </div>
        ))}
      </div>

      <div className="hidden animate-pulse overflow-hidden rounded-xl border border-neutral-200/80 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-220 table-fixed border-collapse text-left">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-100/70">
                <th className="w-[24%] px-xl py-md first:pl-xl" scope="col">
                  <div className="h-3 w-10 rounded bg-neutral-200" />
                </th>
                <th className="w-[12%] px-xl py-md" scope="col">
                  <div className="h-3 w-10 rounded bg-neutral-200" />
                </th>
                <th className="w-[12%] px-xl py-md" scope="col">
                  <div className="h-3 w-16 rounded bg-neutral-200" />
                </th>
                <th className="w-[14%] px-xl py-md" scope="col">
                  <div className="h-3 w-20 rounded bg-neutral-200" />
                </th>
                <th className="w-[16%] px-xl py-md" scope="col">
                  <div className="h-3 w-16 rounded bg-neutral-200" />
                </th>
                <th className="w-[12%] px-xl py-md" scope="col">
                  <div className="h-3 w-12 rounded bg-neutral-200" />
                </th>
                <th className="w-[10%] px-xl py-md last:pr-xl" scope="col">
                  <div className="ml-auto h-3 w-12 rounded bg-neutral-200" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200/60">
              {SKELETON_ROW_KEYS.map((key) => (
                <tr key={key}>
                  <td className="px-xl py-lg first:pl-xl">
                    <div className="h-4 w-4/5 max-w-[20rem] rounded-md bg-neutral-200" />
                  </td>
                  <td className="px-xl py-lg">
                    <div className="h-6 w-20 rounded-full bg-neutral-200/80" />
                  </td>
                  <td className="px-xl py-lg">
                    <div className="h-4 w-20 rounded-md bg-neutral-200/80" />
                  </td>
                  <td className="px-xl py-lg">
                    <div className="h-4 w-24 rounded-md bg-neutral-200/80" />
                  </td>
                  <td className="px-xl py-lg">
                    <div className="h-4 w-28 rounded-md bg-neutral-200/80" />
                  </td>
                  <td className="px-xl py-lg">
                    <div className="h-3 w-24 rounded-md bg-neutral-200/70" />
                  </td>
                  <td className="px-xl py-lg last:pr-xl">
                    <div className="ml-auto h-4 w-14 rounded-md bg-neutral-200/80" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export const OpenRolesSkeleton = () => {
  return (
    <section className="border-t border-neutral-200 bg-neutral-100/50 py-2xl">
      <div className="site-container">
        <div className="mb-lg flex animate-pulse flex-col gap-md sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl space-y-2">
            <div className="h-3 w-28 rounded-md bg-neutral-200" />
            <div className="h-8 w-56 rounded-lg bg-neutral-200 md:w-64" />
          </div>
          <div className="h-6 w-24 rounded-full bg-neutral-200" />
        </div>

        <div className="mb-md flex animate-pulse gap-sm">
          <div className="h-12 min-w-0 flex-1 rounded-xl bg-neutral-200/80" />
          <div className="h-12 w-12 shrink-0 rounded-xl bg-neutral-200/70 sm:w-28" />
        </div>

        <div className="mb-4.5 grid animate-pulse grid-cols-2 gap-xs sm:grid-cols-4 sm:gap-sm">
          {SKELETON_FILTER_KEYS.map((key) => (
            <div key={key} className="h-12 w-full rounded-lg bg-neutral-200/70" />
          ))}
        </div>

        <OpenRolesTableSkeleton />
      </div>
    </section>
  );
};

export default OpenRolesSkeleton;
