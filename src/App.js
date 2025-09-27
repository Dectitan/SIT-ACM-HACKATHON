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
  UserPlus,
  Copy,
  AlertCircle,
  Shield
} from 'lucide-react';

const InvestmentClubDAO = () => {
  const [userAccount, setUserAccount] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Default data
  const defaultClubs = [
    {
      id: 1,
      name: "DeFi Innovators",
      description: "Focused on emerging DeFi protocols and yield farming opportunities",
      members: 3,
      proposals: 3,
      creator: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      created: "2024-01-15",
      inviteCode: "DEFI-INV-2024"
    },
    {
      id: 2,
      name: "Blue Chip Holdings", 
      description: "Conservative investments in established cryptocurrencies",
      members: 2,
      proposals: 1,
      creator: "0x951f29Bb...efgh",
      created: "2024-02-03",
      inviteCode: "BLUE-INV-2024"
    }
  ];

  const defaultProposals = [
    {
      id: 1,
      clubId: 1,
      title: "Invest 30% in Arbitrum Ecosystem",
      description: "Allocate 30% of treasury to ARB tokens and Arbitrum-based DeFi protocols",
      amount: 37500,
      proposer: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      status: "active",
      deadline: "2024-03-15",
      created: "2024-03-01",
      votes: []
    },
    {
      id: 2,
      clubId: 1,
      title: "Purchase 5 ETH for Long-term Hold",
      description: "Buy and hold 5 ETH tokens as a core portfolio position",
      amount: 12500,
      proposer: "0x951f29Bb...efgh",
      status: "passed",
      deadline: "2024-02-28",
      created: "2024-02-15",
      votes: []
    }
  ];

  const defaultMembers = [
    {
      id: 1,
      clubId: 1,
      address: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      contribution: 25000,
      role: "Leader",
      joinDate: "2024-01-15",
      status: "active",
      addedBy: null
    },
    {
      id: 2,
      clubId: 1,
      address: "0x951f29Bb7F3C2D891B5F8A27...efgh",
      contribution: 18500,
      role: "Member", 
      joinDate: "2024-01-20",
      status: "active",
      addedBy: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca"
    },
    {
      id: 3,
      clubId: 1,
      address: "0x123abc45...ijkl",
      contribution: 15000,
      role: "Member",
      joinDate: "2024-01-25", 
      status: "active",
      addedBy: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca"
    },
    {
      id: 4,
      clubId: 2,
      address: "0x951f29Bb...efgh",
      contribution: 30000,
      role: "Leader",
      joinDate: "2024-02-03",
      status: "active",
      addedBy: null
    },
    {
      id: 5,
      clubId: 2,
      address: "0xabc123...xyz",
      contribution: 15000,
      role: "Member",
      joinDate: "2024-02-10",
      status: "active",
      addedBy: "0x951f29Bb...efgh"
    }
  ];

  // Load data from localStorage or use defaults
  const [clubs, setClubs] = useState(() => {
    const saved = window.localStorage?.getItem('investdao-clubs');
    return saved ? JSON.parse(saved) : defaultClubs;
  });

  const [proposals, setProposals] = useState(() => {
    const saved = window.localStorage?.getItem('investdao-proposals');
    return saved ? JSON.parse(saved) : defaultProposals;
  });

  const [members, setMembers] = useState(() => {
    const saved = window.localStorage?.getItem('investdao-members');
    return saved ? JSON.parse(saved) : defaultMembers;
  });

  // Save data to localStorage whenever state changes
  useEffect(() => {
    window.localStorage?.setItem('investdao-clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    window.localStorage?.setItem('investdao-proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    window.localStorage?.setItem('investdao-members', JSON.stringify(members));
  }, [members]);

  // Load and save user account
  useEffect(() => {
    const savedAccount = window.localStorage?.getItem('investdao-account');
    if (savedAccount) {
      setUserAccount(savedAccount);
    }
  }, []);

  useEffect(() => {
    if (userAccount) {
      window.localStorage?.setItem('investdao-account', userAccount);
    } else {
      window.localStorage?.removeItem('investdao-account');
    }
  }, [userAccount]);

  // Calculate club treasury from member contributions
  const calculateClubTreasury = (clubId) => {
    return members
      .filter(m => m.clubId === clubId)
      .reduce((sum, member) => sum + member.contribution, 0);
  };

  // Calculate voting power based on contribution
  const calculateVotingPower = (memberContribution, clubId) => {
    const totalContributions = calculateClubTreasury(clubId);
    if (totalContributions === 0) return 0;
    return (memberContribution / totalContributions) * 100;
  };

  // Calculate proposal votes
  const calculateProposalVotes = (proposalId) => {
    const proposal = proposals.find(p => p.id === proposalId);
    if (!proposal || !proposal.votes) {
      return { votesYes: 0, votesNo: 0, totalVotes: 0 };
    }

    const votesYes = proposal.votes
      .filter(vote => vote.support)
      .reduce((sum, vote) => sum + vote.weight, 0);
    
    const votesNo = proposal.votes
      .filter(vote => !vote.support)
      .reduce((sum, vote) => sum + vote.weight, 0);

    return { votesYes, votesNo, totalVotes: votesYes + votesNo };
  };

  // Check if current user is leader
  const isLeader = (clubId) => {
    const club = clubs.find(c => c.id === clubId);
    return club && club.creator === userAccount;
  };

  useEffect(() => {
    document.title = 'InvestDAO';
  }, []);

  const connectTestWallet = () => {
    setUserAccount("0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca");
    setError('');
  };

  const disconnectWallet = () => {
    setUserAccount(null);
    setSelectedClub(null);
    setError('');
  };

  const resetData = () => {
    if (window.confirm('This will reset all data to defaults. Are you sure?')) {
      window.localStorage?.removeItem('investdao-clubs');
      window.localStorage?.removeItem('investdao-proposals');
      window.localStorage?.removeItem('investdao-members');
      window.localStorage?.removeItem('investdao-account');
      setClubs(defaultClubs);
      setProposals(defaultProposals);
      setMembers(defaultMembers);
      setUserAccount(null);
      setSelectedClub(null);
      setError('');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const vote = (proposalId, voteType) => {
    if (!selectedClub || !userAccount) return;

    const userMember = members.find(m => 
      m.clubId === selectedClub.id && m.address === userAccount
    );
    
    if (!userMember || userMember.contribution === 0) {
      setError('You must have a contribution to vote');
      return;
    }

    const voteWeight = userMember.contribution;

    setProposals(prevProposals => prevProposals.map(proposal => {
      if (proposal.id === proposalId) {
        const existingVoteIndex = proposal.votes?.findIndex(v => v.address === userAccount);
        let updatedVotes = proposal.votes || [];
        
        if (existingVoteIndex >= 0) {
          updatedVotes[existingVoteIndex] = {
            address: userAccount,
            support: voteType === 'yes',
            weight: voteWeight
          };
        } else {
          updatedVotes.push({
            address: userAccount,
            support: voteType === 'yes',
            weight: voteWeight
          });
        }

        return { ...proposal, votes: updatedVotes };
      }
      return proposal;
    }));
  };

  const removeMember = (memberId, clubId) => {
    if (!isLeader(clubId)) {
      setError('Only the club leader can remove members');
      return;
    }

    const memberToRemove = members.find(m => m.id === memberId);
    if (!memberToRemove || memberToRemove.role === 'Leader') {
      setError('Cannot remove the club leader');
      return;
    }

    if (window.confirm(`Remove member ${memberToRemove.address}?`)) {
      setMembers(prevMembers => prevMembers.filter(member => member.id !== memberId));
      const updatedClubs = clubs.map(club => 
        club.id === clubId ? {...club, members: club.members - 1} : club
      );
      setClubs(updatedClubs);
      if (selectedClub?.id === clubId) {
        setSelectedClub({...selectedClub, members: selectedClub.members - 1});
      }
    }
  };

  // Modal Components
  const CreateClubModal = () => {
    const [formData, setFormData] = useState({ name: '', description: '' });
    
    const handleSubmit = () => {
      if (formData.name && formData.description && userAccount) {
        const newClub = {
          id: Math.max(...clubs.map(c => c.id), 0) + 1,
          name: formData.name,
          description: formData.description,
          members: 1,
          proposals: 0,
          creator: userAccount,
          created: new Date().toISOString().split('T')[0],
          inviteCode: `${formData.name.toUpperCase().slice(0, 4)}-INV-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
        };
        setClubs([...clubs, newClub]);
        
        const newMember = {
          id: Math.max(...members.map(m => m.id), 0) + 1,
          clubId: newClub.id,
          address: userAccount,
          contribution: 0,
          role: "Leader",
          joinDate: new Date().toISOString().split('T')[0],
          status: "active",
          addedBy: null
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
    
    const handleAddMember = () => {
      if (!selectedClub || !userAccount || !isLeader(selectedClub.id)) {
        setError('Only the club leader can add members');
        return;
      }

      if (!memberAddress || !memberAddress.startsWith('0x')) {
        setError('Please enter a valid wallet address');
        return;
      }

      const existingMember = members.find(m => 
        m.clubId === selectedClub.id && m.address.toLowerCase() === memberAddress.toLowerCase()
      );
      
      if (existingMember) {
        setError('This address is already a member');
        return;
      }

      const newMember = {
        id: Math.max(...members.map(m => m.id), 0) + 1,
        clubId: selectedClub.id,
        address: memberAddress,
        contribution: 0,
        role: "Member",
        joinDate: new Date().toISOString().split('T')[0],
        status: "active",
        addedBy: userAccount
      };
      
      setMembers([...members, newMember]);
      const updatedClubs = clubs.map(club => 
        club.id === selectedClub.id ? {...club, members: club.members + 1} : club
      );
      setClubs(updatedClubs);
      setSelectedClub({...selectedClub, members: selectedClub.members + 1});
      
      setShowAddMemberModal(false);
      setMemberAddress('');
      setError('');
    };

    if (selectedClub && !isLeader(selectedClub.id)) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-red-500" />
              <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
            </div>
            <p className="text-gray-600 mb-6">Only the club leader can add new members.</p>
            <button
              onClick={() => setShowAddMemberModal(false)}
              className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-6 h-6 text-yellow-500" />
            <h2 className="text-2xl font-bold">Add New Member</h2>
          </div>
          <div className="mb-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              Adding to: <strong>{selectedClub?.name}</strong>
            </p>
            <p className="text-xs text-blue-600 mt-1">As club leader, only you can add members</p>
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

  const DepositModal = () => {
    const [amount, setAmount] = useState('');
    
    const handleSubmit = () => {
      if (amount && parseFloat(amount) > 0 && selectedClub && userAccount) {
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
              min="0"
              step="0.01"
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
              onClick={handleSubmit}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Deposit
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ProposalModal = () => {
    const [formData, setFormData] = useState({ title: '', description: '', amount: '', target: '' });
    
    const handleSubmit = () => {
      if (formData.title && formData.description && formData.amount && formData.target && selectedClub) {
        const newProposal = {
          id: Math.max(...proposals.map(p => p.id), 0) + 1,
          clubId: selectedClub.id,
          title: formData.title,
          description: formData.description,
          amount: parseFloat(formData.amount),
          proposer: userAccount,
          status: "active",
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          created: new Date().toISOString().split('T')[0],
          votes: [],
          target: formData.target
        };
        setProposals([...proposals, newProposal]);
        setShowProposalModal(false);
        setFormData({ title: '', description: '', amount: '', target: '' });
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
              placeholder="Describe the proposal"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Amount (USDC)</label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full p-3 border rounded-lg"
              placeholder="Enter amount"
              min="0"
              step="0.01"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Target Address</label>
            <input
              type="text"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
              className="w-full p-3 border rounded-lg font-mono text-sm"
              placeholder="0x..."
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
              disabled={!formData.title || !formData.description || !formData.amount || !formData.target}
            >
              Create Proposal
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700">{error}</p>
          <button onClick={() => setError('')} className="ml-auto text-red-500 hover:text-red-700">✕</button>
        </div>
      )}

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
                ${clubs.reduce((acc, club) => acc + calculateClubTreasury(club.id), 0).toLocaleString()}
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
        {clubs.map(club => {
          const clubTreasury = calculateClubTreasury(club.id);
          const isUserLeader = club.creator === userAccount;
          
          return (
            <div key={club.id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold">{club.name}</h3>
                  {isUserLeader && <Crown className="w-5 h-5 text-yellow-500" title="You are the leader" />}
                </div>
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
                  <p className="font-semibold">${clubTreasury.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Members</p>
                  <p className="font-semibold">{club.members}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Proposals</p>
                  <p className="font-semibold">{proposals.filter(p => p.clubId === club.id).length}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { setSelectedClub(club); setShowDepositModal(true); }}
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
          );
        })}
      </div>
    </div>
  );

  const renderClubDetails = () => {
    if (!selectedClub) return null;

    const clubProposals = proposals.filter(p => p.clubId === selectedClub.id);
    const clubMembers = members.filter(m => m.clubId === selectedClub.id);
    const clubTreasury = calculateClubTreasury(selectedClub.id);
    const isUserLeader = isLeader(selectedClub.id);

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{selectedClub.name}</h1>
                {isUserLeader && (
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-sm">
                    <Crown className="w-4 h-4" />
                    <span>Leader</span>
                  </div>
                )}
              </div>
              <p className="text-gray-600">{selectedClub.description}</p>
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
              <p className="text-2xl font-bold text-green-600">${clubTreasury.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Members</p>
              <p className="text-2xl font-bold">{clubMembers.length}</p>
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
            {isUserLeader && (
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Proposals</h2>
          <div className="space-y-4">
            {clubProposals.map(proposal => {
              const calculatedVotes = calculateProposalVotes(proposal.id);
              const yesPercentage = calculatedVotes.totalVotes > 0 ? (calculatedVotes.votesYes / calculatedVotes.totalVotes) * 100 : 0;
              const noPercentage = calculatedVotes.totalVotes > 0 ? (calculatedVotes.votesNo / calculatedVotes.totalVotes) * 100 : 0;
              
              const userVote = proposal.votes?.find(v => v.address === userAccount);
              const hasUserVoted = !!userVote;
              const userMember = clubMembers.find(m => m.address === userAccount);
              const canVote = userMember && userMember.contribution > 0;
              
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
                      <span>Yes: {calculatedVotes.votesYes.toLocaleString()} USDC ({yesPercentage.toFixed(1)}%)</span>
                      <span>No: {calculatedVotes.votesNo.toLocaleString()} USDC ({noPercentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                        style={{width: `${yesPercentage}%`}}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Total voting weight: {calculatedVotes.totalVotes.toLocaleString()} USDC
                    </p>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap">
                    {proposal.status === 'active' && userAccount && canVote && !hasUserVoted && (
                      <>
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
                      </>
                    )}
                    {hasUserVoted && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>
                          You voted: <strong>{userVote.support ? 'Yes' : 'No'}</strong> 
                          ({userVote.weight.toLocaleString()} USDC)
                        </span>
                      </div>
                    )}
                    {!canVote && userAccount && (
                      <span className="text-sm text-gray-500">
                        You must deposit funds to vote
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {clubProposals.length === 0 && (
              <p className="text-gray-500 text-center py-8">No proposals yet. Create the first one!</p>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Members ({clubMembers.length})</h2>
            {isUserLeader && (
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
            )}
          </div>
          <div className="space-y-3">
            {clubMembers.map((member) => {
              const votingPower = calculateVotingPower(member.contribution, selectedClub.id);
              return (
                <div key={member.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {member.role === 'Leader' ? <Crown className="w-4 h-4 text-blue-600" /> : 
                       <User className="w-4 h-4 text-gray-600" />}
                    </div>
                    <div>
                      <p className="font-medium">{member.address}</p>
                      <p className="text-sm text-gray-500">{member.role} • Joined {member.joinDate}</p>
                      {member.addedBy && (
                        <p className="text-xs text-gray-400">Added by {member.addedBy.slice(0, 8)}...</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">${member.contribution.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{votingPower.toFixed(1)}% voting power</p>
                    </div>
                    {member.role !== 'Leader' && isUserLeader && (
                      <button
                        onClick={() => removeMember(member.id, selectedClub.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Remove member"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
              {userAccount && (
                <button
                  onClick={resetData}
                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                >
                  Reset Data
                </button>
              )}
            </nav>

            <div className="flex items-center gap-3">
              <div className="text-sm text-gray-500">Polygon Testnet • Data Persisted</div>
              {!userAccount ? (
                <button
                  onClick={connectTestWallet}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Wallet className="w-4 h-4" />
                  Connect Test Wallet
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium">{userAccount.slice(0, 6)}...{userAccount.slice(-4)}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Leader</span>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="text-gray-500 hover:text-gray-700 p-2"
                    title="Disconnect"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedClub ? renderClubDetails() : renderDashboard()}
      </main>

      {showCreateModal && <CreateClubModal />}
      {showDepositModal && <DepositModal />}
      {showProposalModal && <ProposalModal />}
      {showAddMemberModal && <AddMemberModal />}

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
              <span>Leader-Controlled Membership</span>
              <span>•</span>
              <span>LocalStorage Persistence</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvestmentClubDAO;