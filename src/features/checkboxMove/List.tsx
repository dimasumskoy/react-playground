type ItemSet = Set<number>;

interface IListProps {
  items: number[];
  checkedItems: ItemSet;
  onCheck: (item: number) => void;
}

export default function List({ items, checkedItems, onCheck }: IListProps) {
  return (
    <div className="list flex">
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {items.map((item) => {
          return (
            <li key={item}>
              <label className="custom-checkbox">
                <input
                  type="checkbox"
                  value={item}
                  checked={checkedItems.has(item)}
                  onChange={() => onCheck(item)}
                />
                <span className="checkmark"></span>
                {item}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
