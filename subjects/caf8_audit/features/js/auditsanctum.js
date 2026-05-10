        let auditData = [];
        let groupedData = {};
        let currentQuestion = null;

        // 🛡️ Secure Bootstrap for AuditNinja
async function bootstrapApp() {
    try {
        const response = await fetch('/api/auditsanctum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'get_sanctum_data' })
        });
        if(!response.ok) throw new Error("JSON Fetch Failed");
        
        // The backend now securely decodes the data and sends clean JSON directly
        auditData = await response.json();
        
        processAndRenderReel();
    } catch (error) {
        console.error("Secure Load Error:", error);
        document.getElementById('reel-container').innerHTML = `<p style="color:var(--color-trap);">Error: Security Error or Missing <b>auditninja.json</b>.</p>`;
    }
}

        // 2. Process Data
        function processAndRenderReel() {
            groupedData = auditData.reduce((acc, item) => {
                if (!acc[item.attempt]) acc[item.attempt] = [];
                acc[item.attempt].push(item);
                return acc;
            }, {});

            const reel = document.getElementById('reel-container');
            reel.innerHTML = '';
            
            const attemptsList = Object.keys(groupedData).reverse();

            attemptsList.forEach((attemptName, index) => {
                const season = attemptName.split(' ')[0];
                const year = attemptName.split(' ')[1] || '';
                const qCount = groupedData[attemptName].length;

                const card = document.createElement('div');
                card.className = 'attempt-card';
                card.innerHTML = `
                    <h3>${season} ${year}</h3>
                    <p><span>${qCount} Knowledge Nodes</span> <i class="fa-solid fa-arrow-right"></i></p>
                `;
                card.onclick = () => openAttemptEpisodes(attemptName, card);
                reel.appendChild(card);
            });

            setupHorizontalScroll(reel);
        }

        function setupHorizontalScroll(slider) {
            let isDown = false; let startX, scrollLeft;
            slider.addEventListener('mousedown', (e) => { isDown = true; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
            slider.addEventListener('mouseleave', () => isDown = false);
            slider.addEventListener('mouseup', () => isDown = false);
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const walk = (e.pageX - slider.offsetLeft - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
            });
        }

        // 3. Open Episodes
        function openAttemptEpisodes(attemptName, cardElement) {
            document.querySelectorAll('.attempt-card').forEach(c => c.classList.remove('active'));
            cardElement.classList.add('active');

            const wrapper = document.getElementById('episodes-wrapper');
            wrapper.style.display = 'block';

            const grid = document.getElementById('episodes-grid');
            grid.innerHTML = '';

            groupedData[attemptName].forEach((q, index) => {
                const chip = document.createElement('div');
                chip.className = 'episode-chip';
                
                let shortTopic = q.topic.split(':')[0].split('-')[0].trim();
                chip.innerHTML = `<span class="ep-id">${q.question_id}</span> <span class="ep-title">${shortTopic}</span>`;
                
                chip.onclick = () => openArena(q, chip);
                grid.appendChild(chip);

                if (index === 0) openArena(q, chip);
            });

            wrapper.scrollIntoView({behavior: 'smooth', block: 'center'});
        }

        // 4. Open Arena
        function openArena(qData, chipElement) {
            currentQuestion = qData;

            document.querySelectorAll('.episode-chip').forEach(c => c.classList.remove('active'));
            chipElement.classList.add('active');

            const arena = document.getElementById('arena');
            arena.style.display = 'grid';

            document.getElementById('doc-title').innerText = qData.topic;
            document.getElementById('doc-marks').innerText = `${qData.marks} MARKS`;
            
            const scenarioEl = document.getElementById('doc-scenario');
            scenarioEl.className = 'scenario-text';
            scenarioEl.innerHTML = qData.scenario;

            document.getElementById('analysis-locked').style.display = 'flex';
            document.getElementById('analysis-results').style.display = 'none';
            [1,2,3,4].forEach(i => document.getElementById(`card-${i}`).classList.remove('slide-in'));

            const btn = document.getElementById('btn-scan');
            btn.classList.remove('processing');
            btn.querySelector('span').innerText = "Decrypt Examiner's Strategy";
            btn.querySelector('i').className = "fa-solid fa-wand-magic-sparkles";

            setTimeout(() => { arena.scrollIntoView({behavior: 'smooth', block: 'start'}); }, 200);
        }

        // 5. Decryption Scan
        function triggerDecryption() {
            const btn = document.getElementById('btn-scan');
            const laser = document.getElementById('scanner-laser');
            const scenarioEl = document.getElementById('doc-scenario');

            if(btn.classList.contains('processing')) return;

            btn.classList.add('processing');
            btn.querySelector('span').innerText = "Running Forensic Analysis...";
            btn.querySelector('i').className = "fa-solid fa-circle-notch fa-spin";

            laser.classList.remove('scanning');
            void laser.offsetWidth;
            laser.classList.add('scanning');

            setTimeout(() => {
                btn.classList.remove('processing');
                btn.style.background = "#10b981";
                btn.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.4)";
                btn.querySelector('span').innerText = "Decryption Complete";
                btn.querySelector('i').className = "fa-solid fa-check-double";

                scenarioEl.classList.add('revealed');

                const xray = currentQuestion.xray_analysis;
                document.getElementById('ans-mindset').innerText = xray.examiner_mindset;
                document.getElementById('ans-trap').innerText = xray.the_trap_red;
                document.getElementById('ans-ninja').innerText = xray.ninja_technique || xray.pro_tip;
                
                const bpList = document.getElementById('ans-blueprint');
                bpList.innerHTML = xray.solution_blueprint.map(bp => `<li>${bp}</li>`).join('');

                document.getElementById('analysis-locked').style.display = 'none';
                document.getElementById('analysis-results').style.display = 'flex';

                const delay = 150;
                setTimeout(() => document.getElementById('card-1').classList.add('slide-in'), delay * 1);
                setTimeout(() => document.getElementById('card-2').classList.add('slide-in'), delay * 2);
                setTimeout(() => document.getElementById('card-3').classList.add('slide-in'), delay * 3);
                setTimeout(() => document.getElementById('card-4').classList.add('slide-in'), delay * 4);

            }, 2500);
        }

        window.onload = bootstrapApp;
    
