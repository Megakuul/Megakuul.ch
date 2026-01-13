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
  'open-the-fucking-door': {
    title: 'Open the fucking door 🔒',
    description: 'How to authenticate with aws cli',
    published: '01.09.2026',
    services: ['cli', 'iam', 'sts'],
  },
};

export default projects;
