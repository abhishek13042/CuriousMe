// ── AI ENGINEER BATCH COACHING SYSTEM ──
// JEE-style: 4 subjects run in parallel every Mon-Sat
// S1: Generative AI (2.5 hrs/day) — never stops
// S2: Deep Learning (2 hrs/day)
// S3: Software Engineering (1.5 hrs/day)
// S4: DSA — Striver A2Z (1 hr/day, 474 problems)

export const BATCH_START_DATE = '2026-06-24';

export const SUBJECTS = {
  S1: { name: 'Generative AI',        color: '#7C3AED', bg: '#F5F3FF', hours: 2.5, icon: '🤖' },
  S2: { name: 'Deep Learning',         color: '#0369A1', bg: '#F0F9FF', hours: 2.0, icon: '🧠' },
  S3: { name: 'DS & ML Foundation',    color: '#047857', bg: '#ECFDF5', hours: 1.5, icon: '📊' },
  S4: { name: 'DSA — Striver A2Z',    color: '#B45309', bg: '#FFFBEB', hours: 1.0, icon: '🎯' },
  S5: { name: 'FAANG Prep',           color: '#DC2626', bg: '#FEF2F2', hours: 1.5, icon: '🏆' },
};

// S5 unlocks at Day 65 — when S3 finishes (65 sessions) and its 12:00–13:30 slot is freed
export const S5_START_DAY = 65;

// ─────────────────────────────────────────
// DAILY ROUTINE — fixed clock blocks, same every Mon–Sat.
// 7 focused study hours: DSA warm-up → GenAI deep work →
// break → Deep Learning → Software Engineering → DPP.
// Edit start/end here to match your own day.
// ─────────────────────────────────────────
export const DAILY_BLOCKS = [
  { start: '06:00', end: '07:00', key: 'S4',    label: 'Warm-up problem solving' },
  { start: '07:00', end: '09:30', key: 'S1',    label: 'Primary deep work (fresh mind)' },
  { start: '09:30', end: '10:00', key: 'BREAK', label: 'Break · move · refuel' },
  { start: '10:00', end: '12:00', key: 'S2',    label: 'Core theory + implementation' },
  { start: '12:00', end: '13:30', key: 'S3',    label: 'DS & ML Foundation (Days 1–65)' },
  { start: '12:00', end: '13:30', key: 'S5',    label: 'FAANG Prep — same slot, Day 65+' },
  { start: '13:30', end: '14:00', key: 'DPP',   label: 'AI-generated practice problems' },
];

export const STUDY_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// ─────────────────────────────────────────
// S1 — GENERATIVE AI SEQUENCE
// ─────────────────────────────────────────
export const S1_SEQUENCE = [
  {
    module: 'LangChain for GenAI',
    source: 'YouTube',
    color: '#7C3AED',
    lectures: [
      'Introduction to LangChain — Why It Exists and Core Architecture',
      'LangChain Components — Models, Prompts, Chains, Memory, Agents',
      'LangChain Models — LLMs, Chat Models and Embedding Models',
      'Prompt Templates — Static, Dynamic and Few-Shot Templates',
      'Chains — SimpleSequentialChain and the LCEL Pipeline',
      'Sequential Chains and Router Chains',
      'Memory in LangChain — ConversationBufferMemory and Summary',
      'Document Loaders — PDF, Web, CSV and Custom Loaders',
      'Text Splitters — Recursive, Token-Based and Semantic Chunking',
      'Vector Stores — FAISS, Chroma and Pinecone Integration',
      'Retrievers — Similarity Search, MMR and BM25',
      'RAG Pipeline — End-to-End Retrieval Augmented Generation',
      'LangChain Agents — ReAct, OpenAI Functions and Tool Calling',
      'Custom Tools and Toolkits in LangChain',
      'LangChain Callbacks, Streaming and Async Execution',
      'LangServe — Deploying LangChain Apps as REST APIs',
      'LangSmith — Tracing, Debugging and Evaluation',
      'Mini Project — Intelligent Document Q&A Chatbot',
      'Mini Project — Multi-Source Research Assistant',
      'Mini Project — Customer Support Agent with Memory',
    ],
  },
  {
    module: 'Advanced RAG',
    source: 'CampusX Paid',
    color: '#7C3AED',
    lectures: [
      'Why RAG Is Important — Limitations of Pure LLMs',
      'What Is RAG — Architecture, Flow and Use Cases',
      'How RAG Works — Indexing, Retrieval and Generation Pipeline',
      'Document Loaders — What They Are and How They Work',
      'Text Loader, CSV Loader and PDF Loader in LangChain',
      'JSON Loader, Web Loader and Recursive Web Loader',
      'Text Splitters — Text-Based and Length-Based Splitters',
      'Advanced Text Splitter Techniques — Semantic and Code Splitters',
      'Vector Embeddings, Embedding Space and Distance Metrics',
      'Embedding Dimensionality and Proprietary vs Open Source Models',
      'Vector Stores — CRUD Operations, FAISS and Chroma',
      'Retrievers — Similarity Search and Threshold-Based Retrieval',
      'MMR Retriever for Diverse Results',
      'BM25 Retriever, Hybrid and Ensemble Retriever',
      'Contextual Compression Retriever and Parent Document Retriever',
      'Self-Query Retriever and Multi-Query Retriever',
      'RAG Re-Ranking — Cross-Encoders and Reranking Pipelines',
      'RAG Fusion — Merging Multiple Retrieval Results',
      'HyDE — Hypothetical Document Embeddings for Better Retrieval',
      'Corrective RAG (CRAG) — Self-Correcting Retrieval Pipeline',
      'Self-RAG — Adaptive Retrieval with Reflection Tokens',
      'Agentic RAG Concept — Agents that Choose When to Retrieve',
      'Agentic RAG Implementation Using LangGraph',
      'Graph RAG Theory — Knowledge Graphs + Retrieval',
      'Graph RAG Code — Implementing Graph-Based Retrieval',
      'Multi-Modal RAG — Images, Tables and Text Together',
      'RAG Assessment and Evaluation Metrics',
      'Guardrails in RAG — Input/Output Safety',
      'Implementing Individual Guardrails',
      'Guardrails Implementation in the Full RAG Pipeline',
      'RAG Caching and Optimization',
      'RAG Security, Monitoring and Debugging',
      'Optimising the RAG Pipeline for Production',
      'RAG Evaluation and Deployment with RAGAS Framework',
    ],
  },
  {
    module: 'LangGraph — Agentic Workflows',
    source: 'CampusX Paid',
    color: '#7C3AED',
    lectures: [
      'Introduction to LangGraph and Why Graphs for AI Agents',
      'Graph Fundamentals — Nodes, Edges and State',
      'State Management in LangGraph',
      'Building Your First LangGraph Agent',
      'Conditional Edges and Branching Logic',
      'Human-in-the-Loop Workflows',
      'Parallel Node Execution',
      'Checkpointing and State Persistence',
      'Memory in LangGraph — Short and Long Term',
      'Adding Memory in LLMs using LangGraph',
      'Multi-Agent Systems Architecture',
      'Supervisor Agent Pattern',
      'Hierarchical Multi-Agent Workflows',
      'LangGraph with Tool Calling',
      'Streaming in LangGraph',
      'LangGraph Cloud and LangGraph Studio',
      'LangGraph Project 1 — Research and Writing Agent',
      'LangGraph Project 2 — Customer Support Multi-Agent',
      'LangGraph Project 3 — Code Review Agent',
      'LangGraph Project 4 — Data Analysis Agent',
      'Debugging and Monitoring LangGraph Apps',
      'LangGraph Best Practices and Anti-Patterns',
      'LangGraph with Advanced RAG Integration',
      'Deploying LangGraph Agents to Production',
      'LangGraph Case Study — End-to-End Agentic System',
    ],
  },
  {
    module: 'CrewAI — Multi-Agent Systems',
    source: 'CampusX Paid',
    color: '#7C3AED',
    lectures: [
      'Introduction to AI Agents and Why Multi-Agent Systems',
      'CrewAI Components Theory — Agents, Tasks, Crews and Tools',
      'CrewAI Code — Building Your First Crew',
      'Structured Output with Pydantic in CrewAI',
      'Types of Crew Process — Sequential vs Hierarchical',
      'Integrating Knowledge into CrewAI Agents',
      'CrewAI Flows and Flow State — Structured vs Unstructured',
      'Types of Flows in CrewAI',
      'Project Part 1 — Research Crew Build',
      'Project Part 2 — Writing Crew Build',
      'Project Part 3 — Flow Creation and Orchestration',
    ],
  },
  {
    module: 'Agno — AI Agent Framework',
    source: 'CampusX Paid',
    color: '#7C3AED',
    lectures: [
      'From Gen AI to Agentic AI Systems — Evolution and Architecture',
      'Components of Agno — Models, Tools, Memory and Storage',
      'Integrating Knowledge into Agno Systems',
      'Multi-Agent Systems in Agno',
      'Workflows in Agno — Deterministic Agent Pipelines',
      'Project — Medium Article Writer Agent',
      'Project — Data Science Assistant Agent',
    ],
  },
  {
    module: 'Model Context Protocol (MCP)',
    source: 'YouTube',
    color: '#7C3AED',
    lectures: [
      'What Is MCP — Why Anthropic Built the Model Context Protocol',
      'MCP Architecture — Hosts, Clients, Servers and Transport',
      'MCP Server Development — Building Your First Server',
      'MCP Tools, Resources and Prompts',
      'MCP Client Integration — Connecting to Claude and Other LLMs',
      'MCP with Local LLMs via Ollama',
      'Building a Production MCP Server',
      'MCP in Claude Desktop — Real-World Use Cases',
    ],
  },
  {
    module: 'Prompt Engineering',
    source: 'CampusX Paid',
    color: '#7C3AED',
    lectures: [
      'Introduction to LLMs, Mechanics and Fundamentals of Prompt Engineering',
      'Model Configurations and Output Parameters — Temperature, Top-P, Max Tokens',
      'Shot Prompting — Zero-Shot, One-Shot and Few-Shot with Examples',
      'System Instruction Prompting — Role-Playing and Persona Setting',
      'Delimiter Prompting — Structuring Inputs for Clarity',
      'Chain of Thought (CoT) Prompting',
      'Consistency and Self-Consistency Prompting',
      'Plan and Solve Prompting',
      'Chain of Draft Prompting',
      'System 2 Attention Prompting',
      'Prompt Chaining — Sequential Reasoning Pipelines',
      'Meta Prompting — Prompts that Write Prompts',
      'Multi-Modal Prompting — Images, Audio and Video',
      'RAG Prompting — Grounding LLMs with Retrieved Context',
      'Image Generation Model Prompting',
      'Video Generation Model Prompting',
      'Adversarial Prompting — Jailbreaking, Injection and Defense',
      'Prompt Management — Planning Phase',
      'Prompt Management — Drafting Phase',
      'Prompt Evaluation, Versioning and Storage',
      'DeepEval — Automated Prompt Evaluation Framework',
      'Prompt Engineering Best Practices for Production Systems',
    ],
  },
  {
    module: 'N8N — AI Agents & Automation',
    source: 'CampusX Paid',
    color: '#7C3AED',
    lectures: [
      'Introduction to N8N — Visual Workflow Automation for AI',
      'N8N Basics — Nodes, Workflows and Triggers',
      'Installing and Self-Hosting N8N',
      'Data Flow in N8N — How Data Passes Between Nodes',
      'Types of Workflows — Sequential, Parallel and Conditional',
      'Project — AI News Summariser with N8N',
      'Project — AI Code Buddy Automation',
      'Project — AI Coach Workflow',
      'Setting up Google Credentials for N8N Integrations',
    ],
  },
  {
    module: 'Generative AI using Open Source LLMs (Ollama)',
    source: 'CampusX Paid',
    color: '#7C3AED',
    lectures: [
      'Ollama Introduction — Running LLMs Locally',
      'Ollama Models Capabilities — What Models Are Available',
      'Ollama Model Architecture — Structure and Configuration',
      'Ollama CLI Commands — Pull, Run, List and Delete',
      'Using the Ollama Python Library',
      'Modelfile in Ollama — Customizing Model Behavior',
      'Ollama REST API — Building Apps with HTTP Endpoints',
      'Tool Calling with Ollama Models',
      'Generating Embeddings with Ollama',
      'RAG Application Using Ollama — Local Private RAG',
      'Concurrency and Model Chaining in Ollama',
      'GPU Offloading — Running Models on Limited Hardware',
      'Ollama Cloud — Hosted Model Serving',
      'Hosted API Services and HuggingFace Models with Ollama',
      'Project — Brand Monitor App Part 1',
      'Project — Brand Monitor App Part 2 (Code Correction)',
      'Dockerizing an Ollama Application',
      'LM Studio — Alternative Local LLM Interface',
    ],
  },
  {
    module: 'Claude Code — AI-Powered Development',
    source: 'YouTube',
    color: '#7C3AED',
    lectures: [
      'Claude Code Introduction — What It Is and Why It Matters',
      'Setting Up Claude Code — Installation and Configuration',
      'Core Workflows — Reading, Writing and Editing Code',
      'CLAUDE.md — Teaching Claude About Your Codebase',
      'Multi-File Editing and Codebase Navigation',
      'Bash Commands and Tool Use in Claude Code',
      'Using Claude Code for Debugging and Error Resolution',
      'Git Workflows with Claude Code — Commits, PRs and Diffs',
      'Claude Code in CI/CD Pipelines',
      'Building Custom Slash Commands',
      'MCP Integration with Claude Code',
      'Claude Code SDK — Building AI Coding Agents',
      'Agentic Coding — Autonomous Multi-Step Tasks',
      'Claude Code Best Practices and Prompt Tips',
      'Real-World Project — Full-Stack App with Claude Code',
    ],
  },
  {
    module: 'LLM Evaluation',
    source: 'YouTube',
    color: '#7C3AED',
    lectures: [
      'Introduction to LLM Evaluations — Model Evals vs Application Evals',
      'Stop Vibe Testing Your AI — The Ultimate Guide to LLM Evaluations',
    ],
  },
];

