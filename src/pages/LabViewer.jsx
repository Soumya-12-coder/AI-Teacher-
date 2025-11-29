import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  Zap, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  PlayCircle, 
  Award, 
  MessageCircle, 
  Terminal,
  Code,
  Shield,
  Server,
  Database,
  Network,
  FileText,
  Download,
  Upload,
  Settings,
  Eye,
  Lock,
  Unlock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Lightbulb,
  Target,
  Cpu,
  HardDrive,
  Wifi
} from 'lucide-react'

const LabViewer = () => {
  const { labId } = useParams()
  const [lab, setLab] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [labCompleted, setLabCompleted] = useState(false)
  const [labEnvironment, setLabEnvironment] = useState('loading')
  const [terminalOutput, setTerminalOutput] = useState([])
  const [currentCommand, setCurrentCommand] = useState('')
  const [showHints, setShowHints] = useState(false)
  const [labTimer, setLabTimer] = useState(0)
  const [isLabRunning, setIsLabRunning] = useState(false)

  useEffect(() => {
    // Mock lab data - in real app, this would come from API
    const mockLab = {
      id: parseInt(labId),
      title: 'Network Security Penetration Testing',
      description: 'Learn hands-on penetration testing techniques using industry-standard tools to identify network vulnerabilities.',
      category: 'Cybersecurity',
      difficulty: 'Advanced',
      duration: '2 hours',
      instructor: 'Alex Chen',
      rating: 4.9,
      students: 892,
      tools: ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite', 'John the Ripper'],
      environment: 'Virtual Network Lab',
      objectives: [
        'Perform network reconnaissance using Nmap',
        'Analyze network traffic with Wireshark',
        'Identify common vulnerabilities',
        'Execute controlled penetration tests',
        'Generate professional security reports'
      ],
      steps: [
        {
          id: 1,
          title: 'Environment Setup',
          description: 'Initialize the virtual network laboratory environment and verify all tools are functional.',
          duration: '10 min',
          type: 'setup',
          instructions: [
            'Launch the virtual network environment',
            'Verify network connectivity to target systems',
            'Test all penetration testing tools',
            'Configure logging and monitoring'
          ],
          commands: [
            'sudo systemctl start networking',
            'nmap --version',
            'wireshark --version',
            'msfconsole --version'
          ],
          hints: [
            'Make sure all network interfaces are up',
            'Check firewall settings if tools fail to start',
            'Verify you have proper permissions for network tools'
          ],
          expectedOutput: 'All tools initialized successfully'
        },
        {
          id: 2,
          title: 'Network Discovery',
          description: 'Use Nmap to discover live hosts and open ports on the target network.',
          duration: '20 min',
          type: 'reconnaissance',
          instructions: [
            'Perform a ping sweep to identify live hosts',
            'Conduct port scanning on discovered hosts',
            'Identify running services and versions',
            'Document all findings'
          ],
          commands: [
            'nmap -sn 192.168.1.0/24',
            'nmap -sS -O 192.168.1.100',
            'nmap -sV -A 192.168.1.100',
            'nmap --script vuln 192.168.1.100'
          ],
          hints: [
            'Start with a broad scan then narrow down',
            'Use different scan types for comprehensive results',
            'Save scan results for later analysis'
          ],
          expectedOutput: 'Network map with identified hosts and services'
        },
        {
          id: 3,
          title: 'Traffic Analysis',
          description: 'Capture and analyze network traffic using Wireshark to identify potential security issues.',
          duration: '25 min',
          type: 'analysis',
          instructions: [
            'Start packet capture on the network interface',
            'Generate various types of network traffic',
            'Apply filters to focus on specific protocols',
            'Analyze suspicious traffic patterns'
          ],
          commands: [
            'sudo wireshark -i eth0',
            'tcpdump -i eth0 -w capture.pcap',
            'tshark -r capture.pcap -Y "tcp.port == 80"',
            'tshark -r capture.pcap -Y "dns"'
          ],
          hints: [
            'Use display filters to reduce noise',
            'Look for unencrypted credentials',
            'Monitor for unusual traffic patterns'
          ],
          expectedOutput: 'Captured packets with security analysis'
        },
        {
          id: 4,
          title: 'Vulnerability Assessment',
          description: 'Identify and verify security vulnerabilities using automated tools and manual techniques.',
          duration: '30 min',
          type: 'assessment',
          instructions: [
            'Run vulnerability scanners against target systems',
            'Manually verify discovered vulnerabilities',
            'Test for common web application flaws',
            'Document all confirmed vulnerabilities'
          ],
          commands: [
            'nessus -T html -x scan_results.html',
            'nikto -h http://192.168.1.100',
            'sqlmap -u "http://192.168.1.100/login.php"',
            'dirb http://192.168.1.100/'
          ],
          hints: [
            'Cross-reference results from multiple tools',
            'Verify false positives manually',
            'Focus on high-risk vulnerabilities first'
          ],
          expectedOutput: 'Comprehensive vulnerability report'
        },
        {
          id: 5,
          title: 'Exploitation',
          description: 'Safely exploit identified vulnerabilities using Metasploit framework.',
          duration: '35 min',
          type: 'exploitation',
          instructions: [
            'Launch Metasploit framework',
            'Search for relevant exploits',
            'Configure exploit parameters',
            'Execute controlled exploitation'
          ],
          commands: [
            'msfconsole',
            'search ms17-010',
            'use exploit/windows/smb/ms17_010_eternalblue',
            'set RHOSTS 192.168.1.100',
            'exploit'
          ],
          hints: [
            'Always test in a controlled environment',
            'Document all exploitation attempts',
            'Have a rollback plan ready'
          ],
          expectedOutput: 'Successful controlled exploitation'
        },
        {
          id: 6,
          title: 'Report Generation',
          description: 'Create a comprehensive penetration testing report with findings and recommendations.',
          duration: '20 min',
          type: 'documentation',
          instructions: [
            'Compile all findings and evidence',
            'Categorize vulnerabilities by severity',
            'Provide remediation recommendations',
            'Create executive summary'
          ],
          commands: [
            'cat findings.txt | sort | uniq > final_report.txt',
            'generatereport --input findings.txt --output report.pdf',
            'zip -r evidence.zip screenshots/ logs/ pcaps/',
            'openssl dgst -sha256 report.pdf'
          ],
          hints: [
            'Include screenshots and evidence',
            'Use industry standard severity ratings',
            'Provide actionable recommendations'
          ],
          expectedOutput: 'Professional penetration testing report'
        }
      ]
    }
    
    setLab(mockLab)
    setLabEnvironment('ready')
  }, [labId])

  useEffect(() => {
    let interval = null
    if (isLabRunning) {
      interval = setInterval(() => {
        setLabTimer(timer => timer + 1)
      }, 1000)
    } else if (!isLabRunning && labTimer !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isLabRunning, labTimer])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStepComplete = (stepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
    
    if (currentStep < lab.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setLabCompleted(true)
      setIsLabRunning(false)
    }
  }

  const handleCommandSubmit = (e) => {
    e.preventDefault()
    if (currentCommand.trim()) {
      const newOutput = {
        id: Date.now(),
        command: currentCommand,
        output: `$ ${currentCommand}\n${generateMockOutput(currentCommand)}`,
        timestamp: new Date().toLocaleTimeString()
      }
      setTerminalOutput([...terminalOutput, newOutput])
      setCurrentCommand('')
    }
  }

  const generateMockOutput = (command) => {
    if (command.includes('nmap')) {
      return `Starting Nmap scan...
Host is up (0.00050s latency).
PORT     STATE    SERVICE
22/tcp   open     ssh
80/tcp   open     http
443/tcp  open     https
3306/tcp open     mysql
Nmap done: 1 IP address (1 host up) scanned in 2.45 seconds`
    } else if (command.includes('wireshark')) {
      return `Wireshark started successfully
Capturing on interface eth0...
Packets captured: 1247`
    } else if (command.includes('msfconsole')) {
      return `
       =[ metasploit v6.3.4-dev                          ]
+ -- --=[ 2294 exploits - 1201 auxiliary - 409 post       ]
+ -- --=[ 951 payloads - 45 encoders - 11 nops            ]
+ -- --=[ 9 evasion                                       ]

msf6 > `
    } else {
      return `Command executed successfully
Output: ${command} completed`
    }
  }

  const startLab = () => {
    setIsLabRunning(true)
    setLabEnvironment('running')
  }

  const resetLab = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    setLabCompleted(false)
    setTerminalOutput([])
    setLabTimer(0)
    setIsLabRunning(false)
    setLabEnvironment('ready')
  }

  const getStepIcon = (type) => {
    switch (type) {
      case 'setup': return Settings
      case 'reconnaissance': return Eye
      case 'analysis': return Database
      case 'assessment': return Shield
      case 'exploitation': return Zap
      case 'documentation': return FileText
      default: return Code
    }
  }

  const getStepColor = (type) => {
    switch (type) {
      case 'setup': return 'from-blue-500 to-cyan-500'
      case 'reconnaissance': return 'from-green-500 to-blue-500'
      case 'analysis': return 'from-purple-500 to-pink-500'
      case 'assessment': return 'from-orange-500 to-red-500'
      case 'exploitation': return 'from-red-500 to-pink-500'
      case 'documentation': return 'from-gray-500 to-blue-500'
      default: return 'from-blue-500 to-purple-500'
    }
  }

  if (!lab) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="animate-slide-in">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 mb-8 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
        
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Link
              to="/labs"
              className="p-3 bg-gray-100 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg group/btn"
            >
              <ArrowLeft className="w-5 h-5 group-hover/btn:scale-125 transition-transform duration-300" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">{lab.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span className="flex items-center group-hover:text-blue-500 transition-colors duration-300">
                  <Clock className="w-4 h-4 mr-1" />
                  {lab.duration}
                </span>
                <span className="flex items-center group-hover:text-purple-500 transition-colors duration-300">
                  <Users className="w-4 h-4 mr-1" />
                  {lab.students} students
                </span>
                <span className="flex items-center group-hover:text-yellow-500 transition-colors duration-300">
                  <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                  {lab.rating}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 group-hover:bg-clip-text transition-all duration-300">{formatTime(labTimer)}</div>
              <div className="text-sm text-gray-600 group-hover:text-green-500 transition-colors duration-300">Lab Time</div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              labEnvironment === 'ready' ? 'bg-green-100 text-green-800' :
              labEnvironment === 'running' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {labEnvironment === 'ready' ? '🟢 Ready' : 
               labEnvironment === 'running' ? '🔵 Running' : '⚪ Loading'}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Lab Environment */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <h2 className="text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">🖥️ Virtual Lab Environment</h2>
              <div className="flex space-x-2">
                {!isLabRunning ? (
                  <button
                    onClick={startLab}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center group/btn"
                  >
                    <PlayCircle className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                    Start Lab
                  </button>
                ) : (
                  <button
                    onClick={resetLab}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center group/btn"
                  >
                    <RotateCcw className="w-4 h-4 mr-2 group-hover/btn:animate-spin" />
                    Reset Lab
                  </button>
                )}
              </div>
            </div>
            
            {/* Terminal */}
            <div className="bg-black rounded-2xl p-4 relative z-10 group-hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">Terminal - {lab.environment}</span>
              </div>
              
              <div className="text-green-400 font-mono text-sm max-h-64 overflow-y-auto space-y-2">
                {terminalOutput.map((output) => (
                  <div key={output.id} className="whitespace-pre-wrap">
                    {output.output}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleCommandSubmit} className="mt-4">
                <div className="flex items-center">
                  <span className="text-green-400 font-mono mr-2">$</span>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    placeholder="Enter command..."
                    className="flex-1 bg-transparent text-green-400 font-mono focus:outline-none"
                    disabled={!isLabRunning}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Current Step */}
          {lab.steps && lab.steps[currentStep] && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
              {/* Floating particles */}
              <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
              
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {React.createElement(getStepIcon(lab.steps[currentStep].type), { 
                      className: `w-6 h-6 text-white group-hover:scale-125 group-hover:rotate-12 transition-all duration-300`,
                      style: { filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))' }
                    })}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                        Step {currentStep + 1}: {lab.steps[currentStep].title}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-purple-500 transition-colors duration-300">
                        {lab.steps[currentStep].duration} • {lab.steps[currentStep].type}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:shadow-lg group/btn"
                    >
                      <Lightbulb className="w-4 h-4 group-hover/btn:animate-pulse" />
                    </button>
                    <button
                      onClick={() => handleStepComplete(lab.steps[currentStep].id)}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center group/btn"
                    >
                      <CheckCircle className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                      Complete Step
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{lab.steps[currentStep].description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">📋 Instructions</h4>
                    <ul className="space-y-2">
                      {lab.steps[currentStep].instructions.map((instruction, index) => (
                        <li key={index} className="flex items-start group-hover:text-gray-700 transition-colors duration-300">
                          <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></span>
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">💻 Commands</h4>
                    <div className="bg-gray-900 rounded-lg p-4 space-y-2">
                      {lab.steps[currentStep].commands.map((command, index) => (
                        <div key={index} className="font-mono text-sm text-green-400 hover:text-green-300 transition-colors duration-300">
                          $ {command}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {showHints && (
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200 group-hover:bg-yellow-100 transition-colors duration-300">
                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      💡 Hints
                    </h4>
                    <ul className="space-y-1">
                      {lab.steps[currentStep].hints.map((hint, index) => (
                        <li key={index} className="text-yellow-700 text-sm">• {hint}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Lab Progress */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">🎯 Lab Progress</h3>
              <div className="space-y-3">
                {lab.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      completedSteps.includes(step.id) ? 'bg-green-500 text-white' :
                      index === currentStep ? 'bg-blue-500 text-white' :
                      'bg-gray-200 text-gray-600'
                    }`}>
                      {completedSteps.includes(step.id) ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <span className="text-xs font-bold">{index + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm transition-colors duration-300 ${
                      completedSteps.includes(step.id) ? 'text-green-600' :
                      index === currentStep ? 'text-blue-600 font-semibold' :
                      'text-gray-600'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-blue-50/30 to-yellow-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300">🛠️ Lab Tools</h3>
              <div className="space-y-2">
                {lab.tools.map((tool, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg group-hover:bg-gradient-to-r group-hover:from-green-50 group-hover:to-blue-50 transition-all duration-300 hover:scale-105">
                    <Terminal className="w-5 h-5 text-gray-600 group-hover:text-green-500 transition-colors duration-300" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors duration-300">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden group">
            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-float"></div>
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-blue-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-shimmer"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">🎯 Learning Objectives</h3>
              <ul className="space-y-2">
                {lab.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    <Target className="w-4 h-4 mr-2 mt-0.5 text-purple-500 group-hover:text-purple-600 transition-colors duration-300 flex-shrink-0" />
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Modal */}
      {labCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Lab Completed! 🎉</h3>
              <p className="text-gray-600 mb-4">
                Congratulations! You've successfully completed the {lab.title} lab.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Total Time: {formatTime(labTimer)}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={resetLab}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Restart Lab
                </button>
                <Link
                  to="/labs"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                >
                  Back to Labs
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LabViewer