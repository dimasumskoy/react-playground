import { useState, useEffect, useRef, useCallback } from "react";
import { throttle } from "../../utils/delay";

interface ListProps {
  items: Array<Item>;
  containerHeight: number;
  itemHeight: number;
  buffer: number;
}

interface ItemProps {
  item: Item;
  height: number;
  offsetY: number;
  index: number;
}

type Item = {
  id: number;
  value: string;
};

const renderItem = ({ item, height, offsetY, index }: ItemProps) => {
  return (
    <div
      key={item.id}
      style={{
        position: "absolute",
        top: offsetY + index * height,
        display: "flex",
        alignItems: "center",
        height: height,
        width: "100%",
        borderBottom: "1px solid #999",
        paddingLeft: "10px",
      }}
    >
      {`${item.id}. ${item.value}`}
    </div>
  );
};

// the list accepts items list, item height and container height, and buffer
const VirtualizedList = ({
  items,
  itemHeight,
  containerHeight,
  buffer = 5,
}: ListProps) => {
  // set up visible start and end that will be in the viewport
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(
    Math.ceil(containerHeight / itemHeight)
  );
  // set up container ref to get the scroll from top value
  const contaierRef = useRef<HTMLDivElement>(null);

  // each scroll event being handled with handleScroll func
  const handleScroll = useCallback(() => {
    const scrollTop = contaierRef.current?.scrollTop;

    // if there is scroll happened
    if (scrollTop) {
      // visible end is the height from the top divided by item height + current visible end (that is in the end of the list) + buffer
      const newVisibleEnd = Math.min(
        items.length,
        Math.ceil(scrollTop / itemHeight + visibleEnd) + buffer
      );
      // visible start is the height from the top divided by item height - buffer
      const newVisibleStart = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - buffer
      );

      setVisibleStart(newVisibleStart);
      setVisibleEnd(newVisibleEnd);
    }
  }, [items, itemHeight, containerHeight, buffer]);

  const throttledHandleScroll = throttle(handleScroll, 200);

  useEffect(() => {
    const container = contaierRef.current;
    container?.addEventListener("scroll", throttledHandleScroll);

    handleScroll();

    return () =>
      container?.removeEventListener("scroll", throttledHandleScroll);
  }, [handleScroll]);

  const visibleItems = items.slice(visibleStart, visibleEnd);
  // offsetY is used in Item to calculate its position from the top border of the container
  const offsetY = visibleStart * itemHeight;

  return (
    <div
      ref={contaierRef}
      style={{
        height: containerHeight,
        overflow: "auto",
        position: "relative",
        border: "1px solid #999",
        borderRadius: "10px",
      }}
    >
      <div style={{ position: "relative", height: itemHeight * items.length }}>
        {visibleItems.map((item, index) =>
          renderItem({
            item,
            height: itemHeight,
            offsetY,
            index,
          })
        )}
      </div>
    </div>
  );
};

export default VirtualizedList;
