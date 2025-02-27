import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Filter
  const filterValue = searchParams.get("status");
  const cabinFilterValue = searchParams.get("cabinId");

  const filterStatus =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };
  const filterCabin =
    !cabinFilterValue || cabinFilterValue === "all"
      ? null
      : { field: "cabinId", value: cabinFilterValue, method: "eq" };

  const filters =
    !filterStatus && !filterCabin
      ? null
      : !filterStatus
      ? [filterCabin]
      : !filterCabin
      ? [filterStatus]
      : [filterStatus, filterCabin];

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filters, sortBy, page],
    queryFn: () => getBookings({ filters, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page + 1],
      queryFn: () => getBookings({ filters, sortBy, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filters, sortBy, page - 1],
      queryFn: () => getBookings({ filters, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, error, bookings, count };
}
