import { useState, useRef, useEffect } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// ─── Types ───────────────────────────────────────────────────────────────────
type Page =
  | "login"
  | "dashboard"
  | "volunteers"
  | "volunteer-profile"
  | "events"
  | "event-details"
  | "create-event"
  | "assignments"
  | "hours"
  | "reports"
  | "settings"
  | "add-volunteer";

// ─── Sample Data ─────────────────────────────────────────────────────────────
const volunteers = [
  { id: 1, name: "Sarah Mitchell", email: "sarah.m@email.com", phone: "+1 555-0101", skills: ["Event Coord.", "Leadership"], availability: "Weekends", role: "Event Coordinator", status: "Active", hours: 48, avatar: "SM" },
  { id: 2, name: "James Okonkwo", email: "james.o@email.com", phone: "+1 555-0102", skills: ["Photography", "Social Media"], availability: "Afternoons", role: "Photographer", status: "Assigned", hours: 32, avatar: "JO" },
  { id: 3, name: "Priya Sharma", email: "priya.s@email.com", phone: "+1 555-0103", skills: ["Graphic Design", "Content Writing"], availability: "Weekdays", role: "Graphic Designer", status: "Available", hours: 21, avatar: "PS" },
  { id: 4, name: "Marcus Lee", email: "marcus.l@email.com", phone: "+1 555-0104", skills: ["Registration", "Admin"], availability: "Mornings", role: "Registration Desk", status: "Active", hours: 57, avatar: "ML" },
  { id: 5, name: "Aisha Nwosu", email: "aisha.n@email.com", phone: "+1 555-0105", skills: ["Social Media", "Content Writing"], availability: "Evenings", role: "Social Media", status: "Available", hours: 14, avatar: "AN" },
  { id: 6, name: "Daniel Torres", email: "daniel.t@email.com", phone: "+1 555-0106", skills: ["General", "Logistics"], availability: "Weekends", role: "General Volunteer", status: "Completed", hours: 24, avatar: "DT" },
  { id: 7, name: "Elena Vasquez", email: "elena.v@email.com", phone: "+1 555-0107", skills: ["Photography", "Graphic Design"], availability: "Afternoons", role: "Photographer", status: "Assigned", hours: 39, avatar: "EV" },
  { id: 8, name: "Kwame Asante", email: "kwame.a@email.com", phone: "+1 555-0108", skills: ["Event Coord.", "Admin"], availability: "Weekdays", role: "Event Coordinator", status: "Active", hours: 61, avatar: "KA" },
];

const events = [
  { id: 1, name: "Youth Leadership Workshop", date: "2026-09-28", location: "Community Center, Hall A", required: 12, assigned: 9, status: "Upcoming", organizer: "Dr. Amara Cole" },
  { id: 2, name: "Annual Food Drive", date: "2026-10-05", location: "Downtown Plaza", required: 20, assigned: 18, status: "Upcoming", organizer: "Lisa Park" },
  { id: 3, name: "Tech Skills Bootcamp", date: "2026-09-20", location: "University Lab 3", required: 6, assigned: 6, status: "Ongoing", organizer: "Prof. Ben Ahmad" },
  { id: 4, name: "Clean City Campaign", date: "2026-08-15", location: "Riverside Park", required: 25, assigned: 25, status: "Completed", organizer: "Mark Davis" },
  { id: 5, name: "Senior Citizens Day", date: "2026-10-12", location: "Sunrise Retirement Home", required: 8, assigned: 4, status: "Upcoming", organizer: "Nurse Helen" },
  { id: 6, name: "Youth Sports Day", date: "2026-07-20", location: "City Stadium", required: 15, assigned: 15, status: "Completed", organizer: "Coach Tunde" },
];

const assignments = [
  { id: 1, volunteer: "Sarah Mitchell", event: "Youth Leadership Workshop", role: "Event Coordinator", date: "2026-09-28", expectedHours: 8, actualHours: 0, status: "Assigned" },
  { id: 2, volunteer: "James Okonkwo", event: "Tech Skills Bootcamp", role: "Photographer", date: "2026-09-20", expectedHours: 6, actualHours: 4, status: "In Progress" },
  { id: 3, volunteer: "Marcus Lee", event: "Annual Food Drive", role: "Registration Desk", date: "2026-10-05", expectedHours: 10, actualHours: 0, status: "Assigned" },
  { id: 4, volunteer: "Priya Sharma", event: "Youth Leadership Workshop", role: "Graphic Designer", date: "2026-09-28", expectedHours: 5, actualHours: 0, status: "Assigned" },
  { id: 5, volunteer: "Kwame Asante", event: "Annual Food Drive", role: "Event Coordinator", date: "2026-10-05", expectedHours: 10, actualHours: 0, status: "Assigned" },
  { id: 6, volunteer: "Elena Vasquez", event: "Clean City Campaign", role: "Photographer", date: "2026-08-15", expectedHours: 6, actualHours: 6, status: "Completed" },
  { id: 7, volunteer: "Daniel Torres", event: "Youth Sports Day", role: "General Volunteer", date: "2026-07-20", expectedHours: 8, actualHours: 8, status: "Completed" },
];

const hoursData = [
  { id: 1, volunteer: "Sarah Mitchell", event: "Clean City Campaign", date: "2026-08-15", role: "Event Coordinator", hours: 8, status: "Verified" },
  { id: 2, volunteer: "Marcus Lee", event: "Youth Sports Day", date: "2026-07-20", role: "Registration Desk", hours: 7, status: "Verified" },
  { id: 3, volunteer: "James Okonkwo", event: "Tech Skills Bootcamp", date: "2026-09-20", role: "Photographer", hours: 4, status: "Pending" },
  { id: 4, volunteer: "Kwame Asante", event: "Clean City Campaign", date: "2026-08-15", role: "Event Coordinator", hours: 8, status: "Verified" },
  { id: 5, volunteer: "Elena Vasquez", event: "Clean City Campaign", date: "2026-08-15", role: "Photographer", hours: 6, status: "Verified" },
  { id: 6, volunteer: "Priya Sharma", event: "Youth Sports Day", date: "2026-07-20", role: "Graphic Designer", hours: 5, status: "Pending" },
];

const activityData = [
  { month: "Apr", hours: 84 },
  { month: "May", hours: 112 },
  { month: "Jun", hours: 96 },
  { month: "Jul", hours: 143 },
  { month: "Aug", hours: 128 },
  { month: "Sep", hours: 186 },
];