// ─────────────────────────────────────────
// S2 — DEEP LEARNING SEQUENCE
// ─────────────────────────────────────────
export const S2_SEQUENCE = [
  {
    module: 'Mathematics for Machine Learning',
    source: 'YouTube',
    color: '#0369A1',
    lectures: [
      'What is Covariance — Understanding Joint Variability',
      'Pearson Correlation Coefficient — Measuring Linear Relationships',
      'QQ Plots — Checking Normality of Distributions',
      'Confidence Intervals — Estimating Population Parameters',
      'Hypothesis Testing — Z-Test and T-Test',
      'Chi-Square Test — Testing Categorical Independence',
      'ANOVA — Comparing Multiple Group Means',
      'Conditional Probability and Bayes Theorem',
      'Independent Events and Probability Rules',
      'Uniform, Binomial and Bernoulli Distributions',
      'Poisson Distribution and Real-World Applications',
      'Vectors — Representation, Operations and Geometry',
      'Matrices and Matrix Operations',
      'Dot Products and Matrix Multiplication',
      'Representing Tabular Data as Matrices',
      'Equation of a Hyperplane in N-Dimensions',
      'Eigenvalues and Eigenvectors — Intuition and Computation',
      'Principal Component Analysis via Eigenvectors',
      'Derivatives — The Big Picture and Chain Rule',
      'Partial Derivatives and Gradients',
      'Maxima, Minima and Saddle Points',
      'Gradient Descent — The Optimization Algorithm for ML',
      'Jacobian and Hessian Matrices',
    ],
  },
  {
    module: '100 Days of Deep Learning — ANN (Fundamentals)',
    source: 'CampusX',
    color: '#0369A1',
    lectures: [
      "100 Days of Deep Learning — Course Announcement",
      "What is Deep Learning? Deep Learning Vs Machine Learning",
      "Types of Neural Networks | History & Applications of Deep Learning",
      "What is a Perceptron? Perceptron Vs Neuron | Geometric Intuition",
      "Perceptron Trick | How to Train a Perceptron (Part 2)",
      "Perceptron Loss Function | Hinge Loss | Binary Cross Entropy | Sigmoid",
      "Problem with Perceptron",
      "MLP Notation",
      "Multi Layer Perceptron (MLP) Intuition",
      "Forward Propagation | How a Neural Network Predicts Output",
      "Customer Churn Prediction using ANN | Keras & TensorFlow",
      "Handwritten Digit Classification using ANN | MNIST Dataset",
      "Graduate Admission Prediction using ANN",
      "Loss Functions in Deep Learning",
      "Backpropagation | Part 1 | The What?",
      "Backpropagation | Part 2 | The How?",
      "Backpropagation | Part 3 | The Why?",
      "Vanishing & Exploding Gradient Problem in ANN",
      "MLP Memoization",
      "Gradient Descent | Batch vs Stochastic vs Mini-Batch",
      "How to Improve the Performance of a Neural Network",
      "Early Stopping in Neural Networks",
      "Data Scaling / Feature Scaling in ANN",
      "Dropout Layer in Deep Learning | Dropouts in ANN",
      "Dropout Layers in ANN | Code Example (Regression & Classification)",
      "Regularization | L1, L2 & Weight Decay in ANN",
      "Activation Functions | Sigmoid, Tanh & ReLU",
      "ReLU Variants | Leaky ReLU, Parametric ReLU, ELU, SELU",
      "Weight Initialization Techniques | What Not To Do",
      "Xavier/Glorot and He Weight Initialization",
      "Batch Normalization in Deep Learning | Keras",
      "Optimizers in Deep Learning | Part 1",
      "Exponentially Weighted Moving Average",
      "SGD with Momentum | Optimizers Part 2",
      "Nesterov Accelerated Gradient (NAG) | Optimizers Part 3",
      "AdaGrad | Optimizers Part 4",
      "RMSProp | Optimizers Part 5",
      "Adam Optimizer | Optimizers Part 6",
      "Keras Tuner | Hyperparameter Tuning a Neural Network",
    ],
  },
  {
    module: '100 Days of Deep Learning — CNN (Computer Vision)',
    source: 'CampusX',
    color: '#0369A1',
    lectures: [
      "What is a Convolutional Neural Network (CNN)? | CNN Intuition",
      "CNN Vs Visual Cortex | The Famous Cat Experiment | History of CNN",
      "Convolution Operation | CNN Part 3",
      "Padding & Strides in CNN",
      "Pooling Layer in CNN | MaxPooling",
      "CNN Architecture | LeNet-5",
      "Comparing CNN Vs ANN",
      "Backpropagation in CNN | Part 1",
      "CNN Backpropagation | Part 2 (Convolution, MaxPooling, Flatten)",
      "Cat Vs Dog Image Classification Project | CNN Project",
      "Data Augmentation in Deep Learning | CNN",
      "Pretrained Models in CNN | ImageNet, ILSVRC | Keras",
      "What does a CNN See? | Visualizing CNN Filters & Feature Maps",
      "What is Transfer Learning? | Fine-Tuning vs Feature Extraction",
      "Keras Functional Model | Building Non-Linear Neural Networks",
    ],
  },
  {
    module: '100 Days of Deep Learning — RNN & LSTM',
    source: 'CampusX',
    color: '#0369A1',
    lectures: [
      "Why RNNs are Needed | RNN Vs ANN | RNN Part 1",
      "Recurrent Neural Network | Forward Propagation & Architecture",
      "RNN Sentiment Analysis | RNN Code Example in Keras",
      "Types of RNN | Many-to-Many, One-to-Many, Many-to-One",
      "Backpropagation Through Time (BPTT) in RNN",
      "Problems with RNN",
      "LSTM | Long Short Term Memory | Part 1 | The What?",
      "LSTM Architecture | Part 2 | The How?",
      "LSTM | Part 3 | Next Word Predictor",
      "Gated Recurrent Unit (GRU)",
      "Deep RNNs | Stacked RNNs, LSTMs & GRUs",
      "Bidirectional RNN | BiLSTM & Bidirectional GRU",
    ],
  },
  {
    module: '100 Days of Deep Learning — Transformers & LLMs',
    source: 'CampusX',
    color: '#0369A1',
    lectures: [
      "The Epic History of Large Language Models (LLMs) | LSTMs to ChatGPT",
      "Encoder-Decoder | Sequence-to-Sequence Architecture",
      "Attention Mechanism | Seq2Seq Encoder-Decoder",
      "Bahdanau Attention Vs Luong Attention",
      "Introduction to Transformers | Transformers Part 1",
      "What is Self Attention? | Transformers Part 2",
      "Self Attention in Transformers | Explanation with Code",
      "Scaled Dot Product Attention | Why Do We Scale?",
      "Self Attention Geometric Intuition",
      "Why is Self Attention Called 'Self'? | Self vs Luong Attention",
      "Multi-Head Attention in Transformers",
      "Positional Encoding in Transformers",
      "Layer Normalization in Transformers | Layer Norm Vs Batch Norm",
      "Transformer Architecture | Part 1 | Encoder Architecture",
      "Masked Self Attention | Masked Multi-Head Attention (Decoder)",
      "Cross Attention in Transformers",
      "Transformer Decoder Architecture",
      "Transformer Inference | How Inference is Done in Transformers",
    ],
  },
  {
    module: 'PyTorch — Practical Deep Learning',
    source: 'YouTube',
    color: '#0369A1',
    lectures: [
      'PyTorch Introduction — Tensors and Autograd',
      'PyTorch Tensors — Operations, Shapes and GPU Transfer',
      'Autograd — Automatic Differentiation in PyTorch',
      'Building Neural Networks with nn.Module',
      'Custom Datasets and DataLoaders',
      'Training Loop — Forward Pass, Loss, Backward, Update',
      'Saving and Loading PyTorch Models',
      'Transfer Learning with PyTorch — ResNet Fine-Tuning',
      'Custom Loss Functions in PyTorch',
      'Learning Rate Schedulers in PyTorch',
      'Multi-GPU Training with DataParallel',
      'PyTorch Lightning — Clean Training Code',
      'TorchScript — Deploying PyTorch Models',
      'ONNX Export — Cross-Framework Model Deployment',
    ],
  },
  {
    module: 'Natural Language Processing',
    source: 'YouTube',
    color: '#0369A1',
    lectures: [
      'NLP Introduction — Text Preprocessing Pipeline',
      'Tokenization, Stemming and Lemmatization',
      'Bag of Words, TF-IDF and N-gram Models',
      'Sentiment Analysis — Rule-Based and ML Approaches',
      'Named Entity Recognition (NER) with spaCy',
      'Text Classification with Traditional ML and Deep Learning',
      'Word Embeddings — Word2Vec, GloVe and FastText Deep Dive',
      'Advanced NLP — Coreference Resolution and Dependency Parsing',
    ],
  },
  {
    module: 'Deep Learning Projects (LSTM & NLP)',
    source: 'CampusX Paid',
    color: '#0369A1',
    lectures: [
      'Introduction to PyTorch and Sequence Modeling Review',
      'RNN and LSTM Review, Encoder-Decoder Architecture',
      'Next Word Prediction Using LSTM',
      'LSTM Encoder-Decoder with Attention Mechanism',
      'Neural Machine Translation End-to-End Project',
    ],
  },
  {
    module: 'Fine-Tuning Transformers with HuggingFace',
    source: 'CampusX Free',
    color: '#0369A1',
    lectures: [
      'HuggingFace Ecosystem — Transformers, Datasets and Hub',
      'Transformer Architecture Deep Dive — Encoder, Decoder, Encoder-Decoder',
      'BERT Architecture and Pre-Training Objectives',
      'Fine-Tuning BERT for Text Classification',
      'T5 Architecture — Text-to-Text Framework',
      'Fine-Tuning T5 for Summarization',
      'GPT Fine-Tuning for Text Generation',
      'LoRA and PEFT — Parameter Efficient Fine-Tuning',
      'QLoRA — Quantized Low-Rank Adaptation',
      'RLHF Implementation — Reward Modeling and PPO',
      'Evaluating Fine-Tuned Models — BLEU, ROUGE, BERTScore',
      'Deploying HuggingFace Models to Production',
    ],
  },
  {
    module: 'Reinforcement Learning Crash Course',
    source: 'YouTube',
    color: '#0369A1',
    lectures: [
      'Reinforcement Learning Introduction — Agent, Environment and Reward',
      'Markov Decision Processes — States, Actions and Transition Dynamics',
      'Value Functions — V(s), Q(s,a) and the Bellman Equation',
      'Model-Free RL — Q-Learning and SARSA',
      'Deep Q-Network (DQN) — RL with Neural Networks',
      'N-Step TD Learning and Eligibility Traces',
    ],
  },
];

