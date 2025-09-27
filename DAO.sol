// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns(bool);
    function transfer(address recipient, uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
}

contract DAO {
    IERC20 public usdcToken;

    struct Proposal {
        uint id;
        string description;
        uint amount;
        address target;
        uint yesVotes;
        uint noVotes;
        bool executed;
        mapping(address => bool) voted;
    }

    uint public proposalCount;
    mapping(uint => Proposal) private proposals;
    mapping(address => uint) public deposits;
    address[] public members;

    event Deposit(address indexed member, uint amount);
    event ProposalCreated(uint indexed id, string description, uint amount, address target);
    event Voted(address indexed member, uint proposalId, bool support, uint weight);
    event ProposalExecuted(uint indexed id, uint amount, address target);

    constructor(address _usdcAddress) {
        usdcToken = IERC20(_usdcAddress);
    }
    function deposit(uint _amount) public {
        require(_amount > 0, "Deposit > 0");
        require(usdcToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        if(deposits[msg.sender] == 0){
            members.push(msg.sender);
        }
        deposits[msg.sender] += _amount;

        emit Deposit(msg.sender, _amount);
    }
    function createProposal(string memory _description, uint _amount, address _target) public {
        require(deposits[msg.sender] > 0, "Only contributors can create proposals");
        require(_amount <= usdcToken.balanceOf(address(this)), "Proposal exceeds treasury");

        Proposal storage p = proposals[proposalCount];
        p.id = proposalCount;
        p.description = _description;
        p.amount = _amount;
        p.target = _target;
        p.executed = false;

        emit ProposalCreated(proposalCount, _description, _amount, _target);

        proposalCount++;
    }
    function vote(uint _proposalId, bool _support) public {
        Proposal storage p = proposals[_proposalId];
        require(deposits[msg.sender] > 0, "Only contributors can vote");
        require(!p.voted[msg.sender], "Already voted");

        p.voted[msg.sender] = true;

        if(_support){
            p.yesVotes += deposits[msg.sender];
        } else {
            p.noVotes += deposits[msg.sender];
        }

        emit Voted(msg.sender, _proposalId, _support, deposits[msg.sender]);
    }
    function executeProposal(uint _proposalId) public {
        Proposal storage p = proposals[_proposalId];
        require(!p.executed, "Already executed");
        require(p.yesVotes > p.noVotes, "Not enough yes votes");
        require(usdcToken.balanceOf(address(this)) >= p.amount, "Not enough funds");

        p.executed = true;
        require(usdcToken.transfer(p.target, p.amount), "Transfer failed");

        emit ProposalExecuted(_proposalId, p.amount, p.target);
    }
    function getMembers() public view returns(address[] memory){
        return members;
    }
    function getProposal(uint _id) public view returns(
        uint id,
        string memory description,
        uint amount,
        address target,
        uint yesVotes,
        uint noVotes,
        bool executed
    ) {
        Proposal storage p = proposals[_id];
        return (
            p.id,
            p.description,
            p.amount,
            p.target,
            p.yesVotes,
            p.noVotes,
            p.executed
        );
    }
    function hasVoted(uint _proposalId, address _member) public view returns(bool) {
        return proposals[_proposalId].voted[_member];
    }
}
