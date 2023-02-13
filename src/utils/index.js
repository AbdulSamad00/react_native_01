export const makeKanbanNo = () => {
  let kanbanNumber = "KB-";
  const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
  for (let i = 0; i <= 5; i++)
    kanbanNumber += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  return kanbanNumber;
};

export const makeCardNo = () => {
  let cardNumber = "CD-";
  const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
  for (let i = 0; i <= 5; i++)
    cardNumber += possible.charAt(Math.floor(Math.random() * possible.length));
  return cardNumber;
};

export const makelistKanbanNo = () => {
  let listKanbanNumber = "LK-";
  const possible = "ABCDEFGHIJKLMNPQRSTUVWXYZ2356789";
  for (let i = 0; i <= 5; i++)
    listKanbanNumber += possible.charAt(
      Math.floor(Math.random() * possible.length)
    );
  return listKanbanNumber;
};
