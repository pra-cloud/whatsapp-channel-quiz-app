export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  iconType: string;
  color: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  topic: string;
  category: string; // matches Category.id
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: Question[];
  iconType: string;
};

export const categories: Category[] = [
  { id: 'devops', name: 'DevOps', description: 'CI/CD, containers, Linux, and infrastructure automation', iconType: 'terminal', color: '#10b981' },
  { id: 'cloud', name: 'Cloud', description: 'AWS services, architecture, networking, and Kubernetes', iconType: 'cloud', color: '#3b82f6' },
  { id: 'ai', name: 'AI', description: 'LLMs, prompt engineering, RAG, and machine learning', iconType: 'brain', color: '#8b5cf6' },
];

export const quizzes: Quiz[] = [
  // DevOps Fundamentals – Fresh Questions
  {
    id: "weekend-devops-01",
    title: "DevOps Fundamentals",
    description: "New set of questions to test your DevOps knowledge.",
    topic: "DevOps",
    category: "devops",
    difficulty: "Beginner",
    iconType: "terminal",
    questions: [
      { id: "ndq1", text: "What does 'Infrastructure as Code' (IaC) primarily enable?", options: ["Manual server provisioning", "Automated, version‑controlled resource creation", "Dynamic DNS updates", "Real‑time log aggregation"], correctAnswerIndex: 1, explanation: "IaC lets you define infrastructure in code and apply it automatically, ensuring repeatable environments." },
      { id: "ndq2", text: "Which Git branching model encourages short‑lived feature branches and frequent merges to main?", options: ["GitFlow", "GitHub Flow", "Trunk‑Based Development", "Feature‑Toggle Model"], correctAnswerIndex: 2, explanation: "Trunk‑Based Development uses short‑lived branches that merge back quickly to the main line." },
      { id: "ndq3", text: "In CI/CD, what is the purpose of a 'artifact'?,", options: ["The source code repository", "A compiled binary or package produced by the build", "A Docker image tag", "A set of environment variables"], correctAnswerIndex: 1, explanation: "Artifacts are the outputs of a build step that later stages (like deployment) consume." },
      { id: "ndq4", text: "Which tool is commonly used for container orchestration?", options: ["Docker Compose", "Kubernetes", "Ansible", "Vagrant"], correctAnswerIndex: 1, explanation: "Kubernetes is the de‑facto standard for orchestrating containers across clusters." },
      { id: "ndq5", text: "What is a 'pipeline' in the context of CI/CD?", options: ["A network routing path", "A series of automated steps from code commit to deployment", "A physical data cable", "A version‑control hook"], correctAnswerIndex: 1, explanation: "A pipeline automates the flow of code through build, test, and deployment stages." },
      { id: "ndq6", text: "Which command shows the history of commits in a Git repository?", options: ["git log", "git status", "git diff", "git checkout"], correctAnswerIndex: 0, explanation: "'git log' displays a list of commits with details." },
      { id: "ndq7", text: "What is the main benefit of 'blue‑green deployment'?", options: ["Zero‑downtime releases by swapping traffic", "Automatic rollback on failure", "Better code readability", "Reduced storage cost"], correctAnswerIndex: 0, explanation: "Blue‑green lets you run two identical environments and switch traffic instantly, minimizing downtime." },
      { id: "ndq8", text: "Which of these is a popular IaC tool for cloud resources?", options: ["Terraform", "Webpack", "Jest", "Babel"], correctAnswerIndex: 0, explanation: "Terraform enables declarative provisioning of cloud infrastructure." },
      { id: "ndq9", text: "What does the 'shift‑left' approach emphasize?", options: ["Early testing and security", "Moving servers physically left", "Increasing network bandwidth", "Deploying to the leftmost data center"], correctAnswerIndex: 0, explanation: "Shift‑left means performing quality checks earlier in the development cycle." },
      { id: "ndq10", text: "In Docker, what does the 'EXPOSE' instruction do?", options: ["Publishes a port at runtime", "Documents which port the container listens on", "Opens a firewall rule", "Creates a network bridge"], correctAnswerIndex: 1, explanation: "EXPOSE is documentation for the intended listening port; publishing requires '-p' at run time." }
    ]
  },
  // AWS Cloud Basics – Fresh Questions
  {
    id: "weekend-cloud-01",
    title: "AWS Cloud Basics",
    description: "New Cloud quiz to assess foundational AWS knowledge.",
    topic: "Cloud",
    category: "cloud",
    difficulty: "Beginner",
    iconType: "cloud",
    questions: [
      { id: "ncq1", text: "Which AWS service provides object storage for files and backups?", options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon VPC"], correctAnswerIndex: 1, explanation: "S3 (Simple Storage Service) is AWS's scalable object storage solution." },
      { id: "ncq2", text: "What does 'serverless' mean in AWS Lambda?", options: ["You manage the underlying servers", "You only manage the code and AWS handles the servers", "It runs only on local machines", "It requires a dedicated VM"], correctAnswerIndex: 1, explanation: "Lambda abstracts away server provisioning; you only upload code." },
      { id: "ncq3", text: "Which AWS service offers a managed relational database?", options: ["Amazon DynamoDB", "Amazon RDS", "Amazon S3", "Amazon CloudFront"], correctAnswerIndex: 1, explanation: "RDS runs MySQL, PostgreSQL, Oracle, and more as managed services." },
      { id: "ncq4", text: "What does EC2 stand for?", options: ["Elastic Compute Cloud", "Enterprise Compute Cluster", "Elastic Container Service", "Elastic Cloud Compute"], correctAnswerIndex: 0, explanation: "EC2 = Elastic Compute Cloud, providing resizable virtual servers." },
      { id: "ncq5", text: "Which service routes DNS queries for domain names?", options: ["Amazon Route 53", "Amazon CloudWatch", "Amazon IAM", "Amazon SQS"], correctAnswerIndex: 0, explanation: "Route 53 is AWS's DNS and domain registration service." },
      { id: "ncq6", text: "What is a VPC in AWS?", options: ["Virtual Private Cloud – an isolated network", "Virtual Processing Core", "Very Private Container", "Virtual Public Cloud"], correctAnswerIndex: 0, explanation: "A VPC isolates a set of AWS resources within a virtual network you define." },
      { id: "ncq7", text: "What does an Elastic Load Balancer (ELB) do?", options: ["Store data backups", "Distribute incoming traffic across multiple targets", "Encrypt data at rest", "Monitor application logs"], correctAnswerIndex: 1, explanation: "ELB balances traffic among EC2 instances, containers, or IP addresses." },
      { id: "ncq8", text: "Which AWS service is used for monitoring metrics and logs?", options: ["Amazon CloudWatch", "Amazon S3", "Amazon GuardDuty", "Amazon Athena"], correctAnswerIndex: 0, explanation: "CloudWatch collects metrics, logs, and events for AWS resources." },
      { id: "ncq9", text: "What is the purpose of a NAT Gateway?", options: ["Provide outbound internet access for private subnets", "Act as a firewall for public subnets", "Store encrypted keys", "Run serverless functions"], correctAnswerIndex: 0, explanation: "NAT Gateway lets instances in private subnets reach the internet without exposing them inbound." },
      { id: "ncq10", text: "What does 'multi‑AZ deployment' improve?", options: ["Cost reduction", "High availability across Availability Zones", "Faster network latency", "Simpler IAM policies"], correctAnswerIndex: 1, explanation: "Deploying across multiple AZs guards against zone‑level failures." }
    ]
  },
  // AI Intro – Fresh Questions
  {
    id: "weekend-ai-01",
    title: "Generative AI Intro",
    description: "New AI quiz covering fundamentals of large language models.",
    topic: "AI",
    category: "ai",
    difficulty: "Beginner",
    iconType: "brain",
    questions: [
      { id: "naq1", text: "What does LLM stand for?", options: ["Low‑Latency Memory", "Large Language Model", "Linear Logic Machine", "Live Learning Module"], correctAnswerIndex: 1, explanation: "LLM = Large Language Model, the class of models behind ChatGPT, Gemini, etc." },
      { id: "naq2", text: "Which of these is a generative AI model?", options: ["GPT‑4", "ResNet", "K‑Means", "BERT (as a classifier)"], correctAnswerIndex: 0, explanation: "GPT‑4 generates text, unlike classification‑only models." },
      { id: "naq3", text: "What is 'prompt engineering'?", options: ["Writing code to train an AI", "Designing hardware for AI", "Crafting effective inputs to guide model outputs", "Optimizing database queries"], correctAnswerIndex: 2, explanation: "Prompt engineering is the art of phrasing inputs to get desired model behavior." },
      { id: "naq4", text: "In the context of LLMs, what is a 'token'?", options: ["A cryptocurrency", "A piece of text (word, sub‑word, or character)", "A user authentication key", "A GPU core"], correctAnswerIndex: 1, explanation: "Tokens are the atomic text units the model processes." },
      { id: "naq5", text: "What is 'hallucination' in AI?", options: ["When the model generates plausible but false statements", "When the model crashes", "When the model produces images", "When the model fails to load"], correctAnswerIndex: 0, explanation: "Hallucination is when the model confidently fabricates information." },
      { id: "naq6", text: "Which company created ChatGPT?", options: ["Google", "Meta", "OpenAI", "Microsoft"], correctAnswerIndex: 2, explanation: "ChatGPT was developed by OpenAI." },
      { id: "naq7", text: "What does 'fine‑tuning' a model involve?", options: ["Adjusting monitor brightness", "Training a pre‑trained model further on domain‑specific data", "Deleting the model", "Compressing the model file"], correctAnswerIndex: 1, explanation: "Fine‑tuning adapts a large pre‑trained model to a specific task or dataset." },
      { id: "naq8", text: "What is Retrieval‑Augmented Generation (RAG)?", options: ["A random number generator", "Combining external knowledge retrieval with generation", "A type of GPU", "A new programming language"], correctAnswerIndex: 1, explanation: "RAG pulls relevant documents and feeds them to the LLM for more accurate answers." },
      { id: "naq9", text: "What does the 'temperature' parameter control?", options: ["GPU heat", "Randomness/creativity of model output", "Training speed", "Model size"], correctAnswerIndex: 1, explanation: "Higher temperature yields more diverse, creative responses." },
      { id: "naq10", text: "What is a 'system prompt' used for?", options: ["Restarting the AI", "Setting the AI's behavior and constraints", "Updating model weights", "Logging errors"], correctAnswerIndex: 1, explanation: "System prompts define the role, tone, and rules for the model during a conversation." }
    ]
  },
  // Docker Mastery – Fresh Questions
  {
    id: "weekend-docker-01",
    title: "Docker Mastery",
    description: "Updated Docker quiz covering containers and image concepts.",
    topic: "DevOps",
    category: "devops",
    difficulty: "Intermediate",
    iconType: "terminal",
    questions: [
      { id: "ndk1", text: "What is the difference between a Docker image and a container?", options: ["They are the same thing", "An image is a blueprint; a container is a running instance", "A container is a blueprint; an image is a running instance", "Images run on Windows only"], correctAnswerIndex: 1, explanation: "An image is a read‑only template; a container is a live instance of that image." },
      { id: "ndk2", text: "Which command lists all running containers?", options: ["docker images", "docker ps", "docker list", "docker run"], correctAnswerIndex: 1, explanation: "'docker ps' shows active containers; add '-a' for all containers." },
      { id: "ndk3", text: "What is Docker Compose used for?", options: ["Writing music for Docker", "Defining and running multi‑container applications", "Compressing Docker images", "Compiling Dockerfiles"], correctAnswerIndex: 1, explanation: "Compose lets you declare multiple services in a yaml file and manage them together." },
      { id: "ndk4", text: "What does the 'EXPOSE' instruction do in a Dockerfile?", options: ["Opens a port on the host", "Documents which port the container listens on", "Exposes environment variables", "Makes the container publicly accessible"], correctAnswerIndex: 1, explanation: "EXPOSE is documentation; actual publishing uses '-p' when running the container." },
      { id: "ndk5", text: "What is a Docker volume primarily used for?", options: ["Increasing CPU resources", "Persisting data beyond the container's lifecycle", "Controlling audio volume", "Limiting network bandwidth"], correctAnswerIndex: 1, explanation: "Volumes store data outside the container so it survives restarts and removals." },
      { id: "ndk6", text: "What is the default network mode for Docker containers?", options: ["host", "none", "bridge", "overlay"], correctAnswerIndex: 2, explanation: "'bridge' creates an isolated network with NAT for containers." },
      { id: "ndk7", text: "Which command removes all stopped containers?", options: ["docker rm --all", "docker container prune", "docker delete stopped", "docker clean"], correctAnswerIndex: 1, explanation: "'docker container prune' safely deletes stopped containers." },
      { id: "ndk8", text: "What is a multi‑stage build in Docker?", options: ["Building multiple images simultaneously", "Using multiple FROM statements to produce a smaller final image", "Running containers in multiple stages", "A Docker Swarm feature"], correctAnswerIndex: 1, explanation: "Multi‑stage builds let you compile in one stage and copy only needed artifacts to a lean final image." },
      { id: "ndk9", text: "What does the CMD instruction specify?", options: ["A comment", "The default command that runs when the container starts", "A build step", "A push command"], correctAnswerIndex: 1, explanation: "CMD defines the runtime entrypoint, which can be overridden at 'docker run' time." },
      { id: "ndk10", text: "How does ADD differ from COPY in a Dockerfile?", options: ["They are identical", "COPY only copies files; ADD can also extract archives and download URLs", "ADD only copies files; COPY can extract archives", "COPY is deprecated"], correctAnswerIndex: 1, explanation: "ADD has extra capabilities (auto‑extract tar, fetch URLs) while COPY is preferred for simple copies." }
    ]
  },
  // Kubernetes Essentials – Fresh Questions
  {
    id: "weekend-k8s-01",
    title: "Kubernetes Essentials",
    description: "New Kubernetes quiz focusing on core concepts.",
    topic: "Cloud",
    category: "cloud",
    difficulty: "Advanced",
    iconType: "cloud",
    questions: [
      { id: "nkq1", text: "What is the smallest deployable unit in Kubernetes?", options: ["Container", "Node", "Pod", "Service"], correctAnswerIndex: 2, explanation: "A Pod groups one or more containers that share networking and storage." },
      { id: "nkq2", text: "What does 'kubectl apply -f' do?", options: ["Deletes a resource", "Creates or updates resources defined in a YAML/JSON file", "Fetches pod logs", "Scales a deployment"], correctAnswerIndex: 1, explanation: "'apply' is declarative: it creates the resource if missing or updates it otherwise." },
      { id: "nkq3", text: "What is a Kubernetes Service?", options: ["A paid support plan", "An abstraction that defines a stable network endpoint for a set of Pods", "A type of container", "A monitoring tool"], correctAnswerIndex: 1, explanation: "Services provide a consistent IP/DNS for accessing Pods regardless of their lifecycle." },
      { id: "nkq4", text: "What is a Namespace used for?", options: ["Dividing cluster resources between teams or projects", "A DNS name for the cluster", "A container image registry", "A storage volume type"], correctAnswerIndex: 0, explanation: "Namespaces isolate resources, enabling multi‑tenant clusters." },
      { id: "nkq5", text: "What does a ReplicaSet ensure?", options: ["Database replication", "A specified number of Pod replicas are running", "Backup of the cluster", "Copy of the container image"], correctAnswerIndex: 1, explanation: "ReplicaSets maintain the desired number of identical Pods." },
      { id: "nkq6", text: "What is a Deployment in Kubernetes?", options: ["Pushing code to GitHub", "A higher‑level abstraction that manages ReplicaSets and provides rolling updates", "Installing Kubernetes", "A CI/CD pipeline stage"], correctAnswerIndex: 1, explanation: "Deployments simplify updates, rollbacks, and scaling of applications." },
      { id: "nkq7", text: "What is an Ingress resource?", options: ["A type of Pod", "An API object that manages external HTTP/HTTPS access to Services", "A security policy", "A storage class"], correctAnswerIndex: 1, explanation: "Ingress defines routing rules and can terminate TLS for incoming traffic." },
      { id: "nkq8", text: "What does a ConfigMap store?", options: ["Cluster physical servers", "Non‑confidential configuration data as key‑value pairs", "Network routing tables", "Deployment strategies"], correctAnswerIndex: 1, explanation: "ConfigMaps decouple configuration from container images." },
      { id: "nkq9", text: "What role does etcd play in Kubernetes?", options: ["Load balancing", "Consistent key‑value store for cluster state", "Container runtime", "Network proxy"], correctAnswerIndex: 1, explanation: "etcd is the source of truth for all cluster configuration and state." },
      { id: "nkq10", text: "What does a DaemonSet ensure?", options: ["Background processes on the host", "A copy of a Pod runs on every (or selected) node", "A group of services", "A type of volume"], correctAnswerIndex: 1, explanation: "DaemonSets are ideal for node‑level agents like log collectors or monitoring tools." }
    ]
  }
];
