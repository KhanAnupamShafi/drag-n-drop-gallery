import React from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  move,
  swap,
} from 'react-grid-dnd';
type ItemType = { id: number; name: string; selected?: boolean };

export function Gallery() {
  const [items, setItems] = React.useState<{
    left: ItemType[];
    right: ItemType[];
  }>({
    left: [
      { id: 1, name: 'men' },
      { id: 2, name: 'toe' },
      { id: 3, name: 'jason' },
      { id: 4, name: 'chris' },
      { id: 5, name: 'heather' },
      { id: 6, name: 'Richard' },
      { id: 7, name: 'george' },
      { id: 8, name: 'rupert' },
      { id: 9, name: 'alice' },
      { id: 10, name: 'katherine' },
      { id: 11, name: 'pam' },
      { id: 12, name: 'katie' },
    ],
    right: [],
  });

  function handleItemClick(
    item: ItemType,
    list: ItemType[],
    setList: React.Dispatch<
      React.SetStateAction<{ left: ItemType[]; right: ItemType[] }>
    >
  ) {
    const updatedList = list.map((listItem) => {
      if (listItem.id === item.id) {
        return { ...listItem, selected: !listItem.selected };
      }
      return listItem;
    });

    setList((prevState) => ({
      ...prevState,
      [list === items.left ? 'left' : 'right']: updatedList,
    }));
  }

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string
  ) {
    console.log(sourceId, sourceIndex, targetIndex, targetId);
    // Check if the target drop zone is "right"
    if (targetId === 'right') {
      if (items.right.length === 1) {
        // If there's already an item in the "right" zone, swap it with the new item
        const rightItem = items.right[0];
        const leftItem = items.left[sourceIndex];
        setItems({
          left: [
            ...items.left.slice(0, sourceIndex),
            rightItem,
            ...items.left.slice(sourceIndex + 1),
          ],
          right: [leftItem],
        });
      } else {
        // If the "right" zone is empty, move the item from the "left" zone
        const result = move(
          items[sourceId],
          items[targetId],
          sourceIndex,
          targetIndex
        );
        setItems({
          left: result[0],
          right: result[1],
        });
      }
    } else {
      // For other cases (within "left" or other custom logic), use the swap function
      const result = swap(items[sourceId], sourceIndex, targetIndex);
      setItems({
        ...items,
        [sourceId]: result,
      });
    }
  }
  function handleDeleteSelected() {
    // Filter out the selected items and update the state
    const updatedLeft = items.left.filter((item) => !item.selected);
    const updatedRight = items.right.filter((item) => !item.selected);

    setItems({
      left: updatedLeft,
      right: updatedRight,
    });
  }
  return (
    <>
      <button onClick={handleDeleteSelected}>Delete Selected</button>

      <GridContextProvider onChange={onChange}>
        <div className="container">
          <GridDropZone
            className="dropzone left"
            id="right"
            boxesPerRow={1}
            rowHeight={250}>
            {items.right.map((item) => (
              <GridItem
                key={item.name}
                onClick={() =>
                  handleItemClick(item, items.right, setItems)
                }>
                <div
                  className={`preview-item ${
                    item.selected ? 'selected' : ''
                  }`}>
                  <div className="preview-item-content">
                    {item.name[0].toUpperCase()}
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>
          <GridDropZone
            className="dropzone right"
            id="left"
            boxesPerRow={3}
            rowHeight={200}
            style={{ height: '800px', padding: '10px' }}>
            {items.left.map((item) => (
              <GridItem
                key={item.name}
                onClick={() =>
                  handleItemClick(item, items.left, setItems)
                }>
                <div
                  className={`grid-item ${
                    item.selected ? 'selected' : ''
                  }`}>
                  <div className="grid-item-content">
                    {item.name[0].toUpperCase()}
                  </div>
                </div>
              </GridItem>
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
    </>
  );
}
