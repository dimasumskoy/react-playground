import "./styles.scss";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 10;
const TOTAL_ITEMS_TIMEOUT = 400;
const FETCH_ITEMS_TIEMOUT = 600;

interface Item {
  id: number;
  title: string;
  date: Date;
}

const fetchItems = async (page: number): Promise<Item[]> => {
  return new Promise((resolve) => {
    const items: Item[] = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => {
      const id = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE + i + 1;
      return {
        id,
        title: `Item #${id}`,
        date: new Date(),
      };
    });

    setTimeout(() => resolve(items), FETCH_ITEMS_TIEMOUT);
  });
};

const fetchTotalItems = async (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(100), TOTAL_ITEMS_TIMEOUT);
  });
};

const Item = ({ item }: { item: Item }) => {
  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #fff",
        margin: "10px 0",
        borderRadius: "10px",
      }}
    >
      <p>{item.title}</p>
      <time>{item.date.toString()}</time>
    </div>
  );
};

const PageLink = ({ page, onClick }: { page: number; onClick: () => void }) => {
  return (
    <span
      style={{ cursor: "pointer", display: "inline-block", margin: "0 5px" }}
      onClick={onClick}
    >
      {page}
    </span>
  );
};

const Pagination = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [cachedItems, setCachedItems] = useState<{ [page: number]: Item[] }>(
    {}
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTotalItems().then((total: number) => setTotalItems(total));
  }, []);

  useEffect(() => {
    if (totalItems === 0) return;
    onPageLoad(page)();
  }, [totalItems]);

  const paginateItems = () => {
    return Array.from(
      { length: Math.ceil(totalItems / ITEMS_PER_PAGE) },
      (_, i) => i + 1
    );
  };

  const onPageLoad = (page: number) => async () => {
    if (cachedItems[page]) {
      return setPage(page);
    }

    setIsLoading(true);
    const newItems = await fetchItems(page);

    setPage(page);
    setCachedItems((prev) => ({
      ...prev,
      [page]: newItems,
    }));
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
          {cachedItems[page].map((item) => (
            <li key={item.title}>
              <Item item={item} />
            </li>
          ))}
        </ul>
      )}
      {totalItems > 0 && (
        <div>
          {paginateItems().map((p) => (
            <PageLink page={p} key={p} onClick={onPageLoad(p)} />
          ))}
        </div>
      )}
    </>
  );
};

export default Pagination;
