interface Entity {
  id: number;
  [key: string]: any;
}

interface NormalizedData<T extends Entity> {
  entities: { [id: number]: T };
  ids: number[];
}

export function normalize<T extends Entity>(data: T[]) {
  
}

// Пример использования
// const users = [
//   { id: 1, name: 'Alice' },
//   { id: 2, name: 'Bob' },
//   { id: 3, name: 'Charlie' }
// ];

// const normalizedUsers = normalize(users);
// console.log(normalizedUsers);
