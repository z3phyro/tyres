import { Pagination } from "@kobalte/core";
import { cls } from "~/utils/class.helper";

export interface TPaginationProps {
  class?: string;
  showFirst?: boolean;
  showLast?: boolean;
  count: number;
  defaultPage?: number;
  siblingCount?: number;
  onPageChange?: (page: number) => void;
}
export default function PaginationComponent(props: TPaginationProps) {
  return <Pagination.Root
    count={props.count}
    siblingCount={props.siblingCount}
    showFirst={props.showFirst}
    showLast={props.showLast}
    defaultPage={props.defaultPage ?? 1}
    onPageChange={props.onPageChange}
    class={cls({ "[&>ul]:flex [&>ul]:items-center [&>ul]:justify-center [&>ul]:gap-x-1 [&>ul]:mt-2": true, [props.class ?? ""]: true })}
    itemComponent={itemProps => (<Pagination.Item class={cls({
      "min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10": true,
      "border-transparent hover:bg-gray-100 focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10": itemProps.page != (props.defaultPage ?? 1),
      "border-gray-200 focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:border-neutral-700 dark:text-white dark:focus:bg-white/10": itemProps.page == (props.defaultPage ?? 1),
    })}
      page={itemProps.page}
    >
      {itemProps.page}
    </Pagination.Item>)}
    ellipsisComponent={() => (<Pagination.Ellipsis class={cls({
      "min-h-[38px] min-w-[38px] flex justify-center items-center border border-transparent text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none disabled:opacity-50 disabled:pointer-events-none": true,
    })}> ...</Pagination.Ellipsis>)}
  >
    <Pagination.Previous class="min-h-[38px] min-w-[38px] pyf-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
      <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m15 18-6-6 6-6"></path>
      </svg>
      <span aria-hidden="true" class="sr-only">Previous</span>
    </Pagination.Previous>
    <Pagination.Items />
    <Pagination.Next class="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:border-transparent dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
      <span aria-hidden="true" class="sr-only">Next</span>
      <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </Pagination.Next>
  </ Pagination.Root>;
}
