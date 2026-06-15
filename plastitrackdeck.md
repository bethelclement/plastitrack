---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  :root {
    --primary: #10b981; /* Emerald 500 */
    --primary-dark: #047857; /* Emerald 700 */
    --dark: #022c22; /* Emerald 950 */
    --light-bg: #f8fafc; /* Slate 50 */
    --card-bg: #ffffff;
    --text-color: #334155; /* Slate 750 */
  }
  section {
    font-family: 'Outfit', 'Inter', 'Segoe UI', sans-serif;
    background: var(--light-bg);
    color: var(--text-color);
    padding: 50px 70px;
  }
  h1, h2, h3 {
    margin: 0 0 0.3em 0;
  }
  h1 { font-size: 2.8em; font-weight: 900; color: var(--dark); letter-spacing: -0.03em; }
  h2 { font-size: 1.8em; font-weight: 800; color: var(--primary-dark); border-bottom: 4px solid var(--primary); padding-bottom: 6px; display: inline-block; }
  h3 { font-size: 1.3em; font-weight: 800; color: var(--dark); }
  p, li { font-size: 1.05em; line-height: 1.45; color: #475569; }
  ul { margin-top: 5px; margin-bottom: 10px; }
  li { margin-bottom: 6px; }
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: center;
  }
  .grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
  }
  .card {
    background: var(--card-bg);
    padding: 20px;
    border-radius: 16px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.015);
  }
  .card-green {
    background: #ecfdf5;
    border-color: #a7f3d0;
  }
  .highlight {
    color: var(--primary-dark);
    font-weight: 800;
  }
  .tag {
    display: inline-block;
    padding: 4px 10px;
    background: #e2e8f0;
    border-radius: 9999px;
    font-size: 0.7em;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 10px;
  }
  .tag-green { background: #d1fae5; color: #065f46; }
  .tag-blue { background: #dbeafe; color: #1e40af; }
  .tag-orange { background: #ffedd5; color: #9a3412; }
  
  /* Custom layouts */
  section.dark-theme {
    background: linear-gradient(135deg, #022c22 0%, #064e3b 100%);
    color: #f8fafc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px;
  }
  section.dark-theme h1 { color: #ffffff; border: none; font-size: 4em; text-shadow: 0 4px 12px rgba(0,0,0,0.15); margin-bottom: 0.1em;}
  section.dark-theme h2 { color: #a7f3d0; border: none; font-size: 1.8em; margin-bottom: 0.8em; }
  section.dark-theme p { color: #ecfdf5; font-size: 1.25em; }
  
  /* Centered small images */
  .center-img {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
---

<!-- _class: dark-theme -->

![w:360 center-img](./public/plastitrackbes-logo-nobg.png)

# PlastiTrackBES
## Plastics REIMAGINED
**Community recovery hubs, live digital tracking, and premium local upcycling**
*DPI-SGP 2.0 Innovation Challenge — Top 10 Finalist*

<!-- Speaker Notes:
Good morning panel members, program coordinators, and guests. I am Blessing Evea Onwe, Team Lead for PlastiTrackBES. Today, we present our complete closed-loop plastic waste recovery system. By combining physical, women-led aggregation hubs in informal settlements with a transparent digital tracking ledger and premium consumer upcycling, we turn local plastic pollution into sustainable community wealth.
-->

---

<!-- _class: grid-2 -->

## 🚨 The Urban Plastic Crisis

In Nigeria, over **2.5 million tonnes** of plastic waste are generated annually, but less than **10%** is recovered.

- **Informal Settlement Impact:** Drainage systems in hubs like Kuchingoro and Durumi are completely clogged, leading to severe flooding and open burning of toxic waste.
- **The Core Blockers:** Traditional clean-up campaigns fail because there is **no visible neighborhood infrastructure** and **no economic incentive** for behavioral change.
- **Sidelined Communities:** Local women and youth—who bear the worst economic brunt—are locked out of the circular economy value chain.

<div class="card card-green">
  <span class="tag tag-green">The Opportunity</span>
  <h3 style="margin-top:0;">Diverting Waste to Wealth</h3>
  <p style="margin:0; font-size:0.95em;">By placing recovery hubs directly at the source, we capture high-quality resin (PET, HDPE, PP) before it reaches landfills or drainage networks.</p>
</div>

<!-- Speaker Notes:
Nigeria's plastic crisis is rooted in two factors: a lack of visible localized recovery infrastructure and zero economic incentives. Discarded packaging blocks water channels in informal communities, causing flooding. PlastiTrackBES bypasses this by placing recovery hubs directly in Kuchingoro and Durumi, paying residents to divert PET, HDPE, and PP right at the source.
-->

---

<!-- _class: grid-2 -->

## 💡 The Closed-Loop Solution

We bridge the gap between waste collection and high-margin upcycled retail through three key layers:

1. **Decentralized Hubs:** Safe collection points managed by trained local women, providing an immediate cash-for-plastic exchange.
2. **Digital Ledger Tracking:** A public database logging every transaction. Contributors build profile accounts, earn points, and view municipal statistics.
3. **ReVamp! Upcycling Store:** Converts recovered raw plastics into premium consumer goods, proving waste has high aesthetic value.

![w:480 rounded-2xl drop-shadow](./public/images/waste-2-wonder.jpg)

<!-- Speaker Notes:
Our circular solution has three main pillars. First: physical, decentralized hubs inside target settlements, run by local women. Second: a web ledger built on Supabase, ensuring digital accountability. Third: our ReVamp! Upcycled Store, which processes sorted plastics into consumer products, turning a liability into an asset.
-->

---

<!-- _class: grid-2 -->

## 👥 Powerhouse Team & Global Mandates

Our project executes the exact circular and empowerment directives of our sponsors:

- ** Blessn Evea Signature (BES) Team:** Blessing Evea Onwe (Lead/Creative), Bethel Clement (Product/Data), Kenneth Nyong (Ecosystem), and Wakala Bilkisu (Operations).
- **GEF & UNDP SGP Nigeria:** We execute SGP's mandate by creating community-based climate action and empowering women with a **60% income increase**.
- **Digital Peers International (DPI):** Project incubator driving digital circular models.

<div class="grid-3" style="grid-column: 1 / span 2; margin-top:20px;">
  <div class="card" style="padding:15px; text-align:center;">
    <h3 style="margin:0; font-size:1.1em; color:var(--primary-dark);">UNDP SDGs</h3>
    <p style="margin:5px 0 0 0; font-size:0.85em;">Directly addresses SDGs 1, 5, 8, 12, 13</p>
  </div>
  <div class="card" style="padding:15px; text-align:center;">
    <h3 style="margin:0; font-size:1.1em; color:var(--primary-dark);">AEPB Approved</h3>
    <p style="margin:5px 0 0 0; font-size:0.85em;">Official municipal waste recovery permits</p>
  </div>
  <div class="card" style="padding:15px; text-align:center;">
    <h3 style="margin:0; font-size:1.1em; color:var(--primary-dark);">AMAC Sourced</h3>
    <p style="margin:5px 0 0 0; font-size:0.85em;">Physical spaces secured in Durumi & Kuchingoro</p>
  </div>
</div>

<!-- Speaker Notes:
We are supported by the UNDP Small Grants Programme and GEF, which align with SDGs targeting gender equality and climate action. On the ground, we have official permits from the Abuja Environmental Protection Board and physical lease agreements from the AMAC Municipal Council, securing our hubs and collection supply lines.
-->

---

<!-- _class: grid-2 -->

## 📍 Proven Track Record & Sensitization

We built community trust and raw material source channels before writing a single line of code:

- **Youth Upcycling Bootcamps:** Trained preteens and teens in Abuja on creative upcycling, turning PET offcuts into wall decor and accessories.
- **World Earth Day 2026:** Partnered with the **Climate Teen Hub** for the global *Waste 2 Wonder* initiative, demonstrating PET bottle transformation to hundreds of youth.
- **National Media Feature:** Our Assistant Team Lead discussed our circular tracking technology on **Kiss FM**, building solid public credibility.

![w:480 rounded-2xl drop-shadow](./public/images/trial-disc-green.jpg)

<!-- Speaker Notes:
Before building the technology, we validated our community model. We trained local preteens and teens on upcycling PET bottles, transforming waste into room decor. On World Earth Day 2026, we scaled this with the Climate Teen Hub, demonstrating circular processing to hundreds of youth, which earned us a feature slot on Kiss FM.
-->

---

<!-- _class: grid-2 -->

## 📊 Live MVP Platform & Metrics

Our live Next.js Vercel platform displays our verified circular data:

- **Interactive Eco-Calculator:** Slide raw plastic weights (PET, HDPE, PP) to see instant CO₂ avoided and landfill volume saved.
- **Public Impact Dashboard:** Real-time data showing **48.6k kg of plastic recovered**, **1,200 households enrolled**, and **₦2.4M rewards issued**.
- **Green Onboarding:** Contributors track personal plastic weight history, points, and download official environmental certificates.

<div class="card" style="padding:15px;">
  <span class="tag tag-blue">Live URL</span>
  <h3 style="margin-top:0; font-size:1.15em;"><a href="https://plastitrackbes.vercel.app" target="_blank" style="color:var(--primary-dark); text-decoration:none;">plastitrackbes.vercel.app</a></h3>
  <p style="margin:0; font-size:0.9em; line-height:1.4;">Verify hub leaderboard standings, calculate metrics, and test our live traceability search stepper.</p>
</div>

<!-- Speaker Notes:
Our MVP is live and accessible at plastitrackbes.vercel.app. The landing page houses a dynamic Eco Calculator translating kilograms of plastic into environmental metrics. Our public dashboard tracks real-time data: 48.6k kg of plastic recovered, 1,200 households signed up, and over 2.4 million Naira paid out in rewards.
-->

---

## ♻️ ReVamp! Catalog: June Arrivals & BES

Premium upcycled items with exact plastic weight diverted and CO₂ offset calculations:

<div class="grid-3" style="margin-top:15px;">
  <div class="card">
    <span class="tag tag-green">UpTex June</span>
    <h3 style="margin:0 0 5px 0; font-size:1em;">Wristbands (Wristbeads)</h3>
    <p style="margin:0 0 10px 0; font-size:0.85em; color:var(--primary-dark); font-weight:800;">₦1,500 per unit</p>
    <p style="margin:0; font-size:0.8em; line-height:1.3;">PET bottle offcuts cut into beads. Diverts <strong>12g plastic</strong> | Saves <strong>18g CO₂</strong>.</p>
  </div>
  <div class="card">
    <span class="tag tag-green">UpTex June</span>
    <h3 style="margin:0 0 5px 0; font-size:1em;">Earrings Collection</h3>
    <p style="margin:0 0 10px 0; font-size:0.85em; color:var(--primary-dark); font-weight:800;">₦2,500 per pair</p>
    <p style="margin:0; font-size:0.8em; line-height:1.3;">Molded PET on branded display cards. Diverts <strong>8g plastic</strong> | Saves <strong>12g CO₂</strong>.</p>
  </div>
  <div class="card">
    <span class="tag tag-green">UpTex June</span>
    <h3 style="margin:0 0 5px 0; font-size:1em;">Artist Palette + Brush Set</h3>
    <p style="margin:0 0 10px 0; font-size:0.85em; color:var(--primary-dark); font-weight:800;">₦5,000 per set</p>
    <p style="margin:0; font-size:0.8em; line-height:1.3;">HDPE brush holder + PET cap wells. Diverts <strong>185g plastic</strong> | Saves <strong>277g CO₂</strong>.</p>
  </div>
</div>

<div class="grid-3" style="margin-top:15px;">
  <div class="card">
    <span class="tag tag-blue">Educational Game</span>
    <h3 style="margin:0 0 5px 0; font-size:1em;">The Loop Board Game</h3>
    <p style="margin:0 0 10px 0; font-size:0.85em; color:var(--primary-dark); font-weight:800;">₦7,000 per set</p>
    <p style="margin:0; font-size:0.8em; line-height:1.3;">3x3 game board with cap storage can. Diverts <strong>30g HDPE caps</strong> | Saves <strong>45g CO₂</strong>.</p>
  </div>
  <div class="card">
    <span class="tag tag-orange">BES Collection</span>
    <h3 style="margin:0 0 5px 0; font-size:1em;">PET Eco-Broom</h3>
    <p style="margin:0 0 10px 0; font-size:0.85em; color:var(--primary-dark); font-weight:800;">₦10,000 per unit</p>
    <p style="margin:0; font-size:0.8em; line-height:1.3;">PET bottle bristles + HDPE handle. Diverts <strong>500g plastic</strong> | Saves <strong>750g CO₂</strong>.</p>
  </div>
  <div class="card">
    <span class="tag tag-orange">BES Collection</span>
    <h3 style="margin:0 0 5px 0; font-size:1em;">ReVamp Green Paver Disc</h3>
    <p style="margin:0 0 10px 0; font-size:0.85em; color:var(--primary-dark); font-weight:800;">₦5,000 per disc</p>
    <p style="margin:0; font-size:0.8em; line-height:1.3;">Compressed HDPE block. Diverts <strong>1,800g plastic</strong> | Saves <strong>2,700g CO₂</strong>.</p>
  </div>
</div>

<!-- Speaker Notes:
We close the loop through high-margin retail in our ReVamp! Store. On top sits our June UpTex collection: PET wristbands/wristbeads at N1,500, molded statement earrings at N2,500, and our multi-material artist palette. We also sell the Loop Game at N7,000, which uses 6 caps in a dedicated storage can to teach youths circular economics, alongside our original BES items.
-->

---

<!-- _class: grid-2 -->

## 🔗 Verified Traceability & Ledger Data

Our platform maps every transaction. Searching any receipt ID (e.g., `PT-642189` or `PT-702315`) displays a live vertical stepper:

1. **Collection:** Logged at Kuchingoro Hub by Aisha M. (June 10)
2. **Ledger Registry:** Weighed, recorded, and points issued.
3. **Depot Processing:** Cleaned, color-sorted, and prepped.
4. **Artisanal Crafting:** Assembled at the UpTex Workshop (June 14).
5. **Secure Order Delivery:** Checked out by customer today, June 15.

<div class="card card-green">
  <span class="tag tag-green">Live June Entry</span>
  <h4 style="margin:0 0 5px 0;">Order PT-642189 (Wristbeads)</h4>
  <p style="margin:0; font-size:0.85em; line-height:1.4;">Customer order successfully matched to raw plastic collected by Aisha M. on June 10, showing 100% verified circular accountability.</p>
</div>

<!-- Speaker Notes:
What makes us unique is our public ledger. Customers checkout using bank transfer and receipt upload. When they receive their tracking code, they can query it on the Traceability page to inspect the vertical timeline showing exactly who collected the raw plastic, when it was processed at our depot, and when it was finished at our workshop.
-->

---

<!-- _class: grid-2 -->

## 💼 Viable Business Model & Scale

We achieve financial sustainability and eliminate grant reliance through three revenue streams:

- **Upcycled Product Sales:** Selling high-margin items (Earrings, Paver Discs, Brooms, Loop Games) to B2C consumers and B2B corporate partners for ESG gifting.
- **Raw Material Supply:** Selling clean, color-sorted shredded PET flakes and HDPE crushed regrind to large-scale industrial plastic manufacturers.
- **Traceability-as-a-Service (TaaS):** Monthly subscription dashboard for FMCG companies to track their local EPR recovery points.

<div class="card" style="padding:15px;">
  <span class="tag tag-orange">Scale Goal</span>
  <h3 style="margin-top:0; font-size:1.1em;">18-Month Break-Even</h3>
  <p style="margin:0; font-size:0.85em; line-height:1.4;">Transitioning completely from seed grants to self-funded municipal operations via product sales and B2B raw material contracts.</p>
</div>

<!-- Speaker Notes:
We are built for financial independence. Our revenue streams include upcycled product sales, raw material supply contracts of clean shredded flakes to plastic manufacturers, and Traceability-as-a-Service subscriptions for consumer brand partners who must prove their Extended Producer Responsibility packaging compliance points on our ledger.
-->

---

<!-- _class: grid-2 -->

## 🍃 Eco-Friendly Green Computing MVP

We believe digital platforms should not contribute to the carbon footprints they aim to solve:

- **Low-Carbon Hosting:** The PlastiTrackBES platform is hosted in cloud regions running on 100% renewable wind and solar energy.
- **Client-Side Eco Mode Toggle:** Interactive switch that disables intensive animations and rendering loops, saving device CPU battery by up to **25%**.
- **Next.js Static Compilation:** Server rendering overhead is reduced to zero by pre-rendering public pages (SSG/ISR), preventing database compute cycles.
- **OLED Energy Savings:** Built-in Dark Theme reduces screen brightness power usage by up to **60%** on mobile displays.

<!-- Speaker Notes:
We practice green computing. Our digital architecture is hosted in carbon-neutral cloud regions. We compile public pages statically to prevent server compute cycles, implement a high-contrast dark theme reducing mobile OLED screen drain, and built a custom client-side Eco Mode that disables animations, saving up to 25% CPU device energy.
-->

---

<!-- _class: dark-theme -->

# Thank You.
### Let's Build a Circular Nigeria, Together.

![w:180 center-img mt-4 mb-4](./public/images/qr-code-white.png)

**Live MVP Platform:** [plastitrackbes.vercel.app](https://plastitrackbes.vercel.app)
**Contact:** safe@plastitrackbes.org

*Supported & Incubated by SGP Nigeria, GEF, UNDP, and Digital Peers International.*

<!-- Speaker Notes:
Thank you, members of the panel. PlastiTrackBES is ready to scale. We invite you to scan this brand-aligned QR code or visit plastitrackbes.vercel.app on your devices right now to test our eco calculator, query our June traceability ledger, and check out our upcycled store. We are now open for your questions and feedback.
-->
