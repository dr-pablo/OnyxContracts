# Pools
### Deploying a New Pool
1. Go to the `StakingPoolFactory` contract, specifically the `deployDefaultPoolContract` function.
2. Input the variables as follows:
-- `_stakeToken` = The token being staked in its decimal denomination (usually ONYX 18 decimals)
-- `_rewardToken` = The token being earned in its decimal denomication
-- `_rewardPerSecond` = The token being staked (usually ONYX)
-- `_startTime` = The UNIX timestamp in seconds for the rewards to start
-- `_bonusEndTime` = The UNIX timestamp in seconds for the rewards to end
3. Click "Write" and execute the transaction
4. View the logs of the transaction
5. On the last log (3) you should see the second log (1) that's a new address. This should be your new `StakingPool` contract ✅

**Notes on Pools**
- Deploys through `deployDefaultPoolContract` will make the pool owned by the `defaultOwner` as assigned on the factory contract
- Pay attention to decimals!
- Pay attention to timestamp and make sure it's in seconds, not milliseconds!

# Farms
### Adding a New Farm
1. Go to the `MasterChefOnyx` contract, specifically the `add` function
2. Input the variables as follows
-- `_allocPoint` = The amount of allocation points you want for the farm
-- `_stakeToken` = The token being staked 
-- `_depositFeeBP` = The basis points of deposit fees for the farm (e.g., 200 = 2%)
-- `_withUpdate` = Cycles through and updates the farms to mint accrued rewards (set to `true` unless you have a specific plan)
-- `_rewarder` = The additional rewarder contract (set to `0x0000000000000000000000000000000000000000` unless you have a specific plan)
3. Click "Write" and execute the transaction
4. Once executed this farm will be added as the next PID on the `MasterChefOnyx` contract!

**Notes on Farms**
1. Never ever ever add a reflect token as the stake token to a farm!
2. Ideally only use 18 decimal tokens for staking (LPs).