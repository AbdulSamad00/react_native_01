export const calculateTableData = (tableData = [], isCheckbox = false) => {
  if (tableData.length < 1) {
    return {
      columnNames: [],
      columnsWidth: [],
      rowsData: [],
      avatarIndex: [],
      statusIndex: null,
      genderIndex: null,
    };
  }

  const columnNames = Object.keys(tableData[0]);
  const columnsWidth = columnNames.map((value) => `${value}`.length + 100);
  const rowsData = [];
  let avatarIndex = [],statusIndex,genderIndex = null;
  columnNames.forEach((value, index) => {
    if (
      `${value}`.toLowerCase() == "avatar" ||
      `${value}`.toLowerCase() == "image"||
      `${value}`.toLowerCase() == "avatardoctor"||
      `${value}`.toLowerCase() == "avatarclinic"
    ) {
      avatarIndex.push(index);
    }

    if (`${value}`.toLowerCase() == "status") statusIndex = index;
    if (`${value}`.toLowerCase() == "gender") genderIndex = index;
    

  });

  console.log(avatarIndex);
  tableData.forEach((row) => {
    const rowData = Object.values(row);
    rowData.forEach((value, index) => {
      const valueLenght =
        (avatarIndex.includes(index) ? `${rowData[index + 1]}` : `${value}`).length +
        100;
      const currentIndexLength = columnsWidth[index];

      columnsWidth[index] =
        isCheckbox && index === 0
          ? 60
          : avatarIndex.includes(index)
          ? valueLenght + 30
          : currentIndexLength > valueLenght
          ? currentIndexLength
          : valueLenght + 50;
    });
    rowsData.push(rowData);
  });
  // console.log(columnNames);
  console.log(columnsWidth);
  // console.log(rowsData);
  return {
    columnNames,
    columnsWidth,
    rowsData,
    avatarIndex,
    statusIndex,
    genderIndex
  };
};
