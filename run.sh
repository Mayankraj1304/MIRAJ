
#!/bin/bash

# Start the backend
echo "Starting backend server..."
cd backend || exit 1
npm run dev &

# Start the frontend
echo "Starting frontend server..."
cd ../frontend || exit 1
npm run dev &

# Keep both servers running
wait
