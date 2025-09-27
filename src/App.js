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
  Shield,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Calendar,
  Clock,
  ArrowUp,
  ArrowDown,
  Zap,
  Trophy,
  TrendingDown
} from 'lucide-react';
//import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from 'recharts';

const InvestmentClubDAO = () => {
  const [userAccount, setUserAccount] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Enhanced default data with performance metrics
  const defaultClubs = [
    {
      id: 1,
      name: "DeFi Innovators",
      description: "Focused on emerging DeFi protocols and yield farming opportunities",
      members: 3,
      proposals: 3,
      creator: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      created: "2024-01-15",
      inviteCode: "DEFI-INV-2024",
      category: "DeFi",
      riskLevel: "High",
      performanceData: {
        monthlyReturn: 12.5,
        totalReturn: 78.3,
        winRate: 73.5,
        averageProposalValue: 15000,
        chartData: [
          { month: 'Jan', value: 25000, return: 5.2 },
          { month: 'Feb', value: 28500, return: 8.1 },
          { month: 'Mar', value: 32100, return: 12.5 },
          { month: 'Apr', value: 35800, return: 15.2 },
          { month: 'May', value: 42300, return: 18.7 },
          { month: 'Jun', value: 58500, return: 25.3 }
        ],
        categoryAllocation: [
          { name: 'DeFi Protocols', value: 45, color: '#8B5CF6' },
          { name: 'Yield Farming', value: 30, color: '#06B6D4' },
          { name: 'Governance Tokens', value: 15, color: '#10B981' },
          { name: 'Liquidity Mining', value: 10, color: '#F59E0B' }
        ]
      }
    },
    {
      id: 2,
      name: "Blue Chip Holdings",
      description: "Conservative investments in established cryptocurrencies",
      members: 2,
      proposals: 1,
      creator: "0x951f29Bb...efgh",
      created: "2024-02-03",
      inviteCode: "BLUE-INV-2024",
      category: "Conservative",
      riskLevel: "Low",
      performanceData: {
        monthlyReturn: 4.2,
        totalReturn: 23.7,
        winRate: 89.2,
        averageProposalValue: 22500,
        chartData: [
          { month: 'Jan', value: 30000, return: 2.1 },
          { month: 'Feb', value: 31200, return: 3.8 },
          { month: 'Mar', value: 32800, return: 4.2 },
          { month: 'Apr', value: 34100, return: 5.1 },
          { month: 'May', value: 36500, return: 6.8 },
          { month: 'Jun', value: 45000, return: 8.9 }
        ],
        categoryAllocation: [
          { name: 'Bitcoin', value: 40, color: '#F97316' },
          { name: 'Ethereum', value: 35, color: '#3B82F6' },
          { name: 'Stablecoins', value: 15, color: '#22C55E' },
          { name: 'Layer 1s', value: 10, color: '#8B5CF6' }
        ]
      }
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
      votes: [],
      category: "Investment",
      riskLevel: "Medium"
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
      votes: [],
      category: "Investment",
      riskLevel: "Low"
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
      addedBy: null,
      votingActivity: 15,
      proposalsCreated: 8
    },
    {
      id: 2,
      clubId: 1,
      address: "0x951f29Bb7F3C2D891B5F8A27...efgh",
      contribution: 18500,
      role: "Member",
      joinDate: "2024-01-20",
      status: "active",
      addedBy: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      votingActivity: 12,
      proposalsCreated: 3
    },
    {
      id: 3,
      clubId: 1,
      address: "0x123abc45...ijkl",
      contribution: 15000,
      role: "Member",
      joinDate: "2024-01-25",
      status: "active",
      addedBy: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      votingActivity: 8,
      proposalsCreated: 1
    },
    {
      id: 4,
      clubId: 2,
      address: "0x951f29Bb...efgh",
      contribution: 30000,
      role: "Leader",
      joinDate: "2024-02-03",
      status: "active",
      addedBy: null,
      votingActivity: 6,
      proposalsCreated: 4
    },
    {
      id: 5,
      clubId: 2,
      address: "0xabc123...xyz",
      contribution: 15000,
      role: "Member",
      joinDate: "2024-02-10",
      status: "active",
      addedBy: "0x951f29Bb...efgh",
      votingActivity: 4,
      proposalsCreated: 0
    }
  ];

  // Load data from localStorage or use defaults
  const [clubs, setClubs] = useState(() => {
    const saved = localStorage.getItem('investdao-clubs');
    return saved ? JSON.parse(saved) : defaultClubs;
  });

  const [proposals, setProposals] = useState(() => {
    const saved = localStorage.getItem('investdao-proposals');
    return saved ? JSON.parse(saved) : defaultProposals;
  });

  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('investdao-members');
    return saved ? JSON.parse(saved) : defaultMembers;
  });

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('investdao-clubs', JSON.stringify(clubs));
  }, [clubs]);

  useEffect(() => {
    localStorage.setItem('investdao-proposals', JSON.stringify(proposals));
  }, [proposals]);

  useEffect(() => {
    localStorage.setItem('investdao-members', JSON.stringify(members));
  }, [members]);

  // Load and save user account
  useEffect(() => {
    const savedAccount = localStorage.getItem('investdao-account');
    if (savedAccount) {
      setUserAccount(savedAccount);
    }
  }, []);

  useEffect(() => {
    if (userAccount) {
      localStorage.setItem('investdao-account', userAccount);
    } else {
      localStorage.removeItem('investdao-account');
    }
  }, [userAccount]);

  // Helper functions
  const calculateClubTreasury = (clubId) => {
    return members
      .filter(m => m.clubId === clubId)
      .reduce((sum, member) => sum + member.contribution, 0);
  };

  const calculateVotingPower = (memberContribution, clubId) => {
    const totalContributions = calculateClubTreasury(clubId);
    if (totalContributions === 0) return 0;
    return (memberContribution / totalContributions) * 100;
  };

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

  const isLeader = (clubId) => {
    const club = clubs.find(c => c.id === clubId);
    return club && club.creator === userAccount;
  };

  const getRiskBadgeColor = (risk) => {
    switch(risk) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPerformanceColor = (value) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  useEffect(() => {
    document.title = 'InvestDAO - Decentralized Investment Clubs';
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
      localStorage.removeItem('investdao-clubs');
      localStorage.removeItem('investdao-proposals');
      localStorage.removeItem('investdao-members');
      localStorage.removeItem('investdao-account');
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
    const [formData, setFormData] = useState({ name: '', description: '', category: 'DeFi', riskLevel: 'Medium' });
   
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
          inviteCode: `${formData.name.toUpperCase().slice(0, 4)}-INV-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
          category: formData.category,
          riskLevel: formData.riskLevel,
          performanceData: {
            monthlyReturn: 0,
            totalReturn: 0,
            winRate: 0,
            averageProposalValue: 0,
            chartData: [],
            categoryAllocation: []
          }
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
          addedBy: null,
          votingActivity: 0,
          proposalsCreated: 0
        };
        setMembers([...members, newMember]);
       
        setShowCreateModal(false);
        setFormData({ name: '', description: '', category: 'DeFi', riskLevel: 'Medium' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border-0 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Investment Club</h2>
            <p className="text-gray-600">Start your investment journey with the community</p>
          </div>
         
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Club Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                placeholder="Enter your club name"
              />
            </div>
           
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl h-24 resize-none focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Describe your investment focus and strategy"
              />
            </div>
           
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="DeFi">DeFi</option>
                  <option value="Conservative">Conservative</option>
                  <option value="Growth">Growth</option>
                  <option value="Experimental">Experimental</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Risk Level</label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>
         
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => setShowCreateModal(false)}
              className="flex-1 py-4 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg"
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
        addedBy: userAccount,
        votingActivity: 0,
        proposalsCreated: 0
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-6">Only the club leader can add new members.</p>
              <button
                onClick={() => setShowAddMemberModal(false)}
                className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Member</h2>
          </div>
         
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <p className="text-sm text-blue-800 font-semibold">
              Adding to: <span className="text-blue-900">{selectedClub?.name}</span>
            </p>
            <p className="text-xs text-blue-600 mt-1">As club leader, only you can add members</p>
          </div>
         
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Wallet Address</label>
            <input
              type="text"
              value={memberAddress}
              onChange={(e) => setMemberAddress(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="0x..."
            />
          </div>
         
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddMemberModal(false)}
              className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleAddMember}
              className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold"
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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Deposit USDC</h2>
            <p className="text-gray-600 mt-2">Add funds to increase your voting power</p>
          </div>
         
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-green-100">
            <p className="text-sm text-green-800 font-semibold">
              Depositing to: <span className="text-green-900">{selectedClub?.name}</span>
            </p>
          </div>
         
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (USDC)</label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-lg font-semibold pr-16"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              <span className="absolute right-4 top-4 text-gray-500 font-medium">USDC</span>
            </div>
          </div>
         
          <div className="flex gap-3">
            <button
              onClick={() => setShowDepositModal(false)}
              className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all font-semibold shadow-lg"
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
    const [formData, setFormData] = useState({ title: '', description: '', amount: '', target: '', category: 'Investment', riskLevel: 'Medium' });
   
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
          target: formData.target,
          category: formData.category,
          riskLevel: formData.riskLevel
        };
        setProposals([...proposals, newProposal]);
        setShowProposalModal(false);
        setFormData({ title: '', description: '', amount: '', target: '', category: 'Investment', riskLevel: 'Medium' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border-0 animate-in fade-in-0 zoom-in-95 duration-200">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Vote className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Proposal</h2>
            <p className="text-gray-600 mt-2">Submit your investment idea for voting</p>
          </div>
         
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Proposal Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Enter proposal title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl h-20 resize-none focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="Describe the proposal"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (USDC)</label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Risk Level</label>
                <select
                  value={formData.riskLevel}
                  onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              >
                <option value="Investment">Investment</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Governance">Governance</option>
                <option value="Strategic">Strategic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Target Address</label>
              <input
                type="text"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: e.target.value})}
                className="w-full p-4 border-2 border-gray-200 rounded-xl font-mono text-sm focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="0x..."
              />
            </div>
          </div>
         
          <div className="flex gap-3 mt-8">
            <button
              onClick={() => setShowProposalModal(false)}
              className="flex-1 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg"
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
    <div className="space-y-8">
      {error && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm animate-in slide-in-from-top-5 duration-300">
          <AlertCircle className="w-5 h-5 text-red-500" />
          <p className="text-red-700 font-medium">{error}</p>
          <button onClick={() => setError('')} className="ml-auto text-red-500 hover:text-red-700 font-bold">✕</button>
        </div>
      )}

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-semibold mb-1">Total Clubs</p>
              <p className="text-3xl font-bold text-blue-900 mb-2">{clubs.length}</p>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">+12% this month</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
       
        <div className="bg-gradient-to-br from-green-50 via-green-50 to-emerald-100 p-6 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-semibold mb-1">Total TVL</p>
              <p className="text-3xl font-bold text-green-900 mb-2">
                ${clubs.reduce((acc, club) => acc + calculateClubTreasury(club.id), 0).toLocaleString()}
              </p>
              <div className="flex items-center gap-1">
                <ArrowUp className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 font-medium">+8.5% this week</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
       
        <div className="bg-gradient-to-br from-purple-50 via-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-semibold mb-1">Active Proposals</p>
              <p className="text-3xl font-bold text-purple-900 mb-2">
                {proposals.filter(p => p.status === 'active').length}
              </p>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-xs text-yellow-600 font-medium">High activity</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Vote className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
       
        <div className="bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-semibold mb-1">Total Members</p>
              <p className="text-3xl font-bold text-orange-900 mb-2">
                {clubs.reduce((acc, club) => acc + club.members, 0)}
              </p>
              <div className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-orange-500" />
                <span className="text-xs text-orange-600 font-medium">Growing community</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Investment Clubs</h2>
          <p className="text-gray-600 text-lg">Discover and join investment communities</p>
        </div>
        {userAccount && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg font-semibold text-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Create Club
          </button>
        )}
      </div>

      {/* Enhanced Club Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {clubs.map(club => {
          const clubTreasury = calculateClubTreasury(club.id);
          const isUserLeader = club.creator === userAccount;
         
          return (
            <div key={club.id} className="bg-white p-8 rounded-3xl shadow-lg border-0 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{club.name}</h3>
                      {isUserLeader && <Crown className="w-6 h-6 text-yellow-500" title="You are the leader" />}
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRiskBadgeColor(club.riskLevel)}`}>
                        {club.riskLevel} Risk
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                        {club.category}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedClub(club)}
                  className="text-blue-600 hover:text-blue-700 p-3 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <ExternalLink className="w-6 h-6" />
                </button>
              </div>
             
              <p className="text-gray-600 mb-6 text-base leading-relaxed">{club.description}</p>
             
              {/* Performance Chart */}
              <div className="mb-6 p-5 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-900">Performance Overview</h4>
                </div>
                {club.performanceData?.chartData?.length > 0 ? (
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={club.performanceData.chartData}>
                        <defs>
                          <linearGradient id={`colorGradient${club.id}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          fill={`url(#colorGradient${club.id})`}
                        />
                        <Tooltip
                          formatter={(value) => [`${value.toLocaleString()}`, 'Value']}
                          labelStyle={{ color: '#374151' }}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-32 flex items-center justify-center text-gray-500">
                    <p>No performance data available</p>
                  </div>
                )}
              </div>
             
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-5 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium">Monthly Return</p>
                  <div className="flex items-center gap-2">
                    <p className={`font-bold text-xl ${getPerformanceColor(club.performanceData?.monthlyReturn || 0)}`}>
                      {club.performanceData?.monthlyReturn > 0 ? '+' : ''}
                      {club.performanceData?.monthlyReturn || 0}%
                    </p>
                    {club.performanceData?.monthlyReturn > 0 ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 font-medium">Win Rate</p>
                  <p className="font-bold text-xl text-blue-600">
                    {club.performanceData?.winRate || 0}%
                  </p>
                </div>
              </div>
             
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Treasury</p>
                  <p className="font-bold text-xl text-green-600">${clubTreasury.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Members</p>
                  <p className="font-bold text-xl text-blue-600">{club.members}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Proposals</p>
                  <p className="font-bold text-xl text-purple-600">{proposals.filter(p => p.clubId === club.id).length}</p>
                </div>
              </div>
             
              <div className="flex gap-4">
                <button
                  onClick={() => { setSelectedClub(club); setShowDepositModal(true); }}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 px-6 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <DollarSign className="w-5 h-5 inline mr-2" />
                  Deposit
                </button>
                <button
                  onClick={() => setSelectedClub(club)}
                  className="flex-1 border-2 border-blue-200 text-blue-600 py-4 px-6 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all font-semibold hover:shadow-lg"
                >
                  <BarChart3 className="w-5 h-5 inline mr-2" />
                  Details
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
      <div className="space-y-8">
        {/* Enhanced Club Header */}
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 p-8 rounded-3xl shadow-lg border border-blue-100">
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <h1 className="text-5xl font-bold text-gray-900">{selectedClub.name}</h1>
                  {isUserLeader && (
                    <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                      <Crown className="w-5 h-5" />
                      <span>Leader</span>
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-xl mb-4 leading-relaxed">{selectedClub.description}</p>
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-full font-semibold border ${getRiskBadgeColor(selectedClub.riskLevel)}`}>
                    {selectedClub.riskLevel} Risk
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                    {selectedClub.category}
                  </span>
                  <span className="px-4 py-2 rounded-full font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    Created {selectedClub.created}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedClub(null)}
              className="text-gray-400 hover:text-gray-600 p-3 hover:bg-white rounded-xl transition-colors"
            >
              ✕
            </button>
          </div>
         
          {/* Enhanced Analytics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <DollarSign className="w-6 h-6 text-green-500" />
                <p className="font-semibold text-gray-700">Treasury Balance</p>
              </div>
              <p className="text-3xl font-bold text-green-600 mb-2">${clubTreasury.toLocaleString()}</p>
              <p className="text-sm text-gray-500">
                Avg: ${(clubTreasury / Math.max(clubMembers.length, 1)).toLocaleString()} per member
              </p>
            </div>
           
            <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-blue-500" />
                <p className="font-semibold text-gray-700">Total Members</p>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">{clubMembers.length}</p>
              <p className="text-sm text-gray-500">
                Active community
              </p>
            </div>
           
            <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Vote className="w-6 h-6 text-purple-500" />
                <p className="font-semibold text-gray-700">Proposals</p>
              </div>
              <p className="text-3xl font-bold text-purple-600 mb-2">{clubProposals.filter(p => p.status === 'active').length}</p>
              <p className="text-sm text-gray-500">
                {clubProposals.length} total proposals
              </p>
            </div>
           
            <div className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-orange-500" />
                <p className="font-semibold text-gray-700">Performance</p>
              </div>
              <p className={`text-3xl font-bold mb-2 ${getPerformanceColor(selectedClub.performanceData?.monthlyReturn || 0)}`}>
                {selectedClub.performanceData?.monthlyReturn > 0 ? '+' : ''}
                {selectedClub.performanceData?.monthlyReturn || 0}%
              </p>
              <p className="text-sm text-gray-500">Monthly return</p>
            </div>
          </div>

          {/* Performance Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Performance Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900">Performance Trend</h3>
              </div>
              {selectedClub.performanceData?.chartData?.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selectedClub.performanceData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#6B7280', fontSize: 12 }}
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={[(value) => [`${value.toLocaleString()}`, 'Portfolio Value'], (value) => [`${value}%`, 'Return']]}
                        labelStyle={{ color: '#374151', fontWeight: 'bold' }}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>No performance data available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Allocation Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-900">Asset Allocation</h3>
              </div>
              {selectedClub.performanceData?.categoryAllocation?.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={selectedClub.performanceData.categoryAllocation}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {selectedClub.performanceData.categoryAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, 'Allocation']}
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <PieChart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p>No allocation data available</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Invite Code Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-700 mb-2">Invite Code</p>
                <div className="flex items-center gap-3">
                  <code className="text-xl font-mono text-blue-600 bg-blue-50 px-4 py-2 rounded-lg border border-blue-200">
                    {selectedClub.inviteCode}
                  </code>
                  <button
                    onClick={() => copyToClipboard(selectedClub.inviteCode)}
                    className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Copy className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => setShowDepositModal(true)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg font-semibold flex items-center gap-3 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <DollarSign className="w-5 h-5" />
              Deposit Funds
            </button>
            <button
              onClick={() => setShowProposalModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg font-semibold flex items-center gap-3 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Vote className="w-5 h-5" />
              Create Proposal
            </button>
            {isUserLeader && (
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg font-semibold flex items-center gap-3 hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <UserPlus className="w-5 h-5" />
                Add Member
              </button>
            )}
          </div>
        </div>

        {/* Enhanced Proposals Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                <Vote className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Proposals</h2>
                <p className="text-gray-600 text-lg">Vote on investment decisions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-base text-gray-500">
              <Activity className="w-5 h-5" />
              <span>{clubProposals.filter(p => p.status === 'active').length} active</span>
            </div>
          </div>
         
          <div className="space-y-6">
            {clubProposals.map(proposal => {
              const calculatedVotes = calculateProposalVotes(proposal.id);
              const yesPercentage = calculatedVotes.totalVotes > 0 ? (calculatedVotes.votesYes / calculatedVotes.totalVotes) * 100 : 0;
              const noPercentage = calculatedVotes.totalVotes > 0 ? (calculatedVotes.votesNo / calculatedVotes.totalVotes) * 100 : 0;
             
              const userVote = proposal.votes?.find(v => v.address === userAccount);
              const hasUserVoted = !!userVote;
              const userMember = clubMembers.find(m => m.address === userAccount);
              const canVote = userMember && userMember.contribution > 0;
             
              return (
                <div key={proposal.id} className="border-2 border-gray-200 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 hover:border-gray-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <h3 className="font-bold text-2xl text-gray-900">{proposal.title}</h3>
                        <div className="flex items-center gap-3">
                          {proposal.status === 'active' && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold border border-blue-200">
                              Active
                            </span>
                          )}
                          {proposal.status === 'passed' && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold border border-green-200">
                              Passed
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getRiskBadgeColor(proposal.riskLevel)}`}>
                            {proposal.riskLevel} Risk
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-4 leading-relaxed text-lg">{proposal.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-base">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-green-500" />
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-semibold">${proposal.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="w-5 h-5 text-blue-500" />
                          <span className="text-gray-600">Proposer:</span>
                          <span className="font-mono text-sm">{proposal.proposer.slice(0, 8)}...</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-semibold">{proposal.deadline}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-5 h-5 text-orange-500" />
                          <span className="text-gray-600">Created:</span>
                          <span className="font-semibold">{proposal.created}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                 
                  {/* Enhanced Voting Progress */}
                  <div className="mb-6 p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-100">
                    <div className="flex justify-between text-base mb-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-green-700">
                          Yes: {calculatedVotes.votesYes.toLocaleString()} USDC ({yesPercentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <XCircle className="w-5 h-5 text-red-500" />
                        <span className="font-semibold text-red-700">
                          No: {calculatedVotes.votesNo.toLocaleString()} USDC ({noPercentage.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-4 rounded-full transition-all duration-700 ease-out"
                        style={{width: `${yesPercentage}%`}}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Total voting weight: <span className="font-semibold">{calculatedVotes.totalVotes.toLocaleString()} USDC</span>
                      </p>
                      {hasUserVoted && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-gray-600">Your vote:</span>
                          <span className={`font-semibold px-2 py-1 rounded-full ${userVote.support ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {userVote.support ? 'Yes' : 'No'} ({userVote.weight.toLocaleString()} USDC)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                 
                  <div className="flex gap-4 flex-wrap">
                    {proposal.status === 'active' && userAccount && canVote && !hasUserVoted && (
                      <>
                        <button
                          onClick={() => vote(proposal.id, 'yes')}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Vote Yes
                        </button>
                        <button
                          onClick={() => vote(proposal.id, 'no')}
                          className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-pink-700 transition-all flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                          <XCircle className="w-5 h-5" />
                          Vote No
                        </button>
                      </>
                    )}
                    {!canVote && userAccount && (
                      <span className="text-gray-500 bg-gray-100 px-4 py-3 rounded-xl border">
                        You must deposit funds to vote
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
            {clubProposals.length === 0 && (
              <div className="text-center py-16 text-gray-500">
                <Vote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl">No proposals yet</p>
                <p className="text-base">Create the first proposal to get started!</p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Members Section */}
        <div className="bg-white p-8 rounded-3xl shadow-lg border-0">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Members ({clubMembers.length})</h2>
                <p className="text-gray-600 text-lg">Club membership and voting power</p>
              </div>
            </div>
            {isUserLeader && (
              <button
                onClick={() => setShowAddMemberModal(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <UserPlus className="w-5 h-5" />
                Add Member
              </button>
            )}
          </div>
          <div className="space-y-4">
            {clubMembers.map((member) => {
              const votingPower = calculateVotingPower(member.contribution, selectedClub.id);
              return (
                <div key={member.id} className="flex justify-between items-center p-6 border-2 border-gray-200 rounded-2xl hover:shadow-md transition-all hover:border-gray-300">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      {member.role === 'Leader' ?
                        <Crown className="w-6 h-6 text-blue-600" /> :
                        <User className="w-6 h-6 text-gray-600" />
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{member.address}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full font-medium ${member.role === 'Leader' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>
                          {member.role}
                        </span>
                        <span>Joined {member.joinDate}</span>
                      </div>
                      {member.addedBy && (
                        <p className="text-xs text-gray-400">Added by {member.addedBy.slice(0, 8)}...</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-bold text-xl">${member.contribution.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">{votingPower.toFixed(1)}% voting power</p>
                    </div>
                    {member.role !== 'Leader' && isUserLeader && (
                      <button
                        onClick={() => removeMember(member.id, selectedClub.id)}
                        className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remove member"
                      >
                        <XCircle className="w-5 h-5" />
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">InvestDAO</h1>
                <p className="text-sm text-gray-600">Decentralized Investment Platform</p>
              </div>
            </div>
           
            <nav className="flex items-center gap-8">
              <button
                onClick={() => setSelectedClub(null)}
                className={`text-lg font-semibold transition-colors ${!selectedClub ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Dashboard
              </button>
              {userAccount && (
                <button
                  onClick={resetData}
                  className="text-gray-500 hover:text-gray-700 text-lg font-semibold transition-colors"
                >
                  Reset Data
                </button>
              )}
            </nav>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
                Polygon Testnet
              </div>
              {!userAccount ? (
                <button
                  onClick={connectTestWallet}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 flex items-center gap-3 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-green-50 text-green-700 px-4 py-3 rounded-xl border border-green-200">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-medium">{userAccount.slice(0, 6)}...{userAccount.slice(-4)}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold">Leader</span>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {selectedClub ? renderClubDetails() : renderDashboard()}
      </main>

      {/* Modals */}
      {showCreateModal && <CreateClubModal />}
      {showDepositModal && <DepositModal />}
      {showProposalModal && <ProposalModal />}
      {showAddMemberModal && <AddMemberModal />}

      {/* Enhanced Footer */}
      <footer className="bg-white/80 backdrop-blur-lg border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-gray-900 font-bold text-lg">InvestDAO</span>
                <p className="text-gray-600 text-sm">Democratizing Investment through DAOs</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Built on Polygon
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Crown className="w-4 h-4" />
                Leader-Controlled
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Real-time Data
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InvestmentClubDAO;

