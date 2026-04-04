export const personal = {
  name: "Chandramouli Narni",
  title: "GenAI Engineer",
  subtitle: "LLM Systems · RAG & Agentic AI · LLMOps",
  email: "chandramoulinarni@gmail.com",
  phone: "+1 (332) 203-7363",
  linkedin: "https://www.linkedin.com/in/chandra-mouli-narni",
  availability: "Open to on-site · hybrid roles in the US",
  tagline:
    "I build operational-grade GenAI systems that ship to production -not prototypes that gather dust.",
  about: [
    "9+ years of progressive AI/ML experience across telecom, healthcare, and financial services -from classical ML and NLP pipelines to production LLM systems on hybrid AWS and GCP.",
    "My core focus is agentic GenAI and hybrid RAG: combining Pinecone vector search with Neo4j Graph RAG, building multi-agent systems with LangGraph and Google ADK, and wiring enterprise systems through MCP servers so agents discover and invoke tools without hardcoded dependencies.",
    "I care about explainability, safety, and observability. LangSmith for tracing. Ragas for evaluation gates. Prometheus and Grafana for pipeline health. From classical NLP to fine-tuning Llama 3 with LoRA/QLoRA -the progression has been consistent: get closer to the problem, build something that ships.",
  ],
};

export const skills = [
  {
    category: "GenAI & Agents",
    items: [
      "Agentic RAG",
      "Graph RAG (Neo4j)",
      "Multi-Agent Systems",
      "MCP Servers",
      "LangGraph",
      "Google ADK",
      "CrewAI",
      "LangChain",
    ],
  },
  {
    category: "LLM & Evaluation",
    items: [
      "LoRA / QLoRA / PEFT",
      "Llama 3 Fine-tuning",
      "Guardrails AI",
      "Ragas",
      "LLM-as-a-Judge",
      "LangSmith",
      "DeepEval",
      "Evidently AI",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    items: [
      "AWS (EKS, SageMaker, Bedrock)",
      "GCP (Vertex AI, GKE)",
      "Docker / Kubernetes",
      "Terraform",
      "FastAPI / Node.js",
      "React / TypeScript",
      "Prometheus / Grafana",
    ],
  },
  {
    category: "ML & Data",
    items: [
      "NLP / BioBERT / spaCy",
      "TensorFlow / PyTorch",
      "XGBoost / LightGBM",
      "SHAP / LIME",
      "PySpark / Kafka",
      "MLflow / Vertex AI Pipelines",
    ],
  },
];

export const experience = [
  {
    company: "AT&T",
    role: "GenAI Engineer",
    period: "Oct 2023 -Present",
    current: true,
    highlights: [
      "Designed a hybrid RAG architecture combining Pinecone vector search with Neo4j Graph RAG -a prompt-based router selects the retrieval path by query structure, with graph traversal resolving multi-hop queries across equipment entities that pure embedding search couldn't handle.",
      "Built stateful multi-agent orchestration across three layers: Google ADK managing session runtime and tool registry, LangGraph handling deterministic reasoning and failure recovery, LangChain as the shared prompt and tool abstraction layer.",
      "Connected enterprise CRM and knowledge systems through MCP servers -agents discover and invoke tools dynamically with no hardcoded endpoint logic in the agent layer.",
      "Built a two-pass guardrails system combining Guardrails AI validators for PII filtering and output validation with custom validators for telecom domain restrictions -regex screens known injection signatures first, ambiguous patterns trigger an LLM-based recheck.",
      "Fine-tuned Llama 3 with LoRA via PEFT on internal telecom documentation after the base model consistently mishandled domain-specific jargon that retrieval context alone couldn't correct.",
      "Built Ragas evaluation pipelines as the primary deployment gate tracking faithfulness, context precision, and recall. Used LLM-as-a-Judge as a secondary signal for borderline scores and grounding errors automated metrics didn't surface.",
      "Built the full serving stack: FastAPI backend, Node.js middleware for auth and rate limiting, React/TypeScript UI with SSE-based streaming for real-time response rendering.",
      "Set up cost-aware model routing directing simple queries to cheaper model tiers and complex reasoning to frontier models, tracked via CloudWatch with automated alerts on cost anomalies.",
    ],
    tech: [
      "LangGraph",
      "Google ADK",
      "CrewAI",
      "MCP Servers",
      "Pinecone",
      "Neo4j",
      "Llama 3 / LoRA / QLoRA",
      "Ragas",
      "Guardrails AI",
      "LangSmith",
      "FastAPI",
      "React / TypeScript / SSE",
      "AWS + GCP",
    ],
  },
  {
    company: "CVS Health",
    role: "AI / ML Engineer",
    period: "Aug 2021 -Sep 2023",
    location: "New York, NY",
    current: false,
    highlights: [
      "Trained Wide and Deep Networks in TensorFlow combining static claim features with sequential patient history embeddings from Word2Vec and LSTM -the model both memorized common diagnosis patterns and generalized across patient types it hadn't seen before.",
      "Built clinical NLP pipelines using BioBERT and spaCy for entity extraction from provider notes in a PHI-compliant environment with masking, audit logging, and access controls throughout.",
      "Moved all features into Vertex AI Feature Store after early production runs showed batch training and real-time inference computing features differently -quietly degrading prediction quality.",
      "Wired Vertex AI Pipelines into GitHub Actions CI/CD so every training run went through evaluation gates and controlled deployment, with MLflow logging the full experiment trail.",
      "Prototyped semantic search with Sentence Transformers and FAISS -that prototype became the architectural foundation for RAG systems built later.",
      "Containerized inference services on GKE with separate node pools for batch and real-time workloads; monitored prediction latency and scoring throughput with Prometheus and Grafana.",
    ],
    tech: [
      "TensorFlow",
      "BioBERT / spaCy",
      "Vertex AI",
      "Kafka / GKE",
      "BigQuery",
      "MLflow",
      "FAISS",
      "FastAPI",
      "Docker / Terraform",
      "Prometheus / Grafana",
    ],
  },
  {
    company: "Huntington Bank",
    role: "ML Engineer / Data Scientist",
    period: "Feb 2019 -Jul 2021",
    location: "Columbus, OH",
    current: false,
    highlights: [
      "Designed end-to-end credit risk modeling pipelines -behavioral feature engineering (utilization ratios, payment velocity, delinquency roll rates), batch scoring, and production inference across Oracle and SQL Server.",
      "Benchmarked XGBoost and LightGBM against business-defined risk thresholds, prioritizing recall on high-risk borrowers where a missed delinquency carried more operational cost than a false positive.",
      "Used SHAP and LIME to produce individual and global model explanations for validation reviews -gave risk and compliance the audit artifacts needed to approve production deployment.",
      "Deployed scoring models as REST APIs with Flask and Docker on AWS EC2; ran PSI-based drift detection to flag borrower population divergence from training data before degradation reached the business.",
    ],
    tech: [
      "XGBoost / LightGBM",
      "SHAP / LIME",
      "PySpark",
      "Flask / Docker",
      "AWS EC2 / S3",
      "TensorFlow (LSTM)",
    ],
  },
  {
    company: "Value Labs",
    role: "Data Analyst",
    period: "Sep 2015 -Aug 2018",
    location: "Hyderabad, India",
    current: false,
    highlights: [
      "Built churn prediction models and used K-Means clustering to segment customers by behavioral risk profile -shifting the team from after-the-fact reporting toward proactive retention targeting.",
      "Found that support-heavy accounts were one of the strongest early churn signals, which changed how the marketing team prioritized outreach.",
      "Built Tableau and Power BI dashboards for leadership covering customer health and retention KPIs; delivered behavioral segment extracts directly to marketing the same day data landed.",
    ],
    tech: ["Python / SQL", "Scikit-learn", "K-Means", "Tableau", "Power BI"],
  },
];

export const writing = [
  {
    tag: "Configuration · Opinion",
    title: "JSON vs TOML: the split isn't about preference -it's about who reads the file",
    excerpt:
      "When code writes it and code reads it, JSON is fine. When humans come back six months later and the reasons need to survive, use TOML. My chunk size is 512 and not 256 -that note lives in the config.",
    url: "https://www.linkedin.com/in/chandra-mouli-narni/",
  },
  {
    tag: "Agent UX · Protocol",
    title: "AG-UI: a spinner is not a UX -it's an absence of one",
    excerpt:
      "Most agent UIs: message sent, spinner, 30 seconds, answer. Nobody knows what happened. AG-UI streams 17 typed events over SSE so users can watch agents work in real time and interrupt bad runs.",
    url: "https://www.linkedin.com/in/chandra-mouli-narni/",
  },
  {
    tag: "Engineering Practice",
    title: "Spec-driven development for GenAI systems",
    excerpt:
      "Before writing a single line, I answer uncomfortable questions: what inputs, what outputs, what are the failure cases, where does responsibility shift? Specs turn GenAI projects from demos into systems you can ship.",
    url: "https://www.linkedin.com/in/chandra-mouli-narni/",
  },
  {
    tag: "LLM Fundamentals",
    title: "From prompt engineering to context engineering",
    excerpt:
      "Prompt engineering is knowing the right keywords. Context engineering is shaping everything the model sees -the right data, grounding, roles, metadata, memory. That's what makes AI reliable in production.",
    url: "https://www.linkedin.com/in/chandra-mouli-narni/",
  },
  {
    tag: "Evaluation · MLOps",
    title: "LLM evaluation accounts for nearly 30% of overall effort",
    excerpt:
      "Automated metrics, LLM-as-a-judge, and human evaluation all serve different purposes. Most teams add task-specific checks on top. Tools: Ragas, LangSmith, TruLens, DeepEval, Evidently AI.",
    url: "https://www.linkedin.com/in/chandra-mouli-narni/",
  },
  {
    tag: "MCP · Agents",
    title: "MCP: the plug that lets AI agents safely find and use real-world capabilities",
    excerpt:
      "A browsable catalog of tools, resources, and prompts -typed with JSON schemas. Scoped auth, rate limits, policy checks, full audit trails. From custom glue code to a reusable control plane that scales.",
    url: "https://www.linkedin.com/in/chandra-mouli-narni/",
  },
];

export const certifications = [
  {
    issuer: "AWS",
    name: "AWS Certified Machine Learning Engineer, Associate",
  },
  {
    issuer: "IBM",
    name: "IBM Artificial Intelligence Practitioner Certificate · Advanced Level",
  },
];

export const education = [
  {
    degree: "MS",
    institution: "Saint Peter's University",
  },
];
