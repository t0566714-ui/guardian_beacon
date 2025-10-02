import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const DashboardGreeting = ({
  animation,

  headline,
  statusLabel,
  statusTagline,
  statusNarrative,
  syncedLabel,
  safetyConfidence,
  highlights = [],
  lastCheckInLabel,
  tagline,
}) => {
  return (
    <motion.section
      {...animation}
      className="rounded-2xl shadow-lg p-6 bg-gradient-to-br from-slate-900/60 to-slate-800/40 border border-slate-700/40 overflow-hidden mb-8"
      role="banner"
      aria-label={`${statusLabel} system status`}
      aria-live="polite"
    >
      <div className="dashboard-banner__glow" aria-hidden="true" />
      <div className="dashboard-banner__content">
        <div className="dashboard-banner__intro">
          <span className="badge-inline">Guardian Beacon</span>
          <h1 className="dashboard-banner__headline">{headline}</h1>
          <p className="dashboard-banner__body">
            {statusNarrative}
          </p>
          {tagline && (
            <p className="dashboard-banner__tagline" aria-live="polite">
              {tagline}
            </p>
          )}
          <div className="dashboard-banner__meta" role="list">
            <span className="dashboard-banner__meta-item" role="listitem">
              <strong>{statusTagline}</strong>
            </span>
            <span className="dashboard-banner__meta-item" role="listitem">
              {syncedLabel}
            </span>
            <span className="dashboard-banner__meta-item" role="listitem">
              Confidence {safetyConfidence}%
            </span>
          </div>
        </div>
        <div className="dashboard-banner__badge" aria-hidden="true">
          <div className="banner-status-chip">
            <Shield className="banner-status-chip__icon" aria-hidden="true" />
            <span>{statusLabel}</span>
          </div>
          <div className="banner-sync">
            <span className="banner-sync__label">Last Check-in</span>
            <span className="banner-sync__value">{lastCheckInLabel}</span>
          </div>
        </div>
      </div>
      <div className="dashboard-banner__highlights" role="list">
        {highlights.map((highlight) => (
          <div key={highlight.label} className="banner-highlight" role="listitem">
            <span className="banner-highlight__label">{highlight.label}</span>
            <span className="banner-highlight__value">{highlight.value}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default DashboardGreeting;
