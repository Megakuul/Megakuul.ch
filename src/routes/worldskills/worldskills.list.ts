interface Project {
  title: string;
  description: string;
  published: string;
  services: string[];
}

const projects: Record<string, Project> = {
  'pipe-plumber': {
    title: 'Pipe Plumber 🪠',
    description: 'Building a CI/CD pipeline to deploy this website',
    published: '01.08.2026',
    services: ['s3', 'acm', 'cloudfront', 'codebuild', 'cli', 'codepipeline'],
  },
  // renamed for pascal's sake
  'please-open-the-door': {
    title: 'Please open the door 🔒',
    description: 'How to authenticate with aws cli',
    published: '01.09.2026',
    services: ['cli', 'iam', 'sts'],
  },
  'super-smart-manager': {
    title: 'Super Smart Manager 🎩',
    description: 'Some neat magictricks with aws ssm',
    published: '01.15.2026',
    services: ['ssm'],
  },
  'the-reason-aws-is-good': {
    title: 'The reason AWS is good 🗿',
    description: 'Why the AWS permission system is crazy good',
    published: '01.18.2026',
    services: ['iam', 'sts'],
  },
  wellarchitecter: {
    title: 'Wellarchitecter 🧱',
    description: 'AWS best practice buzzwords',
    published: '01.23.2026',
    services: ['iam', 'sts', 'vpc'],
  },
  'elastic-kvm-wrapper': {
    title: 'Elastic KVM Wrapper ➰',
    description: 'Exploring virtual machines with elastic pricing',
    published: '01.25.2026',
    services: ['ec2', 'vpc'],
  },
  paranoia: {
    title: 'Paranoia 🛠️',
    description: 'Parameterstore vs Secrets Manager ⚔️ FIGHT',
    published: '01.27.2026',
    services: ['ssm', 'secrets-manager'],
  },
};

export default projects;
