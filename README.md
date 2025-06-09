# Philosophers Chatbot

**A Full-Stack AI Chat Application** | React + FastAPI + Docker + Ollama

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

---

## About the Project

This project is a personal study and a hands-on lab focused on building a full-stack environment capable of supporting and testing **Large Language Models (LLMs) fine-tuning**.

The core of this project was to learn the end-to-end process: from setting up a local, GPU-accelerated AI model with Ollama, to building the interactive frontend and API infrastructure needed to eventually serve a custom, fine-tuned model. The current application serves as the foundational lab for this learning objective.

The project implements a full-stack application featuring a React frontend, a FastAPI backend, and a locally-run Llama 3 model served via Ollama, all fully containerized with Docker. The current implementation uses system-prompting to simulate conversations with different philosophical personas.

---

## Main Features

-   **Interactive Chat Interface** built with React.
-   **Selectable AI Personas:** Switch between a Stoic (Marcus Aurelius) and a Cynic (Diogenes) philosopher.
-   **Conversation History (Memory):** The application maintains the context of the current conversation.
-   **Locally-Served LLM:** All AI inference is handled locally by Llama 3 running in an Ollama container.
-   **GPU Acceleration:** Leverages the NVIDIA Container Toolkit to provide GPU resources to the LLM for fast responses.
-   **Fully Containerized Environment:** All services (frontend, backend, AI) are orchestrated with Docker Compose.
-   **Hot-Reloading for Development:** A fast and efficient development workflow where code changes are reflected instantly without restarting containers.

---

## Tech Stack

-   **Frontend:** React.js, Bootstrap
-   **Backend:** FastAPI, Python 3.11
-   **AI / LLM:** Ollama, Llama 3 8B
-   **Infrastructure:** Docker, Docker Compose
-   **Development Server (Backend):** Uvicorn

---

## Installation and Setup

To get the project up and running locally, follow these steps.

**Prerequisites:**
* [Docker Engine](https://docs.docker.com/engine/install/)
* [Docker Compose](https://docs.docker.com/compose/install/)
* A local NVIDIA GPU with updated drivers.
* [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Glasena/philosophers-chatbot.git](https://github.com/Glasena/philosophers-chatbot.git)
    cd philosophers-chatbot
    ```

2.  **Create the persistent Docker volume for the LLM models:**
    ```bash
    docker volume create ollama_data
    ```

3.  **Pull the Llama 3 model via Ollama:**
    This command will download the model (~4.7 GB) into the volume you just created.
    ```bash
    docker run --rm -v ollama_data:/root/.ollama ollama/ollama ollama pull llama3:8b
    ```

4.  **Build and run the application stack:**
    The `--build` flag is necessary on the first run to build the custom images for the frontend and backend.
    ```bash
    docker-compose up --build
    ```

5.  **Access the application:**
    Open your web browser and navigate to **`http://localhost:3000`**.

---

## Notes

-   This project's main purpose is educational and to serve as a boilerplate for more complex AI/ML projects.
-   The current persona implementation relies on system prompting. The fine-tuning phase is a planned future development.
-   The CORS configuration in the backend is set to allow all origins (`"*"`) for ease of development. For a production environment, this should be restricted to the specific frontend domain.

---

# 🚀

**Feel free to fork this project to start your own AI application!**
