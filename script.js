import Lenis from 'lenis';

(() => {

        const html = document.documentElement;
        const preloader = document.getElementById('preloader');
        const loaderWordmark = document.getElementById('loaderWordmark');
        const loaderFill = document.getElementById('loaderFill');

        // ── ROOT SCALE UP ──
        const FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666;
        function updateScale() {
            const innerWidth = window.innerWidth;
            const reduction = ((BASE_W - innerWidth) / BASE_W) * 100 * COEF;
            const size = FONT_BASE - (FONT_BASE * reduction) / 100;
            if (size > FONT_BASE) {
                html.style.fontSize = size + "px";
            } else {
                html.style.removeProperty("font-size");
            }
        }
        window.addEventListener("resize", updateScale);
        updateScale();

        // ── SMOOTH SCROLL INIT ──
        const lenis = new Lenis({
            smoothWheel: true
        });

        function raf(t) {
            lenis.raf(t);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        window.scrollTo(0, 0);

        // Lock & Unlock scrolling helper
        function lockScroll() {
            lenis.stop();
            html.classList.add('scroll-locked');
        }
        function unlockScroll() {
            lenis.start();
            html.classList.remove('scroll-locked');
        }
        lockScroll(); // Locked for preloader initially

        // ── SIMPLE SPRING ENGINE ──
        class SpringSolver {
            constructor() {
                this.springs = [];
                this.lastTime = performance.now();
                this.tick = this.tick.bind(this);
                requestAnimationFrame(this.tick);
            }

            animate(id, target, tension = 170, friction = 26, onUpdate) {
                let s = this.springs.find(item => item.id === id);
                if (!s) {
                    s = { id, x: 0, v: 0, target, tension, friction, onUpdate };
                    this.springs.push(s);
                } else {
                    s.target = target;
                    s.tension = tension;
                    s.friction = friction;
                    s.onUpdate = onUpdate;
                }
            }

            setStart(id, val) {
                let s = this.springs.find(item => item.id === id);
                if (s) {
                    s.x = val;
                } else {
                    this.springs.push({ id, x: val, v: 0, target: val, tension: 170, friction: 26, onUpdate: () => { } });
                }
            }

            tick(time) {
                const dt = Math.min((time - this.lastTime) / 1000, 0.1);
                this.lastTime = time;

                for (let i = this.springs.length - 1; i >= 0; i--) {
                    const s = this.springs[i];
                    const force = -s.tension * (s.x - s.target) - s.friction * s.v;
                    s.v += force * dt;
                    s.x += s.v * dt;

                    if (s.onUpdate) s.onUpdate(s.x);

                    if (Math.abs(s.x - s.target) < 0.001 && Math.abs(s.v) < 0.001) {
                        s.x = s.target;
                        s.v = 0;
                        if (s.onUpdate) s.onUpdate(s.x);
                        this.springs.splice(i, 1);
                    }
                }
                requestAnimationFrame(this.tick);
            }
        }
        const springs = new SpringSolver();

        // ── TEXT REVEAL HELPER (CLIP MASK & STAGGER) ──
        function revealWords(container, wordsText, duration = 1100, delayBase = 0, staggerOffset = 140) {
            container.innerHTML = '';
            const words = wordsText.split(' ');
            words.forEach((word, idx) => {
                const wrapper = document.createElement('span');
                wrapper.className = 'clip-mask-wrapper';

                const inner = document.createElement('span');
                inner.className = 'clip-mask-inner';
                inner.textContent = word + (idx === words.length - 1 ? '' : ' ');
                inner.style.transitionDuration = `${duration}ms`;
                inner.style.transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';

                wrapper.appendChild(inner);
                container.appendChild(wrapper);

                setTimeout(() => {
                    inner.classList.add('revealed');
                }, delayBase + (idx * staggerOffset));
            });
        }

        function revealLines(container, linesArray, duration = 900, delayBase = 350, staggerOffset = 110) {
            container.innerHTML = '';
            linesArray.forEach((lineText, idx) => {
                const wrapper = document.createElement('span');
                wrapper.className = 'clip-mask-wrapper';
                wrapper.style.display = 'block';

                const inner = document.createElement('span');
                inner.className = 'clip-mask-inner';
                inner.textContent = lineText;
                inner.style.transitionDuration = `${duration}ms`;
                inner.style.transitionTimingFunction = 'cubic-bezier(0.16, 1, 0.3, 1)';

                wrapper.appendChild(inner);
                container.appendChild(wrapper);

                setTimeout(() => {
                    inner.classList.add('revealed');
                }, delayBase + (idx * staggerOffset));
            });
        }

        // ── INVIEW OBSERVER ──
        const inviewObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    inviewObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-inview').forEach(el => {
            inviewObserver.observe(el);
        });

        // Special Trigger for Title Reveals on sections
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    if (id === 'modulesTitle') {
                        revealLines(entry.target, ["One Platform.", "Five Worlds."], 950, 0, 120);
                    } else if (id === 'problemTitle') {
                        revealLines(entry.target, ["The Fragmentation", "Trap."], 950, 0, 120);
                    } else if (id === 'featuresSectionTitle') {
                        revealLines(entry.target, ["Everything Your Hotel Needs.", "Built From Scratch."], 950, 0, 120);
                    } else if (id === 'statsTitle') {
                        revealLines(entry.target, ["Proven Metrics.", "Real Impact."], 950, 0, 120);
                    } else if (id === 'testimonialsTitle') {
                        revealLines(entry.target, ["Loved by the", "Locker Room"], 950, 0, 120);
                    } else if (id === 'footerCtaTitle') {
                        revealLines(entry.target, ["Ready to", "unify?"], 950, 0, 120);
                    }
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        ['modulesTitle', 'problemTitle', 'featuresSectionTitle', 'statsTitle', 'testimonialsTitle', 'footerCtaTitle'].forEach(id => {
            const el = document.getElementById(id);
            if (el) titleObserver.observe(el);
        });

        // ── PARALLAX LOGIC ──
        const heroBg = document.getElementById('heroBg');
        lenis.on('scroll', (e) => {
            // Hero Parallax background plate (0% -> 12% shift)
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const progress = Math.min(scrollY / windowHeight, 1);
            if (heroBg) {
                heroBg.style.transform = `translateY(${progress * 12}%)`;
            }
        });

        // ── LOADER ANIMATION TIMER ──
        const MIN_VISIBLE_MS = 1400;
        const MAX_VISIBLE_MS = 2600;
        const EXIT_MS = 850;
        const startLoaderTime = performance.now();

        // Stagger wordmark text
        setTimeout(() => {
            loaderWordmark.style.transition = 'opacity 0.7s, transform 0.7s';
            loaderWordmark.style.opacity = '1';
            loaderWordmark.style.transform = 'translateY(0)';
        }, 100);

        // Progress bar fill (0 to 1)
        setTimeout(() => {
            loaderFill.style.transition = 'transform 1.28s cubic-bezier(0.645, 0.045, 0.355, 1)';
            loaderFill.style.transform = 'scaleX(1)';
        }, 120);

        function startReveal() {
            // Exit curtain preloader
            preloader.style.transition = 'transform 0.85s cubic-bezier(0.76, 0, 0.24, 1)';
            preloader.style.transform = 'translateY(-105%)';

            unlockScroll();

            // Animate Hero text elements in
            setTimeout(() => {
                revealWords(document.getElementById('heroTitle'), "The Hotel Operating System", 1100, 0, 140);
            }, 300);

            // Remove curtain from DOM after transition completes
            setTimeout(() => {
                preloader.remove();
            }, EXIT_MS + 200);
        }

        // Force loader finish if window loaded or timeout hit
        window.addEventListener('load', () => {
            const elapsed = performance.now() - startLoaderTime;
            const delay = Math.max(MIN_VISIBLE_MS - elapsed, 0);
            setTimeout(startReveal, delay);
        });

        // Safety fallback
        setTimeout(() => {
            if (document.getElementById('preloader')) {
                startReveal();
            }
        }, MAX_VISIBLE_MS);


        // ── HERO OUTLETS / MOCK DATA SWITCHER ──
        const hotelData = {
            all: {
                metrics: [34, 30, 47, 20],
                bookings: [
                    { name: "Nitesh Sharma", sub: "Room 201 · Daily", tag: "Daily", amt: "₹1,121", tagClass: "tag-daily" },
                    { name: "Ankit Verma", sub: "Suite A · Monthly", tag: "Monthly", amt: "₹19,057", tagClass: "tag-monthly" },
                    { name: "Priya Mehta", sub: "Room 105 · 14:00", tag: "2h Hourly", amt: "₹446", tagClass: "tag-hourly" }
                ],
                chart: [40, 60, 80, 50, 75, 90],
                status: [
                    { dot: "dot-green", label: "Restaurant POS", sub: "3 live orders" },
                    { dot: "dot-blue", label: "Bar Operations", sub: "Table 9 pending" },
                    { dot: "dot-gold", label: "Event BEO", sub: "Hans Wedding" }
                ]
            },
            regency: {
                metrics: [12, 8, 22, 10],
                bookings: [
                    { name: "Rajesh Sharma", sub: "Suite A · Daily", tag: "Daily", amt: "₹2,500", tagClass: "tag-daily" },
                    { name: "Hans Ojha", sub: "Room 102 · Daily", tag: "Daily", amt: "₹1,800", tagClass: "tag-daily" },
                    { name: "Vikram Aditya", sub: "Room 203 · Monthly", tag: "Monthly", amt: "₹22,000", tagClass: "tag-monthly" }
                ],
                chart: [30, 50, 70, 45, 60, 80],
                status: [
                    { dot: "dot-green", label: "Laundry", sub: "2 baskets pending" },
                    { dot: "dot-blue", label: "Room Service", sub: "Room 102 KOT" },
                    { dot: "dot-gold", label: "Banquets", sub: "Ready for Evening" }
                ]
            },
            palace: {
                metrics: [15, 14, 16, 6],
                bookings: [
                    { name: "Pankaj Kumar", sub: "Room 205 · Monthly", tag: "Monthly", amt: "₹15,000", tagClass: "tag-monthly" },
                    { name: "Priya Mehta", sub: "Room 101 · 15:00", tag: "3h Hourly", amt: "₹500", tagClass: "tag-hourly" },
                    { name: "Neeraj Soni", sub: "Room 103 · Daily", tag: "Daily", amt: "₹1,200", tagClass: "tag-daily" }
                ],
                chart: [20, 35, 50, 60, 40, 55],
                status: [
                    { dot: "dot-green", label: "Bar Sync", sub: "Excise compliant" },
                    { dot: "dot-blue", label: "Main Gate", sub: "Camera online" },
                    { dot: "dot-gold", label: "Staff Duty", sub: "Night shift assigned" }
                ]
            }
        };

        const tabButtons = document.querySelectorAll('.mock-tab');
        const hotelSwitcher = document.querySelector('.mock-switcher');
        const switcherLabel = document.getElementById('currentHotel');
        let selectedHotel = 'all';

        // Dropdown list creation for switcher
        const switcherDropdown = document.createElement('div');
        switcherDropdown.className = 'header-standard-dropdown';
        switcherDropdown.style.top = '100%';
        switcherDropdown.style.left = '0';
        switcherDropdown.style.width = '10rem';
        switcherDropdown.style.padding = '0.5rem';
        switcherDropdown.innerHTML = `
      <a href="javascript:void(0)" class="dropdown-link-item" data-val="all">All Hotels</a>
      <a href="javascript:void(0)" class="dropdown-link-item" data-val="regency">Grand Regency</a>
      <a href="javascript:void(0)" class="dropdown-link-item" data-val="palace">Shiv Palace</a>
    `;
        hotelSwitcher.appendChild(switcherDropdown);

        hotelSwitcher.addEventListener('click', (e) => {
            e.stopPropagation();
            switcherDropdown.style.opacity = switcherDropdown.style.opacity === '1' ? '0' : '1';
            switcherDropdown.style.visibility = switcherDropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
            switcherDropdown.style.transform = switcherDropdown.style.transform === 'translateY(0px)' ? 'translateY(1rem)' : 'translateY(0px)';
        });

        document.addEventListener('click', () => {
            switcherDropdown.style.opacity = '0';
            switcherDropdown.style.visibility = 'hidden';
            switcherDropdown.style.transform = 'translateY(1rem)';
        });

        switcherDropdown.querySelectorAll('.dropdown-link-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const val = item.getAttribute('data-val');
                switcherLabel.textContent = item.textContent;
                selectedHotel = val;
                updateMockDashboard();
            });
        });

        function updateMockDashboard() {
            const data = hotelData[selectedHotel];

            // Update metrics
            const metricNums = document.querySelectorAll('.mock-metric-num');
            metricNums[0].textContent = data.metrics[0];
            metricNums[1].textContent = data.metrics[1];
            metricNums[2].textContent = data.metrics[2];
            metricNums[3].textContent = data.metrics[3];

            // Update bookings
            const bookingsBox = document.querySelector('.mock-bookings');
            bookingsBox.innerHTML = `<div class="mock-section-title">Active Bookings</div>`;
            data.bookings.forEach(b => {
                const row = document.createElement('div');
                row.className = 'mock-row';
                row.innerHTML = `
          <div>
            <div class="mock-row-name">${b.name}</div>
            <div class="mock-row-sub">${b.sub}</div>
          </div>
          <div style="text-align:right">
            <span class="mock-tag ${b.tagClass}">${b.tag}</span>
            <div class="mock-amount" style="margin-top:3px">${b.amt}</div>
          </div>
        `;
                bookingsBox.appendChild(row);
            });

            // Update chart bars
            const bars = document.querySelectorAll('.mock-bars .mock-bar');
            bars.forEach((bar, i) => {
                bar.style.height = `${data.chart[i]}%`;
            });

            // Update status row
            const statusBox = document.getElementById('heroStatus');
            statusBox.innerHTML = '';
            data.status.forEach(s => {
                const div = document.createElement('div');
                div.className = 'mock-status';
                div.innerHTML = `
          <div class="status-dot ${s.dot}"></div>
          <div class="mock-status-text"><strong>${s.label}</strong>${s.sub}</div>
        `;
                statusBox.appendChild(div);
            });
        }

        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const tab = btn.getAttribute('data-tab');
                if (tab === 'restaurant') {
                    selectedHotel = 'regency';
                } else if (tab === 'bar') {
                    selectedHotel = 'palace';
                } else {
                    selectedHotel = 'all';
                }
                switcherLabel.textContent = selectedHotel === 'all' ? 'All Hotels' : (selectedHotel === 'regency' ? 'Grand Regency' : 'Shiv Palace');
                updateMockDashboard();
            });
        });


        // ── SMART CALENDAR MODULE SELECTOR ──
        const calendarDaysData = {
            daily: `
        <div class="cal-day-cell booked"><span class="cal-d">Mon</span><span class="cal-n">14</span><span class="cal-label">Daily</span></div>
        <div class="cal-day-cell"><span class="cal-d">Tue</span><span class="cal-n">15</span></div>
        <div class="cal-day-cell"><span class="cal-d">Wed</span><span class="cal-n">16</span></div>
        <div class="cal-day-cell booked"><span class="cal-d">Thu</span><span class="cal-n">17</span><span class="cal-label">Daily</span></div>
        <div class="cal-day-cell booked"><span class="cal-d">Fri</span><span class="cal-n">18</span><span class="cal-label">Daily</span></div>
      `,
            hourly: `
        <div class="cal-day-cell booked-gold"><span class="cal-d">Mon</span><span class="cal-n">14</span><span class="cal-label">2h Slot</span></div>
        <div class="cal-day-cell booked-gold"><span class="cal-d">Tue</span><span class="cal-n">15</span><span class="cal-label">4h Slot</span></div>
        <div class="cal-day-cell"><span class="cal-d">Wed</span><span class="cal-n">16</span></div>
        <div class="cal-day-cell"><span class="cal-d">Thu</span><span class="cal-n">17</span></div>
        <div class="cal-day-cell booked-gold"><span class="cal-d">Fri</span><span class="cal-n">18</span><span class="cal-label">3h Slot</span></div>
      `,
            monthly: `
        <div class="cal-day-cell booked-mint"><span class="cal-d">Mon</span><span class="cal-n">14</span><span class="cal-label">Monthly</span></div>
        <div class="cal-day-cell booked-mint"><span class="cal-d">Tue</span><span class="cal-n">15</span><span class="cal-label">Monthly</span></div>
        <div class="cal-day-cell booked-mint"><span class="cal-d">Wed</span><span class="cal-n">16</span><span class="cal-label">Monthly</span></div>
        <div class="cal-day-cell booked-mint"><span class="cal-d">Thu</span><span class="cal-n">17</span><span class="cal-label">Monthly</span></div>
        <div class="cal-day-cell booked-mint"><span class="cal-d">Fri</span><span class="cal-n">18</span><span class="cal-label">Monthly</span></div>
      `
        };

        const calendarBtnRow = document.querySelectorAll('.booking-type-btn');
        const calendarStrip = document.getElementById('calendarStrip');

        calendarBtnRow.forEach(btn => {
            btn.addEventListener('click', () => {
                calendarBtnRow.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const type = btn.getAttribute('data-type');
                calendarStrip.style.opacity = 0;
                setTimeout(() => {
                    calendarStrip.innerHTML = calendarDaysData[type];
                    calendarStrip.style.opacity = 1;
                }, 200);
            });
        });


        // ── POS SYNC REAL-TIME VISUAL LOOP ──
        const receiptTotal = document.getElementById('receiptTotal');
        const receiptFood = document.getElementById('receiptFood');
        const receiptDrink = document.getElementById('receiptDrink');

        const nodeRest = document.getElementById('nodeRestaurant');
        const nodePos = document.getElementById('nodePOS');
        const nodeRoom = document.getElementById('nodeRoom');

        const conn1 = document.getElementById('connector1');
        const conn2 = document.getElementById('connector2');

        let syncStep = 0;

        function runSyncVisualAnimation() {
            if (syncStep === 0) {
                receiptFood.style.display = 'none';
                receiptDrink.style.display = 'none';
                receiptTotal.textContent = '₹2,511';

                nodeRest.classList.remove('active-glow');
                nodePos.classList.remove('active-glow');
                nodeRoom.classList.remove('active-glow');
                conn1.classList.remove('pulsing');
                conn2.classList.remove('pulsing');

                setTimeout(() => nodeRest.classList.add('active-glow'), 100);
                syncStep = 1;
            } else if (syncStep === 1) {
                conn1.classList.add('pulsing');
                setTimeout(() => nodePos.classList.add('active-glow'), 800);
                syncStep = 2;
            } else if (syncStep === 2) {
                conn2.classList.add('pulsing');
                setTimeout(() => {
                    nodeRoom.classList.add('active-glow');
                    receiptFood.style.display = 'flex';
                    receiptDrink.style.display = 'flex';
                    animatePrice(2511, 3336, 800);
                }, 800);
                syncStep = 3;
            } else {
                syncStep = 0;
            }
        }

        function animatePrice(start, end, duration) {
            let startTime = null;
            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                receiptTotal.textContent = '₹' + value.toLocaleString();
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }

        setInterval(runSyncVisualAnimation, 3000);
        runSyncVisualAnimation();


        // ── MULTI-VENDOR ARCHITECTURE HIGHLIGHTER ──
        let activeLayerIdx = 0;
        const layers = ['layerSuper', 'layerVendor', 'layerModule', 'layerStaff'];

        function rotateLayerHighlight() {
            layers.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('layer-active');
            });

            const activeEl = document.getElementById(layers[activeLayerIdx]);
            if (activeEl) activeEl.classList.add('layer-active');

            activeLayerIdx = (activeLayerIdx + 1) % layers.length;
        }

        setInterval(rotateLayerHighlight, 3000);
        rotateLayerHighlight();


        // ── FLUTTER MOBILE APP LOOP ──
        const phoneScreenStates = [
            `
      <div class="phone-screen-content" id="phoneAppContent">
        <div class="phone-header">
          <div class="phone-logo">PixelGo</div>
          <div class="phone-notif">🔔</div>
        </div>
        <div class="phone-metrics">
          <div class="ph-metric"><div class="ph-num" style="color:var(--brand)">47</div><div class="ph-lbl">Active Stays</div></div>
          <div class="ph-metric"><div class="ph-num" style="color:var(--brand-light)">20</div><div class="ph-lbl">Available</div></div>
          <div class="ph-metric"><div class="ph-num" style="color:var(--accent-gold)">₹3.2L</div><div class="ph-lbl">Month Revenue</div></div>
          <div class="ph-metric"><div class="ph-num" style="color:#ff6b8a">34</div><div class="ph-lbl">Delayed CO</div></div>
        </div>
        <div class="phone-actions">
          <div class="ph-action" style="border:1px solid rgba(76,111,255,0.3);background:rgba(76,111,255,0.1)"><span class="ph-action-icon">📋</span>Book Room</div>
          <div class="ph-action"><span class="ph-action-icon">🍽️</span>POS</div>
        </div>
        <div style="font-size:0.55rem;color:var(--ink-soft);margin-bottom:2px;text-transform:uppercase;letter-spacing:0.08em;font-weight:600">Recent Bookings</div>
        <div class="phone-bookings">
          <div class="ph-book-row">
            <div><div class="ph-book-name">Nitesh S.</div><div class="ph-book-sub">Room 201 · Daily</div></div>
            <span class="ph-book-status status-in">Checked In</span>
          </div>
          <div class="ph-book-row">
            <div><div class="ph-book-name">Ankit V.</div><div class="ph-book-sub">Suite A · Monthly</div></div>
            <span class="ph-book-status status-pending">Pending CI</span>
          </div>
        </div>
      </div>
      `,
            `
      <div class="phone-screen-content" id="phoneAppContent">
        <div class="phone-header" style="border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:6px;margin-bottom:8px">
          <div class="phone-logo" style="color:#fff;font-size:0.75rem">← Check In Guest</div>
          <div style="font-size:0.6rem;color:var(--brand-light)">Step 2 of 2</div>
        </div>
        <div style="flex-grow:1;display:flex;flex-direction:column;gap:8px;margin-top:4px">
          <div>
            <label style="font-size:0.5rem;color:var(--ink-soft);display:block;margin-bottom:2px">GUEST NAME</label>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:6px 8px;font-size:0.65rem;color:#fff;font-weight:600">Hans Ojha</div>
          </div>
          <div>
            <label style="font-size:0.5rem;color:var(--ink-soft);display:block;margin-bottom:2px">ASSIGNED ROOM</label>
            <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:6px 8px;font-size:0.65rem;color:#fff;display:flex;justify-content:space-between;align-items:center">
              <span>Room 102 (Deluxe)</span>
              <span style="color:var(--brand-light);font-size:0.55rem">● Clean</span>
            </div>
          </div>
          <button style="background:var(--brand-light);color:#080b18;border:none;border-radius:8px;padding:8px;font-size:0.65rem;font-weight:700;margin-top:auto;cursor:pointer;box-shadow:0 4px 10px rgba(0,212,168,0.25)">✓ Confirm Check-In</button>
        </div>
      </div>
      `,
            `
      <div class="phone-screen-content" id="phoneAppContent">
        <div class="phone-header" style="border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:6px;margin-bottom:8px">
          <div class="phone-logo" style="color:#fff;font-size:0.75rem">← Restaurant POS</div>
          <div style="font-size:0.6rem;color:var(--accent-gold)">Table 5</div>
        </div>
        <div style="flex-grow:1;display:flex;flex-direction:column;gap:8px;margin-top:4px">
          <div style="font-size:0.55rem;color:var(--ink-soft);text-transform:uppercase;letter-spacing:0.08em">Ordered Items</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#fff">
              <span>Butter Chicken x1</span>
              <span>₹425</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#fff">
              <span>Garlic Naan x3</span>
              <span>₹120</span>
            </div>
            <div style="border-top:1px dashed rgba(255,255,255,0.1);padding-top:6px;margin-top:2px;display:flex;justify-content:space-between;font-size:0.7rem;font-weight:700;color:var(--brand-light)">
              <span>Total Bill</span>
              <span>₹545</span>
            </div>
          </div>
          <button style="background:var(--brand);color:#fff;border:none;border-radius:8px;padding:8px;font-size:0.65rem;font-weight:700;margin-top:auto;cursor:pointer;box-shadow:0 4px 10px rgba(76,111,255,0.25)">⚡ Push to Room Invoice</button>
        </div>
      </div>
      `
        ];

        let phoneStateIdx = 0;
        function rotatePhoneScreen() {
            const screen = document.getElementById('phoneAppScreen');
            if (!screen) return;
            const content = screen.querySelector('.phone-screen-content');
            if (!content) return;

            content.style.opacity = 0;
            content.style.transform = 'translateX(-15px)';
            content.style.transition = 'opacity 0.25s, transform 0.25s';

            setTimeout(() => {
                phoneStateIdx = (phoneStateIdx + 1) % phoneScreenStates.length;
                screen.innerHTML = phoneScreenStates[phoneStateIdx];

                const newContent = screen.querySelector('.phone-screen-content');
                newContent.style.opacity = 0;
                newContent.style.transform = 'translateX(15px)';

                newContent.offsetHeight;

                newContent.style.transition = 'opacity 0.25s, transform 0.25s';
                newContent.style.opacity = 1;
                newContent.style.transform = 'translateX(0)';
            }, 250);
        }

        // Auto loop screen rotate
        setInterval(rotatePhoneScreen, 4000);

        // ── BENTO WIDGET ANIMATIONS ──
        let leakState = 0;
        const leakFlowPOS = document.getElementById('leakFlowPOS');
        const leakFlowRoom = document.getElementById('leakFlowRoom');
        const leakFlowStatus = document.getElementById('leakFlowStatus');

        function animateBentoLeakage() {
            if (!leakFlowPOS || !leakFlowRoom || !leakFlowStatus) return;
            if (leakState === 0) {
                leakFlowPOS.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                leakFlowRoom.style.borderColor = 'rgba(239, 68, 68, 0.4)';
                leakFlowStatus.textContent = 'Not Charged ✗';
                leakFlowStatus.style.color = '#ef4444';
                leakState = 1;
            } else {
                leakFlowPOS.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                leakFlowRoom.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                leakFlowStatus.textContent = 'Auto Synced ✓';
                leakFlowStatus.style.color = '#10b981';
                leakState = 0;
            }
        }
        setInterval(animateBentoLeakage, 3000);

        let bentoMetricBase = 47230;
        const bentoMetricVal = document.getElementById('bentoMetricVal');

        function animateBentoVisibility() {
            if (!bentoMetricVal) return;
            const delta = Math.floor((Math.random() - 0.4) * 800);
            bentoMetricBase += delta;
            bentoMetricVal.textContent = '₹' + bentoMetricBase.toLocaleString();

            const bentoBars = document.querySelectorAll('#bentoChartBars .bento-chart-bar');
            bentoBars.forEach(bar => {
                const newHeight = Math.floor(Math.random() * 70) + 20;
                bar.style.height = newHeight + '%';
            });
        }
        setInterval(animateBentoVisibility, 2000);

        let calState = 0;
        const bentoCalCell = document.querySelector('#bentoCalGrid div:nth-child(2)');
        const bentoCalBadge = document.getElementById('bentoCalBadge');

        function animateBentoCalendar() {
            if (!bentoCalCell || !bentoCalBadge) return;
            if (calState === 0) {
                bentoCalCell.style.borderColor = '#ef4444';
                bentoCalBadge.className = 'bento-cal-badge bento-badge-warn';
                bentoCalBadge.textContent = 'Overlap';
                calState = 1;
            } else {
                bentoCalCell.style.borderColor = '#10b981';
                bentoCalBadge.className = 'bento-cal-badge bento-badge-ok';
                bentoCalBadge.textContent = 'Resolved';
                calState = 0;
            }
        }
        setInterval(animateBentoCalendar, 2500);

        let kycStep = 0;
        const kycStep2 = document.getElementById('kycStep2');
        const kycStep3 = document.getElementById('kycStep3');

        function animateBentoKYC() {
            if (!kycStep2 || !kycStep3) return;
            if (kycStep === 0) {
                kycStep2.className = 'bento-kyc-step';
                kycStep3.className = 'bento-kyc-step';
                kycStep2.classList.remove('checked');
                kycStep3.classList.remove('checked');
                kycStep = 1;
            } else if (kycStep === 1) {
                kycStep2.className = 'bento-kyc-step checked active';
                kycStep = 2;
            } else {
                kycStep3.className = 'bento-kyc-step checked active';
                kycStep = 0;
            }
        }
        setInterval(animateBentoKYC, 2000);

        let bentoTaskState = 0;
        const taskDot = document.getElementById('taskDotHousekeep');
        const taskText = document.getElementById('taskTextHousekeep');

        function animateBentoTasks() {
            if (!taskDot || !taskText) return;
            if (bentoTaskState === 0) {
                taskDot.style.background = '#ef4444';
                taskDot.style.boxShadow = '0 0 6px #ef4444';
                taskText.textContent = 'Assign Clean (Delayed 24m)';
                taskText.style.color = '#ef4444';
                bentoTaskState = 1;
            } else {
                taskDot.style.background = '#10b981';
                taskDot.style.boxShadow = '0 0 6px #10b981';
                taskText.textContent = 'Housekeeping Cleaned ✓';
                taskText.style.color = '#10b981';
                bentoTaskState = 0;
            }
        }
        setInterval(animateBentoTasks, 3000);



        // ── MICROMOTION HOVERS (SPRING ENGINE) ──
        const isMobile = window.innerWidth <= 768;

        if (!isMobile) {
            // 1. Program Row hovers (Nudges arrow to x=8, opacity=1)
            document.querySelectorAll('.js-program-hover').forEach((row, i) => {
                const arrowSvg = row.querySelector('.module-arrow svg');
                row.addEventListener('mouseenter', () => {
                    springs.animate(`prog-arrow-x-${i}`, 8, 300, 20, (x) => {
                        arrowSvg.style.transform = `translateX(${x}px)`;
                    });
                    springs.animate(`prog-arrow-op-${i}`, 1, 300, 20, (op) => {
                        arrowSvg.style.opacity = op;
                    });
                });
                row.addEventListener('mouseleave', () => {
                    springs.animate(`prog-arrow-x-${i}`, 0, 300, 20, (x) => {
                        arrowSvg.style.transform = `translateX(${x}px)`;
                    });
                    springs.animate(`prog-arrow-op-${i}`, 0.65, 300, 20, (op) => {
                        arrowSvg.style.opacity = op;
                    });
                });
            });

            // 2. Button Arrow hovers (nudge x=5)
            document.querySelectorAll('.btn-pill').forEach((btn, i) => {
                const arrowSvg = btn.querySelector('.js-hover-svg-arrow');
                if (arrowSvg) {
                    btn.addEventListener('mouseenter', () => {
                        springs.animate(`btn-arrow-${i}`, 5, 320, 20, (x) => {
                            arrowSvg.style.transform = `translateX(${x}px)`;
                        });
                    });
                    btn.addEventListener('mouseleave', () => {
                        springs.animate(`btn-arrow-${i}`, 0, 320, 20, (x) => {
                            arrowSvg.style.transform = `translateX(${x}px)`;
                        });
                    });
                }
            });

            // 3. Testimonial Card lifts (lifts y=0 -> -8)
            document.querySelectorAll('.js-hover-lift').forEach((card, i) => {
                card.addEventListener('mouseenter', () => {
                    springs.animate(`test-lift-${i}`, -8, 300, 22, (y) => {
                        card.style.transform = `translateY(${y}px)`;
                    });
                });
                card.addEventListener('mouseleave', () => {
                    springs.animate(`test-lift-${i}`, 0, 300, 22, (y) => {
                        card.style.transform = `translateY(${y}px)`;
                    });
                });
            });
        }


        // ── FULLSCREEN BURGER MENU (MOBILE) ──
        const burgerBtn = document.getElementById('burgerBtn');
        const menuOverlay = document.getElementById('menuOverlay');
        const menuCloseBtn = document.getElementById('menuCloseBtn');
        const menuPanel = document.getElementById('menuPanel');
        const menuBackdrop = document.getElementById('menuBackdrop');
        const menuLinks = document.querySelectorAll('.js-menu-link');

        function openMenu() {
            menuOverlay.classList.add('active');
            menuOverlay.setAttribute('aria-hidden', 'false');
            lockScroll();

            // Stagger menu links
            menuLinks.forEach((link, idx) => {
                link.style.opacity = 0;
                link.style.transform = 'translateY(28px)';
                setTimeout(() => {
                    link.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    link.style.opacity = 1;
                    link.style.transform = 'translateY(0)';
                }, 120 + (idx * 70));
            });
        }

        function closeMenu() {
            menuOverlay.classList.remove('active');
            menuOverlay.setAttribute('aria-hidden', 'true');
            unlockScroll();
        }

        burgerBtn.addEventListener('click', openMenu);
        menuCloseBtn.addEventListener('click', closeMenu);
        menuBackdrop.addEventListener('click', closeMenu);

        menuLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                closeMenu();
                const targetId = link.getAttribute('href');
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    lenis.scrollTo(targetEl);
                }
            });
        });


        // ── CONTACT MODAL LOGIC ──
        const modalOverlay = document.getElementById('contactModal');
        const modalBackdrop = document.getElementById('modalBackdrop');
        const modalPanel = document.getElementById('modalPanel');
        const modalCloseBtn = document.getElementById('modalCloseBtn');
        const visitForm = document.getElementById('visitForm');
        const userNameInput = document.getElementById('userName');
        const submitBtn = document.getElementById('submitBtn');
        const formContainer = document.getElementById('modalFormContainer');
        const successContainer = document.getElementById('modalSuccessContainer');
        const successNameSpan = document.getElementById('successName');
        const successDoneBtn = document.getElementById('successDoneBtn');

        // Trigger Book a Visit Modal on buttons
        document.querySelectorAll('.js-book-visit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // If coming from menu, close menu first
                if (menuOverlay.classList.contains('active')) {
                    closeMenu();
                }
                openModal();
            });
        });

        function openModal() {
            modalOverlay.classList.add('active');
            modalOverlay.setAttribute('aria-hidden', 'false');
            lockScroll();

            // Reset visual form states
            formContainer.style.display = 'block';
            successContainer.style.display = 'none';
            visitForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = "Submit Request";

            // Focus name field after short delay
            setTimeout(() => {
                userNameInput.focus();
            }, 120);
        }

        function closeModal() {
            modalOverlay.classList.remove('active');
            modalOverlay.setAttribute('aria-hidden', 'true');
            unlockScroll();
        }

        modalCloseBtn.addEventListener('click', closeModal);
        modalBackdrop.addEventListener('click', closeModal);
        successDoneBtn.addEventListener('click', closeModal);

        // Escape Key listener
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (modalOverlay.classList.contains('active')) closeModal();
                if (menuOverlay.classList.contains('active')) closeMenu();
            }
        });

        // Handle Form Submit Stub
        visitForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!visitForm.checkValidity()) {
                visitForm.reportValidity();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = "Sending...";

            // Simulate network request duration
            setTimeout(() => {
                const firstName = userNameInput.value.split(' ')[0] || "there";
                successNameSpan.textContent = firstName;

                // Switch views
                formContainer.style.display = 'none';
                successContainer.style.display = 'block';
            }, 800);
        });

        // Close Modal Close hover animation (rotate X)
        const closeSvgs = [document.querySelector('#modalCloseBtn svg'), document.querySelector('#menuCloseBtn svg')];
        closeSvgs.forEach((svg, idx) => {
            if (svg) {
                const parent = svg.parentElement;
                parent.addEventListener('mouseenter', () => {
                    springs.animate(`close-rot-${idx}`, 90, 300, 18, (rot) => {
                        svg.style.transform = `rotate(${rot}deg)`;
                    });
                });
                parent.addEventListener('mouseleave', () => {
                    springs.animate(`close-rot-${idx}`, 0, 300, 18, (rot) => {
                        svg.style.transform = `rotate(${rot}deg)`;
                    });
                });
            }
        });

        // Clean anchor scrolls inside landing page
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId.startsWith('#') && targetId.length > 1) {
                    e.preventDefault();
                    const targetEl = document.querySelector(targetId);
                    if (targetEl) {
                        lenis.scrollTo(targetEl);
                    }
                }
            });
        });
        // Mobile Footer Accordion
        const footerNavTitles = document.querySelectorAll('.footer-nav-title');
        footerNavTitles.forEach(title => {
            title.addEventListener('click', () => {
                if (window.innerWidth <= 1023) {
                    const col = title.closest('.footer-nav-col');
                    col.classList.toggle('open');
                }
            });
        });
})();
