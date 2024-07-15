import { fireEvent, screen, render, waitFor } from "@testing-library/react";
import Pagination from "./Pagination";
import { Item } from "./Pagination";

global.fetch = jest.fn();

const mockItems = [
  {
    id: 1,
    title: `Item 1`,
    date: new Date(),
  },
  {
    id: 2,
    title: `Item 2`,
    date: new Date(),
  },
  {
    id: 3,
    title: `Item 3`,
    date: new Date(),
  }
]

describe("Pagination", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  })
})
