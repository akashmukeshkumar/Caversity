        const audio = document.getElementById('main-audio');
        const overlay = document.getElementById('theater-overlay');
        const playBtn = document.getElementById('t-play-btn');
        const progFill = document.getElementById('t-prog-fill');
        const currentEl = document.getElementById('t-current');
        const totalEl = document.getElementById('t-total');
        const canvas = document.getElementById('audio-canvas');
        const canvasCtx = canvas.getContext('2d');
        
        // Target elements for "ON AIR" Animation
        const studioImg = document.getElementById('studio-img');
        const spotlight = document.getElementById('spotlight');

        let isPlaying = false;
        let audioContext, analyser, source;
        let isAudioSetup = false;

        function openTheater(audioUrl, title, sub) {
            if(!isAudioSetup) {
                setupAudioVisualizer();
                isAudioSetup = true;
            }
            
            // Reset Animation states
            studioImg.classList.remove('broadcast-live');
            spotlight.classList.remove('broadcast-live');
            canvas.classList.remove('broadcast-live');

            document.getElementById('t-title').innerText = title;
            document.getElementById('t-sub').innerText = sub;
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            audio.src = audioUrl;
            audio.play().catch(e => console.log("Play prevented.", e));
            isPlaying = true;
            updatePlayBtn();
            
            // 🎬 Trigger the "LIGHTS ON" animation exactly when the player opens
            setTimeout(() => {
                studioImg.classList.add('broadcast-live');
                spotlight.classList.add('broadcast-live');
                canvas.classList.add('broadcast-live');
                
                // Set compact size for the waves
                canvas.width = 180; 
                canvas.height = 60;
            }, 150);
        }

        function closeTheater() {
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
            audio.pause();
            isPlaying = false;
            updatePlayBtn();
            
            // Turn off lights when closed
            studioImg.classList.remove('broadcast-live');
            spotlight.classList.remove('broadcast-live');
            canvas.classList.remove('broadcast-live');
        }

        function togglePlay() {
            if (isPlaying) { audio.pause(); isPlaying = false; } 
            else { audio.play(); isPlaying = true; }
            updatePlayBtn();
        }

        function updatePlayBtn() {
            playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
        }

        function skip(sec) { audio.currentTime += sec; }

        audio.addEventListener('timeupdate', () => {
            if(audio.duration) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progFill.style.width = percent + '%';
                currentEl.innerText = formatTime(audio.currentTime);
                totalEl.innerText = formatTime(audio.duration);
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            totalEl.innerText = formatTime(audio.duration);
        });

        function seekAudio(e) {
            const width = document.getElementById('t-prog-bg').clientWidth;
            const percent = e.offsetX / width;
            audio.currentTime = percent * audio.duration;
        }

        function formatTime(sec) {
            if (isNaN(sec)) return "00:00";
            let m = Math.floor(sec / 60); let s = Math.floor(sec % 60);
            return `${m < 10 ? '0'+m : m}:${s < 10 ? '0'+s : s}`;
        }

        // ==============================================================
        // 🔥 CENTERED SYMMETRICAL WAVES (Between the Mics)
        // ==============================================================
        function setupAudioVisualizer() {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            source = audioContext.createMediaElementSource(audio);
            
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            
            analyser.fftSize = 256; 
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            function drawWaves() {
                if(overlay.classList.contains('active')) {
                    analyser.getByteFrequencyData(dataArray);
                    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                    // Draw from the center outwards
                    const midX = canvas.width / 2;
                    const totalBars = 20; // Bars on each half
                    const barWidth = 3;   // Very thin and sleek
                    const gap = 4;

                    for (let i = 0; i < totalBars; i++) {
                        let barHeight = dataArray[i * 2 + 2] / 4.5; 
                        if (barHeight < 3) barHeight = 3; // Minimum dot size

                        // Premium Gradient
                        const grad = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
                        grad.addColorStop(0, '#00c6ff'); 
                        grad.addColorStop(0.5, '#ec4899'); 
                        grad.addColorStop(1, '#8b5cf6');

                        canvasCtx.fillStyle = grad;
                        
                        // Soft Neon Glow
                        canvasCtx.shadowBlur = 5;
                        canvasCtx.shadowColor = '#ec4899';

                        canvasCtx.beginPath();
                        
                        // Right Side Bar
                        canvasCtx.roundRect(midX + i*(barWidth+gap), (canvas.height/2) - (barHeight/2), barWidth, barHeight, [10]);
                        
                        // Left Side Bar (Symmetrical)
                        if(i !== 0) {
                            canvasCtx.roundRect(midX - i*(barWidth+gap), (canvas.height/2) - (barHeight/2), barWidth, barHeight, [10]);
                        }
                        
                        canvasCtx.fill();
                        canvasCtx.shadowBlur = 0; // Reset
                    }
                }
                requestAnimationFrame(drawWaves);
            }
            drawWaves();
        }

        document.body.addEventListener('click', () => {
            if(audioContext && audioContext.state === 'suspended') {
                audioContext.resume();
            }
        });
        
        audio.addEventListener('ended', () => {
            isPlaying = false;
            updatePlayBtn();
        });
    