// ─────────────────────────────────────────
// S3 — SOFTWARE ENGINEERING SEQUENCE
// ─────────────────────────────────────────
export const S3_SEQUENCE = [
  // ─── MODULE 1: Python for Data Science ───────────────────────────────────
  {
    module: 'Python for Data Science',
    source: 'CampusX DSMP — Weeks 1–4',
    color: '#047857',
    lectures: [
      'Python Basics — data types, variables, operators, user input, type conversion',
      'Python Control Flow — if-else, while loop, for loop, break/continue/pass',
      'Python Strings — indexing, slicing, common string functions, comprehension',
      'Python Collections — Lists, Tuples, Sets and Dictionaries deep dive',
      'Python Functions — args/kwargs, lambda, map/filter/reduce, closures',
      'OOP Part 1 — classes, objects, constructor, magic methods (__str__, __add__)',
      'OOP Part 2 — encapsulation, reference variables, static variables and methods',
      'OOP Part 3 — inheritance (single, multilevel, multiple), polymorphism, abstraction',
      'Advanced Python — file handling, JSON, exception handling, decorators, generators',
    ],
  },
  // ─── MODULE 2: NumPy & Pandas ────────────────────────────────────────────
  {
    module: 'NumPy & Pandas — Data Wrangling',
    source: 'CampusX DSMP — Weeks 5–8',
    color: '#047857',
    lectures: [
      'NumPy Fundamentals — arrays, matrix, attributes, operations, dot product',
      'Advanced NumPy — broadcasting, fancy indexing, vectorised math, missing values',
      'Pandas Series — creation, series methods, boolean indexing, plotting',
      'Pandas DataFrame — read_csv, attributes, filtering, selecting rows and cols',
      'DataFrame Methods — sort, reset_index, fillna, dropna, value_counts, apply',
      'GroupBy and Aggregations — builtin functions, hands-on IPL dataset',
      'Merging, Joining and Concatenating DataFrames — merge, join, concat',
      'MultiIndex, Pivot Tables, Datetime and Vectorised String Ops in Pandas',
      'EDA Case Study — Indian Startup Funding Dataset end-to-end with Streamlit',
    ],
  },
  // ─── MODULE 3: Data Visualisation ────────────────────────────────────────
  {
    module: 'Data Visualisation',
    source: 'CampusX DSMP — Weeks 9–10',
    color: '#047857',
    lectures: [
      'Matplotlib — line, scatter, bar, histogram, pie, legends, subplots, heatmaps',
      'Seaborn Part 1 — relational plots, distribution plots, KDE, matrix plots',
      'Seaborn Part 2 — categorical plots (boxplot, violin, bar, countplot), FacetGrid, pairplot',
      'Plotly & Dash — interactive charts, geographic plots, COVID-19 dashboard project',
    ],
  },
  // ─── MODULE 4: SQL for Data Science ──────────────────────────────────────
  {
    module: 'SQL for Data Science',
    source: 'CampusX DSMP — Weeks 13–16',
    color: '#047857',
    lectures: [
      'Database Fundamentals — DBMS, keys, cardinality, DDL (CREATE, ALTER, DROP)',
      'SQL DML — INSERT, SELECT, UPDATE, DELETE, built-in functions',
      'SQL Grouping and Sorting — ORDER BY, GROUP BY, HAVING, IPL dataset practice',
      'SQL Joins — CROSS, INNER, LEFT, RIGHT, FULL OUTER, SELF joins, SET operations',
      'Subqueries — independent, correlated, EXISTS, ALL/ANY, Zomato case study',
      'Window Functions Part 1 — OVER(), RANK(), DENSE_RANK(), ROW_NUMBER(), LAG(), LEAD()',
      'Window Functions Part 2 — cumulative sum, running avg, percentiles, segmentation',
      'SQL Data Cleaning and EDA — string functions, wildcards, Laptop Dataset hands-on',
    ],
  },
  // ─── MODULE 5: Statistics for ML ─────────────────────────────────────────
  {
    module: 'Statistics for Machine Learning',
    source: 'CampusX DSMP — Weeks 17–21',
    color: '#047857',
    lectures: [
      'Descriptive Stats Part 1 — central tendency, dispersion, coefficient of variation',
      'Descriptive Stats Part 2 — quantiles, boxplots, scatterplots, covariance, correlation',
      'Probability Distributions — random variables, PMF, CDF, PDF, KDE, parametric vs non-parametric',
      'Normal Distribution — PDF equation, z-table, empirical rule, skewness, CDF',
      'Non-Gaussian Distributions — kurtosis, QQ-plot, log-normal, Pareto, Box-Cox, Yeo-Johnson',
      'Central Limit Theorem — Bernoulli, Binomial, sampling distributions, CLT proof',
      'Confidence Intervals — z-procedure, t-distribution, point estimates, interpretation',
      'Hypothesis Testing Part 1 — null/alt hypothesis, z-test, rejection region, Type I/II errors',
      'Hypothesis Testing Part 2 — p-value, one/two-sample t-tests, paired t-test',
      'Chi-square Test and ANOVA — goodness of fit, independence, F-distribution, post-hoc tests',
    ],
  },
  // ─── MODULE 6: Linear Algebra ─────────────────────────────────────────────
  {
    module: 'Linear Algebra for ML',
    source: 'CampusX DSMP — Week 22',
    color: '#047857',
    lectures: [
      'Tensors and Vectors — 0D–5D tensors, dot product, angle, equation of a hyperplane',
      'Matrices Computation — types, operations, transpose, determinant, inverse, linear equations',
      'Linear Transformations — basis vectors, matrix multiplication as composition, intuition',
      'Eigen Decomposition and SVD — eigenvectors, eigenvalues, PCA connection, geometric intuition',
    ],
  },
  // ─── MODULE 7: Core ML Algorithms ────────────────────────────────────────
  {
    module: 'Core Machine Learning Algorithms',
    source: 'CampusX DSMP — Weeks 23–36',
    color: '#047857',
    lectures: [
      'Intro to ML — types, ML lifecycle, batch vs online, challenges, job roles',
      'Linear Regression — OLS, MAE/MSE/R², gradient descent from scratch',
      'Multiple Linear Regression — math formulation, multicollinearity, VIF',
      'Regression Analysis — F-statistic, R², Adjusted R², Polynomial Regression',
      'Regularization — Ridge, Lasso, ElasticNet, geometric intuition, bias-variance tradeoff',
      'Feature Engineering — encoding (ordinal, OHE, target), scaling (standardization, minmax, robust)',
      'Handling Missing Data — CCA, mean/median/KNN/iterative imputation (MICE)',
      'Outlier Detection — Z-score, IQR, Isolation Forest, Local Outlier Factor',
      'Feature Selection — filter (correlation, ANOVA), wrapper (RFE), embedded (LASSO, tree)',
      'Model Evaluation — cross-validation (K-fold, stratified), ROC-AUC, hyperparameter tuning',
      'Naive Bayes — Gaussian, Categorical, Multinomial, log-probabilities, Laplace smoothing',
      'Logistic Regression — sigmoid, log-loss, MLE, multiclass (OVR, SoftMax), regularization',
      'KNN + SVM — decision surface, weighted KNN, kernel trick, RBF, hard/soft margin',
      'Decision Trees + Ensemble — CART, Gini, Random Forest, Gradient Boosting, XGBoost',
      'Unsupervised Learning — KMeans, DBSCAN, Hierarchical Clustering, GMM, PCA, t-SNE',
    ],
  },
  // ─── MODULE 8: MLOps & Deployment ────────────────────────────────────────
  {
    module: 'MLOps & Deployment',
    source: 'CampusX DSMP — MLOps Modules',
    color: '#047857',
    lectures: [
      'Git + GitHub — branching, PRs, .gitignore, version control workflow for ML',
      'ML Reproducibility — Cookiecutter templates, project structure best practices',
      'DVC — data versioning, pipeline definition (dvc.yaml), dvc repro vs dvc exp run',
      'MLflow Experiment Tracking — logging metrics, model registry, DAGsHub + AWS remote',
      'CI/CD with GitHub Actions — workflow YAML, CML integration, automated testing',
      'Docker + Containerisation — Dockerfile, images, volumes, Docker Compose for ML apps',
      'FastAPI for Model Serving — pydantic schemas, prediction endpoints, async routes',
      'AWS Deployment — EC2, S3, ECR, ECS, SageMaker basics, end-to-end credit card pipeline',
    ],
  },
];

