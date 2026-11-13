/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Bell,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  Lock,
  Calendar,
  AlertCircle,
  FileText,
  CreditCard,
  Building2,
  Download,
  Eye,
  EyeOff,
  User,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Zap,
  X,
  Share2,
  RefreshCw,
  Award
} from 'lucide-react';

// Application Types
interface Application {
  id: string;
  ref: string;
  title: string;
  category: string;
  amount: number;
  status: 'pending' | 'action_required' | 'received' | 'rejected' | 'completed';
  statusLabel: string;
  date: string;
  step: string;
  stepNumber: number;
  totalSteps: number;
  details: string;
  notes?: string;
  canAppeal?: boolean;
}

export default function App() {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'apply' | 'tracker' | 'vault'>('dashboard');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [trackerFilter, setTrackerFilter] = useState<'received' | 'pending' | 'granted' | 'declined' | null>(null);

  // Financial Quota State
  const [capTotal] = useState(15000);
  const [capRemaining, setCapRemaining] = useState(12500);
  const [disbursedTotal, setDisbursedTotal] = useState(2500);

  // Vault State
  const [vaultTab, setVaultTab] = useState<'fps' | 'bank'>('fps');
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const [grantAuthorized, setGrantAuthorized] = useState(false);
  const [grantDispatched, setGrantDispatched] = useState(false);

  // Form State
  const [salutation, setSalutation] = useState<'Mr' | 'Ms'>('Ms');
  const [tel, setTel] = useState('+852 9123 4567');
  const [studyYear, setStudyYear] = useState('Year 3');
  const [specialism, setSpecialism] = useState('Media Design');
  const [gradProgramme, setGradProgramme] = useState('');
  const [compTitle, setCompTitle] = useState('Red Dot Award: Brands & Communication Design 2025');
  const [compUrl, setCompUrl] = useState('https://www.red-dot.org/brands-communication-design');
  const [category, setCategory] = useState('Digital Media / Interface & User Experience Design');
  const [recognitionLevel, setRecognitionLevel] = useState<'Local' | 'National' | 'International'>('International');
  const [announcementDate, setAnnouncementDate] = useState('2025-10-15');
  const [projectTitle, setProjectTitle] = useState('Sensory Oasis: Multimodal Adaptive Public Space');
  const [isGroup, setIsGroup] = useState(true);
  const [groupMembers, setGroupMembers] = useState('Marcus Leung (22081145D), Chloe Wong (22079934D)');
  const [isCoursework, setIsCoursework] = useState(true);
  const [courseSubject, setCourseSubject] = useState('SD3102 Advanced Interaction Studio');
  const [courseTutor, setCourseTutor] = useState('Dr. K. Wong');
  const [claimAmount, setClaimAmount] = useState('2400');
  const [claimCurrency, setClaimCurrency] = useState('HKD');
  const [includeShipping, setIncludeShipping] = useState(false);
  const [declareNoOtherSupport, setDeclareNoOtherSupport] = useState(true);
  const [declareTerms, setDeclareTerms] = useState(true);

  // Active Applications List
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 'app-1',
      ref: '#SUB-2025-0914',
      title: 'Red Dot Award: Brands & Communication 2025',
      category: 'Digital Media / Interface & UX • International Tier A',
      amount: 2400,
      status: 'pending',
      statusLabel: 'PENDING',
      date: '18 Feb 2025',
      step: 'Step 2: Marketing Review (Tutor Endorsed by Dr. K. Wong)',
      stepNumber: 2,
      totalSteps: 3,
      details: 'In Review: School of Design Marketing Committee. Review scheduled within 3 working days.'
    },
    {
      id: 'app-2',
      ref: '#SUB-2024-1190',
      title: 'iF Student Design Award 2025',
      category: 'Smart Mobility Presentation Model & Entry Fee',
      amount: 4800,
      status: 'action_required',
      statusLabel: 'ACTION NEEDED',
      date: '12 Feb 2025',
      step: 'Reimbursement Stage 3 of 4: Bank Vault Storage',
      stepNumber: 3,
      totalSteps: 4,
      details: 'Subsidy grant sanctioned by Dean\'s Office. Confirm payee name and FPS / Hang Seng account details to execute treasury wire.'
    },
    {
      id: 'app-3',
      ref: '#SUB-2025-1028',
      title: 'Core77 Design Awards 2025',
      category: 'Interaction Design • International Tier A',
      amount: 1850,
      status: 'received',
      statusLabel: 'RECEIVED',
      date: 'Today, 09:15 AM',
      step: 'Step 1: OCR Verification & Initial Intake',
      stepNumber: 1,
      totalSteps: 4,
      details: 'OCR Verification: Invoice & Proof of Payment Matched. Assigned to Project Tutor Dr. K. Wong for academic merit review.'
    },
    {
      id: 'app-4',
      ref: '#SUB-2024-0742',
      title: 'Local Creative Youth Media Exhibition',
      category: 'Non-endorsed Regional Exhibition',
      amount: 900,
      status: 'rejected',
      statusLabel: 'REJECTED',
      date: '15 Jan 2025',
      step: 'Evaluation Completed (Ineligible)',
      stepNumber: 0,
      totalSteps: 4,
      details: 'Contest not included in SD Endorsed List. Self-initiated creative showcases require formal departmental pre-approval prior to registration fee submission.',
      canAppeal: true
    }
  ]);

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Screen Switcher
  const navigateTo = (screen: 'dashboard' | 'apply' | 'tracker' | 'vault') => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Form Submission Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountVal = parseFloat(claimAmount) || 2400;

    if (!declareNoOtherSupport || !declareTerms) {
      showToast('Please check all declarations before submitting.');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      ref: `#SUB-2025-${Math.floor(1000 + Math.random() * 9000)}`,
      title: compTitle || 'Design Competition Application',
      category: `${category || 'Design Project'} • ${recognitionLevel} Tier A`,
      amount: amountVal,
      status: 'pending',
      statusLabel: 'PENDING',
      date: 'Just now',
      step: 'Step 1 of 3: Faculty Tutor Review',
      stepNumber: 1,
      totalSteps: 3,
      details: `Submitted by Rachel Tsang. Assigned to Tutor ${courseTutor || 'Dr. K. Wong'} for merit endorsement.`
    };

    setApplications([newApp, ...applications]);
    setCapRemaining(prev => Math.max(0, prev - amountVal));
    showToast(`Application submitted! Reference #${newApp.ref}. Remaining quota updated.`);
    
    setTimeout(() => {
      navigateTo('tracker');
    }, 700);
  };

  // Payout Authorization Handlers
  const handleAuthorizePayout = () => {
    setGrantAuthorized(true);
    showToast('Grant Payout Authorized! FPS wire of HK$4,800 queued for direct settlement.');
  };

  const handleSignAndDispatch = () => {
    setGrantDispatched(true);
    setDisbursedTotal(prev => prev + 4800);
    setApplications(prev =>
      prev.map(app =>
        app.id === 'app-2'
          ? {
              ...app,
              status: 'completed',
              statusLabel: 'DISPATCHED',
              step: 'Step 4 of 4: Direct Auto-Pay Settled',
              stepNumber: 4,
              details: 'Disbursed HK$ 4,800 to Hang Seng Bank (024-839-••••4892) via HKMA Fast Rails.'
            }
          : app
      )
    );
    showToast('Deed executed! HK$4,800 dispatched to Hang Seng Bank (024-839-••••4892).');
  };

  const specialismsList = [
    'Communication Design',
    'Environment Design',
    'Product Experience Design',
    'Service Design',
    'Advertising Design',
    'Information Design',
    'Media Design',
    'Interior Design',
    'Interaction Design',
    'Product Design',
    'Social Design'
  ];

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-start sm:py-6 selection:bg-[#7E1925]/20 selection:text-[#7E1925]">
      
      {/* Mobile Shell Frame */}
      <div className="relative w-full max-w-[430px] min-h-screen sm:min-h-[920px] bg-[#F7F9FC] sm:rounded-[36px] shadow-2xl flex flex-col overflow-hidden border border-slate-700/30">

        {/* TOP APP BAR */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-[#7E1925] rounded-xl p-0.5"
          >
            {/* PolyU School Logo */}
            <img
              src="/assets/aistudio/image_531f49fb.png"
              alt="PolyU Logo"
              className="w-7 h-7 object-contain shrink-0"
            />
            <div>
              <span className="block text-[15px] font-extrabold tracking-tight text-[#7E1925] leading-none">POLYU DESIGN</span>
              <span className="block text-[9px] font-bold tracking-widest text-slate-400 mt-0.5 uppercase">
                {currentScreen === 'dashboard' && 'SUBSIDY PORTAL'}
                {currentScreen === 'apply' && 'APPLICATION'}
                {currentScreen === 'tracker' && 'TRACKER'}
                {currentScreen === 'vault' && 'VAULT'}
              </span>
            </div>
          </button>

          <div className="flex items-center gap-2.5">
            {/* Standalone HTML File Link */}
            <a
              href="/standalone.html"
              target="_blank"
              rel="noopener noreferrer"
              title="Open or save raw single-file HTML prototype"
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-[#7E1925] transition focus:outline-none focus:ring-2 focus:ring-[#7E1925]"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => showToast('Action Required: iF Student Design Award grant ready in Vault!')}
              className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#7E1925]"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#7E1925] rounded-full ring-2 ring-white"></span>
            </button>

            {/* Rachel Tsang Avatar */}
            <button
              type="button"
              onClick={() => setProfileModalOpen(prev => !prev)}
              className={`relative rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7E1925] ${
                profileModalOpen ? 'ring-2 ring-[#7E1925] ring-offset-2' : ''
              }`}
              aria-label="Rachel Tsang Profile"
            >
              <img
                className="w-9 h-9 rounded-full object-cover ring-2 ring-[#7E1925]/20 shadow-xs"
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"
                alt="Rachel Tsang"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </button>
          </div>
        </header>

        {/* MAIN SCROLLABLE BODY */}
        <main className="flex-1 overflow-y-auto no-scrollbar pb-24">

          {/* ========================================================= */}
          {/* SCREEN 01: STUDENT DASHBOARD                             */}
          {/* ========================================================= */}
          {currentScreen === 'dashboard' && (
            <section className="space-y-4 p-4 animate-in fade-in duration-200">
              
              {/* Welcome Card & Quota Visual */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    AY 2024/25 • SEM 2
                  </span>
                  <button
                    type="button"
                    onClick={() => showToast('PolyU Academic Calendar Year 2024/25 Active')}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back, Rachel</h1>
                <p className="text-xs font-medium text-slate-500 mt-0.5">Year 3 • BA (Hons) in Interactive Media</p>

                {/* Quota Balance Visual */}
                <div className="mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Remaining Quota</span>
                    <div className="text-right flex items-baseline gap-1">
                      <span className="text-[28px] font-black text-[#7E1925] tracking-tight leading-none">${capRemaining.toLocaleString()}</span>
                      <span className="text-xs font-semibold text-slate-400">/ {capTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <div
                      className="h-full bg-[#7E1925] rounded-full transition-all duration-700"
                      style={{ width: `${(capRemaining / capTotal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium mt-1.5">Cap: HK$15,000</p>
                </div>

                {/* + START NEW APPLICATION BUTTON (Hides Dashboard, Reveals Application Form) */}
                <button
                  type="button"
                  onClick={() => navigateTo('apply')}
                  className="w-full mt-4 bg-[#7E1925] hover:bg-[#65131D] text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#7E1925]/25 transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#7E1925] focus:ring-offset-2"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                  <span className="tracking-wide text-sm font-extrabold uppercase">Start New Application</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mt-3 px-1">
                  <span>4-step digital workflow</span>
                  <button
                    type="button"
                    onClick={() => setPolicyModalOpen(true)}
                    className="text-[#7E1925] hover:underline flex items-center gap-0.5 font-semibold"
                  >
                    Learn more &rarr;
                  </button>
                </div>
              </div>

              {/* Endorsed Competitions Banner */}
              <div className="bg-gradient-to-r from-[#7E1925] to-[#9B1D2C] text-white rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[16px] font-black uppercase tracking-wider text-amber-200">Competitions & Awards</span>
                    <p className="text-[12px] font-bold leading-tight truncate">School of Design Endorsed Scheme</p>
                  </div>
                </div>
                <span className="shrink-0 whitespace-nowrap px-2.5 py-1 rounded-md bg-white/20 text-[10px] font-black uppercase tracking-wider leading-none">
                  TIER A
                </span>
              </div>

              {/* 4-Step Process Overview Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-extrabold uppercase tracking-wider text-slate-600">4-Step Subsidy Process</span>
                  <button
                    type="button"
                    onClick={() => setPolicyModalOpen(true)}
                    className="text-[11px] font-bold text-slate-400 hover:text-[#7E1925] flex items-center gap-0.5"
                  >
                    How It Works
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="space-y-1.5 flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#7E1925] text-white font-bold text-xs flex items-center justify-center shadow-sm">1</div>
                    <span className="text-[14px] font-semibold text-slate-700">Form</span>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#7E1925] text-white font-bold text-xs flex items-center justify-center shadow-sm">2</div>
                    <span className="text-[14px] font-semibold text-slate-700">Verify</span>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-[#7E1925] text-white font-bold text-xs flex items-center justify-center shadow-sm">3</div>
                    <span className="text-[14px] font-semibold text-slate-700">Vault</span>
                  </div>
                  <div className="space-y-1.5 flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-400 font-bold text-xs flex items-center justify-center">4</div>
                    <span className="text-[14px] font-medium text-slate-400">Reimburse</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#7E1925] shrink-0" />
                    <span>Standard review cycle: <strong>3–5 working days</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPolicyModalOpen(true)}
                    className="font-bold text-[#7E1925] hover:underline flex items-center gap-0.5"
                  >
                    Policy Guide ↗
                  </button>
                </div>
              </div>

              {/* Active Applications Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900 tracking-tight">Active Applications</h2>
                    <span className="w-5 h-5 rounded-full bg-[#7E1925]/10 text-[#7E1925] text-[11px] font-extrabold flex items-center justify-center">
                      2
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigateTo('tracker')}
                    className="text-xs font-bold text-[#7E1925] hover:underline uppercase tracking-wide"
                  >
                    View All ({applications.length})
                  </button>
                </div>

                {/* Card 1: iF Student Design Award (Action Required -> Vault) */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-50 text-amber-700 border border-amber-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 status-pulse"></span>
                      Action Required
                    </span>
                    <span className="text-[16px] font-bold text-[#7E1925] text-right font-mono">$4,800</span>
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug">iF Student Design Award 2025</h3>
                    <p className="text-[11px] text-slate-500">Presentation Mockups & Entry Fee</p>
                  </div>

                  <div className="bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3 flex gap-2.5 items-start">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-emerald-900 space-y-0.5 leading-relaxed">
                      <span className="font-bold block text-emerald-950">Application Endorsed & Approved</span>
                      <p className="text-slate-600">
                        Marketing team completed verification. Please verify bank account details in the Vault to release disbursement.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => navigateTo('vault')}
                      className="flex-1 bg-[#7E1925] hover:bg-[#65131D] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>ENTER VAULT DETAILS</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTo('tracker')}
                      className="px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold"
                      title="View details"
                    >
                      &rarr;
                    </button>
                  </div>
                </div>

                {/* Card 2: Red Dot Award (In Review) */}
                <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-700 border border-blue-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      In Review
                    </span>
                    <span className="text-[16px] font-bold text-slate-700 font-mono">$2,400</span>
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold text-slate-900 leading-snug">Red Dot Award: Brands &amp; Communication 2025</h3>
                    <p className="text-[11px] text-slate-500">International Category A Registration</p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-[#7E1925]">Step 2: Marketing Review</span>
                      <span className="text-slate-400">Stage 2 of 4</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-[#7E1925] w-2/4"></div>
                      <div className="h-full bg-slate-200 w-2/4"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      Faculty Endorsed by Dr. K. Wong
                    </span>
                    <button
                      type="button"
                      onClick={() => navigateTo('tracker')}
                      className="font-bold text-[#7E1925] hover:underline flex items-center gap-0.5"
                    >
                      Track &rarr;
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Management Hub */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-1">Quick Management</span>
                
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => navigateTo('vault')}
                    className="text-left bg-amber-50/60 hover:bg-amber-50 border border-amber-200/70 rounded-2xl p-3.5 transition active:scale-[0.98]"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 mb-2">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <h4 className="text-[16px] font-bold text-slate-900 leading-tight">Reimbursement Vault</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">Bank details, tax invoices & payout records</p>
                    <span className="text-[10px] font-bold text-amber-900 mt-2 block">View details &rarr;</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => navigateTo('tracker')}
                    className="text-left bg-slate-100/70 hover:bg-slate-100 border border-slate-200 rounded-2xl p-3.5 transition active:scale-[0.98]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-slate-700 shadow-xs">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{applications.length} items</span>
                    </div>
                    <h4 className="text-[16px] font-bold text-slate-900 leading-tight">Outbox & Archives</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">Endorsement trails & approved grant letters</p>
                    <span className="text-[10px] font-bold text-[#7E1925] mt-2 block">View details &rarr;</span>
                  </button>
                </div>
              </div>

              {/* Honorarium Program Widget */}
              <div className="bg-[#25201D] text-white rounded-[28px] p-6 space-y-4 shadow-xl border border-white/5">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-[#382E27] flex items-center justify-center text-[#D89047] shadow-inner shrink-0">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 4h-2V3a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1H5a2 2 0 0 0-2 2v2a5 5 0 0 0 4.18 4.93A6 6 0 0 0 11 15.82V18H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.18a6 6 0 0 0 3.82-1.89A5 5 0 0 0 21 8V6a2 2 0 0 0-2-2ZM5 8V6h2v4.78A3 3 0 0 1 5 8Zm14 0a3 3 0 0 1-2 2.78V6h2v2Zm-7 4a4 4 0 0 1-4-4V4h8v4a4 4 0 0 1-4 4Z" />
                      <path d="M12 6.5l.7 1.4 1.6.2-1.1 1.1.3 1.6-1.5-.8-1.5.8.3-1.6-1.1-1.1 1.6-.2z" />
                    </svg>
                  </div>
                  <div className="px-4 py-1.5 rounded-full border border-[#644833] bg-[#2C231D]/80">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D89047] block leading-none">
                      HONORARIUM PROGRAM
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-[17px] font-black tracking-tight text-white uppercase leading-snug">
                    WON A DESIGN AWARD RECENTLY?
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#D1C7BF] leading-relaxed font-normal">
                    Upload your official award certificate or jury results within 30 days of announcement to claim supplementary School of Design honorarium grants.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Honorarium upload portal will open once official competition results are published.')}
                  className="w-full bg-[#BA7837] hover:bg-[#A96A2C] text-white font-extrabold text-xs tracking-wider uppercase py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#BA7837]/20 transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#BA7837] focus:ring-offset-2 focus:ring-offset-[#25201D]"
                >
                  <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m0-12l-4 4m4-4l4 4" />
                  </svg>
                  <span className="text-[14px]">UPLOAD AWARD CERTIFICATE</span>
                </button>
              </div>

              {/* Campus Contact Footer */}
              <div className="text-center py-4 space-y-1 text-slate-400 text-[11px] border-t border-slate-200">
                <p className="font-bold tracking-wide uppercase text-slate-500">JOCKEY CLUB INNOVATION TOWER • V810</p>
                <p>
                  Enquiries:{' '}
                  <a href="mailto:sdsubsidy@polyu.edu.hk" className="text-[#7E1925] font-medium hover:underline">
                    sdsubsidy@polyu.edu.hk
                  </a>{' '}
                  • +852 2766 5454
                </p>
              </div>

            </section>
          )}


          {/* ========================================================= */}
          {/* SCREEN 02: APPLICATION FORM                              */}
          {/* ========================================================= */}
          {currentScreen === 'apply' && (
            <section className="p-4 space-y-4 animate-in fade-in duration-200">
              
              <button
                type="button"
                onClick={() => navigateTo('dashboard')}
                className="inline-flex items-center gap-1.5 text-[15px] font-bold text-[#7E1925] hover:underline"
              >
                &larr; BACK TO DASHBOARD
              </button>

              <div className="bg-[#7E1925] text-white rounded-3xl p-5 space-y-2.5 shadow-md">
                <div>
                  <span className="inline-block whitespace-nowrap text-[15px] font-bold tracking-wide text-rose-100 bg-white/10 px-3 py-1 rounded-full">
                    September 2025 – August 2026
                  </span>
                </div>
                <h1 className="text-[22px] font-black tracking-tight leading-tight">
                  Competition/Award Subsidy Scheme for PolyU Design Students
                </h1>
                <p className="text-[15px] text-rose-100 font-medium">APPLICATION FORM</p>
                <div className="inline-flex items-center gap-2 bg-[#65131D]/60 px-3.5 py-1.5 rounded-full text-[15px] font-bold text-rose-100">
                  <Zap className="w-4 h-4 text-amber-300 shrink-0" />
                  Remaining Cap: HK${capRemaining.toLocaleString()} / 15,000
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">

                {/* 01 Applicant's Information */}
                <fieldset className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <legend className="text-[18px] font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-[#7E1925]/10 text-[#7E1925] text-[15px] font-black flex items-center justify-center shrink-0">
                        01
                      </span>
                      Applicant's Information
                    </legend>
                    <span className="text-[15px] font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded shrink-0">
                      Required
                    </span>
                  </div>

                  {/* Salutation */}
                  <div className="space-y-1.5">
                    <label className="text-[15px] font-bold text-slate-600">Salutation *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSalutation('Mr')}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-[15px] font-normal font-sans transition ${
                          salutation === 'Mr'
                            ? 'border-2 border-[#7E1925] bg-[#7E1925]/5 text-[#7E1925]'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        Mr
                      </button>
                      <button
                        type="button"
                        onClick={() => setSalutation('Ms')}
                        className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-[15px] font-normal font-sans transition ${
                          salutation === 'Ms'
                            ? 'border-2 border-[#7E1925] bg-[#7E1925]/5 text-[#7E1925]'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        Ms
                      </button>
                    </div>
                  </div>

                  {/* Full Name */}
                  <div className="space-y-1">
                    <div className="flex flex-wrap justify-between items-center gap-1">
                      <label htmlFor="form-fullname" className="text-[15px] font-bold text-slate-600">
                        Full Name *
                      </label>
                      <span className="text-[15px] text-emerald-600 font-bold">Profile Auto-Filled</span>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        id="form-fullname"
                        value="Rachel Tsang"
                        readOnly
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800 pl-10 cursor-not-allowed"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Student ID */}
                  <div className="space-y-1">
                    <label htmlFor="form-student-id" className="text-[15px] font-bold text-slate-600">
                      Student ID *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="form-student-id"
                        value="22084912D"
                        readOnly
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800 pl-10"
                      />
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {/* Tel & Email */}
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label htmlFor="form-tel" className="text-[15px] font-bold text-slate-600">
                        Tel. No. *
                      </label>
                      <input
                        type="tel"
                        id="form-tel"
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800 focus:ring-2 focus:ring-[#7E1925] focus:border-[#7E1925]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="form-email" className="text-[15px] font-bold text-slate-600">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="form-email"
                        value="rachel.tsang@connect.polyu.hk"
                        readOnly
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Study Year */}
                  <div className="space-y-1.5">
                    <label className="text-[15px] font-bold text-slate-600">Study Year *</label>
                    <div className="grid grid-cols-3 gap-2 text-center text-[15px]">
                      {['Year 1', 'Year 2', 'Year 3', 'Year 4', '2025 grad'].map((yr) => (
                        <button
                          key={yr}
                          type="button"
                          onClick={() => setStudyYear(yr)}
                          className={`py-2 px-2 rounded-xl border text-[15px] font-normal font-sans transition ${
                            studyYear === yr
                              ? 'border-2 border-[#7E1925] bg-[#7E1925]/10 text-[#7E1925]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {yr}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Specialisms List */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[15px] font-bold text-slate-700 block">
                      BA(Hons) Scheme in Design Specialisms
                      <span className="block text-[15px] font-normal text-slate-500">Select Specialism</span>
                    </label>

                    <div className="space-y-1.5 max-h-60 overflow-y-auto no-scrollbar border border-slate-100 rounded-2xl p-2 bg-slate-50/50">
                      {specialismsList.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setSpecialism(item)}
                          className={`w-full text-left flex items-center gap-2.5 p-2.5 rounded-xl text-[15px] font-normal font-sans transition ${
                            specialism === item
                              ? 'bg-[#7E1925]/5 border-2 border-[#7E1925] text-[#7E1925]'
                              : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              specialism === item ? 'border-[#7E1925] bg-[#7E1925]' : 'border-slate-300'
                            }`}
                          >
                            {specialism === item && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                          </span>
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2025 Graduate Input */}
                  <div className="space-y-1 pt-1">
                    <label htmlFor="form-grad-prog" className="text-[15px] font-bold text-slate-500 block">
                      If 2025 Graduate: Programme Name (BA Only)
                    </label>
                    <input
                      type="text"
                      id="form-grad-prog"
                      value={gradProgramme}
                      onChange={(e) => setGradProgramme(e.target.value)}
                      placeholder="Leave blank if currently enrolled"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-[#7E1925]"
                    />
                  </div>
                </fieldset>

                {/* 02 Competition Information */}
                <fieldset className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <legend className="text-[18px] font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-[#7E1925]/10 text-[#7E1925] text-[15px] font-black flex items-center justify-center shrink-0">
                        02
                      </span>
                      Competition Information
                    </legend>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="form-comp-title" className="text-[15px] font-bold text-slate-600">
                      Title of Competition / Award *
                    </label>
                    <input
                      type="text"
                      id="form-comp-title"
                      value={compTitle}
                      onChange={(e) => setCompTitle(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800 focus:ring-2 focus:ring-[#7E1925]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="form-comp-url" className="text-[15px] font-bold text-slate-600">
                      Official URL *
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        id="form-comp-url"
                        value={compUrl}
                        onChange={(e) => setCompUrl(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800 pl-10 focus:ring-2 focus:ring-[#7E1925]"
                      />
                      <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap justify-between items-center gap-1">
                      <label htmlFor="form-category" className="text-[15px] font-bold text-slate-600">
                        Category
                      </label>
                      <span className="text-[15px] text-slate-400">(If any)</span>
                    </div>
                    <input
                      type="text"
                      id="form-category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[15px] font-bold text-slate-600">Recognition Level *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Local', 'National', 'International'] as const).map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setRecognitionLevel(lvl)}
                          className={`py-2 px-1 rounded-xl border text-[15px] font-normal font-sans transition ${
                            recognitionLevel === lvl
                              ? 'border-2 border-[#7E1925] bg-[#7E1925]/10 text-[#7E1925]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap justify-between items-center gap-1">
                      <label htmlFor="form-announcement-date" className="text-[15px] font-bold text-slate-600">
                        Result Announcement Date *
                      </label>
                      <span className="text-[15px] text-slate-400">(DD/MM/YYYY)</span>
                    </div>
                    <input
                      type="date"
                      id="form-announcement-date"
                      value={announcementDate}
                      onChange={(e) => setAnnouncementDate(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800 focus:ring-2 focus:ring-[#7E1925]"
                    />
                  </div>
                </fieldset>

                {/* 03 Project Details */}
                <fieldset className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <legend className="text-[18px] font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-[#7E1925]/10 text-[#7E1925] text-[15px] font-black flex items-center justify-center shrink-0">
                        03
                      </span>
                      Project Details
                    </legend>
                    <span className="text-[15px] font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded shrink-0">
                      Project Info
                    </span>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="form-project-title" className="text-[15px] font-bold text-slate-600">
                      Title of Project *
                    </label>
                    <input
                      type="text"
                      id="form-project-title"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      required
                      className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800"
                    />
                  </div>

                  {/* Group Project Toggle */}
                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-slate-600 block">Is it a Group Project? *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsGroup(false)}
                        className={`py-2 rounded-xl border text-[15px] font-normal font-sans transition ${
                          !isGroup
                            ? 'border-2 border-[#7E1925] bg-[#7E1925]/10 text-[#7E1925]'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsGroup(true)}
                        className={`py-2 rounded-xl border text-[15px] font-normal font-sans transition ${
                          isGroup
                            ? 'border-2 border-[#7E1925] bg-[#7E1925]/10 text-[#7E1925]'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        Yes
                      </button>
                    </div>

                    {isGroup && (
                      <div className="space-y-1 pt-1">
                        <label htmlFor="form-group-members" className="text-[15px] font-bold text-slate-500">
                          Other Group Member(s) from SD:
                        </label>
                        <textarea
                          id="form-group-members"
                          rows={2}
                          value={groupMembers}
                          onChange={(e) => setGroupMembers(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-[15px] font-normal font-sans text-slate-800"
                        />
                      </div>
                    )}
                  </div>

                  {/* Coursework Toggle */}
                  <div className="space-y-2">
                    <label className="text-[15px] font-bold text-slate-600 block">Is it a Coursework? *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCoursework(false)}
                        className={`py-2 rounded-xl border text-[15px] font-normal font-sans transition ${
                          !isCoursework
                            ? 'border-2 border-[#7E1925] bg-[#7E1925]/10 text-[#7E1925]'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCoursework(true)}
                        className={`py-2 rounded-xl border text-[15px] font-normal font-sans transition ${
                          isCoursework
                            ? 'border-2 border-[#7E1925] bg-[#7E1925]/10 text-[#7E1925]'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        Yes
                      </button>
                    </div>

                    {isCoursework && (
                      <div className="space-y-2 pt-1">
                        <div className="space-y-1">
                          <label htmlFor="form-subject" className="text-[15px] font-bold text-slate-500">
                            Subject:
                          </label>
                          <input
                            type="text"
                            id="form-subject"
                            value={courseSubject}
                            onChange={(e) => setCourseSubject(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="form-tutor" className="text-[15px] font-bold text-slate-500">
                            Tutor's Name:
                          </label>
                          <input
                            type="text"
                            id="form-tutor"
                            value={courseTutor}
                            onChange={(e) => setCourseTutor(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-[15px] font-normal font-sans text-slate-800"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Applying For Selection */}
                  <div className="space-y-2.5 pt-2 border-t border-slate-100">
                    <label className="text-[15px] font-bold text-slate-600 block">Applying For *</label>

                    <div className="p-3.5 bg-[#7E1925]/5 border-2 border-[#7E1925] rounded-2xl space-y-2.5">
                      <div className="flex items-center gap-2 text-[15px] font-normal font-sans text-[#7E1925]">
                        <CheckCircle2 className="w-4 h-4 text-[#7E1925] shrink-0" />
                        <span>Entrance fee's subsidy</span>
                      </div>
                      <div className="flex items-end gap-2 pl-5">
                        <div className="w-28">
                          <span className="block text-[15px] font-bold text-slate-500 mb-1">Currency</span>
                          <select
                            value={claimCurrency}
                            onChange={(e) => setClaimCurrency(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg text-[15px] font-normal font-sans p-2 text-slate-800"
                          >
                            <option>HKD</option>
                            <option>USD</option>
                            <option>EUR</option>
                          </select>
                        </div>
                        <div className="flex-1">
                          <span className="block text-[15px] font-bold text-slate-500 mb-1">Amount</span>
                          <div className="relative">
                            <span className="absolute left-3 top-2 text-[15px] font-normal font-sans text-slate-500">HK$</span>
                            <input
                              type="number"
                              value={claimAmount}
                              onChange={(e) => setClaimAmount(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-lg text-[15px] font-normal font-sans p-2 pl-12 text-slate-800 focus:ring-[#7E1925]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => setIncludeShipping(!includeShipping)}
                      className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 cursor-pointer hover:bg-slate-100/60 transition"
                    >
                      <label className="flex items-center gap-2 cursor-pointer text-[15px] font-normal font-sans text-slate-600">
                        <input
                          type="checkbox"
                          checked={includeShipping}
                          onChange={(e) => setIncludeShipping(e.target.checked)}
                          className="rounded text-[#7E1925] focus:ring-[#7E1925]"
                        />
                        <span>Shipping allowance</span>
                      </label>
                      <div className="flex items-center justify-between text-[15px] text-slate-500 pl-5">
                        <span>Estimate amount:</span>
                        <span className="font-sans font-normal text-[15px] text-slate-800">{includeShipping ? 'HK$ 450.00' : 'HK$ 0.00'}</span>
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* 04 Declarations & Undertakings */}
                <fieldset className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <legend className="text-[18px] font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-[#7E1925]/10 text-[#7E1925] text-[15px] font-black flex items-center justify-center shrink-0">
                        04
                      </span>
                      Declarations & Undertakings
                    </legend>
                    <ShieldCheck className="w-4 h-4 text-[#7E1925] shrink-0" />
                  </div>

                  <label className="flex items-start gap-2.5 text-[15px] text-slate-600 cursor-pointer leading-relaxed">
                    <input
                      type="checkbox"
                      checked={declareNoOtherSupport}
                      onChange={(e) => setDeclareNoOtherSupport(e.target.checked)}
                      required
                      className="mt-1 rounded text-[#7E1925] focus:ring-[#7E1925]"
                    />
                    <span>
                      I declare that this entry is <strong className="text-slate-900 underline">not</strong> supported by any other
                      financial scheme(s).
                    </span>
                  </label>

                  <label className="flex items-start gap-2.5 text-[15px] text-slate-600 cursor-pointer leading-relaxed">
                    <input
                      type="checkbox"
                      checked={declareTerms}
                      onChange={(e) => setDeclareTerms(e.target.checked)}
                      required
                      className="mt-1 rounded text-[#7E1925] focus:ring-[#7E1925]"
                    />
                    <span>
                      I confirm that this application complies with the terms and regulations of the Scheme document. I understand and
                      agree that should there be any violation of the terms the application or any approved amount shall be cancelled.
                    </span>
                  </label>

                  {/* Digital Signature Card */}
                  <div className="border border-slate-200 rounded-2xl p-3.5 bg-slate-50 space-y-2">
                    <div className="flex flex-wrap justify-between items-center gap-2 text-[15px] font-bold text-slate-500">
                      <span>Signature of Applicant *</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        Verified
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="font-sans text-[15px] font-normal text-slate-800">Rachel Tsang</span>
                      <span className="text-[15px] font-normal text-slate-500">Digitally Authenticated • 18 Feb 2025</span>
                    </div>
                  </div>

                  {/* Endorser Info */}
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex items-start justify-between gap-2 text-[15px]">
                    <div className="space-y-0.5">
                      <span className="block text-[15px] font-bold text-amber-800">
                        Signature of Endorser
                      </span>
                      <span className="font-sans text-[15px] font-normal text-slate-800 block">Assigned to: {courseTutor || 'Dr. K. Wong'}</span>
                      <p className="text-[15px] text-slate-500">Pending digital sign-off after submission</p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[15px] font-bold bg-amber-100 text-amber-800 shrink-0">PENDING</span>
                  </div>

                  <div className="flex justify-between items-center text-[15px] text-slate-500 pt-1">
                    <span className="text-slate-600">Date of Application</span>
                    <span className="font-sans font-normal text-[15px] text-slate-800">18/02/2025</span>
                  </div>
                </fieldset>

                {/* Submit Actions */}
                <div className="space-y-2.5 pt-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => showToast('Draft autosaved to your student profile (14s ago).')}
                      className="px-4 py-3 rounded-2xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-[15px] font-bold transition flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <Download className="w-4 h-4 text-slate-500" />
                      DRAFT
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#7E1925] hover:bg-[#65131D] text-white font-bold py-3 px-4 rounded-2xl text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#7E1925]/25 transition active:scale-[0.98]"
                    >
                      <span>SUBMIT APPLICATION</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[15px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Draft auto-saved 14s ago
                    </span>
                    <span>Review SLA: 3–5 Working Days</span>
                  </div>
                </div>
              </form>

            </section>
          )}


          {/* ========================================================= */}
          {/* SCREEN 03: TRACKER                                        */}
          {/* ========================================================= */}
          {currentScreen === 'tracker' && (
            <section className="p-4 space-y-4 animate-in fade-in duration-200">
              
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Track & Disburse</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-[#7E1925] border border-[#7E1925]/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7E1925]"></span>
                    AY 2024/25 Active
                  </span>
                </div>
                <h1 className="text-[20px] font-bold tracking-tight text-slate-900 leading-tight">
                  Application & Reimbursement Tracker
                </h1>
                <p className="text-xs text-slate-500">
                  Monitor real-time faculty approvals, marketing review steps, and direct bank disbursement status.
                </p>
              </div>

              {/* Remaining Cap Card */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-sm space-y-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Remaining Cap Balance</span>
                </div>
                <div>
                  <span className="text-2xl font-black text-[#7E1925] tracking-tight">$ {capRemaining.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7E1925] rounded-full transition-all duration-700"
                    style={{ width: `${(capRemaining / capTotal) * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 block pt-0.5">{applications.length} Total Filings</span>
              </div>

              {/* 4 Metric Cards Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setTrackerFilter(trackerFilter === 'received' ? null : 'received')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTrackerFilter(trackerFilter === 'received' ? null : 'received');
                    }
                  }}
                  className={`bg-white rounded-2xl p-3 shadow-xs flex items-center gap-2 cursor-pointer transition active:scale-[0.98] select-none ${
                    trackerFilter === 'received'
                      ? 'border-2 border-[#7E1925] bg-[#7E1925]/5'
                      : 'border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <span className="text-[16px] font-bold text-slate-900 leading-tight">Received</span>
                    <span className="text-[12px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 leading-none shrink-0">
                      {applications.filter(a => a.status === 'received').length}
                    </span>
                  </div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setTrackerFilter(trackerFilter === 'pending' ? null : 'pending')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTrackerFilter(trackerFilter === 'pending' ? null : 'pending');
                    }
                  }}
                  className={`bg-white rounded-2xl p-3 shadow-xs flex items-center gap-2 cursor-pointer transition active:scale-[0.98] select-none ${
                    trackerFilter === 'pending'
                      ? 'border-2 border-[#7E1925] bg-[#7E1925]/5'
                      : 'border border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <span className="text-[16px] font-bold text-slate-900 leading-tight">Pending</span>
                    <span className="text-[12px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 leading-none shrink-0">
                      {applications.filter(a => a.status === 'pending').length}
                    </span>
                  </div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setTrackerFilter(trackerFilter === 'granted' ? null : 'granted')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTrackerFilter(trackerFilter === 'granted' ? null : 'granted');
                    }
                  }}
                  className={`bg-white rounded-2xl p-3 shadow-xs flex items-center gap-2 cursor-pointer transition active:scale-[0.98] select-none ${
                    trackerFilter === 'granted'
                      ? 'border-2 border-[#7E1925] bg-[#7E1925]/5'
                      : 'border border-slate-200 hover:border-[#7E1925]/40'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#7E1925] flex items-center justify-center font-bold shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <span className="text-[16px] font-bold text-slate-900 leading-tight">Granted</span>
                    <span className="text-[12px] font-extrabold px-2 py-0.5 rounded-full bg-rose-50 text-[#7E1925] leading-none shrink-0">
                      {applications.filter(a => a.status === 'action_required' || a.status === 'completed').length}
                    </span>
                  </div>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setTrackerFilter(trackerFilter === 'declined' ? null : 'declined')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setTrackerFilter(trackerFilter === 'declined' ? null : 'declined');
                    }
                  }}
                  className={`bg-white rounded-2xl p-3 shadow-xs flex items-center gap-2 cursor-pointer transition active:scale-[0.98] select-none ${
                    trackerFilter === 'declined'
                      ? 'border-2 border-[#7E1925] bg-[#7E1925]/5'
                      : 'border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0 flex items-center justify-between gap-1.5">
                    <span className="text-[16px] font-bold text-slate-900 leading-tight">Declined</span>
                    <span className="text-[12px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 leading-none shrink-0">
                      {applications.filter(a => a.status === 'rejected').length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Applications List */}
              <div className="space-y-3 pt-1">
                {applications
                  .filter((app) => {
                    if (!trackerFilter) return true;
                    if (trackerFilter === 'received') return app.status === 'received';
                    if (trackerFilter === 'pending') return app.status === 'pending';
                    if (trackerFilter === 'granted') return app.status === 'action_required' || app.status === 'completed';
                    if (trackerFilter === 'declined') return app.status === 'rejected';
                    return true;
                  })
                  .map((app) => (
                  <div
                    key={app.id}
                    className={`bg-white rounded-3xl p-4 shadow-sm space-y-3 ${
                      app.status === 'action_required'
                        ? 'border-2 border-[#7E1925]/40'
                        : app.status === 'rejected'
                        ? 'border border-rose-200'
                        : app.status === 'completed'
                        ? 'border border-emerald-300 bg-emerald-50/20'
                        : 'border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          app.status === 'pending'
                            ? 'text-amber-800 bg-amber-50 border border-amber-200'
                            : app.status === 'action_required'
                            ? 'text-rose-800 bg-rose-50 border border-rose-200'
                            : app.status === 'rejected'
                            ? 'text-rose-700 bg-rose-50 border border-rose-200'
                            : app.status === 'completed'
                            ? 'text-emerald-800 bg-emerald-100 border border-emerald-300'
                            : 'text-slate-600 bg-slate-100'
                        }`}
                      >
                        {app.status === 'action_required' && <span className="w-1.5 h-1.5 rounded-full bg-[#7E1925] status-pulse"></span>}
                        {app.status === 'pending' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>}
                        {app.status === 'completed' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>}
                        {app.statusLabel}
                      </span>
                      <span
                        className={`text-xs font-mono ${
                          app.status === 'rejected'
                            ? 'font-bold text-slate-400 line-through'
                            : app.status === 'action_required'
                            ? 'font-black text-[#7E1925]'
                            : 'font-extrabold text-slate-800'
                        }`}
                      >
                        ${app.amount.toLocaleString()}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono">
                      {app.ref} • {app.date}
                    </div>

                    <div>
                      <h2
                        className={`font-bold text-slate-900 leading-tight ${
                          app.title === 'Core77 Design Awards 2025' ||
                          app.title === 'Local Creative Youth Media Exhibition' ||
                          app.title === 'iF Student Design Award 2025'
                            ? 'text-[19px]'
                            : app.title === 'Red Dot Award: Brands & Communication 2025'
                            ? 'text-[17px]'
                            : 'text-sm'
                        }`}
                      >
                        {app.title}
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">{app.category}</p>
                    </div>

                    {/* Pipeline Visual Container */}
                    <div className="bg-slate-50 rounded-2xl p-3 space-y-2 border border-slate-100">
                      <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="uppercase tracking-wider text-slate-400">Application Pipeline</span>
                        <span className="text-[#7E1925]">
                          {app.stepNumber > 0 ? `Step ${app.stepNumber} of ${app.totalSteps}` : 'Closed'}
                        </span>
                      </div>

                      {app.stepNumber > 0 && (
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden flex gap-1">
                          {Array.from({ length: app.totalSteps }).map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-full flex-1 rounded-full ${
                                idx < app.stepNumber
                                  ? app.status === 'completed'
                                    ? 'bg-emerald-600'
                                    : 'bg-[#7E1925]'
                                  : 'bg-slate-200'
                              }`}
                            ></div>
                          ))}
                        </div>
                      )}

                      <p className="text-[11px] text-slate-600 leading-snug">{app.details}</p>
                    </div>

                    {/* Action buttons per status */}
                    {app.status === 'action_required' && (
                      <button
                        type="button"
                        onClick={() => navigateTo('vault')}
                        className="w-full bg-[#7E1925] hover:bg-[#65131D] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition active:scale-[0.98]"
                      >
                        <Lock className="w-4 h-4" />
                        <span>ENTER BANK VAULT DETAILS</span>
                      </button>
                    )}

                    {app.status === 'received' && (
                      <button
                        type="button"
                        onClick={() => setInvoiceModalOpen(true)}
                        className="text-xs font-bold text-[#7E1925] hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Uploaded Invoice & OCR Receipt
                      </button>
                    )}

                    {app.status === 'rejected' && app.canAppeal && (
                      <button
                        type="button"
                        onClick={() => showToast('Appeal request filed. Tutor Dr. K. Wong notified for re-evaluation.')}
                        className="w-full py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition flex items-center justify-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                        REQUEST APPEAL
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Disbursement Timeline Card */}
              <div className="bg-slate-100 rounded-2xl p-3.5 space-y-1 text-xs text-slate-600 border border-slate-200">
                <div className="flex items-center justify-between font-bold text-slate-800">
                  <span className="flex items-center gap-1.5 text-[15px]">
                    <Clock className="w-4 h-4 text-[#7E1925]" />
                    Disbursement Timeline
                  </span>
                  <button
                    type="button"
                    onClick={() => setPolicyModalOpen(true)}
                    className="text-[#7E1925] text-[11px] font-bold hover:underline"
                  >
                    POLICY PDF ↗
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Direct bank auto-pay takes 3–5 working days after Finance Office account verification. For joint group claims, awards
                  are divided according to student contributor ratios submitted in Step 1.
                </p>
              </div>

            </section>
          )}


          {/* ========================================================= */}
          {/* SCREEN 04: REIMBURSEMENT VAULT                            */}
          {/* ========================================================= */}
          {currentScreen === 'vault' && (
            <section className="p-4 space-y-4 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1 text-[10px] font-bold text-emerald-800">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  SECURE VAULT • HKMA &amp; POLYU FO CERTIFIED
                </span>
                <span className="text-emerald-700 font-mono">256-BIT SSL</span>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-tight">Reimbursement Vault</h1>
                <p className="text-xs text-slate-500">
                  Manage recipient banking credentials, verify FPS linkages, and authorize sanctioned dean's office subsidy disbursements.
                </p>
              </div>

              {/* Sanctioned Grant Banner */}
              <div className="bg-[#7E1925] text-white rounded-3xl p-5 space-y-3 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-rose-200">Sanctioned Grant Ready</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-stone-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900 status-pulse"></span>
                    {grantAuthorized ? 'Authorized' : 'Action Required'}
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-black tracking-tight">$4,800</div>
                  <p className="text-xs text-rose-100 mt-1 font-medium leading-snug">
                    Awarded for <strong>iF Student Design Award 2025</strong>. Validated by Dean's Office; awaiting student bank authorization.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#962230] text-[11px] text-rose-100 font-medium">
                  <div>
                    <span className="block text-[10px] text-rose-300 uppercase">AY 2024/25 Disbursed</span>
                    <span className="font-bold font-mono text-white">${disbursedTotal.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-rose-300 uppercase">Remaining Cap</span>
                    <span className="font-bold font-mono text-white">${capRemaining.toLocaleString()}</span>{' '}
                    <span className="text-[10px] text-rose-300">/ 15,000</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAuthorizePayout}
                  className="w-full bg-white hover:bg-slate-50 text-[#7E1925] font-black py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition active:scale-[0.98]"
                >
                  <Zap className="w-4 h-4 text-amber-500 fill-current" />
                  <span>{grantAuthorized ? 'PAYOUT ALREADY AUTHORIZED ✓' : 'AUTHORIZE PAYOUT'}</span>
                </button>
              </div>

              {/* Payout Method Tabs (FPS vs Direct Wire) */}
              <div className="space-y-3">
                <div className="flex bg-slate-200/80 p-1 rounded-2xl text-xs font-bold">
                  <button
                    type="button"
                    onClick={() => setVaultTab('fps')}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
                      vaultTab === 'fps'
                        ? 'bg-[#7E1925] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-current" />
                    <span>FPS (Instant)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVaultTab('bank')}
                    className={`flex-1 py-2 rounded-xl flex items-center justify-center gap-1.5 transition ${
                      vaultTab === 'bank'
                        ? 'bg-[#7E1925] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Direct Bank Wire</span>
                  </button>
                </div>

                {/* TAB 1: FPS Credentials */}
                {vaultTab === 'fps' && (
                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#7E1925] flex items-center justify-center">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 leading-tight">Faster Payment System</h3>
                          <span className="text-[10px] text-slate-400">HKMA Fast Rails • Direct Settlement</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800">
                        DEFAULT
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3 space-y-2.5 text-xs border border-slate-100">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                        <span className="text-[11px] font-bold text-slate-500">Verified matching HKID</span>
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Rachel Tsang (TSANG R******)
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">Linked Mobile Identifier</span>
                        <span className="font-mono font-bold text-slate-800">+852 9123 ••••</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">FPS Institutional ID</span>
                        <span className="font-mono font-bold text-slate-800">10982341</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[11px]">Destination Clearing Bank</span>
                        <span className="font-semibold text-slate-800">Hang Seng Bank (024)</span>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[11px]">
                        <span className="text-slate-400">Estimated Release Cadence</span>
                        <span className="text-emerald-700 font-bold">Under 24 Hours</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast('Re-querying PolyU NetID FPS central directory... Synced!')}
                      className="w-full py-2.5 border border-[#7E1925]/30 bg-[#7E1925]/5 hover:bg-[#7E1925]/10 text-[#7E1925] text-xs font-bold rounded-xl transition"
                    >
                      RE-VERIFY POLYU FPS RECORD
                    </button>
                  </div>
                )}

                {/* TAB 2: Direct Bank Profile */}
                {vaultTab === 'bank' && (
                  <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3 animate-in fade-in duration-150">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 leading-tight">Bank Clearing Profile</h3>
                          <span className="text-[10px] text-slate-400">Secondary Route</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 leading-snug">
                      Used when total reimbursement sums exceed regular FPS fast-batch limits or for overseas design contest grants.
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Selected Clearing House</label>
                        <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800">
                          <option>Hang Seng Bank Ltd. (Bank Clearing Code: 024)</option>
                          <option>The Hongkong and Shanghai Banking Corporation (004)</option>
                          <option>Bank of China (Hong Kong) (012)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Branch Code</label>
                          <input
                            type="text"
                            defaultValue="839"
                            readOnly
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-semibold"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Currency Code</label>
                          <input
                            type="text"
                            value="HKD ($)"
                            readOnly
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[10px] font-bold text-slate-400 uppercase">Encrypted Account Number</label>
                          <button
                            type="button"
                            onClick={() => setShowAccountNumber(!showAccountNumber)}
                            className="text-[10px] font-bold text-[#7E1925] hover:underline flex items-center gap-1"
                          >
                            {showAccountNumber ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            {showAccountNumber ? 'Hide' : 'Show'}
                          </button>
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={showAccountNumber ? '024-839-489283-001' : '•••• •••• 4892'}
                            readOnly
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 pr-9"
                          />
                          <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Beneficiary Name (Locked)</label>
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center">
                          <span className="font-bold text-slate-800">Rachel Tsang</span>
                          <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            PolyU Record Matched
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Compliance Statement Proof</label>
                        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#7E1925]" />
                            <div>
                              <span className="font-semibold block text-slate-800 text-[11px]">HangSeng_Statement_Nov2024.pdf</span>
                              <span className="text-[10px] text-slate-400">1.4 MB • FO Cleared</span>
                            </div>
                          </div>
                          <span className="text-emerald-600 font-bold text-xs">✓</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => showToast('Secure bank upload requested. Check your PolyU student email.')}
                      className="w-full py-2.5 border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl transition"
                    >
                      UPDATE BANK CREDENTIALS
                    </button>
                  </div>
                )}
              </div>

              {/* Pending Grant Releases */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Pending Grant Releases</h3>
                  <span className="w-5 h-5 rounded-full bg-[#7E1925] text-white text-[10px] font-black flex items-center justify-center">
                    {grantDispatched ? '0' : '1'}
                  </span>
                </div>

                {!grantDispatched ? (
                  <div className="border border-slate-200 rounded-2xl p-3.5 space-y-3 bg-gradient-to-b from-white to-slate-50/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Dean Approval Cleared
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 block mt-1">REF #SUB-2024-1190</span>
                        <h4 className="text-[19px] font-bold text-slate-900 mt-0.5">iF Student Design Award 2025</h4>
                        <p className="text-[11px] text-slate-500">Category: Sustainable Architecture &amp; Prefab Design</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-[#7E1925] font-mono">HK$ 4,800</span>
                        <span className="block text-[9px] text-slate-400 font-semibold uppercase">Direct Grant</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                      <span className="flex items-center gap-1 font-semibold text-amber-700">
                        <Clock className="w-3.5 h-3.5" />
                        Awaiting Student Payout Consent
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">Step 4 of 4</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={handleSignAndDispatch}
                        className="flex-1 bg-[#7E1925] hover:bg-[#65131D] text-white font-extrabold py-3 px-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        SIGN &amp; DISPATCH HK$ 4,800
                      </button>
                      <button
                        type="button"
                        onClick={() => showToast('Grant Reference: #SUB-2024-1190. Endorsed by SD Finance.')}
                        className="p-3 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                    <span className="block text-xs font-bold text-emerald-900">All Pending Grants Dispatched</span>
                    <p className="text-[11px] text-emerald-700">HK$4,800 successfully settled to Rachel Tsang via FPS Rails.</p>
                  </div>
                )}
              </div>

              {/* Disbursement Archives */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Disbursement Archives</h3>
                  <span className="text-[10px] font-bold text-slate-400">AY 2023 – Present</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {grantDispatched && (
                    <div className="py-2.5 flex items-center justify-between text-xs animate-in fade-in">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-900 block text-xs">iF Student Design Award 2025</span>
                        <span className="text-[10px] text-slate-400">FPS Fast Rails • Just now</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-emerald-700 font-mono">HK$ 4,800</span>
                        <span className="text-[10px] font-extrabold text-emerald-700 block">SETTLED</span>
                      </div>
                    </div>
                  )}

                  <div className="py-2.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block text-xs">Red Dot Award: Design Concept</span>
                      <span className="text-[10px] text-slate-400">FPS Wire • 12 Nov 2024</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 font-mono">HK$ 2,500</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 block">COMPLETED</span>
                    </div>
                  </div>

                  <div className="py-2.5 flex items-center justify-between text-xs">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900 block text-xs">Core77 Design Entry (AY 23/24)</span>
                      <span className="text-[10px] text-slate-400">Hang Seng Wire • 18 May 2024</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900 font-mono">HK$ 1,200</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 block">COMPLETED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PolyU Finance Office Governance */}
              <div className="p-3.5 bg-slate-100 rounded-2xl border border-slate-200 text-[11px] text-slate-500 space-y-1">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-[#7E1925]" />
                  PolyU Finance Office (FO) Governance
                </span>
                <p className="leading-relaxed">
                  Vault communications adhere to 256-bit institutional encryption protocols under Hong Kong Monetary Authority
                  guidelines. Reimbursements are released strictly to the enrolled student beneficiary. Misrepresentation of bank
                  details constitutes a university honour code breach.
                </p>
              </div>

            </section>
          )}

        </main>


        {/* ========================================================= */}
        {/* SCREEN 05: PROFILE DRAWER / MODAL OVERLAY                 */}
        {/* ========================================================= */}
        {/* ========================================================= */}
        {/* SCREEN 05: PROFILE MENU (Dropdown below heading / avatar) */}
        {/* ========================================================= */}
        {profileModalOpen && (
          <div className="absolute inset-0 z-50 overflow-hidden pointer-events-auto">
            {/* Click-outside backdrop */}
            <div
              className="absolute inset-0 bg-slate-900/20 backdrop-blur-[1px] transition-opacity animate-in fade-in duration-150"
              onClick={() => setProfileModalOpen(false)}
            />

            {/* Profile Dropdown Menu Card positioned directly below header & profile avatar */}
            <div
              className="absolute top-[60px] right-3 left-3 sm:left-auto sm:w-[345px] bg-white rounded-3xl p-4.5 shadow-2xl space-y-3.5 border border-slate-200/90 z-10 animate-in fade-in slide-in-from-top-2 duration-150"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Pointer arrow pointing up to profile avatar */}
              <div className="absolute -top-1.5 right-4 w-3.5 h-3.5 bg-white rotate-45 border-l border-t border-slate-200/90" />

              <div className="flex items-start justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#7E1925]/20 shadow-sm"
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256"
                      alt="Rachel Tsang"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white">
                      ✓
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-extrabold text-slate-900">Rachel Tsang</h3>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-50 text-[#7E1925] border border-[#7E1925]/20">
                        Year 3
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-500">22084912D • Media Design</p>
                    <p className="text-[10px] text-slate-400">BA (Hons) Scheme in Design</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 bg-emerald-50 rounded-xl text-[11px] font-bold text-emerald-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Active Enrolment • Connected to PolyU ID
              </div>

              {/* Menu Navigation Items */}
              <div className="space-y-0.5 text-xs font-bold text-slate-700 divide-y divide-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setProfileModalOpen(false);
                    showToast('Profile: Rachel Tsang (22084912D) • Academic Mentor: Dr. K. Wong');
                  }}
                  className="w-full py-2.5 flex items-center justify-between hover:text-[#7E1925] transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Student Profile</span>
                  </div>
                  <span className="text-slate-400">&rarr;</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileModalOpen(false);
                    navigateTo('tracker');
                  }}
                  className="w-full py-2.5 flex items-center justify-between hover:text-[#7E1925] transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>Past Competitions</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#7E1925]/10 text-[#7E1925]">
                      {applications.length}
                    </span>
                    <span className="text-slate-400">&rarr;</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setProfileModalOpen(false);
                    navigateTo('vault');
                  }}
                  className="w-full py-2.5 flex items-center justify-between hover:text-[#7E1925] transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span>Settings &amp; Security</span>
                  </div>
                  <span className="text-slate-400">&rarr;</span>
                </button>

                <a
                  href="/standalone.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 flex items-center justify-between hover:text-[#7E1925] transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-slate-400" />
                    <span>Download Single-File HTML</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[10px]">.html &rarr;</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setProfileModalOpen(false);
                    showToast('Sign out simulated. PolyU NetID session closed.');
                  }}
                  className="w-full py-2.5 flex items-center justify-between text-rose-600 hover:text-rose-800 transition text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <X className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </div>
                  <span className="text-rose-400">&rarr;</span>
                </button>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1 font-semibold text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  PolyU NetID Authenticated
                </span>
                <span className="font-mono text-[9px]">v2.4.1</span>
              </div>
            </div>
          </div>
        )}


        {/* ========================================================= */}
        {/* POLICY GUIDE MODAL                                        */}
        {/* ========================================================= */}
        {policyModalOpen && (
          <div
            className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
            onClick={() => setPolicyModalOpen(false)}
          >
            <div
              className="bg-white w-full max-w-sm rounded-[32px] p-5 shadow-2xl space-y-3.5 border border-slate-200 max-h-[85vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#7E1925]/10 text-[#7E1925] flex items-center justify-center font-bold">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900">Subsidy Scheme Regulations</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPolicyModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-bold text-slate-900">1. Maximum Quota Cap</h4>
                  <p>Each enrolled BA (Hons) Design student is eligible for an annual maximum subsidy of HK$ 15,000 per academic year across endorsed design competitions.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">2. Eligible Expenses</h4>
                  <p>Subsidies apply to competition entry/submission fees and approved physical prototype shipping allowances for international Tier A &amp; Tier B juried contests.</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">3. Fast Rails Payout</h4>
                  <p>Once tutor and departmental committees grant endorsement, funds are disbursed directly to student beneficiary accounts via HKMA Faster Payment System (FPS).</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPolicyModalOpen(false)}
                className="w-full bg-[#7E1925] text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Close &amp; Understand
              </button>
            </div>
          </div>
        )}


        {/* ========================================================= */}
        {/* INVOICE & OCR MODAL                                       */}
        {/* ========================================================= */}
        {invoiceModalOpen && (
          <div
            className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
            onClick={() => setInvoiceModalOpen(false)}
          >
            <div
              className="bg-white w-full max-w-sm rounded-[32px] p-5 shadow-2xl space-y-3.5 border border-slate-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">OCR Receipt Verification</h3>
                  <span className="text-[10px] text-slate-400 font-mono">Invoice #C77-2025-99120</span>
                </div>
                <button
                  type="button"
                  onClick={() => setInvoiceModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Payee:</span>
                  <span className="font-semibold text-slate-800">Core77 Design Awards LLC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cardholder:</span>
                  <span className="font-semibold text-slate-800">Rachel Tsang</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verified Amount:</span>
                  <span className="font-mono font-bold text-[#7E1925]">HK$ 1,850.00</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200">
                  <span className="text-slate-500">AI OCR Confidence:</span>
                  <span className="text-emerald-700 font-bold">99.8% Matched</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setInvoiceModalOpen(false)}
                className="w-full bg-[#7E1925] text-white py-2.5 rounded-xl font-bold text-xs"
              >
                Close Receipt View
              </button>
            </div>
          </div>
        )}


        {/* ========================================================= */}
        {/* INTERACTIVE TOAST NOTIFICATION                            */}
        {/* ========================================================= */}
        {toastMessage && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-[380px] w-[90%] bg-slate-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="w-5 h-5 text-amber-400 shrink-0">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <p className="leading-snug">{toastMessage}</p>
          </div>
        )}


        {/* ========================================================= */}
        {/* FIXED BOTTOM TAB NAVIGATION BAR                           */}
        {/* ========================================================= */}
        <nav
          className="absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-2 flex items-center justify-around"
          aria-label="Bottom Bar Navigation"
        >
          {/* Tab 1: Home (Dashboard) */}
          <button
            type="button"
            onClick={() => navigateTo('dashboard')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition focus:outline-none ${
              currentScreen === 'dashboard' ? 'text-[#7E1925]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Home</span>
          </button>

          {/* Tab 2: Apply (Form) */}
          <button
            type="button"
            onClick={() => navigateTo('apply')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition focus:outline-none ${
              currentScreen === 'apply' ? 'text-[#7E1925]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Apply</span>
          </button>

          {/* Tab 3: Tracker */}
          <button
            type="button"
            onClick={() => navigateTo('tracker')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition focus:outline-none ${
              currentScreen === 'tracker' ? 'text-[#7E1925]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Tracker</span>
          </button>

          {/* Tab 4: Vault */}
          <button
            type="button"
            onClick={() => navigateTo('vault')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition focus:outline-none ${
              currentScreen === 'vault' ? 'text-[#7E1925]' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Vault</span>
          </button>
        </nav>

      </div>
    </div>
  );
}
