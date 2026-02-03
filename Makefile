.PHONY: install install-backend install-frontend dev dev-backend dev-frontend build train-model test clean setup help

# Virtual environment paths (cross-platform)
VENV := venv
ifeq ($(OS),Windows_NT)
	PYTHON := $(VENV)/Scripts/python
	PIP := $(VENV)/Scripts/pip
	UVICORN := $(VENV)/Scripts/uvicorn
else
	PYTHON := $(VENV)/bin/python
	PIP := $(VENV)/bin/pip
	UVICORN := $(VENV)/bin/uvicorn
endif

# Default target
all: help

# Full setup for new users (one command to rule them all)
setup: venv install train-model
	@echo ""
	@echo "Setup complete! Run these commands to start:"
	@echo "  Terminal 1: make dev-backend"
	@echo "  Terminal 2: make dev-frontend"
	@echo "  Then open: http://localhost:5173"

# Create virtual environment if it doesn't exist
venv:
	@if [ ! -d "$(VENV)" ]; then \
		echo "Creating virtual environment..."; \
		python3 -m venv $(VENV); \
	fi

# Install all dependencies
install: install-backend install-frontend

install-backend: venv
	@echo "Installing backend dependencies..."
	$(PIP) install -e .
	$(PIP) install -r backend/requirements.txt

install-frontend:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

# Development servers
dev-backend: venv
	@echo "Starting backend server..."
	cd backend && ../$(UVICORN) app.main:app --reload --host 0.0.0.0 --port 8000

dev-frontend:
	@echo "Starting frontend server..."
	cd frontend && npm run dev

# Run both servers (requires 'make dev-backend' in another terminal, or use concurrently)
dev:
	@echo "Run 'make dev-backend' and 'make dev-frontend' in separate terminals"
	@echo "Or install concurrently: npm install -g concurrently"
	@echo "Then run: concurrently \"make dev-backend\" \"make dev-frontend\""

# Build frontend for production
build:
	cd frontend && npm run build

# Train the price prediction model
train-model: venv
	@echo "Training price prediction model..."
	cd backend && ../$(PYTHON) train_model.py

# Run tests
test: venv
	@echo "Running backend tests..."
	PYTHONPATH=src $(PYTHON) -m pytest tests/ -v

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf frontend/dist
	rm -rf backend/models/*.joblib
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name "*.egg-info" -exec rm -rf {} + 2>/dev/null || true

# Clean everything including venv
clean-all: clean
	rm -rf $(VENV)

# Help
help:
	@echo "Sustainability Scoring System"
	@echo ""
	@echo "Quick Start (new users):"
	@echo "  make setup            - Full setup: venv, deps, train model"
	@echo ""
	@echo "Development:"
	@echo "  make dev-backend      - Start FastAPI server (port 8000)"
	@echo "  make dev-frontend     - Start Vite dev server (port 5173)"
	@echo ""
	@echo "Other commands:"
	@echo "  make install          - Install all dependencies"
	@echo "  make train-model      - Train price prediction model"
	@echo "  make build            - Build frontend for production"
	@echo "  make test             - Run backend tests"
	@echo "  make clean            - Remove build artifacts"
	@echo "  make clean-all        - Remove everything (including venv)"
