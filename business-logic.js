

var OBJECTIVE_OPTIONS = ["Brand Awareness","Product Awareness","Website Traffic","Lead Generation","Sales","Event Promotion","Content Partnership","Sponsorship","Long-Term Brand Partnership"];

var DELIVERABLE_SUGGESTIONS = ["Sponsored social posts","Video integrations","Matchday content","Website articles","Website banners","Competition / giveaway","Podcast sponsorship","Interview / content feature","Event promotion","Branded graphics","Instagram Reels","TikTok videos","Facebook posts","X posts","YouTube integrations"];

var STATUS_OPTIONS = ["Draft","Sent","Negotiating","Won","Lost"];

var PRICING_MODELS = [
  {id:"monthly", label:"Monthly", sub:"Recurring retainer"},
  {id:"oneoff", label:"One-off", sub:"Single campaign fee"},
  {id:"monthly_commission", label:"Monthly + Commission", sub:"Retainer plus %"},
  {id:"oneoff_commission", label:"One-off + Commission", sub:"Campaign fee plus %"},
  {id:"custom", label:"Custom", sub:"Bespoke combination"}
];

var VAT_OPTIONS = [
  {value:"exclusive", label:"Exclusive — VAT added on top"},
  {value:"inclusive", label:"Inclusive — VAT included in price"},
  {value:"none", label:"Not applicable"}
];

var DEFAULT_STATS = [
  {id:"followers", label:"Followers across social platforms", value:"135,000+", sublabel:"Facebook, Instagram, TikTok, X and YouTube"},
  {id:"views", label:"Monthly UK content views", value:"17.5M+", sublabel:""},
  {id:"visitors", label:"Monthly website visitors", value:"200,000+", sublabel:""},
  {id:"engagement", label:"Engagement rate", value:"11–14%", sublabel:""},
  {id:"matches", label:"Matches covered since Aug 2024", value:"150+", sublabel:""},
  {id:"male", label:"Male audience", value:"~80%", sublabel:""},
  {id:"core", label:"Core audience", value:"Men 25–55", sublabel:""},
  {id:"region", label:"Audience concentration", value:"Scotland — Edinburgh & the Central Belt", sublabel:""}
];

var WHY_POINTS = [
  "An engaged Scottish football audience that follows the game closely, not a passive general-sports crowd.",
  "A strong male 25–55 demographic — a group that is often hard for brands to reach through traditional channels.",
  "Multi-platform distribution across Facebook, Instagram, TikTok, X, YouTube and our own website.",
  "Consistent, season-long football coverage rather than one-off content bursts.",
  "Flexible commercial partnerships, built around what each brand actually needs.",
  "The ability to integrate brands naturally into sports content, rather than as separate advertising."
];

var STATUS_STYLES = {
  "Draft":"color:var(--st-draft-fg);background:var(--st-draft-bg);",
  "Sent":"color:var(--st-sent-fg);background:var(--st-sent-bg);",
  "Negotiating":"color:var(--st-nego-fg);background:var(--st-nego-bg);",
  "Won":"color:var(--st-won-fg);background:var(--st-won-bg);",
  "Lost":"color:var(--st-lost-fg);background:var(--st-lost-bg);"
};

