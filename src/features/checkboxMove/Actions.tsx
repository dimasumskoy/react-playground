interface ActionsPorps {
  moveLeft: () => void;
  moveRight: () => void;
}

export default function Actions({ moveLeft, moveRight }: ActionsPorps) {
  return (
    <div className="actions flex flex-row">
      <button onClick={moveLeft}>{`<`}</button>
      <button onClick={moveRight}>{`>`}</button>
    </div>
  );
}