// ─────────────────────────────────────────
// S4 — DSA SEQUENCE HELPER
// Striver A2Z: 532 problems across 49 sub-sections, 2/day → 266 study days
// ─────────────────────────────────────────
export const DSA_STEPS = [
  {
    step: 'Step 1', name: 'Learn the basics',
    sections: [
      { name: 'Things to Know in C++/Java/Python or any language', problems: [
        "Input/Output Basics", "C++ / Language Basics", "If-Else & Else-If Statements",
        "Switch Case Statement", "What are Arrays & Strings?", "For Loops",
        "While Loops", "Functions — Pass by Reference vs Value", "Theory with Examples",
      ]},
      { name: 'Build-up Logical Thinking', problems: [
        "Patterns — Easy and Medium", "Patterns — Hard",
      ]},
      { name: 'Patterns', problems: [
        "Pattern 1 — Rectangular Star Pattern", "Pattern 2 — Right-Angled Star Triangle",
        "Pattern 3 — Right-Angled Number Triangle", "Pattern 4 — Repeating Number Triangle",
        "Pattern 5 — Inverted Right-Angled Star Triangle", "Pattern 6 — Inverted Number Triangle",
        "Pattern 7 — Star Pyramid", "Pattern 8 — Inverted Star Pyramid",
        "Pattern 9 — Star Diamond", "Pattern 10 — Half-Diamond Star",
        "Pattern 11 — Binary Number Triangle", "Pattern 12 — Number Crown (1234..4321)",
        "Pattern 13 — Increasing Number Triangle", "Pattern 14 — Increasing Letter Triangle",
        "Pattern 15 — Reverse Letter Triangle", "Pattern 16 — Alpha-Ramp Pattern",
        "Pattern 17 — Alpha-Hill (Letter Pyramid)", "Pattern 18 — Reverse Alphabet Triangle",
        "Pattern 19 — Symmetric Void Pattern", "Pattern 20 — Symmetric Butterfly",
        "Pattern 21 — Hollow Rectangle", "Pattern 22 — Concentric Number Square",
      ]},
      { name: 'Learn STL/Java-Collections or similar thing in your language', problems: [
        "C++ STL", "Java Collections",
      ]},
      { name: 'Know Basic Maths', problems: [
        "Count All Digits of a Number", "Reverse a Number", "Palindrome Number",
        "GCD of Two Numbers", "Check if Number is Armstrong", "Print All Divisors",
        "Check for Prime Number",
      ]},
      { name: 'Learn Basic Recursion', problems: [
        "Understand Recursion — Print Something N Times", "Print Name N Times using Recursion",
        "Print 1 to N using Recursion", "Print N to 1 using Recursion",
        "Sum of First N Numbers", "Factorial of a Number", "Reverse an Array (Recursion)",
        "Check if String is Palindrome", "Fibonacci Number",
      ]},
      { name: 'Learn Basic Hashing', problems: [
        "Basic Hashing (Theory)", "Counting Frequencies of Array Elements",
        "Highest / Lowest Occurring Element",
      ]},
    ]
  },
  {
    step: 'Step 2', name: 'Learn Important Sorting Techniques',
    sections: [
      { name: 'Sorting-I', problems: [
        "Selection Sort", "Bubble Sort", "Insertion Sort",
      ]},
      { name: 'Sorting-II', problems: [
        "Merge Sort", "Recursive Bubble Sort", "Recursive Insertion Sort", "Quick Sort",
      ]},
    ]
  },
  {
    step: 'Step 3', name: 'Solve Problems on Arrays [Easy -> Medium -> Hard]',
    sections: [
      { name: 'Easy', problems: [
        "Largest Element in Array", "Second Largest Element", "Check if Array is Sorted",
        "Remove Duplicates from Sorted Array", "Left Rotate Array by One", "Left Rotate Array by K Places",
        "Move Zeros to End", "Linear Search", "Union of Two Sorted Arrays",
        "Find Missing Number", "Maximum Consecutive Ones", "Find Number Appearing Once (others twice)",
        "Longest Subarray with Sum K (Positives)", "Longest Subarray with Sum K (Pos + Neg)",
      ]},
      { name: 'Medium', problems: [
        "Two Sum", "Sort an Array of 0s, 1s and 2s", "Majority Element (> n/2)",
        "Kadane's Algorithm — Max Subarray Sum", "Print Subarray with Maximum Sum", "Stock Buy and Sell",
        "Rearrange Array Elements by Sign", "Next Permutation", "Leaders in an Array",
        "Longest Consecutive Sequence", "Set Matrix Zeroes", "Rotate Matrix by 90 Degrees",
        "Print Matrix in Spiral Manner", "Count Subarrays with Given Sum",
      ]},
      { name: 'Hard', problems: [
        "Pascal's Triangle", "Majority Element (> n/3)", "3 Sum", "4 Sum",
        "Largest Subarray with Sum 0", "Count Subarrays with XOR K", "Merge Overlapping Subintervals",
        "Merge Two Sorted Arrays Without Extra Space", "Find the Repeating and Missing Number",
        "Count Inversions", "Reverse Pairs", "Maximum Product Subarray",
      ]},
    ]
  },
  {
    step: 'Step 4', name: 'Binary Search [1D, 2D Arrays, Search Space]',
    sections: [
      { name: 'BS on 1D Arrays', problems: [
        "Search X in Sorted Array", "Lower Bound", "Upper Bound", "Search Insert Position",
        "Floor and Ceil in Sorted Array", "First and Last Occurrence", "Count Occurrences in Sorted Array",
        "Search in Rotated Sorted Array I", "Search in Rotated Sorted Array II",
        "Find Minimum in Rotated Sorted Array", "Find How Many Times Array is Rotated",
        "Single Element in Sorted Array", "Find Peak Element",
      ]},
      { name: 'BS on Answers', problems: [
        "Find Square Root of a Number", "Find Nth Root of a Number", "Koko Eating Bananas",
        "Minimum Days to Make M Bouquets", "Find the Smallest Divisor", "Capacity to Ship Packages in D Days",
        "Kth Missing Positive Number", "Aggressive Cows", "Book Allocation Problem",
        "Split Array — Largest Sum", "Painter's Partition", "Minimize Max Distance to Gas Station",
        "Median of Two Sorted Arrays", "Kth Element of Two Sorted Arrays",
      ]},
      { name: 'BS on 2D Arrays', problems: [
        "Find Row with Maximum 1s", "Search in a 2D Matrix", "Search in a 2D Matrix II",
        "Find Peak Element II", "Matrix Median",
      ]},
    ]
  },
  {
    step: 'Step 5', name: 'Strings [Basic and Medium]',
    sections: [
      { name: 'Basic and Easy String Problems', problems: [
        "Remove Outermost Parentheses", "Reverse Words in a String", "Largest Odd Number in a String",
        "Longest Common Prefix", "Isomorphic String", "Rotate String",
        "Check if Two Strings are Anagrams",
      ]},
      { name: 'Medium String Problems', problems: [
        "Sort Characters by Frequency", "Maximum Nesting Depth of Parentheses", "Roman to Integer",
        "String to Integer (atoi)", "Count Number of Substrings", "Longest Palindromic Substring",
        "Sum of Beauty of All Substrings", "Reverse Every Word in a String",
      ]},
    ]
  },
  {
    step: 'Step 6', name: 'Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]',
    sections: [
      { name: 'Learn 1D LinkedList', problems: [
        "Introduction to Singly LinkedList", "Insertion at the Head of LL", "Deletion of the Head of LL",
        "Find the Length of LinkedList", "Search in LinkedList",
      ]},
      { name: 'Learn Doubly LinkedList', problems: [
        "Introduction to Doubly LL", "Insert Node Before Head in DLL", "Delete Head of DLL",
        "Reverse a Doubly LinkedList",
      ]},
      { name: 'Medium Problems of LL', problems: [
        "Middle of a LinkedList (Tortoise-Hare)", "Reverse a LinkedList (Iterative)", "Reverse a LinkedList (Recursive)",
        "Detect a Loop in LL", "Find the Starting Point of Loop", "Length of Loop in LL",
        "Check if LL is Palindrome", "Segregate Odd and Even Nodes", "Remove Nth Node from Back",
        "Delete the Middle Node of LL", "Sort LinkedList", "Sort LinkedList of 0s, 1s and 2s",
        "Find Intersection Point of Y LinkedList", "Add One to Number Represented by LL", "Add Two Numbers in LinkedList",
      ]},
      { name: 'Medium Problems of DLL', problems: [
        "Delete All Occurrences of a Key in DLL", "Find Pairs with Given Sum in DLL", "Remove Duplicates from Sorted DLL",
      ]},
      { name: 'Hard Problems of LL', problems: [
        "Reverse LL in Groups of Size K", "Rotate a LinkedList", "Flattening of LinkedList",
        "Clone LL with Random and Next Pointer",
      ]},
    ]
  },
  {
    step: 'Step 7', name: 'Recursion [PatternWise]',
    sections: [
      { name: 'Get a Strong Hold', problems: [
        "Recursive Implementation of atoi()", "Pow(x, n)", "Count Good Numbers",
        "Sort a Stack using Recursion", "Reverse a Stack using Recursion",
      ]},
      { name: 'Subsequences Pattern', problems: [
        "Generate Binary Strings Without Consecutive 1s", "Generate Parentheses", "Power Set",
        "Learn All Patterns of Subsequences (Theory)", "Count All Subsequences with Sum K",
        "Check if Subsequence with Sum K Exists", "Combination Sum", "Combination Sum II",
        "Subsets I", "Subsets II", "Combination Sum III", "Letter Combinations of a Phone Number",
      ]},
      { name: 'Trying out all Combos / Hard', problems: [
        "Palindrome Partitioning", "Word Search", "N-Queen", "Rat in a Maze",
        "Word Break", "M-Coloring Problem", "Sudoku Solver", "Expression Add Operators",
      ]},
    ]
  },
  {
    step: 'Step 8', name: 'Bit Manipulation [Concepts & Problems]',
    sections: [
      { name: 'Learn Bit Manipulation', problems: [
        "Introduction to Bits and Tricks", "Check if i-th Bit is Set", "Check if Number is Odd",
        "Check if Number is Power of 2", "Count the Number of Set Bits", "Set/Unset the Rightmost Unset Bit",
        "Swap Two Numbers", "Divide Two Numbers Without Multiply/Divide",
      ]},
      { name: 'Interview Problems', problems: [
        "Minimum Bit Flips to Convert Number", "Single Number I", "Power Set (Bit Manipulation)",
        "XOR of Numbers in a Given Range", "Single Number III",
      ]},
      { name: 'Advanced Maths', problems: [
        "Print Prime Factors of a Number", "All Divisors of a Number", "Count Primes in Range L to R",
        "Prime Factorisation of a Number", "Power Function — Pow(x, n)",
      ]},
    ]
  },
  {
    step: 'Step 9', name: 'Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]',
    sections: [
      { name: 'Learning', problems: [
        "Implement Stack using Arrays", "Implement Queue using Arrays", "Implement Stack using Queue",
        "Implement Queue using Stack", "Implement Stack using LinkedList", "Implement Queue using LinkedList",
        "Balanced Parentheses", "Implement Min Stack",
      ]},
      { name: 'Prefix, Infix, Postfix Conversion', problems: [
        "Infix to Postfix Conversion", "Prefix to Infix Conversion", "Prefix to Postfix Conversion",
        "Postfix to Prefix Conversion", "Postfix to Infix Conversion", "Infix to Prefix Conversion",
      ]},
      { name: 'Monotonic Stack / Queue Problems', problems: [
        "Next Greater Element", "Next Greater Element II", "Next Smaller Element",
        "Number of Greater Elements to the Right", "Trapping Rainwater", "Sum of Subarray Minimums",
        "Asteroid Collision", "Sum of Subarray Ranges", "Remove K Digits",
        "Largest Rectangle in a Histogram", "Maximal Rectangles",
      ]},
      { name: 'Implementation Problems', problems: [
        "Sliding Window Maximum", "Stock Span Problem", "Celebrity Problem",
        "LRU Cache", "LFU Cache",
      ]},
    ]
  },
  {
    step: 'Step 10', name: 'Sliding Window & Two Pointer Combined Problems',
    sections: [
      { name: 'Medium Problems', problems: [
        "Longest Substring Without Repeating Characters", "Max Consecutive Ones III", "Fruit Into Baskets",
        "Longest Repeating Character Replacement", "Binary Subarrays With Sum", "Count Number of Nice Subarrays",
        "Number of Substrings Containing All Three Characters", "Maximum Points from Cards",
      ]},
      { name: 'Hard Problems', problems: [
        "Longest Substring with At Most K Distinct Characters", "Subarrays with K Different Integers",
        "Minimum Window Substring", "Minimum Window Subsequence",
      ]},
    ]
  },
  {
    step: 'Step 11', name: 'Heaps [Learning, Medium, Hard Problems]',
    sections: [
      { name: 'Learning', problems: [
        "Heaps (Theory)", "Implement Min Heap", "Check if Array Represents Min Heap",
        "Convert Min Heap to Max Heap",
      ]},
      { name: 'Medium Problems', problems: [
        "Kth Largest Element in an Array", "Kth Smallest Element in an Array", "Sort K-Sorted Array",
        "Merge K Sorted Lists", "Replace Elements by Their Rank", "Task Scheduler", "Hand of Straights",
      ]},
      { name: 'Hard Problems', problems: [
        "Design Twitter", "Minimum Cost to Connect Sticks", "Kth Largest Element in a Stream",
        "Maximum Sum Combination", "Find Median from Data Stream", "Top K Frequent Elements",
      ]},
    ]
  },
  {
    step: 'Step 12', name: 'Greedy Algorithms [Easy, Medium/Hard]',
    sections: [
      { name: 'Easy Problems', problems: [
        "Assign Cookies", "Fractional Knapsack", "Lemonade Change", "Valid Parenthesis Checker",
      ]},
      { name: 'Medium / Hard Problems', problems: [
        "N Meetings in One Room", "Jump Game I", "Jump Game II", "Minimum Platforms for Railway",
        "Job Sequencing Problem", "Candy", "Shortest Job First (SJF)",
        "LRU Page Replacement Algorithm", "Insert Interval", "Merge Intervals", "Non-overlapping Intervals",
      ]},
    ]
  },
  {
    step: 'Step 13', name: 'Binary Trees [Traversals, Medium and Hard Problems]',
    sections: [
      { name: 'Traversals', problems: [
        "Introduction to Trees", "Binary Tree Representation", "Pre/Post/Inorder in One Traversal",
        "Preorder Traversal", "Inorder Traversal", "Postorder Traversal", "Level Order Traversal",
        "Iterative Preorder Traversal", "Iterative Inorder Traversal", "Postorder Traversal using 2 Stacks",
        "Postorder Traversal using 1 Stack", "All Three Traversals in One Pass",
      ]},
      { name: 'Medium Problems', problems: [
        "Maximum Depth of Binary Tree", "Check for Balanced Binary Tree", "Diameter of Binary Tree",
        "Maximum Path Sum", "Check if Two Trees are Identical", "Zig-Zag / Spiral Traversal",
        "Boundary Traversal", "Vertical Order Traversal", "Top View of Binary Tree",
        "Bottom View of Binary Tree", "Right / Left View of Binary Tree", "Symmetric Binary Tree",
      ]},
      { name: 'Hard Problems', problems: [
        "Print Root to Leaf Path", "LCA in Binary Tree", "Maximum Width of Binary Tree",
        "Children Sum Property", "Print All Nodes at Distance K", "Minimum Time to Burn Tree",
        "Count Total Nodes in Complete BT", "Requirements to Construct Unique BT",
        "Construct BT from Preorder and Inorder", "Construct BT from Postorder and Inorder",
        "Serialize and Deserialize BT", "Morris Preorder Traversal", "Morris Inorder Traversal",
        "Flatten Binary Tree to LinkedList",
      ]},
    ]
  },
  {
    step: 'Step 14', name: 'Binary Search Trees [Concept and Problems]',
    sections: [
      { name: 'Concepts', problems: [
        "Introduction to BST", "Search in a BST", "Find Min/Max in BST",
      ]},
      { name: 'Practice Problems', problems: [
        "Floor and Ceil in a BST", "Floor in a Binary Search Tree", "Insert a Given Node in BST",
        "Delete a Node in BST", "Kth Smallest and Largest Element in BST", "Check if a Tree is a BST",
        "LCA in BST", "Construct a BST from Preorder Traversal", "Inorder Successor/Predecessor in BST",
        "Merge Two BSTs", "Two Sum in BST", "Correct BST with Two Nodes Swapped", "Largest BST in Binary Tree",
      ]},
    ]
  },
  {
    step: 'Step 15', name: 'Graphs [Concepts & Problems]',
    sections: [
      { name: 'Learning', problems: [
        "Introduction to Graph", "Graph Representation (C++)", "Graph Representation (Java)",
        "Connected Components", "Traversal Techniques (BFS)", "DFS Traversal",
      ]},
      { name: 'Problems on BFS / DFS', problems: [
        "Number of Provinces", "Connected Components in Matrix", "Rotten Oranges", "Flood Fill Algorithm",
        "Cycle Detection in Undirected Graph (BFS)", "Cycle Detection in Undirected Graph (DFS)",
        "Distance of Nearest Cell Having 1", "Surrounded Regions", "Number of Enclaves",
        "Word Ladder I", "Word Ladder II", "Number of Islands", "Bipartite Graph (DFS)",
        "Cycle Detection in Directed Graph (DFS)",
      ]},
      { name: 'Topo Sort and Problems', problems: [
        "Topological Sort (DFS)", "Kahn's Algorithm (BFS Topo Sort)", "Detect Cycle in Directed Graph (Topo)",
        "Course Schedule I", "Course Schedule II", "Find Eventual Safe States", "Alien Dictionary",
      ]},
      { name: 'Shortest Path Algorithms', problems: [
        "Shortest Path in Undirected Graph (Unit Weights)", "Shortest Path in DAG", "Dijkstra's Algorithm",
        "Why Priority Queue in Dijkstra's", "Shortest Distance in a Binary Maze", "Path with Minimum Effort",
        "Cheapest Flights Within K Stops", "Network Delay Time", "Number of Ways to Arrive at Destination",
        "Minimum Multiplications to Reach End", "Bellman-Ford Algorithm", "Floyd-Warshall Algorithm",
        "City with Smallest Number of Neighbours",
      ]},
      { name: 'MST / Disjoint Set and Problems', problems: [
        "MST Theory", "Prim's Algorithm", "Disjoint Set (Union by Rank & Path Compression)",
        "Find the MST Weight (Kruskal's)", "Number of Operations to Make Network Connected",
        "Most Stones Removed with Same Row or Column", "Accounts Merge", "Number of Islands II",
        "Making a Large Island", "Swim in Rising Water",
      ]},
      { name: 'Other Algorithms', problems: [
        "Bridges in Graph", "Articulation Point in Graph", "Kosaraju's Algorithm",
      ]},
    ]
  },
  {
    step: 'Step 16', name: 'Dynamic Programming [Patterns and Problems]',
    sections: [
      { name: 'Introduction to DP', problems: [
        "Introduction to DP (Memoization vs Tabulation)",
      ]},
      { name: '1D DP', problems: [
        "Climbing Stairs", "Frog Jump", "Frog Jump with K Distances",
        "Maximum Sum of Non-Adjacent Elements", "House Robber",
      ]},
      { name: '2D / 3D DP and DP on Grids', problems: [
        "Ninja's Training", "Grid Unique Paths", "Unique Paths II",
        "Minimum Falling Path Sum", "Triangle", "Ninja and His Friends",
      ]},
      { name: 'DP on Subsequences', problems: [
        "Subset Sum Equal to Target", "Partition Equal Subset Sum", "Partition Set into Two Subsets (Min Diff)",
        "Count Subsets with Sum K", "Count Partitions with Given Difference", "0/1 Knapsack",
        "Minimum Coins", "Target Sum", "Coin Change II", "Unbounded Knapsack", "Rod Cutting Problem",
      ]},
      { name: 'DP on Strings', problems: [
        "Longest Common Subsequence", "Print Longest Common Subsequence", "Longest Common Substring",
        "Longest Palindromic Subsequence", "Minimum Insertions to Make String Palindrome",
        "Minimum Insertions/Deletions to Convert String A to B", "Shortest Common Supersequence",
        "Distinct Subsequences", "Edit Distance", "Wildcard Matching",
      ]},
      { name: 'DP on Stocks', problems: [
        "Best Time to Buy and Sell Stock", "Buy and Sell Stock II", "Buy and Sell Stock III",
        "Buy and Sell Stock IV", "Buy and Sell Stock with Cooldown", "Buy and Sell Stock with Transaction Fee",
      ]},
      { name: 'DP on LIS', problems: [
        "Longest Increasing Subsequence", "Print Longest Increasing Subsequence", "LIS using Binary Search",
        "Largest Divisible Subset", "Longest String Chain", "Longest Bitonic Subsequence",
        "Number of Longest Increasing Subsequences",
      ]},
      { name: 'MCM DP / Partition DP', problems: [
        "Matrix Chain Multiplication", "MCM Bottom-Up", "Minimum Cost to Cut the Stick",
        "Burst Balloons", "Evaluate Boolean Expression to True", "Palindrome Partitioning II",
        "Partition Array for Maximum Sum",
      ]},
      { name: 'DP on Squares', problems: [
        "Maximum Rectangle Area with All 1s", "Count Square Submatrices with All 1s",
      ]},
    ]
  },
  {
    step: 'Step 17', name: 'Tries',
    sections: [
      { name: 'Theory', problems: [
        "Trie Implementation and Operations",
      ]},
      { name: 'Problems', problems: [
        "Trie II — Advanced Operations (count prefix)", "Longest Word with All Prefixes",
        "Number of Distinct Substrings in a String", "Bit Prerequisites for Trie Problems",
        "Maximum XOR of Two Numbers in an Array", "Maximum XOR With an Element From Array",
      ]},
    ]
  },
  {
    step: 'Step 18', name: 'Strings',
    sections: [
      { name: 'Hard Problems', problems: [
        "Minimum Bracket Reversals to Balance Expression", "Count and Say", "Hashing in Strings (Theory)",
        "Rabin-Karp Algorithm", "Z-Function", "KMP Algorithm / LPS Array",
        "Shortest Palindrome", "Longest Happy Prefix", "Count Palindromic Subsequences",
      ]},
    ]
  },
];

