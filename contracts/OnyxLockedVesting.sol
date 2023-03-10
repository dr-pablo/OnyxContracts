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

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract OnyxLockedVesting is Ownable {
    using SafeERC20 for IERC20;

    // beneficiary of tokens after they are released
    address private _beneficiary;

    // timestamp when token release is enabled
    uint256 private _releaseTime;

    constructor(
        address beneficiary_, 
        uint256 releaseTime_
    ) {
        require(releaseTime_ > block.timestamp, "TokenTimelock: release time is before current time");
        _beneficiary = beneficiary_;
        _releaseTime = releaseTime_;
    }

    /**
     * @return the beneficiary of the tokens.
     */
    function beneficiary() public view virtual returns (address) {
        return _beneficiary;
    }

    /**
     * @return the time when the tokens are released.
     */
    function releaseTime() public view virtual returns (uint256) {
        return _releaseTime;
    }

    /**
     * @notice Transfers tokens held by timelock to beneficiary.
     */
    function release(IERC20 _token) public virtual {
        require(block.timestamp >= releaseTime(), "TokenTimelock: current time is before release time");

        uint256 amount = _token.balanceOf(address(this));
        require(amount > 0, "TokenTimelock: no tokens to release");

        _token.safeTransfer(beneficiary(), amount);
    }
}