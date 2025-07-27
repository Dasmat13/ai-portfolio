

<h1>🧠 AI Portfolio - GPT-Powered DevOps Portfolio</h1>

<p>An AI-powered developer portfolio built with <strong>Next.js 15</strong>, <strong>OpenRouter API (GPT-4o)</strong>, <strong>TailwindCSS</strong>, and <strong>Markdown blogging</strong>. Includes full <strong>CI/CD pipeline</strong>, <strong>Docker support</strong>, <strong>Kubernetes (GKE) deployment</strong>, and <strong>Terraform infrastructure-as-code</strong>.</p>

<p>
  <img src="https://img.shields.io/github/repo-size/Dasmat13/ai-portfolio" alt="Repo size" />
  <img src="https://img.shields.io/github/stars/Dasmat13/ai-portfolio" alt="Stars" />
  <img src="https://github.com/Dasmat13/ai-portfolio/actions/workflows/deploy.yml/badge.svg" alt="CI Badge" />
</p>

<hr/>

<h2>📦 Features</h2>
<ul>
  <li>✨ <strong>Interactive AI Chatbot</strong> with OpenRouter GPT-4o API</li>
  <li>🎨 <strong>Responsive UI</strong> with TailwindCSS</li>
  <li>📄 <strong>Markdown Blog Engine</strong></li>
  <li>⚙️ <strong>GitHub Actions CI/CD</strong> for auto-deploy</li>
  <li>🐳 <strong>Dockerized</strong> app with production-ready Dockerfile</li>
  <li>☸️ <strong>Kubernetes YAMLs</strong> for GKE deployment</li>
  <li>📈 <strong>Prometheus + Grafana</strong> ready for monitoring</li>
  <li>🛠️ <strong>Terraform</strong> to provision infra on GCP</li>
</ul>

<hr/>

<h2>🧱 Project Structure</h2>
<pre><code>src/
├── app/
│   ├── api/chat/route.ts      # POST /api/chat  ➜ OpenRouter proxy
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
</code></pre>

<h2>🚀 Getting Started</h2>
<h3>1. Prerequisites</h3>
<ul>
  <li>Node.js ≥ 18.18 LTS</li>
  <li>Docker 24+</li>
  <li>Terraform 1.8+</li>
  <li>Google Cloud SDK with <code>gcloud auth login</code></li>
  <li><a href="https://openrouter.ai/keys" target="_blank">OpenRouter API Key</a></li>
</ul>

<h3>2. Clone & Install</h3>
<pre><code>git clone https://github.com/Dasmat13/ai-portfolio.git
cd ai-portfolio
npm install</code></pre>

<h3>3. Configuration</h3>
<pre><code># .env.local
OPENROUTER_API_KEY=sk-or-XXXXXXXXXXXXXXXX
VERCEL_TOKEN=...
NEXT_PUBLIC_POSTHOG_KEY=...</code></pre>

<h3>4. Local Development</h3>
<pre><code>npm run dev           # next dev (Turbopack enabled)</code></pre>
<p>App is served at <a href="http://localhost:3000" target="_blank">http://localhost:3000</a></p>

<h3>Lint & Type-check</h3>
<pre><code>npm run lint
npm run typecheck</code></pre>

<hr/>

<h2>🐳 Docker Workflow</h2>
<pre><code>docker build -t ghcr.io/your-org/ai-portfolio:latest .

docker run -p 3000:3000 \
  -e OPENROUTER_API_KEY=$OPENROUTER_API_KEY \
  ghcr.io/your-org/ai-portfolio:latest
</code></pre>

<hr/>

<h2>☸️ Kubernetes Deployment (GKE)</h2>
<pre><code>gcloud container clusters get-credentials dev-portfolio --region=us-central1

kubectl create ns portfolio
kubectl -n portfolio apply -f k8s/deployment.yaml
</code></pre>
<p>Includes HPA and Let's Encrypt ClusterIssuer for Ingress-NGINX.</p>

<hr/>

<h2>🌍 Terraform Provisioning</h2>
<pre><code>cd terraform
terraform init
terraform apply</code></pre>
<p><strong>Outputs:</strong></p>
<ul>
  <li>gke_cluster_name</li>
  <li>service_account_email</li>
  <li>artifact_registry_repo</li>
</ul>

<hr/>

<h2>⚙️ CI/CD Pipeline</h2>
<ol>
  <li>Check-out & caching (actions/setup-node)</li>
  <li>Unit tests + type-check</li>
  <li>Build Docker image & push (main branch)</li>
  <li>Deploy via Vercel or GKE</li>
</ol>

<h3>Secrets Required</h3>
<table>
  <tr><th>Name</th><th>Purpose</th></tr>
  <tr><td>OPENROUTER_API_KEY</td><td>Forwarded to runtime pod</td></tr>
  <tr><td>VERCEL_TOKEN</td><td>Vercel deploy (optional)</td></tr>
  <tr><td>GCP_SA_KEY</td><td>Base64 of service-account JSON for GKE</td></tr>
</table>

<hr/>

<h2>📈 Observability</h2>
<p>Prometheus scrapes <code>/metrics</code> from <code>nextjs_exporter</code>.</p>
<ul>
  <li><strong>Grafana dashboard id:</strong> 18573</li>
  <li><strong>Alerts:</strong> high latency > 1s, error rate > 2%</li>
</ul>

<hr/>

<h2>🤝 Contributing</h2>
<ol>
  <li>Fork & create branch <code>feature/awesome</code></li>
  <li>Commit <code>'feat: add awesome'</code></li>
  <li>Push & open PR</li>
</ol>

<hr/>

<h2>🗺 Roadmap</h2>
<ul>
  <li>[ ] Edge runtime via Next.js Middleware</li>
  <li>[ ] RAG demo with Supabase Vector</li>
  <li>[ ] GitHub Codespaces dev-container</li>
  <li>[ ] Helm chart publishing</li>
</ul>

<hr/>

<h2>👤 Author</h2>
<p><strong>Dasmat</strong> – <a href="https://github.com/Dasmat13" target="_blank">@Dasmat13</a></p>

<hr/>

<h2>📄 License</h2>
<p>MIT License – see LICENSE</p>

<hr/>

<h2>⭐ Give it a Star!</h2>
<p>If you find this project useful, please consider starring ⭐ the repo – it helps a lot!</p>

</body>
</html>