// Flatten every problem into one ordered list (index 0 .. N-1) with its step/section context
export const DSA_FLAT = (() => {
  const flat = [];
  for (const step of DSA_STEPS) {
    for (const section of step.sections) {
      for (const problem of section.problems) {
        flat.push({ step: step.step, stepName: step.name, section: section.name, problem });
      }
    }
  }
  return flat;
})();

// 474 problems total · 2 problems / study day → 237 study days (auto-computed)
export const TOTAL_DSA_PROBLEMS = DSA_FLAT.length;
export const TOTAL_DSA_DAYS_COMPUTED = Math.ceil(TOTAL_DSA_PROBLEMS / 2);

// ─────────────────────────────────────────
// UTILITY: Flatten all S1/S2/S3 into a single lecture array
// ─────────────────────────────────────────
function flattenSequence(sequence) {
  const lectures = [];
  for (const mod of sequence) {
    const total = mod.lectures.length;
    mod.lectures.forEach((lec, i) => {
      lectures.push({
        module: mod.module,
        source: mod.source,
        title: lec,
        color: mod.color,
        lectureNumInModule: i + 1,    // e.g. 5
        totalLecturesInModule: total,  // e.g. 34
      });
    });
  }
  return lectures;
}

export const S1_LECTURES = flattenSequence(S1_SEQUENCE);
export const S2_LECTURES = flattenSequence(S2_SEQUENCE);
export const S3_LECTURES = flattenSequence(S3_SEQUENCE);

