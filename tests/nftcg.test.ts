import { Clarinet, Chain, Account, Tx } from "@hirosystems/clarinet-sdk";
import { describe, it, expect } from "vitest";
import { cvToValue, ClarityType } from "@stacks/transactions";

describe("nftcg contract tests", () => {
  it("should mint 3 cards to buyer when buy-card-pack is called", async () => {
    let chain = new Chain();
    let accounts = chain.accounts;

    const result = chain.callReadOnlyFn(
      "nftcg", // contract name
      "buy-card-pack", // function
      "()",            // arguments
      accounts.deployer.address
    );

    if (result.type === "err") {
      const errVal = result.value;

      if (errVal.type === ClarityType.UInt || errVal.type === ClarityType.Int) {
        console.error("❌ buy-card-pack failed with error code:", errVal.value);
      } else {
        console.error("❌ buy-card-pack failed with non-numeric error:", cvToValue(errVal));
      }

      throw new Error("buy-card-pack returned an error");
    }

    // Add your assertions here, e.g., check balances or events
    // expect(...).toBe(...);
  });
});
