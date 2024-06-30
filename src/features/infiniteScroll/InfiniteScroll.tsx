import { useState, useEffect, useCallback, useRef } from "react";

const ITEMS_PER_PAGE = 20;
const OBSERVER_OPTIONS = {
  root: null, // viewport
  rootMargin: "0px", // Change rootMargin to a string value
  threshold: 1.0
}

interface Item {
  id: number;
  title: string;
}

const fetchItems = async (page: number): Promise<Item[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return Array.from({ length: ITEMS_PER_PAGE }, (_, index) => {
    const id = page * ITEMS_PER_PAGE + index - ITEMS_PER_PAGE + 1;
    return {
      id,
      title: `Item ${id}`,
    };
  });
};

const Item = ({ item }: { item: Item }) => {
  return (
    <span
      style={{
        display: "block",
        padding: 10,
        border: "1px solid #999",
        borderRadius: "10px",
        margin: "10px 0",
      }}
    >
      {item.title}
    </span>
  );
};

const InfiniteScroll = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMoreItems = useCallback(async () => {
    setIsLoading(true);

    const newItems = await fetchItems(page);

    setItems((prev) => [...prev, ...newItems]);
    setIsLoading(false);
  }, [page]);

  // THIS IS IMPLEMENTATION USING SCROLL EVENT LISTENER
  //
  // const handleScroll = useCallback(() => {
  //   if (
  //     document.documentElement.offsetHeight - window.innerHeight ===
  //     document.documentElement.scrollTop
  //   ) {
  //     setPage((p) => p + 1);
  //   }
  // }, [page]);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setPage(p => p + 1);
      }
    }, OBSERVER_OPTIONS)

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, []);

  useEffect(() => {
    loadMoreItems();
  }, [page])

  return (
    <div id="container">
      <ul style={{ listStyleType: "none" }}>
        {items.map((item) => (
          <li key={item.id}>
            <Item item={item} />
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
      <div ref={loaderRef}></div>
    </div>
  );
};

export default InfiniteScroll;