const recentActivity = [
  { type: "register", text: "Aisha Nwosu registered as a volunteer", time: "2 hours ago", icon: "👤" },
  { type: "assign", text: "Sarah Mitchell assigned to Youth Leadership Workshop", time: "4 hours ago", icon: "📋" },
  { type: "complete", text: "Daniel Torres completed Youth Sports Day assignment", time: "1 day ago", icon: "✅" },
  { type: "hours", text: "6 volunteer hours submitted by Elena Vasquez", time: "2 days ago", icon: "⏱" },
  { type: "register", text: "Kwame Asante registered as a volunteer", time: "3 days ago", icon: "👤" },
];

const notifications = [
  { id: 1, text: "New volunteer registered: Aisha Nwosu", time: "2h ago", read: false },
  { id: 2, text: "James has been assigned to Tech Skills Bootcamp", time: "4h ago", read: false },
  { id: 3, text: "Volunteer hours submitted for verification", time: "1d ago", read: false },
  { id: 4, text: "Annual Food Drive registration is almost full", time: "2d ago", read: true },
  { id: 5, text: "Youth Leadership Workshop starts in 12 days", time: "2d ago", read: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function statusColor(status: string) {
  const map: Record<string, string> = {
    Active: "background:#d7f0dc; color:#00a32a;",
    Available: "background:#e8f0fa; color:#2271b1;",
    Assigned: "background:#fef9ec; color:#996800;",
    Completed: "background:#f0f0f1; color:#646970;",
    Upcoming: "background:#e8f0fa; color:#2271b1;",
    Ongoing: "background:#d7f0dc; color:#00a32a;",
    Cancelled: "background:#fce8e8; color:#d63638;",
    "In Progress": "background:#d7f0dc; color:#00a32a;",
    Verified: "background:#d7f0dc; color:#00a32a;",
    Pending: "background:#fef9ec; color:#996800;",
  };
  return map[status] || "background:#f0f0f1; color:#646970;";
}

function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2);
  const colors = ["#2271b1", "#00a32a", "#996800", "#8c5faf", "#e05d20", "#1da1f2"];
  const color = colors[name.charCodeAt(0) % colors.length];
  return (
    <div
      style={{ width: size, height: size, background: color, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: size * 0.38, fontWeight: 600, flexShrink: 0 }}
    >
      {initials}
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function VolunTrackLogo({ dark = false, iconOnly = false }: { dark?: boolean; iconOnly?: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="14" r="14" fill="#2271b1" />
        <circle cx="14" cy="9" r="4" fill="white" />
        <path d="M7 22c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M10 16l3 3 5-5" stroke="#86c7f3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {!iconOnly && (
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, color: dark ? "#1d2327" : "#ffffff", letterSpacing: "-0.02em" }}>
          Volun<span style={{ color: "#2271b1", filter: dark ? "none" : "brightness(1.6)" }}>Track</span>
        </span>
      )}
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "volunteers", label: "Volunteers", icon: "👥" },
  { id: "events", label: "Events", icon: "📅" },
  { id: "assignments", label: "Assignments", icon: "📋" },
  { id: "hours", label: "Volunteer Hours", icon: "⏱" },
  { id: "reports", label: "Reports", icon: "📊" },
  { id: "settings", label: "Settings", icon: "⚙" },
];

