// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/*

Visit Us At https://www.onyxdao.finance/

 .----------------.  .-----------------. .----------------.  .----------------.   .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. || .--------------. | | .--------------. || .--------------. || .--------------. |
| |     ____     | || | ____  _____  | || |  ____  ____  | || |  ____  ____  | | | |  ________    | || |      __      | || |     ____     | |
| |   .'    `.   | || ||_   \|_   _| | || | |_  _||_  _| | || | |_  _||_  _| | | | | |_   ___ `.  | || |     /  \     | || |   .'    `.   | |
| |  /  .--.  \  | || |  |   \ | |   | || |   \ \  / /   | || |   \ \  / /   | | | |   | |   `. \ | || |    / /\ \    | || |  /  .--.  \  | |
| |  | |    | |  | || |  | |\ \| |   | || |    \ \/ /    | || |    > `' <    | | | |   | |    | | | || |   / ____ \   | || |  | |    | |  | |
| |  \  `--'  /  | || | _| |_\   |_  | || |    _|  |_    | || |  _/ /'`\ \_  | | | |  _| |___.' / | || | _/ /    \ \_ | || |  \  `--'  /  | |
| |   `.____.'   | || ||_____|\____| | || |   |______|   | || | |____||____| | | | | |________.'  | || ||____|  |____|| || |   `.____.'   | |
| |              | || |              | || |              | || |              | | | |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' || '--------------' | | '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------'  '----------------'   '----------------'  '----------------'  '----------------'                                                                                       

*/

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IRewarder {
    function onReward(uint256 pid, address user, address recipient, uint256 onyxAmount, uint256 newTokenAmount) external;
    function pendingTokens(uint256 pid, address user, uint256 onyxAmount) external view returns (IERC20[] memory, uint256[] memory);
}