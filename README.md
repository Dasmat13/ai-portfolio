🧠 AI Portfolio - GPT-Powered DevOps Portfolio

An AI-powered developer portfolio built with Next.js 15, OpenRouter API (GPT-4o), TailwindCSS, and Markdown blogging. Includes full CI/CD pipeline, Docker support, Kubernetes (GKE) deployment, and Terraform infrastructure-as-code.

  


---

📦 Features

✨ Interactive AI Chatbot with OpenRouter GPT-4o API

🎨 Responsive UI with TailwindCSS

📄 Markdown Blog Engine

⚙️ GitHub Actions CI/CD for auto-deploy

🐳 Dockerized app with production-ready Dockerfile

☘️ Kubernetes YAMLs for GKE deployment

📈 Prometheus + Grafana ready for monitoring

🛠️ Terraform to provision infra on GCP



---

🧱 Project Structure

src/
├── app/
│   ├── api/chat/route.ts      # POST /api/chat  ➔ OpenRouter proxy
│   ├── layout.tsx             # Root layout (dark/light ThemeProvider)
│   ├── page.tsx               # Portfolio homepage
│   └── components/
│       └── ChatBox.tsx        # Realtime chat UI
├── components/
│   └── theme-provider.tsx     # System theme detection
├── pages/blog/                # ✍️ MDX blog posts
.github/
└── workflows/
    └── deploy.yml             # Build → Test → Deploy
docker/
└── Dockerfile                 # Multi-stage build
k8s/
├── deployment.yaml            # Deployment + Service + HPA
└── monitoring/                # Prometheus & Grafana configs
terraform/
└── main.tf                    # VPC, GKE, Artifact Registry, IAM

🚀 Getting Started

1. Prerequisites

Node.js ≥ 18.18 LTS (recommended by Next.js 15)

Docker 24+

Terraform 1.8+

Google Cloud SDK with gcloud auth login

An OpenRouter API Key – create at https://openrouter.ai/keys


2. Clone & Install

git clone https://github.com/Dasmat13/ai-portfolio.git
cd ai-portfolio
npm install

3. Configuration

Create .env.local in the project root:

# OpenRouter
OPENROUTER_API_KEY=sk-or-XXXXXXXXXXXXXXXX

# (Optional) Vercel
VERCEL_TOKEN=...

# (Optional) PostHog / Sentry / Plausible etc.
NEXT_PUBLIC_POSTHOG_KEY=...

4. Local Development

npm run dev           # next dev  (Turbopack enabled)

App is served at http://localhost:3000.

Lint & type-check:

npm run lint          # eslint
npm run typecheck     # ts-c --noEmit


---

🐳 Docker Workflow

# Build production image
docker build -t ghcr.io/your-org/ai-portfolio:latest .

# Run container
docker run -p 3000:3000 \
  -e OPENROUTER_API_KEY=$OPENROUTER_API_KEY \
  ghcr.io/your-org/ai-portfolio:latest


---

☘️ Kubernetes Deployment (GKE)

# Set your cluster context
gcloud container clusters get-credentials dev-portfolio --region=us-central1

# Create namespace & deploy
kubectl create ns portfolio
kubectl -n portfolio apply -f k8s/deployment.yaml

Manifests include HorizontalPodAutoscaler (CPU > 70%) and a ClusterIssuer for Let’s Encrypt if you use Ingress-NGINX.


---

🌍 Terraform Provisioning

cd terraform
terraform init
terraform apply

Outputs:

gke_cluster_name

service_account_email

artifact_registry_repo


You can reference these in GitHub Actions secrets for zero-touch environments.


---

⚙️ CI/CD Pipeline

deploy.yml steps:

1. Check-out & caching (actions/setup-node)


2. Unit tests + type-check


3. Build Docker image & push (if branch = main)


4. Deploy

Vercel (vercel deploy --prod) or

GKE (kubectl set image + kubectl rollout status)




Secrets required:

Name	Purpose

OPENROUTER_API_KEY	Forwarded to runtime pod
VERCEL_TOKEN	Vercel deploy (optional)
GCP_SA_KEY	Base64 of service-account JSON for GKE



---

📈 Observability

Prometheus Operator scrapes /metrics exposed by nextjs_exporter.

Grafana dashboard id: 18573 pre-imported.

Alerts: high latency > 1 s, error rate > 2%.



---

🤝 Contributing

1. Fork the repo & create your branch (git checkout -b feature/awesome).


2. Commit your changes (git commit -m 'feat: add awesome').


3. Push to the branch (git push origin feature/awesome).


4. Open a Pull Request.




---

🗘 Roadmap

[ ] Edge runtime via Next.js Middleware

[ ] RAG demo with Supabase Vector

[ ] GitHub Codespaces dev-container

[ ] Helm chart publishing



---

👤 Author

Dasmat – @Dasmat13


---

📄 License

This project is licensed under the MIT License – see LICENSE for details.


---

⭐ Give it a Star!

If you find this project useful, please consider starring ⭐ the repo – it helps a lot!