function Sidebar({ current, onNavigate }: { current: Page; onNavigate: (p: Page) => void }) {
  return (
    <div style={{ width: 220, minWidth: 220, background: "#1d2327", height: "100vh", position: "sticky", top: 0, display: "flex", flexDirection: "column", zIndex: 40 }}>
      <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid #2c3338" }}>
        <VolunTrackLogo />
      </div>
      <nav style={{ flex: 1, padding: "12px 10px", overflowY: "auto" }}>
        <div style={{ fontSize: 10, color: "#646970", textTransform: "uppercase", letterSpacing: "0.08em", padding: "8px 12px 4px", fontWeight: 600 }}>Main Menu</div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`wp-sidebar-link ${current === item.id ? "active" : ""}`}
            style={{ width: "100%", border: "none", background: "none", textAlign: "left", marginBottom: 1 }}
            onClick={() => onNavigate(item.id as Page)}
          >
            <span style={{ fontSize: 15 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div style={{ padding: "12px 10px", borderTop: "1px solid #2c3338" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 4 }}>
          <Avatar name="Admin User" size={32} />
          <div style={{ overflow: "hidden" }}>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Admin User</div>
            <div style={{ color: "#646970", fontSize: 11 }}>VolunTrack HQ</div>
          </div>
        </div>
        <button
          className="wp-sidebar-link"
          style={{ width: "100%", border: "none", background: "none", textAlign: "left", marginTop: 4, color: "#d63638" }}
          onClick={() => onNavigate("login")}
        >
          <span>⇤</span> Logout
        </button>
      </div>
    </div>
  );
}

// ─── TopBar ───────────────────────────────────────────────────────────────────
function TopBar({ title, onNavigate }: { title: string; onNavigate: (p: Page) => void }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const unread = notifications.filter((n) => !n.read).length;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setShowNotifs(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchResults = searchVal.length > 1
    ? [
        ...volunteers.filter((v) => v.name.toLowerCase().includes(searchVal.toLowerCase())).map((v) => ({ label: v.name, type: "Volunteer", page: "volunteer-profile" as Page })),
        ...events.filter((e) => e.name.toLowerCase().includes(searchVal.toLowerCase())).map((e) => ({ label: e.name, type: "Event", page: "event-details" as Page })),
      ]
    : [];

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #c3c4c7", padding: "0 24px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 30 }}>
      <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 17, color: "#1d2327" }}>{title}</h1>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", background: "#f0f0f1", borderRadius: 4, padding: "5px 10px", gap: 6, cursor: "text" }} onClick={() => setShowSearch(true)}>
            <span style={{ color: "#646970", fontSize: 13 }}>🔍</span>
            <input
              className="wp-input"
              style={{ background: "transparent", border: "none", boxShadow: "none", padding: 0, width: 160, fontSize: 13 }}
              placeholder="Search volunteers, events…"
              value={searchVal}
              onChange={(e) => { setSearchVal(e.target.value); setShowSearch(true); }}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setTimeout(() => setShowSearch(false), 150)}
            />
          </div>
          {showSearch && searchResults.length > 0 && (
            <div className="wp-card slide-in" style={{ position: "absolute", top: "calc(100% + 6px)", right: 0, width: 280, zIndex: 50 }}>
              {searchResults.map((r, i) => (
                <div key={i} style={{ padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i < searchResults.length - 1 ? "1px solid #f0f0f1" : "none" }}
                  onMouseDown={() => { onNavigate(r.page); setSearchVal(""); }}>
                  <span style={{ fontSize: 13 }}>{r.label}</span>
                  <span style={{ fontSize: 11, color: "#646970", background: "#f0f0f1", padding: "1px 6px", borderRadius: 2 }}>{r.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div style={{ position: "relative" }} ref={ref}>
          <button style={{ background: "none", border: "none", cursor: "pointer", position: "relative", width: 32, height: 32, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17 }}
            onClick={() => setShowNotifs(!showNotifs)}>
            🔔
            {unread > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, background: "#d63638", borderRadius: "50%", border: "2px solid #fff" }} />}
          </button>
          {showNotifs && (
            <div className="wp-card slide-in" style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", width: 320, zIndex: 50 }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #c3c4c7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 600, fontSize: 13 }}>Notifications</span>
                <span style={{ fontSize: 11, color: "#2271b1", cursor: "pointer" }}>Mark all read</span>
              </div>
              {notifications.map((n) => (
                <div key={n.id} style={{ padding: "10px 16px", borderBottom: "1px solid #f0f0f1", display: "flex", gap: 10, alignItems: "flex-start", background: n.read ? "#fff" : "#f0f6fd" }}>
                  {!n.read && <span style={{ width: 6, height: 6, background: "#2271b1", borderRadius: "50%", marginTop: 5, flexShrink: 0 }} />}
                  {n.read && <span style={{ width: 6, flexShrink: 0 }} />}
                  <div>
                    <div style={{ fontSize: 13, color: "#3c434a" }}>{n.text}</div>
                    <div style={{ fontSize: 11, color: "#646970", marginTop: 2 }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Avatar name="Admin User" size={28} />
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fade-in" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="wp-card slide-in" style={{ width: "100%", maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #c3c4c7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#646970", lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );
}

function Toast({ msg, type, onClose }: { msg: string; type: "success" | "error"; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3200); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className="slide-in" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 2000, display: "flex", alignItems: "center", gap: 10, background: type === "success" ? "#00a32a" : "#d63638", color: "#fff", padding: "12px 18px", borderRadius: 4, fontSize: 13, fontWeight: 500, boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}>
      {type === "success" ? "✓" : "✕"} {msg}
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 16, marginLeft: 8 }}>×</button>
    </div>
  );
}

// ─── Pages ────────────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("admin@voluntrack.org");
  const [pass, setPass] = useState("");
  const [remember, setRemember] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <VolunTrackLogo dark />
        <p style={{ marginTop: 8, color: "#646970", fontSize: 13 }}>Manage Volunteers. Build Impact.</p>
      </div>
      <div className="wp-card" style={{ width: "100%", maxWidth: 380, padding: "28px 28px 24px" }}>
        <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 4, color: "#1d2327" }}>Welcome back</h2>
        <p style={{ color: "#646970", fontSize: 13, marginBottom: 22 }}>Sign in to your admin account.</p>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5, color: "#3c434a" }}>Email address</label>
          <input className="wp-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@organization.org" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5, color: "#3c434a" }}>Password</label>
          <input className="wp-input" type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, cursor: "pointer", color: "#3c434a" }}>
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: "#2271b1" }} />
            Remember me
          </label>
          <span style={{ fontSize: 13, color: "#2271b1", cursor: "pointer" }}>Forgot password?</span>
        </div>
        <button className="wp-btn wp-btn-primary" style={{ width: "100%", justifyContent: "center", padding: "10px 0", fontSize: 14 }} onClick={onLogin}>
          Sign In
        </button>
      </div>
      <p style={{ marginTop: 20, fontSize: 12, color: "#646970" }}>© 2026 VolunTrack · All rights reserved</p>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const stats = [
    { label: "Total Volunteers", value: 42, delta: "+3 this month", icon: "👥", color: "#2271b1" },
    { label: "Active Volunteers", value: 27, delta: "64% of total", icon: "✅", color: "#00a32a" },
    { label: "Upcoming Events", value: 8, delta: "Next: Sep 20", icon: "📅", color: "#996800" },
    { label: "Volunteer Hours", value: 186, delta: "+24 this month", icon: "⏱", color: "#8c5faf" },
  ];

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <p style={{ color: "#646970", fontSize: 13, marginBottom: 2 }}>Today, September 16, 2026</p>
          <p style={{ color: "#3c434a", fontSize: 14 }}>Welcome back, Admin. Here's what's happening.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="wp-btn wp-btn-secondary" onClick={() => onNavigate("add-volunteer")}>+ Add Volunteer</button>
          <button className="wp-btn wp-btn-primary" onClick={() => onNavigate("create-event")}>+ Create Event</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} className="wp-card" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ fontSize: 12, color: "#646970", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 32, fontWeight: 700, color: s.color, lineHeight: 1.1, marginTop: 6 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: "#646970", marginTop: 4 }}>{s.delta}</p>
              </div>
              <span style={{ fontSize: 24, opacity: 0.5 }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* Chart */}
        <div className="wp-card" style={{ padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>Volunteer Activity (Last 6 Months)</h3>
            <span style={{ fontSize: 12, color: "#646970" }}>Hours logged</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={activityData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f1" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#646970" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#646970" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #c3c4c7" }} />
              <Bar dataKey="hours" fill="#2271b1" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="wp-card" style={{ padding: "18px 20px" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Recent Activity</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 14, marginTop: 1 }}>{a.icon}</span>
                <div>
                  <p style={{ fontSize: 12, color: "#3c434a", lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ fontSize: 11, color: "#646970", marginTop: 2 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="wp-card">
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #c3c4c7", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>Upcoming Events</h3>
          <button className="wp-btn wp-btn-ghost wp-btn-sm" onClick={() => onNavigate("events")}>View All</button>
        </div>
        <table className="wp-table">
          <thead>
            <tr>
              <th>Event</th><th>Date</th><th>Location</th><th>Volunteers</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {events.filter((e) => e.status !== "Cancelled").slice(0, 4).map((ev) => (
              <tr key={ev.id} style={{ cursor: "pointer" }} onClick={() => onNavigate("event-details")}>
                <td style={{ fontWeight: 500, color: "#2271b1" }}>{ev.name}</td>
                <td style={{ color: "#646970" }}>{ev.date}</td>
                <td style={{ color: "#646970", maxWidth: 160 }}>{ev.location}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ flex: 1, height: 4, background: "#f0f0f1", borderRadius: 2, minWidth: 60 }}>
                      <div style={{ height: "100%", background: ev.assigned >= ev.required ? "#00a32a" : "#2271b1", borderRadius: 2, width: `${Math.min(100, (ev.assigned / ev.required) * 100)}%` }} />
                    </div>
                    <span style={{ fontSize: 12, color: "#646970", whiteSpace: "nowrap" }}>{ev.assigned}/{ev.required}</span>
                  </div>
                </td>
                <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(ev.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{ev.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Volunteers Page ──────────────────────────────────────────────────────────
function VolunteersPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = volunteers.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <p style={{ color: "#646970", fontSize: 13 }}>{total} volunteers registered</p>
        </div>
        <button className="wp-btn wp-btn-primary" onClick={() => onNavigate("add-volunteer")}>+ Add Volunteer</button>
      </div>

      {/* Filters */}
      <div className="wp-card" style={{ padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <input className="wp-input" style={{ width: 220 }} placeholder="🔍  Search volunteers…" value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
        <select className="wp-input wp-select" style={{ width: 140 }} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option>All</option>
          <option>Active</option>
          <option>Available</option>
          <option>Assigned</option>
          <option>Completed</option>
        </select>
        <select className="wp-input wp-select" style={{ width: 160 }}>
          <option>All Skills</option>
          <option>Photography</option>
          <option>Graphic Design</option>
          <option>Event Coord.</option>
          <option>Social Media</option>
        </select>
        <select className="wp-input wp-select" style={{ width: 160 }}>
          <option>All Availability</option>
          <option>Weekdays</option>
          <option>Weekends</option>
          <option>Mornings</option>
          <option>Afternoons</option>
          <option>Evenings</option>
        </select>
      </div>

      <div className="wp-card">
        <table className="wp-table">
          <thead>
            <tr>
              <th>Volunteer</th><th>Email</th><th>Skills</th><th>Availability</th><th>Role</th><th>Status</th><th>Hours</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((v) => (
              <tr key={v.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Avatar name={v.name} size={28} />
                    <span style={{ fontWeight: 500 }}>{v.name}</span>
                  </div>
                </td>
                <td style={{ color: "#646970" }}>{v.email}</td>
                <td>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {v.skills.slice(0, 2).map((s) => (
                      <span key={s} style={{ background: "#f0f0f1", color: "#646970", padding: "1px 6px", borderRadius: 2, fontSize: 11 }}>{s}</span>
                    ))}
                  </div>
                </td>
                <td style={{ color: "#646970", fontSize: 12 }}>{v.availability}</td>
                <td style={{ fontSize: 12 }}>{v.role}</td>
                <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(v.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{v.status}</span></td>
                <td style={{ fontWeight: 600 }}>{v.hours}h</td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="wp-btn wp-btn-ghost wp-btn-sm" onClick={() => onNavigate("volunteer-profile")}>View</button>
                    <button className="wp-btn wp-btn-secondary wp-btn-sm">Assign</button>
                    <button className="wp-btn wp-btn-danger wp-btn-sm">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div style={{ padding: "12px 16px", borderTop: "1px solid #f0f0f1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#646970" }}>Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}</span>
          <div style={{ display: "flex", gap: 4 }}>
            <button className="wp-btn wp-btn-ghost wp-btn-sm" disabled={page === 1} onClick={() => setPage(page - 1)} style={{ opacity: page === 1 ? 0.4 : 1 }}>‹ Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} className={`wp-btn wp-btn-sm ${p === page ? "wp-btn-primary" : "wp-btn-ghost"}`} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button className="wp-btn wp-btn-ghost wp-btn-sm" disabled={page === totalPages} onClick={() => setPage(page + 1)} style={{ opacity: page === totalPages ? 0.4 : 1 }}>Next ›</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Volunteer Profile ────────────────────────────────────────────────────────
function VolunteerProfile({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const v = volunteers[0];
  const [tab, setTab] = useState("overview");

  return (
    <div className="fade-in">
      <button className="wp-btn wp-btn-ghost wp-btn-sm" style={{ marginBottom: 16 }} onClick={() => onNavigate("volunteers")}>← Back to Volunteers</button>
      <div className="wp-card" style={{ padding: "24px", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <Avatar name={v.name} size={64} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 10 }}>
              <div>
                <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20 }}>{v.name}</h2>
                <span className="status-badge" style={{ ...Object.fromEntries(statusColor(v.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{v.status}</span>
                <div style={{ marginTop: 8, display: "flex", gap: 16, fontSize: 13, color: "#646970" }}>
                  <span>✉ {v.email}</span>
                  <span>📞 {v.phone}</span>
                  <span>📍 Portland, OR</span>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="wp-btn wp-btn-secondary">Edit Profile</button>
                <button className="wp-btn wp-btn-primary">Assign to Event</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 24 }}>
          {[
            { label: "Total Events", value: 5 },
            { label: "Completed", value: 3 },
            { label: "Volunteer Hours", value: v.hours },
            { label: "Current Role", value: v.role.split(" ")[0] },
          ].map((s) => (
            <div key={s.label} style={{ background: "#f6f7f7", borderRadius: 4, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 22, fontWeight: 700, color: "#2271b1" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#646970", marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #c3c4c7", marginBottom: 16 }}>
        {["overview", "events", "hours", "activity"].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "10px 18px", fontSize: 13, fontWeight: 500, cursor: "pointer", border: "none", background: "none", color: tab === t ? "#2271b1" : "#646970", borderBottom: tab === t ? "2px solid #2271b1" : "2px solid transparent", marginBottom: -2, textTransform: "capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="wp-card fade-in" style={{ padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div>
              <h4 style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: "#646970", textTransform: "uppercase", letterSpacing: "0.05em" }}>Skills</h4>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {v.skills.map((s) => <span key={s} style={{ background: "#e8f0fa", color: "#2271b1", padding: "3px 10px", borderRadius: 12, fontSize: 12, fontWeight: 500 }}>{s}</span>)}
              </div>
              <h4 style={{ fontWeight: 600, fontSize: 13, marginTop: 18, marginBottom: 8, color: "#646970", textTransform: "uppercase", letterSpacing: "0.05em" }}>Availability</h4>
              <p style={{ fontSize: 13 }}>{v.availability}</p>
              <h4 style={{ fontWeight: 600, fontSize: 13, marginTop: 18, marginBottom: 8, color: "#646970", textTransform: "uppercase", letterSpacing: "0.05em" }}>Preferred Role</h4>
              <p style={{ fontSize: 13 }}>{v.role}</p>
            </div>
            <div>
              <h4 style={{ fontWeight: 600, fontSize: 13, marginBottom: 8, color: "#646970", textTransform: "uppercase", letterSpacing: "0.05em" }}>Bio</h4>
              <p style={{ fontSize: 13, color: "#646970", lineHeight: 1.6 }}>Sarah is a passionate community leader with 3+ years of volunteer experience in youth programs and educational workshops. She excels at coordinating large groups and creating organized, welcoming environments for participants.</p>
            </div>
          </div>
        </div>
      )}
      {tab === "events" && (
        <div className="wp-card fade-in">
          <table className="wp-table">
            <thead><tr><th>Event</th><th>Date</th><th>Role</th><th>Hours</th><th>Status</th></tr></thead>
            <tbody>
              {events.slice(0, 3).map((ev) => (
                <tr key={ev.id}>
                  <td style={{ fontWeight: 500 }}>{ev.name}</td>
                  <td style={{ color: "#646970" }}>{ev.date}</td>
                  <td style={{ fontSize: 12 }}>Event Coordinator</td>
                  <td>8h</td>
                  <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(ev.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{ev.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === "hours" && (
        <div className="wp-card fade-in">
          <table className="wp-table">
            <thead><tr><th>Event</th><th>Date</th><th>Hours</th><th>Verification</th></tr></thead>
            <tbody>
              {hoursData.filter((h) => h.volunteer === v.name).map((h) => (
                <tr key={h.id}>
                  <td>{h.event}</td>
                  <td style={{ color: "#646970" }}>{h.date}</td>
                  <td style={{ fontWeight: 600 }}>{h.hours}h</td>
                  <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(h.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{h.status}</span></td>
                </tr>
              ))}
              {hoursData.filter((h) => h.volunteer === v.name).length === 0 && (
                <tr><td colSpan={4} style={{ textAlign: "center", color: "#646970", padding: 32 }}>No hours recorded yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {tab === "activity" && (
        <div className="wp-card fade-in" style={{ padding: 20 }}>
          {recentActivity.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: i < recentActivity.length - 1 ? "1px solid #f0f0f1" : "none" }}>
              <span style={{ fontSize: 18 }}>{a.icon}</span>
              <div>
                <p style={{ fontSize: 13 }}>{a.text}</p>
                <p style={{ fontSize: 11, color: "#646970", marginTop: 2 }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Add Volunteer ────────────────────────────────────────────────────────────
function AddVolunteerPage({ onNavigate, onSuccess }: { onNavigate: (p: Page) => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "General Volunteer", availability: "Weekends", address: "", emergency: "", bio: "" });
  const [skills, setSkills] = useState<string[]>([]);

  const allSkills = ["Event Coordinator", "Photography", "Graphic Design", "Social Media", "Content Writing", "Registration", "Logistics", "General"];

  return (
    <div className="fade-in" style={{ maxWidth: 700 }}>
      <button className="wp-btn wp-btn-ghost wp-btn-sm" style={{ marginBottom: 16 }} onClick={() => onNavigate("volunteers")}>← Back to Volunteers</button>
      <div className="wp-card">
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #c3c4c7" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16 }}>Register New Volunteer</h2>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Full Name *</label>
              <input className="wp-input" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Email *</label>
              <input className="wp-input" type="email" placeholder="john@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Phone Number</label>
              <input className="wp-input" placeholder="+1 555-0000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Preferred Role</label>
              <select className="wp-input wp-select" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                <option>Event Coordinator</option>
                <option>Graphic Designer</option>
                <option>Social Media</option>
                <option>Registration Desk</option>
                <option>Photographer</option>
                <option>Content Writer</option>
                <option>General Volunteer</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Availability</label>
              <select className="wp-input wp-select" value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })}>
                <option>Weekdays</option>
                <option>Weekends</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Emergency Contact</label>
              <input className="wp-input" placeholder="Contact name & phone" value={form.emergency} onChange={(e) => setForm({ ...form, emergency: e.target.value })} />
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 8 }}>Skills</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {allSkills.map((s) => (
                <button key={s} onClick={() => setSkills(skills.includes(s) ? skills.filter((x) => x !== s) : [...skills, s])}
                  style={{ padding: "4px 10px", borderRadius: 12, fontSize: 12, cursor: "pointer", border: "1px solid", fontWeight: 500, background: skills.includes(s) ? "#2271b1" : "#fff", color: skills.includes(s) ? "#fff" : "#646970", borderColor: skills.includes(s) ? "#2271b1" : "#c3c4c7", transition: "all 0.15s" }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Address</label>
            <input className="wp-input" placeholder="123 Main St, City, State" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Short Bio</label>
            <textarea className="wp-input" rows={3} placeholder="Tell us about this volunteer…" value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="wp-btn wp-btn-ghost" onClick={() => onNavigate("volunteers")}>Cancel</button>
            <button className="wp-btn wp-btn-primary" onClick={onSuccess}>Register Volunteer</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Events Page ──────────────────────────────────────────────────────────────
function EventsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) => {
    const matchFilter = filter === "All" || e.status === filter;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <p style={{ color: "#646970", fontSize: 13 }}>{events.length} total events</p>
        <button className="wp-btn wp-btn-primary" onClick={() => onNavigate("create-event")}>+ Create Event</button>
      </div>
      <div className="wp-card" style={{ padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
        <input className="wp-input" style={{ width: 240 }} placeholder="🔍  Search events…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div style={{ display: "flex", gap: 4 }}>
          {["All", "Upcoming", "Ongoing", "Completed", "Cancelled"].map((f) => (
            <button key={f} className={`wp-btn wp-btn-sm ${filter === f ? "wp-btn-primary" : "wp-btn-ghost"}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>
      <div className="wp-card">
        <table className="wp-table">
          <thead>
            <tr><th>Event</th><th>Date</th><th>Location</th><th>Required</th><th>Assigned</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((ev) => (
              <tr key={ev.id}>
                <td><span style={{ fontWeight: 500, color: "#2271b1", cursor: "pointer" }} onClick={() => onNavigate("event-details")}>{ev.name}</span></td>
                <td style={{ color: "#646970" }}>{ev.date}</td>
                <td style={{ color: "#646970", maxWidth: 160, fontSize: 12 }}>{ev.location}</td>
                <td style={{ textAlign: "center" }}>{ev.required}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 60, height: 4, background: "#f0f0f1", borderRadius: 2 }}>
                      <div style={{ height: "100%", background: ev.assigned >= ev.required ? "#00a32a" : "#2271b1", borderRadius: 2, width: `${Math.min(100, (ev.assigned / ev.required) * 100)}%` }} />
                    </div>
                    <span style={{ fontSize: 12 }}>{ev.assigned}/{ev.required}</span>
                  </div>
                </td>
                <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(ev.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{ev.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="wp-btn wp-btn-ghost wp-btn-sm" onClick={() => onNavigate("event-details")}>View</button>
                    <button className="wp-btn wp-btn-secondary wp-btn-sm">Assign</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Create Event ─────────────────────────────────────────────────────────────
function CreateEventPage({ onNavigate, onSuccess }: { onNavigate: (p: Page) => void; onSuccess: () => void }) {
  const [form, setForm] = useState({ name: "", description: "", date: "", startTime: "", endTime: "", location: "", required: "", skills: "", organizer: "", notes: "" });

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <div className="fade-in" style={{ maxWidth: 700 }}>
      <button className="wp-btn wp-btn-ghost wp-btn-sm" style={{ marginBottom: 16 }} onClick={() => onNavigate("events")}>← Back to Events</button>
      <div className="wp-card">
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #c3c4c7" }}>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 16 }}>Create New Event</h2>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Event Name *</label>
            <input className="wp-input" placeholder="e.g. Annual Food Drive" value={form.name} onChange={f("name")} />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Description</label>
            <textarea className="wp-input" rows={3} placeholder="Describe the event…" value={form.description} onChange={f("description")} style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Date *</label>
              <input className="wp-input" type="date" value={form.date} onChange={f("date")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Start Time</label>
              <input className="wp-input" type="time" value={form.startTime} onChange={f("startTime")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>End Time</label>
              <input className="wp-input" type="time" value={form.endTime} onChange={f("endTime")} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Location *</label>
              <input className="wp-input" placeholder="Venue, address" value={form.location} onChange={f("location")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Required Volunteers</label>
              <input className="wp-input" type="number" placeholder="0" value={form.required} onChange={f("required")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Required Skills</label>
              <input className="wp-input" placeholder="e.g. Photography, Admin" value={form.skills} onChange={f("skills")} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Event Organizer</label>
              <input className="wp-input" placeholder="Organizer name" value={form.organizer} onChange={f("organizer")} />
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Additional Notes</label>
            <textarea className="wp-input" rows={2} placeholder="Any extra information…" value={form.notes} onChange={f("notes")} style={{ resize: "vertical" }} />
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button className="wp-btn wp-btn-ghost" onClick={() => onNavigate("events")}>Cancel</button>
            <button className="wp-btn wp-btn-primary" onClick={onSuccess}>Create Event</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Event Details ────────────────────────────────────────────────────────────
function EventDetails({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const ev = events[0];
  const [showAssign, setShowAssign] = useState(false);
  const [toast, setToast] = useState(false);

  return (
    <div className="fade-in">
      {toast && <Toast msg="Volunteer successfully assigned!" type="success" onClose={() => setToast(false)} />}
      <button className="wp-btn wp-btn-ghost wp-btn-sm" style={{ marginBottom: 16 }} onClick={() => onNavigate("events")}>← Back to Events</button>
      <div className="wp-card" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 14 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 20 }}>{ev.name}</h2>
              <span className="status-badge" style={{ ...Object.fromEntries(statusColor(ev.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{ev.status}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "8px 24px", fontSize: 13, color: "#646970" }}>
              <span>📅 {ev.date}</span>
              <span>📍 {ev.location}</span>
              <span>👤 {ev.organizer}</span>
            </div>
          </div>
          <button className="wp-btn wp-btn-primary" onClick={() => setShowAssign(true)}>+ Assign Volunteer</button>
        </div>
        <div style={{ marginTop: 20, padding: 16, background: "#f6f7f7", borderRadius: 4, fontSize: 13, color: "#646970", lineHeight: 1.6 }}>
          A two-day workshop focused on developing leadership skills in youth aged 15–25. Participants will engage in team-building activities, mentorship sessions, and practical skill-building exercises.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 16 }}>
          {[
            { label: "Required Volunteers", value: ev.required },
            { label: "Assigned Volunteers", value: ev.assigned },
            { label: "Remaining Spots", value: ev.required - ev.assigned },
            { label: "Completion", value: `${Math.round((ev.assigned / ev.required) * 100)}%` },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center", padding: "12px 16px", background: "#f6f7f7", borderRadius: 4 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 24, fontWeight: 700, color: "#2271b1" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "#646970" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="wp-card">
        <div style={{ padding: "14px 18px", borderBottom: "1px solid #c3c4c7" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14 }}>Assigned Volunteers</h3>
        </div>
        <table className="wp-table">
          <thead><tr><th>Volunteer</th><th>Role</th><th>Attendance</th><th>Hours</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {assignments.filter((a) => a.event === ev.name).map((a) => (
              <tr key={a.id}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={a.volunteer} size={24} /><span style={{ fontWeight: 500 }}>{a.volunteer}</span></div></td>
                <td style={{ fontSize: 12 }}>{a.role}</td>
                <td><span style={{ fontSize: 12, color: "#646970" }}>Pending</span></td>
                <td>{a.actualHours || "—"}</td>
                <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(a.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{a.status}</span></td>
                <td><button className="wp-btn wp-btn-ghost wp-btn-sm">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAssign && (
        <Modal title="Assign Volunteer to Event" onClose={() => setShowAssign(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Select Volunteer</label>
              <select className="wp-input wp-select">
                {volunteers.map((v) => <option key={v.id}>{v.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Role</label>
              <select className="wp-input wp-select">
                <option>Event Coordinator</option>
                <option>Registration Desk</option>
                <option>Photographer</option>
                <option>Graphic Designer</option>
                <option>Social Media</option>
                <option>Content Writer</option>
                <option>General Volunteer</option>
              </select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Assignment Date</label>
                <input className="wp-input" type="date" defaultValue={ev.date} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Expected Hours</label>
                <input className="wp-input" type="number" placeholder="8" />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Notes</label>
              <textarea className="wp-input" rows={2} placeholder="Optional notes…" style={{ resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <button className="wp-btn wp-btn-ghost" onClick={() => setShowAssign(false)}>Cancel</button>
              <button className="wp-btn wp-btn-primary" onClick={() => { setShowAssign(false); setToast(true); }}>Confirm Assignment</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Assignments Page ─────────────────────────────────────────────────────────
function AssignmentsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = assignments.filter((a) => {
    const matchSearch = a.volunteer.toLowerCase().includes(search.toLowerCase()) || a.event.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="fade-in">
      <div className="wp-card" style={{ padding: "12px 16px", marginBottom: 16, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <input className="wp-input" style={{ width: 220 }} placeholder="🔍  Search assignments…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="wp-input wp-select" style={{ width: 150 }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Assigned</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>
      </div>
      <div className="wp-card">
        <table className="wp-table">
          <thead>
            <tr><th>Volunteer</th><th>Event</th><th>Role</th><th>Date</th><th>Expected Hrs</th><th>Actual Hrs</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={a.volunteer} size={24} /><span style={{ fontWeight: 500 }}>{a.volunteer}</span></div></td>
                <td style={{ color: "#2271b1", maxWidth: 160 }}>{a.event}</td>
                <td style={{ fontSize: 12 }}>{a.role}</td>
                <td style={{ color: "#646970", fontSize: 12 }}>{a.date}</td>
                <td style={{ textAlign: "center" }}>{a.expectedHours}h</td>
                <td style={{ textAlign: "center" }}>{a.actualHours > 0 ? `${a.actualHours}h` : "—"}</td>
                <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(a.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{a.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="wp-btn wp-btn-ghost wp-btn-sm">Edit</button>
                    {a.status !== "Completed" && <button className="wp-btn wp-btn-secondary wp-btn-sm" style={{ color: "#00a32a", borderColor: "#00a32a" }}>Complete</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Volunteer Hours Page ─────────────────────────────────────────────────────
function HoursPage() {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);

  const totalHours = hoursData.reduce((sum, h) => sum + h.hours, 0);
  const thisMonth = hoursData.filter((h) => h.date.startsWith("2026-09")).reduce((sum, h) => sum + h.hours, 0);

  return (
    <div className="fade-in">
      {toast && <Toast msg="Hours added successfully!" type="success" onClose={() => setToast(false)} />}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
        <button className="wp-btn wp-btn-primary" onClick={() => setShowModal(true)}>+ Add Hours</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Volunteer Hours", value: 186, color: "#2271b1" },
          { label: "This Month", value: thisMonth, color: "#00a32a" },
          { label: "Avg Hours / Volunteer", value: "4.4h", color: "#996800" },
          { label: "Top Volunteer", value: "Kwame A.", color: "#8c5faf" },
        ].map((s) => (
          <div key={s.label} className="wp-card" style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: 11, color: "#646970", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 28, fontWeight: 700, color: s.color, marginTop: 6 }}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="wp-card">
        <table className="wp-table">
          <thead>
            <tr><th>Volunteer</th><th>Event</th><th>Date</th><th>Role</th><th>Hours</th><th>Verification</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {hoursData.map((h) => (
              <tr key={h.id}>
                <td><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Avatar name={h.volunteer} size={24} /><span style={{ fontWeight: 500 }}>{h.volunteer}</span></div></td>
                <td style={{ color: "#2271b1" }}>{h.event}</td>
                <td style={{ color: "#646970", fontSize: 12 }}>{h.date}</td>
                <td style={{ fontSize: 12 }}>{h.role}</td>
                <td style={{ fontWeight: 600 }}>{h.hours}h</td>
                <td><span className="status-badge" style={{ ...Object.fromEntries(statusColor(h.status).split(";").filter(Boolean).map((s) => s.split(":").map((x) => x.trim()) as [string, string])) }}>{h.status}</span></td>
                <td>
                  <div style={{ display: "flex", gap: 4 }}>
                    <button className="wp-btn wp-btn-ghost wp-btn-sm">Edit</button>
                    {h.status === "Pending" && <button className="wp-btn wp-btn-secondary wp-btn-sm" style={{ color: "#00a32a", borderColor: "#00a32a" }}>Verify</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal title="Add Volunteer Hours" onClose={() => setShowModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Volunteer</label>
              <select className="wp-input wp-select">{volunteers.map((v) => <option key={v.id}>{v.name}</option>)}</select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Event</label>
              <select className="wp-input wp-select">{events.map((e) => <option key={e.id}>{e.name}</option>)}</select>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Date</label>
                <input className="wp-input" type="date" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Hours</label>
                <input className="wp-input" type="number" placeholder="0" />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Role</label>
              <select className="wp-input wp-select">
                <option>Event Coordinator</option>
                <option>Registration Desk</option>
                <option>Photographer</option>
                <option>General Volunteer</option>
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Notes</label>
              <textarea className="wp-input" rows={2} style={{ resize: "vertical" }} />
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
              <button className="wp-btn wp-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="wp-btn wp-btn-primary" onClick={() => { setShowModal(false); setToast(true); }}>Add Hours</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── Reports Page ─────────────────────────────────────────────────────────────
function ReportsPage() {
  const roleData = [
    { name: "Event Coord.", value: 12 },
    { name: "General", value: 18 },
    { name: "Photography", value: 6 },
    { name: "Social Media", value: 4 },
    { name: "Graphic Design", value: 2 },
  ];
  const PIE_COLORS = ["#2271b1", "#00a32a", "#996800", "#8c5faf", "#e05d20"];
  const eventStats = [
    { month: "Apr", events: 2 },
    { month: "May", events: 3 },
    { month: "Jun", events: 4 },
    { month: "Jul", events: 3 },
    { month: "Aug", events: 5 },
    { month: "Sep", events: 6 },
  ];

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 20 }}>
        <button className="wp-btn wp-btn-ghost">⬇ Export CSV</button>
        <button className="wp-btn wp-btn-primary">Generate Report</button>
      </div>

      {/* Impact stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        {[
          { label: "Total Volunteers", value: 42, sub: "+3 this month", color: "#2271b1" },
          { label: "Total Events", value: 6, sub: "2 completed", color: "#00a32a" },
          { label: "Total Hours", value: 186, sub: "Across all events", color: "#996800" },
          { label: "Completed Assignments", value: 14, sub: "Out of 22 total", color: "#8c5faf" },
        ].map((s) => (
          <div key={s.label} className="wp-card" style={{ padding: "16px 18px" }}>
            <p style={{ fontSize: 11, color: "#646970", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 30, fontWeight: 700, color: s.color, marginTop: 6 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "#646970", marginTop: 2 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="wp-card" style={{ padding: "18px 20px" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Volunteer Hours Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f1" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#646970" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#646970" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #c3c4c7" }} />
              <Line type="monotone" dataKey="hours" stroke="#2271b1" strokeWidth={2.5} dot={{ fill: "#2271b1", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="wp-card" style={{ padding: "18px 20px" }}>
          <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Volunteers by Role</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={roleData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                {roleData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #c3c4c7" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="wp-card" style={{ padding: "18px 20px" }}>
        <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, marginBottom: 16 }}>Monthly Event Count</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={eventStats} barSize={24}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f1" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#646970" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "#646970" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 4, border: "1px solid #c3c4c7" }} />
            <Bar dataKey="events" fill="#00a32a" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────
function SettingsPage() {
  const [activeSection, setActiveSection] = useState("organization");
  const [toast, setToast] = useState(false);

  const sections = [
    { id: "organization", label: "Organization" },
    { id: "profile", label: "Admin Profile" },
    { id: "preferences", label: "System Preferences" },
    { id: "security", label: "Security" },
  ];

  return (
    <div className="fade-in">
      {toast && <Toast msg="Settings saved successfully!" type="success" onClose={() => setToast(false)} />}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
        <div className="wp-card" style={{ padding: 8, alignSelf: "start" }}>
          {sections.map((s) => (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              style={{ display: "block", width: "100%", padding: "9px 14px", borderRadius: 4, border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: activeSection === s.id ? 600 : 400, background: activeSection === s.id ? "#e8f0fa" : "transparent", color: activeSection === s.id ? "#2271b1" : "#3c434a", marginBottom: 1 }}>
              {s.label}
            </button>
          ))}
        </div>
        <div>
          {activeSection === "organization" && (
            <div className="wp-card fade-in">
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #c3c4c7" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>Organization Settings</h3>
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Organization Name</label><input className="wp-input" defaultValue="VolunTrack HQ" /></div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Email</label><input className="wp-input" type="email" defaultValue="contact@voluntrack.org" /></div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Phone</label><input className="wp-input" defaultValue="+1 555-VOLUN" /></div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Address</label><input className="wp-input" defaultValue="456 Community Drive, Portland, OR 97201" /></div>
                <div style={{ paddingTop: 4 }}><button className="wp-btn wp-btn-primary" onClick={() => setToast(true)}>Save Changes</button></div>
              </div>
            </div>
          )}
          {activeSection === "profile" && (
            <div className="wp-card fade-in">
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #c3c4c7" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>Admin Profile</h3>
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <Avatar name="Admin User" size={56} />
                  <button className="wp-btn wp-btn-ghost">Change Photo</button>
                </div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Full Name</label><input className="wp-input" defaultValue="Admin User" /></div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Email</label><input className="wp-input" type="email" defaultValue="admin@voluntrack.org" /></div>
                <div><button className="wp-btn wp-btn-primary" onClick={() => setToast(true)}>Save Profile</button></div>
              </div>
            </div>
          )}
          {activeSection === "preferences" && (
            <div className="wp-card fade-in">
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #c3c4c7" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>System Preferences</h3>
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { label: "Browser notifications", sub: "Show desktop notifications for new activity" },
                  { label: "Email notifications", sub: "Receive email alerts for new registrations" },
                  { label: "Weekly digest", sub: "Send a weekly summary email to admin" },
                ].map((pref) => (
                  <div key={pref.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 18, borderBottom: "1px solid #f0f0f1" }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500 }}>{pref.label}</p>
                      <p style={{ fontSize: 12, color: "#646970", marginTop: 2 }}>{pref.sub}</p>
                    </div>
                    <label style={{ position: "relative", width: 40, height: 22, display: "inline-block", cursor: "pointer" }}>
                      <input type="checkbox" defaultChecked style={{ opacity: 0, width: 0, height: 0 }} />
                      <span style={{ position: "absolute", inset: 0, background: "#2271b1", borderRadius: 11, transition: "0.15s" }} />
                      <span style={{ position: "absolute", top: 2, left: 2, width: 18, height: 18, background: "#fff", borderRadius: "50%", transition: "0.15s", transform: "translateX(18px)" }} />
                    </label>
                  </div>
                ))}
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Default Volunteer Status</label>
                  <select className="wp-input wp-select" style={{ maxWidth: 200 }} defaultValue="Available">
                    <option>Available</option>
                    <option>Pending Review</option>
                  </select>
                </div>
                <div><button className="wp-btn wp-btn-primary" onClick={() => setToast(true)}>Save Preferences</button></div>
              </div>
            </div>
          )}
          {activeSection === "security" && (
            <div className="wp-card fade-in">
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #c3c4c7" }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 15 }}>Security</h3>
              </div>
              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 style={{ fontWeight: 600, fontSize: 13 }}>Change Password</h4>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Current Password</label><input className="wp-input" type="password" /></div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>New Password</label><input className="wp-input" type="password" /></div>
                <div><label style={{ display: "block", fontSize: 13, fontWeight: 500, marginBottom: 5 }}>Confirm New Password</label><input className="wp-input" type="password" /></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="wp-btn wp-btn-primary" onClick={() => setToast(true)}>Update Password</button>
                </div>
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #f0f0f1" }}>
                  <h4 style={{ fontWeight: 600, fontSize: 13, marginBottom: 8 }}>Sessions</h4>
                  <p style={{ fontSize: 13, color: "#646970", marginBottom: 10 }}>Logout from all devices and sessions.</p>
                  <button className="wp-btn wp-btn-danger">Logout from All Devices</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
const pageTitles: Record<string, string> = {
  dashboard: "Dashboard",
  volunteers: "Volunteers",
  "volunteer-profile": "Volunteer Profile",
  "add-volunteer": "Add Volunteer",
  events: "Events",
  "create-event": "Create Event",
  "event-details": "Event Details",
  assignments: "Assignments",
  hours: "Volunteer Hours",
  reports: "Reports",
  settings: "Settings",
};

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const navigate = (p: Page) => setPage(p);

  if (page === "login") {
    return <LoginPage onLogin={() => navigate("dashboard")} />;
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard onNavigate={navigate} />;
      case "volunteers": return <VolunteersPage onNavigate={navigate} />;
      case "volunteer-profile": return <VolunteerProfile onNavigate={navigate} />;
      case "add-volunteer": return <AddVolunteerPage onNavigate={navigate} onSuccess={() => { setToast({ msg: "Volunteer registered successfully!", type: "success" }); navigate("volunteers"); }} />;
      case "events": return <EventsPage onNavigate={navigate} />;
      case "create-event": return <CreateEventPage onNavigate={navigate} onSuccess={() => { setToast({ msg: "Event created successfully!", type: "success" }); navigate("events"); }} />;
      case "event-details": return <EventDetails onNavigate={navigate} />;
      case "assignments": return <AssignmentsPage />;
      case "hours": return <HoursPage />;
      case "reports": return <ReportsPage />;
      case "settings": return <SettingsPage />;
      default: return <Dashboard onNavigate={navigate} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f0f0f1" }}>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <Sidebar current={page} onNavigate={navigate} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopBar title={pageTitles[page] || "VolunTrack"} onNavigate={navigate} />
        <main style={{ flex: 1, padding: "24px 28px", overflowY: "auto" }}>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