// ─────────────────────────────────────────
// S5 — FAANG PREP TRACK
// Starts Day 61 when S3 ends and its 12:00–13:30 slot frees up.
// 6 modules · 140 lectures (Days 61–200)
// ─────────────────────────────────────────
export const S5_SEQUENCE = [
  {
    module: 'Statistics & Probability for ML Interviews',
    source: 'Self-Study / MIT OCW',
    color: '#DC2626',
    lectures: [
      'Bayes Theorem — intuition, derivation, and interview traps',
      'Maximum Likelihood Estimation — from first principles',
      'MAP Estimation vs MLE — regularisation as a prior',
      'Probability Distributions — Gaussian, Binomial, Poisson in ML',
      'Central Limit Theorem — why it matters for model evaluation',
      'Hypothesis Testing — p-values, Type I/II errors, power',
      'A/B Testing — sample size, early stopping, p-hacking dangers',
      'Confidence Intervals — construction and misinterpretation',
      "Correlation vs Causation — confounders, Simpson's Paradox",
      'Information Theory — entropy, cross-entropy, KL divergence',
      'Expected Value & Variance — linearity tricks for interviews',
      'Random Variables & Transformations — common patterns',
      'Markov Chains — stationary distribution and MCMC intuition',
      'Probability Puzzles — Monty Hall, Birthday, Coupon Collector',
      'Combinatorics for Probability — permutations, arrangements',
      'Joint, Marginal, Conditional Distributions — full derivations',
      'Covariance & Correlation Matrix — geometric interpretation',
      'Law of Large Numbers vs CLT — which guarantees what',
      'Statistical Power & Effect Size — designing reliable experiments',
      'Stats Interview Sprint — 20 top FAANG stat questions solved',
    ],
  },
  {
    module: 'Software System Design',
    source: 'Alex Xu — System Design Interview / Grokking SD',
    color: '#DC2626',
    lectures: [
      'System Design Framework — constraints, estimates, APIs, data model, components',
      'URL Shortener — hashing strategies, redirect flows, analytics counters',
      'Web Crawler — BFS vs DFS, politeness, dedup with Bloom filter',
      'Notification System — fan-out on write vs read, push/pull, at-least-once',
      'Rate Limiter — token bucket, leaky bucket, sliding window log',
      'Distributed Cache — consistent hashing, eviction policies, cache stampede',
      'Design Twitter / X — timeline fanout, celebrity problem, CDN for media',
      'Design YouTube — upload pipeline, adaptive bitrate, CDN, recommendation stub',
      'Design WhatsApp — WebSocket, message ordering, E2E encryption sketch',
      'Design Uber / Lyft — geospatial indexing, matching algorithm, surge pricing',
      'Design Google Docs — CRDT vs OT, operational transforms, presence',
      'Search Autocomplete — trie vs inverted index, top-k with heap',
      'Distributed Message Queue — Kafka deep dive, partitions, consumer groups',
      'Proximity Service / Yelp — geohash, quadtree, read-heavy caching',
      'SD Mock Interview — end-to-end 45-min design under time pressure',
    ],
  },
  {
    module: 'ML System Design',
    source: 'Chip Huyen — Designing Machine Learning Systems',
    color: '#DC2626',
    lectures: [
      'ML System Design Framework — framing, metrics, data, model, serving',
      'YouTube Video Recommendations — two-tower retrieval + ranking pipeline',
      'Instagram / TikTok Feed Ranking — multi-objective ranking, explore-exploit',
      'Google / Meta Ad Click-Through Rate Prediction — feature engineering, calibration',
      'Fraud Detection System — streaming features, class imbalance, concept drift',
      'Spam & Content Moderation — text + image ensemble, human-in-the-loop',
      'Search Ranking — learning-to-rank, LambdaMART, evaluation with NDCG',
      'Ride Demand Forecasting — spatio-temporal models, online learning',
      'LLM Serving Infrastructure — batching, KV cache, quantisation, vLLM',
      'RAG System at Scale — chunking strategies, vector DB, reranking, eval',
      'Real-Time Personalisation — feature store, low-latency inference, A/B',
      'Anomaly Detection Platform — unsupervised, threshold tuning, alert fatigue',
      'NLP Entity Recognition Pipeline — NER, confidence calibration, active learning',
      'Model Monitoring & Drift Detection — data drift, concept drift, triggers',
      'ML System Design Mock — FAANG-style 60-min end-to-end design session',
    ],
  },
  {
    module: 'ML Algorithms from Scratch in NumPy',
    source: 'Andrej Karpathy / Sebastian Raschka',
    color: '#DC2626',
    lectures: [
      'Backpropagation from Scratch — forward pass, chain rule, compute graph',
      'Autograd Engine — build micrograd: Value node, backward(), topo sort',
      'SGD, Momentum, RMSProp, Adam — implement all four, compare convergence',
      'Batch Normalisation — derive statistics, scale/shift, inference mode fix',
      'Dropout — inverted dropout, train vs test, why it prevents co-adaptation',
      'Convolutional Layer — im2col trick, stride, padding, backprop through conv',
      'Max Pooling Backprop — gradient routing through argmax positions',
      'LSTM Cell from Scratch — gates, hidden/cell state, vanishing gradient fix',
      'Attention Mechanism — dot-product attention, softmax stability, masking',
      'Multi-Head Attention — split heads, project Q/K/V, concatenate outputs',
      'Positional Encoding — sinusoidal, learned, ALiBi — implement and compare',
      'Transformer Encoder Block — MHA + FFN + LayerNorm + residual connections',
      'Transformer Decoder Block — masked self-attention, cross-attention, causal mask',
      'Byte-Pair Encoding Tokeniser — merge rules, vocabulary construction',
      "k-Means Clustering — Lloyd's algorithm, k-means++ init, elbow method",
      'PCA from Scratch — covariance matrix, eigen-decomposition, explained variance',
      'Logistic Regression + L1/L2 — gradient derivation, coordinate descent for L1',
      'Decision Tree — Gini impurity, information gain, recursive splitting',
      'Random Forest — bootstrap aggregation, feature subsampling, OOB error',
      'Gradient Boosting — additive model, residuals, shrinkage, XGBoost sketch',
      'SVM — hard-margin intuition, dual form, kernel trick, hinge loss subgradient',
      'K-Nearest Neighbours — KD-tree, ball tree, curse of dimensionality',
      'Naive Bayes — Gaussian NB derivation, Laplace smoothing for text',
      'Expectation-Maximisation — GMM, E-step/M-step, convergence proof sketch',
      'ML-from-Scratch Capstone — implement a mini neural net + train on MNIST end-to-end',
    ],
  },
  {
    module: 'LeetCode Hard — Pattern Mastery',
    source: 'LeetCode / NeetCode / Blind 75 Extended',
    color: '#DC2626',
    lectures: [
      // Hard DP (10)
      'Hard DP — Edit Distance and all string DP variants',
      'Hard DP — Burst Balloons (interval DP, reverse thinking)',
      'Hard DP — Regular Expression Matching (NFA simulation via DP)',
      'Hard DP — Wildcard Matching vs Regex — compare state machines',
      'Hard DP — Longest Increasing Subsequence in O(n log n) — patience sorting',
      'Hard DP — Palindrome Partitioning II — minimise cuts with DP + Manacher',
      'Hard DP — Scramble String — memoised recursion, interleaving strings',
      'Hard DP — Distinct Subsequences — counting with 2D DP',
      'Hard DP — Minimum Window to Sort — two-pass, monotonic stacks',
      'Hard DP — Digit DP — count numbers with constraints',
      // Hard Graph (10)
      'Hard Graph — Alien Dictionary (topological sort with cycle detection)',
      'Hard Graph — Critical Connections (Tarjan bridges, low-link values)',
      'Hard Graph — Minimum Cost to Connect All Points (Prim vs Kruskal)',
      'Hard Graph — Word Ladder II — BFS + backtrack for all shortest paths',
      'Hard Graph — Swim in Rising Water (Dijkstra on grid)',
      'Hard Graph — Max Flow — Ford-Fulkerson, Edmonds-Karp, min-cut duality',
      'Hard Graph — Shortest Path Visiting All Nodes (BFS + bitmask DP)',
      'Hard Graph — Reconstruct Itinerary (Hierholzer Eulerian path)',
      'Hard Graph — Bus Routes (BFS on hypergraph)',
      'Hard Graph — Number of Good Paths (DSU with sorted edges)',
      // Hard Tree (10)
      'Hard Tree — Serialize and Deserialize Binary Tree (preorder BFS encode)',
      'Hard Tree — Binary Tree Maximum Path Sum (any node to any node)',
      'Hard Tree — Count of Smaller Numbers After Self (merge sort / BIT)',
      'Hard Tree — Vertical Order Traversal (coordinate sort)',
      'Hard Tree — Binary Tree Cameras (greedy leaf-up DFS)',
      'Hard Tree — Find Median from Data Stream (two heaps)',
      'Hard Tree — LFU Cache (double hashmap, frequency list)',
      'Hard Tree — Range Sum Query Mutable (BIT / segment tree)',
      'Hard Tree — Sliding Window Maximum (monotonic deque)',
      'Hard Tree — K Closest Points — quickselect + heap comparison',
      // Hard Binary Search & Two Pointer (10)
      'Hard Binary Search — Median of Two Sorted Arrays (O(log min(n,m)))',
      'Hard Binary Search — Split Array Largest Sum (binary search on answer)',
      'Hard Binary Search — Capacity to Ship Packages in D Days',
      'Hard Binary Search — Kth Smallest in a Sorted Matrix',
      'Hard Binary Search — Find in Mountain Array (ternary search)',
      'Hard Two Pointer — Trapping Rain Water (two passes vs two pointer)',
      'Hard Two Pointer — Container With Most Water — prove greedy',
      'Hard Two Pointer — Minimum Window Substring (sliding window template)',
      'Hard Two Pointer — Longest Substring Without Repeating (hashmap window)',
      'Hard Two Pointer — Subarrays with K Different Integers (exact = atMost trick)',
      // Design Problems (10)
      'Design — LRU Cache (OrderedDict / doubly-linked list + hashmap)',
      'Design — LFU Cache (min-heap vs frequency doubly-linked list)',
      'Design — Design Twitter — follow/unfollow, getNewsFeed with heap',
      'Design — Implement Trie (prefix tree, insert, search, startsWith)',
      'Design — Word Search II (Trie + DFS backtrack on board)',
      'Design — Design In-Memory File System (hashmap of dirs/files)',
      'Design — Design Hit Counter (sliding window, circular buffer)',
      'Design — Snapshot Array (binary search on version list)',
      'Design — Design Search Autocomplete System (Trie + frequency sort)',
      'Design — Random Pick with Blacklist (mapping injective function)',
    ],
  },
  {
    module: 'Behavioral, HR & Company Research',
    source: 'Amazon Leadership Principles / STAR Method',
    color: '#DC2626',
    lectures: [
      'Amazon Leadership Principles — deep-dive all 16, map each to real stories',
      'STAR Method Masterclass — Situation, Task, Action, Result framework',
      'Tell Me About Yourself — structure, positioning, 90-second delivery',
      'Why This Company? — research framework, genuine motivation articulation',
      'Conflict Resolution Stories — disagreed with manager/team, resolution arc',
      'Failure Stories — failure, learning, and systemic fix (growth mindset signal)',
      'Ownership & Bias-for-Action Stories — proactive impact without permission',
      'Google Behavioral — Googleyness, collaboration, ambiguity handling',
      'Meta Behavioral — Move Fast, Impact, Collaboration under pressure',
      'Microsoft Behavioral — Growth Mindset, Customer Obsession, One Microsoft',
      'Salary Negotiation Masterclass — anchoring, BATNA, competing offer leverage',
      'Offer Evaluation — TC breakdown: base, bonus, RSU vesting, refreshers',
      'Resume & LinkedIn Optimisation for FAANG — keywords, impact metrics, ATS',
      'Mock Behavioral Interview — 45-minute recorded session with self-critique',
      'FAANG Full Mock — 2-hour: 1 DSA Hard + 1 ML SD + 1 Behavioral round',
    ],
  },
];

