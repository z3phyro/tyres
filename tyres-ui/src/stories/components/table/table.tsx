import { For, JSX } from "solid-js";
import Tooltip from "../tooltip/tooltip";

export interface TTableAction {
  content: JSX.Element | string;
  action: (row: number) => void;
  href?: string;
  hint: string;
}
export interface TTableColumn {
  name: string;
  width?: string;
  renderHeader?: () => JSX.Element;
  renderCell?: (cell: any) => JSX.Element;
}
export interface TTableProps {
  columns: TTableColumn[];
  data: any[][];
  actions?: TTableAction[];
}

export default function Table(props: TTableProps) {
  const columns = () =>
    props.actions?.length ? [...props.columns, { name: "" }] : props.columns;

  return (
    <section class="w-full overflow-x-auto bg-white p-4 border border-gray-100 rounded overflow-hidden">
      <table class="w-full min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <For each={columns()}>
              {(column, i) => (
                <th
                  class={`${
                    i() == 0 ? "pl-4" : ""
                  } py-2 uppercase text-gray-700 font-medium text-left text-sm`}
                >
                  {column.renderHeader?.() ?? column.name}
                </th>
              )}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={props.data}>
            {(row, k) => (
              <tr>
                <For each={row}>
                  {(cell, i) => (
                    <td
                      class={`${
                        i() == 0 ? "pl-4 text-gray-800 " : ""
                      } text-gray-600 text-lg py-2 pr-4 w-auto`}
                    >
                      {columns()[i()].renderCell?.(cell) ?? cell}
                    </td>
                  )}
                </For>
                {props.actions?.length && (
                  <td>
                    <div class="flex items-center justify-center select-none gap-2 ">
                      {props.actions.map((action) => (
                        <Tooltip
                          content={action.hint}
                          onClick={() => action.action(k())}
                        >
                          <span class="cursor-pointer hover:text-blue-500">
                            {action.content}
                          </span>
                        </Tooltip>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </section>
  );
}
