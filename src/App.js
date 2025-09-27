import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Wallet, 
  Vote, 
  TrendingUp, 
  Plus, 
  ExternalLink,
  DollarSign,
  CheckCircle,
  XCircle,
  Crown,
  User,
  Coins,
  UserPlus,
  Mail,
  Copy
} from 'lucide-react';

const InvestmentClubDAO = () => {
  const [selectedClub, setSelectedClub] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Set document title
  useEffect(() => {
    document.title = 'InvestDAO';
  }, []);

  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "DeFi Innovators",
      description: "Focused on emerging DeFi protocols and yield farming opportunities",
      treasury: 125000,
      members: 3,
      proposals: 3,
      contractAddress: "0x742d35Cc6C1F5b2E123C7E9C27...abcd",
      creator: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      created: "2024-01-15",
      inviteCode: "DEFI-INV-2024"
    },
    {
      id: 2,
      name: "Blue Chip Holdings",
      description: "Conservative investments in established cryptocurrencies",
      treasury: 89500,
      members: 2,
      proposals: 1,
      contractAddress: "0x951f29Bb7F3C2D891B5F8A27...efgh",
      creator: "0x951f29Bb...efgh", 
      created: "2024-02-03",
      inviteCode: "BLUE-INV-2024"
    }
  ]);

  const [proposals, setProposals] = useState([
    {
      id: 1,
      clubId: 1,
      title: "Invest 30% in Arbitrum Ecosystem",
      description: "Allocate 30% of treasury to ARB tokens and Arbitrum-based DeFi protocols for potential L2 growth",
      amount: 37500,
      proposer: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      status: "active",
      votesYes: 8200,
      votesNo: 3100,
      totalVotes: 11300,
      deadline: "2024-03-15",
      created: "2024-03-01"
    },
    {
      id: 2,
      clubId: 1,
      title: "Purchase 5 ETH for Long-term Hold",
      description: "Buy and hold 5 ETH tokens as a core portfolio position",
      amount: 12500,
      proposer: "0x951f29Bb...efgh",
      status: "passed",
      votesYes: 9800,
      votesNo: 2100,
      totalVotes: 11900,
      deadline: "2024-02-28",
      created: "2024-02-15"
    }
  ]);

  const [members, setMembers] = useState([
    {
      id: 1,
      clubId: 1,
      address: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      contribution: 25000,
      role: "Founder",
      votingPower: "22.1%",
      joinDate: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      clubId: 1,
      address: "0x951f29Bb7F3C2D891B5F8A27...efgh", 
      contribution: 18500,
      role: "Treasurer",
      votingPower: "16.4%",
      joinDate: "2024-01-20",
      status: "active"
    },
    {
      id: 3,
      clubId: 1,
      address: "0x123abc45...ijkl",
      contribution: 15000,
      role: "Member",
      votingPower: "13.3%",
      joinDate: "2024-01-25",
      status: "active"
    },
    {
      id: 4,
      clubId: 2,
      address: "0x951f29Bb...efgh",
      contribution: 30000,
      role: "Founder",
      votingPower: "33.5%",
      joinDate: "2024-02-03",
      status: "active"
    },
    {
      id: 5,
      clubId: 2,
      address: "0xabc123...xyz",
      contribution: 15000,
      role: "Member",
      votingPower: "16.8%",
      joinDate: "2024-02-10",
      status: "active"
    }
  ]);

  const connectWallet = async () => {
    setUserAccount("0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const CreateClubModal = () => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    
    const handleSubmit = () => {
      if (formData.name && formData.description) {
        const newClub = {
          id: clubs.length + 1,
          name: formData.name,
          description: formData.description,
          treasury: 0,
          members: 1,
          proposals: 0,
          contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
          creator: userAccount,
          created: new Date().toISOString().split('T')[0],
          inviteCode: `${formData.name.toUpperCase().slice(0, 4)}-INV-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        };
        setClubs([...clubs, newClub]);
        
        const newMember = {
          id: members.length + 1,
          clubId: newClub.id,
          address: userAccount,
          contribution: 0,
          role: "Founder",
          votingPower: "100%",
          joinDate: new Date().toISOString().split('T')[0],
          status: "active"
        };
        setMembers([...members, newMember]);
        
        setShowCreateModal(false);
        setFormData({ name: '', description: '' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create Investment Club</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Club Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter club name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border rounded-lg h-24 resize-none"
              placeholder="Describe your investment focus"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCreateModal(false)}
              className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Club
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AddMemberModal = () => {
    const [memberAddress, setMemberAddress] = useState('');
    const [initialRole, setInitialRole] = useState('Member');
    
    const handleAddMember = () => {
      if (memberAddress && selectedClub) {
        const newMember = {
          id: members.length + 1,
          clubId: selectedClub.id,
          address: memberAddress,
          contribution: 0,
          role: initialRole,
          votingPower: "0%",
          joinDate: new Date().toISOString().split('T')[0],
          status: "active"
        };
        
        setMembers([...members, newMember]);
        
        const updatedClubs = clubs.map(club => 
          club.id === selectedClub.id 
            ? {...club, members: club.members + 1}
            : club
        );
        setClubs(updatedClubs);
        setSelectedClub({...selectedClub, members: selectedClub.members + 1});
        
        setShowAddMemberModal(false);
        setMemberAddress('');
        setInitialRole('Member');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Adding to: <strong>{selectedClub?.name}</strong>
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Wallet Address</label>
            <input
              type="text"
              value={memberAddress}
              onChange={(e) => setMemberAddress(e.target.value)}
              className="w-full p-3 border rounded-lg font-mono text-sm"
              placeholder="0x..."
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Initial Role</label>
            <select
              value={initialRole}
              onChange={(e) => setInitialRole(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="Member">Member</option>
              <option value="Treasurer">Treasurer</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddMemberModal(false)}
              className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMember}
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Member
            </button>
          </div>
        </div>
      </div>
    );
  };

  const InviteMemberModal = () => {
    const [inviteEmail, setInviteEmail] = useState('');
    const [generatedLink, setGeneratedLink] = useState('');
    
    const handleGenerateInvite = () => {
      if (selectedClub) {
        const inviteLink = `https://investdao.app/join/${selectedClub.inviteCode}`;
        setGeneratedLink(inviteLink);
      }
    };

    const handleSendInvite = () => {
      alert(`Invite sent to ${inviteEmail}!`);
      setShowInviteModal(false);
      setInviteEmail('');
      setGeneratedLink('');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Invite Member</h2>
          <div className="mb-4 p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              Inviting to: <strong>{selectedClub?.name}</strong>
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter email address"
            />
          </div>
          
          {!generatedLink ? (
            <div className="mb-4">
              <button
                onClick={handleGenerateInvite}
                className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Generate Invite Link
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Invite Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={generatedLink}
                  readOnly
                  className="flex-1 p-3 border rounded-lg bg-gray-50 text-sm font-mono"
                />
                <button
                  onClick={() => copyToClipboard(generatedLink)}
                  className="p-3 border rounded-lg hover:bg-gray-50"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowInviteModal(false);
                setInviteEmail('');
                setGeneratedLink('');
              }}
              className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            {generatedLink && (
              <button
                onClick={handleSendInvite}
                className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Send Invite
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const DepositModal = () => {
    const [amount, setAmount] = useState('');
    
    const handleDeposit = () => {
      if (amount && selectedClub) {
        const updatedClubs = clubs.map(club => 
          club.id === selectedClub.id 
            ? {...club, treasury: club.treasury + parseFloat(amount)}
            : club
        );
        setClubs(updatedClubs);
        setSelectedClub({...selectedClub, treasury: selectedClub.treasury + parseFloat(amount)});
        
        const updatedMembers = members.map(member => 
          member.clubId === selectedClub.id && member.address === userAccount
            ? {...member, contribution: member.contribution + parseFloat(amount)}
            : member
        );
        setMembers(updatedMembers);
        
        setShowDepositModal(false);
        setAmount('');
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Deposit USDC</h2>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Depositing to: <strong>{selectedClub?.name}</strong>
            </p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Amount (USDC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter amount"
              min="1"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowDepositModal(false)}
              className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeposit}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProposalModal = () => {
    const [formData, setFormData] = useState({ title: '', description: '', amount: '' });
    
    const handleSubmit = () => {
      if (formData.title && formData.description && formData.amount) {
        const newProposal = {
          id: proposals.length + 1,
          clubId: selectedClub.id,
          title: formData.title,
          description: formData.description,
          amount: parseFloat(formData.amount),
          proposer: userAccount,
          status: "active",
          votesYes: 0,
          votesNo: 0,
          totalVotes: 0,
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          created: new Date().toISOString().split('T')[0]
        };
        setProposals([...proposals, newProposal]);
        setShowProposalModal(false);
        setFormData({ title: '', description: '', amount: '' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create Proposal</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Proposal Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter proposal title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border rounded-lg h-20 resize-none"
              placeholder="Describe the investment proposal"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Investment Amount (USDC)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter amount"
              min="1"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowProposalModal(false)}
              className="flex-1 py-3 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Create Proposal
            </button>
          </div>
        </div>
      </div>
    );
  };

  const vote = (proposalId, voteType) => {
    const voteWeight = 1000;
    setProposals(proposals.map(proposal => 
      proposal.id === proposalId
        ? {
            ...proposal,
            votesYes: voteType === 'yes' ? proposal.votesYes + voteWeight : proposal.votesYes,
            votesNo: voteType === 'no' ? proposal.votesNo + voteWeight : proposal.votesNo,
            totalVotes: proposal.totalVotes + voteWeight
          }
        : proposal
    ));
  };

  const removeMember = (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      setMembers(members.filter(member => member.id !== memberId));
      
      const updatedClubs = clubs.map(club => 
        club.id === selectedClub.id 
          ? {...club, members: club.members - 1}
          : club
      );
      setClubs(updatedClubs);
      setSelectedClub({...selectedClub, members: selectedClub.members - 1});
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Clubs</p>
              <p className="text-2xl font-bold text-gray-900">{clubs.length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total TVL</p>
              <p className="text-2xl font-bold text-gray-900">
                ${clubs.reduce((acc, club) => acc + club.treasury, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Proposals</p>
              <p className="text-2xl font-bold text-gray-900">
                {proposals.filter(p => p.status === 'active').length}
              </p>
            </div>
            <Vote className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900">
                {clubs.reduce((acc, club) => acc + club.members, 0)}
              </p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Investment Clubs</h2>
        {userAccount && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Create Club
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clubs.map(club => (
          <div key={club.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{club.name}</h3>
              <button
                onClick={() => setSelectedClub(club)}
                className="text-blue-600 hover:text-blue-700"
              >
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-600 mb-4 text-sm">{club.description}</p>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">Treasury</p>
                <p className="font-semibold">${club.treasury.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="font-semibold">{club.members}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Proposals</p>
                <p className="font-semibold">{club.proposals}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSelectedClub(club);
                  setShowDepositModal(true);
                }}
                className="flex-1 bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 text-sm"
              >
                Deposit
              </button>
              <button
                onClick={() => setSelectedClub(club)}
                className="flex-1 border border-blue-600 text-blue-600 py-2 px-3 rounded-lg hover:bg-blue-50 text-sm"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderClubDetails = () => {
    if (!selectedClub) return null;

    const clubProposals = proposals.filter(p => p.clubId === selectedClub.id);
    const clubMembers = members.filter(m => m.clubId === selectedClub.id);

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold">{selectedClub.name}</h1>
              <p className="text-gray-600 mt-2">{selectedClub.description}</p>
            </div>
            <button
              onClick={() => setSelectedClub(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500">Treasury Balance</p>
              <p className="text-2xl font-bold text-green-600">${selectedClub.treasury.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-bold">{selectedClub.members}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Proposals</p>
              <p className="text-2xl font-bold">{clubProposals.filter(p => p.status === 'active').length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Invite Code</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-mono text-blue-600">{selectedClub.inviteCode}</p>
                <button
                  onClick={() => copyToClipboard(selectedClub.inviteCode)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowDepositModal(true)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Deposit Funds
            </button>
            <button
              onClick={() => setShowProposalModal(true)}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
            >
              Create Proposal
            </button>
            <button
              onClick={() => setShowAddMemberModal(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Add Member
            </button>
            <button
              onClick={() => setShowInviteModal(true)}
              className="border border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-50 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Send Invite
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Proposals</h2>
          <div className="space-y-4">
            {clubProposals.map(proposal => {
              const yesPercentage = proposal.totalVotes > 0 ? (proposal.votesYes / proposal.totalVotes) * 100 : 0;
              const noPercentage = proposal.totalVotes > 0 ? (proposal.votesNo / proposal.totalVotes) * 100 : 0;
              
              return (
                <div key={proposal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{proposal.title}</h3>
                      <p className="text-gray-600 text-sm">{proposal.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Amount: ${proposal.amount.toLocaleString()} | 
                        Proposer: {proposal.proposer} | 
                        Deadline: {proposal.deadline}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {proposal.status === 'active' && (
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Active</span>
                      )}
                      {proposal.status === 'passed' && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Passed</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Yes: {proposal.votesYes.toLocaleString()} ({yesPercentage.toFixed(1)}%)</span>
                      <span>No: {proposal.votesNo.toLocaleString()} ({noPercentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{width: `${yesPercentage}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  {proposal.status === 'active' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => vote(proposal.id, 'yes')}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Vote Yes
                      </button>
                      <button
                        onClick={() => vote(proposal.id, 'no')}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Vote No
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Members ({clubMembers.length})</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 flex items-center gap-2 text-sm"
              >
                <Mail className="w-4 h-4" />
                Send Invite
              </button>
            </div>
          </div>
          <div className="space-y-3">
            {clubMembers.map((member) => (
              <div key={member.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {member.role === 'Founder' ? <Crown className="w-4 h-4 text-blue-600" /> : 
                     member.role === 'Treasurer' ? <Coins className="w-4 h-4 text-green-600" /> : 
                     <User className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{member.address}</p>
                    <p className="text-sm text-gray-500">{member.role} • Joined {member.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">${member.contribution.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{member.votingPower} voting power</p>
                  </div>
                  {member.role !== 'Founder' && userAccount === selectedClub.creator && (
                    <button
                      onClick={() => removeMember(member.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                      title="Remove member"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">InvestDAO</h1>
            </div>
            
            <nav className="flex items-center gap-6">
              <button
                onClick={() => setSelectedClub(null)}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium"
              >
                Dashboard
              </button>
              <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                Analytics
              </button>
              <button className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                Docs
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">Polygon Testnet</div>
              {!userAccount ? (
                <button
                  onClick={connectWallet}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm font-medium">{userAccount.slice(0, 6)}...{userAccount.slice(-4)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedClub ? renderClubDetails() : renderDashboard()}
      </main>

      {/* Modals */}
      {showCreateModal && <CreateClubModal />}
      {showDepositModal && <DepositModal />}
      {showProposalModal && <ProposalModal />}
      {showAddMemberModal && <AddMemberModal />}
      {showInviteModal && <InviteMemberModal />}

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-gray-600">InvestDAO - Democratizing Investment through DAOs</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Built on Polygon</span>
              <span>•</span>
              <span>Powered by Smart Contracts</span>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 flex items-center gap-1">
                View on Explorer <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvestmentClubDAO;