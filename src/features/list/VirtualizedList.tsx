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

const VirtualizedList = ({
  items,
  itemHeight,
  containerHeight,
  buffer = 5,
}: ListProps) => {
  const [visibleStart, setVisibleStart] = useState(0);
  const [visibleEnd, setVisibleEnd] = useState(
    Math.ceil(containerHeight / itemHeight)
  );
  const contaierRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop = contaierRef.current?.scrollTop;

    if (scrollTop) {
      const newVisibleEnd = Math.min(
        items.length,
        Math.ceil(scrollTop / itemHeight + visibleEnd) + buffer
      );
      const newVisibleStart = Math.max(
        0,
        Math.floor(scrollTop / itemHeight) - buffer
      );

      (() => {
        setVisibleStart(newVisibleStart);
        setVisibleEnd(newVisibleEnd);
      })();
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
