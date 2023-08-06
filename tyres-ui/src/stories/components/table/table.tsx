import { For, JSX } from "solid-js";
import Tooltip from "../tooltip/tooltip";

export interface TTableAction {
  content: JSX.Element | string;
  action: (row: number) => void;
  hint: string;
}
export interface TTableProps {
  columns: string[];
  data: string[][];
  actions?: TTableAction[];
}

export default function Table(props: TTableProps) {
  return (
    <table class="w-full">
      <thead>
        <tr>
          <For each={props.columns}>
            {(column, i) => (
              <th
                class={`${i() === 0 ? "rounded-l-lg pl-4" : ""} ${
                  i() === props.columns.length - 1 ? "rounded-r-lg" : ""
                } bg-gray-100 py-2 uppercase font-bold text-gray-400 text-left text-sm`}>
                {column}
              </th>
            )}
          </For>
          {props.actions?.length && <th></th>}
        </tr>
      </thead>
      <tbody>
        <For each={props.data}>
          {(row, k) => (
            <tr>
              <For each={row}>
                {(cell, i) => (
                  <td class={`${i() == 0 ? "pl-4" : ""} text-gray-800 text-lg py-2`}>{cell}</td>
                )}
              </For>
              {props.actions?.length && (
                <td>
                  <div class="flex items-center justify-center select-none gap-2">
                    {props.actions.map((action) => (
                      <Tooltip content={action.hint}>
                        <span
                          role="button"
                          class="cursor-pointer hover:text-blue-500"
                          onClick={() => action.action(k())}>
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
  );
}
