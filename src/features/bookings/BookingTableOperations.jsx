import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import { useCabins } from "../cabins/useCabins";
import Spinner from "../../ui/Spinner";

function BookingTableOperations() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  if (!cabins.length) return <Spinner />;

  const cabinOptions = [
    { value: "all", label: "All" },
    ...cabins
      .map((x) => {
        return { value: x.id, label: x.name };
      })
      .sort((a, b) => (a.value > b.value ? 1 : -1)),
  ];

  return (
    <TableOperations>
      <Filter filterField="cabinId" options={cabinOptions} />

      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked out" },
          { value: "checked-in", label: "Checked in" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "totalPrice-desc",
            label: "Sort by amount (high first)",
          },
          { value: "totalPrice-asc", label: "Sort by amount (low first)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
