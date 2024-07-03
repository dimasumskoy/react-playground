import "./styles.scss";
import { useState, useEffect } from "react";
import Actions from "./Actions";
import List from "./List";
import { items } from "./data";

const CheckboxMove = () => {
  const [leftItems, setLeftItems] = useState(items);
  const [rightItems, setRightItems] = useState<number[]>([]);
  const [checkedLeftItems, setCheckedLeftItems] = useState(new Set<number>());
  const [checkedRightItems, setCheckedRightItems] = useState(new Set<number>());

  const filterLeftItems = () => {
    return leftItems.filter((item) => !checkedLeftItems.has(item));
  };

  const filterRightItems = () => {
    return rightItems.filter((item) => !checkedRightItems.has(item));
  };

  const moveLeft = () => {
    setLeftItems(leftItems.concat([...Array.from(checkedRightItems)]));
    setCheckedLeftItems(
      new Set([
        ...Array.from(checkedLeftItems),
        ...Array.from(checkedRightItems),
      ])
    );
    setRightItems(filterRightItems());
    setCheckedRightItems(new Set<number>());
  };

  const moveRight = () => {
    setRightItems(rightItems.concat([...Array.from(checkedLeftItems)]));
    setCheckedRightItems(
      new Set([
        ...Array.from(checkedRightItems),
        ...Array.from(checkedLeftItems),
      ])
    );
    setLeftItems(filterLeftItems());
    setCheckedLeftItems(new Set<number>());
  };

  const filterSetItems = (items: Set<number>, item: number) => {
    const newChecked = new Set(items);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    return newChecked;
  }

  const onLeftCheck = (item: number) => {
    setCheckedLeftItems((prev) => filterSetItems(prev, item));
  };

  const onRightCheck = (item: number) => {
    setCheckedRightItems((prev) => filterSetItems(prev, item));
  };

  const sortItems = (items: number[]) => {
    return items.sort((a: number, b: number) => a - b);
  }

  return (
    <div id="checkbox-container" className="flex">
      <List items={sortItems(leftItems)} checkedItems={checkedLeftItems} onCheck={onLeftCheck} />
      <Actions moveLeft={moveLeft} moveRight={moveRight} />
      <List items={sortItems(rightItems)} checkedItems={checkedRightItems} onCheck={onRightCheck} />
    </div>
  );
};

export default CheckboxMove;