var CRM_SYNCED_AT = "2026-09-21T08:17:23Z";
var CRM_PROSPECTS = [{"name":"32Red (Kindred Group)","contactName":"Sam Mead, GM UK","email":"press@kindredgroup.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"32Red / Kindred — Football Voices","contactName":"Sam Mead, GM UK","email":"","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Original send bounced; re-sent to a working address 14 Sept."},{"name":"A1 Training Services","contactName":"Jo","email":"info@a1trainingservices.co.uk","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Replied 16 Sept — original 23 Jul pitch had landed in spam; apologised, said she's just made charitable donations but happy to keep in touch re future support."},{"name":"AK Positive","contactName":"Karol","email":"info@akpositive.com","phone":"07955398484","website":"","stage":"Negotiating","type":"Commercial","note":"Followed up 12 Sept asking which package suits and how to proceed — no reply since. Said \"yes please contact me\" on 9 Sept. Warmest live deal in the pipeline."},{"name":"Amazing Double Glazing","contactName":"","email":"enquiries@amazingdoubleglazing.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Amber Restaurant / Scotch Whisky Experience","contactName":"","email":"info@scotchwhiskyexperience.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Anforh / Man For Himself","contactName":"","email":"management@manforhimself.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Angus & Oink","contactName":"","email":"thegeneral@angusandoink.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Applied Nutrition","contactName":"","email":"marketing@appliednutrition.uk","phone":"","website":"","stage":"Replied / Warm","type":"Commercial","note":"Replied 5 Sept, redirected to marketing team; warm hand-off drafted 7 Sept."},{"name":"Ardnamurchan Distillery","contactName":"","email":"info@ardnamurchandistillery.com","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Cold outreach bounced — address not found, dead contact. World-first PET-bottle single malt via Vinmonopolet — hook still valid if a working contact surfaces."},{"name":"Arnold Clark","contactName":"","email":"","phone":"","website":"","stage":"Negotiating","type":"Commercial","note":"Active positive relationship (separate thread) — not a confirmed closed deal. Corrected 16 Sept per Lee. Active positive relationship, separate thread."},{"name":"At The Accountant","contactName":"Alison Thomson","email":"alison@attheaccountant.com","phone":"","website":"","stage":"Stalled / Lost","type":"Partnership","note":"Alison chased Lee for an update — signed Letter of Engagement back in Aug, but SNN never sent the promised payment or moved on the mutual-promotion swap since 13 Aug. Barter-style partnership: SNN promotes At The..."},{"name":"BarberBoss","contactName":"","email":"care@barberboss.co.uk","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Declined — \"not actively seeking collaboration opportunities\" at this time. Everton FC's first-ever Official Men's Grooming Tech Partner — precedent brand for the grooming-tech vertical."},{"name":"Barclays","contactName":"Tom Corbett, Group Head of Sponsorship","email":"sponsorshipenquiries@barclays.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Barclays — Football Voices","contactName":"Tom Corbett, Group Head of Sponsorship","email":"","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept; hook re-confirmed 11 Sept (Hampden naming-rights/Scottish Cup deal)."},{"name":"bet365","contactName":"","email":"press@bet365.com","phone":"","website":"","stage":"Dead / No contact","type":"","note":"Notoriously closed, no further follow-up planned."},{"name":"bet365 — Football Voices","contactName":"","email":"","phone":"","website":"","stage":"Stalled / Lost","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"BoyleSports","contactName":"","email":"","phone":"","website":"","stage":"Negotiating","type":"Commercial","note":"Live thread re: gala dinner."},{"name":"Brazen Men's Hair","contactName":"Eachan","email":"eachan@brazenmenshair.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"BrewDog","contactName":"Lauren Carrol, COO","email":"pr@brewdog.com","phone":"","website":"","stage":"Dead / No contact","type":"","note":"Inbox bounces permanently, dropped for good."},{"name":"BrewDog — Football Voices","contactName":"","email":"","phone":"","website":"","stage":"Stalled / Lost","type":"Football Voices","note":"Dropped for good — dead PR inbox + weak business case."},{"name":"Brownings the Bakers","contactName":"","email":"","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Declined."},{"name":"C&P Recruitment","contactName":"","email":"edinburgh@cprecruitment.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Capital Credit Union","contactName":"","email":"contactus@capitalcreditunion.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Carlsberg","contactName":"","email":"media@carlsberg.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Carlsberg — Football Voices","contactName":"","email":"media@carlsberg.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Carmoola","contactName":"Anders","email":"anders@carmoola.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Castleton Farm","contactName":"","email":"enquiries@castletonfarm.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Channel Finance Group","contactName":"Mike","email":"mike@channelfinance.co.uk","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"New angle sent 11 Sept (5 NACFB award nominations) — original May gala pitch went unanswered."},{"name":"cinch","contactName":"Jo Kerr, Brand Director","email":"hello@cinch.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"cinch — Football Voices","contactName":"","email":"hello@cinch.co.uk","phone":"","website":"","stage":"Stalled / Lost","type":"Football Voices","note":"Only automated ticket replies in over a week."},{"name":"Clyde Travel Management","contactName":"","email":"sales@clydetravel.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"COCO Chocolatier","contactName":"","email":"sales@cocochocolatier.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Coral (Entain)","contactName":"Bejay Patel, MD UK&I","email":"enquiries@coral.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Coral — Football Voices","contactName":"","email":"enquiries@coral.co.uk","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Cowal Highland Gathering","contactName":"","email":"alexandra@cowalgathering.co.uk","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Cold outreach bounced — address not found, dead contact. Coinneach MacLeod named 2026 Honorary Chieftain — hook still valid if a working contact surfaces."},{"name":"Crowd Legends / 532 Design","contactName":"","email":"contact@532design.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"DataVita","contactName":"","email":"connect@datavita.co.uk","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Cold email blocked/bounced by the recipient's mail server. £850m DV4 data-centre planning application, 2650 construction job-years."},{"name":"DAZN — Football Voices","contactName":"","email":"pr-uk@dazn.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Follow-up sent 18 Sept with new Serie A UK/Ireland rights-renewal angle and Calendly link — second touch; only an automated media-inquiries reply so far. Original £10k Football Voices season sponsorship pitch sent 11..."},{"name":"Dumbarton FC","contactName":"Fraser","email":"fraser@dumbartonfc.co.uk","phone":"","website":"","stage":"Negotiating","type":"Partnership","note":"Fraser replied 18 Sept confirming filming access for the \"day in the life\" video (any game after the next fixture works, high-vis required) — journalist Declan cc'd to arrange a date. Content/video partnership, not a..."},{"name":"Dun Aluinn Hotel","contactName":"","email":"enquiries@dunaluinn.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"EA Sports FC (Electronic Arts)","contactName":"","email":"info@ea.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"EA Sports FC — Football Voices","contactName":"","email":"info@ea.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"EE (BT Group)","contactName":"Matt Stevenson, Head of Sponsorship, Consumer","email":"phyllisia.mccarthy@ee.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"EE — Football Voices","contactName":"Matt Stevenson, Head of Sponsorship","email":"","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Original send bounced; re-sent to a working address 14 Sept."},{"name":"Fanbase","contactName":"Ishika, support","email":"","phone":"","website":"","stage":"Replied / Warm","type":"Partnership","note":"Ishika confirmed she'll follow up again, likely the following week."},{"name":"Fears Watches","contactName":"","email":"press@fearswatches.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Fleet Alliance","contactName":"","email":"info@fleetalliance.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Football Manager (Sports Interactive)","contactName":"","email":"partnerships@sports-interactive.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Football Manager — Football Voices","contactName":"","email":"partnerships@sports-interactive.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Fourteen Twenty-One","contactName":"","email":"sales@fourteentwentyone.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"FreshMex","contactName":"","email":"hello@freshmex.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Global Highland","contactName":"","email":"info@globalhighland.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Hollywoodbets","contactName":"Jack McGowan","email":"jack.mcgowan@hollywoodbets.net","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Hollywoodbets — Football Voices","contactName":"","email":"jack.mcgowan@hollywoodbets.net","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Follow-up sent re: last PL season on shirt before gambling-sponsorship ban, no reply."},{"name":"Homesealed","contactName":"","email":"Sales@homesealed.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"HungryBear Gaming / SlotMasters","contactName":"","email":"jc@hungrybeargaming.com","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Declined 7 Sept — \"not the right fit.\""},{"name":"JD Sports","contactName":"","email":"jdgroup@headlandconsultancy.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"JD Sports — Football Voices","contactName":"","email":"jdgroup@headlandconsultancy.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Jet2","contactName":"Rosie Dale, GM Advertising & Media Partnerships","email":"PressOffice@jet2.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Jet2 — Football Voices","contactName":"","email":"PressOffice@jet2.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Landmark Forest Adventure Park","contactName":"","email":"info@landmarkpark.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"LiveScore Bet","contactName":"Dominic Vye, Marketing Director","email":"","phone":"","website":"","stage":"New","type":"","note":"No public email found — needs LinkedIn."},{"name":"LiveScore Bet — Football Voices","contactName":"Dominic Vye, Marketing Director","email":"","phone":"","website":"","stage":"New Lead","type":"Football Voices","note":"No public email found."},{"name":"Loch Duart","contactName":"Graeme Thomson","email":"graemet@sprengthomson.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Lomond Leisure Group","contactName":"Sophie","email":"sophie@lomondleisure.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Lost Shore","contactName":"Emma Lees, Perceptive Communicators (PR agency for Lost Shore) —","email":"emma.lees@perceptivecommunicators.co.uk","phone":"","website":"","stage":"Replied / Warm","type":"Commercial","note":"PR agency replied with a specific hook — around 400 students from 10 Scottish universities surfing at Lost Shore on 23 Sept. Europe's largest wave pool, 25 minutes from Edinburgh, holds \"World's Best Surf Park\" title."},{"name":"LVLS Aberdeen","contactName":"Charlie Pearson","email":"aberdeen@lvls.co.uk","phone":"","website":"","stage":"Negotiating","type":"Commercial","note":"Lee confirmed 10:30am and sent the meeting invite for the Friday 25 Sept call — call is locked in."},{"name":"Malones","contactName":"","email":"edinburgh@malonesirishbars.com","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Pitched Leith 1 Sept + Dundee-expansion follow-up 8 Sept, no reply either time."},{"name":"Manors Golf","contactName":"","email":"info@manorsgolf.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"MEININGER Edinburgh","contactName":"Pia Berghoefer, Head of PR & Comms","email":"pia.berghoefer@meininger-hotels.com","phone":"","website":"","stage":"Negotiating","type":"Commercial","note":"Pia confirmed 23 Sept works, wanted an in-person meeting; Lee replied 18 Sept proposing a video call instead (he's travelling for business) and asked her to suggest a time. Strong reply — brand's first UK property,..."},{"name":"Midnite","contactName":"Andrew Mook, Head of Brand Marketing","email":"","phone":"","website":"","stage":"New","type":"","note":"No public email found yet — needs LinkedIn."},{"name":"Midnite — Football Voices","contactName":"Andrew Mook, Head of Brand Marketing","email":"","phone":"","website":"","stage":"New Lead","type":"Football Voices","note":"Active 2026 podcast-sponsorship spender, no public email found yet."},{"name":"Mimi's Bakehouse","contactName":"","email":"info@mimisbakehouse.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Moonwake Beer Co","contactName":"","email":"press@moonwakebeer.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"MyPetCard","contactName":"","email":"news@mypetcard.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"NuFibre","contactName":"","email":"press@nufibre.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Ogilvie Fleet","contactName":"","email":"elise.bollard@ogilvie.co.uk","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Follow-up sent 18 Sept referencing MiSalarySacrifice scheme passing 2000 vehicles and a Driver Liaison Team milestone — no reply yet."},{"name":"Paddy Power","contactName":"","email":"info@paddypower.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Paddy Power — Football Voices","contactName":"","email":"info@paddypower.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Follow-up sent referencing Football Voices specifically, no reply."},{"name":"Panini","contactName":"","email":"info@panini.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Panini — Football Voices","contactName":"","email":"info@panini.co.uk","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Perform Health Co","contactName":"Steven","email":"info@performhealthco.co.uk","phone":"","website":"","stage":"Package Sent","type":"Commercial","note":"Lee recommended the Championship package directly."},{"name":"PlayerData","contactName":"","email":"sales@playerdata.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Puresport","contactName":"","email":"contact@puresport.co","phone":"","website":"","stage":"Replied / Warm","type":"Commercial","note":"Replied warmly to cold outreach same day — forwarded to their partnerships team; Lee thanked them. Glasgow-founded performance nutrition brand, £3.6m raise, now stocked in Boots and SportsShoes.com."},{"name":"Rae's Montrose","contactName":"","email":"hello@raesmontrose.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"RAER Scotch Whisky","contactName":"","email":"enquiries@raer.co.uk","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Contacted 18 Aug, no reply."},{"name":"Revive North / Forge Gym Inverness","contactName":"","email":"forgegyminverness@outlook.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"RMCA Bathrooms","contactName":"","email":"info@rmcabathrooms.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"S. Collins & Son","contactName":"","email":"","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Pitched 1 Sept."},{"name":"Sandcastle Soft Play","contactName":"","email":"hello@sandcastlesoftplay.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Scotflix / Firewalker Pictures","contactName":"Maureen Hascoet (founder); PR: Gaynor","email":"maureen@firewalkerpictures.co.uk","phone":"","website":"","stage":"Replied / Warm","type":"Partnership","note":"Maureen pushed a specific time — flexible Wednesday 16 Sept — after her first reply on the 14th. As of the latest message, Lee hadn't yet confirmed a slot back to her. Founder-initiated. Genuine content/distribution..."},{"name":"Scotsman Group / Scotsman Hospitality","contactName":"","email":"","phone":"","website":"","stage":"Negotiating","type":"Commercial","note":"Active relationship, not yet a confirmed closed/paying client. Corrected 16 Sept per Lee — previous \"converted client\" framing was wrong. Converted client, do not cold-pitch."},{"name":"Scottish Building Society","contactName":"","email":"sbs@bigpartnership.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Scottish Gas / Centrica","contactName":"","email":"press.office@centrica.com","phone":"","website":"","stage":"Dead / No contact","type":"","note":"Address bounces — no working email found, phone/LinkedIn only route."},{"name":"Scottish Gas / Centrica — Football Voices","contactName":"","email":"","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Send bounced, no working email found. One of the strongest strategic fits — pure execution gap, not lack of interest."},{"name":"SEC / Scottish Event Campus","contactName":"","email":"hannah.cochrane@sec.co.uk","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Follow-up sent 19 Sept referencing Destination SEC £557m waterfront redevelopment and turnover up 30% to £54.4m, with Calendly link — third touch, no reply yet. Lee personally pitched twice before with no reply (gala..."},{"name":"Side Street Burger Bar","contactName":"","email":"info@sidestreetburgers.co.uk","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Cold email bounced — address not found, dead contact. Four Scottish sites (Edinburgh, Dundee, Bonnyrigg, now Banff)."},{"name":"Signature Group","contactName":"Zara Browell","email":"zara.browell@signaturepubs.co.uk","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Follow-up sent referencing The Raven £500k refurb."},{"name":"Simon Howie Foods","contactName":"","email":"","phone":"","website":"","stage":"Contacted","type":"Commercial","note":"Pitched 12 Aug, no reply."},{"name":"Six°North","contactName":"","email":"buybeer@sixdnorth.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Sky Bet (Flutter)","contactName":"","email":"","phone":"","website":"","stage":"New","type":"","note":"Best strategic fit found — no email route exists, needs LinkedIn."},{"name":"Sky Bet — Football Voices","contactName":"","email":"","phone":"","website":"","stage":"New Lead","type":"Football Voices","note":"Best strategic fit found — no email route exists."},{"name":"Slow Sauce","contactName":"","email":"","phone":"","website":"","stage":"Negotiating","type":"Commercial","note":"Two-way thread — Lee replied on pricing model."},{"name":"Spence Insurance Services","contactName":"","email":"info@spenceinsurance.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Stellar Omada","contactName":"Joe Savage","email":"","phone":"","website":"","stage":"Negotiating","type":"Commercial","note":"Lee handling directly by phone."},{"name":"Superscript","contactName":"","email":"hello@gosuperscript.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"The Bathroom Company","contactName":"","email":"Info@thebathroomcompany.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"The Golf Lounge","contactName":"","email":"info@thegolflounge.co.uk","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Original contact bounced permanently."},{"name":"Thistly Cross Cider","contactName":"Peter","email":"peter@thistlycrosscider.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Tunnock's","contactName":"Michele Dyer (agency: Levy McCallum)","email":"michele.dyer@levymccallum.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Twenty3","contactName":"Charlie Sizer, Head of Commercial & BD","email":"charlie.sizer@twenty3.sport","phone":"","website":"","stage":"Package Sent","type":"Partnership","note":"Charlie followed up twice with no response from Stephen over several weeks. Lee tagged Stephen again 14 Sept asking him to act. Real willingness to collaborate on data products/stat packs."},{"name":"Universal Language","contactName":"","email":"","phone":"","website":"","stage":"Stalled / Lost","type":"Commercial","note":"Declined 5 Sept — \"keep it in mind for future.\""},{"name":"Urban Jungle","contactName":"","email":"partnerships@myurbanjungle.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Vitality","contactName":"","email":"press@vitality.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"Vitality — Football Voices","contactName":"","email":"press@vitality.co.uk","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Wickes","contactName":"Anna Glover","email":"anna.glover@wickes.co.uk","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"William Hill (evoke plc)","contactName":"Michael Sheehan (Marketing Director, unconfirmed current)","email":"evoke@hudsonsandler.com","phone":"","website":"","stage":"Contacted","type":"","note":""},{"name":"William Hill — Football Voices","contactName":"","email":"evoke@hudsonsandler.com","phone":"","website":"","stage":"Contacted","type":"Football Voices","note":"Sent 7 Sept, no reply."},{"name":"Zenith Coins","contactName":"Andrew Reith","email":"","phone":"","website":"zenithcoins.com","stage":"Won / Client","type":"Commercial","note":"Current client. Current client, never re-approach as a cold lead."}];

var LS_PROPOSALS = "snn_proposal_generator_v1_proposals";
var LS_CURRENT = "snn_proposal_generator_v1_current";

function uid(){ return "p_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2,8); }
function todayISO(){ return new Date().toISOString().slice(0,10); }
function nowISO(){ return new Date().toISOString(); }

function formatGBP(n){
  var v = Number(n);
  if(!isFinite(v)) v = 0;
  return "£" + v.toLocaleString("en-GB", {minimumFractionDigits:2, maximumFractionDigits:2});
}

function formatDateDisplay(iso){
  if(!iso) return "";
  var d = new Date(iso + "T00:00:00");
  if(isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", {day:"numeric", month:"long", year:"numeric"});
}

var TERMS_DEFAULT_TEXT = "1. Agreement\nThis proposal, once signed by both parties, forms an agreement between 1606 Ltd t/a SNN Sports (\"SNN Sports\") and the client named in this document (\"the Client\") for the sponsorship and media partnership described herein.\n\n2. Term\nThis agreement covers the campaign period stated in this proposal, commencing on the agreed start date and concluding on the agreed end date, unless terminated earlier in accordance with these terms.\n\n3. Fees and Payment\nFees are as set out in the Investment section of this proposal. Unless otherwise agreed in writing, invoices are payable within 30 days of the invoice date. SNN Sports reserves the right to suspend delivery of the agreed deliverables if payment is not received within the agreed terms.\n\n4. Content and Approval\nSNN Sports will share branded content with the Client for approval prior to publication where reasonably practicable. The Client agrees to provide feedback or approval within 2 working days of a request, to avoid delays to the agreed content schedule.\n\n5. Brand Usage\nAny logos, trademarks or brand assets supplied by the Client may be used by SNN Sports solely for the purpose of delivering the agreed deliverables under this proposal, and for no other purpose without the Client's prior written consent.\n\n6. Cancellation\nEither party may terminate this agreement with 30 days' written notice. Fees for deliverables completed or in progress at the point of termination remain payable.\n\n7. Confidentiality\nBoth parties agree to keep confidential any commercial terms, pricing or non-public information shared in connection with this proposal.\n\n8. Liability\nSNN Sports' liability under this agreement is limited to the total fees paid by the Client under this proposal. Neither party shall be liable for indirect or consequential losses.\n\n9. Force Majeure\nNeither party shall be liable for any failure or delay in performance caused by circumstances beyond its reasonable control.\n\n10. Governing Law\nThis agreement is governed by the laws of Scotland, and the parties submit to the exclusive jurisdiction of the Scottish courts.";

function makeBlankSignature(){
  return { clientName:"", clientTitle:"", clientDate:"", accepted:false, snnName:"Lee Anderson", snnTitle:"CEO, SNN Sports", snnDate:"" };
}

function ensureShape(p){
  if(!p) return p;
  if(typeof p.terms !== "string") p.terms = TERMS_DEFAULT_TEXT;
  if(!p.signature || typeof p.signature !== "object") p.signature = makeBlankSignature();
  else{
    var sig = makeBlankSignature();
    p.signature = Object.assign(sig, p.signature);
  }
  return p;
}

function makeBlankProposal(){
  return {
    id: uid(),
    status: "Draft",
    createdAt: nowISO(),
    updatedAt: nowISO(),
    isDemo: false,
    client: {
      company:"", contactName:"", contactTitle:"", email:"", website:"", industry:"",
      campaignName:"", proposalDate: todayISO(), startDate:"", endDate:""
    },
    objectives: { selected: [], notes:"" },
    deliverables: [],
    commercial: {
      pricingModel:"monthly",
      monthlyFee:"", oneOffFee:"", durationMonths:"6",
      commissionPercent:"", vatOption:"exclusive", vatRate:"20",
      discountType:"percent", discountValue:"",
      setupFee:"",
      performanceEnabled:false, performanceNotes:"",
      internalNotes:"", marginNotes:"",
      includeCommissionInProposal:false
    },
    stats: DEFAULT_STATS.map(function(s){ return {id:s.id,label:s.label,value:s.value,sublabel:s.sublabel}; }),
    logos: { clientLogo:null, clientLogoName:"", snnLogo:null, snnLogoName:"" },
    terms: TERMS_DEFAULT_TEXT,
    signature: makeBlankSignature()
  };
}

function makeDemoProposal(){
  var p = makeBlankProposal();
  p.isDemo = true;
  p.status = "Sent";
  p.client = {
    company:"Highland Peaks Distillery (DEMO)",
    contactName:"Fiona Mackenzie",
    contactTitle:"Head of Marketing",
    email:"fiona@highlandpeaks-demo.co.uk",
    website:"www.highlandpeaks-demo.co.uk",
    industry:"Spirits & hospitality",
    campaignName:"2026/27 Season Partnership",
    proposalDate: todayISO(),
    startDate:"2026-10-01",
    endDate:"2027-05-31"
  };
  p.objectives.selected = ["Brand Awareness","Content Partnership","Long-Term Brand Partnership"];
  p.objectives.notes = "Highland Peaks want a season-long presence rather than a short burst, with an emphasis on content that reflects their brand naturally rather than direct product promotion.";
  p.deliverables = [
    {id:uid(), name:"Sponsored social posts", description:"Branded posts across SNN Sports' social channels referencing the partnership.", quantity:"8", frequency:"Monthly", duration:"Throughout campaign", notes:"Mix of Instagram and Facebook"},
    {id:uid(), name:"Matchday content", description:"Branded matchday graphics and updates around fixtures SNN Sports covers.", quantity:"1 per matchday", frequency:"Weekly (in season)", duration:"Aug 2026 – May 2027", notes:""},
    {id:uid(), name:"Video integrations", description:"Brand mentions and on-screen branding within SNN Sports video content.", quantity:"4", frequency:"Quarterly", duration:"Throughout campaign", notes:"Subject to creative approval"},
    {id:uid(), name:"Website banners", description:"Branded banner placements across the SNN Sports website.", quantity:"1 rotating placement", frequency:"Continuous", duration:"Throughout campaign", notes:""}
  ];
  p.commercial.pricingModel = "monthly";
  p.commercial.monthlyFee = "1200";
  p.commercial.durationMonths = "8";
  p.commercial.setupFee = "250";
  p.commercial.discountType = "percent";
  p.commercial.discountValue = "5";
  p.commercial.vatOption = "exclusive";
  p.commercial.vatRate = "20";
  p.commercial.commissionPercent = "0";
  p.commercial.includeCommissionInProposal = false;
  return p;
}

function computeTotals(c){
  var monthly = Number(c.monthlyFee) || 0;
  var months = Math.max(Number(c.durationMonths) || 0, 0);
  var oneOff = Number(c.oneOffFee) || 0;
  var setup = Number(c.setupFee) || 0;
  var base = 0;
  if(c.pricingModel === "monthly" || c.pricingModel === "monthly_commission"){
    base = (monthly * months) + setup;
  } else if(c.pricingModel === "oneoff" || c.pricingModel === "oneoff_commission"){
    base = oneOff + setup;
  } else {
    base = (monthly * months) + oneOff + setup;
  }
  var dv = Number(c.discountValue) || 0;
  var discount = 0;
  if(c.discountType === "percent") discount = base * (dv / 100);
  else discount = dv;
  if(discount > base) discount = base;
  if(discount < 0) discount = 0;
  var afterDiscount = base - discount;
  if(afterDiscount < 0) afterDiscount = 0;
  var vatRate = Number(c.vatRate) || 0;
  var vatAmount = 0, total = afterDiscount;
  if(c.vatOption === "exclusive"){
    vatAmount = afterDiscount * (vatRate / 100);
    total = afterDiscount + vatAmount;
  } else if(c.vatOption === "inclusive"){
    vatAmount = afterDiscount - (afterDiscount / (1 + (vatRate / 100)));
    total = afterDiscount;
  } else {
    vatAmount = 0;
    total = afterDiscount;
  }
  var monthlyEquivalent = months > 0 ? (total / months) : total;
  var commissionPercent = Number(c.commissionPercent) || 0;
  var potentialCommission = total * (commissionPercent / 100);
  return {
    base: base, discount: discount, afterDiscount: afterDiscount,
    vatAmount: vatAmount, total: total, monthlyEquivalent: monthlyEquivalent,
    months: months, commissionPercent: commissionPercent, potentialCommission: potentialCommission
  };
}

var OBJECTIVE_COPY = {
  "Brand Awareness": function(n){ return "Placing " + n + " in front of SNN Sports' engaged Scottish football audience builds consistent visibility with fans who follow the game closely. Regular presence across our channels keeps the brand front of mind through the season, built through repetition rather than a single moment."; },
  "Product Awareness": function(n){ return "Integrating " + n + "'s products into matchday and video content introduces them naturally to an audience that is already paying attention, in a setting where the product sits alongside the football content they came for."; },
  "Website Traffic": function(n){ return "Content and calls to action across SNN Sports' platforms can direct our audience through to " + n + "'s website, giving the partnership a clear, trackable path from awareness to a visit."; },
  "Lead Generation": function(n){ return "Competitions, sign-up prompts and direct calls to action within the proposed content give " + n + " a structured route to capturing interest from an audience that is already engaged with football content."; },
  "Sales": function(n){ return "Where the objective is measurable action, the deliverables below lean toward direct calls to action, offers and clear next steps, framed to move our audience from interest toward a purchase decision with " + n + "."; },
  "Event Promotion": function(n){ return "In the run-up to the event, SNN Sports' channels can build awareness and drive attendance through a concentrated run of content, reaching an audience already following Scottish football closely."; },
  "Content Partnership": function(n){ return "Beyond individual placements, this partnership can extend into shared content, built collaboratively so it reflects both " + n + " and SNN Sports' editorial voice."; },
  "Sponsorship": function(n){ return "As a named partner across the agreed content, " + n + " is associated consistently with SNN Sports' coverage, giving the relationship visible, recurring presence over the campaign period."; },
  "Long-Term Brand Partnership": function(n){ return "Structured as an ongoing relationship rather than a single campaign, this partnership gives " + n + " a consistent presence across a full season, with the flexibility to evolve the content as the partnership develops."; }
};

class Component extends DCLogic {

  constructor(props){
    super(props);
    this.state = {
      screen: "builder",
      activeTab: "client",
      proposals: [],
      current: makeBlankProposal(),
      flash: "",
      confirmingClear: false,
      deleteConfirmId: null,
      crmSearch: "",
      pendingAction: null,
      proposalSearch: "",
      pdfStatus: "idle",
      pdfError: ""
    };
    this._flashTimer = null;
  }

  componentDidMount(){
    var proposals = [];
    var current = null;
    try{
      var rawP = localStorage.getItem(LS_PROPOSALS);
      if(rawP) proposals = JSON.parse(rawP) || [];
    }catch(e){ proposals = []; }
    try{
      var rawC = localStorage.getItem(LS_CURRENT);
      if(rawC) current = JSON.parse(rawC);
    }catch(e){ current = null; }

    if(!proposals || proposals.length === 0){
      var demo = makeDemoProposal();
      proposals = [demo];
      try{ localStorage.setItem(LS_PROPOSALS, JSON.stringify(proposals)); }catch(e){}
    }
    if(!current || !current.id){
      current = makeBlankProposal();
    }
    proposals = proposals.map(function(p){ return ensureShape(p); });
    current = ensureShape(current);
    this.setState({ proposals: proposals, current: current });
  }

  showFlash(msg){
    var self = this;
    this.setState({flash: msg});
    if(this._flashTimer) clearTimeout(this._flashTimer);
    this._flashTimer = setTimeout(function(){ self.setState({flash:""}); }, 2600);
  }

  sanitizeFilenamePart(s){
    s = String(s || "").trim();
    s = s.replace(/[\/\\:*?"<>|]/g, "-");
    s = s.replace(/\s+/g, " ").trim();
    if(!s) s = "Untitled";
    if(s.length > 120) s = s.slice(0, 120).trim();
    return s;
  }

  async generatePdf(){
    var self = this;
    if(this.state.pdfStatus === "generating") return;
    this.setState({ pdfStatus: "generating", pdfError: "" });
    var proposal = JSON.parse(JSON.stringify(this.state.current));
    var clientPart = this.sanitizeFilenamePart(proposal.client && (proposal.client.company || proposal.client.campaignName));
    var filename = "SNN Sports - " + clientPart + " - Sponsorship Proposal.pdf";
    try{
      var resp = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposal: proposal })
      });
      if(!resp.ok){
        var errText = "";
        try{
          var errBody = await resp.json();
          errText = errBody && errBody.error ? errBody.error : (resp.status + " " + resp.statusText);
        }catch(e2){
          errText = resp.status + " " + resp.statusText;
        }
        this.setState({ pdfStatus: "error", pdfError: errText });
        return;
      }
      var blob = await resp.blob();
      if(!blob || blob.size === 0){
        this.setState({ pdfStatus: "error", pdfError: "The server returned an empty file. Nothing was downloaded." });
        return;
      }
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); }, 30000);
      this.setState({ pdfStatus: "idle", pdfError: "" });
    }catch(e){
      this.setState({ pdfStatus: "error", pdfError: (e && e.message) ? e.message : String(e) });
    }
  }

  commitCurrent(current){
    this.setState({current: current});
    try{ localStorage.setItem(LS_CURRENT, JSON.stringify(current)); }catch(e){}
  }

  persistProposals(list){
    this.setState({proposals: list});
    try{ localStorage.setItem(LS_PROPOSALS, JSON.stringify(list)); }catch(e){}
  }

  // ---- client ----
  updateClientField(field, value){
    var c = this.state.current;
    var next = Object.assign({}, c, { client: Object.assign({}, c.client, {}) });
    next.client[field] = value;
    this.commitCurrent(next);
  }

  // ---- crm / deal tracker ----
  updateCrmSearch(value){
    this.setState({ crmSearch: value });
  }

  loadFromCrm(record){
    var c = this.state.current;
    var next = Object.assign({}, c, { client: Object.assign({}, c.client, {}) });
    if(record.name) next.client.company = record.name;
    if(record.contactName) next.client.contactName = record.contactName;
    if(record.email) next.client.email = record.email;
    if(record.website) next.client.website = record.website;
    this.setState({ current: next, crmSearch: "" });
    try{ localStorage.setItem(LS_CURRENT, JSON.stringify(next)); }catch(e){}
    this.showFlash("Loaded " + record.name + " from the Deal Tracker");
  }

  // ---- objectives ----
  toggleObjective(name){
    var c = this.state.current;
    var sel = c.objectives.selected.slice();
    var idx = sel.indexOf(name);
    if(idx >= 0) sel.splice(idx,1); else sel.push(name);
    var next = Object.assign({}, c, { objectives: Object.assign({}, c.objectives, { selected: sel }) });
    this.commitCurrent(next);
  }

  updateObjectivesNotes(value){
    var c = this.state.current;
    var next = Object.assign({}, c, { objectives: Object.assign({}, c.objectives, { notes: value }) });
    this.commitCurrent(next);
  }

  // ---- deliverables ----
  addDeliverable(prefillName){
    var c = this.state.current;
    var d = { id: uid(), name: prefillName || "", description:"", quantity:"", frequency:"", duration:"", notes:"" };
    var next = Object.assign({}, c, { deliverables: c.deliverables.concat([d]) });
    this.commitCurrent(next);
  }

  updateDeliverable(id, field, value){
    var c = this.state.current;
    var deliverables = c.deliverables.map(function(d){
      if(d.id !== id) return d;
      var nd = Object.assign({}, d);
      nd[field] = value;
      return nd;
    });
    this.commitCurrent(Object.assign({}, c, { deliverables: deliverables }));
  }

  removeDeliverable(id){
    var c = this.state.current;
    var deliverables = c.deliverables.filter(function(d){ return d.id !== id; });
    this.commitCurrent(Object.assign({}, c, { deliverables: deliverables }));
  }

  // ---- commercial ----
  updateCommercialField(field, value){
    var c = this.state.current;
    var next = Object.assign({}, c, { commercial: Object.assign({}, c.commercial, {}) });
    next.commercial[field] = value;
    this.commitCurrent(next);
  }

  // ---- stats ----
  updateStatValue(id, value){
    var c = this.state.current;
    var stats = c.stats.map(function(s){
      if(s.id !== id) return s;
      var ns = Object.assign({}, s); ns.value = value; return ns;
    });
    this.commitCurrent(Object.assign({}, c, { stats: stats }));
  }

  // ---- terms ----
  updateTerms(value){
    var c = this.state.current;
    this.commitCurrent(Object.assign({}, c, { terms: value }));
  }

  // ---- signature ----
  updateSignatureField(field, value){
    var c = this.state.current;
    var next = Object.assign({}, c, { signature: Object.assign({}, c.signature, {}) });
    next.signature[field] = value;
    this.commitCurrent(next);
  }

  // ---- logos ----
  handleLogoFile(which, file){
    if(!file) return;
    var self = this;
    var reader = new FileReader();
    reader.onload = function(){
      var c = self.state.current;
      var logos = Object.assign({}, c.logos);
      if(which === "client"){ logos.clientLogo = reader.result; logos.clientLogoName = file.name; }
      else { logos.snnLogo = reader.result; logos.snnLogoName = file.name; }
      self.commitCurrent(Object.assign({}, c, { logos: logos }));
    };
    reader.readAsDataURL(file);
  }

  removeLogo(which){
    var c = this.state.current;
    var logos = Object.assign({}, c.logos);
    if(which === "client"){ logos.clientLogo = null; logos.clientLogoName = ""; }
    else { logos.snnLogo = null; logos.snnLogoName = ""; }
    this.commitCurrent(Object.assign({}, c, { logos: logos }));
  }

  // ---- status ----
  updateStatus(value){
    var c = this.state.current;
    var next = Object.assign({}, c, { status: value, updatedAt: nowISO() });
    var proposals = this.state.proposals;
    var idx = proposals.findIndex(function(p){ return p.id === next.id; });
    if(idx >= 0){
      proposals = proposals.slice();
      proposals[idx] = next;
      this.persistProposals(proposals);
    }
    this.commitCurrent(next);
  }

  // ---- top-level actions ----
  saveProposal(){
    var current = Object.assign({}, this.state.current, { updatedAt: nowISO() });
    var list = this.state.proposals.slice();
    var idx = list.findIndex(function(p){ return p.id === current.id; });
    if(idx >= 0) list[idx] = current; else list.push(current);
    this.persistProposals(list);
    this.commitCurrent(current);
    this.showFlash("Proposal saved");
  }

  newProposal(){
    var fresh = makeBlankProposal();
    this.setState({ current: fresh, activeTab: "client", screen: "builder", confirmingClear:false });
    try{ localStorage.setItem(LS_CURRENT, JSON.stringify(fresh)); }catch(e){}
  }

  duplicateCurrent(){
    var src = JSON.parse(JSON.stringify(this.state.current));
    src.id = uid();
    src.status = "Draft";
    src.isDemo = false;
    src.createdAt = nowISO();
    src.updatedAt = nowISO();
    src.client = Object.assign({}, src.client, { campaignName: src.client.campaignName ? (src.client.campaignName + " (Copy)") : "" });
    var list = this.state.proposals.concat([src]);
    this.persistProposals(list);
    this.commitCurrent(src);
    this.showFlash("Duplicated as a new proposal");
  }

  openProposal(id){
    var p = this.state.proposals.find(function(x){ return x.id === id; });
    if(!p) return;
    this.setState({ current: p, screen:"builder", activeTab:"client" });
    try{ localStorage.setItem(LS_CURRENT, JSON.stringify(p)); }catch(e){}
  }

  duplicateProposal(id){
    var p = this.state.proposals.find(function(x){ return x.id === id; });
    if(!p) return;
    var dup = JSON.parse(JSON.stringify(p));
    dup.id = uid();
    dup.status = "Draft";
    dup.isDemo = false;
    dup.createdAt = nowISO();
    dup.updatedAt = nowISO();
    dup.client = Object.assign({}, dup.client, { campaignName: dup.client.campaignName ? (dup.client.campaignName + " (Copy)") : "" });
    var list = this.state.proposals.concat([dup]);
    this.persistProposals(list);
    this.commitCurrent(dup);
    this.setState({ screen:"builder", activeTab:"client" });
    this.showFlash("Duplicated");
  }

  // ---- unsaved-changes guard ----
  hasMeaningfulContent(p){
    if(!p) return false;
    if(p.client.company || p.client.campaignName || p.client.contactName) return true;
    if(p.deliverables && p.deliverables.length > 0) return true;
    if(Number(p.commercial.monthlyFee) > 0 || Number(p.commercial.oneOffFee) > 0) return true;
    return false;
  }

  isCurrentUnsaved(){
    var c = this.state.current;
    if(!this.hasMeaningfulContent(c)) return false;
    var saved = this.state.proposals.find(function(p){ return p.id === c.id; });
    if(!saved) return true;
    return JSON.stringify(saved) !== JSON.stringify(c);
  }

  requestNewProposal(){
    if(this.isCurrentUnsaved()){
      this.setState({ pendingAction: {kind:"new"} });
    } else {
      this.newProposal();
    }
  }

  requestOpenProposal(id){
    if(this.state.current.id === id){
      this.setState({ screen:"builder", activeTab:"client" });
      return;
    }
    if(this.isCurrentUnsaved()){
      this.setState({ pendingAction: {kind:"open", id:id} });
    } else {
      this.openProposal(id);
    }
  }

  requestDuplicateProposal(id){
    if(this.isCurrentUnsaved()){
      this.setState({ pendingAction: {kind:"duplicate", id:id} });
    } else {
      this.duplicateProposal(id);
    }
  }

  runPendingAction(){
    var action = this.state.pendingAction;
    this.setState({ pendingAction: null });
    if(!action) return;
    if(action.kind === "new") this.newProposal();
    else if(action.kind === "open") this.openProposal(action.id);
    else if(action.kind === "duplicate") this.duplicateProposal(action.id);
  }

  resolvePendingSave(){
    this.saveProposal();
    this.runPendingAction();
  }

  resolvePendingDiscard(){
    this.runPendingAction();
  }

  cancelPendingAction(){
    this.setState({ pendingAction: null });
  }

  // ---- proposals list search ----
  updateProposalSearch(value){
    this.setState({ proposalSearch: value });
  }

  clearProposalSearch(){
    this.setState({ proposalSearch: "" });
  }

  askDeleteProposal(id){ this.setState({ deleteConfirmId: id }); }
  cancelDeleteProposal(){ this.setState({ deleteConfirmId: null }); }
  confirmDeleteProposal(id){
    var list = this.state.proposals.filter(function(p){ return p.id !== id; });
    this.persistProposals(list);
    this.setState({ deleteConfirmId: null });
    this.showFlash("Proposal deleted");
  }

  askClear(){ this.setState({ confirmingClear: true }); }
  cancelClear(){ this.setState({ confirmingClear: false }); }
  confirmClear(){
    var fresh = makeBlankProposal();
    fresh.id = this.state.current.id;
    this.setState({ current: fresh, confirmingClear: false });
    try{ localStorage.setItem(LS_CURRENT, JSON.stringify(fresh)); }catch(e){}
    this.showFlash("Form cleared");
  }

  // ---- render ----
  renderVals(){
    var self = this;
    var s = this.state;
    var c = s.current;

    var navDefs = [
      {key:"client", label:"Client Details", num:1},
      {key:"objectives", label:"Objectives", num:2},
      {key:"package", label:"Package Builder", num:3},
      {key:"commercial", label:"Commercial Terms", num:4},
      {key:"stats", label:"Audience Stats", num:5},
      {key:"terms", label:"Terms & Conditions", num:6},
      {key:"signature", label:"Sign-off", num:7},
      {key:"preview", label:"Preview", num:8}
    ];
    var completionMap = {
      client: !!(c.client.company && c.client.contactName && c.client.email),
      objectives: c.objectives.selected.length > 0,
      package: c.deliverables.length > 0,
      commercial: (Number(c.commercial.monthlyFee) > 0) || (Number(c.commercial.oneOffFee) > 0),
      signature: !!(c.signature.accepted && c.signature.clientName)
    };
    var navTabs = navDefs.map(function(t){
      var active = s.activeTab === t.key;
      var done = completionMap.hasOwnProperty(t.key) ? completionMap[t.key] : false;
      return {
        key:t.key, label:t.label, num:t.num,
        className: active ? "tab active" : "tab",
        showDot: done,
        onClick: function(){ self.setState({ activeTab: t.key }); }
      };
    });

    var tabOrder = navDefs.map(function(t){ return t.key; });
    var curTabIdx = tabOrder.indexOf(s.activeTab);
    var prevDef = curTabIdx > 0 ? navDefs[curTabIdx - 1] : null;
    var nextDef = (curTabIdx >= 0 && curTabIdx < navDefs.length - 1) ? navDefs[curTabIdx + 1] : null;
    var wizard = {
      hasPrev: !!prevDef,
      hasNoPrev: !prevDef,
      prevLabel: prevDef ? prevDef.label : "",
      onPrev: function(){ if(prevDef) self.setState({ activeTab: prevDef.key }); },
      hasNext: !!nextDef,
      hasNoNext: !nextDef,
      nextLabel: nextDef ? nextDef.label : "",
      onNext: function(){ if(nextDef) self.setState({ activeTab: nextDef.key }); }
    };
    var showBottomBar = s.screen === "builder" && s.activeTab !== "preview";

    var statusOptions = STATUS_OPTIONS.map(function(v){ return {value:v, label:v}; });

    var objectivesList = OBJECTIVE_OPTIONS.map(function(o){
      var selected = c.objectives.selected.indexOf(o) >= 0;
      return {
        label:o, selected:selected,
        chipClass: selected ? "chip chip-active" : "chip",
        onToggle: function(){ self.toggleObjective(o); }
      };
    });

    var deliverables = c.deliverables.map(function(d, i){
      return {
        id:d.id, index:i+1,
        name:d.name, description:d.description, quantity:d.quantity, frequency:d.frequency, duration:d.duration, notes:d.notes,
        onName: function(e){ self.updateDeliverable(d.id,"name", e.target.value); },
        onDescription: function(e){ self.updateDeliverable(d.id,"description", e.target.value); },
        onQuantity: function(e){ self.updateDeliverable(d.id,"quantity", e.target.value); },
        onFrequency: function(e){ self.updateDeliverable(d.id,"frequency", e.target.value); },
        onDuration: function(e){ self.updateDeliverable(d.id,"duration", e.target.value); },
        onNotes: function(e){ self.updateDeliverable(d.id,"notes", e.target.value); },
        onRemove: function(){ self.removeDeliverable(d.id); }
      };
    });

    var deliverableSuggestions = DELIVERABLE_SUGGESTIONS.map(function(label){
      return { label:label, onAdd: function(){ self.addDeliverable(label); } };
    });

    var pricingModels = PRICING_MODELS.map(function(m){
      var active = c.commercial.pricingModel === m.id;
      return {
        id:m.id, label:m.label, sub:m.sub,
        className: active ? "seg seg-active" : "seg",
        onSelect: function(){ self.updateCommercialField("pricingModel", m.id); }
      };
    });

    var discountTypes = [
      {id:"percent", label:"Percentage (%)"},
      {id:"fixed", label:"Fixed Amount (£)"}
    ].map(function(dt){
      var active = c.commercial.discountType === dt.id;
      return { id:dt.id, label:dt.label, className: active ? "seg seg-active" : "seg", onSelect: function(){ self.updateCommercialField("discountType", dt.id); } };
    });

    var vatOptions = VAT_OPTIONS;

    var totalsRaw = computeTotals(c.commercial);
    var showVatLine = c.commercial.vatOption !== "none";
    var totals = {
      baseDisplay: formatGBP(totalsRaw.base),
      discountDisplay: formatGBP(totalsRaw.discount),
      hasDiscount: totalsRaw.discount > 0,
      vatLineLabel: c.commercial.vatOption === "inclusive" ? ("VAT (included, " + (Number(c.commercial.vatRate)||0) + "%)") : ("VAT (" + (Number(c.commercial.vatRate)||0) + "%)"),
      vatDisplay: formatGBP(totalsRaw.vatAmount),
      showVatLine: showVatLine,
      totalDisplay: formatGBP(totalsRaw.total),
      monthlyEquivalentDisplay: formatGBP(totalsRaw.monthlyEquivalent),
      showMonthlyEquivalent: totalsRaw.months > 1,
      commissionPercentDisplay: (totalsRaw.commissionPercent || 0) + "%",
      potentialCommissionDisplay: formatGBP(totalsRaw.potentialCommission),
      hasCommission: totalsRaw.commissionPercent > 0
    };

    var statsFields = c.stats.map(function(st){
      return { id:st.id, label:st.label, value:st.value, onValue: function(e){ self.updateStatValue(st.id, e.target.value); } };
    });

    var whyPoints = WHY_POINTS.map(function(t){ return {text:t}; });

    // ---- proposals list rows ----
    var sortedProposals = s.proposals.slice().sort(function(a,b){ return new Date(b.updatedAt) - new Date(a.updatedAt); });
    var proposalSearchTerm = (s.proposalSearch || "").trim().toLowerCase();
    var visibleProposals = proposalSearchTerm ? sortedProposals.filter(function(p){
      var hay = ((p.client.company||"") + " " + (p.client.campaignName||"") + " " + (p.client.contactName||"")).toLowerCase();
      return hay.indexOf(proposalSearchTerm) >= 0;
    }) : sortedProposals;
    var proposalRows = visibleProposals.map(function(p){
      var t = computeTotals(p.commercial);
      return {
        id:p.id,
        company: p.client.company || "Untitled proposal",
        contact: p.client.contactName || "",
        campaign: p.client.campaignName || "—",
        dateDisplay: formatDateDisplay(p.client.proposalDate) || "—",
        valueDisplay: formatGBP(t.total),
        status: p.status,
        statusStyle: STATUS_STYLES[p.status] || STATUS_STYLES["Draft"],
        isDemo: !!p.isDemo,
        confirmingDelete: s.deleteConfirmId === p.id,
        showActions: s.deleteConfirmId !== p.id,
        onOpen: function(){ self.requestOpenProposal(p.id); },
        onDuplicate: function(){ self.requestDuplicateProposal(p.id); },
        onAskDelete: function(){ self.askDeleteProposal(p.id); },
        onConfirmDelete: function(){ self.confirmDeleteProposal(p.id); },
        onCancelDelete: function(){ self.cancelDeleteProposal(); }
      };
    });

    var pipelineActiveTotal = s.proposals.filter(function(p){ return p.status === "Sent" || p.status === "Negotiating"; })
      .reduce(function(sum,p){ return sum + computeTotals(p.commercial).total; }, 0);
    var pipelineWon = s.proposals.filter(function(p){ return p.status === "Won"; });
    var pipelineWonTotal = pipelineWon.reduce(function(sum,p){ return sum + computeTotals(p.commercial).total; }, 0);
    var proposalsSummary = {
      count: s.proposals.length,
      activeValueDisplay: formatGBP(pipelineActiveTotal),
      wonValueDisplay: formatGBP(pipelineWonTotal),
      wonCount: pipelineWon.length
    };

    // ---- preview model ----
    var companyName = c.client.company || "Your Brand";
    var opportunityParagraphs = c.objectives.selected.map(function(o){
      var fn = OBJECTIVE_COPY[o];
      return { text: fn ? fn(companyName) : "" };
    });
    if(opportunityParagraphs.length === 0){
      opportunityParagraphs = [{ text: "Campaign objectives have not yet been selected for this proposal. Once selected in the Campaign Objective tab, this section will explain how the partnership supports each one." }];
    } else {
      var closing = "Across " + (c.deliverables.length || "the proposed") + (c.deliverables.length === 1 ? " deliverable" : " deliverables") + (c.commercial.durationMonths ? (", running over " + c.commercial.durationMonths + " months,") : "") + " this partnership is built to support those objectives consistently rather than as a single, isolated activation.";
      opportunityParagraphs.push({text: closing});
    }

    var statsTiles = c.stats.map(function(st){
      return { id:st.id, value:st.value, label:st.label, sublabel:st.sublabel, hasSub: !!st.sublabel };
    });

    var previewDeliverables = c.deliverables.map(function(d){
      var metaParts = [];
      if(d.quantity) metaParts.push(d.quantity);
      if(d.frequency) metaParts.push(d.frequency);
      if(d.duration) metaParts.push(d.duration);
      return {
        name: d.name || "Untitled deliverable",
        description: d.description,
        hasDescription: !!d.description,
        meta: metaParts.join(" · "),
        hasMeta: metaParts.length > 0,
        notes: d.notes,
        hasNotes: !!d.notes
      };
    });

    var investmentLines = [];
    investmentLines.push({ label:"Subtotal", value: totals.baseDisplay, className:"inv-line" });
    if(totalsRaw.discount > 0) investmentLines.push({ label:"Discount", value: "−" + totals.discountDisplay, className:"inv-line" });
    if(showVatLine) investmentLines.push({ label: totals.vatLineLabel, value: totals.vatDisplay, className:"inv-line" });
    investmentLines.push({ label:"Total Campaign Value", value: totals.totalDisplay, className:"inv-line emph" });
    if(totalsRaw.months > 1) investmentLines.push({ label:"Monthly Equivalent", value: totals.monthlyEquivalentDisplay, className:"inv-line" });
    var showCommissionInProposal = c.commercial.includeCommissionInProposal && totalsRaw.commissionPercent > 0;
    if(showCommissionInProposal) investmentLines.push({ label:"Commission (" + totals.commissionPercentDisplay + ")", value: totals.potentialCommissionDisplay, className:"inv-line" });

    var vatFootnote = "";
    if(c.commercial.vatOption === "exclusive") vatFootnote = "Prices shown are exclusive of VAT. VAT is added at " + (Number(c.commercial.vatRate)||0) + "%.";
    else if(c.commercial.vatOption === "inclusive") vatFootnote = "Prices shown are inclusive of VAT at " + (Number(c.commercial.vatRate)||0) + "%.";
    else vatFootnote = "VAT is not applicable to this proposal.";

    var objectiveTags = c.objectives.selected.map(function(o){ return {label:o}; });

    var campaignRange = "";
    if(c.client.startDate || c.client.endDate){
      campaignRange = (formatDateDisplay(c.client.startDate) || "TBC") + " – " + (formatDateDisplay(c.client.endDate) || "TBC");
    }

    var footerRight = c.client.campaignName || c.client.company || "Confidential";

    var nextStepsCopy = "Subject to agreement, SNN Sports will work with " + companyName + " to finalise the campaign plan, creative requirements and launch timeline.";

    var preview = {
      campaignTitle: c.client.campaignName || "Sponsorship & Media Partnership",
      campaignDateRange: campaignRange,
      clientNameDisplay: c.client.company || "Prospective Partner",
      clientNameShort: c.client.company || "Your Brand",
      clientInitial: (c.client.company || "?").trim().charAt(0).toUpperCase() || "?",
      proposalDateDisplay: formatDateDisplay(c.client.proposalDate) || formatDateDisplay(todayISO()),
      statsTiles: statsTiles,
      hasObjectiveTags: objectiveTags.length > 0,
      objectiveTags: objectiveTags,
      opportunityParagraphs: opportunityParagraphs,
      opportunityNotesPresent: !!c.objectives.notes,
      hasDeliverables: previewDeliverables.length > 0,
      hasNoDeliverables: previewDeliverables.length === 0,
      deliverables: previewDeliverables,
      investmentLines: investmentLines,
      vatFootnote: vatFootnote,
      hasPerformanceNote: c.commercial.performanceEnabled && !!c.commercial.performanceNotes,
      nextStepsCopy: nextStepsCopy,
      footerRight: footerRight,
      acceptedTerms: !!c.signature.accepted,
      notAcceptedTerms: !c.signature.accepted,
      hasClientSignature: !!(c.signature.accepted && c.signature.clientName),
      hasNoClientSignature: !(c.signature.accepted && c.signature.clientName),
      clientSignatureDateDisplay: formatDateDisplay(c.signature.clientDate) || "Date not set",
      hasSnnSignature: !!c.signature.snnName,
      hasNoSnnSignature: !c.signature.snnName,
      snnSignatureDateDisplay: formatDateDisplay(c.signature.snnDate) || "Date not set"
    };

    var logos = {
      hasClient: !!c.logos.clientLogo,
      hasNoClient: !c.logos.clientLogo,
      clientSrc: c.logos.clientLogo || "",
      hasSnn: !!c.logos.snnLogo,
      hasNoSnn: !c.logos.snnLogo,
      snnSrc: c.logos.snnLogo || "",
      onClientUpload: function(e){ self.handleLogoFile("client", e.target.files && e.target.files[0]); },
      onSnnUpload: function(e){ self.handleLogoFile("snn", e.target.files && e.target.files[0]); },
      onClientRemove: function(){ self.removeLogo("client"); },
      onSnnRemove: function(){ self.removeLogo("snn"); }
    };

    var crmSearchRaw = (s.crmSearch || "").trim();
    var crmSearchLower = crmSearchRaw.toLowerCase();
    var crmMatches = [];
    if(crmSearchLower.length >= 2){
      crmMatches = CRM_PROSPECTS.filter(function(r){
        var hay = ((r.name||"") + " " + (r.contactName||"")).toLowerCase();
        return hay.indexOf(crmSearchLower) >= 0;
      }).slice(0, 8);
    }
    var crmResults = crmMatches.map(function(r){
      var subParts = [];
      if(r.contactName) subParts.push(r.contactName);
      if(r.email) subParts.push(r.email);
      if(r.website) subParts.push(r.website);
      return {
        name: r.name,
        stage: r.stage || "",
        subline: subParts.length ? subParts.join(" · ") : "No contact details on file",
        onUse: function(){ self.loadFromCrm(r); }
      };
    });
    var crm = {
      search: s.crmSearch,
      onSearch: function(e){ self.updateCrmSearch(e.target.value); },
      results: crmResults,
      hasResults: crmResults.length > 0,
      hasNoResults: crmSearchLower.length >= 2 && crmResults.length === 0,
      syncedDisplay: formatDateDisplay(CRM_SYNCED_AT.slice(0,10))
    };

    var client = {
      company: c.client.company, onCompany: function(e){ self.updateClientField("company", e.target.value); },
      industry: c.client.industry, onIndustry: function(e){ self.updateClientField("industry", e.target.value); },
      contactName: c.client.contactName, onContactName: function(e){ self.updateClientField("contactName", e.target.value); },
      contactTitle: c.client.contactTitle, onContactTitle: function(e){ self.updateClientField("contactTitle", e.target.value); },
      email: c.client.email, onEmail: function(e){ self.updateClientField("email", e.target.value); },
      website: c.client.website, onWebsite: function(e){ self.updateClientField("website", e.target.value); },
      campaignName: c.client.campaignName, onCampaignName: function(e){ self.updateClientField("campaignName", e.target.value); },
      proposalDate: c.client.proposalDate, onProposalDate: function(e){ self.updateClientField("proposalDate", e.target.value); },
      startDate: c.client.startDate, onStartDate: function(e){ self.updateClientField("startDate", e.target.value); },
      endDate: c.client.endDate, onEndDate: function(e){ self.updateClientField("endDate", e.target.value); }
    };

    var commercial = {
      pricingModel: c.commercial.pricingModel,
      showMonthlyFee: c.commercial.pricingModel === "monthly" || c.commercial.pricingModel === "monthly_commission" || c.commercial.pricingModel === "custom",
      showOneOffFee: c.commercial.pricingModel === "oneoff" || c.commercial.pricingModel === "oneoff_commission" || c.commercial.pricingModel === "custom",
      monthlyFee: c.commercial.monthlyFee, onMonthlyFee: function(e){ self.updateCommercialField("monthlyFee", e.target.value); },
      oneOffFee: c.commercial.oneOffFee, onOneOffFee: function(e){ self.updateCommercialField("oneOffFee", e.target.value); },
      setupFee: c.commercial.setupFee, onSetupFee: function(e){ self.updateCommercialField("setupFee", e.target.value); },
      durationMonths: c.commercial.durationMonths, onDurationMonths: function(e){ self.updateCommercialField("durationMonths", e.target.value); },
      commissionPercent: c.commercial.commissionPercent, onCommissionPercent: function(e){ self.updateCommercialField("commissionPercent", e.target.value); },
      discountValue: c.commercial.discountValue, onDiscountValue: function(e){ self.updateCommercialField("discountValue", e.target.value); },
      vatOption: c.commercial.vatOption, onVatOption: function(e){ self.updateCommercialField("vatOption", e.target.value); },
      showVatRate: c.commercial.vatOption !== "none",
      vatRate: c.commercial.vatRate, onVatRate: function(e){ self.updateCommercialField("vatRate", e.target.value); },
      performanceEnabled: c.commercial.performanceEnabled, onPerformanceEnabled: function(e){ self.updateCommercialField("performanceEnabled", e.target.checked); },
      performanceNotes: c.commercial.performanceNotes, onPerformanceNotes: function(e){ self.updateCommercialField("performanceNotes", e.target.value); },
      internalNotes: c.commercial.internalNotes, onInternalNotes: function(e){ self.updateCommercialField("internalNotes", e.target.value); },
      marginNotes: c.commercial.marginNotes, onMarginNotes: function(e){ self.updateCommercialField("marginNotes", e.target.value); },
      includeCommissionInProposal: c.commercial.includeCommissionInProposal, onIncludeCommission: function(e){ self.updateCommercialField("includeCommissionInProposal", e.target.checked); }
    };

    var discountUnitLabel = c.commercial.discountType === "percent" ? "(%)" : "(£)";

    var terms = {
      value: c.terms,
      onChange: function(e){ self.updateTerms(e.target.value); }
    };

    var signature = {
      clientName: c.signature.clientName, onClientName: function(e){ self.updateSignatureField("clientName", e.target.value); },
      clientTitle: c.signature.clientTitle, onClientTitle: function(e){ self.updateSignatureField("clientTitle", e.target.value); },
      clientDate: c.signature.clientDate, onClientDate: function(e){ self.updateSignatureField("clientDate", e.target.value); },
      accepted: c.signature.accepted, onAccepted: function(e){ self.updateSignatureField("accepted", e.target.checked); },
      snnName: c.signature.snnName, onSnnName: function(e){ self.updateSignatureField("snnName", e.target.value); },
      snnTitle: c.signature.snnTitle, onSnnTitle: function(e){ self.updateSignatureField("snnTitle", e.target.value); },
      snnDate: c.signature.snnDate, onSnnDate: function(e){ self.updateSignatureField("snnDate", e.target.value); }
    };

    var isBuilderScreen = s.screen === "builder";
    var isListScreen = s.screen === "list";

    return {
      hasCurrentName: !!(c.client.company || c.client.campaignName),
      currentDisplayName: (c.client.company || "Untitled") + (c.client.campaignName ? (" — " + c.client.campaignName) : ""),
      flashMessage: s.flash,
      statusOptions: statusOptions,
      statusValue: c.status,
      onStatusChange: function(e){ self.updateStatus(e.target.value); },
      goList: function(){ self.setState({screen:"list"}); },
      proposalCount: s.proposals.length,
      newProposal: function(){ self.requestNewProposal(); },
      saveProposal: function(){ self.saveProposal(); },

      hasPendingAction: !!s.pendingAction,
      onSaveAndContinue: function(){ self.resolvePendingSave(); },
      onDiscardAndContinue: function(){ self.resolvePendingDiscard(); },
      onCancelPending: function(){ self.cancelPendingAction(); },

      isBuilderScreen: isBuilderScreen,
      isListScreen: isListScreen,
      navTabs: navTabs,
      wizard: wizard,
      showBottomBar: showBottomBar,

      isClientTab: isBuilderScreen && s.activeTab === "client",
      isObjectivesTab: isBuilderScreen && s.activeTab === "objectives",
      isPackageTab: isBuilderScreen && s.activeTab === "package",
      isCommercialTab: isBuilderScreen && s.activeTab === "commercial",
      isStatsTab: isBuilderScreen && s.activeTab === "stats",
      isTermsTab: isBuilderScreen && s.activeTab === "terms",
      isSignatureTab: isBuilderScreen && s.activeTab === "signature",
      isPreviewTab: isBuilderScreen && s.activeTab === "preview",

      client: client,
      crm: crm,
      logos: logos,

      objectivesList: objectivesList,
      objectivesNotes: c.objectives.notes,
      onObjectivesNotesChange: function(e){ self.updateObjectivesNotes(e.target.value); },

      deliverables: deliverables,
      hasDeliverables: deliverables.length > 0,
      hasNoDeliverables: deliverables.length === 0,
      deliverableSuggestions: deliverableSuggestions,
      onAddBlankDeliverable: function(){ self.addDeliverable(""); },

      pricingModels: pricingModels,
      discountTypes: discountTypes,
      discountUnitLabel: discountUnitLabel,
      vatOptions: vatOptions,
      commercial: commercial,
      totals: totals,

      statsFields: statsFields,

      terms: terms,
      signature: signature,

      hasProposals: proposalRows.length > 0,
      hasNoProposalsAtAll: s.proposals.length === 0,
      hasNoSearchResults: proposalSearchTerm.length > 0 && proposalRows.length === 0,
      proposalRows: proposalRows,
      proposalsSummary: proposalsSummary,
      proposalSearchValue: s.proposalSearch,
      onProposalSearchChange: function(e){ self.updateProposalSearch(e.target.value); },
      onClearProposalSearch: function(){ self.clearProposalSearch(); },

      preview: preview,
      whyPoints: whyPoints,

      confirmingClear: s.confirmingClear,
      notConfirmingClear: !s.confirmingClear,
      onAskClear: function(){ self.askClear(); },
      onCancelClear: function(){ self.cancelClear(); },
      onConfirmClear: function(){ self.confirmClear(); },

      goEditFromPreview: function(){ self.setState({activeTab:"client"}); },

      pdfBusy: s.pdfStatus === "generating",
      pdfButtonLabel: s.pdfStatus === "generating" ? "Generating PDF..." : "Save as PDF",
      hasPdfError: s.pdfStatus === "error" && !!s.pdfError,
      pdfError: s.pdfError,
      onSavePdf: function(){ self.generatePdf(); }
    };
  }
}

if (typeof window !== "undefined") { window.Component = Component; }
