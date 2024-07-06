import React, { useState } from 'react';

interface Item {
  id: number;
  content: string;
}

interface DraggableListProps {
  items: Item[];
  onReorder: (items: Item[]) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({ items, onReorder }) => {
  // Реализуйте компонент с возможностью перетаскивания элементов

  return (
    <ul>
      {/* Отрендерите элементы с возможностью перетаскивания */}
    </ul>
  );
};
