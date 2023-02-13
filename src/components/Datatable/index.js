import * as React from "react";
import { Checkbox, DataTable } from "react-native-paper";
import ActivityIndicator from "../ActivityIndicator";

const ITEMS_PER_PAGE = 10;

/**
 * @param {{
 *  data: any[];
 *  checkProperty?: string;
 *  onCheckedChange?: (checkedList) => void;
 *  order?: (current: any, next: any) => boolean;
 *  rowsPerPage?: number;
 *  columns: {title: string; property: string | ({item}: {item: any}) => React.ElementType, weight?: number}[];
 *  filter?: (item: any) => boolean
 * }} props
 */
const Datatable = ({
  data,
  checkProperty,
  onCheckedChange,
  order,
  rowsPerPage,
  columns,
  filter,
}) => {
  const [page, setPage] = React.useState(0);
  const [checked, setChecked] = React.useState([]);

  const itemsPerPage = rowsPerPage || ITEMS_PER_PAGE;

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const start = page * itemsPerPage;
  let items;
  let filteredItems;

  if (data && data.slice) {
    filteredItems = filter ? data.filter(filter) : data;
    if (order) {
      filteredItems.sort(order);
    }
    items = filteredItems.slice(start, start + itemsPerPage);
  }

  return (
    <DataTable>
      <DataTable.Header>
        {checkProperty ? (
          <DataTable.Title style={{ width: 64 }}>
            <Checkbox
              status={
                items
                  ? checked.length === filteredItems.length
                    ? "checked"
                    : "unchecked"
                  : "indeterminate"
              }
              onPress={() => {
                const allChecked = checked.length === filteredItems.length;
                if (!allChecked) {
                  const n = filteredItems.map((i) => i[checkProperty]);
                  setChecked(n);
                  if (onCheckedChange) onCheckedChange(n);
                } else {
                  setChecked([]);
                  if (onCheckedChange) onCheckedChange([]);
                }
              }}
            />
          </DataTable.Title>
        ) : (
          <></>
        )}
        {columns.map((c) => (
          <DataTable.Title style={{ flexGrow: c.weight || 1 }}>
            {c.title}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {items ? (
        items.map((item, i) => (
          <DataTable.Row key={item[checkProperty] || i}>
            {checkProperty ? (
              <DataTable.Cell style={{ width: 64 }}>
                <Checkbox
                  status={
                    checked.includes(item[checkProperty])
                      ? "checked"
                      : "unchecked"
                  }
                  onPress={() => {
                    let newChecked = [];
                    if (checked.includes(item[checkProperty])) {
                      console.log("Removing " + item[checkProperty]);
                      newChecked = checked.filter(
                        (c) => c !== item[checkProperty]
                      );
                    } else {
                      console.log("Adding " + item[checkProperty]);
                      newChecked = [...checked, item[checkProperty]];
                    }
                    setChecked(newChecked);
                    if (onCheckedChange) onCheckedChange(newChecked);
                  }}
                />
              </DataTable.Cell>
            ) : (
              <></>
            )}
            {columns.map((c) => (
              <DataTable.Cell style={{ flexGrow: c.weight || 1 }}>
                {typeof c.property === "string" ? (
                  item[c.property]
                ) : (
                  <c.property item={item} />
                )}
              </DataTable.Cell>
            ))}
          </DataTable.Row>
        ))
      ) : (
        <ActivityIndicator />
      )}

      <DataTable.Pagination
        page={page}
        numberOfPages={
          filteredItems ? Math.ceil(filteredItems.length / itemsPerPage) : 0
        }
        onPageChange={(page) => setPage(page)}
        label={
          filteredItems
            ? `Total: ${filteredItems.length} \t ${page + 1}/${Math.ceil(
                filteredItems.length / itemsPerPage
              )}`
            : "Loading..."
        }
        itemsPerPage={itemsPerPage}
        showFastPagination
      />
    </DataTable>
  );
};

export default Datatable;