export const S5_LECTURES = flattenSequence(S5_SEQUENCE);
export const TOTAL_S5_DAYS = S5_LECTURES.length; // 140

// ─────────────────────────────────────────
// UTILITY: Get study day number (Mon–Sat only, Sunday = rest)
// Returns 1-indexed count of study days from startDate up to and including targetDate
// ─────────────────────────────────────────
export function getStudyDayNumber(targetDate = new Date()) {
  const start = new Date(BATCH_START_DATE);
  start.setHours(0, 0, 0, 0);
  const end = new Date(targetDate);
  end.setHours(0, 0, 0, 0);

  if (end < start) return 0;

  let count = 0;
  const d = new Date(start);
  while (d <= end) {
    if (d.getDay() !== 0) count++; // skip Sundays
    d.setDate(d.getDate() + 1);
  }
  return count;
}

export function isSunday(date = new Date()) {
  return new Date(date).getDay() === 0;
}

// Convert a study day number back to a calendar date
export function studyDayToDate(dayNum) {
  const start = new Date(BATCH_START_DATE);
  let count = 0;
  const d = new Date(start);
  while (true) {
    if (d.getDay() !== 0) {
      count++;
      if (count === dayNum) return new Date(d);
    }
    d.setDate(d.getDate() + 1);
    if (count > 400) break; // safety
  }
  return null;
}

// ─────────────────────────────────────────
// UTILITY: Get the schedule for a given study day number
// ─────────────────────────────────────────
export function getScheduleForDay(dayNum) {
  if (dayNum <= 0) return null;

  // S1 — GenAI
  const s1Idx = dayNum - 1;
  const s1Lecture = s1Idx < S1_LECTURES.length
    ? S1_LECTURES[s1Idx]
    : { module: 'Advanced Projects & LLMOps', source: 'Self-Study', title: 'Build and deploy a production GenAI application', color: '#7C3AED' };

  // S2 — Deep Learning
  const s2Idx = dayNum - 1;
  const s2Lecture = s2Idx < S2_LECTURES.length
    ? S2_LECTURES[s2Idx]
    : { module: 'DL Research & Capstone', source: 'Self-Study', title: 'Implement a research paper from scratch', color: '#0369A1' };

  // S3 — Software Engineering
  const s3Idx = dayNum - 1;
  const s3Lecture = s3Idx < S3_LECTURES.length
    ? S3_LECTURES[s3Idx]
    : { module: 'MLOps & System Design', source: 'Self-Study', title: 'End-to-end MLOps pipeline and system design practice', color: '#047857' };

  // S4 — DSA: 2 problems per day from flattened step list
  const s4Info = getDsaForDay(dayNum);

  // S5 — FAANG Prep: locked until Day 61 (S3 slot freed)
  let s5Info;
  if (dayNum < S5_START_DAY) {
    s5Info = { locked: true, unlocksAt: S5_START_DAY, module: 'FAANG Prep', title: `Unlocks on Day ${S5_START_DAY}`, color: '#DC2626' };
  } else {
    const s5Idx = dayNum - S5_START_DAY; // 0-based index into S5_LECTURES
    s5Info = s5Idx < S5_LECTURES.length
      ? S5_LECTURES[s5Idx]
      : { module: 'FAANG Prep Complete', source: 'Self-Study', title: 'Mock interviews and continued practice', color: '#DC2626' };
  }

  return {
    S1: s1Lecture,
    S2: s2Lecture,
    S3: s3Lecture,
    S4: s4Info,
    S5: s5Info,
    dayNum,
  };
}

