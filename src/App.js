import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Wallet, 
  Vote, 
  TrendingUp, 
  Shield, 
  Plus, 
  ExternalLink,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  Crown,
  User,
  Settings,
  BarChart3,
  Coins
} from 'lucide-react';

const InvestmentClubDAO = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedClub, setSelectedClub] = useState(null);
  const [userAccount, setUserAccount] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showProposalModal, setShowProposalModal] = useState(false);

  // Mock data - in real app, this would come from blockchain
  const [clubs, setClubs] = useState([
    {
      id: 1,
      name: "DeFi Innovators",
      description: "Focused on emerging DeFi protocols and yield farming opportunities",
      treasury: 125000,
      members: 12,
      proposals: 3,
      contractAddress: "0x742d35Cc6C1F5b2E123C7E9C27...abcd",
      creator: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      created: "2024-01-15"
    },
    {
      id: 2,
      name: "Blue Chip Holdings",
      description: "Conservative investments in established cryptocurrencies",
      treasury: 89500,
      members: 8,
      proposals: 1,
      contractAddress: "0x951f29Bb7F3C2D891B5F8A27...efgh",
      creator: "0x951f29Bb...efgh", 
      created: "2024-02-03"
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
      address: "0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca",
      contribution: 25000,
      role: "Founder",
      votingPower: "22.1%",
      joinDate: "2024-01-15"
    },
    {
      address: "0x951f29Bb7F3C2D891B5F8A27...efgh", 
      contribution: 18500,
      role: "Treasurer",
      votingPower: "16.4%",
      joinDate: "2024-01-20"
    },
    {
      address: "0x123abc45...ijkl",
      contribution: 15000,
      role: "Member",
      votingPower: "13.3%",
      joinDate: "2024-01-25"
    }
  ]);

  // Mock wallet connection
  const connectWallet = async () => {
    setUserAccount("0xd67582D5C2c543F0a3FD8DF069bf308932cD86Ca");
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
          created: new Date().toISOString().split('T')[0]
        };
        setClubs([...clubs, newClub]);
        setShowCreateModal(false);
        setFormData({ name: '', description: '' });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Create Investment Club</h2>
          <div>
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
                type="button"
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
          <div>
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
                type="button"
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
          <div>
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
                type="button"
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
      </div>
    );
  };

  const vote = (proposalId, voteType) => {
    const voteWeight = 1000; // Mock vote weight
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

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Header Stats */}
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

      {/* Clubs Grid */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Investment Clubs</h2>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Create Club
        </button>
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

    return (
      <div className="space-y-6">
        {/* Club Header */}
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
              <p className="text-sm text-gray-500">Contract Address</p>
              <p className="text-sm font-mono text-blue-600">{selectedClub.contractAddress}</p>
            </div>
          </div>

          <div className="flex gap-3">
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
          </div>
        </div>

        {/* Proposals */}
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

        {/* Members */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Members</h2>
          <div className="space-y-3">
            {members.map((member, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    {member.role === 'Founder' ? <Crown className="w-4 h-4 text-blue-600" /> : 
                     member.role === 'Treasurer' ? <Coins className="w-4 h-4 text-green-600" /> : 
                     <User className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div>
                    <p className="font-medium">{member.address}</p>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${member.contribution.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{member.votingPower} voting power</p>
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
                onClick={() => {setActiveTab('dashboard'); setSelectedClub(null);}}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  activeTab === 'dashboard' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                }`}
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