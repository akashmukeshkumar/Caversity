            
            // Securely fetch data
            const response = await fetch(`${baseUrl}/api/get-data?file=mindmaps`);
            const result = await response.json();
            
            // Decode completely on the backend
            const decodedPayload = Buffer.from(result.payload, 'base64').toString('utf-8');
            const MINDMAP_DATA = JSON.parse(decodedPayload);
            
        } catch (error) {
            return res.status(500).json({ error: "Data secure restricted." });
        }
