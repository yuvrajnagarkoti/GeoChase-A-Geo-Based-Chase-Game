🌍 GeoChase
GeoChase is a desktop-based 3D chase game inspired by Pac-Man and Temple Run, set in real-world locations such as Clement Town, Dehradun. A monster (AI) uses Dijkstra's algorithm to chase a human (player-controlled) through real road networks extracted from OpenStreetMap. The game offers immersive navigation, strategic AI movement, and map-based gameplay on a flat 3D plane.

🎮 Features
🌐 Real-world Map Integration
Game maps are based on real locations (e.g., Clement Town, Dehradun) using OpenStreetMap data.

🧭 AI-Powered Monster Movement
The monster uses Dijkstra’s algorithm for optimal pathfinding and recalculates its path after every player move.

🧍‍♂️ Player-Controlled Movement
Human character moves using on-screen directional buttons or keyboard controls.

🏘️ Road-Only Navigation
Movement restricted to roads—no movement through buildings or off-road areas.

🗺️ Multiple Maps Support
Choose from different map zones for varied gameplay experiences.

🖥️ Desktop-Optimized with 3D Visuals
The game uses a flat 3D view aligned to the screen for an immersive yet performant visual style.

🚀 Getting Started
Prerequisites:
-> Node.js & npm  
-> A browser (Chrome, Firefox, Edge)
-> OpenStreetMap road data for your target region
-> Local server to host map tiles

File structure:
/-
Geochase
  index.html
  script.js
  map.js
  assets
    grass.png
    human.png
    monster.png
    house.png
/-

Installation:
/-
bash
Copy
Edit
git clone https://github.com/garvit-sharma147/geochase.git
cd geochase
npm install
npm start
/-

🧠 Tech Stack
Frontend: HTML5, CSS3, JavaScript

Map Rendering: Leaflet.js / Mapbox GL / Three.js (depending on configuration)

Pathfinding: Dijkstra’s Algorithm

Data Source: OpenStreetMap (road data)

🧪 How It Works
Map Loading: A 2D matrix is generated from OSM data where 0 = road and 1 = obstacle.

User Input: The player uses buttons/keys to move on roads.

Monster Pathfinding: The AI monster recalculates its shortest path to the player using Dijkstra after every player move.

Chase Mechanics: If the monster reaches the player, the game ends.

🌍 Supported Maps
Clement Town, Dehradun (2 km radius)

Graphic Era University area

Race Course / Police Line zone

🔧 Future Enhancements
✅ Add scoring system & power-ups

✅ Improve character animations

✅ Support mobile controls

✅ Multiplayer chase mode

✅ Save and load progress

🧑‍💻 Developers
Created with ❤️ by:
-> Yuvraj
-> Garvit Sharma
-> Vansh Rawat
-> Shreyansh Mittal

If you'd like to contribute or report a bug, please open an issue or pull request.
