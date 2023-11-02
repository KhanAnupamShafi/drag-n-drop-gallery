import React from 'react';
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  move,
  swap,
} from 'react-grid-dnd';
import { techProducts } from '../assets/api';
import Button from './Button';
type ItemType = {
  id: number;
  name: string;
  selected?: boolean;
  image?: string;
  description?: string;
  price?: string;
};
export function Gallery() {
  const [items, setItems] = React.useState<{
    left: ItemType[];
    right: ItemType[];
  }>({
    left: techProducts,
    right: [],
  });
  const [itemsPerRow, setItemsPerRow] = React.useState(3);

  const selectedItemsCountLeft = items.left.filter(
    (item) => item.selected
  ).length;
  const selectedItemsCountRight = items.right.filter(
    (item) => item.selected
  ).length;
  const totalSelectedItemsCount =
    selectedItemsCountLeft + selectedItemsCountRight;
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
  React.useEffect(() => {
    // Update itemsPerRow based on the screen width
    const updateItemsPerRow = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth >= 1280) {
        // Large screens
        setItemsPerRow(3);
      } else if (screenWidth >= 1024) {
        // Tablets or smaller laptops
        setItemsPerRow(2);
      } else {
        // Mobile devices
        setItemsPerRow(1);
      }
    };

    // Initial update
    updateItemsPerRow();

    // Add an event listener to update itemsPerRow on window resize
    window.addEventListener('resize', updateItemsPerRow);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('resize', updateItemsPerRow);
    };
  }, []);

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string
  ) {
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
      <div className="box header" style={{ margin: '20px auto' }}>
        <h3 className="text">
          <span style={{ fontSize: '2rem' }}>
            {totalSelectedItemsCount}
            {'  '}
          </span>
          {'  '}
          Item Selected
        </h3>
        <Button onClick={handleDeleteSelected}>
          Delete Selected
        </Button>
      </div>

      <div className="box">
        <GridContextProvider onChange={onChange}>
          <div className="container">
            <GridDropZone
              className="dropzone left "
              id="right"
              boxesPerRow={1}
              rowHeight={250}>
              {items.right.map((item) => (
                <GridItem key={item.name}>
                  <div className={`preview-item `}>
                    <div className="preview-item-content border-style ">
                      <div
                        className={`overlay ${
                          item.selected ? 'active' : ''
                        }`}>
                        <div className="content-overlay"></div>
                        <img
                          className="content-image"
                          src={item.image}
                          alt=""
                        />

                        <div className="content-details fadeIn-bottom">
                          <div
                            onClick={() =>
                              handleItemClick(
                                item,
                                items.right,
                                setItems
                              )
                            }
                            className={`checkbox-wrapper`}>
                            <input
                              type="checkbox"
                              checked={item.selected}
                            />
                            <svg viewBox="0 0 35.6 35.6">
                              <circle
                                className="background"
                                cx="17.8"
                                cy="17.8"
                                r="17.8"></circle>
                              <circle
                                className="stroke"
                                cx="17.8"
                                cy="17.8"
                                r="14.37"></circle>
                              <polyline
                                className="check"
                                points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
            <GridDropZone
              className="dropzone right"
              id="left"
              boxesPerRow={itemsPerRow}
              rowHeight={200}
              style={{ height: '800px', padding: '10px' }}>
              {items.left.map((item) => (
                <GridItem key={item.name}>
                  <div className={`grid-item`}>
                    <div className="grid-item-content">
                      {/* {item.name[0].toUpperCase()} */}
                      <div
                        className={`overlay ${
                          item.selected ? 'active' : ''
                        }`}>
                        <div className="content-overlay"></div>
                        <img
                          className="content-image"
                          src={item.image}
                          alt=""
                        />
                        <div className="content-details fadeIn-bottom">
                          <div
                            onClick={() =>
                              handleItemClick(
                                item,
                                items.left,
                                setItems
                              )
                            }
                            className={`checkbox-wrapper`}>
                            <input
                              type="checkbox"
                              checked={item.selected}
                            />
                            <svg viewBox="0 0 35.6 35.6">
                              <circle
                                className="background"
                                cx="17.8"
                                cy="17.8"
                                r="17.8"></circle>
                              <circle
                                className="stroke"
                                cx="17.8"
                                cy="17.8"
                                r="14.37"></circle>
                              <polyline
                                className="check"
                                points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GridItem>
              ))}
            </GridDropZone>
          </div>
        </GridContextProvider>
      </div>
    </>
  );
}
