const refSdk = require("@ref-finance/ref-sdk");

refSdk.init_env("testnet");

async function getTokenMetadata() {
  // enableSmartRouting as FALSE, swap from Ref to wNear, with amount 1
  const tokenIn = await refSdk.ftGetTokenMetadata("wrap.testnet");
  const tokenOut = await refSdk.ftGetTokenMetadata("usdt.fakes.testnet");
  const { ratedPools, unRatedPools, simplePools } =
    await refSdk.fetchAllPools();
  const stablePools = unRatedPools.concat(ratedPools);
  const stablePoolsDetail = await refSdk.getStablePools(stablePools);

  const options = {
    enableSmartRouting: true,
    stablePools,
    stablePoolsDetail,
  };

  const swapTodos = await refSdk.estimateSwap({
    tokenIn,
    tokenOut,
    amountIn: "1",
    simplePools,
    options,
  });
  console.log(swapTodos);
  // const amountOut = refSdk.getExpectedOutputFromSwapTodos(
  //   swapTodos,
  //   tokenOut.id
  // );
  // console.log("result:", amountOut);
}
getTokenMetadata();

//{\"force\":0,\"actions\":[{\"pool_id\":17,\"token_in\":\"wrap.testnet\",\"token_out\":\"ref.fakes.testnet\",\"amount_in\":\"850303033783569304581203\",\"min_amount_out\":\"0\"},{\"pool_id\":31,\"token_in\":\"ref.fakes.testnet\",\"token_out\":\"usdt.fakes.testnet\",\"min_amount_out\":\"29986612855572\"},{\"pool_id\":51,\"token_in\":\"wrap.testnet\",\"token_out\":\"oct.fakes.testnet\",\"amount_in\":\"149696966216430695418797\",\"min_amount_out\":\"0\"},{\"pool_id\":80,\"token_in\":\"oct.fakes.testnet\",\"token_out\":\"usdt.fakes.testnet\",\"min_amount_out\":\"5698157186499\"}]}