function getDsaForDay(dayNum) {
  // 2 problems per day. Each study day maps to 2 consecutive problems in DSA_FLAT.
  const problemsPerDay = 2;
  const total = DSA_FLAT.length;
  const gi = (dayNum - 1) * problemsPerDay; // 0-indexed start in the flat list

  const p1 = DSA_FLAT[Math.min(gi, total - 1)];
  const p2 = DSA_FLAT[gi + 1]; // may be undefined on the final odd day

  const problemNumber = Math.min(gi + 1, total);
  const problemNumberEnd = Math.min(gi + problemsPerDay, total);

  // Title: today's 1–2 problem names
  const title = p2 && p2.section === p1.section
    ? `${p1.problem} + ${p2.problem}`
    : p2
      ? `${p1.problem} + ${p2.problem}`
      : p1.problem;

  return {
    module: `${p1.step} — ${p1.stepName} · ${p1.section}`,
    source: 'Striver A2Z',
    title,
    color: '#B45309',
    problemRange: `Problems #${problemNumber}–${problemNumberEnd} of ${total}`,
    totalSolvedTarget: problemNumberEnd,
  };
}

// Total lecture counts
export const TOTAL_S1_DAYS = S1_LECTURES.length;  // ~186
export const TOTAL_S2_DAYS = S2_LECTURES.length;  // ~152
export const TOTAL_S3_DAYS = S3_LECTURES.length;  // 65 (8 modules from CampusX DSMP)
export const TOTAL_DSA_DAYS = TOTAL_DSA_DAYS_COMPUTED; // auto-computed from DSA_STEPS
// S5 runs Days 61–200 (140 lectures), effectively ending at day 200
export const TOTAL_S5_CALENDAR_DAYS = S5_START_DAY - 1 + TOTAL_S5_DAYS; // 60 + 140 = 200
export const TOTAL_BATCH_DAYS = Math.max(TOTAL_S1_DAYS, TOTAL_S2_DAYS, TOTAL_DSA_DAYS, TOTAL_S5_CALENDAR_DAYS);

// ─────────────────────────────────────────
// UTILITY: Lecture index + total for a given subject/day
// ─────────────────────────────────────────
export function getLectureIndex(subject, dayNum) {
  const idx = dayNum - 1; // 0-based
  if (subject === 'S1') return { index: idx, total: S1_LECTURES.length };
  if (subject === 'S2') return { index: idx, total: S2_LECTURES.length };
  if (subject === 'S3') return { index: idx, total: S3_LECTURES.length };
  if (subject === 'S5') {
    const s5Idx = dayNum - S5_START_DAY; // 0-based into S5_LECTURES
    return { index: s5Idx, total: S5_LECTURES.length, locked: dayNum < S5_START_DAY };
  }
  const start = idx * 2 + 1;
  return { index: idx, total: TOTAL_DSA_DAYS_COMPUTED, problemStart: start, problemEnd: start + 1 };
}

// ─────────────────────────────────────────
// UTILITY: Module-level progress for a subject
// completedDayNums = array of day_num values where that subject was marked done
// Returns null for S4 (DSA uses steps, not modules in the same way)
// ─────────────────────────────────────────
export function getModuleProgress(subject, completedDayNums) {
  const sequence = subject === 'S1' ? S1_SEQUENCE
    : subject === 'S2' ? S2_SEQUENCE
    : subject === 'S3' ? S3_SEQUENCE
    : subject === 'S5' ? S5_SEQUENCE
    : null;
  if (!sequence) return null;

  // For S5, day numbers are offset — convert to local 0-based index
  const normalizedDayNums = subject === 'S5'
    ? completedDayNums.map(d => d - S5_START_DAY + 1).filter(d => d >= 1)
    : completedDayNums;

  // Build flat map: lectureMap[flatIndex] = { modIdx, module, modSize }
  const lectureMap = [];
  sequence.forEach((mod, modIdx) => {
    mod.lectures.forEach(() => {
      lectureMap.push({ modIdx, module: mod, modSize: mod.lectures.length });
    });
  });

  // Count completions per module
  const moduleCounts = {};
  for (const dayNum of normalizedDayNums) {
    const idx = dayNum - 1;
    if (idx >= 0 && idx < lectureMap.length) {
      const { modIdx } = lectureMap[idx];
      moduleCounts[modIdx] = (moduleCounts[modIdx] || 0) + 1;
    }
  }

  const maxCompletedIdx = normalizedDayNums.length > 0
    ? Math.max(...normalizedDayNums) - 1
    : -1;
  const currentModIdx = maxCompletedIdx >= 0 && maxCompletedIdx < lectureMap.length
    ? lectureMap[maxCompletedIdx].modIdx
    : 0;

  const currentMod = sequence[currentModIdx];
  const doneInCurrentMod = moduleCounts[currentModIdx] || 0;
  const totalInCurrentMod = currentMod.lectures.length;
  const isModuleComplete = doneInCurrentMod >= totalInCurrentMod;

  const completedModules = sequence
    .map((mod, idx) => ({ mod, done: moduleCounts[idx] || 0 }))
    .filter(({ mod, done }) => done >= mod.lectures.length)
    .map(({ mod }) => mod.module);

  return {
    currentModule: currentMod.module,
    doneInModule: doneInCurrentMod,
    totalInModule: totalInCurrentMod,
    isModuleComplete,
    completedModules,
    moduleIndex: currentModIdx,
    totalModules: sequence.length,
  };
}

// ─────────────────────────────────────────
// UTILITY: Where should you be by end of a given week?
// weekNumber is 1-indexed (week 1 = first 6 study days)
// ─────────────────────────────────────────
export function getWeekMilestone(subject, weekNumber) {
  const lectureTarget = weekNumber * 6; // 6 study days/week

  if (subject === 'S4') {
    return { subject, weekNumber, targetProblem: Math.min(lectureTarget * 2, TOTAL_DSA_PROBLEMS) };
  }

  if (subject === 'S5') {
    // S5 starts at calendar day 61; week target is in terms of S5-local lectures
    const s5Target = Math.max(0, lectureTarget - (S5_START_DAY - 1));
    if (s5Target <= 0) return { subject, weekNumber, locked: true, unlocksAt: S5_START_DAY };
    if (s5Target >= S5_LECTURES.length) {
      return { subject, weekNumber, targetModule: 'FAANG Prep Complete ✓', targetLectureTitle: S5_LECTURES[S5_LECTURES.length - 1]?.title, lectureNumber: S5_LECTURES.length };
    }
    const lec = S5_LECTURES[s5Target - 1];
    return { subject, weekNumber, targetModule: lec.module, targetLectureTitle: lec.title, lectureNumber: s5Target };
  }

  const sequence = subject === 'S1' ? S1_SEQUENCE
    : subject === 'S2' ? S2_SEQUENCE
    : S3_SEQUENCE;
  const lectures = subject === 'S1' ? S1_LECTURES
    : subject === 'S2' ? S2_LECTURES
    : S3_LECTURES;

  if (lectureTarget >= lectures.length) {
    return {
      subject, weekNumber,
      targetModule: subject === 'S3' ? 'S3 Complete ✓' : sequence[sequence.length - 1].module,
      targetLectureTitle: lectures[lectures.length - 1]?.title,
      lectureNumber: lectures.length,
    };
  }

  const lec = lectures[lectureTarget - 1];
  return {
    subject, weekNumber,
    targetModule: lec.module,
    targetLectureTitle: lec.title,
    lectureNumber: lectureTarget,
  };
}

// ─────────────────────────────────────────
// UTILITY: Where should you be by end of a given month?
// monthNumber is 1-indexed. ~26 study days per month (4.33 wks × 6)
// ─────────────────────────────────────────
export function getMonthMilestone(subject, monthNumber) {
  const lectureTarget = monthNumber * 26;

  if (subject === 'S4') {
    return { subject, monthNumber, targetProblem: Math.min(lectureTarget * 2, TOTAL_DSA_PROBLEMS) };
  }

  if (subject === 'S5') {
    const s5Target = Math.max(0, lectureTarget - (S5_START_DAY - 1));
    if (s5Target <= 0) return { subject, monthNumber, locked: true, unlocksAt: S5_START_DAY };
    if (s5Target >= S5_LECTURES.length) {
      return { subject, monthNumber, targetModule: 'FAANG Prep Complete ✓', lectureReached: S5_LECTURES.length };
    }
    const lec = S5_LECTURES[s5Target - 1];
    return { subject, monthNumber, targetModule: lec.module, lectureReached: s5Target };
  }

  const sequence = subject === 'S1' ? S1_SEQUENCE
    : subject === 'S2' ? S2_SEQUENCE
    : S3_SEQUENCE;
  const lectures = subject === 'S1' ? S1_LECTURES
    : subject === 'S2' ? S2_LECTURES
    : S3_LECTURES;

  if (lectureTarget >= lectures.length) {
    return {
      subject, monthNumber,
      targetModule: subject === 'S3' ? 'S3 Complete ✓' : sequence[sequence.length - 1].module,
      lectureReached: lectures.length,
    };
  }

  const lec = lectures[lectureTarget - 1];
  return {
    subject, monthNumber,
    targetModule: lec.module,
    lectureReached: lectureTarget,
  };
}

// ─────────────────────────────────────────
// UTILITY: Human-readable daily video count summary
// ─────────────────────────────────────────
export function getDailyVideoCount(dayNum) {
  const schedule = getScheduleForDay(dayNum);
  if (!schedule) return null;
  const items = [
    { subject: 'S1', label: 'Generative AI',       count: 1, detail: `Lecture ${dayNum} of ${TOTAL_S1_DAYS}` },
    { subject: 'S2', label: 'Deep Learning',        count: 1, detail: `Lecture ${dayNum} of ${TOTAL_S2_DAYS}` },
    { subject: 'S3', label: 'DS & ML Foundation',   count: 1, detail: `Lecture ${dayNum} of ${TOTAL_S3_DAYS}` },
    { subject: 'S4', label: 'DSA Problems',         count: 2, detail: schedule.S4.problemRange },
  ];
  if (dayNum >= S5_START_DAY) {
    const s5LecNum = dayNum - S5_START_DAY + 1;
    items.push({ subject: 'S5', label: 'FAANG Prep', count: 1, detail: `Lecture ${s5LecNum} of ${TOTAL_S5_DAYS}` });
  }
  return items;
}
