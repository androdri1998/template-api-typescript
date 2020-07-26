import request from "supertest";
import faker from "faker";

import App from "../App";
import truncateTables from "./utils/truncateTables";

describe("Simple tests", () => {
  beforeEach(async () => {
    await truncateTables([]);
  });

  it("Simple test", async () => {
    expect(1 + 1).toBe(2);
  });
});
