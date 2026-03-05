#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd /home/vladimir//Projects/team-roster

# Wait 2 seconds for the server to boot, then open the web browser
(sleep 2 && xdg-open http://localhost:5173) &

# Start the React server
npm run dev
