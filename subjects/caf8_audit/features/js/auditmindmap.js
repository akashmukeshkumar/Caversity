        // --- 📱 Sidebar Toggle Function ---
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('open');
            const icon = document.querySelector('#menu-toggle i');
            icon.className = sidebar.classList.contains('open') ? 'fas fa-times' : 'fas fa-list-ul';
        }

        const colorPalette = [
            { box: "#eff6ff", stroke: "#3b82f6", text: "#1e40af", line: "#3b82f6" }, 
            { box: "#f0fdf4", stroke: "#22c55e", text: "#166534", line: "#22c55e" }, 
            { box: "#fdf2f8", stroke: "#ec4899", text: "#9d174d", line: "#ec4899" }, 
            { box: "#f5f3ff", stroke: "a#8b5cf6", text: "#5b21b6", line: "#8b5cf6" }, 
            { box: "#fff7ed", stroke: "#f97316", text: "#9a3412", line: "#f97316" }  
        ];

        let i = 0, duration = 800, root, treemap, isAllExpanded = false;
        const width = window.innerWidth;
        const height = window.innerHeight;

        const zoom = d3.zoom().scaleExtent([0.1, 3]).on("zoom", (e) => svgGroup.attr("transform", e.transform));
        const svg = d3.select("#mindmap").append("svg").attr("width", "100%").attr("height", "100%").call(zoom).on("dblclick.zoom", null);
        const svgGroup = svg.append("g");

        async function loadExplorer() {
            try {
                const res = await fetch('/api/auditmindmap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'get_mindmaps' })
                });
                if (!res.ok) throw new Error("API failed");
                const data = await res.json();

                const list = document.getElementById('chapter-list');
                
                Object.keys(data).forEach((key, idx) => {
                    const btn = document.createElement('button');
                    btn.className = 'chapter-btn';
                    const title = data[key].title.includes(':') ? data[key].title.split(': ')[1] : data[key].title;
                    btn.innerText = title;
                    btn.onclick = () => {
                        renderMindmap(data[key], btn);
                        if(window.innerWidth <= 768) toggleSidebar(); // Auto-close on mobile
                    };
                    list.appendChild(btn);
                    if(idx === 0) renderMindmap(data[key], btn);
                });
            } catch (e) { alert("Check mindmaps.json file structure!"); }
        }

        function renderMindmap(chapter, btn) {
            document.querySelectorAll('.chapter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const title = chapter.title.includes(':') ? chapter.title.split(': ')[1] : chapter.title;
            document.getElementById('chapter-title-main').innerText = title;

            svgGroup.selectAll("*").remove();
            treemap = d3.tree().nodeSize([55, 420]);
            root = d3.hierarchy(chapter.treeData, d => d.children);
            root.x0 = height / 2; root.y0 = 0;
            isAllExpanded = false;
            root.children.forEach(collapse);
            
            // 🔥 Center the map properly
            const initialPos = d3.zoomIdentity.translate(window.innerWidth/4, height/2.2).scale(0.6);
            svg.transition().duration(1000).call(zoom.transform, initialPos);
            update(root);
        }

        function collapse(d) { 
            if(d.children) { d._children = d.children; d._children.forEach(collapse); d.children = null; } 
        }
        function expand(d) { 
            if(d._children) { d.children = d._children; d._children = null; }
            if(d.children) d.children.forEach(expand); 
        }

        function update(source) {
            const treeData = treemap(root);
            const nodes = treeData.descendants(), links = treeData.descendants().slice(1);
            nodes.forEach(d => d.y = d.depth * 380);

            const node = svgGroup.selectAll('g.node').data(nodes, d => d.id || (d.id = ++i));
            const nodeEnter = node.enter().append('g').attr('class', 'node')
                .attr("transform", d => `translate(${source.y0},${source.x0})`).on('click', (e, d) => { toggle(d); update(d); });

            const colors = (d) => colorPalette[d.depth % colorPalette.length];

            nodeEnter.append('rect').attr('height', 38).attr('y', -19)
                .style("fill", d => colors(d).box).style("stroke", d => colors(d).stroke);

            nodeEnter.append('text').attr("dy", ".35em").attr("x", 18).text(d => d.data.name)
                .style("fill", d => colors(d).text)
                .each(function(d) { d.w = this.getBBox().width + 36; });

            nodeEnter.select('rect').attr('width', d => d.w);
            nodeEnter.append('text').attr('class', 'chevron').attr("dy", ".38em").attr("x", d => d.w + 8)
                .text(d => d._children || d.children ? "•" : "");

            const nodeUpdate = nodeEnter.merge(node);
            nodeUpdate.transition().duration(duration).attr("transform", d => `translate(${d.y},${d.x})`);
            nodeUpdate.select('rect').style("stroke-width", d => d.children ? "2.5px" : "1.5px");

            node.exit().transition().duration(duration).attr("transform", d => `translate(${source.y},${source.x})`).remove();

            const link = svgGroup.selectAll('path.link').data(links, d => d.id);
            const linkEnter = link.enter().insert('path', "g").attr("class", "link")
                .style("stroke", d => colorPalette[d.parent.depth % colorPalette.length].line)
                .attr('d', d => { const o = {x: source.x0, y: source.y0}; return diagonal(o, o); });

            linkEnter.merge(link).transition().duration(duration)
                .attr('d', d => `M ${d.y} ${d.x} C ${(d.y + d.parent.y + d.parent.w) / 2} ${d.x}, ${(d.y + d.parent.y + d.parent.w) / 2} ${d.parent.x}, ${d.parent.y + d.parent.w} ${d.parent.x}`);

            link.exit().transition().duration(duration).attr('d', d => { const o = {x: source.x, y: source.y}; return diagonal(o, o); }).remove();
            nodes.forEach(d => { d.x0 = d.x; d.y0 = d.y; });
        }

        function toggle(d) { if (d.children) { d._children = d.children; d.children = null; } else { d.children = d._children; d._children = null; } }
        function diagonal(s, d) { return `M ${s.y} ${s.x} C ${(s.y + d.y) / 2} ${s.x}, ${(s.y + d.y) / 2} ${d.x}, ${d.y} ${d.x}`; }

        d3.select("#expand-all").on("click", () => {
            if(isAllExpanded) { root.children.forEach(collapse); isAllExpanded = false; }
            else { root.children.forEach(expand); isAllExpanded = true; }
            update(root);
        });

        d3.select("#zoom-in").on("click", () => svg.transition().duration(400).call(zoom.scaleBy, 1.4));
        d3.select("#zoom-out").on("click", () => svg.transition().duration(400).call(zoom.scaleBy, 0.7));

        loadExplorer();
