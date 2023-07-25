import { FiEdit } from "solid-icons/fi";
import { For } from "solid-js";

export interface TTableProps {
  columns: string[];
  data: string[][];
  onEdit?: (row: number) => void;
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
          {props.onEdit && <th></th>}
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
              {props.onEdit && (
                <td class="select-none">
                  <span
                    role="button"
                    class="cursor-pointer hover:text-blue-500"
                    onClick={() => props.onEdit?.(k())}>
                    <FiEdit />
                  </span>
                </td>
              )}
            </tr>
          )}
        </For>
      </tbody>
    </table>
  );
}
