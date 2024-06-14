import VirtualizedList from "./VirtualizedList";

const items = Array.from({ length: 1000 }).map((_, index) => {
  return {
    id: index,
    value: `Item #${index}`
  }
})

const List = () => {
  return (
    <>
      <h1>List</h1>
      <VirtualizedList items={items} itemHeight={30} containerHeight={500} buffer={5} />
    </>
  )
}

export default List;
