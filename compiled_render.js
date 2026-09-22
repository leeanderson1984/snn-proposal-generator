function renderApp(vals){
  return `
<div class="app">

  <div class="topbar">
    <div class="topbar-row">
      <div class="brand">
        <div class="brand-mark">SNN</div>
        <div class="brand-text">
          <div class="brand-title">SNN Sports</div>
          <div class="brand-sub">Proposal Generator</div>
        </div>
      </div>
      ${(vals.hasCurrentName) ? `
        <div class="current-name">${esc(vals.currentDisplayName)}</div>
      ` : ""}
      <div class="topbar-spacer"></div>
      ${(vals.flashMessage) ? `
        <div class="flash">${esc(vals.flashMessage)}</div>
      ` : ""}
      <div class="statuspill-select">
        <select class="status-select" data-value="${escAttr(vals.statusValue)}" data-h-change="${H(vals.onStatusChange)}">
          ${(vals.statusOptions || []).map(function(opt){ return `
            <option value="${escAttr(opt.value)}">${esc(opt.label)}</option>
          `; }).join("")}
        </select>
      </div>
      <div class="topbar-actions">
        <button class="btn btn-ghost-on-blue" data-h-click="${H(vals.goList)}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"></rect><path d="M3 9h18"></path></svg>
          All Proposals (${esc(vals.proposalCount)})
        </button>
        <button class="btn btn-ghost-on-blue" data-h-click="${H(vals.newProposal)}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
          New
        </button>
        <button class="btn btn-primary-on-blue" data-h-click="${H(vals.saveProposal)}">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z"></path><path d="M17 21v-8H7v8M7 3v5h8"></path></svg>
          Save
        </button>
      </div>
    </div>
    <div class="tabbar">
      ${(vals.isBuilderScreen) ? `
      <div class="tabbar-row">
        ${(vals.navTabs || []).map(function(t){ return `
          <button class="${escAttr(t.className)}" data-h-click="${H(t.onClick)}">
            <span class="tabnum">${esc(t.num)}</span>${esc(t.label)}
            ${(t.showDot) ? `<span class="tab-dot" title="Section has content"></span>` : ""}
          </button>
        `; }).join("")}
      </div>
      ` : ""}
    </div>
  </div>

  <div class="shell">

    ${(vals.hasPendingAction) ? `
      <div class="panel unsaved-banner no-print">
        <div class="unsaved-banner-text"><strong>Unsaved changes</strong> on the current proposal. Save before continuing, or discard them?</div>
        <div class="unsaved-banner-actions">
          <button class="btn" style="background:var(--snn-blue);color:#fff;" data-h-click="${H(vals.onSaveAndContinue)}">Save &amp; Continue</button>
          <button class="link-btn danger" data-h-click="${H(vals.onDiscardAndContinue)}">Discard Changes</button>
          <button class="link-btn" data-h-click="${H(vals.onCancelPending)}">Cancel</button>
        </div>
      </div>
    ` : ""}

    <!-- ============ PROPOSALS LIST SCREEN ============ -->
    ${(vals.isListScreen) ? `
    <div class="panel">
      <div class="list-toolbar">
        <div>
          <h2 class="panel-title">Saved Proposals</h2>
          <div class="panel-hint">Stored in this browser. Open one to continue editing, or start a new proposal.</div>
        </div>
        <button class="btn" style="background:var(--snn-blue);color:#fff;" data-h-click="${H(vals.newProposal)}">+ New Proposal</button>
      </div>

      <div class="pipeline-strip no-print">
        <div class="pipeline-stat">
          <div class="pipeline-num">${esc(vals.proposalsSummary.count)}</div>
          <div class="pipeline-label">Total proposals</div>
        </div>
        <div class="pipeline-stat">
          <div class="pipeline-num">${esc(vals.proposalsSummary.activeValueDisplay)}</div>
          <div class="pipeline-label">Active pipeline (Sent + Negotiating)</div>
        </div>
        <div class="pipeline-stat">
          <div class="pipeline-num">${esc(vals.proposalsSummary.wonValueDisplay)}</div>
          <div class="pipeline-label">Won (${esc(vals.proposalsSummary.wonCount)})</div>
        </div>
      </div>

      <div class="field no-print" style="max-width:360px;margin-bottom:18px;">
        <label>Search</label>
        <input type="text" value="${escAttr(vals.proposalSearchValue)}" data-h-change="${H(vals.onProposalSearchChange)}" placeholder="Search by client, campaign or contact...">
      </div>

      ${(vals.hasProposals) ? `
      <table class="proplist">
        <thead><tr><th>Client</th><th>Campaign</th><th>Date</th><th>Value</th><th>Status</th><th></th></tr></thead>
        <tbody>
          ${(vals.proposalRows || []).map(function(row){ return `
            <tr>
              <td><span class="row-client">${esc(row.company)}</span>${(row.isDemo) ? `<span class="demo-tag">DEMO</span>` : ""}<div class="row-sub">${esc(row.contact)}</div></td>
              <td>${esc(row.campaign)}</td>
              <td>${esc(row.dateDisplay)}</td>
              <td>${esc(row.valueDisplay)}</td>
              <td><span class="status-tag" style="${escAttr(row.statusStyle)}">${esc(row.status)}</span></td>
              <td>
                ${(row.confirmingDelete) ? `
                  <div class="confirm-bar">
                    <span>Delete?</span>
                    <button class="link-btn danger" data-h-click="${H(row.onConfirmDelete)}">Yes</button>
                    <button class="link-btn" data-h-click="${H(row.onCancelDelete)}">No</button>
                  </div>
                ` : ""}
                ${(row.showActions) ? `
                  <div class="row-actions">
                    <button class="link-btn" data-h-click="${H(row.onOpen)}">Open</button>
                    <button class="link-btn" data-h-click="${H(row.onDuplicate)}">Duplicate</button>
                    <button class="link-btn danger" data-h-click="${H(row.onAskDelete)}">Delete</button>
                  </div>
                ` : ""}
              </td>
            </tr>
          `; }).join("")}
        </tbody>
      </table>
      ` : ""}
      ${(vals.hasNoProposalsAtAll) ? `
        <div class="empty-state">No saved proposals yet. Build one and click Save to add it to this list.</div>
      ` : ""}
      ${(vals.hasNoSearchResults) ? `
        <div class="empty-state">No proposals match "${esc(vals.proposalSearchValue)}". <button class="link-btn" data-h-click="${H(vals.onClearProposalSearch)}" style="margin-left:6px;">Clear search</button></div>
      ` : ""}
    </div>
    ` : ""}

    <!-- ============ BUILDER SCREEN ============ -->
    ${(vals.isBuilderScreen) ? `

      <!-- 1. CLIENT DETAILS -->
      ${(vals.isClientTab) ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Client Details</h2>
          <div class="panel-hint">Who the proposal is for, and the campaign it covers.</div>
        </div>
        <div class="grid grid-2">
          <div class="field"><label>Company / Brand</label><input type="text" value="${escAttr(vals.client.company)}" data-h-change="${H(vals.client.onCompany)}" placeholder="e.g. Highland Peaks Distillery"></div>
          <div class="field"><label>Industry</label><input type="text" value="${escAttr(vals.client.industry)}" data-h-change="${H(vals.client.onIndustry)}" placeholder="e.g. Spirits &amp; hospitality"></div>
          <div class="field"><label>Contact Name</label><input type="text" value="${escAttr(vals.client.contactName)}" data-h-change="${H(vals.client.onContactName)}" placeholder="e.g. Fiona Mackenzie"></div>
          <div class="field"><label>Contact Job Title</label><input type="text" value="${escAttr(vals.client.contactTitle)}" data-h-change="${H(vals.client.onContactTitle)}" placeholder="e.g. Marketing Director"></div>
          <div class="field"><label>Email</label><input type="email" value="${escAttr(vals.client.email)}" data-h-change="${H(vals.client.onEmail)}" placeholder="name@client.co.uk"></div>
          <div class="field"><label>Website</label><input type="text" value="${escAttr(vals.client.website)}" data-h-change="${H(vals.client.onWebsite)}" placeholder="www.client.co.uk"></div>
          <div class="field"><label>Campaign Name</label><input type="text" value="${escAttr(vals.client.campaignName)}" data-h-change="${H(vals.client.onCampaignName)}" placeholder="e.g. 2026/27 Season Partnership"></div>
          <div class="field"><label>Proposal Date</label><input type="date" value="${escAttr(vals.client.proposalDate)}" data-h-change="${H(vals.client.onProposalDate)}"></div>
          <div class="field"><label>Campaign Start Date</label><input type="date" value="${escAttr(vals.client.startDate)}" data-h-change="${H(vals.client.onStartDate)}"></div>
          <div class="field"><label>Campaign End Date</label><input type="date" value="${escAttr(vals.client.endDate)}" data-h-change="${H(vals.client.onEndDate)}"></div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Load from Deal Tracker</h2>
          <div class="panel-hint">Search the SNN Sports Deal Tracker snapshot (synced ${esc(vals.crm.syncedDisplay)}) and pull a prospect's details straight in. This is a manual snapshot, not a live link — ask Claude to refresh it with the latest deals and leads whenever you need up-to-date records.</div>
        </div>
        <div class="field">
          <label>Search company or contact</label>
          <input type="text" value="${escAttr(vals.crm.search)}" data-h-change="${H(vals.crm.onSearch)}" placeholder="Start typing a company or contact name...">
        </div>
        ${(vals.crm.hasResults) ? `
          <div class="crm-results">
            ${(vals.crm.results || []).map(function(r){ return `
              <div class="crm-result">
                <div class="crm-result-main">
                  <span class="crm-result-name">${esc(r.name)}</span>
                  <span class="crm-result-stage">${esc(r.stage)}</span>
                </div>
                <div class="crm-result-sub">${esc(r.subline)}</div>
                <button class="link-btn" data-h-click="${H(r.onUse)}">Use this</button>
              </div>
            `; }).join("")}
          </div>
        ` : ""}
        ${(vals.crm.hasNoResults) ? `
          <div class="empty-state" style="padding:14px;">No matches in the Deal Tracker snapshot for "${esc(vals.crm.search)}".</div>
        ` : ""}
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Logos</h2>
          <div class="panel-hint">Optional. Uploaded logos appear on the proposal cover page.</div>
        </div>
        <div class="grid grid-2">
          <div class="field">
            <label>Client Logo</label>
            <div class="logo-drop">
              <div class="logo-preview">
                ${(vals.logos.hasClient) ? `<img src="${escAttr(vals.logos.clientSrc)}">` : ""}
                ${(vals.logos.hasNoClient) ? `<span style="font-size:10px;color:var(--ink-faint);text-align:center;">No logo — company name will be used</span>` : ""}
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                <div class="file-btn btn" style="border:1px solid var(--line-strong);color:var(--ink);"><input type="file" accept="image/*" data-h-change="${H(vals.logos.onClientUpload)}">Upload logo</div>
                ${(vals.logos.hasClient) ? `<button class="link-btn" data-h-click="${H(vals.logos.onClientRemove)}">Remove</button>` : ""}
              </div>
            </div>
          </div>
          <div class="field">
            <label>SNN Sports Logo (optional override)</label>
            <div class="logo-drop">
              <div class="logo-preview">
                ${(vals.logos.hasSnn) ? `<img src="${escAttr(vals.logos.snnSrc)}">` : ""}
                ${(vals.logos.hasNoSnn) ? `<span style="font-size:10px;color:var(--ink-faint);text-align:center;">Using SNN wordmark</span>` : ""}
              </div>
              <div style="display:flex;flex-direction:column;gap:8px;">
                <div class="file-btn btn" style="border:1px solid var(--line-strong);color:var(--ink);"><input type="file" accept="image/*" data-h-change="${H(vals.logos.onSnnUpload)}">Upload logo</div>
                ${(vals.logos.hasSnn) ? `<button class="link-btn" data-h-click="${H(vals.logos.onSnnRemove)}">Remove</button>` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      ` : ""}

      <!-- 2. CAMPAIGN OBJECTIVE -->
      ${(vals.isObjectivesTab) ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Campaign Objective</h2>
          <div class="panel-hint">Select one or more — this shapes the Opportunity section of the proposal.</div>
        </div>
        <div class="chiprow">
          ${(vals.objectivesList || []).map(function(o){ return `
            <button class="${escAttr(o.chipClass)}" data-h-click="${H(o.onToggle)}">${esc(o.label)}</button>
          `; }).join("")}
        </div>
        <div class="field" style="margin-top:22px;">
          <label>Campaign objectives / notes</label>
          <textarea rows="4" data-h-change="${H(vals.onObjectivesNotesChange)}" placeholder="Any additional context on what the client is trying to achieve...">${esc(vals.objectivesNotes)}</textarea>
        </div>
      </div>
      ` : ""}

      <!-- 3. PACKAGE BUILDER -->
      ${(vals.isPackageTab) ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Package Builder</h2>
          <div class="panel-hint">Add deliverables. Everything here is editable and removable.</div>
        </div>

        ${(vals.hasDeliverables) ? `
          ${(vals.deliverables || []).map(function(d){ return `
            <div class="deliv-card">
              <div class="deliv-top">
                <span class="deliv-index">Deliverable ${esc(d.index)}</span>
                <button class="icon-btn" data-h-click="${H(d.onRemove)}" title="Remove">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6"></path></svg>
                </button>
              </div>
              <div class="grid grid-2">
                <div class="field" style="grid-column:1/-1;"><label>Deliverable Name</label><input type="text" value="${escAttr(d.name)}" data-h-change="${H(d.onName)}" placeholder="e.g. Sponsored social posts"></div>
                <div class="field" style="grid-column:1/-1;"><label>Description</label><textarea rows="2" data-h-change="${H(d.onDescription)}" placeholder="What this involves...">${esc(d.description)}</textarea></div>
                <div class="field"><label>Quantity</label><input type="text" value="${escAttr(d.quantity)}" data-h-change="${H(d.onQuantity)}" placeholder="e.g. 4"></div>
                <div class="field"><label>Frequency</label><input type="text" value="${escAttr(d.frequency)}" data-h-change="${H(d.onFrequency)}" placeholder="e.g. Weekly"></div>
                <div class="field"><label>Duration</label><input type="text" value="${escAttr(d.duration)}" data-h-change="${H(d.onDuration)}" placeholder="e.g. Throughout campaign"></div>
                <div class="field"><label>Notes (optional)</label><input type="text" value="${escAttr(d.notes)}" data-h-change="${H(d.onNotes)}" placeholder="Optional notes"></div>
              </div>
            </div>
          `; }).join("")}
        ` : ""}
        ${(vals.hasNoDeliverables) ? `
          <div class="empty-state">No deliverables added yet. Use a suggestion below or add a blank deliverable.</div>
        ` : ""}

        <div style="margin-top:16px;">
          <button class="btn" style="background:var(--snn-blue);color:#fff;" data-h-click="${H(vals.onAddBlankDeliverable)}">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"></path></svg>
            Add Deliverable
          </button>
        </div>

        <div class="suggest-row">
          ${(vals.deliverableSuggestions || []).map(function(s){ return `
            <button class="suggest-chip" data-h-click="${H(s.onAdd)}">+ ${esc(s.label)}</button>
          `; }).join("")}
        </div>
      </div>
      ` : ""}

      <!-- 4. COMMERCIAL TERMS -->
      ${(vals.isCommercialTab) ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Commercial Terms</h2>
          <div class="panel-hint">Choose a pricing model, then enter the figures — totals update automatically.</div>
        </div>

        <div class="field" style="margin-bottom:18px;">
          <label>Pricing Model</label>
          <div class="segrow">
            ${(vals.pricingModels || []).map(function(m){ return `
              <button class="${escAttr(m.className)}" data-h-click="${H(m.onSelect)}">${esc(m.label)}<span class="seg-sub">${esc(m.sub)}</span></button>
            `; }).join("")}
          </div>
        </div>

        <div class="grid grid-3">
          ${(vals.commercial.showMonthlyFee) ? `
            <div class="field"><label>Monthly Fee (£)</label><input type="number" min="0" step="0.01" value="${escAttr(vals.commercial.monthlyFee)}" data-h-change="${H(vals.commercial.onMonthlyFee)}"></div>
          ` : ""}
          ${(vals.commercial.showOneOffFee) ? `
            <div class="field"><label>One-off Campaign Fee (£)</label><input type="number" min="0" step="0.01" value="${escAttr(vals.commercial.oneOffFee)}" data-h-change="${H(vals.commercial.onOneOffFee)}"></div>
          ` : ""}
          <div class="field"><label>Setup Fee (£)</label><input type="number" min="0" step="0.01" value="${escAttr(vals.commercial.setupFee)}" data-h-change="${H(vals.commercial.onSetupFee)}"></div>
          <div class="field"><label>Campaign Duration (months)</label><input type="number" min="0" step="1" value="${escAttr(vals.commercial.durationMonths)}" data-h-change="${H(vals.commercial.onDurationMonths)}"></div>
          <div class="field"><label>Commission (%)</label><input type="number" min="0" step="0.1" value="${escAttr(vals.commercial.commissionPercent)}" data-h-change="${H(vals.commercial.onCommissionPercent)}"></div>
        </div>

        <div class="grid grid-3" style="margin-top:16px;">
          <div class="field">
            <label>Discount</label>
            <div class="segrow">
              ${(vals.discountTypes || []).map(function(dt){ return `
                <button class="${escAttr(dt.className)}" data-h-click="${H(dt.onSelect)}">${esc(dt.label)}</button>
              `; }).join("")}
            </div>
          </div>
          <div class="field"><label>Discount Value ${esc(vals.discountUnitLabel)}</label><input type="number" min="0" step="0.01" value="${escAttr(vals.commercial.discountValue)}" data-h-change="${H(vals.commercial.onDiscountValue)}"></div>
          <div class="field">
            <label>VAT</label>
            <select data-value="${escAttr(vals.commercial.vatOption)}" data-h-change="${H(vals.commercial.onVatOption)}">
              ${(vals.vatOptions || []).map(function(v){ return `
                <option value="${escAttr(v.value)}">${esc(v.label)}</option>
              `; }).join("")}
            </select>
          </div>
        </div>
        ${(vals.commercial.showVatRate) ? `
          <div class="grid grid-3" style="margin-top:16px;">
            <div class="field"><label>VAT Rate (%)</label><input type="number" min="0" step="0.5" value="${escAttr(vals.commercial.vatRate)}" data-h-change="${H(vals.commercial.onVatRate)}"></div>
          </div>
        ` : ""}

        <div style="margin-top:20px;">
          <label style="font-size:12px;font-weight:700;color:var(--ink-soft);text-transform:uppercase;letter-spacing:0.04em;display:block;margin-bottom:10px;">Performance-based Commission</label>
          <div class="checkbox-row">
            <input type="checkbox" ${vals.commercial.performanceEnabled ? "checked" : ""} data-h-change="${H(vals.commercial.onPerformanceEnabled)}">
            <div>
              <div class="cb-label">Include an optional performance-based commission arrangement</div>
              <div class="cb-sub">Describe the arrangement below — this is shown alongside the fixed fee, not instead of it.</div>
            </div>
          </div>
          ${(vals.commercial.performanceEnabled) ? `
            <div class="field" style="margin-top:12px;"><textarea rows="2" data-h-change="${H(vals.commercial.onPerformanceNotes)}" placeholder="e.g. Additional 5% commission on sales directly attributed to tracked campaign links">${esc(vals.commercial.performanceNotes)}</textarea></div>
          ` : ""}
        </div>

        <div style="margin-top:22px;">
          <div class="totals-card">
            <div class="totals-line"><span>Subtotal</span><span class="val">${esc(vals.totals.baseDisplay)}</span></div>
            ${(vals.totals.hasDiscount) ? `
              <div class="totals-line"><span>Discount</span><span class="val">−${esc(vals.totals.discountDisplay)}</span></div>
            ` : ""}
            ${(vals.totals.showVatLine) ? `
              <div class="totals-line"><span>${esc(vals.totals.vatLineLabel)}</span><span class="val">${esc(vals.totals.vatDisplay)}</span></div>
            ` : ""}
            <div class="totals-line emph"><span>Total Campaign Value</span><span class="val">${esc(vals.totals.totalDisplay)}</span></div>
            ${(vals.totals.showMonthlyEquivalent) ? `
              <div class="totals-line"><span>Monthly Equivalent</span><span class="val">${esc(vals.totals.monthlyEquivalentDisplay)}</span></div>
            ` : ""}
            ${(vals.totals.hasCommission) ? `
              <div class="totals-line"><span>Commission (${esc(vals.totals.commissionPercentDisplay)})</span><span class="val">${esc(vals.totals.potentialCommissionDisplay)}</span></div>
            ` : ""}
          </div>
        </div>

        <div class="checkbox-row" style="margin-top:18px;">
          <input type="checkbox" ${vals.commercial.includeCommissionInProposal ? "checked" : ""} data-h-change="${H(vals.commercial.onIncludeCommission)}">
          <div>
            <div class="cb-label">Show commission figures in the client-facing proposal</div>
            <div class="cb-sub">Off by default. Commission and margin stay internal-only unless you switch this on.</div>
          </div>
        </div>

        <div class="internal-block" style="margin-top:22px;">
          <div class="internal-tag">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"></path></svg>
            Private notes — never printed or included in the proposal
          </div>
          <div class="grid grid-2">
            <div class="field"><label>Internal Notes</label><textarea rows="3" data-h-change="${H(vals.commercial.onInternalNotes)}" placeholder="Approval status, negotiation notes, risk flags...">${esc(vals.commercial.internalNotes)}</textarea></div>
            <div class="field"><label>Margin Notes</label><textarea rows="3" data-h-change="${H(vals.commercial.onMarginNotes)}" placeholder="Cost basis, margin expectations...">${esc(vals.commercial.marginNotes)}</textarea></div>
          </div>
        </div>
      </div>
      ` : ""}

      <!-- AUDIENCE STATS -->
      ${(vals.isStatsTab) ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Audience Stats</h2>
          <div class="panel-hint">These headline figures appear on page 3 of every proposal. Keep them current.</div>
        </div>
        <div class="grid grid-2">
          ${(vals.statsFields || []).map(function(st){ return `
            <div class="field"><label>${esc(st.label)}</label><input type="text" value="${escAttr(st.value)}" data-h-change="${H(st.onValue)}"></div>
          `; }).join("")}
        </div>
      </div>
      ` : ""}

      <!-- TERMS & CONDITIONS -->
      ${(vals.isTermsTab) ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Terms &amp; Conditions</h2>
          <div class="panel-hint">Appears on page 8 of the proposal. This is a starting template — have it reviewed by a solicitor before relying on it for higher-value or regulated agreements.</div>
        </div>
        <div class="field terms-field">
          <label>Terms text</label>
          <textarea rows="18" data-h-change="${H(vals.terms.onChange)}">${esc(vals.terms.value)}</textarea>
        </div>
        <div class="no-print" style="margin-top:14px;font-size:12px;color:var(--ink-faint);line-height:1.6;">
          Longer terms automatically continue onto as many extra pages as needed in the exported PDF — nothing is cut off.
        </div>
      </div>
      ` : ""}

      <!-- SIGN-OFF -->
      ${(vals.isSignatureTab) ? `
      <div class="panel">
        <div class="panel-head">
          <h2 class="panel-title">Sign-off</h2>
          <div class="panel-hint">Export the proposal from the Preview tab and send it to your client to sign — by hand (print, sign and scan back) or with their own e-signature tool. Once they've returned it signed, record the details below so the final page shows a clean, completed record for your files.</div>
        </div>
        <div class="sig-grid">
          <div class="sig-card">
            <h3>Client</h3>
            <div class="grid" style="gap:12px;">
              <div class="field"><label>Full Name (as signed)</label><input type="text" value="${escAttr(vals.signature.clientName)}" data-h-change="${H(vals.signature.onClientName)}" placeholder="Fill in once they've signed and returned it"></div>
              <div class="field"><label>Job Title</label><input type="text" value="${escAttr(vals.signature.clientTitle)}" data-h-change="${H(vals.signature.onClientTitle)}" placeholder="e.g. Marketing Director"></div>
              <div class="field"><label>Date Signed</label><input type="date" value="${escAttr(vals.signature.clientDate)}" data-h-change="${H(vals.signature.onClientDate)}"></div>
            </div>
            <div class="checkbox-row accept-row">
              <input type="checkbox" ${vals.signature.accepted ? "checked" : ""} data-h-change="${H(vals.signature.onAccepted)}">
              <div>
                <div class="cb-label">Client has signed and accepted the Terms &amp; Conditions</div>
                <div class="cb-sub">Tick once you've received their signed copy back. Keep their signed PDF or scan as the actual record — this just reflects that status here.</div>
              </div>
            </div>
          </div>
          <div class="sig-card">
            <h3>SNN Sports</h3>
            <div class="grid" style="gap:12px;">
              <div class="field"><label>Typed Signature (full name)</label><input type="text" value="${escAttr(vals.signature.snnName)}" data-h-change="${H(vals.signature.onSnnName)}"></div>
              <div class="field"><label>Job Title</label><input type="text" value="${escAttr(vals.signature.snnTitle)}" data-h-change="${H(vals.signature.onSnnTitle)}"></div>
              <div class="field"><label>Date Signed</label><input type="date" value="${escAttr(vals.signature.snnDate)}" data-h-change="${H(vals.signature.onSnnDate)}"></div>
            </div>
          </div>
        </div>
      </div>
      ` : ""}

      <!-- 5. PROPOSAL PREVIEW -->
      ${(vals.isPreviewTab) ? `

      <div class="preview-toolbar no-print">
        <div class="note">This preview shows the 10 core sections. If Terms &amp; Conditions, Deliverables or the Opportunity summary run long, your exported PDF automatically continues them onto extra pages — the PDF always has exactly as many pages as your proposal actually needs, never fewer, never blank ones.</div>
        <div style="display:flex;gap:8px;align-items:center;">
          <button class="link-btn" data-h-click="${H(vals.goEditFromPreview)}">Edit Details</button>
          <button class="btn" data-h-click="${H(vals.onSavePdf)}" ${vals.pdfBusy ? "disabled" : ""} style="background:var(--snn-blue);color:#fff;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font:inherit;">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-2M6 14h12v7H6z"></path></svg>
            ${esc(vals.pdfButtonLabel)}
          </button>
        </div>
      </div>

      ${(vals.hasPdfError) ? `
        <div class="no-print" style="margin-bottom:16px;padding:12px 14px;background:#fdf0f0;border:1px solid #c94747;border-radius:8px;font-size:12.5px;color:#7a1f1f;">
          <strong>PDF generation failed:</strong> ${esc(vals.pdfError)}
        </div>
      ` : ""}

      <div class="proposal-pages">

        <!-- PAGE 1 — COVER -->
        <div class="pg pg-cover">
          <div class="cover-top">
            <div class="cover-snn-mark">SNN SPORTS</div>
          </div>
          <div>
            <div class="cover-kicker">Sponsorship &amp; Media Partnership Proposal</div>
            <h1 class="cover-title">${esc(vals.preview.campaignTitle)}</h1>
            <div class="cover-campaign">${esc(vals.preview.campaignDateRange)}</div>
            <div class="cover-client-row">
              <div class="cover-client-logo">
                ${(vals.logos.hasClient) ? `<img src="${escAttr(vals.logos.clientSrc)}">` : ""}
                ${(vals.logos.hasNoClient) ? `<span style="font-family:'Space Grotesk',sans-serif;font-weight:700;color:var(--snn-blue);font-size:22px;">${esc(vals.preview.clientInitial)}</span>` : ""}
              </div>
              <div class="cover-client-name">${esc(vals.preview.clientNameDisplay)}</div>
            </div>
          </div>
          <div class="cover-bottom">
            <div>
              <div class="cover-prepared-label">Prepared by</div>
              <div class="cover-prepared-name">Lee Anderson</div>
              <div class="cover-prepared-sub">CEO, SNN Sports</div>
            </div>
            <div class="cover-date">${esc(vals.preview.proposalDateDisplay)}</div>
          </div>
        </div>

        <!-- PAGE 2 — ABOUT -->
        <div class="pg">
          <div class="pg-kicker">SNN Sports</div>
          <h2 class="pg-title">About SNN Sports</h2>
          <div class="about-copy">
            <p>SNN Sports is a Scottish sports media platform built around football, delivering daily coverage and analysis across social, video and digital platforms. We follow the game closely — match by match, story by story — and put that coverage in front of an audience that is genuinely engaged with Scottish football.</p>
            <p>Our content spans social video, matchday coverage, written articles and long-form features, distributed across Facebook, Instagram, TikTok, X and YouTube as well as our own website. That multi-platform approach lets us reach our audience where they already spend their time, rather than asking them to come to us.</p>
            <p>For commercial partners, SNN Sports offers a direct route into a Scottish football audience through content that sits naturally alongside the coverage that audience already follows — rather than as separate, disconnected advertising.</p>
          </div>
          <div class="about-entity">SNN Sports is operated by 1606 Ltd t/a SNN Sports · www.snnsports.co.uk</div>
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 2 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 3 — AUDIENCE -->
        <div class="pg">
          <div class="pg-kicker">Our Audience</div>
          <h2 class="pg-title">Reach &amp; Engagement</h2>
          <div class="stats-grid">
            ${(vals.preview.statsTiles || []).map(function(st){ return `
              <div class="stat-tile">
                <div class="stat-num">${esc(st.value)}</div>
                <div class="stat-label">${esc(st.label)}</div>
                ${(st.hasSub) ? `<div class="stat-sub">${esc(st.sublabel)}</div>` : ""}
              </div>
            `; }).join("")}
          </div>
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 3 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 4 — OPPORTUNITY -->
        <div class="pg">
          <div class="pg-kicker">The Opportunity</div>
          <h2 class="pg-title">Why This Partnership, For ${esc(vals.preview.clientNameShort)}</h2>
          ${(vals.preview.hasObjectiveTags) ? `
            <div class="opp-tags">
              ${(vals.preview.objectiveTags || []).map(function(tag){ return `
                <span class="opp-tag">${esc(tag.label)}</span>
              `; }).join("")}
            </div>
          ` : ""}
          ${(vals.preview.opportunityParagraphs || []).map(function(para){ return `
            <div class="opp-para">${esc(para.text)}</div>
          `; }).join("")}
          ${(vals.preview.opportunityNotesPresent) ? `
            <div class="opp-para" style="margin-top:14px;"><strong>Additional context: </strong>${esc(vals.objectivesNotes)}</div>
          ` : ""}
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 4 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 5 — PROPOSED PARTNERSHIP -->
        <div class="pg">
          <div class="pg-kicker">Proposed Partnership</div>
          <h2 class="pg-title">Deliverables</h2>
          ${(vals.preview.hasDeliverables) ? `
            ${(vals.preview.deliverables || []).map(function(d){ return `
              <div class="pdeliv">
                <div class="pdeliv-name">${esc(d.name)}</div>
                ${(d.hasMeta) ? `<div class="pdeliv-meta">${esc(d.meta)}</div>` : ""}
                ${(d.hasDescription) ? `<div class="pdeliv-desc">${esc(d.description)}</div>` : ""}
                ${(d.hasNotes) ? `<div class="pdeliv-notes">${esc(d.notes)}</div>` : ""}
              </div>
            `; }).join("")}
          ` : ""}
          ${(vals.preview.hasNoDeliverables) ? `
            <div class="empty-state">No deliverables added yet — add them in the Package Builder tab.</div>
          ` : ""}
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 5 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 6 — INVESTMENT -->
        <div class="pg">
          <div class="pg-kicker">Investment</div>
          <h2 class="pg-title">Commercial Terms</h2>
          ${(vals.preview.investmentLines || []).map(function(ln){ return `
            <div class="${escAttr(ln.className)}"><span>${esc(ln.label)}</span><span class="val">${esc(ln.value)}</span></div>
          `; }).join("")}
          <div class="inv-note">${esc(vals.preview.vatFootnote)}</div>
          ${(vals.preview.hasPerformanceNote) ? `
            <div class="inv-note"><strong>Performance-based commission: </strong>${esc(vals.commercial.performanceNotes)}</div>
          ` : ""}
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 6 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 7 — WHY SNN SPORTS -->
        <div class="pg">
          <div class="pg-kicker">Why SNN Sports</div>
          <h2 class="pg-title">A Direct Route Into Scottish Football</h2>
          <div class="why-list">
            ${(vals.whyPoints || []).map(function(w){ return `
              <div class="why-item">
                <div class="why-check">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"></path></svg>
                </div>
                <div class="why-text">${esc(w.text)}</div>
              </div>
            `; }).join("")}
          </div>
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 7 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 8 — TERMS & CONDITIONS -->
        <div class="pg">
          <div class="pg-kicker">Terms &amp; Conditions</div>
          <h2 class="pg-title">Terms &amp; Conditions</h2>
          <div class="terms-text">${esc(vals.terms.value)}</div>
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 8 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 9 — NEXT STEPS -->
        <div class="pg">
          <div class="pg-kicker">Next Steps</div>
          <h2 class="pg-title">Taking This Forward</h2>
          <div class="next-copy">${esc(vals.preview.nextStepsCopy)}</div>
          <div class="contact-card">
            <div class="contact-name">Lee Anderson</div>
            <div class="contact-role">CEO, SNN Sports</div>
            <div class="contact-links">
              <span>lee@snnsports.co.uk</span>
              <span>www.snnsports.co.uk</span>
            </div>
          </div>
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 9 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

        <!-- PAGE 10 — ACCEPTANCE & SIGNATURE -->
        <div class="pg">
          <div class="pg-kicker">Proposal Acceptance</div>
          <h2 class="pg-title">Sign-off</h2>
          ${(vals.preview.acceptedTerms) ? `
            <div class="accept-banner yes">
              <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"></path></svg>
              Terms &amp; Conditions accepted by the client
            </div>
          ` : ""}
          ${(vals.preview.notAcceptedTerms) ? `
            <div class="accept-banner no">Awaiting client sign-off</div>
          ` : ""}
          <div class="sig-block">
            <div class="sig-role">Signed for and on behalf of ${esc(vals.preview.clientNameShort)}</div>
            ${(vals.preview.hasClientSignature) ? `<div class="sig-script">${esc(vals.signature.clientName)}</div>` : ""}
            ${(vals.preview.hasNoClientSignature) ? `<div class="sig-script empty">Awaiting client signature</div>` : ""}
            <div class="sig-meta"><span>${esc(vals.signature.clientTitle)}</span><span>${esc(vals.preview.clientSignatureDateDisplay)}</span></div>
          </div>
          <div class="sig-block">
            <div class="sig-role">Signed for and on behalf of SNN Sports</div>
            ${(vals.preview.hasSnnSignature) ? `<div class="sig-script">${esc(vals.signature.snnName)}</div>` : ""}
            ${(vals.preview.hasNoSnnSignature) ? `<div class="sig-script empty">Awaiting SNN Sports signature</div>` : ""}
            <div class="sig-meta"><span>${esc(vals.signature.snnTitle)}</span><span>${esc(vals.preview.snnSignatureDateDisplay)}</span></div>
          </div>
          <div class="sig-disclaimer">This page may be printed and signed by hand, signed digitally using your own e-signature tool, or completed here by typing a full name in place of a handwritten signature. This proposal, once signed by both parties, is intended to form a binding agreement on the terms set out on the preceding pages.</div>
          <div class="pg-foot"><span>SNN Sports — Sponsorship Proposal</span><span>Page 10 of 10</span><span>${esc(vals.preview.footerRight)}</span></div>
        </div>

      </div>
      ` : ""}

      <!-- BOTTOM BAR: wizard nav + autosave note + clear form (hidden on Preview tab) -->
      ${(vals.showBottomBar) ? `
      <div class="panel no-print">
        <div class="bottom-bar-row">
          ${(vals.wizard.hasPrev) ? `
            <button class="link-btn" data-h-click="${H(vals.wizard.onPrev)}">← Back: ${esc(vals.wizard.prevLabel)}</button>
          ` : ""}
          ${(vals.wizard.hasNoPrev) ? `<span></span>` : ""}
          <div class="panel-hint" style="text-align:center;">Changes save to this browser automatically as you type. Click Save to add this proposal to your list.</div>
          ${(vals.wizard.hasNext) ? `
            <button class="btn" style="background:var(--snn-blue);color:#fff;" data-h-click="${H(vals.wizard.onNext)}">Continue: ${esc(vals.wizard.nextLabel)} →</button>
          ` : ""}
          ${(vals.wizard.hasNoNext) ? `<span></span>` : ""}
        </div>
        <div class="bottom-bar-row" style="justify-content:flex-end;">
          ${(vals.confirmingClear) ? `
            <div class="confirm-bar"><span>Clear all fields on this proposal?</span><button class="link-btn danger" data-h-click="${H(vals.onConfirmClear)}">Yes, clear</button><button class="link-btn" data-h-click="${H(vals.onCancelClear)}">Cancel</button></div>
          ` : ""}
          ${(vals.notConfirmingClear) ? `
            <button class="link-btn danger" data-h-click="${H(vals.onAskClear)}">Clear Form</button>
          ` : ""}
        </div>
      </div>
      ` : ""}

    ` : ""}

  </div>
</div>

`;
}
