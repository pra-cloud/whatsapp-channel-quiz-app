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
  {
    id: "weekend-devops-01",
    title: "DevOps Fundamentals",
    description: "Test your knowledge on CI/CD, containers, and infrastructure as code.",
    topic: "DevOps",
    category: "devops",
    difficulty: "Beginner",
    iconType: "terminal",
    questions: [
      {
        id: "dq1",
        text: "Which of the following is NOT a core principle of DevOps?",
        options: [
          "Continuous Integration",
          "Siloed Development and Operations",
          "Infrastructure as Code",
          "Continuous Delivery"
        ],
        correctAnswerIndex: 1,
        explanation: "DevOps specifically aims to break down silos between development and operations teams. Siloed work is the opposite of what DevOps promotes."
      },
      {
        id: "dq2",
        text: "What is the primary purpose of a container registry?",
        options: [
          "To host web applications",
          "To store and distribute container images",
          "To orchestrate container deployment",
          "To monitor container performance"
        ],
        correctAnswerIndex: 1,
        explanation: "A container registry (like Docker Hub, ECR, GCR) stores and distributes container images so they can be pulled and run on any environment."
      },
      {
        id: "dq3",
        text: "In Git, what command is used to combine changes from one branch to another?",
        options: ["git commit", "git push", "git merge", "git fetch"],
        correctAnswerIndex: 2,
        explanation: "'git merge' combines changes from one branch into another. 'git fetch' only downloads changes without merging them."
      },
      {
        id: "dq4",
        text: "What does CI/CD stand for?",
        options: [
          "Code Integration / Code Delivery",
          "Continuous Integration / Continuous Delivery",
          "Container Integration / Container Deployment",
          "Cloud Integration / Cloud Delivery"
        ],
        correctAnswerIndex: 1,
        explanation: "CI/CD stands for Continuous Integration / Continuous Delivery (or Deployment). It automates the build, test, and deployment pipeline."
      },
      {
        id: "dq5",
        text: "Which tool is commonly used for Infrastructure as Code (IaC)?",
        options: ["Photoshop", "Terraform", "Slack", "Zoom"],
        correctAnswerIndex: 1,
        explanation: "Terraform by HashiCorp is one of the most popular IaC tools. It lets you define infrastructure in declarative config files."
      },
      {
        id: "dq6",
        text: "What is a 'pipeline' in CI/CD?",
        options: [
          "A physical data cable",
          "An automated sequence of steps to build, test, and deploy code",
          "A type of database",
          "A network protocol"
        ],
        correctAnswerIndex: 1,
        explanation: "A CI/CD pipeline is an automated workflow that takes code from commit to production through stages like build, test, and deploy."
      },
      {
        id: "dq7",
        text: "Which of these is a popular CI/CD tool?",
        options: ["Microsoft Word", "Jenkins", "Adobe Illustrator", "VLC Player"],
        correctAnswerIndex: 1,
        explanation: "Jenkins is one of the most widely used open-source CI/CD automation servers. Other popular tools include GitHub Actions, GitLab CI, and CircleCI."
      },
      {
        id: "dq8",
        text: "What does 'shifting left' mean in DevOps?",
        options: [
          "Moving servers to the left rack",
          "Performing testing and security checks earlier in the development lifecycle",
          "Using left-handed keyboards",
          "Deploying to the left region"
        ],
        correctAnswerIndex: 1,
        explanation: "'Shift left' means moving testing, security, and quality checks earlier in the SDLC, catching issues before they reach production."
      },
      {
        id: "dq9",
        text: "What is the purpose of a Dockerfile?",
        options: [
          "To write documentation",
          "To define the steps to build a Docker container image",
          "To store Docker passwords",
          "To monitor Docker containers"
        ],
        correctAnswerIndex: 1,
        explanation: "A Dockerfile contains instructions (FROM, RUN, COPY, CMD, etc.) that Docker uses to build a container image layer by layer."
      },
      {
        id: "dq10",
        text: "What is 'blue-green deployment'?",
        options: [
          "Deploying code written in blue and green colors",
          "Running two identical production environments and switching traffic between them",
          "A type of testing framework",
          "A cloud provider name"
        ],
        correctAnswerIndex: 1,
        explanation: "Blue-green deployment maintains two identical environments. You deploy to the inactive one (green), test it, then switch traffic from blue to green for zero-downtime releases."
      }
    ]
  },
  {
    id: "weekend-cloud-01",
    title: "AWS Cloud Basics",
    description: "Are you familiar with core AWS services and cloud concepts?",
    topic: "Cloud",
    category: "cloud",
    difficulty: "Beginner",
    iconType: "cloud",
    questions: [
      {
        id: "cq1",
        text: "Which AWS service is used for highly scalable object storage?",
        options: ["Amazon EC2", "Amazon S3", "Amazon RDS", "Amazon VPC"],
        correctAnswerIndex: 1,
        explanation: "Amazon S3 (Simple Storage Service) provides highly scalable, durable object storage for files, images, backups, and more."
      },
      {
        id: "cq2",
        text: "What does 'Serverless' compute mean in the context of AWS Lambda?",
        options: [
          "There are physically no servers involved",
          "You manage the operating system yourself",
          "You don't provision or manage servers, only your code",
          "It only runs on local machines"
        ],
        correctAnswerIndex: 2,
        explanation: "Serverless means you write and upload code — AWS handles provisioning, scaling, and managing the servers. You only pay for execution time."
      },
      {
        id: "cq3",
        text: "Which service provides a managed relational database?",
        options: ["Amazon DynamoDB", "Amazon Redshift", "Amazon RDS", "Amazon SQS"],
        correctAnswerIndex: 2,
        explanation: "Amazon RDS (Relational Database Service) supports MySQL, PostgreSQL, MariaDB, Oracle, and SQL Server as managed relational databases."
      },
      {
        id: "cq4",
        text: "What does EC2 stand for?",
        options: [
          "Elastic Cloud Compute",
          "Elastic Compute Cloud",
          "Enhanced Cloud Computing",
          "Enterprise Container Cluster"
        ],
        correctAnswerIndex: 1,
        explanation: "EC2 stands for Elastic Compute Cloud. It provides resizable virtual servers (instances) in the cloud."
      },
      {
        id: "cq5",
        text: "Which AWS service is used to manage DNS and domain routing?",
        options: ["CloudFront", "Route 53", "API Gateway", "Elastic Load Balancer"],
        correctAnswerIndex: 1,
        explanation: "Amazon Route 53 is a scalable DNS web service for domain registration, DNS routing, and health checking."
      },
      {
        id: "cq6",
        text: "What is an AWS Region?",
        options: [
          "A single data center",
          "A geographical area with multiple isolated data center clusters (AZs)",
          "A type of EC2 instance",
          "A billing zone"
        ],
        correctAnswerIndex: 1,
        explanation: "An AWS Region is a physical location with multiple Availability Zones (AZs). Each AZ has one or more data centers for fault tolerance."
      },
      {
        id: "cq7",
        text: "Which service would you use to send notifications from AWS?",
        options: ["Amazon SES", "Amazon SNS", "Amazon SQS", "Amazon S3"],
        correctAnswerIndex: 1,
        explanation: "Amazon SNS (Simple Notification Service) sends push notifications, SMS, and emails. SES is for email specifically, and SQS is for message queues."
      },
      {
        id: "cq8",
        text: "What is the AWS Free Tier?",
        options: [
          "A paid premium subscription",
          "A set of services available for free within certain usage limits",
          "A type of EC2 instance",
          "An AWS certification level"
        ],
        correctAnswerIndex: 1,
        explanation: "The AWS Free Tier provides limited free usage of many AWS services for 12 months (or always-free for some services) to help beginners explore."
      },
      {
        id: "cq9",
        text: "Which AWS service provides a Content Delivery Network (CDN)?",
        options: ["ElastiCache", "CloudFront", "CloudWatch", "CloudTrail"],
        correctAnswerIndex: 1,
        explanation: "Amazon CloudFront is a CDN that distributes content globally via edge locations for low-latency delivery of websites, APIs, and videos."
      },
      {
        id: "cq10",
        text: "What is IAM in AWS?",
        options: [
          "Internet Access Manager",
          "Identity and Access Management",
          "Instance Allocation Module",
          "Integrated Application Monitoring"
        ],
        correctAnswerIndex: 1,
        explanation: "IAM (Identity and Access Management) lets you manage users, groups, roles, and permissions to securely control access to AWS resources."
      }
    ]
  },
  {
    id: "weekend-ai-01",
    title: "Generative AI Intro",
    description: "Explore the basics of LLMs, neural networks, and prompt engineering.",
    topic: "AI",
    category: "ai",
    difficulty: "Beginner",
    iconType: "brain",
    questions: [
      {
        id: "aq1",
        text: "What does LLM stand for?",
        options: [
          "Low Latency Module",
          "Large Language Model",
          "Logical Learning Machine",
          "Linear Logic Matrix"
        ],
        correctAnswerIndex: 1,
        explanation: "LLM stands for Large Language Model — AI models trained on massive text datasets to understand and generate human-like language (e.g., GPT-4, Claude, Gemini)."
      },
      {
        id: "aq2",
        text: "Which of the following is an example of a Generative AI model?",
        options: ["Linear Regression", "Decision Tree", "GPT-4", "K-Means Clustering"],
        correctAnswerIndex: 2,
        explanation: "GPT-4 is a generative AI model by OpenAI. Linear regression, decision trees, and K-Means are traditional ML algorithms, not generative."
      },
      {
        id: "aq3",
        text: "What is 'Prompt Engineering'?",
        options: [
          "Writing code to train an AI model",
          "Designing hardware for AI processing",
          "Crafting effective inputs to get desired outputs from an AI",
          "Optimizing database queries"
        ],
        correctAnswerIndex: 2,
        explanation: "Prompt engineering is the art of writing effective prompts (instructions) to get the best possible responses from AI models."
      },
      {
        id: "aq4",
        text: "What is a 'token' in the context of LLMs?",
        options: [
          "A cryptocurrency",
          "A piece of text (word, subword, or character) that the model processes",
          "A login credential",
          "A type of API key"
        ],
        correctAnswerIndex: 1,
        explanation: "In LLMs, a token is a chunk of text — roughly 4 characters or ¾ of a word in English. Models process text as sequences of tokens."
      },
      {
        id: "aq5",
        text: "What is 'hallucination' in AI?",
        options: [
          "When the AI sees images",
          "When the AI generates plausible but factually incorrect information",
          "When the AI crashes",
          "When the AI runs slowly"
        ],
        correctAnswerIndex: 1,
        explanation: "AI hallucination is when a model confidently generates information that sounds correct but is actually made up or inaccurate."
      },
      {
        id: "aq6",
        text: "Which company created ChatGPT?",
        options: ["Google", "Meta", "OpenAI", "Microsoft"],
        correctAnswerIndex: 2,
        explanation: "ChatGPT was created by OpenAI. Microsoft is an investor in OpenAI but didn't create it. Google has Gemini, and Meta has Llama."
      },
      {
        id: "aq7",
        text: "What does 'fine-tuning' an AI model mean?",
        options: [
          "Adjusting the monitor brightness",
          "Training a pre-trained model further on specific domain data",
          "Deleting the model",
          "Compressing the model file"
        ],
        correctAnswerIndex: 1,
        explanation: "Fine-tuning takes a pre-trained foundation model and trains it further on a specialized dataset to improve performance on specific tasks."
      },
      {
        id: "aq8",
        text: "What is RAG (Retrieval-Augmented Generation)?",
        options: [
          "A random number generator",
          "A technique that combines information retrieval with text generation",
          "A type of GPU",
          "A programming language"
        ],
        correctAnswerIndex: 1,
        explanation: "RAG retrieves relevant documents from a knowledge base and feeds them to the LLM as context, reducing hallucinations and providing up-to-date info."
      },
      {
        id: "aq9",
        text: "What is a 'neural network'?",
        options: [
          "A computer networking protocol",
          "A computing system inspired by the biological brain's structure",
          "A social media network for scientists",
          "A type of VPN"
        ],
        correctAnswerIndex: 1,
        explanation: "A neural network is a computing system with interconnected nodes (neurons) organized in layers, inspired by the human brain's structure."
      },
      {
        id: "aq10",
        text: "What is 'temperature' in AI model settings?",
        options: [
          "The physical heat of the GPU",
          "A parameter controlling randomness/creativity of outputs",
          "The speed of the model",
          "The size of the model"
        ],
        correctAnswerIndex: 1,
        explanation: "Temperature controls the randomness of AI outputs. Low temperature (0.1) = more deterministic/focused. High temperature (1.0) = more creative/diverse."
      }
    ]
  },
  {
    id: "weekend-docker-01",
    title: "Docker Mastery",
    description: "Containers, images, volumes, and Docker Compose — how well do you know Docker?",
    topic: "DevOps",
    category: "devops",
    difficulty: "Intermediate",
    iconType: "terminal",
    questions: [
      {
        id: "dkq1",
        text: "What is the difference between a Docker image and a container?",
        options: [
          "They are the same thing",
          "An image is a blueprint; a container is a running instance of that image",
          "A container is a blueprint; an image is a running instance",
          "Images run on Windows only; containers run on Linux only"
        ],
        correctAnswerIndex: 1,
        explanation: "A Docker image is a read-only template (blueprint). When you 'docker run' an image, it creates a container — a running, writable instance of that image."
      },
      {
        id: "dkq2",
        text: "Which command lists all running Docker containers?",
        options: ["docker images", "docker ps", "docker list", "docker run"],
        correctAnswerIndex: 1,
        explanation: "'docker ps' lists running containers. Use 'docker ps -a' to see all containers including stopped ones."
      },
      {
        id: "dkq3",
        text: "What is Docker Compose used for?",
        options: [
          "Writing music for Docker",
          "Defining and running multi-container Docker applications",
          "Compressing Docker images",
          "Composing Dockerfiles"
        ],
        correctAnswerIndex: 1,
        explanation: "Docker Compose uses a YAML file (docker-compose.yml) to define multi-container applications — databases, backends, frontends — and manage them as a single unit."
      },
      {
        id: "dkq4",
        text: "What is a Docker volume used for?",
        options: [
          "Increasing container CPU",
          "Persisting data beyond the container's lifecycle",
          "Controlling audio volume",
          "Limiting network bandwidth"
        ],
        correctAnswerIndex: 1,
        explanation: "Docker volumes persist data outside the container's filesystem. Without volumes, data is lost when a container is removed."
      },
      {
        id: "dkq5",
        text: "What does the 'EXPOSE' instruction do in a Dockerfile?",
        options: [
          "Opens a port on the host machine",
          "Documents which port the container listens on",
          "Exposes environment variables",
          "Makes the container publicly accessible"
        ],
        correctAnswerIndex: 1,
        explanation: "EXPOSE is documentation — it tells users which port the app listens on. It doesn't actually publish the port. Use '-p' flag with 'docker run' to publish."
      },
      {
        id: "dkq6",
        text: "What is the default Docker network mode?",
        options: ["host", "none", "bridge", "overlay"],
        correctAnswerIndex: 2,
        explanation: "The default network mode is 'bridge'. It creates an isolated network where containers can communicate with each other and the host via port mapping."
      },
      {
        id: "dkq7",
        text: "How do you remove all stopped Docker containers?",
        options: [
          "docker rm --all",
          "docker container prune",
          "docker delete stopped",
          "docker clean"
        ],
        correctAnswerIndex: 1,
        explanation: "'docker container prune' removes all stopped containers. 'docker system prune' goes further and also removes unused images, networks, and volumes."
      },
      {
        id: "dkq8",
        text: "What is a multi-stage build in Docker?",
        options: [
          "Building multiple Docker images simultaneously",
          "Using multiple FROM statements to create smaller final images",
          "Running containers in multiple stages",
          "A Docker Swarm feature"
        ],
        correctAnswerIndex: 1,
        explanation: "Multi-stage builds use multiple FROM statements. You build in one stage (with build tools) and copy only the output to a minimal final image, reducing size."
      },
      {
        id: "dkq9",
        text: "What is the CMD instruction in a Dockerfile?",
        options: [
          "A comment in the Dockerfile",
          "The default command that runs when the container starts",
          "A command to build the image",
          "A command to push the image"
        ],
        correctAnswerIndex: 1,
        explanation: "CMD specifies the default command to run when a container starts. It can be overridden at runtime. ENTRYPOINT is similar but harder to override."
      },
      {
        id: "dkq10",
        text: "What is the difference between COPY and ADD in a Dockerfile?",
        options: [
          "They are identical",
          "COPY only copies files; ADD can also extract archives and fetch URLs",
          "ADD only copies files; COPY can extract archives",
          "COPY is deprecated"
        ],
        correctAnswerIndex: 1,
        explanation: "COPY simply copies files/directories. ADD has extra features: it can auto-extract tar archives and download files from URLs. Best practice is to use COPY unless you need ADD's extras."
      }
    ]
  },
  {
    id: "weekend-k8s-01",
    title: "Kubernetes Essentials",
    description: "Pods, Services, Deployments — test your K8s knowledge.",
    topic: "Cloud",
    category: "cloud",
    difficulty: "Advanced",
    iconType: "cloud",
    questions: [
      {
        id: "kq1",
        text: "What is the smallest deployable unit in Kubernetes?",
        options: ["Container", "Node", "Pod", "Service"],
        correctAnswerIndex: 2,
        explanation: "A Pod is the smallest deployable unit in K8s. It can contain one or more containers that share network and storage resources."
      },
      {
        id: "kq2",
        text: "What does 'kubectl apply -f' do?",
        options: [
          "Deletes a resource",
          "Creates or updates resources defined in a YAML/JSON file",
          "Fetches logs from a pod",
          "Scales a deployment"
        ],
        correctAnswerIndex: 1,
        explanation: "'kubectl apply -f filename.yaml' creates the resource if it doesn't exist, or updates it if it does. It's the declarative way to manage K8s resources."
      },
      {
        id: "kq3",
        text: "What is a Kubernetes Service?",
        options: [
          "A paid support plan",
          "An abstraction that defines a logical set of Pods and a policy to access them",
          "A type of container",
          "A monitoring tool"
        ],
        correctAnswerIndex: 1,
        explanation: "A K8s Service provides a stable network endpoint (IP + DNS name) to access a group of Pods, even as Pods are created and destroyed."
      },
      {
        id: "kq4",
        text: "What is a Kubernetes Namespace?",
        options: [
          "A DNS name for the cluster",
          "A way to divide cluster resources between multiple users/teams",
          "A container image registry",
          "A type of storage volume"
        ],
        correctAnswerIndex: 1,
        explanation: "Namespaces provide virtual clusters within a physical cluster, allowing resource isolation and access control between teams or environments."
      },
      {
        id: "kq5",
        text: "What is a ReplicaSet in Kubernetes?",
        options: [
          "A database replication feature",
          "Ensures a specified number of Pod replicas are running at all times",
          "A backup of the cluster",
          "A copy of the container image"
        ],
        correctAnswerIndex: 1,
        explanation: "A ReplicaSet ensures that a specified number of identical Pods are running. If a Pod dies, it automatically creates a new one."
      },
      {
        id: "kq6",
        text: "What is a Kubernetes Deployment?",
        options: [
          "Pushing code to GitHub",
          "A higher-level abstraction that manages ReplicaSets and provides declarative updates",
          "Installing Kubernetes on a server",
          "A CI/CD pipeline stage"
        ],
        correctAnswerIndex: 1,
        explanation: "A Deployment manages ReplicaSets and provides declarative updates, rolling updates, and rollback capabilities for your application."
      },
      {
        id: "kq7",
        text: "What is an Ingress in Kubernetes?",
        options: [
          "A type of Pod",
          "An API object that manages external access to services, typically HTTP",
          "A security policy",
          "A storage class"
        ],
        correctAnswerIndex: 1,
        explanation: "An Ingress manages external HTTP/HTTPS access to services in a cluster. It provides SSL termination, name-based virtual hosting, and path-based routing."
      },
      {
        id: "kq8",
        text: "What is a ConfigMap in Kubernetes?",
        options: [
          "A map of the cluster's physical servers",
          "An object that stores non-confidential configuration data as key-value pairs",
          "A network routing table",
          "A deployment strategy"
        ],
        correctAnswerIndex: 1,
        explanation: "A ConfigMap stores non-sensitive configuration data (env vars, config files) separately from container images, making apps more portable."
      },
      {
        id: "kq9",
        text: "What is the role of etcd in Kubernetes?",
        options: [
          "Load balancing",
          "Consistent key-value store for all cluster data",
          "Container runtime",
          "Network proxy"
        ],
        correctAnswerIndex: 1,
        explanation: "etcd is a distributed key-value store that holds all cluster state and configuration data. It's the 'source of truth' for the entire cluster."
      },
      {
        id: "kq10",
        text: "What is a DaemonSet in Kubernetes?",
        options: [
          "A set of background processes on the host OS",
          "Ensures a copy of a Pod runs on all (or some) nodes in the cluster",
          "A group of services",
          "A type of volume"
        ],
        correctAnswerIndex: 1,
        explanation: "A DaemonSet ensures that a copy of a specific Pod runs on every node (or selected nodes). Common use cases: log collectors, monitoring agents."
      }
    ]
  },
  {
    id: "weekend-devops-03",
    title: "Advanced DevOps & Linux",
    description: "Master Linux commands, networking, security, and advanced DevOps practices.",
    topic: "DevOps",
    category: "devops",
    difficulty: "Advanced",
    iconType: "terminal",
    questions: [
      {
        id: "lq1",
        text: "What does the 'chmod 755' command do?",
        options: [
          "Deletes a file",
          "Sets read/write/execute for owner, read/execute for group and others",
          "Creates a new directory",
          "Changes file ownership"
        ],
        correctAnswerIndex: 1,
        explanation: "chmod 755 = owner gets rwx (7), group gets r-x (5), others get r-x (5). This is common for executable scripts and directories."
      },
      {
        id: "lq2",
        text: "What does the 'grep' command do?",
        options: [
          "Compiles code",
          "Searches for patterns in text/files",
          "Creates files",
          "Manages packages"
        ],
        correctAnswerIndex: 1,
        explanation: "grep (Global Regular Expression Print) searches for text patterns in files or command output. It's one of the most used Linux commands."
      },
      {
        id: "lq3",
        text: "What is the purpose of the '/etc/hosts' file?",
        options: [
          "Stores user passwords",
          "Maps hostnames to IP addresses locally",
          "Configures the firewall",
          "Lists installed packages"
        ],
        correctAnswerIndex: 1,
        explanation: "/etc/hosts maps hostnames to IP addresses locally, bypassing DNS. It's checked before DNS servers and is useful for local development and testing."
      },
      {
        id: "lq4",
        text: "What is SSH used for?",
        options: [
          "Sending emails",
          "Securely connecting to remote servers over an encrypted connection",
          "Browsing the web",
          "Compressing files"
        ],
        correctAnswerIndex: 1,
        explanation: "SSH (Secure Shell) provides encrypted remote login and command execution. It's the standard way to manage Linux servers remotely."
      },
      {
        id: "lq5",
        text: "What does the 'ps aux' command show?",
        options: [
          "Disk usage",
          "All running processes on the system",
          "Network connections",
          "System logs"
        ],
        correctAnswerIndex: 1,
        explanation: "'ps aux' displays all running processes with details like PID, CPU%, memory%, user, and command. It's essential for process debugging."
      },
      {
        id: "lq6",
        text: "What port does HTTPS use by default?",
        options: ["80", "22", "443", "8080"],
        correctAnswerIndex: 2,
        explanation: "HTTPS uses port 443 by default. HTTP uses port 80, SSH uses port 22, and 8080 is a common alternative HTTP port."
      },
      {
        id: "lq7",
        text: "What is the purpose of a reverse proxy?",
        options: [
          "To browse the internet anonymously",
          "To receive client requests and forward them to backend servers",
          "To block all incoming traffic",
          "To encrypt hard drives"
        ],
        correctAnswerIndex: 1,
        explanation: "A reverse proxy (like Nginx, HAProxy) sits in front of backend servers, handling load balancing, SSL termination, caching, and security."
      },
      {
        id: "lq8",
        text: "What does 'sudo' stand for?",
        options: [
          "Super User Delete Operation",
          "Super User Do",
          "System Utility for Disk Operations",
          "Secure User Domain"
        ],
        correctAnswerIndex: 1,
        explanation: "'sudo' stands for 'Super User Do'. It allows a permitted user to execute commands as the superuser (root) or another user."
      },
      {
        id: "lq9",
        text: "What is a CIDR block (e.g., 10.0.0.0/16)?",
        options: [
          "A type of encryption",
          "A way to specify a range of IP addresses",
          "A container image format",
          "A Linux distribution"
        ],
        correctAnswerIndex: 1,
        explanation: "CIDR (Classless Inter-Domain Routing) notation like 10.0.0.0/16 specifies an IP range. /16 means the first 16 bits are fixed, giving 65,536 addresses."
      },
      {
        id: "lq10",
        text: "What does the 'curl' command do?",
        options: [
          "Curls text in the terminal",
          "Transfers data from or to a server using various protocols",
          "Manages user accounts",
          "Monitors system health"
        ],
        correctAnswerIndex: 1,
        explanation: "curl is a command-line tool for transferring data using HTTP, HTTPS, FTP, and more. It's essential for testing APIs and downloading files."
      }
    ]
  },
  {
    id: "weekend-cloud-02",
    title: "Cloud Architecture",
    description: "VPC, load balancing, auto-scaling, and cloud design patterns.",
    topic: "Cloud",
    category: "cloud",
    difficulty: "Intermediate",
    iconType: "cloud",
    questions: [
      { id: "ca1", text: "What is a VPC in AWS?", options: ["Virtual Private Cloud — an isolated network you define", "Virtual Processing Core", "Very Private Container", "Virtual Public Channel"], correctAnswerIndex: 0, explanation: "A VPC (Virtual Private Cloud) is a logically isolated section of AWS where you can launch resources in a virtual network you define." },
      { id: "ca2", text: "What is the purpose of an Elastic Load Balancer?", options: ["Store data", "Distribute incoming traffic across multiple targets", "Compress files", "Manage DNS"], correctAnswerIndex: 1, explanation: "An ELB automatically distributes incoming application traffic across multiple targets (EC2 instances, containers) for high availability." },
      { id: "ca3", text: "What is Auto Scaling in AWS?", options: ["Manually resizing servers", "Automatically adjusting the number of instances based on demand", "Scaling databases vertically", "A type of storage"], correctAnswerIndex: 1, explanation: "Auto Scaling automatically adjusts the number of EC2 instances up or down based on conditions you define, ensuring cost efficiency and availability." },
      { id: "ca4", text: "What is a Security Group in AWS?", options: ["A team of security engineers", "A virtual firewall that controls inbound/outbound traffic for instances", "An IAM policy", "A VPN connection"], correctAnswerIndex: 1, explanation: "A Security Group acts as a virtual firewall for EC2 instances, controlling inbound and outbound traffic based on rules you define." },
      { id: "ca5", text: "What is the difference between public and private subnets?", options: ["No difference", "Public subnets have internet access via an Internet Gateway; private subnets don't", "Private subnets are faster", "Public subnets are more secure"], correctAnswerIndex: 1, explanation: "Public subnets have a route to an Internet Gateway for internet access. Private subnets don't, keeping resources isolated from the internet." },
      { id: "ca6", text: "What is Amazon CloudWatch used for?", options: ["Watching videos", "Monitoring AWS resources and applications with metrics and logs", "Managing source code", "Container orchestration"], correctAnswerIndex: 1, explanation: "CloudWatch collects metrics, logs, and events from AWS resources, allowing you to set alarms, create dashboards, and trigger automated actions." },
      { id: "ca7", text: "What is a NAT Gateway?", options: ["A type of database", "Allows private subnet instances to access the internet without being directly accessible", "A DNS service", "A container runtime"], correctAnswerIndex: 1, explanation: "A NAT Gateway enables instances in private subnets to connect to the internet (for updates, etc.) while preventing inbound connections from the internet." },
      { id: "ca8", text: "What is the AWS Shared Responsibility Model?", options: ["AWS does everything", "Customer does everything", "AWS secures the cloud infrastructure; customer secures what they put in the cloud", "Only applies to enterprise plans"], correctAnswerIndex: 2, explanation: "AWS is responsible for security OF the cloud (hardware, network, facilities). Customers are responsible for security IN the cloud (data, access, configs)." },
      { id: "ca9", text: "What is an AMI in AWS?", options: ["Amazon Machine Image — a template to launch EC2 instances", "Amazon Managed Interface", "Automated Module Installer", "AWS Monitoring Index"], correctAnswerIndex: 0, explanation: "An AMI (Amazon Machine Image) is a pre-configured template containing the OS, software, and settings needed to launch an EC2 instance." },
      { id: "ca10", text: "What is multi-AZ deployment?", options: ["Deploying to multiple countries", "Running resources across multiple Availability Zones for high availability", "Using multiple AWS accounts", "Running multiple applications"], correctAnswerIndex: 1, explanation: "Multi-AZ deployment runs resources across multiple Availability Zones. If one AZ fails, traffic failovers to another, ensuring high availability." }
    ]
  },
  {
    id: "weekend-ai-02",
    title: "AI in Practice",
    description: "RAG, embeddings, fine-tuning, and real-world AI application patterns.",
    topic: "AI",
    category: "ai",
    difficulty: "Intermediate",
    iconType: "brain",
    questions: [
      { id: "ap1", text: "What are embeddings in AI?", options: ["Physical chips in a computer", "Dense vector representations of data that capture semantic meaning", "A type of neural network layer", "Database indexes"], correctAnswerIndex: 1, explanation: "Embeddings are dense numerical vectors that represent text, images, or other data in a way that captures semantic relationships. Similar items have similar vectors." },
      { id: "ap2", text: "What is a vector database?", options: ["A regular SQL database", "A database optimized for storing and searching vector embeddings", "A graph database", "A file storage system"], correctAnswerIndex: 1, explanation: "Vector databases (like Pinecone, Weaviate, Chroma) are optimized for storing embeddings and performing fast similarity searches using algorithms like ANN." },
      { id: "ap3", text: "What is the purpose of a system prompt?", options: ["To restart the AI", "To set the AI's behavior, personality, and constraints for a conversation", "To update the model's weights", "To log errors"], correctAnswerIndex: 1, explanation: "A system prompt is a hidden instruction that defines how the AI should behave — its role, tone, constraints, and response format for the conversation." },
      { id: "ap4", text: "What is 'chunking' in the context of RAG?", options: ["Deleting data", "Breaking large documents into smaller pieces for better retrieval", "Compressing model weights", "A training technique"], correctAnswerIndex: 1, explanation: "Chunking splits large documents into smaller, manageable pieces (e.g., 500 tokens each) so they can be embedded and retrieved more accurately in RAG pipelines." },
      { id: "ap5", text: "What is an AI agent?", options: ["A human who uses AI", "An AI system that can autonomously plan, use tools, and take actions to achieve goals", "A chatbot only", "A data labeler"], correctAnswerIndex: 1, explanation: "An AI agent is an autonomous system that uses an LLM to reason, plan, and take actions (call APIs, search web, write code) to accomplish complex tasks." },
      { id: "ap6", text: "What is LoRA in fine-tuning?", options: ["A wireless protocol", "Low-Rank Adaptation — an efficient method to fine-tune LLMs with fewer parameters", "A type of GPU", "A learning rate optimizer"], correctAnswerIndex: 1, explanation: "LoRA (Low-Rank Adaptation) freezes most model weights and only trains small adapter matrices, making fine-tuning much more memory-efficient." },
      { id: "ap7", text: "What is 'grounding' in AI?", options: ["Connecting the AI to electricity", "Connecting AI responses to factual, verifiable sources of information", "Reducing model size", "Training from scratch"], correctAnswerIndex: 1, explanation: "Grounding means connecting the AI's responses to real, verifiable data sources (documents, databases, APIs) to reduce hallucinations and increase accuracy." },
      { id: "ap8", text: "What does 'context window' refer to in LLMs?", options: ["The chat UI window", "The maximum amount of text (tokens) the model can process at once", "The training dataset size", "The number of GPUs used"], correctAnswerIndex: 1, explanation: "The context window is the maximum number of tokens an LLM can handle in a single interaction (prompt + response). GPT-4 Turbo has 128K tokens." },
      { id: "ap9", text: "What is function calling in LLMs?", options: ["Writing Python functions", "The model's ability to generate structured output to invoke external tools/APIs", "Calling customer support", "A debugging technique"], correctAnswerIndex: 1, explanation: "Function calling allows LLMs to output structured JSON that triggers external functions (APIs, database queries, calculations) instead of just text." },
      { id: "ap10", text: "What is the difference between zero-shot and few-shot prompting?", options: ["No difference", "Zero-shot gives no examples; few-shot includes examples in the prompt to guide the model", "Zero-shot is faster", "Few-shot requires fine-tuning"], correctAnswerIndex: 1, explanation: "Zero-shot prompting asks the model to perform a task with no examples. Few-shot prompting includes 2-5 examples in the prompt to demonstrate the desired output format." }
    ]
  },
  {
    id: "weekend-ai-03",
    title: "ML & Deep Learning",
    description: "Neural networks, transformers, training concepts, and model evaluation.",
    topic: "AI",
    category: "ai",
    difficulty: "Advanced",
    iconType: "brain",
    questions: [
      { id: "ml1", text: "What is backpropagation?", options: ["Reversing data flow", "An algorithm that calculates gradients to update neural network weights during training", "Backing up a model", "A deployment strategy"], correctAnswerIndex: 1, explanation: "Backpropagation computes the gradient of the loss function with respect to each weight by propagating errors backward through the network, enabling learning." },
      { id: "ml2", text: "What is the 'attention mechanism' in Transformers?", options: ["Making the model focus on a screen", "A mechanism that lets the model weigh the importance of different parts of the input", "A memory management technique", "An optimization algorithm"], correctAnswerIndex: 1, explanation: "Attention allows the model to focus on relevant parts of the input when producing each output token, by computing weighted relationships between all positions." },
      { id: "ml3", text: "What is overfitting?", options: ["Training a model too quickly", "When a model learns the training data too well and performs poorly on new, unseen data", "Using too many GPUs", "A type of neural network"], correctAnswerIndex: 1, explanation: "Overfitting occurs when a model memorizes training data (including noise) instead of learning general patterns, resulting in poor generalization to new data." },
      { id: "ml4", text: "What is a loss function?", options: ["A function that measures data loss during transfer", "A function that measures how far the model's predictions are from the actual values", "A function that deletes bad data", "A logging function"], correctAnswerIndex: 1, explanation: "A loss function quantifies the difference between predicted and actual values. Training aims to minimize this loss through gradient descent." },
      { id: "ml5", text: "What is transfer learning?", options: ["Moving data between servers", "Using a model pre-trained on one task as a starting point for a different task", "Transferring files to GPU", "A type of data augmentation"], correctAnswerIndex: 1, explanation: "Transfer learning leverages knowledge from a pre-trained model (e.g., BERT, ResNet) and adapts it to a new task, requiring much less data and compute." },
      { id: "ml6", text: "What is the difference between supervised and unsupervised learning?", options: ["No difference", "Supervised uses labeled data with known outputs; unsupervised finds patterns in unlabeled data", "Supervised is faster", "Unsupervised is more accurate"], correctAnswerIndex: 1, explanation: "Supervised learning trains on labeled data (input→output pairs). Unsupervised learning discovers hidden patterns in data without labels (clustering, dimensionality reduction)." },
      { id: "ml7", text: "What is a GPU and why is it important for deep learning?", options: ["A type of CPU", "A Graphics Processing Unit that excels at parallel matrix computations needed for training neural networks", "A storage device", "A networking card"], correctAnswerIndex: 1, explanation: "GPUs have thousands of cores for parallel processing, making them ideal for the massive matrix operations in neural network training (100x faster than CPUs)." },
      { id: "ml8", text: "What is batch normalization?", options: ["Sorting training data alphabetically", "A technique that normalizes layer inputs to stabilize and speed up training", "Batching API requests", "A data cleaning step"], correctAnswerIndex: 1, explanation: "Batch normalization normalizes the inputs to each layer, reducing internal covariate shift. This stabilizes training, allows higher learning rates, and acts as regularization." },
      { id: "ml9", text: "What is the 'vanishing gradient problem'?", options: ["Gradients disappearing from memory", "When gradients become extremely small during backpropagation, preventing deep layers from learning", "GPU memory running out", "A display rendering issue"], correctAnswerIndex: 1, explanation: "In deep networks, gradients can shrink exponentially as they're propagated backward, making early layers learn extremely slowly. ReLU and residual connections help solve this." },
      { id: "ml10", text: "What are Transformer models based on?", options: ["Convolutional layers", "Recurrent layers", "Self-attention mechanisms and positional encoding", "Decision trees"], correctAnswerIndex: 2, explanation: "Transformers (introduced in 'Attention Is All You Need', 2017) rely on self-attention to process all input positions in parallel, replacing recurrence entirely." }
    ]
  }
];
